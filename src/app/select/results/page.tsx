'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toast } from 'antd-mobile';
import { ArrowLeft, Filter, Share2, RefreshCw, Award, CheckCircle, Info, Star, Users, ThumbsUp, AlertTriangle, ShoppingCart } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { smartRecommendService, type SmartConclusion, type RecommendFilters, type RecommendedProductDetail } from '@/services/smartRecommendService';

export default function SelectResultsPage() {
    const router = useRouter();
    const [conclusion, setConclusion] = useState<SmartConclusion | null>(null);
    const [filters, setFilters] = useState<RecommendFilters | null>(null);
    const [products, setProducts] = useState<RecommendedProductDetail[]>([]);
    const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

    useEffect(() => {
        smartRecommendService.getConclusion().then(setConclusion);
        smartRecommendService.getFilters().then(setFilters);
    }, []);

    useEffect(() => {
        // Enforce top 3 strictly for "doing subtraction" for the user
        smartRecommendService.getRecommendations('smart').then(list => setProducts(list.slice(0, 3)));
    }, []);

    const handleCompareToggle = (productId: string) => {
        if (selectedForCompare.includes(productId)) {
            setSelectedForCompare(selectedForCompare.filter(id => id !== productId));
        } else if (selectedForCompare.length < 2) { // Max 2 for simple comparison
            setSelectedForCompare([...selectedForCompare, productId]);
        } else {
            Toast.show({ content: '建议只对比2款产品' });
        }
    };

    if (!conclusion || !filters) return <MobileContainer><div style={{ padding: '48px', textAlign: 'center' }}>加载中...</div></MobileContainer>;

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F5F5F5', paddingBottom: selectedForCompare.length > 0 ? '80px' : '20px' }}>
                {/* Header - Minimal Flat */}
                <div style={{ background: 'white', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E5E7EB', position: 'sticky', top: 0, zIndex: 50 }}>
                    <button onClick={() => router.back()} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none' }}><ArrowLeft size={20} /><span style={{ fontWeight: '600' }}>为你推荐</span></button>
                    <button style={{ background: 'none', border: 'none' }}><Share2 size={20} color="#6B7280" /></button>
                </div>

                {/* AI Summary Card - The "Answer" */}
                <div style={{ padding: '16px' }}>
                    <div style={{ background: '#3B82F6', borderRadius: '12px', padding: '20px', color: 'white', marginBottom: '16px', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                            <div style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Award size={18} /></div>
                            <div>
                                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>最佳匹配：{conclusion.bestMatch.name}</div>
                                <div style={{ fontSize: '12px', opacity: 0.9 }}>基于 {filters.babyAge} {filters.problem} 问题的最优解</div>
                            </div>
                        </div>

                        <div style={{ background: 'white', borderRadius: '8px', padding: '12px', color: '#1F2937', marginBottom: '12px' }}>
                            <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><Users size={14} color="#3B82F6" /> 真实宝妈反馈</div>
                            <div style={{ fontSize: '13px', lineHeight: 1.5 }}>
                                "这款奶瓶在<span style={{ color: '#3B82F6', fontWeight: 'bold' }}>{conclusion.bestMatch.matchScore}%</span>的同类问题家庭中获得好评，特别是针对<span style={{ fontWeight: 'bold' }}>{filters.problem}</span>效果显著。"
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
                            {conclusion.keyPoints.map((point, idx) => (
                                <span key={idx} style={{ fontSize: '11px', background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '12px', whiteSpace: 'nowrap' }}>✓ {point}</span>
                            ))}
                        </div>
                    </div>

                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#374151', marginBottom: '12px' }}>综合推荐 Top 3</div>

                    {/* Top 3 Products List */}
                    {products.map((product, index) => (
                        <div key={product.id} style={{ background: 'white', borderRadius: '12px', padding: '16px', marginBottom: '12px', border: '1px solid #E5E7EB', position: 'relative', overflow: 'hidden' }}>
                            {index === 0 && <div style={{ position: 'absolute', top: 0, right: 0, background: '#F59E0B', color: 'white', fontSize: '11px', padding: '4px 12px', borderRadius: '0 0 0 12px', fontWeight: 'bold' }}>首选推荐</div>}

                            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                                <div style={{ width: '80px', height: '80px', background: '#F9FAFB', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', flexShrink: 0, border: '1px solid #E5E7EB' }}>{product.image}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                        <div>
                                            <div style={{ fontSize: '12px', color: '#9CA3AF' }}>{product.brand}</div>
                                            <div style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>{product.name}</div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', background: '#ECFDF5', padding: '2px 6px', borderRadius: '4px' }}>
                                            <ThumbsUp size={10} color="#059669" />
                                            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#059669' }}>{product.matchScore}%推荐</span>
                                        </div>
                                        <div style={{ fontSize: '11px', color: '#6B7280' }}>{product.stats.sameAgeUsers}位同月龄宝妈验证</div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                                        <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#EF4444' }}>¥{product.price}</span>
                                        <span style={{ fontSize: '11px', color: '#9CA3AF', textDecoration: 'line-through' }}>¥{product.originalPrice}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Verification Data - The "Why" */}
                            <div style={{ background: '#F8FAFC', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
                                <div style={{ fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>🛡️ 宝妈验证数据</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#475569', marginBottom: '8px' }}>
                                    <span>同月龄使用：<span style={{ fontWeight: 'bold' }}>{product.stats.sameAgeUsers}</span>人</span>
                                    <span>好评率：<span style={{ fontWeight: 'bold', color: '#059669' }}>{product.rating}</span>/5.0</span>
                                </div>
                                <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', gap: '8px' }}>
                                    <span style={{ background: 'white', padding: '2px 6px', borderRadius: '4px', border: '1px solid #E2E8F0' }}>👍 {product.pros[0]}</span>
                                    <span style={{ background: 'white', padding: '2px 6px', borderRadius: '4px', border: '1px solid #E2E8F0' }}>👍 {product.pros[1]}</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button onClick={() => router.push(`/product/${product.id}`)} style={{ flex: 1, padding: '10px', borderRadius: '8px', background: 'white', color: '#3B82F6', border: '1px solid #3B82F6', fontWeight: '600', fontSize: '14px' }}>查看详情</button>
                                <button style={{ flex: 1, padding: '10px', borderRadius: '8px', background: '#3B82F6', color: 'white', border: 'none', fontWeight: '600', fontSize: '14px' }}>去购买</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MobileContainer>
    );
}
