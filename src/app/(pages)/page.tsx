"use client";

import Image from "next/image";
import { Form, FormProps, Input, Checkbox, message } from "antd";
import { MailOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";
import { useAtom } from "jotai/react";
import {
  userDataAtom,
  userRememberAtom,
  userTokenAtom,
} from "@/components/Provider";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import axios from "axios";
import { useState, useEffect } from "react";
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

  const onFinish = async (values: LoginType) => {
    setLoading(true);

    if (values.remember === true) {
      setRememberData({ username: values.username, password: values.password });
    } else {
      setRememberData(null);
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
    } catch (error) {
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
          {/* {[...Array(6)].map((_, index) => (
            <Image
              key={index}
              src={`/assets/images/auth${index + 1}.png`}
              width={index === 5 ? 468 : 668}
              height={[795, 796, 795, 795, 612, 689][index]}
              alt="LMS"
              priority
              className={`img-${index + 1}`}
            />
          ))} */}
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
                password: rememberData?.password,
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
                rules={[{ required: true, message: "Нууц үг оруулна уу." }]}>
                <Input.Password placeholder="Нууц үг" />
              </Form.Item>

              <div className="flex justify-between items-center mb-4">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <label className="flex justify-center items-center gap-2">
                    <input
                      type="checkbox"
                      name="remember"
                      className="h-6 w-6 rounded border-[#A0AEC0]"
                    />
                    Нэвтрэх нэр сануулах
                  </label>
                </Form.Item>

                <div
                  onClick={() => setShowForget(true)}
                  className="text-sm text-blue-500 hover:underline cursor-pointer">
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
