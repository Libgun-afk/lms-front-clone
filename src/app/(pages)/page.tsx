"use client";

import Image from "next/image";
import { Form, Input, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useAtom } from "jotai/react";
import {
  userDataAtom,
  userRememberAtom,
  userTokenAtom,
} from "@/components/Provider";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
// import axios from "axios";
import axios from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
import ForgetPassword from "@/components/ForgetPass";

interface LoginType {
  username: string;
  password: string;
  remember: boolean;
}

const LoginPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [, setUserToken] = useAtom(userTokenAtom);
  const [, setUserData] = useAtom(userDataAtom);
  const [rememberData, setRememberData] = useAtom(userRememberAtom);
  const [loading, setLoading] = useState(false);
  const [showForget, setShowForget] = useState(false);
  const [remember, setRemember] = useState<boolean>(false);

  useEffect(() => {
    const localData = localStorage.getItem("rememberUser");
    if (localData) {
      const parsed = JSON.parse(localData);
      form.setFieldsValue({
        username: parsed.username,
        remember: true,
      });
      setRememberData(parsed);
    }
  }, [form, setRememberData]);

  const onFinish = async (values: LoginType) => {
    setLoading(true);

    if (values.remember) {
      const userInfo = { username: values.username, password: values.password };
      setRememberData(userInfo);
      localStorage.setItem("rememberUser", JSON.stringify(userInfo));
    } else {
      setRememberData(null);
      localStorage.removeItem("rememberUser");
    }
    try {
      const oauthVales = {
        clientId: "78deef1d-1370-49a1-8a46-7e131bbbee1a",
        redirectUri: "localhost:3000",
        responseType: "code",
        scope: ["read:users"],
        state: "api",
        username: values.username,
        password: values.password,
      };

      const resUserOauth = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/oauth/authorize`,
        oauthVales
      );
      if (resUserOauth.status === 201) {
        const resultCode = resUserOauth.data.result;
        const tokanValues = {
          grantType: "authorization_code",
          code: resultCode,
          clientId: "78deef1d-1370-49a1-8a46-7e131bbbee1a",
          clientSecret:
            "8d4a5621cc804f7979cf70d3e56195e54eccd224f6d98116733f2898d62f49c5",
          refreshToken: "",
          redirectUri: "localhost:3000",
        };

        const resGetToken = await axios.post(
          `${process.env.NEXT_PUBLIC_API_HOST}/api/oauth/token`,
          tokanValues
        );
        if (resGetToken.status === 201) {
          const resultToken = resGetToken.data.result;
          setCookie("userToken", resultToken.access_token);
          setCookie("refreshToken", resultToken.refresh_token);
          setUserToken(resultToken.access_token);
          setUserData(resultToken);
          setLoading(false);
          router.push("/v1/product");
        } else {
          message.error("Хэрэглэгчийн нэвтрэх нэр нууц үг буруу байна");
        }
      } else {
        setLoading(false);
        message.error("Хэрэглэгчийн нэвтрэх нэр нууц үг буруу байна");
      }
    } catch {
      setLoading(false);
      message.error("Алдаа гарлаа дахин оролдоно уу");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-page_background">
        <div className="detail">
          <h1>Loyalty Management System</h1>
        </div>
        <div className="img">
          <Image
            src="/assets/images/auth group.png"
            width={1000}
            height={1084}
            alt="LMS"
            priority
            className="group-image"
          />
        </div>
      </div>

      <div className="auth-page_body">
        <div className="form-body">
          <div className="logo">
            <Image
              src="/logo.png"
              width={400}
              height={259}
              alt="LMS"
              priority
            />
          </div>
          <h2>Амар байна уу.</h2>
          <p className="desc">Өөрийн мэдээллээ оруулна уу.</p>

          {!showForget ? (
            <Form
              layout="vertical"
              form={form}
              onFinish={onFinish}
              autoComplete="off"
              initialValues={{
                username: rememberData?.username,
                remember: true,
              }}>
              <Form.Item
                label="Нэвтрэх нэр"
                name="username"
                rules={[
                  { required: true, message: "Нэвтрэх нэр оруулна уу." },
                ]}>
                <Input placeholder="Нэвтрэх нэр оруулна уу." />
              </Form.Item>

              <Form.Item
                label="Нууц үг"
                name="password"
                rules={[{ message: "Нууц үг оруулна уу.", required: true }]}>
                <Input.Password placeholder="Нууц үг" />
              </Form.Item>

              <div className="flex justify-between items-center mb-4">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <label className="flex justify-center items-center gap-2 text-[#414651]">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="h-5 w-5 accent-[#0A2D75] border-[#A0AEC0] hover:accent-[#143b9f] hover:border-[#143b9f] focus:ring-0 active:ring-0"
                    />{" "}
                    Нэвтрэх нэр сануулах
                  </label>
                </Form.Item>
                <div
                  onClick={() => setShowForget(true)}
                  className="text-sm text-[#0A2D75] hover:underline cursor-pointer">
                  Нууц үг сэргээх?
                </div>
              </div>

              <Form.Item>
                <button type="submit" className="button" disabled={loading}>
                  {loading ? <LoadingOutlined className="mr-2" spin /> : null}
                  Нэвтрэх
                </button>
              </Form.Item>
            </Form>
          ) : (
            <ForgetPassword onBack={() => setShowForget(false)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
