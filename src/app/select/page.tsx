'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, ChevronRight, ThumbsUp, Sparkles, Check, Baby, Scale, Droplets, HelpCircle } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';

// 月龄选项
const AGE_OPTIONS = ['0-3个月', '3-6个月', '6-12个月', '1-2岁', '2岁以上'];
// 喂养方式
const FEEDING_OPTIONS = ['母乳喂养', '混合喂养', '配方奶喂养'];
// 常见问题
const PROBLEM_OPTIONS = ['胀气/肠绞痛', '拒绝奶瓶', '呛奶', '吐奶', '奶量不足', '夜奶多', '转奶困难'];
// 场景标签
const SCENARIO_TAGS = [
    { id: 'night', label: '夜奶多', icon: '🌙' },
    { id: 'bloat', label: '胀气明显', icon: '💨' },
    { id: 'bite', label: '咬奶嘴', icon: '🦷' },
    { id: 'outdoor', label: '外出便携', icon: '🎒' },
    { id: 'clean', label: '易清洗', icon: '🧹' },
    { id: 'switch', label: '母乳转奶瓶', icon: '🍼' },
];

// AI匹配推荐产品
const MATCHED_PRODUCTS = [
    {
        id: 'p1',
        name: 'Comotomo可么多么奶瓶',
        image: '🍼',
        price: 189,
        likes: 320,
        matchScore: 98,
        matchReasons: ['防胀气效果显著，适合胀气宝宝', '硅胶材质柔软，宝宝接受度高', '92%同月龄宝妈推荐'],
        pros: ['防胀气', '高接受度'],
        cons: ['价格偏贵'],
    },
    {
        id: 'p2',
        name: "Dr.Brown's布朗博士",
        image: '🍼',
        price: 129,
        likes: 256,
        matchScore: 92,
        matchReasons: ['导气管设计专业防呛奶', '适合夜奶多的宝宝', '88%宝妈验证有效'],
        pros: ['防呛奶', '科学设计'],
        cons: ['清洗配件多'],
    },
    {
        id: 'p3',
        name: 'Pigeon贝亲玻璃奶瓶',
        image: '🍼',
        price: 89,
        likes: 280,
        matchScore: 85,
        matchReasons: ['性价比首选，适合日常使用', '经典品牌，品质稳定', '85%宝妈推荐'],
        pros: ['性价比高', '易清洗'],
        cons: ['玻璃较重'],
    },
];

export default function BabyMatchPage() {
    const router = useRouter();

    // 输入状态
    const [selectedAge, setSelectedAge] = useState('');
    const [weight, setWeight] = useState('');
    const [selectedFeeding, setSelectedFeeding] = useState('');
    const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
    const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);

    // 下拉状态
    const [showAgeDropdown, setShowAgeDropdown] = useState(false);
    const [showFeedingDropdown, setShowFeedingDropdown] = useState(false);
    const [showProblemDropdown, setShowProblemDropdown] = useState(false);

    // 匹配结果状态
    const [showResults, setShowResults] = useState(false);
    const [isMatching, setIsMatching] = useState(false);

    const toggleProblem = (problem: string) => {
        setSelectedProblems(prev =>
            prev.includes(problem) ? prev.filter(p => p !== problem) : [...prev, problem]
        );
    };

    const toggleScenario = (id: string) => {
        setSelectedScenarios(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const handleMatch = async () => {
        setIsMatching(true);
        // 模拟AI匹配
        await new Promise(r => setTimeout(r, 1500));
        setIsMatching(false);
        setShowResults(true);
    };

    const canMatch = selectedAge && selectedFeeding;

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F7F8FA', paddingBottom: '80px' }}>
                {/* 顶部导航 */}
                <div style={{ background: 'white', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #E5E7EB' }}>
                    <button onClick={() => router.back()} style={{ background: 'none', border: 'none' }}>
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1F2937' }}>宝宝情况匹配</div>
                        <div style={{ fontSize: '12px', color: '#6B7280' }}>AI为你精准匹配口碑产品</div>
                    </div>
                </div>

                {/* 宝宝信息输入区 */}
                <div style={{ background: 'white', margin: '12px 16px', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Baby size={18} color="#3B82F6" />
                        告诉我宝宝的基本情况
                    </div>

                    {/* 月龄选择 */}
                    <div style={{ marginBottom: '12px' }}>
                        <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '6px' }}>宝宝月龄 *</div>
                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => { setShowAgeDropdown(!showAgeDropdown); setShowFeedingDropdown(false); setShowProblemDropdown(false); }}
                                style={{ width: '100%', padding: '12px 16px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px', color: selectedAge ? '#1F2937' : '#9CA3AF' }}
                            >
                                {selectedAge || '请选择月龄'}
                                <ChevronDown size={18} color="#9CA3AF" />
                            </button>
                            {showAgeDropdown && (
                                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px', background: 'white', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 100, overflow: 'hidden' }}>
                                    {AGE_OPTIONS.map((age) => (
                                        <button key={age} onClick={() => { setSelectedAge(age); setShowAgeDropdown(false); }} style={{ display: 'block', width: '100%', padding: '12px 16px', border: 'none', background: selectedAge === age ? '#EFF6FF' : 'white', color: selectedAge === age ? '#3B82F6' : '#374151', fontSize: '14px', textAlign: 'left' }}>
                                            {age}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 体重输入 */}
                    <div style={{ marginBottom: '12px' }}>
                        <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '6px' }}>宝宝体重（选填）</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                placeholder="例如 6.5"
                                style={{ flex: 1, padding: '12px 16px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
                            />
                            <span style={{ fontSize: '14px', color: '#6B7280' }}>kg</span>
                        </div>
                    </div>

                    {/* 喂养方式 */}
                    <div style={{ marginBottom: '12px' }}>
                        <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '6px' }}>喂养方式 *</div>
                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => { setShowFeedingDropdown(!showFeedingDropdown); setShowAgeDropdown(false); setShowProblemDropdown(false); }}
                                style={{ width: '100%', padding: '12px 16px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px', color: selectedFeeding ? '#1F2937' : '#9CA3AF' }}
                            >
                                {selectedFeeding || '请选择喂养方式'}
                                <ChevronDown size={18} color="#9CA3AF" />
                            </button>
                            {showFeedingDropdown && (
                                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px', background: 'white', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 100, overflow: 'hidden' }}>
                                    {FEEDING_OPTIONS.map((feeding) => (
                                        <button key={feeding} onClick={() => { setSelectedFeeding(feeding); setShowFeedingDropdown(false); }} style={{ display: 'block', width: '100%', padding: '12px 16px', border: 'none', background: selectedFeeding === feeding ? '#EFF6FF' : 'white', color: selectedFeeding === feeding ? '#3B82F6' : '#374151', fontSize: '14px', textAlign: 'left' }}>
                                            {feeding}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 常见问题多选 */}
                    <div>
                        <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '6px' }}>遇到的问题（选填，可多选）</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {PROBLEM_OPTIONS.map((problem) => (
                                <button
                                    key={problem}
                                    onClick={() => toggleProblem(problem)}
                                    style={{
                                        padding: '8px 14px',
                                        borderRadius: '18px',
                                        border: selectedProblems.includes(problem) ? '1px solid #3B82F6' : '1px solid #E5E7EB',
                                        background: selectedProblems.includes(problem) ? '#EFF6FF' : '#F9FAFB',
                                        color: selectedProblems.includes(problem) ? '#3B82F6' : '#6B7280',
                                        fontSize: '13px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                    }}
                                >
                                    {selectedProblems.includes(problem) && <Check size={12} />}
                                    {problem}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 场景标签 */}
                <div style={{ background: 'white', margin: '0 16px 12px', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '12px' }}>🏷️ 选择使用场景（可选）</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {SCENARIO_TAGS.map((tag) => (
                            <button
                                key={tag.id}
                                onClick={() => toggleScenario(tag.id)}
                                style={{
                                    padding: '10px 14px',
                                    borderRadius: '10px',
                                    border: selectedScenarios.includes(tag.id) ? '1px solid #F59E0B' : '1px solid #E5E7EB',
                                    background: selectedScenarios.includes(tag.id) ? '#FEF3C7' : '#F9FAFB',
                                    color: selectedScenarios.includes(tag.id) ? '#D97706' : '#6B7280',
                                    fontSize: '13px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                }}
                            >
                                <span>{tag.icon}</span>
                                {tag.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 匹配按钮 */}
                {!showResults && (
                    <div style={{ padding: '0 16px 16px' }}>
                        <button
                            onClick={handleMatch}
                            disabled={!canMatch || isMatching}
                            style={{
                                width: '100%',
                                padding: '16px',
                                background: canMatch ? '#3B82F6' : '#E5E7EB',
                                color: canMatch ? 'white' : '#9CA3AF',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '16px',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                            }}
                        >
                            {isMatching ? (
                                <>
                                    <span style={{ animation: 'spin 1s linear infinite' }}>⏳</span>
                                    AI正在匹配...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={18} />
                                    一键智能匹配
                                </>
                            )}
                        </button>
                    </div>
                )}

                {/* AI匹配结果 */}
                {showResults && (
                    <div style={{ padding: '0 16px' }}>
                        {/* 匹配摘要 */}
                        <div style={{ background: '#EFF6FF', borderRadius: '12px', padding: '14px', marginBottom: '16px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                            <div style={{ width: '36px', height: '36px', background: '#3B82F6', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Sparkles size={18} color="white" />
                            </div>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1E40AF', marginBottom: '4px' }}>AI为你匹配了3款口碑产品</div>
                                <div style={{ fontSize: '12px', color: '#3B82F6', lineHeight: 1.5 }}>
                                    基于{selectedAge}宝宝、{selectedFeeding}的数据分析，结合{selectedProblems.length > 0 ? selectedProblems.join('、') : '常见问题'}
                                </div>
                            </div>
                        </div>

                        {/* 推荐产品列表 */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                            {MATCHED_PRODUCTS.map((product, idx) => (
                                <div key={product.id} style={{ background: 'white', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                                    {/* 匹配度标签 */}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{
                                                width: '24px', height: '24px',
                                                background: idx === 0 ? '#F59E0B' : idx === 1 ? '#9CA3AF' : '#CD7F32',
                                                borderRadius: '6px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                color: 'white', fontSize: '12px', fontWeight: 'bold'
                                            }}>
                                                {idx + 1}
                                            </span>
                                            <span style={{ fontSize: '12px', color: '#6B7280' }}>匹配度</span>
                                        </div>
                                        <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#10B981' }}>{product.matchScore}%</span>
                                    </div>

                                    <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                                        <div style={{ width: '72px', height: '72px', background: '#F9FAFB', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', flexShrink: 0 }}>
                                            {product.image}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>{product.name}</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                                <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#EF4444' }}>¥{product.price}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <ThumbsUp size={12} color="#10B981" />
                                                <span style={{ fontSize: '12px', color: '#10B981' }}>{product.likes}宝妈推荐</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* AI匹配理由 */}
                                    <div style={{ background: '#FFFBEB', borderRadius: '10px', padding: '12px', marginBottom: '12px' }}>
                                        <div style={{ fontSize: '12px', fontWeight: '500', color: '#D97706', marginBottom: '6px' }}>🎯 为什么推荐给你：</div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            {product.matchReasons.map((reason, i) => (
                                                <div key={i} style={{ fontSize: '12px', color: '#374151' }}>• {reason}</div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 优缺点 */}
                                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                                        {product.pros.map((pro, i) => (
                                            <span key={i} style={{ fontSize: '11px', color: '#059669', background: '#ECFDF5', padding: '4px 8px', borderRadius: '6px' }}>✓ {pro}</span>
                                        ))}
                                        {product.cons.map((con, i) => (
                                            <span key={i} style={{ fontSize: '11px', color: '#D97706', background: '#FEF3C7', padding: '4px 8px', borderRadius: '6px' }}>⚠ {con}</span>
                                        ))}
                                    </div>

                                    {/* 查看详情 */}
                                    <Link href={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                                        <button style={{ width: '100%', padding: '10px', background: 'white', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '13px', color: '#374151', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                            查看详情
                                            <ChevronRight size={14} />
                                        </button>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* 重新匹配 */}
                        <button
                            onClick={() => setShowResults(false)}
                            style={{ width: '100%', padding: '12px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '10px', fontSize: '14px', color: '#6B7280', marginBottom: '16px' }}
                        >
                            🔄 调整条件重新匹配
                        </button>
                    </div>
                )}

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
