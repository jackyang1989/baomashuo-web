'use client';

import { Card } from 'antd-mobile';
import { Baby, Edit3, ChevronRight, AlertTriangle } from 'lucide-react';
import type { BabyProfile } from '@/types/user';
import { CONDITION_LABELS } from '@/types/user';

interface BabyProfileBoxProps {
    babies: BabyProfile[];
    onEdit?: (babyId: string) => void;
    onSwitch?: (babyId: string) => void;
}

/**
 * 宝宝档案卡片 - 支持多宝宝切换
 */
export default function BabyProfileBox({ babies, onEdit, onSwitch }: BabyProfileBoxProps) {
    const defaultBaby = babies.find(b => b.isDefault) || babies[0];
    const otherBabies = babies.filter(b => b.id !== defaultBaby?.id);

    if (!defaultBaby) {
        return (
            <Card style={{ borderRadius: '16px', marginBottom: '12px' }}>
                <div style={{ textAlign: 'center', padding: '20px', color: '#9ca3af' }}>
                    <Baby size={32} style={{ marginBottom: '8px' }} />
                    <p style={{ fontSize: '14px' }}>还没有添加宝宝信息</p>
                    <button style={{
                        marginTop: '12px',
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        color: 'white',
                        border: 'none',
                        padding: '8px 24px',
                        borderRadius: '20px',
                        fontSize: '14px',
                        cursor: 'pointer',
                    }}>
                        添加宝宝
                    </button>
                </div>
            </Card>
        );
    }

    // 计算精准年龄文案
    const getAgeText = (months: number, days: number) => {
        if (months >= 12) {
            const years = Math.floor(months / 12);
            const remainingMonths = months % 12;
            return `${years}岁${remainingMonths > 0 ? remainingMonths + '个月' : ''}`;
        }
        return `${months}个月${days > 0 ? days + '天' : ''}`;
    };

    return (
        <Card style={{ borderRadius: '16px', marginBottom: '12px' }}>
            {/* 标题栏 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Baby size={16} color="#3b82f6" />
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>宝宝档案</span>
                </div>
                <button
                    onClick={() => onEdit?.(defaultBaby.id)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: 'none',
                        border: 'none',
                        color: '#3b82f6',
                        fontSize: '12px',
                        cursor: 'pointer',
                    }}
                >
                    <Edit3 size={12} />
                    编辑
                </button>
            </div>

            {/* 当前宝宝 */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: '#f7f8fa',
                borderRadius: '12px',
                padding: '12px',
                marginBottom: '12px',
            }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: defaultBaby.gender === 'girl' ? '#fce7f3' : '#dbeafe',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                }}>
                    {defaultBaby.avatar}
                </div>

                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '15px', fontWeight: '600', color: '#1f2937' }}>
                            {defaultBaby.name}
                        </span>
                        <span style={{ fontSize: '11px' }}>
                            {defaultBaby.gender === 'girl' ? '👧' : '👦'}
                        </span>
                        {defaultBaby.isDefault && (
                            <span style={{
                                fontSize: '10px',
                                background: '#dbeafe',
                                color: '#3b82f6',
                                padding: '2px 6px',
                                borderRadius: '4px',
                            }}>
                                默认
                            </span>
                        )}
                    </div>
                    <div style={{ fontSize: '13px', color: '#6b7280' }}>
                        {getAgeText(defaultBaby.ageMonths, defaultBaby.ageDays)}
                    </div>
                </div>
            </div>

            {/* 特殊体质标记 */}
            {(defaultBaby.conditions.length > 0 || defaultBaby.allergies.length > 0) && (
                <div style={{
                    background: '#fef3c7',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    marginBottom: '12px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                        <AlertTriangle size={14} color="#d97706" />
                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#92400e' }}>特殊体质标记</span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {defaultBaby.conditions.map(condition => (
                            <span key={condition} style={{
                                fontSize: '11px',
                                background: '#fde68a',
                                color: '#92400e',
                                padding: '2px 8px',
                                borderRadius: '4px',
                            }}>
                                {CONDITION_LABELS[condition]}
                            </span>
                        ))}
                        {defaultBaby.allergies.map(allergy => (
                            <span key={allergy.name} style={{
                                fontSize: '11px',
                                background: '#fee2e2',
                                color: '#dc2626',
                                padding: '2px 8px',
                                borderRadius: '4px',
                            }}>
                                {allergy.name}过敏
                            </span>
                        ))}
                    </div>
                    <p style={{ fontSize: '11px', color: '#92400e', marginTop: '6px' }}>
                        已为您开启个性化选品过滤
                    </p>
                </div>
            )}

            {/* 其他宝宝 - 快速切换 */}
            {otherBabies.length > 0 && (
                <div>
                    <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>切换宝宝</div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {otherBabies.map(baby => (
                            <button
                                key={baby.id}
                                onClick={() => onSwitch?.(baby.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    background: '#f3f4f6',
                                    border: 'none',
                                    padding: '8px 12px',
                                    borderRadius: '20px',
                                    cursor: 'pointer',
                                }}
                            >
                                <span style={{ fontSize: '16px' }}>{baby.avatar}</span>
                                <span style={{ fontSize: '12px', color: '#4b5563' }}>{baby.name}</span>
                                <ChevronRight size={12} color="#9ca3af" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
}
