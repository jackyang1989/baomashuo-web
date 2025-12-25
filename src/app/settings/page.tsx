'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toast, Switch, Dialog } from 'antd-mobile';
import { ArrowLeft, ChevronRight, User, Bell, Shield, Moon, HelpCircle, MessageSquare, Star, LogOut, Trash2 } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';

interface SettingItem {
    id: string;
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    type: 'link' | 'switch' | 'action';
    value?: boolean;
    href?: string;
    danger?: boolean;
}

const SETTING_GROUPS = [
    {
        title: '账号设置',
        items: [
            { id: 'profile', icon: <User size={18} />, title: '个人资料', type: 'link' as const, href: '/me/edit' },
            { id: 'bindPhone', icon: <Shield size={18} />, title: '绑定手机', subtitle: '138****8888', type: 'link' as const },
            { id: 'bindWechat', icon: <MessageSquare size={18} />, title: '绑定微信', subtitle: '已绑定', type: 'link' as const },
        ],
    },
    {
        title: '通知设置',
        items: [
            { id: 'pushNotify', icon: <Bell size={18} />, title: '推送通知', type: 'switch' as const, value: true },
            { id: 'commentNotify', icon: <MessageSquare size={18} />, title: '评论提醒', type: 'switch' as const, value: true },
            { id: 'likeNotify', icon: <Star size={18} />, title: '点赞提醒', type: 'switch' as const, value: false },
        ],
    },
    {
        title: '其他',
        items: [
            { id: 'darkMode', icon: <Moon size={18} />, title: '深色模式', type: 'switch' as const, value: false },
            { id: 'help', icon: <HelpCircle size={18} />, title: '帮助与反馈', type: 'link' as const },
            { id: 'about', icon: <Star size={18} />, title: '关于我们', subtitle: 'v1.0.0', type: 'link' as const },
        ],
    },
    {
        title: '',
        items: [
            { id: 'logout', icon: <LogOut size={18} />, title: '退出登录', type: 'action' as const, danger: true },
            { id: 'deleteAccount', icon: <Trash2 size={18} />, title: '注销账号', type: 'action' as const, danger: true },
        ],
    },
];

export default function SettingsPage() {
    const router = useRouter();
    const [settings, setSettings] = useState<Record<string, boolean>>({
        pushNotify: true,
        commentNotify: true,
        likeNotify: false,
        darkMode: false,
    });

    const handleToggle = (id: string) => {
        setSettings((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleAction = async (id: string) => {
        if (id === 'logout') {
            const confirmed = await Dialog.confirm({
                content: '确定要退出登录吗？',
            });
            if (confirmed) {
                Toast.show({ content: '已退出登录' });
                router.push('/login');
            }
        } else if (id === 'deleteAccount') {
            const confirmed = await Dialog.confirm({
                content: '注销账号后，所有数据将被删除且无法恢复，确定要继续吗？',
            });
            if (confirmed) {
                Toast.show({ content: '账号已注销' });
                router.push('/login');
            }
        }
    };

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F7F8FA' }}>
                {/* Header */}
                <div style={{ background: 'white', padding: '12px 16px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #F3F4F6' }}>
                    <button onClick={() => router.back()} style={{ background: 'none', border: 'none' }}>
                        <ArrowLeft size={20} />
                    </button>
                    <span style={{ flex: 1, textAlign: 'center', fontWeight: '600', fontSize: '16px' }}>设置</span>
                    <div style={{ width: '20px' }} />
                </div>

                <div style={{ padding: '16px' }}>
                    {SETTING_GROUPS.map((group, gIdx) => (
                        <div key={gIdx} style={{ marginBottom: '16px' }}>
                            {group.title && (
                                <div style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '8px', paddingLeft: '4px' }}>{group.title}</div>
                            )}
                            <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden' }}>
                                {group.items.map((item, idx) => (
                                    <div
                                        key={item.id}
                                        onClick={() => {
                                            if (item.type === 'link' && item.href) router.push(item.href);
                                            if (item.type === 'action') handleAction(item.id);
                                        }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '14px 16px',
                                            borderBottom: idx < group.items.length - 1 ? '1px solid #F3F4F6' : 'none',
                                            cursor: item.type !== 'switch' ? 'pointer' : 'default',
                                        }}
                                    >
                                        <div style={{ color: item.danger ? '#EF4444' : '#6B7280', marginRight: '12px' }}>{item.icon}</div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '15px', color: item.danger ? '#EF4444' : '#1F2937' }}>{item.title}</div>
                                        </div>
                                        {item.subtitle && <span style={{ fontSize: '13px', color: '#9CA3AF', marginRight: '8px' }}>{item.subtitle}</span>}
                                        {item.type === 'switch' && (
                                            <Switch
                                                checked={settings[item.id]}
                                                onChange={() => handleToggle(item.id)}
                                                style={{ '--checked-color': '#3B82F6' }}
                                            />
                                        )}
                                        {item.type === 'link' && <ChevronRight size={18} color="#D1D5DB" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MobileContainer>
    );
}
