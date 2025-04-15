"use client";

import { usePathname } from "next/navigation";

const PageTitle = () => {
  const pathname = usePathname();

  const getPageTitle = (path: string) => {
    switch (path) {
      case "/v1/controlpanel":
        return "Хянах самбар";
      case "/v1/product":
        return "Бараа материал";
      case "/v1/users":
        return "Хэрэглэгч";
      case "/v1/branch":
        return "Салбар";
      case "/v1/tailan":
        return "Тайлан";
      case "/v1/feedback":
        return "Санал хүсэлт";
      case "/v1/notification":
        return "Мэдэгдэл";
      case "/v1/log":
        return "Log";
      case "/v1/settings":
        return "Эрхийн тохиргоо";
      default:
        return "";
    }
  };

  const title = getPageTitle(pathname);

  return (
    // <div className="flex">
    <h1 className="flex items-center font-normal text-xs text-[#374151]">
      {title}
    </h1>
    // </div>
  );
};

export default PageTitle;
