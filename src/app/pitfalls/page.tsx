'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, Toast } from 'antd-mobile';
import { ArrowLeft, AlertTriangle, TrendingDown, Users, ThumbsDown, ChevronRight, Info, Search } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { pitfallService, type PitfallProduct, type ScenarioGroup, type PitfallReason, type CategoryOption } from '@/services/pitfallService';

export default function PitfallsPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('age');
    const [selectedAge, setSelectedAge] = useState('3-6个月');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const [ageGroups, setAgeGroups] = useState<string[]>([]);
    const [categories, setCategories] = useState<CategoryOption[]>([]);
    const [products, setProducts] = useState<PitfallProduct[]>([]);
    const [scenarios, setScenarios] = useState<ScenarioGroup[]>([]);
    const [reasons, setReasons] = useState<PitfallReason[]>([]);

    useEffect(() => {
        pitfallService.getAgeGroups().then(setAgeGroups);
        pitfallService.getCategories().then(setCategories);
        pitfallService.getPitfallProducts().then(setProducts);
        pitfallService.getScenarios().then(setScenarios);
        pitfallService.getReasons().then(setReasons);
    }, []);

    const handleSubmitPitfall = () => {
        Toast.show({ content: '功能开发中', icon: 'fail' });
    };

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F7F8FA', paddingBottom: '80px' }}>
                {/* Header */}
                <div style={{
                    background: 'linear-gradient(135deg, #EF4444, #F97316)',
                    padding: '16px',
                    color: 'white',
                    position: 'sticky',
                    top: 0,
                    zIndex: 50,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', color: 'white' }}>
                            <ArrowLeft size={20} />
                            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>避坑榜</span>
                        </button>
                        <button style={{ background: 'none', border: 'none', color: 'white' }}>
                            <Search size={20} />
                        </button>
                    </div>
                    <div style={{ fontSize: '14px', opacity: 0.9 }}>
                        帮你避开{products.length * 3}个真实的坑
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ background: 'white', borderBottom: '1px solid #E5E7EB', position: 'sticky', top: '76px', zIndex: 40 }}>
                    <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ '--title-font-size': '15px', '--active-title-color': '#EF4444', '--active-line-color': '#EF4444' }}>
                        <Tabs.Tab title="按月龄" key="age" />
                        <Tabs.Tab title="按场景" key="scenario" />
                        <Tabs.Tab title="按原因" key="reason" />
                    </Tabs>
                </div>

                {/* Content */}
                <div style={{ padding: '16px' }}>
                    {/* Age Tab */}
                    {activeTab === 'age' && (
                        <div>
                            {/* Age Selector */}
                            <div style={{ marginBottom: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                    <span style={{ fontWeight: 'bold', color: '#1F2937' }}>选择宝宝月龄</span>
                                    <Info size={14} color="#9CA3AF" />
                                </div>
                                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
                                    {ageGroups.map((age) => (
                                        <button
                                            key={age}
                                            onClick={() => setSelectedAge(age)}
                                            style={{
                                                padding: '8px 16px',
                                                borderRadius: '12px',
                                                border: 'none',
                                                background: selectedAge === age ? '#EF4444' : '#F3F4F6',
                                                color: selectedAge === age ? 'white' : '#374151',
                                                fontWeight: '500',
                                                whiteSpace: 'nowrap',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {age}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '16px', paddingBottom: '8px' }}>
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        style={{
                                            padding: '4px 12px',
                                            borderRadius: '16px',
                                            border: 'none',
                                            background: selectedCategory === cat.id ? '#1F2937' : '#F3F4F6',
                                            color: selectedCategory === cat.id ? 'white' : '#374151',
                                            fontSize: '12px',
                                            whiteSpace: 'nowrap',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {cat.name}({cat.count})
                                    </button>
                                ))}
                            </div>

                            {/* Description */}
                            <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '12px', padding: '12px', marginBottom: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                    <Info size={14} color="#D97706" style={{ marginTop: '2px' }} />
                                    <div style={{ fontSize: '12px', color: '#92400E' }}>
                                        <strong>榜单说明</strong>：基于{selectedAge}宝宝家庭的真实反馈，按不推荐率排序。数据每周更新。
                                    </div>
                                </div>
                            </div>

                            {/* Products */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {products.map((product) => (
                                    <div key={product.id} style={{ background: 'white', borderRadius: '16px', padding: '16px', border: '2px solid #FECACA' }}>
                                        {/* Rank & Severity */}
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{
                                                    width: '28px',
                                                    height: '28px',
                                                    borderRadius: '50%',
                                                    background: product.rank <= 3 ? '#EF4444' : '#6B7280',
                                                    color: 'white',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: 'bold',
                                                    fontSize: '14px',
                                                }}>
                                                    {product.rank}
                                                </div>
                                                <div style={{
                                                    padding: '4px 8px',
                                                    borderRadius: '12px',
                                                    fontSize: '11px',
                                                    fontWeight: '600',
                                                    background: product.severity === 'high' ? '#FEE2E2' : '#FEF3C7',
                                                    color: product.severity === 'high' ? '#DC2626' : '#D97706',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                }}>
                                                    <AlertTriangle size={10} />
                                                    {product.severity === 'high' ? '高风险' : '中风险'}
                                                </div>
                                            </div>
                                            <TrendingDown size={18} color="#EF4444" />
                                        </div>

                                        {/* Product Info */}
                                        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                                            <div style={{
                                                width: '64px',
                                                height: '64px',
                                                background: '#FEE2E2',
                                                borderRadius: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '32px',
                                                flexShrink: 0,
                                            }}>
                                                {product.image}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{product.brand}</div>
                                                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '8px' }}>{product.name}</div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#6B7280' }}>
                                                        <Users size={12} />
                                                        <span>{product.notRecommendCount}人不推荐</span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px' }}>
                                                        <ThumbsDown size={12} color="#EF4444" />
                                                        <span style={{ color: '#EF4444', fontWeight: '600' }}>{product.notRecommendRate}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Main Issues */}
                                        <div style={{ background: '#FEF2F2', borderRadius: '12px', padding: '12px', marginBottom: '12px' }}>
                                            <div style={{ fontSize: '12px', fontWeight: '600', color: '#DC2626', marginBottom: '8px' }}>⚠️ 主要问题</div>
                                            {product.mainIssues.map((issue, idx) => (
                                                <div key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontSize: '12px', color: '#374151', marginBottom: '4px' }}>{issue.issue}</div>
                                                        <div style={{ background: '#FECACA', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
                                                            <div style={{ background: '#EF4444', height: '100%', width: `${issue.percent}%` }} />
                                                        </div>
                                                    </div>
                                                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#EF4444', marginLeft: '12px', width: '36px', textAlign: 'right' }}>
                                                        {issue.percent}%
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Typical Case */}
                                        <div style={{ background: '#F9FAFB', borderRadius: '12px', padding: '12px', marginBottom: '12px' }}>
                                            <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '4px' }}>
                                                <strong>{product.typicalCase.user}</strong> • {product.typicalCase.babyAge} • 使用{product.typicalCase.useDays}天
                                            </div>
                                            <div style={{ fontSize: '13px', color: '#374151' }}>"{product.typicalCase.summary}"</div>
                                        </div>

                                        {/* Alternative */}
                                        {product.alternative && (
                                            <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', padding: '12px' }}>
                                                <div style={{ fontSize: '12px', fontWeight: '600', color: '#059669', marginBottom: '8px' }}>✓ 同价位推荐</div>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <div>
                                                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>{product.alternative.name}</div>
                                                        <div style={{ fontSize: '12px', color: '#6B7280' }}>推荐率 {product.alternative.recommendRate}% • ¥{product.alternative.price}</div>
                                                    </div>
                                                    <button style={{
                                                        background: '#059669',
                                                        color: 'white',
                                                        padding: '8px 12px',
                                                        borderRadius: '8px',
                                                        border: 'none',
                                                        fontSize: '12px',
                                                        fontWeight: '600',
                                                        cursor: 'pointer',
                                                    }}>
                                                        查看详情
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Scenario Tab */}
                    {activeTab === 'scenario' && (
                        <div>
                            <div style={{ marginBottom: '16px' }}>
                                <h3 style={{ fontWeight: 'bold', color: '#1F2937', marginBottom: '4px' }}>按场景避坑</h3>
                                <p style={{ fontSize: '14px', color: '#6B7280' }}>不同场景下的产品选择有讲究</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {scenarios.map((scenario, idx) => (
                                    <div key={idx} style={{ background: 'white', borderRadius: '16px', padding: '16px', border: '1px solid #E5E7EB' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                            <span style={{ fontSize: '28px' }}>{scenario.icon}</span>
                                            <span style={{ fontWeight: 'bold', color: '#1F2937' }}>{scenario.scenario}</span>
                                        </div>
                                        {scenario.pitfalls.map((pitfall, pidx) => (
                                            <div key={pidx} style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '12px', padding: '12px', marginBottom: '8px' }}>
                                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                                                    <AlertTriangle size={14} color="#DC2626" style={{ marginTop: '2px' }} />
                                                    <div>
                                                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>{pitfall.product}</div>
                                                        <div style={{ fontSize: '12px', color: '#6B7280' }}>{pitfall.reason}</div>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#6B7280' }}>
                                                    <Users size={10} />
                                                    <span>{pitfall.count}位宝妈反馈</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Reason Tab */}
                    {activeTab === 'reason' && (
                        <div>
                            <div style={{ marginBottom: '16px' }}>
                                <h3 style={{ fontWeight: 'bold', color: '#1F2937', marginBottom: '4px' }}>高频踩坑原因</h3>
                                <p style={{ fontSize: '14px', color: '#6B7280' }}>了解这些，少花冤枉钱</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {reasons.map((item, idx) => (
                                    <div key={idx} style={{ background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid #E5E7EB' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ fontWeight: 'bold', color: '#1F2937' }}>{item.reason}</span>
                                            <span style={{ fontSize: '14px', fontWeight: '600', color: '#EF4444' }}>{item.count}次</span>
                                        </div>
                                        <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '12px' }}>{item.description}</div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                            {item.examples.map((ex, eidx) => (
                                                <span key={eidx} style={{
                                                    fontSize: '11px',
                                                    background: '#FEF2F2',
                                                    color: '#DC2626',
                                                    padding: '4px 8px',
                                                    borderRadius: '6px',
                                                }}>
                                                    {ex}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom CTA */}
                <div style={{
                    position: 'fixed',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100%',
                    maxWidth: '515px',
                    background: 'white',
                    borderTop: '1px solid #E5E7EB',
                    padding: '12px 16px',
                    zIndex: 100,
                    boxSizing: 'border-box',
                }}>
                    <button
                        onClick={handleSubmitPitfall}
                        style={{
                            width: '100%',
                            padding: '14px',
                            background: 'linear-gradient(135deg, #EF4444, #F97316)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '15px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                        }}
                    >
                        我也要提交避坑产品
                    </button>
                </div>
            </div>
        </MobileContainer>
    );
}
