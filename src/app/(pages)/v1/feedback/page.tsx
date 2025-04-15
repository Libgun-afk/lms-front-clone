"use client";

import FeedBackList from "@/components/feedback/FeedBackList";
import { GET_FEEDBACKS } from "@/graphql/queries";
import { LoadingOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { Spin } from "antd";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Feedback = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("userToken");
    if (!token) {
      router.push("/");
    }
  }, [router]);

  const { data, loading, error, refetch } = useQuery(GET_FEEDBACKS);
  const [feedbacks, setFeedbacks] = useState([]);
  const [refreshLoading, setRefreshLoading] = useState(false);

  useEffect(() => {
    if (data?.getFeedbackList?.items) {
      setFeedbacks(data.getFeedbackList.items);
    }
  }, [data]);

  // const handleRefresh = async () => {
  //   try {
  //     setRefreshLoading(true);
  //     const result = await refetch();
  //     if (result?.data?.getFeedbackList?.items) {
  //       setFeedbacks(result.data.getFeedbackList.items);
  //     }
  //   } catch (err) {
  //     console.error("Refresh error:", err);
  //   } finally {
  //     setRefreshLoading(false);
  //   }
  // };

  if (loading) {
    return (
      <div className="flex justify-center pt-96">
        <Spin
          className="flex justify-center items-center"
          indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
        />
      </div>
    );
  }

  if (error) {
    return (
      <p className="flex justify-center items-center text-red-500">
        Error: {error.message}
      </p>
    );
  }

  return (
    <div className="flex p-4">
      {refreshLoading ? (
        <div className="w-full flex justify-center pt-96">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
        </div>
      ) : (
        <FeedBackList feedbacks={feedbacks} />
      )}
    </div>
  );
};

export default Feedback;
