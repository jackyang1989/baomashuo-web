'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NavBar, Tabs } from 'antd-mobile';
import { ChevronRight, Check, X, AlertTriangle, ShoppingCart } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import type { BabyAgeRange } from '@/types/review';

// 月龄清单配置
const AGE_LISTS: { age: BabyAgeRange; label: string; emoji: string }[] = [
    { age: '0-3', label: '0-3个月', emoji: '👶' },
    { age: '3-6', label: '3-6个月', emoji: '🍼' },
    { age: '6-12', label: '6-12个月', emoji: '🥣' },
    { age: '12-24', label: '1-2岁', emoji: '🧒' },
];

// 场景清单
const SCENARIO_LISTS = [
    { id: 'new-mom', title: '新手妈妈首购清单', emoji: '🎀', count: 12, users: '5.6万人收藏' },
    { id: 'night-feeding', title: '夜奶场景清单', emoji: '🌙', count: 6, users: '2.3万人收藏' },
    { id: 'going-out', title: '外出必备清单', emoji: '🚗', count: 8, users: '1.8万人收藏' },
    { id: 'weaning', title: '断奶过渡清单', emoji: '🍃', count: 5, users: '1.2万人收藏' },
];

// 清单项目 Mock
const LIST_ITEMS = [
    {
        id: '1',
        name: 'Comotomo可么多么奶瓶',
        status: 'must_buy' as const,
        reason: '85%同月龄妈妈推荐，防胀气效果好',
        price: '¥128',
        recommendRate: 85,
    },
    {
        id: '2',
        name: '贝亲宽口径玻璃奶瓶',
        status: 'suggested' as const,
        reason: '性价比高，作为备用奶瓶推荐',
        price: '¥69',
        recommendRate: 78,
    },
    {
        id: '3',
        name: 'XX品牌防胀气奶瓶',
        status: 'not_recommended' as const,
        reason: '32%用户反馈仍然胀气，弃用率高',
        price: '¥89',
        notRecommendRate: 45,
    },
    {
        id: '4',
        name: '奶瓶消毒器',
        status: 'optional' as const,
        reason: '68%妈妈反馈使用率低，可用开水煮替代',
        price: '¥299',
        optionalRate: 68,
    },
];

// 状态配置
const STATUS_CONFIG = {
    must_buy: { label: '必买', color: 'bg-green-500', textColor: 'text-green-600', icon: Check },
    suggested: { label: '建议买', color: 'bg-blue-500', textColor: 'text-blue-600', icon: Check },
    not_recommended: { label: '不推荐', color: 'bg-red-500', textColor: 'text-red-600', icon: X },
    optional: { label: '可选', color: 'bg-gray-400', textColor: 'text-gray-600', icon: AlertTriangle },
};

export default function ListsPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('age');
    const [selectedAge, setSelectedAge] = useState<BabyAgeRange>('0-3');

    return (
        <MobileContainer>
            {/* 头部 */}
            <div className="sticky top-0 z-50 bg-white">
                <NavBar
                    onBack={() => router.back()}
                    style={{ '--height': '44px' }}
                >
                    <span className="font-bold">清单</span>
                </NavBar>

                {/* Tab 切换 */}
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    style={{
                        '--active-line-color': '#3b82f6',
                        '--active-title-color': '#3b82f6',
                    }}
                >
                    <Tabs.Tab title="按月龄" key="age" />
                    <Tabs.Tab title="按场景" key="scenario" />
                </Tabs>
            </div>

            {/* 主内容 */}
            <div className="flex-1 overflow-y-auto bg-[#F7F8FA] pb-6">
                {activeTab === 'age' && (
                    <>
                        {/* 月龄选择器 */}
                        <div className="bg-white px-4 py-3">
                            <div className="flex gap-2 overflow-x-auto no-scrollbar">
                                {AGE_LISTS.map((item) => (
                                    <button
                                        key={item.age}
                                        onClick={() => setSelectedAge(item.age)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap ${selectedAge === item.age
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 text-gray-600'
                                            }`}
                                    >
                                        <span>{item.emoji}</span>
                                        <span className="text-sm">{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 清单说明 */}
                        <div className="px-4 py-3">
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 flex items-center gap-3">
                                <span className="text-2xl">📋</span>
                                <div className="flex-1">
                                    <div className="font-bold text-gray-800 text-sm">
                                        {AGE_LISTS.find(a => a.age === selectedAge)?.label} 奶瓶清单
                                    </div>
                                    <div className="text-xs text-gray-500">基于 2,345 位同月龄妈妈真实反馈</div>
                                </div>
                            </div>
                        </div>

                        {/* 清单图例 */}
                        <div className="px-4 pb-3">
                            <div className="flex gap-3 text-xs">
                                <span className="flex items-center gap-1">
                                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                    <span className="text-gray-600">必买</span>
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                                    <span className="text-gray-600">建议买</span>
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                                    <span className="text-gray-600">不推荐</span>
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
                                    <span className="text-gray-600">可选</span>
                                </span>
                            </div>
                        </div>

                        {/* 清单项目 */}
                        <div className="px-4 space-y-3">
                            {LIST_ITEMS.map((item) => {
                                const config = STATUS_CONFIG[item.status];
                                const IconComponent = config.icon;
                                return (
                                    <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm">
                                        <div className="flex items-start gap-3">
                                            {/* 状态图标 */}
                                            <div className={`w-8 h-8 ${config.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                                                <IconComponent className="w-5 h-5 text-white" />
                                            </div>

                                            {/* 内容 */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-bold text-gray-800">{item.name}</span>
                                                    <span className={`text-xs px-2 py-0.5 rounded ${config.color} text-white`}>
                                                        {config.label}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-500 mb-2">{item.reason}</p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-red-500 font-bold">{item.price}</span>
                                                    <button className="flex items-center gap-1 text-blue-600 text-sm">
                                                        查看详情 <ChevronRight className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}

                {activeTab === 'scenario' && (
                    <div className="p-4 space-y-3">
                        {SCENARIO_LISTS.map((list) => (
                            <Link
                                key={list.id}
                                href={`/lists/${list.id}`}
                                className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-2xl">
                                        {list.emoji}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">{list.title}</h3>
                                        <p className="text-xs text-gray-500">{list.count}件商品 · {list.users}</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </MobileContainer>
    );
}
