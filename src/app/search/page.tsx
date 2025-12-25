'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, Toast } from 'antd-mobile';
import { ArrowLeft, Search, X, TrendingUp, Clock, Star, MessageSquare, Filter } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { searchService, type HotSearch, type SearchResults } from '@/services/searchService';

export default function SearchPage() {
    const router = useRouter();
    const [searchText, setSearchText] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [showResults, setShowResults] = useState(false);

    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [hotSearches, setHotSearches] = useState<HotSearch[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [results, setResults] = useState<SearchResults | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        searchService.getSearchHistory().then(setSearchHistory);
        searchService.getHotSearches().then(setHotSearches);
    }, []);

    useEffect(() => {
        if (searchText.length > 0) {
            searchService.getSuggestions(searchText).then(setSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [searchText]);

    const handleSearch = async (keyword: string) => {
        if (!keyword.trim()) return;
        setSearchText(keyword);
        setShowResults(true);
        setLoading(true);
        await searchService.saveSearchHistory(keyword);
        const data = await searchService.search(keyword);
        setResults(data);
        setLoading(false);
        setSearchHistory(await searchService.getSearchHistory());
    };

    const clearHistory = async () => {
        await searchService.clearSearchHistory();
        setSearchHistory([]);
        Toast.show({ content: '已清空搜索历史' });
    };

    const getTrendBadge = (trend: string) => {
        switch (trend) {
            case 'hot': return { bg: '#EF4444', label: '热' };
            case 'new': return { bg: '#3B82F6', label: '新' };
            default: return null;
        }
    };

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F7F8FA' }}>
                {/* Search Bar */}
                <div style={{
                    background: 'white',
                    padding: '12px 16px',
                    borderBottom: '1px solid #F3F4F6',
                    position: 'sticky',
                    top: 0,
                    zIndex: 50,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button onClick={() => router.back()} style={{ background: 'none', border: 'none' }}>
                            <ArrowLeft size={20} color="#374151" />
                        </button>
                        <div style={{ flex: 1, position: 'relative' }}>
                            <Search size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="text"
                                value={searchText}
                                onChange={(e) => { setSearchText(e.target.value); setShowResults(false); }}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchText)}
                                placeholder="搜索产品、帖子、用户..."
                                autoFocus
                                style={{
                                    width: '100%',
                                    padding: '10px 36px',
                                    background: '#F3F4F6',
                                    border: 'none',
                                    borderRadius: '20px',
                                    fontSize: '14px',
                                    outline: 'none',
                                }}
                            />
                            {searchText && (
                                <button onClick={() => setSearchText('')} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none' }}>
                                    <X size={14} color="#9CA3AF" />
                                </button>
                            )}
                        </div>
                        <button onClick={() => handleSearch(searchText)} style={{ color: '#3B82F6', fontWeight: '500', background: 'none', border: 'none', whiteSpace: 'nowrap' }}>
                            搜索
                        </button>
                    </div>

                    {/* Suggestions */}
                    {searchText && !showResults && suggestions.length > 0 && (
                        <div style={{ position: 'absolute', left: 0, right: 0, top: '100%', background: 'white', borderBottom: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 100 }}>
                            {suggestions.map((s, idx) => (
                                <button key={idx} onClick={() => handleSearch(s)} style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    background: 'none',
                                    border: 'none',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                }}>
                                    <Search size={14} color="#9CA3AF" />
                                    <span style={{ fontSize: '14px', color: '#374151' }}>{s}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Content */}
                {!showResults ? (
                    <div style={{ padding: '16px' }}>
                        {/* Search History */}
                        {searchHistory.length > 0 && (
                            <div style={{ marginBottom: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <span style={{ fontWeight: 'bold', color: '#1F2937' }}>搜索历史</span>
                                    <button onClick={clearHistory} style={{ fontSize: '12px', color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer' }}>清空</button>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {searchHistory.map((keyword, idx) => (
                                        <button key={idx} onClick={() => handleSearch(keyword)} style={{
                                            padding: '6px 12px',
                                            background: '#F3F4F6',
                                            borderRadius: '8px',
                                            border: 'none',
                                            fontSize: '13px',
                                            color: '#374151',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            cursor: 'pointer',
                                        }}>
                                            <Clock size={12} />{keyword}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Hot Searches */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span style={{ fontWeight: 'bold', color: '#1F2937' }}>热门搜索</span>
                                <button style={{ fontSize: '12px', color: '#3B82F6', background: 'none', border: 'none' }}>换一换</button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {hotSearches.map((item, idx) => {
                                    const badge = getTrendBadge(item.trend);
                                    return (
                                        <button key={item.id} onClick={() => handleSearch(item.keyword)} style={{
                                            background: 'white',
                                            borderRadius: '12px',
                                            padding: '12px',
                                            border: '1px solid #E5E7EB',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                        }}>
                                            <div style={{
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '4px',
                                                background: idx < 3 ? 'linear-gradient(135deg, #EF4444, #F97316)' : '#F3F4F6',
                                                color: idx < 3 ? 'white' : '#6B7280',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '12px',
                                                fontWeight: 'bold',
                                            }}>{idx + 1}</div>
                                            <span style={{ fontSize: '20px' }}>{item.icon}</span>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>{item.keyword}</span>
                                                    {badge && <span style={{ fontSize: '10px', background: badge.bg, color: 'white', padding: '1px 4px', borderRadius: '4px' }}>{badge.label}</span>}
                                                    {item.trend === 'up' && <TrendingUp size={12} color="#EF4444" />}
                                                </div>
                                                <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{item.count}次搜索</div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        {/* Result Tabs */}
                        <div style={{ background: 'white', borderBottom: '1px solid #E5E7EB', position: 'sticky', top: '56px', zIndex: 40 }}>
                            <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ '--title-font-size': '14px' }}>
                                <Tabs.Tab title="全部" key="all" />
                                <Tabs.Tab title={`产品(${results?.products.length || 0})`} key="products" />
                                <Tabs.Tab title={`帖子(${results?.posts.length || 0})`} key="posts" />
                                <Tabs.Tab title={`评价(${results?.reviews.length || 0})`} key="reviews" />
                            </Tabs>
                        </div>

                        {/* Filter */}
                        <div style={{ background: '#F9FAFB', padding: '8px 16px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Filter size={14} color="#6B7280" />
                            <span style={{ fontSize: '12px', color: '#6B7280' }}>筛选条件</span>
                            <button style={{ fontSize: '12px', background: 'white', padding: '4px 8px', borderRadius: '6px', border: '1px solid #E5E7EB' }}>同月龄</button>
                            <button style={{ fontSize: '12px', background: 'white', padding: '4px 8px', borderRadius: '6px', border: '1px solid #E5E7EB' }}>最新</button>
                        </div>

                        {/* Results */}
                        <div style={{ padding: '16px' }}>
                            {loading ? (
                                <div style={{ textAlign: 'center', padding: '48px 0', color: '#9CA3AF' }}>搜索中...</div>
                            ) : results && (
                                <div>
                                    {/* Products */}
                                    {(activeTab === 'all' || activeTab === 'products') && results.products.length > 0 && (
                                        <div style={{ marginBottom: '24px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                                <span style={{ fontWeight: 'bold', color: '#1F2937' }}>产品</span>
                                                {activeTab === 'all' && <button style={{ fontSize: '12px', color: '#3B82F6', background: 'none', border: 'none' }}>查看全部 →</button>}
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                {results.products.map((p) => (
                                                    <div key={p.id} onClick={() => router.push(`/product/${p.id}`)} style={{ background: 'white', borderRadius: '12px', padding: '12px', border: '1px solid #E5E7EB', cursor: 'pointer' }}>
                                                        <div style={{ display: 'flex', gap: '12px' }}>
                                                            <div style={{ width: '56px', height: '56px', background: '#F3F4F6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0 }}>{p.image}</div>
                                                            <div style={{ flex: 1 }}>
                                                                <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{p.brand}</div>
                                                                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>{p.name}</div>
                                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                        <span style={{ color: '#EF4444', fontWeight: 'bold' }}>¥{p.price}</span>
                                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '11px' }}>
                                                                            <Star size={10} color="#FBBF24" fill="#FBBF24" />{p.rating}
                                                                        </div>
                                                                    </div>
                                                                    <span style={{ fontSize: '11px', color: '#6B7280' }}>{p.recommendRate}%推荐</span>
                                                                </div>
                                                            </div>
                                                            {p.tag && <span style={{ fontSize: '10px', background: '#ECFDF5', color: '#059669', padding: '2px 6px', borderRadius: '6px', alignSelf: 'flex-start' }}>{p.tag}</span>}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Posts */}
                                    {(activeTab === 'all' || activeTab === 'posts') && results.posts.length > 0 && (
                                        <div style={{ marginBottom: '24px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                                <span style={{ fontWeight: 'bold', color: '#1F2937' }}>帖子</span>
                                                {activeTab === 'all' && <button style={{ fontSize: '12px', color: '#3B82F6', background: 'none', border: 'none' }}>查看全部 →</button>}
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                {results.posts.map((post) => (
                                                    <div key={post.id} style={{ background: 'white', borderRadius: '12px', padding: '12px', border: '1px solid #E5E7EB' }}>
                                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                                                            <span style={{ fontSize: '20px' }}>{post.user.avatar}</span>
                                                            <div style={{ flex: 1 }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                                                                    <span style={{ fontSize: '14px', fontWeight: '500' }}>{post.user.name}</span>
                                                                    <span style={{ fontSize: '10px', background: '#F5F3FF', color: '#7C3AED', padding: '2px 6px', borderRadius: '4px' }}>{post.user.level}</span>
                                                                </div>
                                                                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>{post.title}</div>
                                                                <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.content}</div>
                                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#9CA3AF' }}>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MessageSquare size={10} />{post.comments}</span>
                                                                        <span>{post.time}</span>
                                                                    </div>
                                                                    {post.hasAnswer && <span style={{ background: '#ECFDF5', color: '#059669', padding: '2px 6px', borderRadius: '4px' }}>已解决</span>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Reviews */}
                                    {(activeTab === 'all' || activeTab === 'reviews') && results.reviews.length > 0 && (
                                        <div style={{ marginBottom: '24px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                                <span style={{ fontWeight: 'bold', color: '#1F2937' }}>真实评价</span>
                                                {activeTab === 'all' && <button style={{ fontSize: '12px', color: '#3B82F6', background: 'none', border: 'none' }}>查看全部 →</button>}
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                {results.reviews.map((review) => (
                                                    <div key={review.id} style={{ background: 'white', borderRadius: '12px', padding: '12px', border: '1px solid #E5E7EB' }}>
                                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                                            <span style={{ fontSize: '20px' }}>{review.user.avatar}</span>
                                                            <div style={{ flex: 1 }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                                                                    <span style={{ fontSize: '14px', fontWeight: '500' }}>{review.user.name}</span>
                                                                    <span style={{ fontSize: '10px', background: '#F5F3FF', color: '#7C3AED', padding: '2px 6px', borderRadius: '4px' }}>{review.user.level}</span>
                                                                    <span style={{ fontSize: '11px', color: '#9CA3AF' }}>• {review.user.babyAge}</span>
                                                                </div>
                                                                <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>关于 <span style={{ color: '#3B82F6' }}>{review.product}</span></div>
                                                                <div style={{ background: '#ECFDF5', borderRadius: '8px', padding: '8px', marginBottom: '8px' }}>
                                                                    <span style={{ fontSize: '13px', color: '#374151' }}>💬 {review.summary}</span>
                                                                </div>
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#9CA3AF' }}>
                                                                    <span>使用{review.useDays}天</span>
                                                                    <span>{review.helpful}人觉得有用</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Empty State */}
                                    {results.products.length === 0 && results.posts.length === 0 && results.reviews.length === 0 && (
                                        <div style={{ textAlign: 'center', padding: '48px 0' }}>
                                            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
                                            <div style={{ color: '#6B7280', marginBottom: '8px' }}>没有找到相关内容</div>
                                            <div style={{ fontSize: '14px', color: '#9CA3AF' }}>试试其他关键词吧</div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </MobileContainer>
    );
}
