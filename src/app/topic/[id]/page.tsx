'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Tabs, Toast } from 'antd-mobile';
import { ArrowLeft, Share2, MoreVertical, Bell, BellOff, Plus, Hash, TrendingUp, Sparkles, Heart, MessageSquare, Eye, Crown, Award, ChevronRight } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { topicService, type TopicInfo, type TopicActiveUser, type TopicPost, type RelatedTopic } from '@/services/topicService';

export default function TopicDetailPage() {
    const router = useRouter();
    const params = useParams();
    const topicId = params?.id as string;

    const [topicInfo, setTopicInfo] = useState<TopicInfo | null>(null);
    const [activeUsers, setActiveUsers] = useState<TopicActiveUser[]>([]);
    const [posts, setPosts] = useState<TopicPost[]>([]);
    const [relatedTopics, setRelatedTopics] = useState<RelatedTopic[]>([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [activeTab, setActiveTab] = useState('hot');

    useEffect(() => {
        topicService.getTopicInfo(topicId).then(setTopicInfo);
        topicService.getActiveUsers(topicId).then(setActiveUsers);
        topicService.getRelatedTopics(topicId).then(setRelatedTopics);
    }, [topicId]);

    useEffect(() => {
        topicService.getPosts(topicId, activeTab).then(setPosts);
    }, [topicId, activeTab]);

    const handleFollow = async () => {
        if (isFollowing) {
            await topicService.unfollowTopic(topicId);
        } else {
            await topicService.followTopic(topicId);
        }
        setIsFollowing(!isFollowing);
        Toast.show({ content: isFollowing ? '已取消关注' : '已关注话题' });
    };

    if (!topicInfo) return <MobileContainer><div style={{ padding: '48px', textAlign: 'center' }}>加载中...</div></MobileContainer>;

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F7F8FA', paddingBottom: '80px' }}>
                {/* Header */}
                <div style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', padding: '16px', paddingBottom: '24px', color: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: 'white' }}><ArrowLeft size={20} /></button>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button style={{ background: 'none', border: 'none', color: 'white' }}><Share2 size={18} /></button>
                            <button style={{ background: 'none', border: 'none', color: 'white' }}><MoreVertical size={18} /></button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                        <div style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>{topicInfo.icon}</div>
                        <div style={{ flex: 1 }}>
                            <h1 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}><Hash size={18} />{topicInfo.name}</h1>
                            <p style={{ fontSize: '13px', opacity: 0.9, lineHeight: 1.5 }}>{topicInfo.description}</p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
                        <div style={{ textAlign: 'center' }}><div style={{ fontSize: '20px', fontWeight: 'bold' }}>{topicInfo.stats.posts}</div><div style={{ fontSize: '11px', opacity: 0.8 }}>帖子</div></div>
                        <div style={{ textAlign: 'center' }}><div style={{ fontSize: '20px', fontWeight: 'bold' }}>{topicInfo.stats.followers.toLocaleString()}</div><div style={{ fontSize: '11px', opacity: 0.8 }}>关注</div></div>
                        <div style={{ textAlign: 'center' }}><div style={{ fontSize: '20px', fontWeight: 'bold', color: '#FDE047' }}>+{topicInfo.stats.todayPosts}</div><div style={{ fontSize: '11px', opacity: 0.8 }}>今日新增</div></div>
                        <div style={{ textAlign: 'center' }}><div style={{ fontSize: '20px', fontWeight: 'bold' }}>{(topicInfo.stats.totalViews / 10000).toFixed(1)}w</div><div style={{ fontSize: '11px', opacity: 0.8 }}>浏览</div></div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={handleFollow} style={{ flex: 1, padding: '10px', borderRadius: '12px', background: isFollowing ? 'rgba(255,255,255,0.3)' : 'white', color: isFollowing ? 'white' : '#6366F1', border: 'none', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                            {isFollowing ? <><BellOff size={16} />已关注</> : <><Bell size={16} />关注话题</>}
                        </button>
                        <button style={{ padding: '10px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.3)', color: 'white', border: 'none' }}><Plus size={18} /></button>
                    </div>
                </div>

                {/* Tags */}
                <div style={{ background: 'white', padding: '12px 16px', borderBottom: '1px solid #E5E7EB' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto' }}>
                        <span style={{ fontSize: '12px', color: '#9CA3AF', whiteSpace: 'nowrap' }}>热门标签：</span>
                        {topicInfo.tags.map((tag, idx) => (
                            <button key={idx} style={{ padding: '4px 12px', background: '#EEF2FF', color: '#4F46E5', borderRadius: '12px', fontSize: '12px', border: 'none', whiteSpace: 'nowrap' }}>{tag}</button>
                        ))}
                    </div>
                </div>

                {/* Moderators */}
                <div style={{ background: 'white', padding: '16px', borderBottom: '1px solid #E5E7EB' }}>
                    <h3 style={{ fontWeight: 'bold', color: '#1F2937', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}><Crown size={16} color="#FBBF24" />话题管理员</h3>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {topicInfo.moderators.map((mod) => (
                            <button key={mod.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F9FAFB', borderRadius: '8px', padding: '8px 12px', border: 'none' }}>
                                <span style={{ fontSize: '24px' }}>{mod.avatar}</span>
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ fontSize: '13px', fontWeight: '500', color: '#1F2937', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        {mod.name}
                                        {mod.role === 'expert' && <span style={{ fontSize: '10px', background: '#F5F3FF', color: '#7C3AED', padding: '1px 6px', borderRadius: '4px' }}>专家</span>}
                                    </div>
                                    <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{mod.role === 'expert' ? '儿科医生' : '资深宝妈'}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Active Users */}
                <div style={{ background: 'white', padding: '16px', borderBottom: '1px solid #E5E7EB' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <h3 style={{ fontWeight: 'bold', color: '#1F2937', display: 'flex', alignItems: 'center', gap: '6px' }}><Award size={16} color="#F97316" />本周活跃榜</h3>
                        <button style={{ fontSize: '12px', color: '#3B82F6', background: 'none', border: 'none' }}>查看全部 →</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {activeUsers.map((user) => (
                            <button key={user.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#F9FAFB', borderRadius: '8px', padding: '8px', width: '100%', border: 'none' }}>
                                <span style={{ fontSize: '18px' }}>{user.badge}</span>
                                <span style={{ fontSize: '24px' }}>{user.avatar}</span>
                                <div style={{ flex: 1, textAlign: 'left' }}><div style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>{user.name}</div><div style={{ fontSize: '11px', color: '#9CA3AF' }}>{user.posts}条内容</div></div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ background: 'white', borderBottom: '1px solid #E5E7EB', position: 'sticky', top: 0, zIndex: 40 }}>
                    <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ '--title-font-size': '14px', '--active-title-color': '#6366F1', '--active-line-color': '#6366F1' }}>
                        <Tabs.Tab title="最热" key="hot" />
                        <Tabs.Tab title="最新" key="latest" />
                        <Tabs.Tab title="精选" key="recommend" />
                    </Tabs>
                </div>

                {/* Posts */}
                <div>
                    {posts.map((post) => (
                        <div key={post.id} onClick={() => router.push(`/community/post/${post.id}`)} style={{ background: 'white', padding: '16px', borderBottom: '1px solid #E5E7EB', cursor: 'pointer' }}>
                            {(post.isPinned || post.isRecommend) && (
                                <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                                    {post.isPinned && <span style={{ fontSize: '10px', background: '#FEF3C7', color: '#D97706', padding: '2px 8px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '2px' }}><TrendingUp size={10} />置顶</span>}
                                    {post.isRecommend && <span style={{ fontSize: '10px', background: '#F5F3FF', color: '#7C3AED', padding: '2px 8px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '2px' }}><Sparkles size={10} />精选</span>}
                                </div>
                            )}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                <span style={{ fontSize: '20px' }}>{post.user.avatar}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <span style={{ fontSize: '14px', fontWeight: '600' }}>{post.user.name}</span>
                                        <span style={{ fontSize: '10px', background: '#F5F3FF', color: '#7C3AED', padding: '1px 6px', borderRadius: '4px' }}>{post.user.level}</span>
                                        {post.user.isExpert && <span style={{ fontSize: '10px', background: '#FEF3C7', color: '#D97706', padding: '1px 6px', borderRadius: '4px' }}>专家</span>}
                                    </div>
                                    <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{post.time}</div>
                                </div>
                            </div>
                            <div style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937', marginBottom: '8px' }}>{post.title}</div>
                            <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.content}</div>
                            {post.images && (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
                                    {post.images.map((img, idx) => <div key={idx} style={{ aspectRatio: '1', background: '#F3F4F6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>{img}</div>)}
                                </div>
                            )}
                            {post.tags && (
                                <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                                    {post.tags.map((tag, idx) => <span key={idx} style={{ fontSize: '11px', background: '#EEF2FF', color: '#4F46E5', padding: '2px 8px', borderRadius: '6px' }}>{tag}</span>)}
                                </div>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#9CA3AF' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Heart size={12} />{post.likes}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MessageSquare size={12} />{post.comments}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Eye size={12} />{post.views}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                    {post.hasAnswer && <span style={{ fontSize: '10px', background: '#ECFDF5', color: '#059669', padding: '2px 8px', borderRadius: '6px' }}>已解决</span>}
                                    {post.reward && <span style={{ fontSize: '10px', background: '#FEF3C7', color: '#D97706', padding: '2px 8px', borderRadius: '6px' }}>悬赏{post.reward}积分</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Related Topics */}
                <div style={{ background: 'white', padding: '16px' }}>
                    <h3 style={{ fontWeight: 'bold', color: '#1F2937', marginBottom: '12px' }}>相关话题</h3>
                    {relatedTopics.map((topic) => (
                        <button key={topic.id} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', background: '#F9FAFB', borderRadius: '12px', padding: '12px', marginBottom: '8px', border: 'none' }}>
                            <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', border: '1px solid #E5E7EB' }}>{topic.icon}</div>
                            <div style={{ flex: 1, textAlign: 'left' }}><div style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>#{topic.name}</div><div style={{ fontSize: '11px', color: '#9CA3AF' }}>{topic.posts}条内容</div></div>
                            <ChevronRight size={18} color="#9CA3AF" />
                        </button>
                    ))}
                </div>

                {/* FAB */}
                <button style={{ position: 'fixed', bottom: '100px', right: '20px', width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', color: 'white', border: 'none', boxShadow: '0 4px 12px rgba(99,102,241,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
                    <Plus size={24} />
                </button>
            </div>
        </MobileContainer>
    );
}
