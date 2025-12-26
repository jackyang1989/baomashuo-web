'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, ChevronUp, ThumbsUp, MessageCircle, AlertTriangle, ChevronRight } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';

// 产品类型分类
const CATEGORIES = [
    { id: 'bottle', name: '奶瓶', icon: '🍼' },
    { id: 'nipple', name: '奶嘴', icon: '🔵' },
    { id: 'accessory', name: '配件', icon: '🧴' },
    { id: 'all', name: '全部', icon: '📋' },
];

// 高频避坑问题
const PITFALL_ISSUES = [
    {
        id: 1,
        title: '漏奶问题',
        category: 'bottle',
        severity: 'high',
        description: '奶瓶密封不严导致漏奶，影响使用体验和卫生',
        affectedProducts: ['某些塑料奶瓶', '旧款防胀气奶瓶'],
        solutions: ['检查奶嘴是否拧紧', '确认密封圈是否老化', '选购防漏设计奶瓶'],
        reportCount: 234,
        expanded: false,
    },
    {
        id: 2,
        title: '宝宝胀气',
        category: 'bottle',
        severity: 'high',
        description: '奶瓶设计不当，宝宝喝奶时吸入过多空气导致胀气',
        affectedProducts: ['无导气管普通奶瓶', '奶嘴孔过大款式'],
        solutions: ['选择防胀气奶瓶', '调整喂奶姿势45度', '选择合适流速奶嘴'],
        reportCount: 456,
        expanded: false,
    },
    {
        id: 3,
        title: '宝宝抗拒奶瓶',
        category: 'nipple',
        severity: 'medium',
        description: '奶嘴材质或形状与母乳差异大，宝宝不愿意接受',
        affectedProducts: ['硅胶硬质奶嘴', '普通圆形奶嘴'],
        solutions: ['尝试仿母乳设计奶嘴', '选择柔软硅胶材质', '逐步过渡适应'],
        reportCount: 189,
        expanded: false,
    },
    {
        id: 4,
        title: '清洗麻烦',
        category: 'bottle',
        severity: 'low',
        description: '奶瓶配件多、结构复杂，清洗耗时且容易残留',
        affectedProducts: ['多配件导气管奶瓶', '异形设计奶瓶'],
        solutions: ['选择简单结构设计', '使用专用清洗刷', '定期蒸汽消毒'],
        reportCount: 145,
        expanded: false,
    },
    {
        id: 5,
        title: '奶嘴流速不当',
        category: 'nipple',
        severity: 'medium',
        description: '奶嘴孔大小不合适，导致呛奶或吸吮困难',
        affectedProducts: ['未标注月龄的通用奶嘴'],
        solutions: ['根据宝宝月龄选择对应型号', '观察宝宝吃奶表现及时调整'],
        reportCount: 167,
        expanded: false,
    },
];

// 真实宝妈案例
const REAL_CASES = [
    {
        id: 1,
        user: { name: '小雨妈妈', avatar: '👩', babyAge: '3个月' },
        issue: '漏奶',
        content: '之前用的奶瓶老是漏奶，换了Comotomo硅胶奶瓶后问题解决了，密封性很好',
        solution: 'Comotomo奶瓶',
        agrees: 234,
        time: '2小时前',
    },
    {
        id: 2,
        user: { name: '阳阳小可爱', avatar: '👱‍♀️', babyAge: '2个月' },
        issue: '宝宝抗拒',
        content: '宝宝一直不愿意用奶瓶，换了宽口仿母乳奶嘴后终于愿意吃了！',
        solution: '仿母乳奶嘴',
        agrees: 189,
        time: '5小时前',
    },
    {
        id: 3,
        user: { name: '豆豆妈', avatar: '👩‍🦰', babyAge: '4个月' },
        issue: '胀气',
        content: '宝宝之前天天胀气哭闹，用了布朗博士导气管奶瓶后明显好转',
        solution: '布朗博士奶瓶',
        agrees: 156,
        time: '昨天',
    },
];

// 相关精选产品
const RELATED_PRODUCTS = [
    { id: 'p1', name: 'Comotomo防胀气', image: '🍼', price: 189, rate: 92 },
    { id: 'p2', name: 'Pigeon贝亲', image: '🍼', price: 89, rate: 85 },
    { id: 'p3', name: "Dr.Brown's", image: '🍼', price: 129, rate: 88 },
];

export default function PitfallsPage() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [expandedIssues, setExpandedIssues] = useState<number[]>([]);

    const toggleExpand = (id: number) => {
        setExpandedIssues(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const filteredIssues = selectedCategory === 'all'
        ? PITFALL_ISSUES
        : PITFALL_ISSUES.filter(i => i.category === selectedCategory);

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'high': return { bg: '#FEE2E2', text: '#DC2626', label: '高频' };
            case 'medium': return { bg: '#FEF3C7', text: '#D97706', label: '中频' };
            case 'low': return { bg: '#E0E7FF', text: '#4F46E5', label: '低频' };
            default: return { bg: '#F3F4F6', text: '#6B7280', label: '' };
        }
    };

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F7F8FA', paddingBottom: '80px' }}>
                {/* 顶部导航 */}
                <div style={{ background: 'white', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #E5E7EB' }}>
                    <button onClick={() => router.back()} style={{ background: 'none', border: 'none' }}>
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1F2937' }}>避坑提醒</div>
                        <div style={{ fontSize: '12px', color: '#6B7280' }}>帮你避开常见问题，省心选品</div>
                    </div>
                </div>

                {/* 分类筛选 */}
                <div style={{ background: 'white', padding: '12px 16px', display: 'flex', gap: '8px', borderBottom: '1px solid #E5E7EB' }}>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            style={{
                                flex: 1,
                                padding: '10px 8px',
                                background: selectedCategory === cat.id ? '#FEF2F2' : '#F9FAFB',
                                border: selectedCategory === cat.id ? '1px solid #FECACA' : '1px solid #E5E7EB',
                                borderRadius: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '4px',
                            }}
                        >
                            <span style={{ fontSize: '20px' }}>{cat.icon}</span>
                            <span style={{ fontSize: '12px', color: selectedCategory === cat.id ? '#DC2626' : '#6B7280', fontWeight: selectedCategory === cat.id ? '600' : '400' }}>{cat.name}</span>
                        </button>
                    ))}
                </div>

                {/* 统计提示 */}
                <div style={{ margin: '12px 16px', background: '#FEF2F2', borderRadius: '10px', padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <AlertTriangle size={20} color="#DC2626" />
                    <div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#DC2626' }}>共收录{filteredIssues.length}个高频问题</div>
                        <div style={{ fontSize: '11px', color: '#6B7280' }}>基于{PITFALL_ISSUES.reduce((a, b) => a + b.reportCount, 0)}+宝妈真实反馈汇总</div>
                    </div>
                </div>

                {/* 高频避坑问题列表 */}
                <div style={{ padding: '0 16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {filteredIssues.map((issue, idx) => {
                            const severity = getSeverityColor(issue.severity);
                            const isExpanded = expandedIssues.includes(issue.id);

                            return (
                                <div key={issue.id} style={{ background: 'white', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                                    {/* 问题标题 */}
                                    <div
                                        onClick={() => toggleExpand(issue.id)}
                                        style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
                                    >
                                        <span style={{ width: '24px', height: '24px', background: severity.bg, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', color: severity.text }}>
                                            {idx + 1}
                                        </span>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <span style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>{issue.title}</span>
                                                <span style={{ fontSize: '10px', background: severity.bg, color: severity.text, padding: '2px 6px', borderRadius: '4px' }}>{severity.label}</span>
                                            </div>
                                            <div style={{ fontSize: '12px', color: '#9CA3AF' }}>{issue.reportCount}人反馈</div>
                                        </div>
                                        {isExpanded ? <ChevronUp size={18} color="#9CA3AF" /> : <ChevronDown size={18} color="#9CA3AF" />}
                                    </div>

                                    {/* 展开内容 */}
                                    {isExpanded && (
                                        <div style={{ padding: '0 16px 16px' }}>
                                            <div style={{ fontSize: '13px', color: '#374151', lineHeight: 1.6, marginBottom: '12px' }}>
                                                {issue.description}
                                            </div>

                                            {/* 影响产品 */}
                                            <div style={{ marginBottom: '12px' }}>
                                                <div style={{ fontSize: '12px', color: '#DC2626', fontWeight: '500', marginBottom: '6px' }}>⚠ 常见于：</div>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                    {issue.affectedProducts.map((p, i) => (
                                                        <span key={i} style={{ fontSize: '11px', background: '#FEE2E2', color: '#DC2626', padding: '4px 8px', borderRadius: '6px' }}>{p}</span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* 解决方案 */}
                                            <div style={{ background: '#F0FDF4', borderRadius: '10px', padding: '12px' }}>
                                                <div style={{ fontSize: '12px', color: '#059669', fontWeight: '500', marginBottom: '8px' }}>✓ 解决方案：</div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                    {issue.solutions.map((s, i) => (
                                                        <div key={i} style={{ fontSize: '12px', color: '#374151' }}>• {s}</div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* 补充经验按钮 */}
                                            <button style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 14px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '12px', color: '#6B7280' }}>
                                                <MessageCircle size={14} />
                                                补充我的经验
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 真实宝妈案例 */}
                <div style={{ padding: '16px' }}>
                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1F2937', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        💡 宝妈避坑经验
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {REAL_CASES.map((c) => (
                            <div key={c.id} style={{ background: 'white', borderRadius: '12px', padding: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                    <span style={{ fontSize: '28px' }}>{c.user.avatar}</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1F2937' }}>{c.user.name}</div>
                                        <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{c.user.babyAge}宝宝 · {c.time}</div>
                                    </div>
                                    <span style={{ fontSize: '11px', background: '#FEE2E2', color: '#DC2626', padding: '3px 8px', borderRadius: '6px' }}>#{c.issue}</span>
                                </div>

                                <div style={{ fontSize: '13px', color: '#374151', lineHeight: 1.6, marginBottom: '8px' }}>{c.content}</div>

                                <div style={{ fontSize: '12px', color: '#059669', marginBottom: '10px' }}>✓ 解决方案：{c.solution}</div>

                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '16px', fontSize: '12px', color: '#059669' }}>
                                        <ThumbsUp size={12} />
                                        有帮助 {c.agrees}
                                    </button>
                                    <button style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '16px', fontSize: '12px', color: '#6B7280' }}>
                                        <MessageCircle size={12} />
                                        补充
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 相关精选产品 */}
                <div style={{ padding: '0 16px 16px' }}>
                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1F2937', marginBottom: '12px' }}>🏆 避坑好评产品</div>
                    <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px' }}>
                        {RELATED_PRODUCTS.map((p) => (
                            <Link key={p.id} href={`/product/${p.id}`} style={{ textDecoration: 'none', flexShrink: 0, width: '130px' }}>
                                <div style={{ background: 'white', borderRadius: '12px', padding: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                                    <div style={{ width: '100%', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', marginBottom: '8px' }}>
                                        {p.image}
                                    </div>
                                    <div style={{ fontSize: '12px', fontWeight: '500', color: '#1F2937', marginBottom: '4px' }}>{p.name}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#EF4444' }}>¥{p.price}</span>
                                        <span style={{ fontSize: '10px', color: '#10B981' }}>{p.rate}%推荐</span>
                                    </div>
                                </div>
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
