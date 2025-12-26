'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Bell, ChevronDown, ThumbsUp, MessageCircle, ChevronRight, Sparkles, AlertTriangle, Baby, Droplets, HelpCircle } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';

// 月龄选项
const AGE_OPTIONS = ['0-3个月', '3-6个月', '6-12个月', '1-2岁', '2岁以上'];
// 喂养方式
const FEEDING_OPTIONS = ['母乳喂养', '混合喂养', '配方奶喂养'];
// 常见问题
const PROBLEM_OPTIONS = ['胀气/肠绞痛', '拒绝奶瓶', '呛奶', '吐奶', '奶量不足'];

// 精选口碑产品
const CURATED_PRODUCTS = [
    {
        id: 'p1',
        name: 'Comotomo可么多么奶瓶',
        image: '🍼',
        likes: 320,
        pros: ['防胀气效果显著', '宝宝接受度高'],
        cons: ['价格偏贵'],
        aiSummary: '92%宝妈推荐，适合胀气宝宝',
    },
    {
        id: 'p2',
        name: 'Pigeon贝亲玻璃奶瓶',
        image: '🍼',
        likes: 280,
        pros: ['性价比高', '经典品牌'],
        cons: ['玻璃材质较重'],
        aiSummary: '85%宝妈推荐，高性价比首选',
    },
    {
        id: 'p3',
        name: "Dr.Brown's布朗博士",
        image: '🍼',
        likes: 256,
        pros: ['导气管防呛奶', '科学设计'],
        cons: ['清洗配件多'],
        aiSummary: '88%宝妈推荐，防呛奶专家',
    },
];

// 真实宝妈经验
const REAL_EXPERIENCES = [
    {
        id: 1,
        user: { name: '小雨妈妈', avatar: '👩', babyAge: '3个月' },
        content: '用了30天，宝宝胀气明显好转，晚上终于能睡整觉了！',
        product: 'Comotomo奶瓶',
        agrees: 234,
        time: '2小时前',
    },
    {
        id: 2,
        user: { name: '晴天妈妈', avatar: '👱‍♀️', babyAge: '5个月' },
        content: '从母乳转奶瓶，试了3款才成功，分享避坑经验～',
        product: '奶瓶转换',
        agrees: 189,
        time: '5小时前',
    },
    {
        id: 3,
        user: { name: '豆豆妈', avatar: '👩‍🦰', babyAge: '4个月' },
        content: '导气管设计确实防呛奶，就是零件多清洗麻烦一点',
        product: '布朗博士',
        agrees: 156,
        time: '昨天',
    },
];

// 工具导航
const TOOLS = [
    { id: 'match', icon: <Baby size={20} />, title: '宝宝匹配', desc: '定制推荐', href: '/select' },
    { id: 'pitfall', icon: <AlertTriangle size={20} />, title: '避坑提醒', desc: '集中查看', href: '/pitfalls' },
    { id: 'ai', icon: <Sparkles size={20} />, title: '新品推荐', desc: 'AI精选', href: '/products' },
];

export default function HomePage() {
    const router = useRouter();
    const [selectedAge, setSelectedAge] = useState('3-6个月');
    const [selectedFeeding, setSelectedFeeding] = useState('');
    const [selectedProblem, setSelectedProblem] = useState('');
    const [showAgeDropdown, setShowAgeDropdown] = useState(false);

    const handleQuickFilter = () => {
        const params = new URLSearchParams();
        if (selectedAge) params.set('age', selectedAge);
        if (selectedProblem) params.set('problem', selectedProblem);
        router.push(`/select/results?${params.toString()}`);
    };

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F7F8FA', paddingBottom: '80px' }}>
                {/* 顶部区域 */}
                <div style={{ background: '#3B82F6', padding: '16px', color: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <div>
                            <div style={{ fontSize: '22px', fontWeight: 'bold' }}>宝妈说</div>
                        </div>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <button onClick={() => router.push('/search')} style={{ background: 'none', border: 'none', color: 'white' }}>
                                <Search size={22} />
                            </button>
                            <div style={{ position: 'relative' }}>
                                <Bell size={22} />
                                <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '16px', height: '16px', background: '#EF4444', borderRadius: '50%', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ fontSize: '14px', opacity: 0.9 }}>每一次母婴选品，都有人试过</div>
                </div>

                {/* 快速筛选入口 */}
                <div style={{ background: 'white', margin: '12px 16px', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Sparkles size={16} color="#F59E0B" />
                        告诉我宝宝情况，3秒精选推荐
                    </div>
                    
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                        {/* 月龄选择 */}
                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => setShowAgeDropdown(!showAgeDropdown)}
                                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 14px', background: selectedAge ? '#EFF6FF' : '#F3F4F6', border: selectedAge ? '1px solid #3B82F6' : '1px solid #E5E7EB', borderRadius: '20px', fontSize: '13px', color: selectedAge ? '#3B82F6' : '#6B7280' }}
                            >
                                <Baby size={14} />
                                {selectedAge || '宝宝月龄'}
                                <ChevronDown size={14} />
                            </button>
                            {showAgeDropdown && (
                                <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '4px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 100, overflow: 'hidden' }}>
                                    {AGE_OPTIONS.map((age) => (
                                        <button key={age} onClick={() => { setSelectedAge(age); setShowAgeDropdown(false); }} style={{ display: 'block', width: '100%', padding: '10px 20px', border: 'none', background: selectedAge === age ? '#EFF6FF' : 'white', color: selectedAge === age ? '#3B82F6' : '#374151', fontSize: '13px', textAlign: 'left' }}>
                                            {age}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* 常见问题 */}
                        {PROBLEM_OPTIONS.slice(0, 3).map((problem) => (
                            <button
                                key={problem}
                                onClick={() => setSelectedProblem(selectedProblem === problem ? '' : problem)}
                                style={{ padding: '10px 14px', background: selectedProblem === problem ? '#FEF3C7' : '#F3F4F6', border: selectedProblem === problem ? '1px solid #F59E0B' : '1px solid #E5E7EB', borderRadius: '20px', fontSize: '13px', color: selectedProblem === problem ? '#D97706' : '#6B7280' }}
                            >
                                {problem}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleQuickFilter}
                        style={{ width: '100%', padding: '14px', background: '#3B82F6', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                    >
                        一键进入精选口碑产品
                        <ChevronRight size={18} />
                    </button>
                </div>

                {/* 本周精选口碑产品 */}
                <div style={{ padding: '0 16px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '18px' }}>🏆</span>
                            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#1F2937' }}>本周精选口碑产品</span>
                        </div>
                        <Link href="/products" style={{ fontSize: '13px', color: '#3B82F6', textDecoration: 'none' }}>查看更多</Link>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
                        {CURATED_PRODUCTS.map((product) => (
                            <Link key={product.id} href={`/product/${product.id}`} style={{ textDecoration: 'none', flexShrink: 0, width: '160px' }}>
                                <div style={{ background: 'white', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                                    <div style={{ width: '100%', height: '80px', background: '#F9FAFB', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', marginBottom: '12px' }}>
                                        {product.image}
                                    </div>
                                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#1F2937', marginBottom: '6px', lineHeight: 1.3 }}>{product.name}</div>
                                    
                                    {/* 点赞数 */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                                        <ThumbsUp size={12} color="#10B981" />
                                        <span style={{ fontSize: '12px', color: '#10B981', fontWeight: '600' }}>{product.likes}宝妈推荐</span>
                                    </div>

                                    {/* AI总结优缺点 */}
                                    <div style={{ fontSize: '11px', color: '#059669', marginBottom: '4px' }}>✓ {product.pros[0]}</div>
                                    <div style={{ fontSize: '11px', color: '#D97706' }}>⚠ {product.cons[0]}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 真实宝妈经验 */}
                <div style={{ padding: '0 16px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '18px' }}>💬</span>
                            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#1F2937' }}>真实宝妈说</span>
                        </div>
                        <Link href="/community" style={{ fontSize: '13px', color: '#3B82F6', textDecoration: 'none' }}>更多</Link>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {REAL_EXPERIENCES.map((exp) => (
                            <div key={exp.id} style={{ background: 'white', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                    <span style={{ fontSize: '28px' }}>{exp.user.avatar}</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>{exp.user.name}</span>
                                            <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{exp.user.babyAge}宝宝</span>
                                        </div>
                                        <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{exp.time}</div>
                                    </div>
                                    <span style={{ fontSize: '11px', background: '#EFF6FF', color: '#3B82F6', padding: '4px 8px', borderRadius: '6px' }}>#{exp.product}</span>
                                </div>
                                
                                <div style={{ fontSize: '14px', color: '#374151', lineHeight: 1.5, marginBottom: '12px' }}>{exp.content}</div>
                                
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 14px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '20px', fontSize: '12px', color: '#059669', fontWeight: '500' }}>
                                        <ThumbsUp size={14} />
                                        我也遇到过 {exp.agrees}
                                    </button>
                                    <button style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 14px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '20px', fontSize: '12px', color: '#6B7280' }}>
                                        <MessageCircle size={14} />
                                        补充经验
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 工具导航 */}
                <div style={{ padding: '0 16px', marginBottom: '16px' }}>
                    <div style={{ background: 'white', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            {TOOLS.map((tool) => (
                                <Link key={tool.id} href={tool.href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
                                    <div style={{ width: '48px', height: '48px', background: '#F3F4F6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}>
                                        {tool.icon}
                                    </div>
                                    <div style={{ fontSize: '13px', fontWeight: '500', color: '#1F2937' }}>{tool.title}</div>
                                    <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{tool.desc}</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 底部导航 */}
                <div style={{ background: 'white', borderTop: '1px solid #E5E7EB', padding: '10px 16px', display: 'flex', justifyContent: 'space-around', position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '515px', zIndex: 50 }}>
                    {[
                        { id: 'home', icon: '🏠', label: '首页', href: '/', active: true },
                        { id: 'community', icon: '👥', label: '圈子', href: '/community' },
                        { id: 'lists', icon: '📋', label: '清单', href: '/lists' },
                        { id: 'me', icon: '👤', label: '我的', href: '/me' },
                    ].map((item) => (
                        <Link key={item.id} href={item.href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', textDecoration: 'none', color: item.active ? '#3B82F6' : '#6B7280' }}>
                            <span style={{ fontSize: '22px' }}>{item.icon}</span>
                            <span style={{ fontSize: '11px' }}>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </MobileContainer>
    );
}
