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

"use client";

import Image from "next/image";
import { Form, FormProps, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useAtom } from "jotai/react";
import { userDataAtom, userTokenAtom } from "@/components/Provider";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import axios from "axios";

interface LoginType {
  username: string;
  password: string;
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

  const onFinish: FormProps<LoginType>["onFinish"] = async (values) => {
    try {
      console.log("Attempting login with:", values);

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

      console.log("Login Response:", loginResponse.data);

      const authCode = loginResponse.data.result;
      if (!authCode) {
        throw new Error("Authorization code not received");
      }

      console.log("Auth Code:", authCode);

      const tokenResponse = await axios.post(
        `${API_HOST}/api/oauth/token`,
        {
          grantType: "authorization_code",
          code: authCode,
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: "",
          redirectUri: REDIRECT_URI,
          // scope: ["read:users"],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Token Response:", tokenResponse.data);

      const { access_token, refresh_token, token_type, expires_in, scope } =
        tokenResponse.data.result;

      setCookie("access_token", access_token);
      setCookie("refresh_token", refresh_token);
      setCookie("token_type", token_type);
      setCookie("expires_in", expires_in.toString());
      setCookie("scope", scope);

      setUserToken(access_token);
      setUserData(tokenResponse.data.result);

      router.push("/v1/controlpanel");
    } catch (error) {
      console.error("Login Error:", error);

      if (axios.isAxiosError(error) && error.response) {
        console.error("Error Response:", error.response.data);
      }
    }
  };

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
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item label="Нэвтрэх нэр" name="username">
              <Input
                placeholder="Нэвтрэх нэр оруулна уу."
                prefix={<MailOutlined />}
              />
            </Form.Item>
            <Form.Item label="Нууц үг" name="password">
              <Input.Password
                placeholder="Нууц үг"
                prefix={<LockOutlined />}
                name="password"
              />
            </Form.Item>
            <Form.Item>
              <button type="submit" className="button">
                Нэвтрэх
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
