'use client';

import { Card, Grid, Badge } from 'antd-mobile';
import { MessageSquare, Heart, FileText, Gift, Settings, HelpCircle, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface MenuGridProps {
    reviewCount: number;
    favoriteCount: number;
}

export default function MenuGrid({ reviewCount, favoriteCount }: MenuGridProps) {
    const router = useRouter();

    // Grid Items
    const gridItems = [
        {
            label: '我的评价',
            icon: MessageSquare,
            path: '/me/reviews',
            color: '#3B82F6', // Blue
            value: `${reviewCount}条`
        },
        {
            label: '我的收藏',
            icon: Heart,
            path: '/me/favorites',
            color: '#EF4444', // Red
            value: `${favoriteCount}件`
        },
        {
            label: '我的订单',
            icon: FileText,
            path: '/me/orders',
            color: '#8B5CF6', // Purple
            value: ''
        },
        {
            label: '优惠券',
            icon: Gift,
            path: '/me/coupons',
            color: '#F59E0B', // Orange
            badge: true
        },
    ];

    // List Items
    const listItems = [
        { label: '设置', icon: Settings, path: '/me/settings' },
        { label: '帮助与反馈', icon: HelpCircle, path: '/me/help' },
    ];

    return (
        <>
            {/* Functional Grid */}
            <Card style={{ borderRadius: '16px', marginBottom: '12px', padding: '16px' }}>
                <Grid columns={4} gap={8}>
                    {gridItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Grid.Item key={item.label} onClick={() => router.push(item.path)}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '4px 0', cursor: 'pointer' }}>
                                    <div style={{ position: 'relative' }}>
                                        <Icon size={24} color={item.color} />
                                        {item.badge && (
                                            <Badge
                                                content={Badge.dot}
                                                style={{ position: 'absolute', top: -2, right: -2, '--color': '#EF4444' } as React.CSSProperties}
                                            />
                                        )}
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#4B5563' }}>{item.label}</div>
                                    {item.value && (
                                        <div style={{ fontSize: '10px', color: '#9CA3AF' }}>{item.value}</div>
                                    )}
                                </div>
                            </Grid.Item>
                        );
                    })}
                </Grid>
            </Card>

            {/* List Actions */}
            <Card style={{ borderRadius: '16px', padding: '0 16px' }}>
                {listItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.label}
                            onClick={() => router.push(item.path)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '16px 0',
                                borderBottom: index < listItems.length - 1 ? '1px solid #F3F4F6' : 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <Icon size={20} color="#6B7280" style={{ marginRight: '12px' }} />
                            <span style={{ flex: 1, fontSize: '15px', color: '#1F2937' }}>{item.label}</span>
                            <ChevronRight size={16} color="#D1D5DB" />
                        </div>
                    );
                })}
            </Card>
        </>
    );
}
