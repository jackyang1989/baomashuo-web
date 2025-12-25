'use client';

import { Card, Grid, ProgressBar } from 'antd-mobile';
import { Award, ThumbsUp, Users, Heart } from 'lucide-react';
import type { UserProfile, UserLevel, InfluenceStats, Achievement } from '@/types/user';

interface ProfileHeaderProps {
    profile: UserProfile;
    level: UserLevel;
    influence: InfluenceStats;
    achievements: Achievement[];
}

export default function ProfileHeader({ profile, level, influence, achievements }: ProfileHeaderProps) {
    const expProgress = (level.exp / level.nextLevelExp) * 100;
    // Requirement: Main color Soft Pink #FF8FA3
    const PINK_COLOR = '#FF8FA3';

    return (
        <Card style={{ borderRadius: '16px', marginBottom: '12px', padding: '16px' }}>
            {/* 1. Header: Avatar + Nickname + Level + Progress */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                {/* Avatar */}
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
                        bottom: '-2px',
                        right: '-2px',
                        background: `linear-gradient(135deg, ${PINK_COLOR}, #FF6B8B)`,
                        borderRadius: '10px',
                        padding: '2px 8px',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        color: 'white',
                        border: '2px solid white',
                    }}>
                        Lv{level.level}
                    </div>
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>
                            {profile.nickname}
                        </span>
                        <span style={{
                            fontSize: '11px',
                            background: '#FFF0F3', // Light pink bg
                            color: '#F43F5E', // Dark pink text
                            padding: '2px 8px',
                            borderRadius: '10px',
                        }}>
                            {level.name}
                        </span>
                    </div>

                    <div style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>
                            <span>成长值</span>
                            <span>{level.exp}/{level.nextLevelExp}</span>
                        </div>
                        {/* Requirement: Progress bar blue-purple gradient or pure blue */}
                        <ProgressBar
                            percent={expProgress}
                            style={{
                                '--track-width': '6px',
                                '--fill-color': 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                                borderRadius: '3px'
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* 2. Influence Stats Grid */}
            <div style={{
                background: '#F9FAFB',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid #F3F4F6'
            }}>
                <Grid columns={4} gap={8}>
                    {/* Helped - Highlighted */}
                    <Grid.Item>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>
                                {influence.helpedMoms}
                            </div>
                            <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>
                                帮助人数
                            </div>
                        </div>
                    </Grid.Item>

                    {/* Resonance - Highlighted */}
                    <Grid.Item>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: PINK_COLOR }}>
                                {influence.resonateCount}
                            </div>
                            <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
                                <Heart size={10} color={PINK_COLOR} />
                                共鸣
                            </div>
                        </div>
                    </Grid.Item>

                    {/* Helpful */}
                    <Grid.Item>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>
                                {influence.helpfulCount}
                            </div>
                            <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>
                                收获有用
                            </div>
                        </div>
                    </Grid.Item>

                    {/* Reviews */}
                    <Grid.Item>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>
                                {influence.totalReviews}
                            </div>
                            <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>
                                发布评价
                            </div>
                        </div>
                    </Grid.Item>
                </Grid>
            </div>
        </Card>
    );
}
