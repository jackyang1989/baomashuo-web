'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toast } from 'antd-mobile';
import { ArrowLeft, Phone, MessageSquare, ChevronRight } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';

export default function LoginPage() {
    const router = useRouter();
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [countdown, setCountdown] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleSendCode = () => {
        if (!/^1\d{10}$/.test(phone)) {
            Toast.show({ content: '请输入正确的手机号' });
            return;
        }
        setCountdown(60);
        Toast.show({ content: '验证码已发送' });
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleLogin = async () => {
        if (!phone || !code) {
            Toast.show({ content: '请输入手机号和验证码' });
            return;
        }
        setIsLoading(true);
        // 模拟登录
        await new Promise((r) => setTimeout(r, 1000));
        Toast.show({ content: '登录成功', icon: 'success' });
        router.push('/');
    };

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: 'white' }}>
                {/* Header */}
                <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #F3F4F6' }}>
                    <button onClick={() => router.back()} style={{ background: 'none', border: 'none' }}>
                        <ArrowLeft size={20} />
                    </button>
                    <span style={{ flex: 1, textAlign: 'center', fontWeight: '600', fontSize: '16px' }}>登录</span>
                    <div style={{ width: '20px' }} />
                </div>

                <div style={{ padding: '40px 24px' }}>
                    {/* Logo */}
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <div style={{ fontSize: '48px', marginBottom: '12px' }}>👶</div>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2937' }}>宝妈说</div>
                        <div style={{ fontSize: '14px', color: '#6B7280', marginTop: '4px' }}>真实决策，不踩坑</div>
                    </div>

                    {/* Phone Input */}
                    <div style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', background: '#F9FAFB', borderRadius: '12px', padding: '14px 16px', border: '1px solid #E5E7EB' }}>
                            <Phone size={20} color="#9CA3AF" />
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="请输入手机号"
                                maxLength={11}
                                style={{ flex: 1, marginLeft: '12px', border: 'none', background: 'transparent', fontSize: '16px', outline: 'none' }}
                            />
                        </div>
                    </div>

                    {/* Code Input */}
                    <div style={{ marginBottom: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', background: '#F9FAFB', borderRadius: '12px', padding: '14px 16px', border: '1px solid #E5E7EB' }}>
                            <MessageSquare size={20} color="#9CA3AF" />
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="请输入验证码"
                                maxLength={6}
                                style={{ flex: 1, marginLeft: '12px', border: 'none', background: 'transparent', fontSize: '16px', outline: 'none' }}
                            />
                            <button
                                onClick={handleSendCode}
                                disabled={countdown > 0}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: countdown > 0 ? '#9CA3AF' : '#3B82F6',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {countdown > 0 ? `${countdown}s` : '获取验证码'}
                            </button>
                        </div>
                    </div>

                    {/* Login Button */}
                    <button
                        onClick={handleLogin}
                        disabled={isLoading}
                        style={{
                            width: '100%',
                            padding: '14px',
                            background: '#3B82F6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                            marginBottom: '16px',
                        }}
                    >
                        {isLoading ? '登录中...' : '登录 / 注册'}
                    </button>

                    {/* Agreement */}
                    <div style={{ fontSize: '12px', color: '#9CA3AF', textAlign: 'center', lineHeight: 1.6 }}>
                        登录即表示同意
                        <span style={{ color: '#3B82F6' }}>《用户协议》</span>
                        和
                        <span style={{ color: '#3B82F6' }}>《隐私政策》</span>
                    </div>

                    {/* Divider */}
                    <div style={{ display: 'flex', alignItems: 'center', margin: '32px 0' }}>
                        <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
                        <span style={{ padding: '0 16px', fontSize: '12px', color: '#9CA3AF' }}>其他登录方式</span>
                        <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
                    </div>

                    {/* Social Login */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '32px' }}>
                        <button style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#07C160', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                            💬
                        </button>
                        <button style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#F3F4F6', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                            🍎
                        </button>
                    </div>
                </div>
            </div>
        </MobileContainer>
    );
}
