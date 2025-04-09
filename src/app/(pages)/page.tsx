// "use client";

// import Image from "next/image";
// import { Form, FormProps, Input } from "antd";
// import { MailOutlined, LockOutlined } from "@ant-design/icons";
// import { useAtom } from "jotai/react";
// import { userDataAtom, userTokenAtom } from "@/components/Provider";
// import { useRouter } from "next/navigation";
// import { setCookie } from "cookies-next";

// interface LoginType {
//   username: string;
//   password: string;
// }

// const LoginPage = () => {
//   const router = useRouter();
//   const [form] = Form.useForm();
//   const [, setUserToken] = useAtom(userTokenAtom);
//   const [, setUserData] = useAtom(userDataAtom);

//   const onFinish: FormProps<LoginType | null>["onFinish"] = (values) => {
//     const testToken = Math.random().toString(36).substring(2, 10);
//     setUserToken(testToken);
//     setUserData(values);
//     setCookie("userToken", testToken);
//     router.push("/v1/dashboard");
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-page_background">
//         <div className="detail">
//           <h1>Loyalty Management System</h1>
//         </div>
//         <div className="img">
//           <Image
//             src="/assets/images/auth1.png"
//             width={668}
//             height={795}
//             alt="LMS"
//             priority
//             className="img-1"
//           />
//           <Image
//             src="/assets/images/auth2.png"
//             width={668}
//             height={796}
//             alt="LMS"
//             priority
//             className="img-2"
//           />
//           <Image
//             src="/assets/images/auth3.png"
//             width={668}
//             height={795}
//             alt="LMS"
//             priority
//             className="img-3"
//           />
//           <Image
//             src="/assets/images/auth4.png"
//             width={669}
//             height={795}
//             alt="LMS"
//             priority
//             className="img-4"
//           />
//           <Image
//             src="/assets/images/auth5.png"
//             width={668}
//             height={612}
//             alt="LMS"
//             priority
//             className="img-5"
//           />
//           <Image
//             src="/assets/images/auth6.png"
//             width={468}
//             height={689}
//             alt="LMS"
//             priority
//             className="img-6"
//           />
//         </div>
//       </div>
//       <div className="auth-page_body">
//         <div className="form-body">
//           <div className="logo">
//             <Image
//               src="/logo.png"
//               width={400}
//               height={259}
//               alt="LMS"
//               priority
//             />
//           </div>
//           <h2>Амар байна уу.</h2>
//           <p className="desc">Өөрийн мэдээллээ оруулна уу.</p>
//           <Form layout="vertical" form={form} onFinish={onFinish}>
//             <Form.Item label="Нэвтрэх нэр" name="username">
//               <Input
//                 placeholder="Нэвтрэх нэр оруулна уу."
//                 prefix={<MailOutlined />}
//               />
//             </Form.Item>
//             <Form.Item label="Нууц үг" name="password">
//               <Input.Password
//                 placeholder="Нууц үг"
//                 prefix={<LockOutlined />}
//                 name="password"
//               />
//             </Form.Item>
//             <Form.Item>
//               <button type="submit" className="button">
//                 Нэвтрэх
//               </button>
//             </Form.Item>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

///adasdad

"use client";

import Image from "next/image";
import { Form, FormProps, Input, Checkbox, message } from "antd";
import { MailOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";
import { useAtom } from "jotai/react";
import { userDataAtom, userTokenAtom } from "@/components/Provider";
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

const CLIENT_ID = "78deef1d-1370-49a1-8a46-7e131bbbee1a";
const CLIENT_SECRET =
  "8d4a5621cc804f7979cf70d3e56195e54eccd224f6d98116733f2898d62f49c5";
const REDIRECT_URI = "localhost:3000";
const API_HOST = "https://hrms.go-bp.click";

const LoginPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [, setUserToken] = useAtom(userTokenAtom);
  const [, setUserData] = useAtom(userDataAtom);
  const [loading, setLoading] = useState(false);
  const [showForget, setShowForget] = useState(false);

  const MAX_ATTEMPTS = 3;
  const BLOCK_TIME = 60 * 1000; // 1 minute

  const onFinish: FormProps<LoginType>["onFinish"] = async (values) => {
    try {
      await form.validateFields();

      // Handling login logic...

      const attempts = parseInt(localStorage.getItem("login_attempts") || "0");
      const blockedUntil = parseInt(
        localStorage.getItem("blocked_until") || "0"
      );

      if (Date.now() < blockedUntil) {
        message.error("Та түр блоклогдсон байна. Түр хүлээнэ үү.");
        return;
      }

      setLoading(true);

      try {
        const loginResponse = await axios.post(
          `${API_HOST}/api/oauth/authorize`,
          {
            clientId: CLIENT_ID,
            redirectUri: REDIRECT_URI,
            responseType: "code",
            scope: ["read:users"],
            state: "api",
            username: values.username,
            password: values.password,
          }
        );

        const authCode = loginResponse.data.result;
        if (!authCode) {
          throw new Error("Нэвтрэх нэр эсвэл нууц үг буруу байна");
        }

        const tokenResponse = await axios.post(
          `${API_HOST}/api/oauth/token`,
          {
            grantType: "authorization_code",
            code: authCode,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: "",
            redirectUri: REDIRECT_URI,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        const { access_token, refresh_token, token_type, expires_in, scope } =
          tokenResponse.data.result;

        setCookie("access_token", access_token);
        setCookie("refresh_token", refresh_token);
        setCookie("token_type", token_type);
        setCookie("expires_in", expires_in.toString());
        setCookie("scope", scope);

        // Remember username logic
        if (values.remember) {
          localStorage.setItem("username", values.username);
        } else {
          localStorage.removeItem("username");
        }

        localStorage.removeItem("login_attempts");
        localStorage.removeItem("blocked_until");

        setUserToken(access_token);
        setUserData(tokenResponse.data.result);
        router.push("/v1/product");
      } catch (error: any) {
        const newAttempts = attempts + 1;

        if (newAttempts >= MAX_ATTEMPTS) {
          localStorage.setItem(
            "blocked_until",
            (Date.now() + BLOCK_TIME).toString()
          );
          localStorage.setItem("login_attempts", "0");
          message.error("Та 3 удаа буруу оролдсон тул блоклогдлоо.");
        } else {
          localStorage.setItem("login_attempts", newAttempts.toString());

          if (error?.response?.data?.message?.includes("password")) {
            message.error("Нууц үг буруу байна.");
          } else if (error?.response?.data?.message?.includes("username")) {
            message.error("Нэвтрэх нэр буруу байна.");
          } else {
            message.error("Нэвтрэхэд алдаа гарлаа.");
          }
        }

        console.error("Login Error:", error);
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.log("Validation Error:", error);
    }
  };

  useEffect(() => {
    // Check if the username is stored in localStorage
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      form.setFieldsValue({ username: savedUsername });
    }
  }, [form]);

  return (
    <div className="auth-page">
      <div className="auth-page_background">
        <div className="detail">
          <h1>Loyalty Management System</h1>
        </div>
        <div className="img">
          {[...Array(6)].map((_, index) => (
            <Image
              key={index}
              src={`/assets/images/auth${index + 1}.png`}
              width={index === 5 ? 468 : 668}
              height={[795, 796, 795, 795, 612, 689][index]}
              alt="LMS"
              priority
              className={`img-${index + 1}`}
            />
          ))}
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
            <Form layout="vertical" form={form} onFinish={onFinish}>
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
                      className="h-6 w-6 rounded border-[#A0AEC0]"
                    />
                    Нэвтрэх нэр сануул
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
