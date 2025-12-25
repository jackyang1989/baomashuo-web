'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Settings, ChevronRight, Star, MessageSquare, Heart, Bookmark, Users, TrendingUp, Gift, Award, Clock, FileText, HelpCircle, Bell, Shield, LogOut } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';

export default function ProfilePage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('posts');

    // 用户信息
    const userInfo = {
        avatar: '👩',
        name: '小雨妈妈',
        level: 'Lv5',
        levelName: '资深妈妈',
        babies: [{ name: '小雨', age: '3个月', gender: 'girl' }],
        stats: { posts: 23, reviews: 45, followers: 234, following: 156, helpful: 1203 },
        points: 2850,
        earnings: 128.5
    };

    // 成就徽章
    const badges = [
        { id: 1, name: '金牌评价员', icon: '🏅', desc: '发布100+评价' },
        { id: 2, name: '热心宝妈', icon: '❤️', desc: '回答50+问题' },
        { id: 3, name: '人气王', icon: '👑', desc: '粉丝500+' }
    ];

    // 我的内容
    const myContent = {
        posts: [
            { id: 1, type: '好物推荐', content: '强烈推荐这款辅食碗！防摔防烫，宝宝自己也能拿稳...', image: '🥣', likes: 234, comments: 56, time: '2天前' },
            { id: 2, type: '使用心得', content: '用了一个月的奶瓶，分享一下真实感受...', image: '🍼', likes: 189, comments: 34, time: '5天前' }
        ],
        reviews: [
            { id: 1, product: 'Comotomo奶瓶', rating: 'recommend', summary: '防胀气有效，宝宝接受度高', helpful: 234, time: '1周前' },
            { id: 2, product: 'babycare辅食碗', rating: 'not-recommend', summary: '吸盘不牢，已闲置', helpful: 156, time: '2周前' }
        ]
    };

    // 快捷入口
    const quickActions = [
        { icon: Star, label: '我的评价', count: userInfo.stats.reviews, color: '#F59E0B', bg: '#FEF3C7', href: '/review/submit' },
        { icon: FileText, label: '我的帖子', count: userInfo.stats.posts, color: '#3B82F6', bg: '#DBEAFE', href: '/community/create' },
        { icon: Bookmark, label: '我的收藏', count: 89, color: '#8B5CF6', bg: '#EDE9FE', href: '#' },
        { icon: Clock, label: '浏览历史', count: null, color: '#6B7280', bg: '#F3F4F6', href: '#' }
    ];

    // 功能菜单
    const menuItems = [
        {
            title: '我的资产', items: [
                { icon: Gift, label: '积分商城', value: `${userInfo.points}积分`, color: '#F97316', href: '/points' },
                { icon: TrendingUp, label: '我的收益', value: `¥${userInfo.earnings}`, color: '#10B981', href: '/earnings' }
            ]
        },
        {
            title: '账号管理', items: [
                { icon: Users, label: '关注与粉丝', value: `${userInfo.stats.followers}粉丝`, color: '#3B82F6', href: '#' },
                { icon: Bell, label: '消息通知', value: null, color: '#8B5CF6', href: '/notifications' },
                { icon: Shield, label: '隐私设置', value: null, color: '#6B7280', href: '#' },
                { icon: Settings, label: '账号设置', value: null, color: '#6B7280', href: '#' }
            ]
        },
        {
            title: '帮助与反馈', items: [
                { icon: HelpCircle, label: '帮助中心', value: null, color: '#3B82F6', href: '#' },
                { icon: MessageSquare, label: '意见反馈', value: null, color: '#10B981', href: '#' }
            ]
        }
    ];

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F5F5F5', paddingBottom: '80px' }}>
                {/* 顶部导航 - 扁平化 */}
                <div style={{ background: 'white', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E5E7EB' }}>
                    <span style={{ fontWeight: '600', fontSize: '17px', color: '#1F2937' }}>个人中心</span>
                    <button style={{ background: 'none', border: 'none' }}><Settings size={20} color="#6B7280" /></button>
                </div>

                {/* 用户信息卡片 - 扁平化 */}
                <div style={{ background: '#3B82F6', padding: '20px 16px 64px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '56px' }}>{userInfo.avatar}</span>
                        <div style={{ flex: 1, color: 'white' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{userInfo.name}</span>
                                <span style={{ background: 'rgba(255,255,255,0.2)', fontSize: '12px', padding: '2px 8px', borderRadius: '10px' }}>{userInfo.level}</span>
                            </div>
                            <div style={{ fontSize: '14px', opacity: 0.9 }}>{userInfo.levelName}</div>
                        </div>
                        <button style={{ color: 'white', fontSize: '14px', background: 'none', border: 'none' }}>编辑 →</button>
                    </div>

                    {/* 宝宝信息 */}
                    <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '24px' }}>👶</span>
                            <div style={{ color: 'white' }}>
                                <div style={{ fontWeight: '600' }}>{userInfo.babies[0].name}</div>
                                <div style={{ fontSize: '12px', opacity: 0.9 }}>{userInfo.babies[0].age}</div>
                            </div>
                            <button style={{ marginLeft: 'auto', color: 'white', fontSize: '12px', background: 'none', border: 'none' }}>管理 →</button>
                        </div>
                    </div>
                </div>

                {/* 数据统计卡片 */}
                <div style={{ padding: '0 16px', marginTop: '-48px', marginBottom: '16px' }}>
                    <div style={{ background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid #E5E7EB' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', textAlign: 'center' }}>
                            <div><div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937' }}>{userInfo.stats.posts}</div><div style={{ fontSize: '11px', color: '#6B7280' }}>帖子</div></div>
                            <div><div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937' }}>{userInfo.stats.reviews}</div><div style={{ fontSize: '11px', color: '#6B7280' }}>评价</div></div>
                            <div><div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937' }}>{userInfo.stats.followers}</div><div style={{ fontSize: '11px', color: '#6B7280' }}>粉丝</div></div>
                            <div><div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937' }}>{userInfo.stats.following}</div><div style={{ fontSize: '11px', color: '#6B7280' }}>关注</div></div>
                            <div><div style={{ fontSize: '20px', fontWeight: 'bold', color: '#F97316' }}>{userInfo.stats.helpful}</div><div style={{ fontSize: '11px', color: '#6B7280' }}>获赞</div></div>
                        </div>
                    </div>
                </div>

                {/* 成就徽章 */}
                <div style={{ padding: '0 16px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <h3 style={{ fontWeight: 'bold', color: '#1F2937', margin: 0 }}>我的成就</h3>
                        <button style={{ color: '#3B82F6', fontSize: '14px', background: 'none', border: 'none' }}>查看全部 →</button>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
                        {badges.map((badge) => (
                            <div key={badge.id} style={{ background: 'white', borderRadius: '12px', padding: '12px', border: '1px solid #E5E7EB', flexShrink: 0, width: '100px', textAlign: 'center' }}>
                                <div style={{ fontSize: '28px', marginBottom: '4px' }}>{badge.icon}</div>
                                <div style={{ fontSize: '12px', fontWeight: '600', color: '#1F2937', marginBottom: '2px' }}>{badge.name}</div>
                                <div style={{ fontSize: '10px', color: '#9CA3AF' }}>{badge.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 快捷入口 */}
                <div style={{ padding: '0 16px', marginBottom: '16px' }}>
                    <div style={{ background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid #E5E7EB' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                            {quickActions.map((action, idx) => (
                                <Link key={idx} href={action.href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                                    <div style={{ background: action.bg, padding: '12px', borderRadius: '12px' }}>
                                        <action.icon size={24} color={action.color} />
                                    </div>
                                    <span style={{ fontSize: '12px', color: '#374151' }}>{action.label}</span>
                                    {action.count !== null && <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{action.count}</span>}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 我的内容 Tab */}
                <div style={{ padding: '0 16px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '12px', borderBottom: '1px solid #E5E7EB' }}>
                        <button onClick={() => setActiveTab('posts')} style={{ paddingBottom: '12px', fontWeight: '500', fontSize: '14px', color: activeTab === 'posts' ? '#3B82F6' : '#6B7280', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: activeTab === 'posts' ? '2px solid #3B82F6' : '2px solid transparent', background: 'none' }}>帖子({userInfo.stats.posts})</button>
                        <button onClick={() => setActiveTab('reviews')} style={{ paddingBottom: '12px', fontWeight: '500', fontSize: '14px', color: activeTab === 'reviews' ? '#3B82F6' : '#6B7280', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: activeTab === 'reviews' ? '2px solid #3B82F6' : '2px solid transparent', background: 'none' }}>评价({userInfo.stats.reviews})</button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {activeTab === 'posts' && myContent.posts.map((post) => (
                            <div key={post.id} style={{ background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid #E5E7EB' }}>
                                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                                    <div style={{ width: '64px', height: '64px', background: '#F3F4F6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>{post.image}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '11px', color: '#3B82F6', marginBottom: '4px' }}>{post.type}</div>
                                        <div style={{ fontSize: '14px', color: '#1F2937', lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{post.content}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#9CA3AF' }}>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Heart size={12} />{post.likes}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MessageSquare size={12} />{post.comments}</span>
                                    </div>
                                    <span>{post.time}</span>
                                </div>
                            </div>
                        ))}

                        {activeTab === 'reviews' && myContent.reviews.map((review) => (
                            <div key={review.id} style={{ background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid #E5E7EB' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <span style={{ fontWeight: '500', fontSize: '14px', color: '#1F2937' }}>{review.product}</span>
                                    <span style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '6px', background: review.rating === 'recommend' ? '#ECFDF5' : '#FEE2E2', color: review.rating === 'recommend' ? '#059669' : '#DC2626' }}>{review.rating === 'recommend' ? '推荐' : '不推荐'}</span>
                                </div>
                                <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '12px' }}>💬 {review.summary}</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#9CA3AF' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={12} />{review.helpful}人觉得有用</span>
                                    <span>{review.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 功能菜单 */}
                <div style={{ padding: '0 16px' }}>
                    {menuItems.map((section, idx) => (
                        <div key={idx} style={{ marginBottom: '16px' }}>
                            <div style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '8px', paddingLeft: '4px' }}>{section.title}</div>
                            <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
                                {section.items.map((item, itemIdx) => (
                                    <Link key={itemIdx} href={item.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', textDecoration: 'none', borderBottom: itemIdx < section.items.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <item.icon size={20} color={item.color} />
                                            <span style={{ color: '#1F2937', fontSize: '14px' }}>{item.label}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {item.value && <span style={{ fontSize: '13px', color: '#6B7280' }}>{item.value}</span>}
                                            <ChevronRight size={18} color="#D1D5DB" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* 退出登录 */}
                    <button style={{ width: '100%', background: 'white', borderRadius: '12px', padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#EF4444', fontSize: '14px', fontWeight: '500', border: '1px solid #E5E7EB' }}>
                        <LogOut size={18} />退出登录
                    </button>
                </div>
            </div>
        </MobileContainer>
    );
}
