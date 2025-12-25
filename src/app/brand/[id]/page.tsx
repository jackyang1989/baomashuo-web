'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Share2, Star, ChevronRight, Award, TrendingUp, Users } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';

interface BrandProduct {
    id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
    reviewCount: number;
    recommendRate: number;
}

const MOCK_BRAND = {
    id: 'comotomo',
    name: 'Comotomo可么多么',
    logo: '🍼',
    country: '美国',
    founded: '2009年',
    slogan: '妈妈般的呵护',
    description: 'Comotomo是来自美国的高端母婴品牌，以创新的硅胶奶瓶著称，设计灵感来源于母乳喂养的自然体验。',
    stats: {
        products: 12,
        reviews: 3456,
        recommendRate: 91,
        rank: 2,
    },
    products: [
        { id: '1', name: 'Comotomo硅胶奶瓶 250ml', image: '🍼', price: 189, rating: 4.8, reviewCount: 1234, recommendRate: 92 },
        { id: '2', name: 'Comotomo硅胶奶瓶 150ml', image: '🍼', price: 159, rating: 4.7, reviewCount: 876, recommendRate: 89 },
        { id: '3', name: 'Comotomo替换奶嘴 2只装', image: '🔵', price: 69, rating: 4.6, reviewCount: 432, recommendRate: 85 },
    ] as BrandProduct[],
};

export default function BrandDetailPage() {
    const router = useRouter();
    const params = useParams();
    const brandId = params?.id as string;
    const [brand] = useState(MOCK_BRAND);

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F7F8FA', paddingBottom: '20px' }}>
                {/* Header */}
                <div style={{ background: 'white', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E5E7EB' }}>
                    <button onClick={() => router.back()} style={{ background: 'none', border: 'none' }}>
                        <ArrowLeft size={20} />
                    </button>
                    <span style={{ fontWeight: '600', fontSize: '16px' }}>品牌详情</span>
                    <button style={{ background: 'none', border: 'none' }}>
                        <Share2 size={20} color="#6B7280" />
                    </button>
                </div>

                {/* Brand Info */}
                <div style={{ background: 'white', padding: '20px 16px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                        <div style={{ width: '72px', height: '72px', background: '#F9FAFB', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', border: '1px solid #E5E7EB' }}>
                            {brand.logo}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937', marginBottom: '4px' }}>{brand.name}</div>
                            <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px' }}>{brand.country} · {brand.founded}</div>
                            <div style={{ fontSize: '13px', color: '#3B82F6', fontStyle: 'italic' }}>"{brand.slogan}"</div>
                        </div>
                    </div>
                    <div style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.6 }}>{brand.description}</div>
                </div>

                {/* Stats */}
                <div style={{ background: 'white', padding: '16px', marginBottom: '12px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#3B82F6' }}>{brand.stats.products}</div>
                            <div style={{ fontSize: '11px', color: '#9CA3AF' }}>在售产品</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#8B5CF6' }}>{brand.stats.reviews}</div>
                            <div style={{ fontSize: '11px', color: '#9CA3AF' }}>真实评价</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#10B981' }}>{brand.stats.recommendRate}%</div>
                            <div style={{ fontSize: '11px', color: '#9CA3AF' }}>推荐率</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#F59E0B' }}>No.{brand.stats.rank}</div>
                            <div style={{ fontSize: '11px', color: '#9CA3AF' }}>品牌榜</div>
                        </div>
                    </div>
                </div>

                {/* Products */}
                <div style={{ padding: '0 16px' }}>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1F2937', marginBottom: '12px' }}>品牌产品</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {brand.products.map((product) => (
                            <Link key={product.id} href={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                                <div style={{ background: 'white', borderRadius: '12px', padding: '16px', display: 'flex', gap: '12px' }}>
                                    <div style={{ width: '72px', height: '72px', background: '#F9FAFB', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px' }}>
                                        {product.image}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>{product.name}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#EF4444' }}>¥{product.price}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '12px', color: '#6B7280' }}>
                                                <Star size={12} color="#FBBF24" fill="#FBBF24" />{product.rating}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#10B981' }}>{product.recommendRate}%推荐 · {product.reviewCount}条评价</div>
                                    </div>
                                    <ChevronRight size={18} color="#D1D5DB" style={{ alignSelf: 'center' }} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </MobileContainer>
    );
}
