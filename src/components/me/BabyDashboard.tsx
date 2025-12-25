'use client';

import { Card } from 'antd-mobile';
import { Baby, Edit3, ChevronRight, Sparkles } from 'lucide-react';
import type { BabyProfile } from '@/types/user';
import { CONDITION_LABELS } from '@/types/user';

interface BabyDashboardProps {
    babies: BabyProfile[];
    onSwitch?: (babyId: string) => void;
}

export default function BabyDashboard({ babies, onSwitch }: BabyDashboardProps) {
    const currentBaby = babies.find(b => b.isDefault) || babies[0];
    const otherBabies = babies.filter(b => b.id !== currentBaby?.id);
    const PINK_COLOR = '#FF8FA3';

    if (!currentBaby) return null;

    // Exact age string calculation
    const ageString = `${currentBaby.ageMonths}个月${currentBaby.ageDays}天`;

    return (
        <Card style={{ borderRadius: '16px', marginBottom: '12px', padding: '16px' }}>
            {/* Title */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={16} color={PINK_COLOR} />
                    <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#1F2937' }}>
                        宝宝档案
                    </span>
                </div>
                <div style={{ fontSize: '12px', color: '#9CA3AF', display: 'flex', alignItems: 'center' }}>
                    精准育儿推荐
                    <ChevronRight size={14} />
                </div>
            </div>

            {/* Current Baby Card */}
            <div style={{ display: 'flex', gap: '16px' }}>
                {/* Avatar */}
                <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: '#FFF0F3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    flexShrink: 0,
                }}>
                    {currentBaby.avatar}
                </div>

                {/* Details */}
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1F2937' }}>
                            {currentBaby.name}
                            <span style={{ fontSize: '12px', fontWeight: 'normal', color: '#6B7280', marginLeft: '6px' }}>
                                {ageString}
                            </span>
                        </div>
                        {/* Switcher Trigger (Simple implementation) */}
                        {otherBabies.length > 0 && (
                            <div
                                onClick={() => onSwitch?.(otherBabies[0].id)}
                                style={{
                                    fontSize: '11px',
                                    color: '#3B82F6',
                                    background: '#EFF6FF',
                                    padding: '4px 8px',
                                    borderRadius: '12px',
                                    cursor: 'pointer'
                                }}
                            >
                                切换
                            </div>
                        )}
                    </div>

                    {/* Condition Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                        {/* Gender Tag */}
                        <span style={{
                            fontSize: '11px',
                            padding: '2px 8px',
                            borderRadius: '6px',
                            background: '#F3F4F6',
                            color: '#4B5563',
                        }}>
                            {currentBaby.gender === 'girl' ? '👧 女宝宝' : '👦 男宝宝'}
                        </span>

                        {/* Conditions */}
                        {currentBaby.conditions.map(c => (
                            <span key={c} style={{
                                fontSize: '11px',
                                padding: '2px 8px',
                                borderRadius: '6px',
                                background: '#FFF4E5', // Light Orange
                                color: '#D97706', // Orange Text
                            }}>
                                {CONDITION_LABELS[c]}
                            </span>
                        ))}
                        {currentBaby.allergies.map(a => (
                            <span key={a.name} style={{
                                fontSize: '11px',
                                padding: '2px 8px',
                                borderRadius: '6px',
                                background: '#FEE2E2', // Light Red
                                color: '#EF4444', // Red Text
                            }}>
                                {a.type === 'food' ? `🚫 ${a.name}` : a.name}
                            </span>
                        ))}
                    </div>

                    {/* Value Prop */}
                    <div style={{
                        fontSize: '11px',
                        color: '#059669', // Green
                        background: '#ECFDF5',
                        padding: '6px 10px',
                        borderRadius: '8px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}>
                        <Sparkles size={10} />
                        已为您开启个性化选品过滤
                    </div>
                </div>
            </div>
        </Card>
    );
}
