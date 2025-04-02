import { Spin } from "antd";
import { useLoading } from "./LoadingContext";

const GlobalLoading = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Spin size="large" />
    </div>
  );
};

export default GlobalLoading;
