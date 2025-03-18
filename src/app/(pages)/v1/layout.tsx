"use client";

import SideBar from "./sidebar";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="account-page">
      <SideBar />
      <div className="account-main">
        <div className="account-body">{children}</div>
        <div className="account-footer">
          <ul>
            <li>
              <p>Нүүр хуудас</p>
            </li>
            <li>
              <Link href="#">Хэрэглэгчийн жагсаалт</Link>
            </li>
          </ul>
          <p>Back-Office System v0.0.3 | © Blueprint LLC 2025</p>
        </div>
      </div>
    </div>
  );
}
