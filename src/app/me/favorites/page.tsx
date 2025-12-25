'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Toast } from 'antd-mobile';
import { ArrowLeft, Heart, Trash2, Star, ChevronRight } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';

interface FavoriteItem {
    id: string;
    type: 'product' | 'post' | 'topic';
    title: string;
    image: string;
    subtitle: string;
    time: string;
}

const MOCK_FAVORITES: FavoriteItem[] = [
    { id: '1', type: 'product', title: 'Comotomo可么多么奶瓶', image: '🍼', subtitle: '¥189 · 92%推荐', time: '2天前' },
    { id: '2', type: 'product', title: 'Pigeon贝亲玻璃奶瓶', image: '🍼', subtitle: '¥89 · 85%推荐', time: '3天前' },
    { id: '3', type: 'post', title: '3个月宝宝胀气怎么办？分享我的经验', image: '📝', subtitle: '小雨妈妈 · 234人觉得有用', time: '5天前' },
    { id: '4', type: 'topic', title: '#奶瓶选购指南#', image: '💬', subtitle: '1.2k讨论', time: '1周前' },
];

export default function FavoritesPage() {
    const router = useRouter();
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        setFavorites(MOCK_FAVORITES);
    }, []);

    const handleRemove = (id: string) => {
        setFavorites((prev) => prev.filter((f) => f.id !== id));
        Toast.show({ content: '已取消收藏' });
    };

    const filteredItems = activeTab === 'all' ? favorites : favorites.filter((f) => f.type === activeTab);

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F7F8FA' }}>
                {/* Header */}
                <div style={{ background: 'white', padding: '12px 16px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #F3F4F6' }}>
                    <button onClick={() => router.back()} style={{ background: 'none', border: 'none' }}>
                        <ArrowLeft size={20} />
                    </button>
                    <span style={{ flex: 1, textAlign: 'center', fontWeight: '600', fontSize: '16px' }}>我的收藏</span>
                    <div style={{ width: '20px' }} />
                </div>

                {/* Tabs */}
                <div style={{ background: 'white', padding: '12px 16px', display: 'flex', gap: '12px', borderBottom: '1px solid #F3F4F6' }}>
                    {[
                        { key: 'all', label: '全部' },
                        { key: 'product', label: '产品' },
                        { key: 'post', label: '帖子' },
                        { key: 'topic', label: '话题' },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            style={{
                                padding: '6px 16px',
                                borderRadius: '16px',
                                border: 'none',
                                background: activeTab === tab.key ? '#3B82F6' : '#F3F4F6',
                                color: activeTab === tab.key ? 'white' : '#6B7280',
                                fontSize: '13px',
                                fontWeight: '500',
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* List */}
                <div style={{ padding: '16px' }}>
                    {filteredItems.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '48px 0', color: '#9CA3AF' }}>
                            <Heart size={48} style={{ marginBottom: '12px', opacity: 0.5 }} />
                            <div>暂无收藏内容</div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {filteredItems.map((item) => (
                                <div key={item.id} style={{ background: 'white', borderRadius: '12px', padding: '16px', display: 'flex', gap: '12px' }}>
                                    <div style={{ width: '56px', height: '56px', borderRadius: '8px', background: '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>
                                        {item.image}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>{item.title}</div>
                                        <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>{item.subtitle}</div>
                                        <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{item.time}收藏</div>
                                    </div>
                                    <button onClick={() => handleRemove(item.id)} style={{ background: 'none', border: 'none', color: '#EF4444', alignSelf: 'center' }}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </MobileContainer>
    );
}
