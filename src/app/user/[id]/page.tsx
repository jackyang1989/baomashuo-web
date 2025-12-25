'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Tabs, Toast } from 'antd-mobile';
import { ArrowLeft, Share2, MoreVertical, MessageCircle, UserPlus, UserCheck, MapPin, Calendar, ThumbsUp, Award, Heart, MessageSquare, Sparkles, CheckCircle } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { userProfileService, type UserProfile, type UserPost, type UserReview, type UserAnswer, type Follower } from '@/services/userProfileService';

export default function UserProfilePage() {
    const router = useRouter();
    const params = useParams();
    const userId = params?.id as string;

    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [posts, setPosts] = useState<UserPost[]>([]);
    const [reviews, setReviews] = useState<UserReview[]>([]);
    const [answers, setAnswers] = useState<UserAnswer[]>([]);
    const [followers, setFollowers] = useState<Follower[]>([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [activeTab, setActiveTab] = useState('posts');

    useEffect(() => {
        userProfileService.getUserProfile(userId).then(setProfile);
        userProfileService.getUserPosts(userId).then(setPosts);
        userProfileService.getUserReviews(userId).then(setReviews);
        userProfileService.getUserAnswers(userId).then(setAnswers);
        userProfileService.getFollowers(userId).then(setFollowers);
    }, [userId]);

    const handleFollow = async () => {
        if (isFollowing) {
            await userProfileService.unfollowUser(userId);
        } else {
            await userProfileService.followUser(userId);
        }
        setIsFollowing(!isFollowing);
        Toast.show({ content: isFollowing ? '已取消关注' : '已关注' });
    };

    if (!profile) return <MobileContainer><div style={{ padding: '48px', textAlign: 'center' }}>加载中...</div></MobileContainer>;

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F7F8FA' }}>
                {/* Header */}
                <div style={{ background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', padding: '16px', paddingBottom: '24px', color: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: 'white' }}><ArrowLeft size={20} /></button>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button style={{ background: 'none', border: 'none', color: 'white' }}><Share2 size={18} /></button>
                            <button style={{ background: 'none', border: 'none', color: 'white' }}><MoreVertical size={18} /></button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '64px' }}>{profile.avatar}</span>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                <h1 style={{ fontSize: '22px', fontWeight: 'bold' }}>{profile.name}</h1>
                                {profile.isVerified && <CheckCircle size={18} color="#93C5FD" />}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <span style={{ background: 'rgba(255,255,255,0.3)', fontSize: '11px', padding: '2px 8px', borderRadius: '10px' }}>{profile.level}</span>
                                <span style={{ fontSize: '13px', opacity: 0.9 }}>{profile.levelName}</span>
                            </div>
                            <div style={{ fontSize: '13px', opacity: 0.9, lineHeight: 1.5 }}>{profile.signature}</div>
                        </div>
                    </div>

                    {/* Badges */}
                    <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '16px', paddingBottom: '4px' }}>
                        {profile.badges.map((badge) => (
                            <div key={badge.id} style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))`, backgroundImage: badge.color.includes('yellow') ? 'linear-gradient(135deg, #FBBF24, #F97316)' : badge.color.includes('red') ? 'linear-gradient(135deg, #F87171, #EC4899)' : 'linear-gradient(135deg, #A78BFA, #EC4899)', borderRadius: '8px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                                <span style={{ fontSize: '14px' }}>{badge.icon}</span>
                                <span style={{ fontSize: '11px', fontWeight: '600' }}>{badge.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* Baby Info */}
                    <div style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', borderRadius: '12px', padding: '12px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '20px' }}>{profile.babies[0]?.emoji}</span>
                            <div><div style={{ fontWeight: '600' }}>{profile.babies[0]?.name}</div><div style={{ fontSize: '11px', opacity: 0.9 }}>{profile.babies[0]?.age}</div></div>
                        </div>
                    </div>

                    {/* Location & Date */}
                    <div style={{ display: 'flex', gap: '16px', fontSize: '13px', opacity: 0.9, marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} />{profile.location}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} />{profile.joinDate}加入</div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={handleFollow} style={{ flex: 1, padding: '10px', borderRadius: '12px', background: isFollowing ? 'rgba(255,255,255,0.3)' : 'white', color: isFollowing ? 'white' : '#8B5CF6', border: 'none', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                            {isFollowing ? <><UserCheck size={16} />已关注</> : <><UserPlus size={16} />关注</>}
                        </button>
                        <button style={{ padding: '10px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.3)', color: 'white', border: 'none' }}><MessageCircle size={18} /></button>
                    </div>
                </div>

                {/* Stats */}
                <div style={{ background: 'white', padding: '16px', borderBottom: '1px solid #E5E7EB' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
                        <div style={{ textAlign: 'center' }}><div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937' }}>{profile.stats.posts}</div><div style={{ fontSize: '11px', color: '#6B7280' }}>帖子</div></div>
                        <div style={{ textAlign: 'center' }}><div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937' }}>{profile.stats.reviews}</div><div style={{ fontSize: '11px', color: '#6B7280' }}>评价</div></div>
                        <div style={{ textAlign: 'center' }}><div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937' }}>{profile.stats.followers}</div><div style={{ fontSize: '11px', color: '#6B7280' }}>粉丝</div></div>
                        <div style={{ textAlign: 'center' }}><div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937' }}>{profile.stats.following}</div><div style={{ fontSize: '11px', color: '#6B7280' }}>关注</div></div>
                        <div style={{ textAlign: 'center' }}><div style={{ fontSize: '20px', fontWeight: 'bold', color: '#F97316' }}>{profile.stats.totalLikes}</div><div style={{ fontSize: '11px', color: '#6B7280' }}>获赞</div></div>
                    </div>
                </div>

                {/* Highlights */}
                <div style={{ background: 'white', padding: '16px', borderBottom: '1px solid #E5E7EB' }}>
                    <h3 style={{ fontWeight: 'bold', color: '#1F2937', marginBottom: '12px' }}>Ta的亮点</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                        <div style={{ background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)', borderRadius: '12px', padding: '12px', border: '1px solid #BFDBFE' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}><ThumbsUp size={14} color="#3B82F6" /><span style={{ fontSize: '12px', color: '#6B7280' }}>有用度</span></div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3B82F6' }}>{profile.stats.helpful}</div>
                            <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>评价被点有用</div>
                        </div>
                        <div style={{ background: 'linear-gradient(135deg, #F5F3FF, #EDE9FE)', borderRadius: '12px', padding: '12px', border: '1px solid #DDD6FE' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}><Award size={14} color="#8B5CF6" /><span style={{ fontSize: '12px', color: '#6B7280' }}>影响力</span></div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#8B5CF6' }}>TOP 1%</div>
                            <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>活跃榜排名</div>
                        </div>
                    </div>
                </div>

                {/* Mutual Followers */}
                <div style={{ background: 'white', padding: '16px', borderBottom: '1px solid #E5E7EB' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <h3 style={{ fontWeight: 'bold', color: '#1F2937' }}>共同关注</h3>
                        <button style={{ fontSize: '12px', color: '#3B82F6', background: 'none', border: 'none' }}>查看全部 →</button>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {followers.map((f) => (
                            <div key={f.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ width: '48px', height: '48px', background: '#F3F4F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '4px', position: 'relative' }}>
                                    {f.avatar}
                                    {f.mutualFollow && <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '16px', height: '16px', background: '#3B82F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><UserCheck size={10} color="white" /></div>}
                                </div>
                                <span style={{ fontSize: '11px', color: '#374151', maxWidth: '48px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name.split('妈')[0]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ background: 'white', borderBottom: '1px solid #E5E7EB', position: 'sticky', top: 0, zIndex: 40 }}>
                    <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ '--title-font-size': '14px', '--active-title-color': '#8B5CF6', '--active-line-color': '#8B5CF6' }}>
                        <Tabs.Tab title={`帖子(${profile.stats.posts})`} key="posts" />
                        <Tabs.Tab title={`评价(${profile.stats.reviews})`} key="reviews" />
                        <Tabs.Tab title={`回答(${profile.stats.answers})`} key="answers" />
                    </Tabs>
                </div>

                {/* Content */}
                <div style={{ padding: '16px' }}>
                    {activeTab === 'posts' && posts.map((post) => (
                        <div key={post.id} onClick={() => router.push(`/community/post/${post.id}`)} style={{ background: 'white', borderRadius: '16px', padding: '16px', marginBottom: '12px', border: '1px solid #E5E7EB', cursor: 'pointer' }}>
                            {post.milestone && (
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', background: '#FEF3C7', color: '#D97706', padding: '4px 10px', borderRadius: '12px', marginBottom: '8px' }}><Sparkles size={12} />{post.milestone.name}</div>
                            )}
                            <div style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937', marginBottom: '8px' }}>{post.title}</div>
                            <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.content}</div>
                            {post.images && (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
                                    {post.images.map((img, idx) => <div key={idx} style={{ aspectRatio: '1', background: '#F3F4F6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>{img}</div>)}
                                </div>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#9CA3AF' }}>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Heart size={12} />{post.likes}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MessageSquare size={12} />{post.comments}</span>
                                </div>
                                <span>{post.time}</span>
                            </div>
                        </div>
                    ))}

                    {activeTab === 'reviews' && reviews.map((review) => (
                        <div key={review.id} style={{ background: 'white', borderRadius: '16px', padding: '16px', marginBottom: '12px', border: '1px solid #E5E7EB' }}>
                            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                                <div style={{ width: '48px', height: '48px', background: '#F3F4F6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>{review.product.image}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '2px' }}>{review.product.brand}</div>
                                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>{review.product.name}</div>
                                </div>
                                <div style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '6px', background: review.rating === 'recommend' ? '#ECFDF5' : '#FEE2E2', color: review.rating === 'recommend' ? '#059669' : '#DC2626' }}>
                                    {review.rating === 'recommend' ? '推荐' : '不推荐'}
                                </div>
                            </div>
                            <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '8px', marginBottom: '8px', fontSize: '13px', color: '#374151' }}>💬 {review.summary}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#9CA3AF' }}>
                                <span>使用{review.useDays}天</span>
                                <span>{review.helpful}人觉得有用</span>
                            </div>
                        </div>
                    ))}

                    {activeTab === 'answers' && answers.map((answer) => (
                        <div key={answer.id} style={{ background: 'white', borderRadius: '16px', padding: '16px', marginBottom: '12px', border: '1px solid #E5E7EB' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                                <span style={{ color: '#3B82F6', fontSize: '14px', fontWeight: '600' }}>Q:</span>
                                <div style={{ flex: 1, fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>{answer.question}</div>
                                {answer.adopted && <span style={{ fontSize: '10px', background: '#ECFDF5', color: '#059669', padding: '2px 8px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '2px' }}><CheckCircle size={10} />已采纳</span>}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
                                <span style={{ color: '#10B981', fontSize: '14px', fontWeight: '600' }}>A:</span>
                                <div style={{ flex: 1, fontSize: '13px', color: '#6B7280', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{answer.answer}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#9CA3AF' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ThumbsUp size={10} />{answer.likes}人觉得有用</span>
                                <span>{answer.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MobileContainer>
    );
}
