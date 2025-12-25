'use client';

import { Card, Grid } from 'antd-mobile';
import { Award, ThumbsUp, Users, Heart } from 'lucide-react';
import type { UserProfile, UserLevel, InfluenceStats, Badge } from '@/types/user';

interface UserInfoCardProps {
    profile: UserProfile;
    level: UserLevel;
    influence: InfluenceStats;
    badges: Badge[];
}

/**
 * 用户信息卡片 - 身份与影响力
 */
export default function UserInfoCard({ profile, level, influence, badges }: UserInfoCardProps) {
    const expProgress = (level.exp / level.nextLevelExp) * 100;
    const earnedBadges = badges.filter(b => !b.isLocked);

    return (
        <Card style={{ borderRadius: '16px', marginBottom: '12px' }}>
            {/* 用户基础信息 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                {/* 头像 */}
                <div style={{ position: 'relative' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: '#f5f5f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '32px',
                    }}>
                        {profile.avatar}
                    </div>
                    <div style={{
                        position: 'absolute',
                        bottom: '-4px',
                        right: '-4px',
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        borderRadius: '12px',
                        padding: '2px 8px',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        color: 'white',
                    }}>
                        Lv{level.level}
                    </div>
                </div>

                {/* 昵称与等级 */}
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>
                            {profile.nickname}
                        </span>
                        <span style={{
                            fontSize: '11px',
                            background: '#f3f4f6',
                            color: '#6b7280',
                            padding: '2px 8px',
                            borderRadius: '12px',
                        }}>
                            {level.name}
                        </span>
                        {influence.topContributor && (
                            <span style={{
                                fontSize: '11px',
                                background: '#fef3c7',
                                color: '#d97706',
                                padding: '2px 8px',
                                borderRadius: '12px',
                            }}>
                                优质贡献者
                            </span>
                        )}
                    </div>

                    {/* 经验条 */}
                    <div style={{ marginTop: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>
                            <span>成长值</span>
                            <span>{level.exp}/{level.nextLevelExp}</span>
                        </div>
                        <div style={{ height: '4px', background: '#f3f4f6', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{
                                width: `${expProgress}%`,
                                height: '100%',
                                background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                                borderRadius: '2px',
                                transition: 'width 0.3s',
                            }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* 影响力数据 - 4列网格 */}
            <div style={{
                background: '#f7f8fa',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '16px',
            }}>
                <Grid columns={4} gap={8}>
                    <Grid.Item>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>
                                {influence.totalReviews}
                            </div>
                            <div style={{ fontSize: '11px', color: '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                评价
                            </div>
                        </div>
                    </Grid.Item>
                    <Grid.Item>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>
                                {influence.helpfulCount}
                            </div>
                            <div style={{ fontSize: '11px', color: '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                <ThumbsUp size={12} />
                                有用
                            </div>
                        </div>
                    </Grid.Item>
                    <Grid.Item>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#3b82f6' }}>
                                {influence.resonateCount}
                            </div>
                            <div style={{ fontSize: '11px', color: '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                <Heart size={12} />
                                共鸣
                            </div>
                        </div>
                    </Grid.Item>
                    <Grid.Item>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#8b5cf6' }}>
                                {influence.helpedMoms}
                            </div>
                            <div style={{ fontSize: '11px', color: '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                <Users size={12} />
                                帮助
                            </div>
                        </div>
                    </Grid.Item>
                </Grid>
            </div>

            {/* 成就徽章 */}
            {earnedBadges.length > 0 && (
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <Award size={16} color="#8b5cf6" />
                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937' }}>我的成就</span>
                        <span style={{ fontSize: '11px', color: '#9ca3af' }}>{earnedBadges.length}枚</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {earnedBadges.map(badge => (
                            <div key={badge.id} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                background: '#f3f4f6',
                                padding: '6px 12px',
                                borderRadius: '20px',
                                fontSize: '12px',
                            }}>
                                <span>{badge.icon}</span>
                                <span style={{ color: '#4b5563' }}>{badge.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
}
