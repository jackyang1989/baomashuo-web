'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Toast, Tabs } from 'antd-mobile';
import { ArrowLeft, Share2, Heart, Star, ThumbsUp, ThumbsDown, Clock, AlertTriangle, CheckCircle, ChevronRight, ShoppingCart, Users, XCircle, Award } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { productDetailService, type ProductDetail, type ReviewItem } from '@/services/productDetailService';

export default function ProductDetailPage() {
    const router = useRouter();
    const params = useParams();
    const productId = params?.id as string;

    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [activeTab, setActiveTab] = useState('summary');
    const [selectedImage, setSelectedImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (productId) {
            productDetailService.getProductDetail(productId).then((data) => {
                setProduct(data);
                setLoading(false);
            });
        }
    }, [productId]);

    const handleFavorite = async () => {
        await productDetailService.toggleFavorite(productId);
        setIsFavorite(!isFavorite);
        Toast.show({ content: isFavorite ? '已取消收藏' : '已收藏', icon: 'success' });
    };

    if (loading || !product) {
        return (
            <MobileContainer>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#F7F8FA' }}>
                    <span style={{ color: '#9CA3AF' }}>加载中...</span>
                </div>
            </MobileContainer>
        );
    }

    const { basic, usage, dimensions, aiAnalysis, reviews, channels } = product;

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F7F8FA', paddingBottom: '140px' }}>
                {/* Header - Flat */}
                <div style={{
                    background: 'white',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'sticky',
                    top: 0,
                    zIndex: 50,
                    borderBottom: '1px solid #E5E7EB',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', padding: 0 }}>
                            <ArrowLeft size={20} color="#374151" />
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <img src="/avatar-placeholder.png" alt="" style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#E5E7EB' }} />
                            <span style={{ fontSize: '12px', color: '#6B7280' }}>3位好友关注</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <button style={{ background: 'none', border: 'none' }}>
                            <Share2 size={20} color="#374151" />
                        </button>
                        <button onClick={handleFavorite} style={{ background: 'none', border: 'none' }}>
                            <Heart size={20} color={isFavorite ? '#EF4444' : '#374151'} fill={isFavorite ? '#EF4444' : 'none'} />
                        </button>
                    </div>
                </div>

                {/* Product Images - Flat */}
                <div style={{ background: 'white', padding: '16px' }}>
                    <div style={{
                        width: '100%',
                        height: '240px',
                        background: '#F9FAFB',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '80px',
                        marginBottom: '12px',
                        border: '1px solid #E5E7EB',
                    }}>
                        {basic.images[selectedImage]}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        {basic.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '8px',
                                    background: selectedImage === idx ? '#EFF6FF' : 'white',
                                    border: selectedImage === idx ? '2px solid #3B82F6' : '1px solid #E5E7EB',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '24px',
                                    cursor: 'pointer',
                                }}
                            >
                                {img}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Basic Info - User Driven Emphasis */}
                <div style={{ background: 'white', padding: '16px', borderBottom: '1px solid #E5E7EB' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                        <div>
                            <div style={{ fontSize: '13px', color: '#6B7280' }}>{basic.brand}</div>
                            <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937' }}>{basic.name}</h1>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#EF4444' }}>¥{basic.price}</span>
                        </div>
                    </div>

                    {/* User Verification Badge */}
                    <div style={{ background: '#F0F9FF', borderRadius: '8px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', border: '1px solid #BAE6FD' }}>
                        <div style={{ width: '40px', height: '40px', background: '#3B82F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                            {usage.totalUsers}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#0369A1' }}>{usage.totalUsers}位宝妈已验证</div>
                            <div style={{ fontSize: '12px', color: '#64748B' }}>其中{usage.ageMatch.count}位宝宝同月龄 • {usage.repurchase}人回购</div>
                        </div>
                        <ChevronRight size={16} color="#0369A1" />
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <div style={{ flex: 1, background: '#F8FAFC', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#10B981' }}>{basic.rating}</div>
                            <div style={{ fontSize: '11px', color: '#64748B' }}>综合评分</div>
                        </div>
                        <div style={{ flex: 1, background: '#F8FAFC', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#8B5CF6' }}>{usage.recommendRate}%</div>
                            <div style={{ fontSize: '11px', color: '#64748B' }}>推荐率</div>
                        </div>
                        <div style={{ flex: 1, background: '#F8FAFC', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#F59E0B' }}>No.1</div>
                            <div style={{ fontSize: '11px', color: '#64748B' }}>{basic.model}榜</div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ background: 'white', borderBottom: '1px solid #E5E7EB', position: 'sticky', top: '53px', zIndex: 40 }}>
                    <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ '--title-font-size': '15px', '--active-line-color': '#3B82F6', '--active-title-color': '#3B82F6' }}>
                        <Tabs.Tab title="大家怎么说" key="summary" />
                        <Tabs.Tab title={`真实评价(${basic.reviewCount})`} key="reviews" />
                    </Tabs>
                </div>

                {/* Tab Content */}
                <div style={{ padding: '16px' }}>
                    {activeTab === 'summary' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {/* AI Analysis - Flat */}
                            <div style={{ background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid #E5E7EB' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                    <Award size={18} color="#3B82F6" />
                                    <span style={{ fontWeight: 'bold', color: '#1F2937' }}>口碑总结</span>
                                </div>

                                <div style={{ marginBottom: '16px' }}>
                                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>👍 大家觉得好</div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {aiAnalysis.pros.map((pro, idx) => (
                                            <span key={idx} style={{ fontSize: '12px', background: '#F0FDF4', color: '#166534', padding: '6px 10px', borderRadius: '6px', border: '1px solid #DCFCE7' }}>
                                                {pro}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ marginBottom: '16px' }}>
                                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>👎 有人吐槽</div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {aiAnalysis.cons.map((con, idx) => (
                                            <span key={idx} style={{ fontSize: '12px', background: '#FEF2F2', color: '#991B1B', padding: '6px 10px', borderRadius: '6px', border: '1px solid #FEE2E2' }}>
                                                {con}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ background: '#F8FAFC', borderRadius: '8px', padding: '12px' }}>
                                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>💡 购买建议</div>
                                    {aiAnalysis.tips.map((tip, idx) => (
                                        <div key={idx} style={{ fontSize: '12px', color: '#64748B', marginBottom: '4px', display: 'flex', alignItems: 'start', gap: '6px' }}>
                                            <span style={{ marginTop: '2px', width: '4px', height: '4px', borderRadius: '50%', background: '#94A3B8', flexShrink: 0 }}></span>
                                            {tip}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {/* Filter - Flat */}
                            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
                                {['全部', '推荐', '不推荐', '有图片', '30天+'].map((filter, idx) => (
                                    <button key={idx} style={{
                                        padding: '6px 14px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        background: idx === 0 ? '#3B82F6' : 'white',
                                        color: idx === 0 ? 'white' : '#6B7280',
                                        fontSize: '12px',
                                        whiteSpace: 'nowrap',
                                        cursor: 'pointer',
                                        boxShadow: idx === 0 ? 'none' : '0 1px 2px rgba(0,0,0,0.05)'
                                    }}>
                                        {filter}
                                    </button>
                                ))}
                            </div>

                            {/* Reviews - Flat */}
                            {reviews.map((review) => (
                                <div key={review.id} style={{ background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid #E5E7EB' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ fontSize: '32px' }}>{review.user.avatar}</div>
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#1F2937' }}>{review.user.name}</span>
                                                    {review.verified && (
                                                        <span style={{ fontSize: '10px', background: '#ECFDF5', color: '#059669', padding: '2px 6px', borderRadius: '4px', fontWeight: '500' }}>已验证此单</span>
                                                    )}
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#6B7280' }}>
                                                    <span>{review.user.babyAge}宝宝</span>
                                                    <span>•</span>
                                                    <span>使用{review.user.useDays}天</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ fontSize: '15px', color: '#374151', marginBottom: '12px', lineHeight: '1.6' }}>
                                        {review.content}
                                    </div>

                                    {review.images && (
                                        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                                            {review.images.map((img, idx) => (
                                                <div key={idx} style={{ width: '80px', height: '80px', background: '#F9FAFB', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', border: '1px solid #E5E7EB' }}>
                                                    {img}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #F3F4F6' }}>
                                        <button style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#6B7280', background: 'none', border: 'none' }}>
                                            <ThumbsUp size={16} />
                                            <span>{review.helpful}</span>
                                        </button>
                                        <button style={{ fontSize: '13px', color: '#6B7280', background: 'none', border: 'none' }}>
                                            评论
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Bottom Purchase Bar - Flat */}
                <div style={{
                    position: 'fixed',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100%',
                    maxWidth: '515px',
                    background: 'white',
                    borderTop: '1px solid #E5E7EB',
                    padding: '12px 16px',
                    zIndex: 100,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '12px', color: '#6B7280' }}>全网最低</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#EF4444' }}>¥{channels[0].price}</span>
                            <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{channels[0].platform}</span>
                        </div>
                    </div>
                    <button style={{
                        flex: 1.5,
                        padding: '12px',
                        background: '#3B82F6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                    }}>
                        <ShoppingCart size={18} />
                        去购买
                    </button>
                </div>
            </div>
        </MobileContainer>
    );
}
