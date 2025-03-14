
import "../assets/styles/main.scss";
import Provider from "@/components/Provider";
import { AntdRegistry } from '@ant-design/nextjs-registry';

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <title>Loyalty Management System | Admin</title>
        <meta name="description" content="Back Office Template - Blue Print" />
      </head>
      <body>
        <AntdRegistry>
          <Provider>
            <main>{children}</main>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}