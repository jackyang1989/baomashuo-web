'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Filter, Star, ChevronRight, TrendingUp } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';

interface CategoryProduct {
    id: string;
    name: string;
    brand: string;
    image: string;
    price: number;
    rating: number;
    reviewCount: number;
    recommendRate: number;
    tags: string[];
}

const CATEGORIES = {
    bottle: { name: '奶瓶', icon: '🍼' },
    nipple: { name: '奶嘴', icon: '🔵' },
    diaper: { name: '纸尿裤', icon: '👶' },
    stroller: { name: '推车', icon: '🚼' },
    carseat: { name: '安全座椅', icon: '🚗' },
};

const MOCK_PRODUCTS: CategoryProduct[] = [
    { id: '1', name: 'Comotomo硅胶奶瓶 250ml', brand: 'Comotomo', image: '🍼', price: 189, rating: 4.8, reviewCount: 1234, recommendRate: 92, tags: ['防胀气', '高接受度'] },
    { id: '2', name: 'Pigeon贝亲玻璃奶瓶', brand: 'Pigeon', image: '🍼', price: 89, rating: 4.5, reviewCount: 2345, recommendRate: 85, tags: ['性价比', '经典'] },
    { id: '3', name: "Dr.Brown's布朗博士奶瓶", brand: "Dr.Brown's", image: '🍼', price: 129, rating: 4.6, reviewCount: 987, recommendRate: 88, tags: ['导气管', '防呛奶'] },
    { id: '4', name: 'Hegen新加坡奶瓶', brand: 'Hegen', image: '🍼', price: 259, rating: 4.7, reviewCount: 654, recommendRate: 90, tags: ['方形设计', '高端'] },
];

const SORT_OPTIONS = [
    { key: 'recommend', label: '推荐' },
    { key: 'rating', label: '评分' },
    { key: 'price-asc', label: '价格↑' },
    { key: 'price-desc', label: '价格↓' },
    { key: 'reviews', label: '评价数' },
];

export default function CategoryPage() {
    const router = useRouter();
    const params = useParams();
    const categoryId = params?.id as string;
    const [products, setProducts] = useState<CategoryProduct[]>([]);
    const [sortBy, setSortBy] = useState('recommend');

    const category = CATEGORIES[categoryId as keyof typeof CATEGORIES] || { name: '分类', icon: '📦' };

    useEffect(() => {
        // 模拟获取产品列表
        let sorted = [...MOCK_PRODUCTS];
        if (sortBy === 'rating') sorted.sort((a, b) => b.rating - a.rating);
        if (sortBy === 'price-asc') sorted.sort((a, b) => a.price - b.price);
        if (sortBy === 'price-desc') sorted.sort((a, b) => b.price - a.price);
        if (sortBy === 'reviews') sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        setProducts(sorted);
    }, [sortBy]);

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F7F8FA', paddingBottom: '20px' }}>
                {/* Header */}
                <div style={{ background: 'white', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E5E7EB' }}>
                    <button onClick={() => router.back()} style={{ background: 'none', border: 'none' }}>
                        <ArrowLeft size={20} />
                    </button>
                    <span style={{ fontWeight: '600', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>{category.icon}</span> {category.name}
                    </span>
                    <button style={{ background: 'none', border: 'none' }}>
                        <Filter size={20} color="#6B7280" />
                    </button>
                </div>

                {/* Sort Bar */}
                <div style={{ background: 'white', padding: '10px 16px', display: 'flex', gap: '8px', overflowX: 'auto', borderBottom: '1px solid #E5E7EB' }}>
                    {SORT_OPTIONS.map((opt) => (
                        <button
                            key={opt.key}
                            onClick={() => setSortBy(opt.key)}
                            style={{
                                padding: '6px 14px',
                                borderRadius: '16px',
                                border: 'none',
                                background: sortBy === opt.key ? '#3B82F6' : '#F3F4F6',
                                color: sortBy === opt.key ? 'white' : '#6B7280',
                                fontSize: '12px',
                                fontWeight: '500',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>

                {/* Product List */}
                <div style={{ padding: '16px' }}>
                    <div style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '12px' }}>共 {products.length} 个产品</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {products.map((product, idx) => (
                            <Link key={product.id} href={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                                <div style={{ background: 'white', borderRadius: '12px', padding: '16px', display: 'flex', gap: '12px', position: 'relative' }}>
                                    {idx < 3 && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '8px',
                                            left: '8px',
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '4px',
                                            background: idx === 0 ? '#F59E0B' : idx === 1 ? '#9CA3AF' : '#CD7F32',
                                            color: 'white',
                                            fontSize: '11px',
                                            fontWeight: 'bold',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            {idx + 1}
                                        </div>
                                    )}
                                    <div style={{ width: '80px', height: '80px', background: '#F9FAFB', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>
                                        {product.image}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '2px' }}>{product.brand}</div>
                                        <div style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937', marginBottom: '6px' }}>{product.name}</div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                                            {product.tags.map((tag, tIdx) => (
                                                <span key={tIdx} style={{ fontSize: '10px', background: '#EFF6FF', color: '#3B82F6', padding: '2px 6px', borderRadius: '4px' }}>{tag}</span>
                                            ))}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                                                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#EF4444' }}>¥{product.price}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#6B7280' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                                    <Star size={12} color="#FBBF24" fill="#FBBF24" />{product.rating}
                                                </span>
                                                <span style={{ color: '#10B981' }}>{product.recommendRate}%推荐</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </MobileContainer>
    );
}
