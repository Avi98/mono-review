"use client";

import { MemberItem } from "./MemberItem";

export const MemberList = () => {
  return (
    <ul className="border-border [&>*]:border-border rounded-2xl border-2 [&>*:last-child]:border-none [&>*]:border-b-2">
      <MemberItem />
      <MemberItem />
      <MemberItem />
      <MemberItem />
      <MemberItem />
      <MemberItem />
    </ul>
  );
};
