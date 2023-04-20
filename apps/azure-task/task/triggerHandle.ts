import { Instance, LunchServer } from "./core/index.js";
import { ApiClient } from "./api/index.js";
import type { Threads } from "./api/index.js";
import { mapPrStatusToText } from "./util/mapPRStatus.js";
import { BuildContextType, buildContext } from "./buildContext.js";

class TriggerHandle {
  private TRIGGER_LABEL = "live-pr";
  // when merged pull request the reason will be IndividualCI
  // https://stackoverflow.com/questions/73053721/azure-devops-pipelines-to-trigger-only-on-merge
  private MERGED_TRIGGER_REASON = ["PullRequest", "IndividualCI"];

  constructor(
    private apiClient: ApiClient,
    private buildContext: BuildContextType,
    private ec2Starter: LunchServer,
    private ec2: Instance
  ) {}

  static async createTrigger() {
    if (!buildContext.token) throw new Error("Token not found in trigger");

    const apiClient = await ApiClient.initializeApi();
    const ec2 = new Instance({});
    const ec2Starter = new LunchServer(ec2);

    return new TriggerHandle(apiClient, buildContext, ec2Starter, ec2);
  }

  async hasTriggerLabel() {
    const allLabels = await this.apiClient.getLabels(
      this.buildContext.repoId,
      Number(this.buildContext.prId)
    );
    if (allLabels?.length)
      return allLabels.some((label) => label.name === this.TRIGGER_LABEL);
    return false;
  }

  async createLivePR() {
    if (!(await this.noInstanceFound())) {
      const gitUrl = this.buildContext.repoUrl;
      //Get clone link
      try {
        await this.ec2Starter.run(gitUrl);
        const liveLink = this.ec2.liveInstUrl;
        if (liveLink) {
          await this.createUpdateLivePrThread(liveLink);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  async createUpdateLivePrThread(liveUrl: string) {
    try {
      const threads = await this.apiClient.getAllThreads();
      const livePrThread = this.livePrThread(threads);
      console.log({
        livePrThread,
        id: livePrThread?.comments?.[0].id,
        thead: livePrThread?.id,
      });

      if (
        threads &&
        !!livePrThread &&
        livePrThread?.comments?.[0].id &&
        livePrThread?.id
      ) {
        console.log("found live comment updating comment");
        await this.apiClient
          .updateComment({
            commentId: livePrThread.comments?.[0].id,
            message: `\n you can view your changes at ${liveUrl}`,
            threadId: livePrThread.id,
          })
          .catch((e) => {
            throw e;
          });
      } else {
        await this.apiClient
          .createComment(`\n you can view your changes at ${liveUrl}`)
          .catch((e) => {
            throw e;
          });
      }
    } catch (error) {
      throw error;
    }
  }

  private livePrThread(threads: Threads[]) {
    const hasCommentWithId = threads?.find((thread) =>
      thread.comments?.find((comment) =>
        comment?.content?.includes("live pr at")
      )
    );
    return hasCommentWithId;
  }

  private async noInstanceFound() {
    const hasInstance = await this.ec2.hasDuplicateInstance("");
    return hasInstance;
  }

  async isPRMerged() {
    try {
      const { buildReason } = this.buildContext;
      const isReasonMerged = this.MERGED_TRIGGER_REASON.includes(buildReason);

      if (isReasonMerged) {
        const status = await this.prStatus();
        return status === "Succeeded";
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  private async prStatus() {
    try {
      const pr = await this.apiClient.getPR();

      if (pr.status === undefined)
        throw new Error("TRIGGER_HANDLE: PR Status not found");

      return mapPrStatusToText[pr.status];
    } catch (error) {
      throw error;
    }
  }

  async cleanUp() {
    try {
      if (!"develop")
        throw new Error(
          "CLEAN_UP: instance name not provided for destroying instance"
        );

      console.log("cleaning all the instances");
      const instance = await this.ec2
        .getInstanceInfo({
          name: "develop",
        })
        .catch((e) => {
          throw e;
        });

      if (!instance) throw new Error("CLEAN_UP: instance not found");

      console.log({ instance });
      await this.ec2.deleteInstance(
        instance.map((ec2) =>
          Boolean(ec2?.InstanceId) ? ec2!.InstanceId : ""
        ) as string[]
      );
    } catch (error) {
      throw error;
    }
  }
}

export { TriggerHandle };
