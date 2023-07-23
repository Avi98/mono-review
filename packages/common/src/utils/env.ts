import dotenv from "dotenv";

dotenv.config();

const castEnv = <T = string>({
  env,
  name,
}: {
  env: T | undefined;
  name: string;
}): T => {
  // if (!env) throw new Error(`\n ENV for ${name} not provided`);
  //
  return env as T;
};

export const env = {
  port_BE: process.env.BE_PORT,
  imageId: process.env.IMAGE_ID,
  imageType: process.env.IMAGE_TYPE,
  region: process.env.REGION,
  securityId: castEnv({ env: process.env.SG_ID, name: "SG_ID" }),
  securityGroup: castEnv({ env: process.env.SG, name: "SG" }),
  keyName: process.env.KEY_NAME,
  pat: process.env.PAT,
  isDev: process.env?.NODE_ENV === "develop",
  git: {
    remote_url: process.env.REMOTE_REPO,
  },
  db: {
    TYPE: process.env.DB_TYPE,
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_DATABASE,
    SESSION_SECRET: process.env.DB_SESSION_SECRET,
  },
  sshKeys: {
    publicKey: castEnv({
      env: process.env.SSH_PUBLIC_KEY,
      name: "SSH_PUBLIC_KEY",
    }),
    privateKey: castEnv({
      env: process.env.SSH_PRIVATE_KEY,
      name: "SSH_PRIVATE_KEY",
    }),
  },
};
