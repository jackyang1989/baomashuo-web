'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Toast } from 'antd-mobile';
import { ArrowLeft, Share2, Heart, Star, ThumbsUp, MessageCircle, ChevronRight, ShoppingCart, AlertTriangle, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';

// 产品详情Mock数据
const MOCK_PRODUCT = {
    id: 'p1',
    name: 'Comotomo可么多么奶瓶 250ml',
    brand: 'Comotomo',
    images: ['🍼', '🍼', '🍼'],
    price: 189,
    originalPrice: 229,
    rating: 4.8,
    reviewCount: 1234,
    likes: 320,
    sameAgeUsers: 156,
    sameAgeRate: 92,
    highlights: ['防胀气', '硅胶柔软', '高接受度', '易清洗'],
    aiSummary: {
        overall: '92%同月龄宝妈强烈推荐，特别适合有胀气问题的宝宝。硅胶材质接近母乳触感，宝宝转奶瓶接受度极高。',
        pros: ['防胀气效果显著，宝宝夜哭减少', '硅胶材质柔软接近母乳', '宝宝接受度高，转奶瓶更容易', '可挤压设计便于喂养'],
        cons: ['价格相对较高', '容量250ml较小，需要勤换', '长期使用硅胶可能变色'],
        pitfalls: ['注意奶嘴型号要根据月龄选择', '不建议用沸水消毒，建议蒸汽消毒', '避免用刷子用力刷洗硅胶表面'],
    },
};

// 真实宝妈经验
const REAL_EXPERIENCES = [
    {
        id: 1,
        user: { name: '小雨妈妈', avatar: '👩', babyAge: '3个月', useDays: 45 },
        content: '用了45天，宝宝胀气明显好转，晚上终于能睡整觉了！奶嘴柔软宝宝很喜欢，从亲喂转奶瓶很顺利。',
        rating: 'recommend',
        agrees: 234,
        time: '2小时前',
        verified: true,
    },
    {
        id: 2,
        user: { name: '阳阳小可爱', avatar: '👱‍♀️', babyAge: '2个月', useDays: 30 },
        content: '硅胶材质确实很软，宝宝愿意含住。就是价格有点贵，不过为了宝宝值得！',
        rating: 'recommend',
        agrees: 189,
        time: '5小时前',
        verified: true,
    },
    {
        id: 3,
        user: { name: '豆豆妈', avatar: '👩‍🦰', babyAge: '4个月', useDays: 60 },
        content: '用了两个月，整体很满意。唯一缺点是容量小，晚上需要换一次。',
        rating: 'recommend',
        agrees: 156,
        time: '昨天',
        verified: true,
    },
];

// 相似产品推荐
const SIMILAR_PRODUCTS = [
    { id: 'p2', name: 'Pigeon贝亲玻璃奶瓶', image: '🍼', price: 89, likes: 280, rate: 85 },
    { id: 'p3', name: "Dr.Brown's布朗博士", image: '🍼', price: 129, likes: 256, rate: 88 },
    { id: 'p4', name: 'Hegen新加坡奶瓶', image: '🍼', price: 259, likes: 198, rate: 90 },
];

export default function ProductDetailPage() {
    const router = useRouter();
    const params = useParams();
    const productId = params?.id as string;

    const [product] = useState(MOCK_PRODUCT);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showAllExperiences, setShowAllExperiences] = useState(false);
    const [showAllPitfalls, setShowAllPitfalls] = useState(false);

    const handleFavorite = () => {
        setIsFavorite(!isFavorite);
        Toast.show({ content: isFavorite ? '已取消收藏' : '已收藏', icon: 'success' });
    };

    const handleBuy = () => {
        Toast.show({ content: '正在跳转电商页面...' });
    };

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F7F8FA', paddingBottom: '80px' }}>
                {/* 顶部导航 */}
                <div style={{ background: 'white', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E5E7EB', position: 'sticky', top: 0, zIndex: 50 }}>
                    <button onClick={() => router.back()} style={{ background: 'none', border: 'none' }}>
                        <ArrowLeft size={20} />
                    </button>
                    <span style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937' }}>{product.brand}</span>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <button style={{ background: 'none', border: 'none' }}>
                            <Share2 size={20} color="#6B7280" />
                        </button>
                        <button onClick={handleFavorite} style={{ background: 'none', border: 'none' }}>
                            <Heart size={20} color={isFavorite ? '#EF4444' : '#6B7280'} fill={isFavorite ? '#EF4444' : 'none'} />
                        </button>
                    </div>
                </div>

                {/* 产品图片轮播 */}
                <div style={{ background: 'white', padding: '20px' }}>
                    <div style={{ width: '100%', height: '200px', background: '#F9FAFB', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '80px', marginBottom: '12px' }}>
                        {product.images[selectedImage]}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        {product.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                style={{ width: '48px', height: '48px', borderRadius: '8px', background: selectedImage === idx ? '#EFF6FF' : '#F9FAFB', border: selectedImage === idx ? '2px solid #3B82F6' : '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}
                            >
                                {img}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 核心信息 */}
                <div style={{ background: 'white', padding: '16px', marginTop: '8px' }}>
                    <div style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '4px' }}>{product.brand}</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1F2937', marginBottom: '12px' }}>{product.name}</div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#EF4444' }}>¥{product.price}</span>
                            <span style={{ fontSize: '14px', color: '#9CA3AF', textDecoration: 'line-through' }}>¥{product.originalPrice}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '13px', color: '#374151' }}>
                                <Star size={14} color="#FBBF24" fill="#FBBF24" />{product.rating}
                            </span>
                            <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{product.reviewCount}评价</span>
                        </div>
                    </div>

                    {/* 用户验证数据 */}
                    <div style={{ background: '#F0FDF4', borderRadius: '10px', padding: '12px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                        <div style={{ width: '40px', height: '40px', background: '#10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', fontWeight: 'bold' }}>
                            {product.sameAgeRate}%
                        </div>
                        <div>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#059669' }}>{product.sameAgeUsers}位同月龄宝妈推荐</div>
                            <div style={{ fontSize: '11px', color: '#6B7280' }}>{product.likes}人已验证 · 平均使用40天</div>
                        </div>
                    </div>

                    {/* 主要卖点 */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {product.highlights.map((h, idx) => (
                            <span key={idx} style={{ fontSize: '12px', color: '#3B82F6', background: '#EFF6FF', padding: '6px 12px', borderRadius: '16px' }}>{h}</span>
                        ))}
                    </div>
                </div>

                {/* AI总结优缺点 */}
                <div style={{ background: 'white', padding: '16px', marginTop: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <Sparkles size={18} color="#F59E0B" />
                        <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#1F2937' }}>AI口碑总结</span>
                        <span style={{ fontSize: '11px', color: '#9CA3AF' }}>基于{product.reviewCount}条真实评价</span>
                    </div>

                    <div style={{ fontSize: '13px', color: '#374151', lineHeight: 1.6, marginBottom: '16px', padding: '12px', background: '#FFFBEB', borderRadius: '10px' }}>
                        {product.aiSummary.overall}
                    </div>

                    {/* 优点 */}
                    <div style={{ marginBottom: '12px' }}>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#059669', marginBottom: '8px' }}>👍 大家觉得好</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {product.aiSummary.pros.map((pro, idx) => (
                                <div key={idx} style={{ fontSize: '13px', color: '#374151', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                                    <span style={{ color: '#10B981' }}>✓</span> {pro}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 缺点 */}
                    <div style={{ marginBottom: '12px' }}>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#D97706', marginBottom: '8px' }}>👎 有人吐槽</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {product.aiSummary.cons.map((con, idx) => (
                                <div key={idx} style={{ fontSize: '13px', color: '#374151', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                                    <span style={{ color: '#F59E0B' }}>⚠</span> {con}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 避坑提示 */}
                    <div style={{ background: '#FEF2F2', borderRadius: '10px', padding: '12px' }}>
                        <div
                            onClick={() => setShowAllPitfalls(!showAllPitfalls)}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <AlertTriangle size={14} color="#DC2626" />
                                <span style={{ fontSize: '13px', fontWeight: '600', color: '#DC2626' }}>避坑提示</span>
                            </div>
                            {showAllPitfalls ? <ChevronUp size={16} color="#DC2626" /> : <ChevronDown size={16} color="#DC2626" />}
                        </div>
                        {showAllPitfalls && (
                            <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {product.aiSummary.pitfalls.map((pit, idx) => (
                                    <div key={idx} style={{ fontSize: '12px', color: '#7F1D1D' }}>• {pit}</div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* 真实宝妈经验 */}
                <div style={{ background: 'white', padding: '16px', marginTop: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '16px' }}>💬</span>
                            <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#1F2937' }}>真实宝妈经验</span>
                        </div>
                        <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{REAL_EXPERIENCES.length}条经验</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {REAL_EXPERIENCES.slice(0, showAllExperiences ? 10 : 2).map((exp) => (
                            <div key={exp.id} style={{ background: '#F9FAFB', borderRadius: '12px', padding: '14px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                    <span style={{ fontSize: '28px' }}>{exp.user.avatar}</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{ fontSize: '13px', fontWeight: '600', color: '#1F2937' }}>{exp.user.name}</span>
                                            {exp.verified && <span style={{ fontSize: '10px', background: '#ECFDF5', color: '#059669', padding: '2px 6px', borderRadius: '4px' }}>已验证</span>}
                                        </div>
                                        <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{exp.user.babyAge}宝宝 · 使用{exp.user.useDays}天</div>
                                    </div>
                                </div>

                                <div style={{ fontSize: '13px', color: '#374151', lineHeight: 1.6, marginBottom: '12px' }}>{exp.content}</div>

                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '16px', fontSize: '12px', color: '#059669' }}>
                                        <ThumbsUp size={12} />
                                        我也遇到过 {exp.agrees}
                                    </button>
                                    <button style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', background: 'white', border: '1px solid #E5E7EB', borderRadius: '16px', fontSize: '12px', color: '#6B7280' }}>
                                        <MessageCircle size={12} />
                                        补充经验
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {!showAllExperiences && REAL_EXPERIENCES.length > 2 && (
                        <button
                            onClick={() => setShowAllExperiences(true)}
                            style={{ width: '100%', marginTop: '12px', padding: '10px', background: 'white', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '13px', color: '#6B7280' }}
                        >
                            查看全部{REAL_EXPERIENCES.length}条经验 →
                        </button>
                    )}
                </div>

                {/* 相似产品推荐 */}
                <div style={{ background: 'white', padding: '16px', marginTop: '8px' }}>
                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1F2937', marginBottom: '12px' }}>🔄 相似产品推荐</div>
                    <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px' }}>
                        {SIMILAR_PRODUCTS.map((p) => (
                            <Link key={p.id} href={`/product/${p.id}`} style={{ textDecoration: 'none', flexShrink: 0, width: '130px' }}>
                                <div style={{ background: '#F9FAFB', borderRadius: '12px', padding: '12px' }}>
                                    <div style={{ width: '100%', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', marginBottom: '8px' }}>
                                        {p.image}
                                    </div>
                                    <div style={{ fontSize: '12px', fontWeight: '500', color: '#1F2937', marginBottom: '4px', lineHeight: 1.3 }}>{p.name}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#EF4444' }}>¥{p.price}</span>
                                        <span style={{ fontSize: '10px', color: '#10B981' }}>{p.rate}%推荐</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 底部固定CTA */}
                <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '515px', background: 'white', borderTop: '1px solid #E5E7EB', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 100 }}>
                    <button
                        onClick={handleFavorite}
                        style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#F9FAFB', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Heart size={22} color={isFavorite ? '#EF4444' : '#6B7280'} fill={isFavorite ? '#EF4444' : 'none'} />
                    </button>
                    <button
                        onClick={handleBuy}
                        style={{ flex: 1, padding: '14px', background: '#3B82F6', color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                    >
                        <ShoppingCart size={18} />
                        去购买 ¥{product.price}
                    </button>
                </div>
            </div>
        </MobileContainer>
    );
}
