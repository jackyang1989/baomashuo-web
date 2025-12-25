'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, Toast } from 'antd-mobile';
import { ArrowLeft, Plus, Check, X, ChevronRight, Users, TrendingUp, ShoppingCart, Share2, Download, AlertCircle, CheckCircle } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { listsService, type OfficialList, type ScenarioList, type MyList } from '@/services/listsService';

export default function ListsPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('official');
    const [selectedAge, setSelectedAge] = useState('3-6个月');
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    const [ageGroups, setAgeGroups] = useState<string[]>([]);
    const [officialLists, setOfficialLists] = useState<OfficialList[]>([]);
    const [scenarioLists, setScenarioLists] = useState<ScenarioList[]>([]);
    const [myLists, setMyLists] = useState<MyList[]>([]);

    useEffect(() => {
        listsService.getAgeGroups().then(setAgeGroups);
        listsService.getOfficialLists(selectedAge).then(setOfficialLists);
        listsService.getScenarioLists().then(setScenarioLists);
        listsService.getMyLists().then(setMyLists);
    }, [selectedAge]);

    const handleToggleItem = (listId: string, itemId: string) => {
        const key = `${listId}-${itemId}`;
        setCheckedItems({ ...checkedItems, [key]: !checkedItems[key] });
    };

    const handleCreateList = async () => {
        Toast.show({ content: '功能开发中', icon: 'fail' });
    };

    const getNecessityStyle = (necessity: string) => {
        switch (necessity) {
            case 'must': return { bg: '#FEE2E2', color: '#DC2626', label: '必买' };
            case 'recommended': return { bg: '#DBEAFE', color: '#2563EB', label: '建议' };
            default: return { bg: '#F3F4F6', color: '#6B7280', label: '可选' };
        }
    };

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F7F8FA' }}>
                {/* Header */}
                <div style={{
                    background: 'white',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #F3F4F6',
                    position: 'sticky',
                    top: 0,
                    zIndex: 50,
                }}>
                    <button onClick={() => router.back()} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ArrowLeft size={20} color="#374151" />
                        <span style={{ fontSize: '17px', fontWeight: 'bold', color: '#1F2937' }}>清单工具</span>
                    </button>
                    <button style={{ fontSize: '14px', color: '#3B82F6', background: 'none', border: 'none' }}>使用指南</button>
                </div>

                {/* Tabs */}
                <div style={{ background: 'white', borderBottom: '1px solid #E5E7EB', position: 'sticky', top: '52px', zIndex: 40 }}>
                    <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ '--title-font-size': '15px' }}>
                        <Tabs.Tab title="官方清单" key="official" />
                        <Tabs.Tab title="场景清单" key="scenario" />
                        <Tabs.Tab title={`我的清单(${myLists.length})`} key="my" />
                    </Tabs>
                </div>

                {/* Content */}
                <div style={{ padding: '16px' }}>
                    {/* Official Tab */}
                    {activeTab === 'official' && (
                        <div>
                            {/* Age Selector */}
                            <div style={{ marginBottom: '16px' }}>
                                <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '12px' }}>选择宝宝月龄</div>
                                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
                                    {ageGroups.map((age) => (
                                        <button
                                            key={age}
                                            onClick={() => setSelectedAge(age)}
                                            style={{
                                                padding: '8px 16px',
                                                borderRadius: '12px',
                                                border: 'none',
                                                background: selectedAge === age ? '#3B82F6' : '#F3F4F6',
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

                            {/* Lists */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {officialLists.map((list) => (
                                    <div key={list.id} style={{ background: 'white', borderRadius: '16px', padding: '16px', border: '1px solid #E5E7EB' }}>
                                        {/* List Header */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                            <span style={{ fontSize: '36px' }}>{list.icon}</span>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: 'bold', color: '#1F2937', marginBottom: '4px' }}>{list.title}</div>
                                                <div style={{ fontSize: '12px', color: '#6B7280' }}>{list.desc}</div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>
                                                    <Users size={10} />
                                                    <span>{list.userCount.toLocaleString()}人在用</span>
                                                </div>
                                            </div>
                                            <ChevronRight size={18} color="#3B82F6" />
                                        </div>

                                        {/* Items */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {list.items.map((item) => {
                                                const key = `${list.id}-${item.id}`;
                                                const checked = checkedItems[key];
                                                const style = getNecessityStyle(item.necessity);

                                                return (
                                                    <div key={item.id} style={{ background: '#F9FAFB', borderRadius: '12px', padding: '12px' }}>
                                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                                            <button
                                                                onClick={() => handleToggleItem(list.id, item.id)}
                                                                style={{
                                                                    width: '20px',
                                                                    height: '20px',
                                                                    borderRadius: '6px',
                                                                    border: checked ? 'none' : '2px solid #D1D5DB',
                                                                    background: checked ? '#3B82F6' : 'white',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    flexShrink: 0,
                                                                    marginTop: '2px',
                                                                    cursor: 'pointer',
                                                                }}
                                                            >
                                                                {checked && <Check size={12} color="white" />}
                                                            </button>

                                                            <div style={{ flex: 1 }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                                                    <span style={{
                                                                        fontSize: '14px',
                                                                        fontWeight: '500',
                                                                        color: checked ? '#9CA3AF' : '#1F2937',
                                                                        textDecoration: checked ? 'line-through' : 'none',
                                                                    }}>{item.name}</span>
                                                                    <span style={{
                                                                        fontSize: '10px',
                                                                        padding: '2px 6px',
                                                                        borderRadius: '8px',
                                                                        background: style.bg,
                                                                        color: style.color,
                                                                    }}>{style.label}</span>
                                                                </div>

                                                                <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>💡 {item.reason}</div>

                                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                                        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#EF4444' }}>¥{item.price}</span>
                                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#6B7280' }}>
                                                                            <TrendingUp size={10} color="#10B981" />
                                                                            <span>{item.recommendRate}%推荐</span>
                                                                        </div>
                                                                    </div>
                                                                    <button style={{ fontSize: '12px', color: '#3B82F6', background: 'none', border: 'none', cursor: 'pointer' }}>
                                                                        查看详情
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Actions */}
                                        <div style={{ display: 'flex', gap: '8px', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
                                            <button style={{
                                                flex: 1,
                                                background: '#3B82F6',
                                                color: 'white',
                                                padding: '10px',
                                                borderRadius: '10px',
                                                border: 'none',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '6px',
                                                cursor: 'pointer',
                                            }}>
                                                <ShoppingCart size={16} />一键购买
                                            </button>
                                            <button style={{ padding: '10px', border: '1px solid #D1D5DB', borderRadius: '10px', background: 'white', cursor: 'pointer' }}>
                                                <Share2 size={16} color="#6B7280" />
                                            </button>
                                            <button style={{ padding: '10px', border: '1px solid #D1D5DB', borderRadius: '10px', background: 'white', cursor: 'pointer' }}>
                                                <Download size={16} color="#6B7280" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Tips */}
                            <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '12px', padding: '16px', marginTop: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                    <AlertCircle size={18} color="#D97706" style={{ marginTop: '2px' }} />
                                    <div style={{ fontSize: '13px', color: '#92400E' }}>
                                        <div style={{ fontWeight: '600', marginBottom: '4px' }}>购物建议</div>
                                        <div>• 必买项目优先，可选项目根据实际需求</div>
                                        <div>• 新手建议从小容量试用开始</div>
                                        <div>• 关注同月龄宝妈的真实反馈</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Scenario Tab */}
                    {activeTab === 'scenario' && (
                        <div>
                            <div style={{ marginBottom: '16px' }}>
                                <h3 style={{ fontWeight: 'bold', color: '#1F2937', marginBottom: '4px' }}>场景清单</h3>
                                <p style={{ fontSize: '14px', color: '#6B7280' }}>针对不同使用场景的专属清单</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {scenarioLists.map((list) => (
                                    <div key={list.id} style={{ background: 'white', borderRadius: '16px', padding: '16px', border: '1px solid #E5E7EB' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                            <span style={{ fontSize: '36px' }}>{list.icon}</span>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: 'bold', color: '#1F2937', marginBottom: '4px' }}>{list.title}</div>
                                                <div style={{ fontSize: '12px', color: '#6B7280' }}>{list.desc}</div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>
                                                    <Users size={10} />
                                                    <span>{list.userCount.toLocaleString()}人收藏</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ background: '#EFF6FF', borderRadius: '12px', padding: '12px', marginBottom: '12px' }}>
                                            <div style={{ fontSize: '12px', fontWeight: '600', color: '#1E40AF', marginBottom: '8px' }}>💡 选购建议</div>
                                            {list.tips.map((tip, idx) => (
                                                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '12px', color: '#374151', marginBottom: '4px' }}>
                                                    <CheckCircle size={12} color="#10B981" style={{ marginTop: '2px' }} />
                                                    <span>{tip}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <button style={{
                                            width: '100%',
                                            background: '#3B82F6',
                                            color: 'white',
                                            padding: '12px',
                                            borderRadius: '12px',
                                            border: 'none',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '6px',
                                            cursor: 'pointer',
                                        }}>
                                            查看完整清单 <ChevronRight size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* My Lists Tab */}
                    {activeTab === 'my' && (
                        <div>
                            {/* Create Button */}
                            <button
                                onClick={handleCreateList}
                                style={{
                                    width: '100%',
                                    background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                                    color: 'white',
                                    borderRadius: '16px',
                                    padding: '16px',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    marginBottom: '16px',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                                }}
                            >
                                <Plus size={20} />
                                <span style={{ fontWeight: 'bold' }}>创建新清单</span>
                            </button>

                            {myLists.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {myLists.map((list) => (
                                        <div key={list.id} style={{ background: 'white', borderRadius: '16px', padding: '16px', border: '1px solid #E5E7EB' }}>
                                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                                                <div>
                                                    <div style={{ fontWeight: 'bold', color: '#1F2937', marginBottom: '4px' }}>{list.title}</div>
                                                    <div style={{ fontSize: '12px', color: '#9CA3AF' }}>更新于 {list.updatedAt}</div>
                                                </div>
                                                <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                                    <X size={18} color="#9CA3AF" />
                                                </button>
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '12px' }}>
                                                <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
                                                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1F2937' }}>{list.itemCount}</div>
                                                    <div style={{ fontSize: '11px', color: '#6B7280' }}>项物品</div>
                                                </div>
                                                <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
                                                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#10B981' }}>{list.checkedCount}</div>
                                                    <div style={{ fontSize: '11px', color: '#6B7280' }}>已购买</div>
                                                </div>
                                                <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
                                                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#EF4444' }}>¥{list.totalPrice}</div>
                                                    <div style={{ fontSize: '11px', color: '#6B7280' }}>总价</div>
                                                </div>
                                            </div>

                                            {/* Progress */}
                                            <div style={{ marginBottom: '12px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                    <span style={{ fontSize: '12px', color: '#6B7280' }}>完成度</span>
                                                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#3B82F6' }}>
                                                        {Math.round((list.checkedCount / list.itemCount) * 100)}%
                                                    </span>
                                                </div>
                                                <div style={{ height: '8px', background: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
                                                    <div style={{
                                                        height: '100%',
                                                        background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
                                                        width: `${(list.checkedCount / list.itemCount) * 100}%`,
                                                    }} />
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button style={{
                                                    flex: 1,
                                                    background: '#3B82F6',
                                                    color: 'white',
                                                    padding: '10px',
                                                    borderRadius: '10px',
                                                    border: 'none',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    cursor: 'pointer',
                                                }}>继续编辑</button>
                                                <button style={{ padding: '10px', border: '1px solid #D1D5DB', borderRadius: '10px', background: 'white', cursor: 'pointer' }}>
                                                    <Share2 size={16} color="#6B7280" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '48px 0' }}>
                                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
                                    <div style={{ color: '#6B7280', marginBottom: '8px' }}>还没有创建清单</div>
                                    <div style={{ fontSize: '14px', color: '#9CA3AF' }}>点击上方按钮创建你的第一个清单</div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </MobileContainer>
    );
}
