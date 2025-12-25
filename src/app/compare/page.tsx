'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toast } from 'antd-mobile';
import { ArrowLeft, X, Plus, Star, TrendingUp, ThumbsUp, ThumbsDown, CheckCircle, ChevronDown, ChevronUp, ShoppingCart, Share2 } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { compareService, type CompareProduct, type CompareDimension, type CompareParams } from '@/services/compareService';

export default function ComparePage() {
    const router = useRouter();
    const [products, setProducts] = useState<(CompareProduct | null)[]>([]);
    const [dimensions, setDimensions] = useState<CompareDimension[]>([]);
    const [params, setParams] = useState<CompareParams[]>([]);
    const [alternatives, setAlternatives] = useState<CompareProduct[]>([]);

    const [expandedSections, setExpandedSections] = useState({
        basic: true,
        score: true,
        pros: true,
        cons: true,
        params: false,
    });

    useEffect(() => {
        compareService.getCompareProducts().then(setProducts);
        compareService.getDimensions().then(setDimensions);
        compareService.getParams().then(setParams);
        compareService.getAlternatives().then(setAlternatives);
    }, []);

    const handleRemoveProduct = (index: number) => {
        const newProducts = [...products];
        newProducts[index] = null;
        setProducts(newProducts);
    };

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections({ ...expandedSections, [section]: !expandedSections[section] });
    };

    const getMaxScore = (scores: (number | null)[]) => {
        const valid = scores.filter((s): s is number => s !== null);
        return valid.length > 0 ? Math.max(...valid) : 0;
    };

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F7F8FA', paddingBottom: '80px' }}>
                {/* Header */}
                <div style={{ background: 'white', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 50 }}>
                    <button onClick={() => router.back()} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none' }}>
                        <ArrowLeft size={20} />
                        <span style={{ fontWeight: '600' }}>产品对比</span>
                    </button>
                    <button style={{ fontSize: '14px', color: '#3B82F6', background: 'none', border: 'none' }}><Share2 size={18} /></button>
                </div>

                {/* Product Headers */}
                <div style={{ background: 'white', padding: '16px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {products.map((product, index) => (
                            <div key={index} style={{ flex: 1, minWidth: 0 }}>
                                {product ? (
                                    <div style={{ background: 'white', borderRadius: '16px', padding: '12px', border: '2px solid #E5E7EB', position: 'relative' }}>
                                        <button
                                            onClick={() => handleRemoveProduct(index)}
                                            style={{ position: 'absolute', top: '-8px', right: '-8px', width: '24px', height: '24px', background: '#EF4444', color: 'white', borderRadius: '50%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, cursor: 'pointer' }}
                                        >
                                            <X size={14} />
                                        </button>

                                        <div style={{ aspectRatio: '1', background: '#F3F4F6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', marginBottom: '8px' }}>{product.image}</div>
                                        <div style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '4px' }}>{product.brand}</div>
                                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1F2937', marginBottom: '8px', height: '36px', overflow: 'hidden' }}>{product.name}</div>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#EF4444' }}>¥{product.price}</span>
                                            <span style={{ fontSize: '11px', color: '#9CA3AF', textDecoration: 'line-through' }}>¥{product.originalPrice}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                                            <Star size={12} color="#FBBF24" fill="#FBBF24" />
                                            <span style={{ fontSize: '13px', fontWeight: '600' }}>{product.rating}</span>
                                            <span style={{ fontSize: '11px', color: '#9CA3AF' }}>({product.reviewCount})</span>
                                        </div>
                                        <div style={{ fontSize: '11px', color: '#10B981', fontWeight: '600' }}>{product.recommendRate}%推荐</div>
                                    </div>
                                ) : (
                                    <button
                                        style={{ width: '100%', aspectRatio: '1', border: '2px dashed #D1D5DB', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'none', cursor: 'pointer' }}
                                    >
                                        <Plus size={32} color="#9CA3AF" />
                                        <span style={{ fontSize: '13px', color: '#6B7280', marginTop: '8px' }}>添加产品</span>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Basic Info Section */}
                <div style={{ background: 'white', borderRadius: '16px', margin: '0 16px', marginBottom: '12px', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
                    <button onClick={() => toggleSection('basic')} style={{ width: '100%', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <TrendingUp size={18} color="#3B82F6" />
                            <span style={{ fontWeight: 'bold', color: '#1F2937' }}>真实使用数据</span>
                        </div>
                        {expandedSections.basic ? <ChevronUp size={18} color="#9CA3AF" /> : <ChevronDown size={18} color="#9CA3AF" />}
                    </button>
                    {expandedSections.basic && (
                        <div style={{ padding: '0 16px 16px', display: 'grid', gridTemplateColumns: `repeat(${products.length}, 1fr)`, gap: '8px' }}>
                            {products.map((product, index) => (
                                <div key={index} style={{ background: '#F9FAFB', borderRadius: '12px', padding: '12px' }}>
                                    {product ? (
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#3B82F6', marginBottom: '4px' }}>{product.stillUsingRate}%</div>
                                            <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '8px' }}>仍在使用</div>
                                            <div style={{ fontSize: '16px', fontWeight: '600', color: '#8B5CF6', marginBottom: '4px' }}>{product.repurchaseRate}%</div>
                                            <div style={{ fontSize: '11px', color: '#6B7280' }}>回购率</div>
                                        </div>
                                    ) : (
                                        <div style={{ textAlign: 'center', color: '#9CA3AF' }}>-</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Score Section */}
                <div style={{ background: 'white', borderRadius: '16px', margin: '0 16px', marginBottom: '12px', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
                    <button onClick={() => toggleSection('score')} style={{ width: '100%', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Star size={18} color="#FBBF24" />
                            <span style={{ fontWeight: 'bold', color: '#1F2937' }}>多维度评分对比</span>
                        </div>
                        {expandedSections.score ? <ChevronUp size={18} color="#9CA3AF" /> : <ChevronDown size={18} color="#9CA3AF" />}
                    </button>
                    {expandedSections.score && (
                        <div style={{ padding: '0 16px 16px' }}>
                            {dimensions.map((dim) => {
                                const maxScore = getMaxScore(dim.scores);
                                return (
                                    <div key={dim.id} style={{ marginBottom: '12px' }}>
                                        <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px' }}>{dim.name}</div>
                                        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${products.length}, 1fr)`, gap: '8px' }}>
                                            {dim.scores.map((score, idx) => (
                                                <div key={idx} style={{ background: score === maxScore ? '#EFF6FF' : '#F9FAFB', borderRadius: '8px', padding: '8px', textAlign: 'center', border: score === maxScore ? '2px solid #3B82F6' : '1px solid transparent' }}>
                                                    {score !== null ? (
                                                        <>
                                                            <span style={{ fontSize: '16px', fontWeight: 'bold', color: score === maxScore ? '#3B82F6' : '#374151' }}>{score}</span>
                                                            <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{dim.unit}</span>
                                                            {score === maxScore && <CheckCircle size={12} color="#3B82F6" style={{ marginLeft: '4px' }} />}
                                                        </>
                                                    ) : <span style={{ color: '#9CA3AF' }}>-</span>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Pros Section */}
                <div style={{ background: 'white', borderRadius: '16px', margin: '0 16px', marginBottom: '12px', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
                    <button onClick={() => toggleSection('pros')} style={{ width: '100%', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ThumbsUp size={18} color="#10B981" />
                            <span style={{ fontWeight: 'bold', color: '#1F2937' }}>用户说的优点</span>
                        </div>
                        {expandedSections.pros ? <ChevronUp size={18} color="#9CA3AF" /> : <ChevronDown size={18} color="#9CA3AF" />}
                    </button>
                    {expandedSections.pros && (
                        <div style={{ padding: '0 16px 16px', display: 'grid', gridTemplateColumns: `repeat(${products.filter(p => p).length}, 1fr)`, gap: '12px' }}>
                            {products.map((product, index) => {
                                if (!product) return null;
                                return (
                                    <div key={index}>
                                        {product.pros.map((pro, idx) => (
                                            <div key={idx} style={{ background: '#ECFDF5', borderRadius: '8px', padding: '8px', marginBottom: '8px', fontSize: '12px', color: '#065F46' }}>
                                                ✓ {pro}
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Cons Section */}
                <div style={{ background: 'white', borderRadius: '16px', margin: '0 16px', marginBottom: '12px', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
                    <button onClick={() => toggleSection('cons')} style={{ width: '100%', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ThumbsDown size={18} color="#EF4444" />
                            <span style={{ fontWeight: 'bold', color: '#1F2937' }}>用户说的缺点</span>
                        </div>
                        {expandedSections.cons ? <ChevronUp size={18} color="#9CA3AF" /> : <ChevronDown size={18} color="#9CA3AF" />}
                    </button>
                    {expandedSections.cons && (
                        <div style={{ padding: '0 16px 16px', display: 'grid', gridTemplateColumns: `repeat(${products.filter(p => p).length}, 1fr)`, gap: '12px' }}>
                            {products.map((product, index) => {
                                if (!product) return null;
                                return (
                                    <div key={index}>
                                        {product.cons.map((con, idx) => (
                                            <div key={idx} style={{ background: '#FEE2E2', borderRadius: '8px', padding: '8px', marginBottom: '8px', fontSize: '12px', color: '#991B1B' }}>
                                                ✗ {con}
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Params Section */}
                <div style={{ background: 'white', borderRadius: '16px', margin: '0 16px', marginBottom: '12px', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
                    <button onClick={() => toggleSection('params')} style={{ width: '100%', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: 'bold', color: '#1F2937' }}>详细参数对比</span>
                        </div>
                        {expandedSections.params ? <ChevronUp size={18} color="#9CA3AF" /> : <ChevronDown size={18} color="#9CA3AF" />}
                    </button>
                    {expandedSections.params && (
                        <div style={{ padding: '0 16px 16px' }}>
                            {params.map((param, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #F3F4F6', padding: '12px 0' }}>
                                    <div style={{ width: '80px', fontSize: '13px', color: '#6B7280' }}>{param.name}</div>
                                    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: `repeat(${products.length}, 1fr)`, gap: '8px' }}>
                                        {param.values.map((value, vIdx) => (
                                            <div key={vIdx} style={{ fontSize: '13px', color: value ? '#374151' : '#9CA3AF', textAlign: 'center' }}>
                                                {value || '-'}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Alternatives */}
                <div style={{ padding: '16px' }}>
                    <h3 style={{ fontWeight: 'bold', color: '#1F2937', marginBottom: '12px' }}>其他可选产品</h3>
                    <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
                        {alternatives.map((alt) => (
                            <div key={alt.id} style={{ background: 'white', borderRadius: '12px', padding: '12px', minWidth: '140px', border: '1px solid #E5E7EB' }}>
                                <div style={{ width: '100%', aspectRatio: '1', background: '#F3F4F6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', marginBottom: '8px' }}>{alt.image}</div>
                                <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{alt.brand}</div>
                                <div style={{ fontSize: '12px', fontWeight: '600', color: '#1F2937', marginBottom: '4px', height: '32px', overflow: 'hidden' }}>{alt.name}</div>
                                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#EF4444' }}>¥{alt.price}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, maxWidth: '515px', margin: '0 auto', background: 'white', borderTop: '1px solid #E5E7EB', padding: '12px 16px', zIndex: 50 }}>
                    <button style={{ width: '100%', padding: '12px', borderRadius: '12px', background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', color: 'white', border: 'none', fontWeight: 'bold', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <ShoppingCart size={18} />
                        查看购买渠道
                    </button>
                </div>
            </div>
        </MobileContainer>
    );
}
