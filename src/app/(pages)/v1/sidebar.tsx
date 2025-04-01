"use client";

import { sidebarShrinkAtom } from "@/components/Provider";
import { useAtom } from "jotai/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import DashboardIcon from "@/assets/icons/dashboard.svg";
import ProductIcon from "@/assets/icons/product.svg";
import PeopleIcon from "@/assets/icons/people.svg";
import BranchIcon from "@/assets/icons/branch.svg";
import DiscountIcon from "@/assets/icons/discount.svg";
import ArrowLefticon from "@/assets/icons/arrow-left.svg";

const SideBar = () => {
  const router = usePathname();
  const [sidebarShrink, setSidebarShrink] = useAtom(sidebarShrinkAtom);

  const isActive = (path: string) => {
    if (path === router) return true;
    if (path !== "/" && router.startsWith(path)) return true;
    return false;
  };

  const handleMenuExpand = () => {
    setSidebarShrink(!sidebarShrink);
  };

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <div className={`account-sidebar ${sidebarShrink ? "shrink" : ""}`}>
      <div className="logo-img">
        <Image src="/logo.png" width={76} height={49} alt="LMS" priority />
        <p>LMS</p>
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
            <p>Хянах самбар</p>
          </Link>
        </li>
        <li>
          <Link
            href="/v1/product"
            className={`menu-item ${isActive("/v1/product") ? "active" : ""}`}>
            <div className="icon">
              <ProductIcon />
            </div>
            <p>Бараа материал</p>
          </Link>
        </li>
        <li>
          <Link
            href="/v1/users"
            className={`menu-item ${isActive("/v1/users") ? "active" : ""}`}>
            <div className="icon">
              <PeopleIcon />
            </div>
            <p>Хэрэглэгч</p>
          </Link>
        </li>
        <li>
          <Link
            href="/v1/branch"
            className={`menu-item ${isActive("/v1/branch") ? "active" : ""}`}>
            <div className="icon">
              <BranchIcon />
            </div>
            <p>Салбар</p>
          </Link>
        </li>
        <li>
          <Link
            href="/v1/tailan"
            className={`menu-item ${isActive("/v1/tailan") ? "active" : ""}`}>
            <div className="icon">
              <DiscountIcon />
            </div>
            <p>Тайлан</p>
          </Link>
        </li>
        <li>
          <Link
            href="/v1/feedback"
            className={`menu-item ${isActive("/v1/feedback") ? "active" : ""}`}>
            <div className="icon">
              <DiscountIcon />
            </div>
            <p>Санал хүсэлт</p>
          </Link>
        </li>
        <li>
          <Link
            href="/v1/settings"
            className={`menu-item ${isActive("/v1/settings") ? "active" : ""}`}>
            <div className="icon">
              <DiscountIcon />
            </div>
            <p>Тохиргоо</p>
          </Link>
        </li>
      </ul>
      <div className="account-sidebar_bottom">
        <div className="menu-shrink" onClick={handleMenuExpand}>
          <div className="icon">
            <ArrowLefticon />
          </div>
          <p>Багасгах</p>
        </div>
        <div className="profile-menu" onClick={handleLogout}>
          <div className="icon"></div>
          <p>Борлуулалтын менежер</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
