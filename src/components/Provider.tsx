"use client";
import client from "@/lib/apollo-client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ApolloProvider } from "@apollo/client";
import { atomWithStorage } from "jotai/utils";

interface UserData {
  username: string;
  password: string;
}

export const userTokenAtom = atomWithStorage<string | null>("userToken", null);
export const userDataAtom = atomWithStorage<UserData | null>("userData", null);
export const sidebarShrinkAtom = atomWithStorage<boolean>(
  "sidebarShrink",
  false
);

export default function Provider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ApolloProvider client={client}>
      <AntdRegistry>{children}</AntdRegistry>
    </ApolloProvider>
  );
}
