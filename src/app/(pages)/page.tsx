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
//   // Define API_HOST with the appropriate value
//   // const API_HOST = "https://hrms.go-bp.click";
//   // const CLIENT_ID = "78deef1d-1370-49a1-8a46-7e131bbbee1a";
//   // const REDIRECT_URI = "http://hrms.go-bp.click";

//   // const onFinish: FormProps<LoginType | null>["onFinish"] = async (values) => {
//   //   try {
//   //     const authUrl = `${API_HOST}/api/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
//   //       REDIRECT_URI
//   //     )}&response_type=code&scope=read:users&state=api`;

//   //     window.location.href = authUrl;
//   //   } catch (error) {
//   //     console.error("Login Error:", error);
//   //   }
//   // };

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
const CLIENT_SECRET = "your-client-secret";
const REDIRECT_URI = "http://localhost:3000";
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
          scope: "read:users",
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
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          redirect_uri: REDIRECT_URI,
          code: authCode,
          grant_type: "authorization_code",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Token Response:", tokenResponse.data);

      const { access_token, user } = tokenResponse.data;

      setCookie("access_token", access_token);
      setUserToken(access_token);
      setUserData(user);

      router.push("/v1/dashboard");
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
          <Image
            src="/assets/images/auth1.png"
            width={668}
            height={795}
            alt="LMS"
            priority
            className="img-1"
          />
          <Image
            src="/assets/images/auth2.png"
            width={668}
            height={796}
            alt="LMS"
            priority
            className="img-2"
          />
          <Image
            src="/assets/images/auth3.png"
            width={668}
            height={795}
            alt="LMS"
            priority
            className="img-3"
          />
          <Image
            src="/assets/images/auth4.png"
            width={669}
            height={795}
            alt="LMS"
            priority
            className="img-4"
          />
          <Image
            src="/assets/images/auth5.png"
            width={668}
            height={612}
            alt="LMS"
            priority
            className="img-5"
          />
          <Image
            src="/assets/images/auth6.png"
            width={468}
            height={689}
            alt="LMS"
            priority
            className="img-6"
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
