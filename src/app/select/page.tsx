'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Toast, Tag } from 'antd-mobile';
import { ArrowLeft, Star, Users, TrendingUp, Sparkles, CheckCircle, Heart, ChevronRight } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { selectService } from '@/services/selectService';
import type { SelectFeatureConfig, ProblemOption, RecommendedProduct } from '@/types/select';

export default function SelectPage() {
    const router = useRouter();
    const [config, setConfig] = useState<SelectFeatureConfig | null>(null);
    const [problems, setProblems] = useState<ProblemOption[]>([]);
    const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
    const [recommendations, setRecommendations] = useState<RecommendedProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        async function init() {
            const [cfg, probs] = await Promise.all([
                selectService.getConfig(),
                selectService.getProblems(),
            ]);
            setConfig(cfg);
            setProblems(probs);
            setLoading(false);
        }
        init();
    }, []);

    const handleSelectProblem = async (problemId: string) => {
        setSelectedProblem(problemId);
        setShowResults(true);

        const recs = await selectService.getRecommendations({ problem: problemId });
        setRecommendations(recs);
    };

    if (loading) {
        return (
            <MobileContainer>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#F7F8FA' }}>
                    <span style={{ color: '#9CA3AF' }}>加载中...</span>
                </div>
            </MobileContainer>
        );
    }

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F7F8FA' }}>
                {/* Header */}
                <div style={{
                    background: 'white',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    borderBottom: '1px solid #F3F4F6',
                    position: 'sticky',
                    top: 0,
                    zIndex: 50,
                }}>
                    <button onClick={() => router.back()} style={{ background: 'none', border: 'none', padding: 0 }}>
                        <ArrowLeft size={20} color="#374151" />
                    </button>
                    <span style={{ fontSize: '17px', fontWeight: 'bold', color: '#1F2937' }}>怎么选</span>
                </div>

                {/* Content */}
                {!showResults ? (
                    // Step: Problem Selection (Simplified, direct)
                    <div style={{ padding: '16px' }}>
                        <div style={{ marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937', marginBottom: '8px' }}>
                                你遇到什么问题？
                            </h2>
                            <p style={{ fontSize: '14px', color: '#6B7280' }}>
                                选择最困扰你的问题，我们推荐解决方案
                            </p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {problems.map((problem) => (
                                <button
                                    key={problem.id}
                                    onClick={() => handleSelectProblem(problem.id)}
                                    style={{
                                        background: 'white',
                                        border: selectedProblem === problem.id ? '2px solid #3B82F6' : '1px solid #E5E7EB',
                                        borderRadius: '16px',
                                        padding: '16px',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                        <div style={{ fontSize: '32px' }}>{problem.icon}</div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                <span style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937' }}>{problem.title}</span>
                                                <span style={{ fontSize: '11px', color: '#059669', background: '#ECFDF5', padding: '4px 8px', borderRadius: '8px' }}>
                                                    {problem.effectiveness}
                                                </span>
                                            </div>
                                            <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>{problem.description}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => { setShowResults(true); selectService.getRecommendations({}).then(setRecommendations); }}
                            style={{
                                width: '100%',
                                marginTop: '16px',
                                padding: '12px',
                                background: 'none',
                                border: 'none',
                                color: '#6B7280',
                                fontSize: '14px',
                                cursor: 'pointer',
                            }}
                        >
                            跳过，直接看推荐 →
                        </button>
                    </div>
                ) : (
                    // Results Page
                    <div>
                        {/* Filter Summary */}
                        <div style={{ background: 'linear-gradient(to right, #EFF6FF, #F5F3FF)', padding: '16px', borderBottom: '1px solid #E5E7EB' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <h2 style={{ fontSize: '17px', fontWeight: 'bold', color: '#1F2937', margin: 0 }}>为你推荐</h2>
                                <button
                                    onClick={() => setShowResults(false)}
                                    style={{ fontSize: '13px', color: '#3B82F6', background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    修改条件
                                </button>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                <span style={{ fontSize: '12px', background: 'white', padding: '4px 12px', borderRadius: '16px', color: '#374151' }}>
                                    3-6个月宝宝
                                </span>
                                {selectedProblem && (
                                    <span style={{ fontSize: '12px', background: 'white', padding: '4px 12px', borderRadius: '16px', color: '#374151' }}>
                                        {problems.find(p => p.id === selectedProblem)?.title}
                                    </span>
                                )}
                            </div>
                            <div style={{ marginTop: '8px', fontSize: '13px', color: '#6B7280' }}>
                                找到 <span style={{ color: '#3B82F6', fontWeight: '600' }}>{recommendations.length}个</span> 符合条件的产品
                            </div>
                        </div>

                        {/* Product List */}
                        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {recommendations.map((product, index) => (
                                <Card key={product.id} style={{ borderRadius: '16px', padding: '16px' }}>
                                    {/* Match Score Badge */}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#3B82F6' }}>#{index + 1}</span>
                                            <div style={{
                                                padding: '4px 10px',
                                                borderRadius: '16px',
                                                fontSize: '11px',
                                                fontWeight: '600',
                                                background: product.matchScore >= 90 ? '#DCFCE7' : '#DBEAFE',
                                                color: product.matchScore >= 90 ? '#166534' : '#1E40AF',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                            }}>
                                                <Sparkles size={10} />
                                                匹配度 {product.matchScore}%
                                            </div>
                                        </div>
                                        <Heart size={20} color="#D1D5DB" />
                                    </div>

                                    {/* Product Info */}
                                    <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                                        <div style={{
                                            width: '80px',
                                            height: '80px',
                                            background: '#F9FAFB',
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '40px',
                                            border: '1px solid #E5E7EB',
                                            flexShrink: 0,
                                        }}>
                                            {product.image}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '2px' }}>{product.brand}</div>
                                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '8px', lineHeight: '1.4' }}>
                                                {product.name}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                                                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#EF4444' }}>¥{product.price}</span>
                                                {product.originalPrice && (
                                                    <>
                                                        <span style={{ fontSize: '12px', color: '#9CA3AF', textDecoration: 'line-through' }}>¥{product.originalPrice}</span>
                                                        <span style={{ fontSize: '11px', color: '#EF4444', background: '#FEF2F2', padding: '2px 6px', borderRadius: '4px' }}>
                                                            省{product.originalPrice - product.price}元
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#6B7280' }}>
                                                <Star size={12} color="#FBBF24" fill="#FBBF24" />
                                                <span style={{ fontWeight: '600' }}>{product.rating}</span>
                                                <span>•</span>
                                                <span>{product.reviewCount}条评价</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Reasons */}
                                    <div style={{ background: '#EFF6FF', borderRadius: '12px', padding: '12px', marginBottom: '12px' }}>
                                        <div style={{ fontSize: '12px', fontWeight: '600', color: '#1E40AF', marginBottom: '8px' }}>💡 为什么推荐</div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            {product.reasons.map((reason, idx) => (
                                                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '12px', color: '#374151' }}>
                                                    <CheckCircle size={12} color="#10B981" style={{ marginTop: '2px', flexShrink: 0 }} />
                                                    <span>{reason}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Same Age Data */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px', fontSize: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6B7280' }}>
                                            <Users size={14} />
                                            <span>{product.sameAgeUserCount}位宝妈使用</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#059669' }}>
                                            <TrendingUp size={14} />
                                            <span>同月龄推荐率{product.sameAgeRecommendRate}%</span>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                                        {product.tags.map((tag, idx) => (
                                            <span key={idx} style={{ fontSize: '11px', background: '#F3F4F6', color: '#4B5563', padding: '4px 8px', borderRadius: '6px' }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Actions */}
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            onClick={() => router.push(`/product/${product.id}`)}
                                            style={{
                                                flex: 1,
                                                padding: '12px',
                                                background: 'linear-gradient(to right, #3B82F6, #2563EB)',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '12px',
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            查看详情
                                        </button>
                                        <button
                                            onClick={() => router.push(`/select/compare?ids=${product.id}`)}
                                            style={{
                                                padding: '12px 16px',
                                                background: '#F3F4F6',
                                                color: '#374151',
                                                border: 'none',
                                                borderRadius: '12px',
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            对比
                                        </button>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* Contribution CTA */}
                        <div style={{ padding: '0 16px 24px' }}>
                            <div style={{
                                background: 'linear-gradient(to right, #FFF7ED, #FEF3C7)',
                                borderRadius: '16px',
                                padding: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                            }}>
                                <div style={{ fontSize: '28px' }}>✍️</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#92400E', marginBottom: '4px' }}>
                                        你的反馈帮助其他宝妈
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#B45309' }}>
                                        分享你的真实使用体验，让决策更简单
                                    </div>
                                </div>
                                <ChevronRight size={20} color="#D97706" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </MobileContainer>
    );
}
