"use client";

import SideBar from "./sidebar";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="account-page">
      <SideBar />
      <div className="account-main">
        <div className="account-footer">
          <ul>
            <li>
              <Link href="/v1/controlpanel">Нүүр хуудас</Link>
            </li>
            <PageTitle />
          </ul>
          <p>Back-Office System v0.0.3 | © Blueprint LLC 2025</p>
        </div>
        <div className="account-body">{children}</div>
      </div>
    </div>
  );
}
