"use client";

import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Users = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("userToken");
    if (!token) {
      router.push("/");
    }
  }, [router]);
  return <div className="dashboard-page">users Page</div>;
};

export default Users;
