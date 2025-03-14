'use client';

import Image from "next/image";
import { Form, FormProps, Input } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useAtom } from "jotai/react";
import { userDataAtom, userTokenAtom } from "@/components/Provider";
import { useRouter } from "next/navigation";
import { setCookie } from 'cookies-next';

interface LoginType {
    username: string;
    password: string;
}

const LoginPage = () => {
    const router = useRouter();
    const [form] = Form.useForm();
    const [, setUserToken] = useAtom(userTokenAtom);
    const [, setUserData] = useAtom(userDataAtom);
    
    const onFinish: FormProps<LoginType | null>['onFinish'] = (values) => {
        const testToken =  Math.random().toString(36).substring(2, 10);
        setUserToken(testToken);
        setUserData(values);
        setCookie('userToken', testToken);
        router.push('/v1/dashboard');
    };

    return(
        <div className="auth-page">
            <div className="auth-page_background">
                <div className="detail">
                    <h1>Loyalty Management System</h1>
                </div>
                <div className="img">
                    <Image src="/assets/images/auth1.png" width={668} height={795} alt="LMS" priority className="img-1"/>
                    <Image src="/assets/images/auth2.png" width={668} height={796} alt="LMS" priority className="img-2"/>
                    <Image src="/assets/images/auth3.png" width={668} height={795} alt="LMS" priority className="img-3"/>
                    <Image src="/assets/images/auth4.png" width={669} height={795} alt="LMS" priority className="img-4"/>
                    <Image src="/assets/images/auth5.png" width={668} height={612} alt="LMS" priority className="img-5"/>
                    <Image src="/assets/images/auth6.png" width={468} height={689} alt="LMS" priority className="img-6"/>
                </div>
            </div>
            <div className="auth-page_body">
                <div className="form-body">
                    <div className="logo">
                        <Image src="/logo.png" width={400} height={259} alt="LMS" priority/>
                    </div>
                    <h2>Амар байна уу.</h2>
                    <p className="desc">Өөрийн мэдээллээ оруулна уу.</p>
                    <Form
                        layout="vertical"
                        form={form}
                        onFinish={onFinish}
                    >
                        <Form.Item label="Нэвтрэх нэр" name="username">
                            <Input placeholder="Нэвтрэх нэр оруулна уу." prefix={<MailOutlined />}/>
                        </Form.Item>
                        <Form.Item label="Нууц үг" name="password">
                            <Input.Password placeholder="Нууц үг" prefix={<LockOutlined />} name="password"/>
                        </Form.Item>
                        <Form.Item>
                            <button type="submit" className="button">Нэвтрэх</button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;