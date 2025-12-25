'use client';

import { Card, Grid } from 'antd-mobile';
import { useRouter } from 'next/navigation';
import {
    MessageSquare, Heart, Wallet, FileText,
    Gift, Settings, HelpCircle, ChevronRight
} from 'lucide-react';
import type { EarningsWallet } from '@/types/user';

interface ActionGridProps {
    wallet: EarningsWallet;
    reviewCount: number;
    favoriteCount: number;
}

/**
 * 工具入口网格
 */
export default function ActionGrid({ wallet, reviewCount, favoriteCount }: ActionGridProps) {
    const router = useRouter();

    // 快捷入口
    const quickActions = [
        { icon: MessageSquare, label: '我的评价', count: reviewCount, path: '/me/reviews', color: '#3b82f6' },
        { icon: Heart, label: '我的收藏', count: favoriteCount, path: '/me/favorites', color: '#ef4444' },
        { icon: FileText, label: '我的订单', path: '/me/orders', color: '#8b5cf6' },
        { icon: Gift, label: '优惠券', badge: 3, path: '/me/coupons', color: '#f59e0b' },
    ];

    // 更多功能
    const moreActions = [
        { icon: Settings, label: '设置', path: '/me/settings' },
        { icon: HelpCircle, label: '帮助与反馈', path: '/me/help' },
    ];

    return (
        <>
            {/* 收益钱包卡片 */}
            <Card
                style={{ borderRadius: '16px', marginBottom: '12px', cursor: 'pointer' }}
                onClick={() => router.push('/me/wallet')}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Wallet size={20} color="white" />
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>收益钱包</div>
                            <div style={{ fontSize: '11px', color: '#9ca3af' }}>今日预估 +¥{wallet.todayEarnings.toFixed(2)}</div>
                        </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ea580c' }}>
                            ¥{wallet.totalEarnings.toFixed(2)}
                        </div>
                        <div style={{ fontSize: '11px', color: '#9ca3af' }}>累计收益</div>
                    </div>
                </div>
            </Card>

            {/* 快捷入口 */}
            <Card style={{ borderRadius: '16px', marginBottom: '12px' }}>
                <Grid columns={4} gap={8}>
                    {quickActions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                            <Grid.Item key={index}>
                                <div
                                    onClick={() => router.push(action.path)}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '12px 0',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <div style={{ position: 'relative' }}>
                                        <Icon size={24} color={action.color} />
                                        {action.badge && (
                                            <span style={{
                                                position: 'absolute',
                                                top: '-6px',
                                                right: '-10px',
                                                background: '#ef4444',
                                                color: 'white',
                                                fontSize: '10px',
                                                padding: '1px 5px',
                                                borderRadius: '10px',
                                            }}>
                                                {action.badge}
                                            </span>
                                        )}
                                    </div>
                                    <span style={{ fontSize: '12px', color: '#4b5563' }}>{action.label}</span>
                                    {action.count !== undefined && (
                                        <span style={{ fontSize: '11px', color: '#9ca3af' }}>{action.count}条</span>
                                    )}
                                </div>
                            </Grid.Item>
                        );
                    })}
                </Grid>
            </Card>

            {/* 更多功能 */}
            <Card style={{ borderRadius: '16px' }}>
                {moreActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                        <div
                            key={index}
                            onClick={() => router.push(action.path)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '14px 0',
                                borderBottom: index < moreActions.length - 1 ? '1px solid #f3f4f6' : 'none',
                                cursor: 'pointer',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Icon size={18} color="#6b7280" />
                                <span style={{ fontSize: '14px', color: '#1f2937' }}>{action.label}</span>
                            </div>
                            <ChevronRight size={16} color="#9ca3af" />
                        </div>
                    );
                })}
            </Card>
        </>
    );
}
