'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Bell, ChevronDown, ThumbsUp, MessageCircle, ChevronRight, Sparkles, Baby } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';

// 品类配置
const CATEGORIES = [
    { id: 'bottle', name: '奶瓶', icon: '🍼', color: '#3B82F6' },
    { id: 'nipple', name: '奶嘴', icon: '🔵', color: '#8B5CF6' },
    { id: 'accessory', name: '配件', icon: '🧴', color: '#10B981' },
];

// 各品类筛选条件配置
const CATEGORY_FILTERS: Record<string, { age: string[]; options: { key: string; label: string; values: string[] }[] }> = {
    bottle: {
        age: ['0-3个月', '3-6个月', '6-12个月', '1-2岁', '2岁以上'],
        options: [
            { key: 'feeding', label: '喂养方式', values: ['母乳喂养', '混合喂养', '配方奶喂养'] },
            { key: 'problem', label: '常见问题', values: ['胀气/肠绞痛', '拒绝奶瓶', '呛奶', '吐奶'] },
        ],
    },
    nipple: {
        age: ['0-3个月', '3-6个月', '6-12个月', '1-2岁'],
        options: [
            { key: 'stage', label: '阶段', values: ['新生儿', 'S号慢流速', 'M号中流速', 'L号快流速'] },
            { key: 'problem', label: '常见问题', values: ['宝宝抗拒', '咬奶嘴', '漏奶', '不含住'] },
        ],
    },
    accessory: {
        age: ['通用'],
        options: [
            { key: 'type', label: '配件类型', values: ['奶瓶刷', '消毒器', '保温袋', '奶瓶夹'] },
            { key: 'brand', label: '品牌适配', values: ['Comotomo', 'Pigeon', "Dr.Brown's", '通用'] },
        ],
    },
};

// 各品类精选产品
const CATEGORY_PRODUCTS: Record<string, Array<{ id: string; name: string; image: string; likes: number; pros: string[]; cons: string[]; aiSummary: string }>> = {
    bottle: [
        { id: 'b1', name: 'Comotomo可么多么奶瓶', image: '🍼', likes: 320, pros: ['防胀气效果显著', '高接受度'], cons: ['价格偏贵'], aiSummary: '92%宝妈推荐，适合胀气宝宝' },
        { id: 'b2', name: 'Pigeon贝亲玻璃奶瓶', image: '🍼', likes: 280, pros: ['性价比高', '经典品牌'], cons: ['玻璃较重'], aiSummary: '85%宝妈推荐，高性价比首选' },
        { id: 'b3', name: "Dr.Brown's布朗博士", image: '🍼', likes: 256, pros: ['导气管防呛奶'], cons: ['清洗配件多'], aiSummary: '88%宝妈推荐，防呛奶专家' },
    ],
    nipple: [
        { id: 'n1', name: 'Pigeon贝亲仿母乳奶嘴', image: '🔵', likes: 245, pros: ['柔软接近母乳', '宝宝接受度高'], cons: ['易老化'], aiSummary: '90%宝妈推荐，仿母乳首选' },
        { id: 'n2', name: 'Comotomo硅胶奶嘴', image: '🔵', likes: 198, pros: ['超软硅胶', '防胀气'], cons: ['需定期更换'], aiSummary: '88%宝妈推荐，柔软舒适' },
        { id: 'n3', name: 'NUK宽口奶嘴', image: '🔵', likes: 167, pros: ['扁平设计', '模拟真实吮吸'], cons: ['部分宝宝不适应'], aiSummary: '82%宝妈推荐，专利设计' },
    ],
    accessory: [
        { id: 'a1', name: 'Babycare奶瓶刷套装', image: '🧹', likes: 312, pros: ['刷头柔软', '多功能'], cons: ['需定期更换'], aiSummary: '94%宝妈推荐，清洗必备' },
        { id: 'a2', name: '小白熊蒸汽消毒器', image: '♨️', likes: 287, pros: ['大容量', '消毒彻底'], cons: ['占地较大'], aiSummary: '91%宝妈推荐，省心消毒' },
        { id: 'a3', name: 'bbox保温袋', image: '🎒', likes: 198, pros: ['保温效果好', '便携'], cons: ['容量有限'], aiSummary: '86%宝妈推荐，外出必备' },
    ],
};

// 各品类真实经验
const CATEGORY_EXPERIENCES: Record<string, Array<{ id: number; user: { name: string; avatar: string; babyAge: string }; content: string; product: string; agrees: number; time: string }>> = {
    bottle: [
        { id: 1, user: { name: '小雨妈妈', avatar: '👩', babyAge: '3个月' }, content: '用了30天，宝宝胀气明显好转，晚上终于能睡整觉了！', product: 'Comotomo', agrees: 234, time: '2小时前' },
        { id: 2, user: { name: '晴天妈妈', avatar: '👱‍♀️', babyAge: '5个月' }, content: '从母乳转奶瓶，试了3款才成功，分享避坑经验～', product: '奶瓶转换', agrees: 189, time: '5小时前' },
    ],
    nipple: [
        { id: 1, user: { name: '豆豆妈', avatar: '👩‍🦰', babyAge: '4个月' }, content: '换了仿母乳奶嘴后，宝宝终于愿意吃奶瓶了！', product: '贝亲奶嘴', agrees: 176, time: '3小时前' },
        { id: 2, user: { name: '糖糖妈', avatar: '👩', babyAge: '2个月' }, content: '新生儿建议用S号，流速太快会呛奶', product: '奶嘴选择', agrees: 145, time: '昨天' },
    ],
    accessory: [
        { id: 1, user: { name: '米粒妈妈', avatar: '👱‍♀️', babyAge: '6个月' }, content: '蒸汽消毒真的比水煮方便太多了，强烈推荐！', product: '消毒器', agrees: 198, time: '1小时前' },
        { id: 2, user: { name: '小七妈', avatar: '👩‍🦰', babyAge: '8个月' }, content: '外出带保温袋，奶粉温度刚刚好，宝宝喝得香', product: '保温袋', agrees: 134, time: '4小时前' },
    ],
};

// 工具导航
const TOOLS = [
    { id: 'match', icon: <Baby size={20} />, title: '宝宝匹配', desc: '定制推荐', href: '/select' },
    { id: 'pitfall', icon: '⚠️', title: '避坑提醒', desc: '集中查看', href: '/pitfalls' },
    { id: 'ai', icon: <Sparkles size={20} />, title: '新品推荐', desc: 'AI精选', href: '/products' },
];

export default function HomePage() {
    const router = useRouter();

    // 当前选中品类
    const [activeCategory, setActiveCategory] = useState('bottle');

    // 筛选状态
    const [selectedAge, setSelectedAge] = useState('');
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});

    // 下拉状态
    const [showAgeDropdown, setShowAgeDropdown] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const currentConfig = CATEGORY_FILTERS[activeCategory];
    const currentProducts = CATEGORY_PRODUCTS[activeCategory];
    const currentExperiences = CATEGORY_EXPERIENCES[activeCategory];
    const currentCategoryInfo = CATEGORIES.find(c => c.id === activeCategory)!;

    const handleCategoryChange = (categoryId: string) => {
        setActiveCategory(categoryId);
        setSelectedAge('');
        setSelectedFilters({});
        setShowAgeDropdown(false);
        setActiveDropdown(null);
    };

    const handleQuickFilter = () => {
        const params = new URLSearchParams();
        params.set('category', activeCategory);
        if (selectedAge) params.set('age', selectedAge);
        Object.entries(selectedFilters).forEach(([k, v]) => {
            if (v) params.set(k, v);
        });
        router.push(`/select/results?${params.toString()}`);
    };

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F7F8FA', paddingBottom: '80px' }}>
                {/* 顶部区域 */}
                <div style={{ background: currentCategoryInfo.color, padding: '16px', color: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <div style={{ fontSize: '22px', fontWeight: 'bold' }}>宝妈说</div>
                        <div style={{ position: 'relative' }}>
                            <Bell size={22} />
                            <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '16px', height: '16px', background: '#EF4444', borderRadius: '50%', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
                        </div>
                    </div>

                    {/* 搜索框 */}
                    <div
                        onClick={() => router.push('/search')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'rgba(255,255,255,0.2)',
                            borderRadius: '10px',
                            padding: '10px 14px',
                            marginBottom: '10px',
                            cursor: 'pointer'
                        }}
                    >
                        <Search size={18} color="rgba(255,255,255,0.8)" />
                        <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>搜索产品、品牌、问题...</span>
                    </div>

                    <div style={{ fontSize: '13px', opacity: 0.9 }}>每一次母婴选品，都有人试过</div>
                </div>

                {/* 品类切换Tab */}
                <div style={{ background: 'white', padding: '12px 16px', display: 'flex', gap: '8px', borderBottom: '1px solid #E5E7EB' }}>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => handleCategoryChange(cat.id)}
                            style={{
                                flex: 1,
                                padding: '10px 8px',
                                background: activeCategory === cat.id ? `${cat.color}15` : '#F9FAFB',
                                border: activeCategory === cat.id ? `2px solid ${cat.color}` : '1px solid #E5E7EB',
                                borderRadius: '12px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '4px',
                            }}
                        >
                            <span style={{ fontSize: '24px' }}>{cat.icon}</span>
                            <span style={{ fontSize: '13px', color: activeCategory === cat.id ? cat.color : '#6B7280', fontWeight: activeCategory === cat.id ? '600' : '400' }}>{cat.name}</span>
                        </button>
                    ))}
                </div>

                {/* 进入品类频道入口 */}
                <Link href={`/category/${activeCategory}`} style={{ textDecoration: 'none' }}>
                    <div style={{ margin: '0 16px 12px', background: `${currentCategoryInfo.color}08`, border: `1px dashed ${currentCategoryInfo.color}40`, borderRadius: '10px', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '16px' }}>{currentCategoryInfo.icon}</span>
                            <span style={{ fontSize: '13px', color: currentCategoryInfo.color, fontWeight: '500' }}>{currentCategoryInfo.name}怎么选？点击查看选购攻略</span>
                        </div>
                        <ChevronRight size={16} color={currentCategoryInfo.color} />
                    </div>
                </Link>

                {/* 快速选择入口 */}
                <div style={{ background: 'white', margin: '12px 16px', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                    {/* 昨天的亲切标题 */}
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Sparkles size={16} color="#F59E0B" />
                        告诉我宝宝情况，3秒精选推荐
                    </div>

                    {/* 下拉选择器：月龄 + 喂养方式（非问题） */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                        {/* 月龄选择 */}
                        <div style={{ flex: 1, position: 'relative' }}>
                            <button
                                onClick={() => { setShowAgeDropdown(!showAgeDropdown); setActiveDropdown(null); }}
                                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '10px 8px', background: selectedAge ? '#EFF6FF' : '#F9FAFB', border: selectedAge ? `1px solid ${currentCategoryInfo.color}` : '1px solid #E5E7EB', borderRadius: '20px', fontSize: '13px', color: selectedAge ? currentCategoryInfo.color : '#6B7280' }}
                            >
                                <Baby size={14} />
                                {selectedAge || '宝宝月龄'}
                                <ChevronDown size={14} />
                            </button>
                            {showAgeDropdown && (
                                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 100, overflow: 'hidden' }}>
                                    {currentConfig.age.map((age) => (
                                        <button key={age} onClick={() => { setSelectedAge(age); setShowAgeDropdown(false); }} style={{ display: 'block', width: '100%', padding: '10px 16px', border: 'none', background: selectedAge === age ? '#EFF6FF' : 'white', color: selectedAge === age ? '#3B82F6' : '#374151', fontSize: '13px', textAlign: 'left' }}>
                                            {age}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* 喂养方式/阶段选择（非问题的第一个选项） */}
                        {currentConfig.options.filter(opt => opt.key !== 'problem').map((opt) => (
                            <div key={opt.key} style={{ flex: 1, position: 'relative' }}>
                                <button
                                    onClick={() => { setActiveDropdown(activeDropdown === opt.key ? null : opt.key); setShowAgeDropdown(false); }}
                                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '10px 8px', background: selectedFilters[opt.key] ? '#EFF6FF' : '#F9FAFB', border: selectedFilters[opt.key] ? `1px solid ${currentCategoryInfo.color}` : '1px solid #E5E7EB', borderRadius: '20px', fontSize: '13px', color: selectedFilters[opt.key] ? currentCategoryInfo.color : '#6B7280' }}
                                >
                                    {selectedFilters[opt.key] || opt.label}
                                    <ChevronDown size={14} />
                                </button>
                                {activeDropdown === opt.key && (
                                    <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 100, overflow: 'hidden' }}>
                                        {opt.values.map((val) => (
                                            <button key={val} onClick={() => { setSelectedFilters({ ...selectedFilters, [opt.key]: val }); setActiveDropdown(null); }} style={{ display: 'block', width: '100%', padding: '10px 16px', border: 'none', background: selectedFilters[opt.key] === val ? '#EFF6FF' : 'white', color: selectedFilters[opt.key] === val ? '#3B82F6' : '#374151', fontSize: '13px', textAlign: 'left' }}>
                                                {val}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* 昨天的问题标签按钮（直接点选，更直观） */}
                    {currentConfig.options.filter(opt => opt.key === 'problem').map((opt) => (
                        <div key={opt.key} style={{ marginBottom: '16px' }}>
                            <div style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '8px' }}>常见问题（可选）</div>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {opt.values.map((problem) => (
                                    <button
                                        key={problem}
                                        onClick={() => setSelectedFilters({ ...selectedFilters, problem: selectedFilters.problem === problem ? '' : problem })}
                                        style={{ padding: '8px 14px', background: selectedFilters.problem === problem ? '#FEF3C7' : '#F3F4F6', border: selectedFilters.problem === problem ? '1px solid #F59E0B' : '1px solid #E5E7EB', borderRadius: '20px', fontSize: '12px', color: selectedFilters.problem === problem ? '#D97706' : '#6B7280' }}
                                    >
                                        {problem}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={handleQuickFilter}
                        style={{ width: '100%', padding: '14px', background: currentCategoryInfo.color, color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                    >
                        一键进入精选口碑{currentCategoryInfo.name}
                        <ChevronRight size={18} />
                    </button>
                </div>

                {/* 本周精选口碑产品 */}
                <div style={{ padding: '0 16px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '18px' }}>🏆</span>
                            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#1F2937' }}>本周精选{currentCategoryInfo.name}</span>
                        </div>
                        <Link href={`/products?category=${activeCategory}`} style={{ fontSize: '13px', color: currentCategoryInfo.color, textDecoration: 'none' }}>查看更多</Link>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
                        {currentProducts.map((product) => (
                            <Link key={product.id} href={`/product/${product.id}`} style={{ textDecoration: 'none', flexShrink: 0, width: '160px' }}>
                                <div style={{ background: 'white', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                                    <div style={{ width: '100%', height: '80px', background: '#F9FAFB', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', marginBottom: '12px' }}>
                                        {product.image}
                                    </div>
                                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#1F2937', marginBottom: '6px', lineHeight: 1.3 }}>{product.name}</div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                                        <ThumbsUp size={12} color="#10B981" />
                                        <span style={{ fontSize: '12px', color: '#10B981', fontWeight: '600' }}>{product.likes}宝妈推荐</span>
                                    </div>

                                    <div style={{ fontSize: '11px', color: '#059669', marginBottom: '4px' }}>✓ {product.pros[0]}</div>
                                    <div style={{ fontSize: '11px', color: '#D97706' }}>⚠ {product.cons[0]}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 真实宝妈说 */}
                <div style={{ padding: '0 16px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '18px' }}>💬</span>
                            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#1F2937' }}>真实宝妈说</span>
                        </div>
                        <Link href="/community" style={{ fontSize: '13px', color: currentCategoryInfo.color, textDecoration: 'none' }}>更多</Link>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {currentExperiences.map((exp) => (
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
                                    <span style={{ fontSize: '11px', background: '#EFF6FF', color: currentCategoryInfo.color, padding: '4px 8px', borderRadius: '6px' }}>#{exp.product}</span>
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
                                    <div style={{ width: '48px', height: '48px', background: '#F3F4F6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: currentCategoryInfo.color, fontSize: typeof tool.icon === 'string' ? '20px' : 'inherit' }}>
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
                        <Link key={item.id} href={item.href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', textDecoration: 'none', color: item.active ? currentCategoryInfo.color : '#6B7280' }}>
                            <span style={{ fontSize: '22px' }}>{item.icon}</span>
                            <span style={{ fontSize: '11px' }}>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </MobileContainer>
    );
}
