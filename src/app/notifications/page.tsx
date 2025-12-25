'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, Toast } from 'antd-mobile';
import { ArrowLeft, Settings, Heart, MessageSquare, UserPlus, AtSign, Bell, DollarSign, Gift, TrendingUp, Package, AlertCircle, Star, CheckCircle, X, ChevronRight } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { notificationService, type NotificationCategory, type Notification } from '@/services/notificationService';

export default function NotificationsPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('all');
    const [categories, setCategories] = useState<NotificationCategory[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        notificationService.getCategories().then(setCategories);
        notificationService.getUnreadCount().then(setUnreadCount);
    }, []);

    useEffect(() => {
        notificationService.getNotifications(activeTab).then(setNotifications);
    }, [activeTab]);

    const getTypeInfo = (type: string) => {
        const typeMap: Record<string, { icon: any; color: string; bg: string }> = {
            like: { icon: Heart, color: '#EF4444', bg: '#FEE2E2' },
            comment: { icon: MessageSquare, color: '#3B82F6', bg: '#DBEAFE' },
            reply: { icon: MessageSquare, color: '#3B82F6', bg: '#DBEAFE' },
            follow: { icon: UserPlus, color: '#8B5CF6', bg: '#F5F3FF' },
            at: { icon: AtSign, color: '#10B981', bg: '#ECFDF5' },
            system: { icon: Bell, color: '#F59E0B', bg: '#FEF3C7' },
            earnings: { icon: DollarSign, color: '#10B981', bg: '#ECFDF5' },
            activity: { icon: Gift, color: '#EC4899', bg: '#FCE7F3' },
            reward: { icon: Star, color: '#FBBF24', bg: '#FEF3C7' },
            order: { icon: Package, color: '#3B82F6', bg: '#DBEAFE' },
            price_drop: { icon: TrendingUp, color: '#EF4444', bg: '#FEE2E2' },
            milestone: { icon: CheckCircle, color: '#8B5CF6', bg: '#F5F3FF' },
        };
        return typeMap[type] || typeMap.system;
    };

    const handleMarkAsRead = async (id: string) => {
        await notificationService.markAsRead(id);
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
        setUnreadCount(Math.max(0, unreadCount - 1));
    };

    const handleMarkAllAsRead = async () => {
        await notificationService.markAllAsRead();
        setNotifications(notifications.map(n => ({ ...n, read: true })));
        setUnreadCount(0);
        Toast.show({ content: '已全部标记已读' });
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        await notificationService.deleteNotification(id);
        setNotifications(notifications.filter(n => n.id !== id));
        Toast.show({ content: '已删除' });
    };

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F7F8FA', display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <div style={{ background: 'white', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 50 }}>
                    <button onClick={() => router.back()} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none' }}>
                        <ArrowLeft size={20} />
                        <span style={{ fontWeight: '600' }}>通知</span>
                        {unreadCount > 0 && <span style={{ background: '#EF4444', color: 'white', fontSize: '11px', padding: '2px 8px', borderRadius: '10px' }}>{unreadCount}</span>}
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        {unreadCount > 0 && <button onClick={handleMarkAllAsRead} style={{ fontSize: '14px', color: '#3B82F6', background: 'none', border: 'none' }}>全部已读</button>}
                        <button style={{ background: 'none', border: 'none' }}><Settings size={20} color="#6B7280" /></button>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ background: 'white', borderBottom: '1px solid #E5E7EB', position: 'sticky', top: '52px', zIndex: 40 }}>
                    <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ '--title-font-size': '14px' }}>
                        {categories.map(cat => (
                            <Tabs.Tab
                                key={cat.id}
                                title={
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        {cat.name}
                                        {cat.count > 0 && <span style={{ fontSize: '10px', background: activeTab === cat.id ? '#DBEAFE' : '#F3F4F6', color: activeTab === cat.id ? '#3B82F6' : '#6B7280', padding: '1px 6px', borderRadius: '8px' }}>{cat.count}</span>}
                                    </div>
                                }
                            />
                        ))}
                    </Tabs>
                </div>

                {/* Notifications List */}
                <div style={{ flex: 1, overflow: 'auto' }}>
                    {notifications.length > 0 ? (
                        <div style={{ background: 'white' }}>
                            {notifications.map((notification) => {
                                const typeInfo = getTypeInfo(notification.type);
                                const IconComponent = typeInfo.icon;

                                return (
                                    <div
                                        key={notification.id}
                                        onClick={() => handleMarkAsRead(notification.id)}
                                        style={{
                                            padding: '12px 16px',
                                            borderBottom: '1px solid #F3F4F6',
                                            background: notification.read ? 'white' : 'rgba(59, 130, 246, 0.05)',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: typeInfo.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                {notification.user ? (
                                                    <span style={{ fontSize: '24px' }}>{notification.user.avatar}</span>
                                                ) : (
                                                    <span style={{ fontSize: '24px' }}>{notification.icon}</span>
                                                )}
                                            </div>

                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                                                    <div style={{ flex: 1 }}>
                                                        {notification.user && <span style={{ fontWeight: '600', fontSize: '14px', color: '#1F2937' }}>{notification.user.name} </span>}
                                                        <span style={{ fontSize: '14px', color: notification.user ? '#6B7280' : '#1F2937', fontWeight: notification.user ? 'normal' : '600' }}>{notification.content}</span>
                                                    </div>
                                                    {!notification.read && <div style={{ width: '8px', height: '8px', background: '#3B82F6', borderRadius: '50%', flexShrink: 0, marginTop: '6px', marginLeft: '8px' }} />}
                                                </div>

                                                {notification.comment && (
                                                    <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '8px', marginBottom: '4px', fontSize: '13px', color: '#374151' }}>
                                                        💬 {notification.comment}
                                                    </div>
                                                )}

                                                {notification.description && (
                                                    <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>{notification.description}</div>
                                                )}

                                                {notification.target && (
                                                    <div style={{ fontSize: '13px', color: '#3B82F6', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                        「{notification.target}」
                                                    </div>
                                                )}

                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{notification.time}</span>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        {notification.link && <button style={{ fontSize: '12px', color: '#3B82F6', background: 'none', border: 'none' }}>查看详情 →</button>}
                                                        <button onClick={(e) => handleDelete(notification.id, e)} style={{ background: 'none', border: 'none', color: '#9CA3AF' }}><X size={16} /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '80px 0' }}>
                            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
                            <div style={{ color: '#6B7280', marginBottom: '8px' }}>暂无通知</div>
                            <div style={{ fontSize: '14px', color: '#9CA3AF' }}>消息都看完啦</div>
                        </div>
                    )}
                </div>

                {/* Bottom Settings */}
                <div style={{ background: 'white', borderTop: '1px solid #E5E7EB', padding: '12px 16px' }}>
                    <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', padding: '8px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#374151' }}>
                            <Settings size={18} />
                            <span style={{ fontSize: '14px' }}>通知设置</span>
                        </div>
                        <ChevronRight size={18} color="#9CA3AF" />
                    </button>
                </div>
            </div>
        </MobileContainer>
    );
}
