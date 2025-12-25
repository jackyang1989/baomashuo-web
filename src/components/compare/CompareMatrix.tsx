'use client';

import { useState } from 'react';
import { Tag, Popup, List, Tabs } from 'antd-mobile';
import { AlertCircle, CheckCircle, XCircle, Trophy, ChevronRight, HelpCircle } from 'lucide-react';
import type { CompareItem } from '@/types/compare';

interface CompareMatrixProps {
    items: CompareItem[];
    isLeading: (productId: string, dimensionName: string) => boolean;
    babyAge?: number; // 0-36 months, context logic
}

export default function CompareMatrix({ items, isLeading, babyAge = 0 }: CompareMatrixProps) {
    const [abandonPopupVisible, setAbandonPopupVisible] = useState(false);
    const [selectedProductForAbandon, setSelectedProductForAbandon] = useState<CompareItem | null>(null);

    // Assuming dimensions are consistent across items
    const dimensions = items[0]?.dimensions.map(d => d.name) || [];

    const handleShowAbandon = (item: CompareItem) => {
        setSelectedProductForAbandon(item);
        setAbandonPopupVisible(true);
    };

    // Helper to render PK Bar
    // Only works perfectly for 2 items. If >2, we might need a different view, but user requested PK style.
    // We'll visualize Item 0 (Left) vs Item 1 (Right).
    const renderPKBar = (label: string, scoreL: number, scoreR: number, isBestL: boolean, isBestR: boolean) => {
        const total = 20; // 10 + 10 max
        // Visualizing as a split bar? Or separate bars meeting in middle?
        // "Horizontal relative layout... middle shows index name" -> [ ===== Label ===== ]

        return (
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                {/* Left Bar (Right aligned) */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: isBestL ? '#10B981' : '#374151' }}>
                        {scoreL.toFixed(1)}
                    </span>
                    <div style={{ width: '80px', height: '8px', background: '#F3F4F6', borderRadius: '4px', overflow: 'hidden', direction: 'rtl' }}>
                        <div style={{ height: '100%', width: `${(scoreL / 10) * 100}%`, background: isBestL ? '#10B981' : '#9CA3AF', borderRadius: '4px' }} />
                    </div>
                </div>

                {/* Label (Center) */}
                <div style={{
                    width: '70px',
                    textAlign: 'center',
                    fontSize: '11px',
                    color: '#6B7280',
                    fontWeight: label === '防胀气' && babyAge <= 3 ? 'bold' : 'normal', // Logic: Bold 'Anti-colic' for 0-3m
                    transform: label === '防胀气' && babyAge <= 3 ? 'scale(1.1)' : 'none',
                    transition: 'all 0.3s'
                }}>
                    {label}
                </div>

                {/* Right Bar (Left aligned) */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '80px', height: '8px', background: '#F3F4F6', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(scoreR / 10) * 100}%`, background: isBestR ? '#10B981' : '#9CA3AF', borderRadius: '4px' }} />
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: isBestR ? '#10B981' : '#374151' }}>
                        {scoreR.toFixed(1)}
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div style={{ padding: '0 16px' }}>

            {/* 1. 核心决策 PK (推荐率 & 弃用率) */}
            <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '20px 16px',
                marginBottom: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}>
                <div style={{ width: '100%', textAlign: 'center', marginBottom: '20px', fontSize: '14px', fontWeight: 'bold', color: '#1F2937' }}>
                    🛡️ 核心决策对垒
                </div>

                {/* 推荐率 PK */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    {items.map(item => {
                        const isWin = isLeading(item.id, 'recommendRate');
                        return (
                            <div key={item.id} style={{ textAlign: 'center', flex: 1, position: 'relative' }}>
                                {isWin && (
                                    <div style={{
                                        position: 'absolute', top: '-18px', left: '50%', transform: 'translateX(-50%)',
                                        background: '#FEF3C7', color: '#D97706', fontSize: '10px',
                                        padding: '2px 8px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '2px',
                                        whiteSpace: 'nowrap', zIndex: 1
                                    }}>
                                        <Trophy size={10} /> 最佳选择
                                    </div>
                                )}
                                <div style={{ fontSize: '24px', fontWeight: '900', color: isWin ? '#059669' : '#374151' }}>
                                    {item.recommendRate}%
                                </div>
                                <div style={{ fontSize: '11px', color: '#9CA3AF' }}>推荐率</div>
                            </div>
                        );
                    })}
                    {/* VS Indicator */}
                    <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontWeight: '900', color: '#E5E7EB', fontSize: '12px' }}>VS</div>
                </div>

                {/* 弃用率 (Interactive) */}
                <div style={{ display: 'flex', gap: '12px' }}>
                    {items.map(item => {
                        const isGood = isLeading(item.id, 'abandonRate'); // Leading means lowest abandon rate
                        return (
                            <div
                                key={item.id}
                                onClick={() => handleShowAbandon(item)}
                                style={{
                                    flex: 1,
                                    background: isGood ? '#ECFDF5' : '#FEF2F2', // Green bg if good, Red bg if active abandon
                                    borderRadius: '12px',
                                    padding: '12px',
                                    cursor: 'pointer',
                                    border: isGood ? '1px solid #D1FAE5' : '1px solid #FEE2E2',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <div style={{ fontSize: '11px', color: isGood ? '#059669' : '#DC2626', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    {item.abandonRate}% 弃用
                                    <HelpCircle size={10} />
                                </div>
                                <div style={{ fontSize: '10px', color: '#6B7280', textAlign: 'center' }}>
                                    点击看原因
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 2. 详细评分 PK Matrix */}
            <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '20px 16px',
                marginBottom: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}>
                {dimensions.map(dim => {
                    // Assuming 2 items for PK layout
                    const item0 = items[0];
                    const item1 = items[1];
                    if (!item0 || !item1) return null;

                    const score0 = item0.dimensions.find(d => d.name === dim)?.score || 0;
                    const score1 = item1.dimensions.find(d => d.name === dim)?.score || 0;

                    return (
                        <div key={dim}>
                            {renderPKBar(dim, score0, score1, isLeading(item0.id, dim), isLeading(item1.id, dim))}
                        </div>
                    );
                })}
            </div>

            {/* 3. 优缺点列举 (Authenticity) */}
            <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '20px 16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}>
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#374151', marginBottom: '16px', textAlign: 'center' }}>
                    📝 宝妈真实证言
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                    {items.map(item => (
                        <div key={item.id} style={{ flex: 1 }}>
                            {/* Pros */}
                            <div style={{ marginBottom: '12px' }}>
                                {item.summary.pros.map(pro => (
                                    <div key={pro} style={{ display: 'flex', alignItems: 'flex-start', gap: '4px', marginBottom: '4px' }}>
                                        <CheckCircle size={12} color="#10B981" style={{ marginTop: '2px', flexShrink: 0 }} />
                                        <span style={{ fontSize: '11px', color: '#4B5563', lineHeight: '1.4' }}>{pro}</span>
                                    </div>
                                ))}
                            </div>
                            {/* Cons */}
                            <div>
                                {item.summary.cons.map(con => (
                                    <div key={con} style={{ display: 'flex', alignItems: 'flex-start', gap: '4px', marginBottom: '4px' }}>
                                        <XCircle size={12} color="#EF4444" style={{ marginTop: '2px', flexShrink: 0 }} />
                                        <span style={{ fontSize: '11px', color: '#6B7280', lineHeight: '1.4' }}>{con}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. 避坑提醒 (Sticky or Prominent) */}
            {/* Handled inline or if requested strictly as header. User said "If pitfallWarning... background light red". */}
            {/* We can add a specialized row if needed, but let's stick to user request for header/matrix integration */}

            {/* Popup: Abandon Reasons */}
            <Popup
                visible={abandonPopupVisible}
                onMaskClick={() => setAbandonPopupVisible(false)}
                bodyStyle={{ borderTopLeftRadius: '16px', borderTopRightRadius: '16px', minHeight: '40vh' }}
            >
                <div style={{ padding: '24px 16px' }}>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1F2937', marginBottom: '8px' }}>
                        为什么宝妈们放弃了 {selectedProductForAbandon?.brand}?
                    </div>
                    <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '24px' }}>
                        基于 {selectedProductForAbandon?.abandonRate}% 弃用用户的真实反馈
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {selectedProductForAbandon?.abandonReasons.map((reason, idx) => (
                            <div key={idx} style={{
                                background: '#F9FAFB',
                                padding: '12px',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}>
                                <div style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    background: '#FEE2E2',
                                    color: '#DC2626',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    {idx + 1}
                                </div>
                                <span style={{ fontSize: '14px', color: '#374151' }}>{reason}</span>
                            </div>
                        ))}
                    </div>

                    <div
                        onClick={() => setAbandonPopupVisible(false)}
                        style={{
                            marginTop: '32px',
                            width: '100%',
                            padding: '12px',
                            textAlign: 'center',
                            background: '#F3F4F6',
                            borderRadius: '24px',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#374151',
                            cursor: 'pointer'
                        }}
                    >
                        关闭
                    </div>
                </div>
            </Popup>

        </div>
    );
}
