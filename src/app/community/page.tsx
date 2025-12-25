'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, Toast } from 'antd-mobile';
import { ArrowLeft, Bell, Search, Users, Heart, MessageSquare, Share2, ChevronRight, Star, Award, Sparkles, Pin, Gift } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { communityService, type CircleInfo, type ActiveUser, type Milestone, type Announcement, type HotTopic, type CommunityPost } from '@/services/communityService';

export default function CommunityPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('all');
    const [showMilestone, setShowMilestone] = useState(true);

    const [circleInfo, setCircleInfo] = useState<CircleInfo | null>(null);
    const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [hotTopics, setHotTopics] = useState<HotTopic[]>([]);
    const [posts, setPosts] = useState<CommunityPost[]>([]);

    useEffect(() => {
        communityService.getCircleInfo().then(setCircleInfo);
        communityService.getActiveUsers().then(setActiveUsers);
        communityService.getMilestones().then(setMilestones);
        communityService.getAnnouncements().then(setAnnouncements);
        communityService.getHotTopics().then(setHotTopics);
        communityService.getPosts(activeTab).then(setPosts);
    }, [activeTab]);

    const handleLike = async (postId: string) => {
        await communityService.likePost(postId);
        Toast.show({ content: '已点赞' });
    };

    const getPostTypeBadge = (type: string, post: CommunityPost) => {
        switch (type) {
            case 'milestone': return { bg: '#FEF3C7', color: '#D97706', icon: <Sparkles size={10} />, label: '成长里程碑' };
            case 'question': return { bg: '#DBEAFE', color: '#2563EB', icon: <MessageSquare size={10} />, label: '求助' };
            case 'share': return post.isRecommend ? { bg: '#ECFDF5', color: '#059669', icon: <Star size={10} />, label: '好物推荐' } : null;
            case 'help': return { bg: '#DBEAFE', color: '#2563EB', icon: <MessageSquare size={10} />, label: '求助' };
            default: return null;
        }
    };

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F7F8FA', paddingBottom: '80px' }}>
                {/* Header */}
                <div style={{
                    background: '#8B5CF6',
                    padding: '16px',
                    paddingBottom: '20px',
                    color: 'white',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: 'white' }}>
                            <ArrowLeft size={20} />
                        </button>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <button style={{ background: 'none', border: 'none', color: 'white', position: 'relative' }}>
                                <Bell size={18} />
                                <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: '#EF4444', borderRadius: '50%' }} />
                            </button>
                            <button style={{ background: 'none', border: 'none', color: 'white' }}>
                                <Search size={18} />
                            </button>
                        </div>
                    </div>

                    {circleInfo && (
                        <>
                            <div style={{ marginBottom: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                    <h1 style={{ fontSize: '22px', fontWeight: 'bold' }}>{circleInfo.name}</h1>
                                    <span style={{ background: 'rgba(255,255,255,0.3)', fontSize: '11px', padding: '2px 8px', borderRadius: '10px' }}>#{circleInfo.rank}活跃圈</span>
                                </div>
                                <div style={{ fontSize: '14px', opacity: 0.9 }}>宝宝现在{circleInfo.currentAge} • 已加入{circleInfo.joinedDays}天</div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                                {[
                                    { value: circleInfo.memberCount.toLocaleString(), label: '圈子成员' },
                                    { value: circleInfo.todayPosts, label: '今日新帖' },
                                    { value: circleInfo.todayActive, label: '今日活跃' },
                                ].map((stat, idx) => (
                                    <div key={idx} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                                        <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>{stat.value}</div>
                                        <div style={{ fontSize: '11px', opacity: 0.9 }}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Tabs */}
                <div style={{ background: 'white', borderBottom: '1px solid #E5E7EB', position: 'sticky', top: 0, zIndex: 40 }}>
                    <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ '--title-font-size': '14px', '--active-title-color': '#8B5CF6', '--active-line-color': '#8B5CF6' }}>
                        <Tabs.Tab title="全部" key="all" />
                        <Tabs.Tab title="里程碑" key="milestone" />
                        <Tabs.Tab title="求助" key="question" />
                        <Tabs.Tab title="分享" key="share" />
                    </Tabs>
                </div>

                <div style={{ padding: '16px' }}>
                    {/* Milestones Card */}
                    {showMilestone && activeTab === 'all' && (
                        <div style={{ background: '#FEF3C7', borderRadius: '12px', padding: '16px', border: '1px solid #FDE68A', marginBottom: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Sparkles size={18} color="#D97706" />
                                    <span style={{ fontWeight: 'bold', color: '#1F2937' }}>本月成长里程碑</span>
                                </div>
                                <button onClick={() => setShowMilestone(false)} style={{ fontSize: '12px', color: '#9CA3AF', background: 'none', border: 'none' }}>收起</button>
                            </div>
                            {milestones.map((m) => (
                                <div key={m.id} style={{ background: 'white', borderRadius: '12px', padding: '12px', marginBottom: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                        <span style={{ fontSize: '28px' }}>{m.icon}</span>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>{m.title}</div>
                                            <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>{m.tips}</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                                <div style={{ flex: 1, background: '#E5E7EB', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
                                                    <div style={{ background: '#FBBF24', height: '100%', width: `${m.percentage}%` }} />
                                                </div>
                                                <span style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280' }}>{m.percentage}%</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                                                <span style={{ color: '#9CA3AF' }}>{m.completedCount}/{m.totalCount}位宝宝达成</span>
                                                <button style={{ color: '#3B82F6', fontWeight: '500', background: 'none', border: 'none' }}>我也达成了 →</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Announcements */}
                    {activeTab === 'all' && announcements.length > 0 && (
                        <div style={{ background: '#EFF6FF', borderRadius: '16px', padding: '16px', border: '1px solid #BFDBFE', marginBottom: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                <Pin size={14} color="#2563EB" />
                                <span style={{ fontWeight: 'bold', color: '#1F2937' }}>圈子公告</span>
                            </div>
                            {announcements.map((a) => (
                                <div key={a.id} style={{ background: 'white', borderRadius: '12px', padding: '12px', marginBottom: '8px', cursor: 'pointer' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                                        <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: a.type === 'topic' ? '#F5F3FF' : '#FEF3C7', color: a.type === 'topic' ? '#7C3AED' : '#D97706' }}>
                                            {a.type === 'topic' ? '话题' : '活动'}
                                        </span>
                                        {a.hot && <span style={{ fontSize: '10px', background: '#EF4444', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>热</span>}
                                    </div>
                                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937', marginBottom: '4px' }}>{a.title}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#9CA3AF' }}>
                                        <span>{a.time}</span>
                                        {a.deadline && <><span>•</span><span style={{ color: '#D97706' }}>{a.deadline}</span></>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Hot Topics */}
                    {activeTab === 'all' && (
                        <div style={{ marginBottom: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span style={{ fontWeight: 'bold', color: '#1F2937' }}>热门话题</span>
                                <button style={{ fontSize: '12px', color: '#3B82F6', background: 'none', border: 'none' }}>更多 →</button>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
                                {hotTopics.map((t) => (
                                    <button key={t.id} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '8px 12px',
                                        background: 'white',
                                        borderRadius: '12px',
                                        border: '1px solid #E5E7EB',
                                        whiteSpace: 'nowrap',
                                        position: 'relative',
                                        cursor: 'pointer',
                                    }}>
                                        {t.hot && <div style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#EF4444', color: 'white', fontSize: '9px', padding: '1px 4px', borderRadius: '6px' }}>热</div>}
                                        <span style={{ fontSize: '18px' }}>{t.icon}</span>
                                        <div style={{ textAlign: 'left' }}>
                                            <div style={{ fontSize: '13px', fontWeight: '500', color: '#1F2937' }}>{t.name}</div>
                                            <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{t.posts}条</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Active Users Leaderboard */}
                    {activeTab === 'all' && (
                        <div style={{ background: '#F5F3FF', borderRadius: '12px', padding: '16px', border: '1px solid #DDD6FE', marginBottom: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Award size={18} color="#7C3AED" />
                                    <span style={{ fontWeight: 'bold', color: '#1F2937' }}>本月活跃榜</span>
                                </div>
                                <span style={{ fontSize: '11px', background: '#F5F3FF', color: '#7C3AED', padding: '2px 8px', borderRadius: '10px' }}>TOP 3</span>
                            </div>
                            {activeUsers.map((u) => (
                                <div key={u.id} style={{ background: 'white', borderRadius: '12px', padding: '12px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ fontSize: '20px' }}>{u.badge}</span>
                                    <span style={{ fontSize: '24px' }}>{u.avatar}</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{ fontSize: '14px', fontWeight: '600' }}>{u.name}</span>
                                            <span style={{ fontSize: '10px', background: '#FBBF24', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>{u.level}</span>
                                        </div>
                                        <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{u.posts}条动态</div>
                                    </div>
                                    <button style={{ fontSize: '13px', color: '#3B82F6', fontWeight: '500', background: 'none', border: 'none' }}>关注</button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Posts */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {posts.map((post) => {
                            const badge = getPostTypeBadge(post.type, post);
                            return (
                                <div key={post.id} style={{ background: 'white', borderRadius: '16px', padding: '16px', border: '1px solid #E5E7EB' }}>
                                    {/* User Header */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                        <span style={{ fontSize: '24px' }}>{post.user.avatar}</span>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <span style={{ fontSize: '14px', fontWeight: '600' }}>{post.user.name}</span>
                                                <span style={{ fontSize: '10px', background: '#FBBF24', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>{post.user.level}</span>
                                                {post.user.isTopUser && <span style={{ fontSize: '10px', background: '#F5F3FF', color: '#7C3AED', padding: '2px 6px', borderRadius: '4px' }}>活跃榜1</span>}
                                            </div>
                                            <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{post.time}</div>
                                        </div>
                                        <button style={{ color: '#9CA3AF', background: 'none', border: 'none' }}>•••</button>
                                    </div>

                                    {/* Type Badges */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                                        {badge && (
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', background: badge.bg, color: badge.color, padding: '4px 8px', borderRadius: '12px' }}>
                                                {badge.icon}{badge.label}
                                            </span>
                                        )}
                                        {post.topic && <span style={{ fontSize: '11px', background: '#EFF6FF', color: '#3B82F6', padding: '4px 8px', borderRadius: '12px' }}>#{post.topic}</span>}
                                        {post.isHot && <span style={{ fontSize: '11px', background: '#EF4444', color: 'white', padding: '4px 8px', borderRadius: '12px' }}>🔥 热门</span>}
                                    </div>

                                    {/* Milestone Badge */}
                                    {post.milestone && (
                                        <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '8px', padding: '8px', marginBottom: '12px' }}>
                                            <span style={{ fontSize: '13px', fontWeight: '600', color: '#92400E' }}>🎉 达成：{post.milestone}</span>
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div style={{ fontSize: '14px', color: '#374151', marginBottom: '12px', lineHeight: 1.6 }}>{post.content}</div>

                                    {/* Images */}
                                    {post.images && (
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
                                            {post.images.map((img, idx) => (
                                                <div key={idx} style={{ aspectRatio: '1', background: '#F3F4F6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>{img}</div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Video */}
                                    {post.hasVideo && (
                                        <div style={{ aspectRatio: '16/9', background: '#F3F4F6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                                            <div style={{ width: '48px', height: '48px', background: 'rgba(0,0,0,0.5)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▶️</div>
                                        </div>
                                    )}

                                    {/* Product */}
                                    {post.product && (
                                        <div style={{ background: '#F9FAFB', borderRadius: '12px', padding: '12px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '48px', height: '48px', background: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🍼</div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>{post.product.name}</div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <span style={{ color: '#EF4444', fontWeight: 'bold' }}>¥{post.product.price}</span>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '11px' }}>
                                                        <Star size={10} color="#FBBF24" fill="#FBBF24" />{post.product.rating}
                                                    </div>
                                                </div>
                                            </div>
                                            <button style={{ fontSize: '13px', color: '#3B82F6', fontWeight: '500', background: 'none', border: 'none' }}>查看</button>
                                        </div>
                                    )}

                                    {/* Reward */}
                                    {post.reward && (
                                        <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '8px', padding: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Gift size={14} color="#D97706" />
                                            <span style={{ fontSize: '13px', color: '#92400E' }}>悬赏 {post.reward} 积分</span>
                                            {post.hasAcceptedAnswer && <span style={{ marginLeft: 'auto', fontSize: '11px', background: '#ECFDF5', color: '#059669', padding: '2px 8px', borderRadius: '8px' }}>✓ 已解决</span>}
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #F3F4F6' }}>
                                        <button onClick={() => handleLike(post.id)} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6B7280', background: 'none', border: 'none' }}>
                                            <Heart size={16} /><span style={{ fontSize: '13px' }}>{post.likes}</span>
                                        </button>
                                        <button style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6B7280', background: 'none', border: 'none' }}>
                                            <MessageSquare size={16} /><span style={{ fontSize: '13px' }}>{post.comments}</span>
                                        </button>
                                        <button style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6B7280', background: 'none', border: 'none' }}>
                                            <Share2 size={16} /><span style={{ fontSize: '13px' }}>{post.shares || 0}</span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* FAB */}
                <button style={{
                    position: 'fixed',
                    bottom: '100px',
                    right: '20px',
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: '#8B5CF6',
                    color: 'white',
                    border: 'none',
                    boxShadow: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    cursor: 'pointer',
                    zIndex: 50,
                }}>
                    ✏️
                </button>
            </div>
        </MobileContainer>
    );
}
