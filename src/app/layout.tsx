import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AntdMobileCompat } from "@/components/AntdMobileCompat";

export const metadata: Metadata = {
    title: "宝妈说",
    description: "母婴真实选品决策平台",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN">
            <body>
                <AntdMobileCompat />
                {children}
            </body>
        </html>
    );
}
