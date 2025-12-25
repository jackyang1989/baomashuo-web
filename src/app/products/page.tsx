'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toast, Popup } from 'antd-mobile';
import { ArrowLeft, Search, Star, Heart, ShoppingCart, Package, Award, CheckCircle, Zap, SlidersHorizontal, X } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { productListService, type ProductListItem, type FilterOptions, type SelectedFilters } from '@/services/productListService';

export default function ProductsPage() {
    const router = useRouter();
    const [products, setProducts] = useState<ProductListItem[]>([]);
    const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [likedProducts, setLikedProducts] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState('smart');

    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
        age: '3-6个月',
        price: [],
        brand: [],
        material: [],
        feature: [],
    });

    useEffect(() => {
        productListService.getFilterOptions().then(setFilterOptions);
    }, []);

    useEffect(() => {
        productListService.getProducts(selectedFilters, sortBy).then(setProducts);
    }, [selectedFilters, sortBy]);

    const toggleFilter = (category: keyof SelectedFilters, value: string) => {
        if (category === 'age') {
            setSelectedFilters({ ...selectedFilters, age: value });
        } else {
            const current = selectedFilters[category] as string[];
            const updated = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
            setSelectedFilters({ ...selectedFilters, [category]: updated });
        }
    };

    const clearFilters = () => {
        setSelectedFilters({ age: '3-6个月', price: [], brand: [], material: [], feature: [] });
    };

    const toggleLike = (productId: string) => {
        setLikedProducts(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
        Toast.show({ content: likedProducts.includes(productId) ? '已取消收藏' : '已收藏' });
    };

    const getActiveFilterCount = () => {
        return selectedFilters.price.length + selectedFilters.brand.length + selectedFilters.material.length + selectedFilters.feature.length;
    };

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F7F8FA', display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <div style={{ background: 'white', padding: '12px 16px', borderBottom: '1px solid #E5E7EB', position: 'sticky', top: 0, zIndex: 40 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <button onClick={() => router.back()} style={{ background: 'none', border: 'none' }}><ArrowLeft size={20} /></button>
                        <div style={{ flex: 1, position: 'relative' }}>
                            <Search size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '10px' }} />
                            <input type="text" placeholder="搜索产品..." style={{ width: '100%', paddingLeft: '36px', paddingRight: '12px', paddingTop: '8px', paddingBottom: '8px', background: '#F3F4F6', border: 'none', borderRadius: '8px', fontSize: '14px', outline: 'none' }} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                        <span style={{ color: '#6B7280' }}>当前：</span>
                        <span style={{ background: '#DBEAFE', color: '#1E40AF', padding: '4px 8px', borderRadius: '6px' }}>{selectedFilters.age}</span>
                        {getActiveFilterCount() > 0 && <span style={{ background: '#F5F3FF', color: '#7C3AED', padding: '4px 8px', borderRadius: '6px' }}>+{getActiveFilterCount()}个筛选</span>}
                    </div>
                </div>

                {/* Sort Bar */}
                <div style={{ background: 'white', padding: '8px 16px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: '72px', zIndex: 30 }}>
                    <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
                        {[
                            { key: 'smart', label: '智能推荐', icon: <Zap size={12} /> },
                            { key: 'recommend', label: '推荐率' },
                            { key: 'price-asc', label: '价格 ↑' },
                            { key: 'sales', label: '销量' },
                        ].map((item) => (
                            <button
                                key={item.key}
                                onClick={() => setSortBy(item.key)}
                                style={{
                                    padding: '6px 12px',
                                    borderRadius: '16px',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    whiteSpace: 'nowrap',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    background: sortBy === item.key ? '#3B82F6' : '#F3F4F6',
                                    color: sortBy === item.key ? 'white' : '#374151',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                {item.icon}{item.label}
                            </button>
                        ))}
                    </div>
                    <button onClick={() => setShowFilters(true)} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', background: '#F3F4F6', borderRadius: '16px', fontSize: '12px', fontWeight: '500', color: '#374151', border: 'none', cursor: 'pointer', position: 'relative' }}>
                        <SlidersHorizontal size={12} />筛选
                        {getActiveFilterCount() > 0 && <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '16px', height: '16px', background: '#EF4444', color: 'white', fontSize: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{getActiveFilterCount()}</span>}
                    </button>
                </div>

                {/* Products List */}
                <div style={{ flex: 1, padding: '16px', paddingBottom: '80px' }}>
                    <div style={{ background: 'linear-gradient(135deg, #EFF6FF, #F5F3FF)', borderRadius: '12px', padding: '12px', marginBottom: '12px', border: '1px solid #DBEAFE' }}>
                        <span style={{ fontSize: '14px', color: '#374151' }}>
                            为<span style={{ color: '#3B82F6', fontWeight: 'bold', margin: '0 4px' }}>{selectedFilters.age}宝宝</span>
                            找到<span style={{ color: '#8B5CF6', fontWeight: 'bold', margin: '0 4px' }}>{products.length}</span>个产品
                        </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {products.map((product) => (
                            <div key={product.id} onClick={() => router.push(`/product/${product.id}`)} style={{ background: 'white', borderRadius: '16px', padding: '16px', border: '1px solid #E5E7EB', cursor: 'pointer' }}>
                                {/* Top Badges */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        {product.isHot && <span style={{ fontSize: '10px', background: '#EF4444', color: 'white', padding: '2px 8px', borderRadius: '10px' }}>🔥 热门</span>}
                                        {product.badges.map((b, idx) => <span key={idx} style={{ fontSize: '10px', background: '#F5F3FF', color: '#7C3AED', padding: '2px 8px', borderRadius: '10px' }}>{b}</span>)}
                                    </div>
                                    <button onClick={(e) => { e.stopPropagation(); toggleLike(product.id); }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                        <Heart size={18} fill={likedProducts.includes(product.id) ? '#EF4444' : 'none'} color={likedProducts.includes(product.id) ? '#EF4444' : '#9CA3AF'} />
                                    </button>
                                </div>

                                {/* Product Info */}
                                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                                    <div style={{ width: '96px', height: '96px', background: '#F3F4F6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', flexShrink: 0, border: '1px solid #E5E7EB' }}>{product.image}</div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '4px' }}>{product.brand}</div>
                                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.name}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                                            <Star size={12} color="#FBBF24" fill="#FBBF24" />
                                            <span style={{ fontSize: '13px', fontWeight: '600' }}>{product.rating}</span>
                                            <span style={{ fontSize: '11px', color: '#9CA3AF' }}>({product.reviewCount})</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#EF4444' }}>¥{product.price}</span>
                                            <span style={{ fontSize: '12px', color: '#9CA3AF', textDecoration: 'line-through' }}>¥{product.originalPrice}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div style={{ background: '#EFF6FF', borderRadius: '8px', padding: '8px', marginBottom: '12px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', textAlign: 'center' }}>
                                        <div><div style={{ fontSize: '14px', fontWeight: 'bold', color: '#3B82F6' }}>{product.recommendRate}%</div><div style={{ fontSize: '10px', color: '#6B7280' }}>推荐率</div></div>
                                        <div><div style={{ fontSize: '14px', fontWeight: 'bold', color: '#10B981' }}>{product.effectiveness}%</div><div style={{ fontSize: '10px', color: '#6B7280' }}>有效率</div></div>
                                        <div><div style={{ fontSize: '14px', fontWeight: 'bold', color: '#8B5CF6' }}>{product.sameAgeUsers}</div><div style={{ fontSize: '10px', color: '#6B7280' }}>同月龄</div></div>
                                    </div>
                                </div>

                                {/* Highlights */}
                                <div style={{ background: '#ECFDF5', borderRadius: '8px', padding: '8px', marginBottom: '12px' }}>
                                    {product.highlights.slice(0, 2).map((h, idx) => (
                                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '4px', fontSize: '11px', color: '#374151', marginBottom: '4px' }}>
                                            <CheckCircle size={12} color="#10B981" style={{ marginTop: '2px', flexShrink: 0 }} />{h}
                                        </div>
                                    ))}
                                </div>

                                {/* Tags */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                                    {product.tags.map((t, idx) => <span key={idx} style={{ fontSize: '11px', background: '#F3F4F6', color: '#374151', padding: '4px 8px', borderRadius: '6px' }}>{t}</span>)}
                                </div>

                                {/* Shipping */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#9CA3AF', marginBottom: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Package size={12} />{product.shipping}</div>
                                    <span style={{ color: product.stock === '充足' ? '#10B981' : '#F59E0B' }}>{product.stock === '充足' ? '库存充足' : '库存紧张'}</span>
                                </div>

                                {/* Coupon */}
                                {product.hasCoupon && (
                                    <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '8px', padding: '8px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#92400E' }}><Award size={12} />领券立减¥{product.couponAmount}</div>
                                        <button style={{ fontSize: '12px', color: '#D97706', fontWeight: '600', background: 'none', border: 'none' }}>领取 →</button>
                                    </div>
                                )}

                                {/* Actions */}
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button style={{ flex: 1, padding: '10px', borderRadius: '12px', background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', color: 'white', border: 'none', fontWeight: '600', fontSize: '14px' }}>查看详情</button>
                                    <button style={{ padding: '10px 16px', borderRadius: '12px', background: '#F59E0B', color: 'white', border: 'none' }}><ShoppingCart size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Filter Modal */}
                <Popup visible={showFilters} onMaskClick={() => setShowFilters(false)} position="right" bodyStyle={{ width: '85vw', maxWidth: '400px' }}>
                    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '16px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <button onClick={clearFilters} style={{ fontSize: '14px', color: '#6B7280', background: 'none', border: 'none' }}>清空</button>
                            <span style={{ fontWeight: '600' }}>筛选</span>
                            <button onClick={() => setShowFilters(false)} style={{ background: 'none', border: 'none' }}><X size={20} /></button>
                        </div>

                        <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
                            {filterOptions && (
                                <>
                                    <div style={{ marginBottom: '24px' }}>
                                        <div style={{ fontWeight: '600', color: '#1F2937', marginBottom: '12px' }}>宝宝月龄</div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                                            {filterOptions.age.map((age) => (
                                                <button key={age} onClick={() => toggleFilter('age', age)} style={{ padding: '10px', borderRadius: '8px', background: selectedFilters.age === age ? '#3B82F6' : '#F3F4F6', color: selectedFilters.age === age ? 'white' : '#374151', border: 'none', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>{age}</button>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '24px' }}>
                                        <div style={{ fontWeight: '600', color: '#1F2937', marginBottom: '12px' }}>价格区间</div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                                            {filterOptions.price.map((p) => (
                                                <button key={p.id} onClick={() => toggleFilter('price', p.id)} style={{ padding: '10px', borderRadius: '8px', background: selectedFilters.price.includes(p.id) ? '#3B82F6' : '#F3F4F6', color: selectedFilters.price.includes(p.id) ? 'white' : '#374151', border: 'none', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>{p.label}</button>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '24px' }}>
                                        <div style={{ fontWeight: '600', color: '#1F2937', marginBottom: '12px' }}>品牌</div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                            {filterOptions.brand.map((b) => (
                                                <button key={b} onClick={() => toggleFilter('brand', b)} style={{ padding: '6px 14px', borderRadius: '16px', background: selectedFilters.brand.includes(b) ? '#3B82F6' : '#F3F4F6', color: selectedFilters.brand.includes(b) ? 'white' : '#374151', border: 'none', fontSize: '13px', cursor: 'pointer' }}>{b}</button>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '24px' }}>
                                        <div style={{ fontWeight: '600', color: '#1F2937', marginBottom: '12px' }}>材质</div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                            {filterOptions.material.map((m) => (
                                                <button key={m} onClick={() => toggleFilter('material', m)} style={{ padding: '6px 14px', borderRadius: '16px', background: selectedFilters.material.includes(m) ? '#3B82F6' : '#F3F4F6', color: selectedFilters.material.includes(m) ? 'white' : '#374151', border: 'none', fontSize: '13px', cursor: 'pointer' }}>{m}</button>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '24px' }}>
                                        <div style={{ fontWeight: '600', color: '#1F2937', marginBottom: '12px' }}>功能特点</div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                            {filterOptions.feature.map((f) => (
                                                <button key={f} onClick={() => toggleFilter('feature', f)} style={{ padding: '6px 14px', borderRadius: '16px', background: selectedFilters.feature.includes(f) ? '#3B82F6' : '#F3F4F6', color: selectedFilters.feature.includes(f) ? 'white' : '#374151', border: 'none', fontSize: '13px', cursor: 'pointer' }}>{f}</button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div style={{ padding: '16px', borderTop: '1px solid #E5E7EB' }}>
                            <button onClick={() => setShowFilters(false)} style={{ width: '100%', padding: '12px', borderRadius: '12px', background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', color: 'white', border: 'none', fontWeight: 'bold', fontSize: '15px' }}>查看结果</button>
                        </div>
                    </div>
                </Popup>
            </div>
        </MobileContainer>
    );
}
