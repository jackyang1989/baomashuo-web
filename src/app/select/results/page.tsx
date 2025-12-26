'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, ThumbsUp, MessageCircle, ChevronRight, Star, AlertTriangle, Baby, Sparkles, Filter } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';

// 月龄/喂养/问题选项
const AGE_OPTIONS = ['0-3个月', '3-6个月', '6-12个月', '1-2岁', '2岁以上'];
const FEEDING_OPTIONS = ['母乳喂养', '混合喂养', '配方奶喂养'];
const PROBLEM_OPTIONS = ['胀气/肠绞痛', '拒绝奶瓶', '呛奶', '吐奶', '奶量不足'];

// 精选口碑产品
const CURATED_PRODUCTS = [
    {
        id: 'p1',
        name: 'Comotomo可么多么奶瓶',
        brand: 'Comotomo',
        image: '🍼',
        price: 189,
        likes: 320,
        rating: 4.8,
        pros: ['防胀气效果显著', '宝宝接受度高', '硅胶材质柔软'],
        cons: ['价格偏贵', '容量较小'],
        aiSummary: '92%同月龄宝妈推荐，特别适合胀气宝宝，硅胶材质接近母乳触感',
        sameAgeUsers: 156,
        sameAgeRate: 92,
    },
    {
        id: 'p2',
        name: 'Pigeon贝亲玻璃奶瓶',
        brand: 'Pigeon',
        image: '🍼',
        price: 89,
        likes: 280,
        rating: 4.5,
        pros: ['性价比高', '经典品牌', '易清洗'],
        cons: ['玻璃材质较重', '需小心轻放'],
        aiSummary: '85%宝妈推荐，高性价比首选，适合居家使用',
        sameAgeUsers: 134,
        sameAgeRate: 85,
    },
    {
        id: 'p3',
        name: "Dr.Brown's布朗博士",
        brand: "Dr.Brown's",
        image: '🍼',
        price: 129,
        likes: 256,
        rating: 4.6,
        pros: ['导气管防呛奶', '科学防胀气', '设计专业'],
        cons: ['配件多清洗麻烦', '导气管易堵'],
        aiSummary: '88%宝妈推荐，防呛奶效果明显，适合吐奶宝宝',
        sameAgeUsers: 98,
        sameAgeRate: 88,
    },
];

// 真实宝妈经验
const REAL_EXPERIENCES = [
    {
        id: 1,
        user: { name: '小雨妈妈', avatar: '👩', babyAge: '3个月' },
        product: 'Comotomo',
        content: '用了30天，宝宝胀气明显好转，晚上终于能睡整觉了！奶嘴柔软宝宝很喜欢',
        agrees: 234,
        time: '2小时前',
    },
    {
        id: 2,
        user: { name: '阳阳小可爱', avatar: '👱‍♀️', babyAge: '2个月' },
        product: '布朗博士',
        content: '换这个奶瓶后夜里哭闹减少了，导气管确实有用，就是清洗稍微麻烦点',
        agrees: 189,
        time: '5小时前',
    },
    {
        id: 3,
        user: { name: '豆豆妈', avatar: '👩‍🦰', babyAge: '4个月' },
        product: 'Pigeon',
        content: '性价比很高，宝宝从母乳转换很顺利，推荐新手妈妈',
        agrees: 156,
        time: '昨天',
    },
];

// 工具导航
const TOOLS = [
    { id: 'match', icon: <Baby size={18} />, title: '重新匹配', href: '/select' },
    { id: 'pitfall', icon: <AlertTriangle size={18} />, title: '避坑提醒', href: '/pitfalls' },
    { id: 'compare', icon: <Filter size={18} />, title: '对比产品', href: '/compare' },
];

export default function SelectResultsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [selectedAge, setSelectedAge] = useState(searchParams.get('age') || '3-6个月');
    const [selectedFeeding, setSelectedFeeding] = useState(searchParams.get('feeding') || '');
    const [selectedProblem, setSelectedProblem] = useState(searchParams.get('problem') || '');
    const [showMoreExperiences, setShowMoreExperiences] = useState(false);

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F7F8FA', paddingBottom: '80px' }}>
                {/* 顶部：返回 + 已选条件 */}
                <div style={{ background: 'white', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #E5E7EB' }}>
                    <button onClick={() => router.back()} style={{ background: 'none', border: 'none' }}>
                        <ArrowLeft size={20} />
                    </button>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>精选口碑产品</div>
                        <div style={{ fontSize: '12px', color: '#6B7280' }}>
                            {selectedAge && `月龄：${selectedAge}`}
                            {selectedProblem && ` | 问题：${selectedProblem}`}
                        </div>
                    </div>
                </div>

                {/* 筛选修改入口 */}
                <div style={{ background: 'white', padding: '12px 16px', display: 'flex', gap: '8px', borderBottom: '1px solid #E5E7EB' }}>
                    <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '8px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '12px', color: '#374151' }}>
                        <span>💧</span> {selectedAge || '月龄'} <ChevronDown size={12} />
                    </button>
                    <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '8px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '12px', color: '#374151' }}>
                        <span>💧</span> {selectedFeeding || '喂养方式'} <ChevronDown size={12} />
                    </button>
                    <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '8px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '12px', color: '#374151' }}>
                        <span>💧</span> {selectedProblem || '问题'} <ChevronDown size={12} />
                    </button>
                </div>

                {/* AI推荐摘要 */}
                <div style={{ margin: '12px 16px', background: '#EFF6FF', borderRadius: '12px', padding: '14px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', background: '#3B82F6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Sparkles size={16} color="white" />
                    </div>
                    <div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1E40AF', marginBottom: '4px' }}>AI为你精选了3款口碑产品</div>
                        <div style={{ fontSize: '12px', color: '#3B82F6', lineHeight: 1.5 }}>
                            基于{selectedAge}宝宝的真实评价数据，筛选出最适合{selectedProblem || '你'}的产品
                        </div>
                    </div>
                </div>

                {/* 精选口碑产品列表 */}
                <div style={{ padding: '0 16px' }}>
                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1F2937', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        🏆 精选口碑产品
                        <span style={{ fontSize: '12px', fontWeight: '400', color: '#9CA3AF' }}>共{CURATED_PRODUCTS.length}款</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {CURATED_PRODUCTS.map((product, idx) => (
                            <div key={product.id} style={{ background: 'white', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                                {/* 排名标签 */}
                                {idx < 3 && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                                        <span style={{
                                            width: '22px', height: '22px',
                                            background: idx === 0 ? '#F59E0B' : idx === 1 ? '#9CA3AF' : '#CD7F32',
                                            borderRadius: '6px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: 'white', fontSize: '12px', fontWeight: 'bold'
                                        }}>
                                            {idx + 1}
                                        </span>
                                        <span style={{ fontSize: '12px', color: '#6B7280' }}>
                                            {product.sameAgeUsers}位{selectedAge}宝妈验证
                                        </span>
                                    </div>
                                )}

                                <div style={{ display: 'flex', gap: '12px' }}>
                                    {/* 产品图 */}
                                    <div style={{ width: '80px', height: '80px', background: '#F9FAFB', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', flexShrink: 0 }}>
                                        {product.image}
                                    </div>

                                    {/* 产品信息 */}
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '2px' }}>{product.brand}</div>
                                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '6px' }}>{product.name}</div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#EF4444' }}>¥{product.price}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '12px', color: '#6B7280' }}>
                                                <Star size={12} color="#FBBF24" fill="#FBBF24" />{product.rating}
                                            </span>
                                        </div>

                                        {/* 点赞数 */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <ThumbsUp size={12} color="#10B981" />
                                            <span style={{ fontSize: '12px', color: '#10B981', fontWeight: '500' }}>{product.likes}宝妈推荐</span>
                                            <span style={{ fontSize: '11px', color: '#10B981', background: '#ECFDF5', padding: '2px 6px', borderRadius: '4px', marginLeft: '4px' }}>{product.sameAgeRate}%推荐率</span>
                                        </div>
                                    </div>
                                </div>

                                {/* AI总结优缺点 */}
                                <div style={{ marginTop: '12px', padding: '12px', background: '#F9FAFB', borderRadius: '10px' }}>
                                    <div style={{ fontSize: '12px', color: '#374151', marginBottom: '8px', lineHeight: 1.5 }}>
                                        <Sparkles size={12} color="#F59E0B" style={{ display: 'inline', marginRight: '4px' }} />
                                        {product.aiSummary}
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                        {product.pros.slice(0, 2).map((pro, i) => (
                                            <span key={i} style={{ fontSize: '11px', color: '#059669', background: '#ECFDF5', padding: '4px 8px', borderRadius: '6px' }}>✓ {pro}</span>
                                        ))}
                                        {product.cons.slice(0, 1).map((con, i) => (
                                            <span key={i} style={{ fontSize: '11px', color: '#D97706', background: '#FEF3C7', padding: '4px 8px', borderRadius: '6px' }}>⚠ {con}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* 查看详情按钮 */}
                                <Link href={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                                    <button style={{ width: '100%', marginTop: '12px', padding: '10px', background: 'white', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '13px', color: '#374151', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                        查看详情
                                        <ChevronRight size={14} />
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 真实宝妈经验 */}
                <div style={{ padding: '16px' }}>
                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1F2937', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        💬 真实宝妈经验
                        <span style={{ fontSize: '12px', fontWeight: '400', color: '#9CA3AF' }}>来自验证用户</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {REAL_EXPERIENCES.slice(0, showMoreExperiences ? 10 : 2).map((exp) => (
                            <div key={exp.id} style={{ background: 'white', borderRadius: '12px', padding: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                    <span style={{ fontSize: '28px' }}>{exp.user.avatar}</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{ fontSize: '13px', fontWeight: '600', color: '#1F2937' }}>{exp.user.name}</span>
                                            <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{exp.user.babyAge}宝宝</span>
                                        </div>
                                        <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{exp.time}</div>
                                    </div>
                                    <span style={{ fontSize: '11px', background: '#EFF6FF', color: '#3B82F6', padding: '3px 8px', borderRadius: '6px' }}>#{exp.product}</span>
                                </div>

                                <div style={{ fontSize: '13px', color: '#374151', lineHeight: 1.6, marginBottom: '12px' }}>{exp.content}</div>

                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '16px', fontSize: '12px', color: '#059669' }}>
                                        <ThumbsUp size={12} />
                                        我也遇到过 {exp.agrees}
                                    </button>
                                    <button style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '16px', fontSize: '12px', color: '#6B7280' }}>
                                        <MessageCircle size={12} />
                                        补充经验
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {!showMoreExperiences && (
                        <button
                            onClick={() => setShowMoreExperiences(true)}
                            style={{ width: '100%', marginTop: '12px', padding: '10px', background: 'white', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '13px', color: '#6B7280' }}
                        >
                            查看更多经验 →
                        </button>
                    )}
                </div>

                {/* 底部工具导航 */}
                <div style={{ padding: '0 16px 16px' }}>
                    <div style={{ background: 'white', borderRadius: '12px', padding: '12px', display: 'flex', justifyContent: 'space-around' }}>
                        {TOOLS.map((tool) => (
                            <Link key={tool.id} href={tool.href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
                                <div style={{ width: '40px', height: '40px', background: '#F3F4F6', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}>
                                    {tool.icon}
                                </div>
                                <span style={{ fontSize: '11px', color: '#6B7280' }}>{tool.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 底部导航 */}
                <div style={{ background: 'white', borderTop: '1px solid #E5E7EB', padding: '10px 16px', display: 'flex', justifyContent: 'space-around', position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '515px', zIndex: 50 }}>
                    {[
                        { id: 'home', icon: '🏠', label: '首页', href: '/' },
                        { id: 'community', icon: '👥', label: '圈子', href: '/community' },
                        { id: 'lists', icon: '📋', label: '清单', href: '/lists' },
                        { id: 'me', icon: '👤', label: '我的', href: '/me' },
                    ].map((item) => (
                        <Link key={item.id} href={item.href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', textDecoration: 'none', color: '#6B7280' }}>
                            <span style={{ fontSize: '22px' }}>{item.icon}</span>
                            <span style={{ fontSize: '11px' }}>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </MobileContainer>
    );
}
