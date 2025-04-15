"use client";

import { sidebarShrinkAtom } from "@/components/Provider";
import { useAtom } from "jotai/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import DashboardIcon from "@/assets/icons/dashboard.svg";
import ProductIcon from "@/assets/icons/product.svg";
import PeopleIcon from "@/assets/icons/people.svg";
import BranchIcon from "@/assets/icons/branch.svg";
import ArrowLefticon from "@/assets/icons/arrow-left.svg";
import { deleteCookie } from "cookies-next";
import { decodeToken } from "@/lib/tokenUtils";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

const SideBar = () => {
  const router = usePathname();
  const routerRedirect = useRouter();
  const [sidebarShrink, setSidebarShrink] = useAtom(sidebarShrinkAtom);
  const [userInfo, setUserInfo] = useState<{ name?: string; role?: string }>({});

  useEffect(() => {
    const token = getCookie("userToken");
    if (token) {
      const decoded = decodeToken(token as string);
      if (decoded) {
        setUserInfo({
          name: decoded.name,
          role: decoded.role
        });
      }
    }
  }, []);

  const isActive = (path: string) => {
    if (path === router) return true;
    if (path !== "/" && router.startsWith(path)) return true;
    return false;
  };

  const handleMenuExpand = () => {
    setSidebarShrink(!sidebarShrink);
  };

  const handleLogout = () => {
    deleteCookie("userToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("userToken");
    routerRedirect.refresh();
  };

  return (
    <div className={`account-sidebar ${sidebarShrink ? "shrink" : ""}`}>
      <div className="logo-img">
        <Image src="/logo.png" width={76} height={49} alt="LMS" priority />
        {!sidebarShrink && <p>LMS</p>}
      </div>
      <ul className="account-sidebar_menu">
        <li>
          <Link
            href="/v1/controlpanel"
            className={`menu-item ${
              isActive("/v1/controlpanel") ? "active" : ""
            }`}>
            <div className="icon">
              <DashboardIcon />
            </div>
            {!sidebarShrink && <p>Хянах самбар</p>}
          </Link>
        </li>
        <li>
          <Link
            href="/v1/product"
            className={`menu-item ${isActive("/v1/product") ? "active" : ""}`}>
            <div className="icon">
              <ProductIcon />
            </div>
            {!sidebarShrink && <p>Бараа материал</p>}
          </Link>
        </li>
        <li>
          <Link
            href="/v1/users"
            className={`menu-item ${isActive("/v1/users") ? "active" : ""}`}>
            <div className="icon">
              <PeopleIcon />
            </div>
            {!sidebarShrink && <p>Хэрэглэгч</p>}
          </Link>
        </li>
        <li>
          <Link
            href="/v1/branch"
            className={`menu-item ${isActive("/v1/branch") ? "active" : ""}`}>
            <div className="icon">
              <BranchIcon />
            </div>
            {!sidebarShrink && <p>Салбар</p>}
          </Link>
        </li>
        <li>
          <Link
            href="/v1/tailan"
            className={`menu-item ${isActive("/v1/tailan") ? "active" : ""}`}>
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-file-check-icon lucide-file-check">
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="m9 15 2 2 4-4" />
              </svg>
            </div>
            {!sidebarShrink && <p>Тайлан</p>}
          </Link>
        </li>
        <li>
          <Link
            href="/v1/feedback"
            className={`menu-item ${isActive("/v1/feedback") ? "active" : ""}`}>
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-messages-square-icon lucide-messages-square">
                <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z" />
                <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
              </svg>
            </div>
            {!sidebarShrink && <p>Санал хүсэлт</p>}
          </Link>
        </li>
        <li>
          <Link
            href="/v1/notification"
            className={`menu-item ${
              isActive("/v1/notification") ? "active" : ""
            }`}>
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-bell-ring-icon lucide-bell-ring">
                <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                <path d="M22 8c0-2.3-.8-4.3-2-6" />
                <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
                <path d="M4 2C2.8 3.7 2 5.7 2 8" />
              </svg>
            </div>
            {!sidebarShrink && <p>Мэдэгдэл</p>}
          </Link>
        </li>
        <li>
          <Link
            href="/v1/log"
            className={`menu-item ${isActive("/v1/log") ? "active" : ""}`}>
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-file-clock-icon lucide-file-clock">
                <path d="M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <circle cx="8" cy="16" r="6" />
                <path d="M9.5 17.5 8 16.25V14" />
              </svg>
            </div>
            {!sidebarShrink && <p>Log</p>}
          </Link>
        </li>
        <li>
          <Link
            href="/v1/settings"
            className={`menu-item ${isActive("/v1/settings") ? "active" : ""}`}>
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-sliders-horizontal-icon lucide-sliders-horizontal">
                <line x1="21" x2="14" y1="4" y2="4" />
                <line x1="10" x2="3" y1="4" y2="4" />
                <line x1="21" x2="12" y1="12" y2="12" />
                <line x1="8" x2="3" y1="12" y2="12" />
                <line x1="21" x2="16" y1="20" y2="20" />
                <line x1="12" x2="3" y1="20" y2="20" />
                <line x1="14" x2="14" y1="2" y2="6" />
                <line x1="8" x2="8" y1="10" y2="14" />
                <line x1="16" x2="16" y1="18" y2="22" />
              </svg>
            </div>
            {!sidebarShrink && <p>Эрхийн тохиргоо</p>}
          </Link>
        </li>
      </ul>
      <div className="account-sidebar_bottom">
        <div className="menu-shrink" onClick={handleMenuExpand}>
          <div className="icon">
            <ArrowLefticon />
          </div>
          {!sidebarShrink && <p>Багасгах</p>}
        </div>
        <div className="profile-menu">
          <div className="icon"></div>
          {!sidebarShrink && (
            <>
              <p>{userInfo.name || "Хэрэглэгч"}</p>
              <small>{userInfo.role || ""}</small>
            </>
          )}
        </div>
        <div className="menu-shrink" onClick={handleLogout}>
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-log-out-icon lucide-log-out">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>{" "}
          </div>
          {!sidebarShrink && <p>Гарах</p>}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
