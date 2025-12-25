'use client';

import { useRouter } from 'next/navigation';
import { NavBar, NoticeBar, Tabs, List, Tag, Space, Card } from 'antd-mobile';
import { AlertTriangle, TrendingDown, Users, ChevronRight, ArrowRight } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { usePitfallData } from '@/hooks/usePitfallData';
import { PITFALL_SCENARIOS, AGE_RANGES } from '@/mocks/pitfalls';
import type { PitfallProduct } from '@/types/review';

// 避坑卡片组件
function PitfallCard({ item, rank }: { item: PitfallProduct; rank: number }) {
    const router = useRouter();

    return (
        <Card
            style={{
                borderRadius: 16,
                marginBottom: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                border: item.severity === 'high' ? '1px solid #fca5a5' : '1px solid #f3f4f6',
            }}
            bodyStyle={{ padding: 16 }}
        >
            {/* 头部：排名 + 产品图片 + 产品名 */}
            <div className="flex items-start gap-3 mb-3">
                {/* 排名 */}
                <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0 ${rank <= 3 ? 'bg-red-500' : 'bg-orange-400'
                        }`}
                >
                    {rank}
                </div>

                {/* 产品图片 */}
                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 border border-gray-200">
                    🍼
                </div>

                {/* 产品信息 */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-[15px] text-gray-800 truncate">
                            {item.productName}
                        </span>
                        {item.severity === 'high' && (
                            <Tag color="danger" style={{ '--background-color': '#fee2e2', '--text-color': '#dc2626' }}>
                                高危
                            </Tag>
                        )}
                    </div>
                    <div className="text-xs text-gray-400">{item.brandName}</div>
                </div>
            </div>

            {/* 核心数据：不推荐人数 + 弃用率 */}
            <div className="flex gap-4 mb-3 p-3 bg-red-50 rounded-xl">
                <div className="flex-1 text-center">
                    <div className="text-xl font-bold text-red-600">{item.notRecommendCount}</div>
                    <div className="text-xs text-gray-500">不推荐</div>
                </div>
                <div className="w-px bg-red-200" />
                <div className="flex-1 text-center">
                    <div className="text-xl font-bold text-orange-500">{item.abandonedRate}%</div>
                    <div className="text-xs text-gray-500">弃用率</div>
                </div>
                <div className="w-px bg-red-200" />
                <div className="flex-1 text-center">
                    <div className="text-xl font-bold text-gray-600">{item.totalReviewCount}</div>
                    <div className="text-xs text-gray-500">总评价</div>
                </div>
            </div>

            {/* 高频踩坑原因 */}
            <div className="mb-3">
                <div className="text-xs text-gray-500 mb-2 font-medium">🔥 高频踩坑原因</div>
                <div className="space-y-1.5">
                    {item.topIssues.slice(0, 3).map((issue, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                            <TrendingDown className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                            <span className="text-gray-700 flex-1">{issue.issue}</span>
                            <span className="text-red-500 font-medium">{issue.percentage}%</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 典型反馈 */}
            <div className="bg-gray-50 rounded-xl p-3 mb-3">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-400 text-xs">💬</span>
                    <span className="text-xs text-gray-500">
                        {item.typicalFeedback.userName}（{item.typicalFeedback.babyAge}，使用{item.typicalFeedback.usageDays}天）
                    </span>
                </div>
                <div className="text-sm text-gray-600 line-clamp-2">
                    "{item.typicalFeedback.content}"
                </div>
            </div>

            {/* 替代推荐 */}
            {item.alternativeProductName && (
                <div
                    className="flex items-center justify-between p-3 bg-green-50 rounded-xl cursor-pointer"
                    onClick={() => item.alternativeProductId && router.push(`/product/${item.alternativeProductId}`)}
                >
                    <div className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span className="text-sm text-gray-700">替代推荐：</span>
                        <span className="text-sm font-medium text-green-700">{item.alternativeProductName}</span>
                    </div>
                    {item.alternativeRecommendRate && (
                        <div className="flex items-center gap-1 text-green-600 text-sm">
                            <span>{item.alternativeRecommendRate}%推荐</span>
                            <ChevronRight className="w-4 h-4" />
                        </div>
                    )}
                </div>
            )}
        </Card>
    );
}

export default function PitfallsPage() {
    const router = useRouter();
    const {
        selectedAge,
        setSelectedAge,
        selectedScenario,
        setSelectedScenario,
        pitfalls,
        stats
    } = usePitfallData();

    return (
        <MobileContainer showTabBarSpacer>
            {/* 导航栏 */}
            <div className="sticky top-0 z-50 bg-white">
                <NavBar
                    onBack={() => router.back()}
                    style={{ '--height': '44px' }}
                >
                    <span className="font-bold text-[#333]">避坑榜</span>
                </NavBar>
            </div>

            {/* 警示横幅 */}
            <NoticeBar
                content="以下数据基于真实用户反馈，帮你避开智商税"
                color="alert"
                icon={<AlertTriangle className="w-4 h-4" />}
                style={{ '--background-color': '#fef2f2', '--text-color': '#dc2626' }}
            />

            {/* 月龄筛选 */}
            <div className="bg-white px-4 py-3 border-b border-gray-100">
                <div className="text-xs text-gray-500 mb-2">选择宝宝月龄</div>
                <Tabs
                    activeKey={selectedAge}
                    onChange={(key) => setSelectedAge(key as typeof selectedAge)}
                    style={{
                        '--active-line-color': '#FF8FA3',
                        '--active-title-color': '#FF8FA3',
                    }}
                >
                    <Tabs.Tab title="全部" key="all" />
                    {AGE_RANGES.map((age) => (
                        <Tabs.Tab title={age.label} key={age.value} />
                    ))}
                </Tabs>
            </div>

            {/* 场景筛选 */}
            <div className="bg-white px-4 py-3 border-b border-gray-100">
                <div className="text-xs text-gray-500 mb-2">避坑场景</div>
                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                    <div
                        className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap cursor-pointer transition-colors ${selectedScenario === 'all'
                            ? 'bg-[#FF8FA3] text-white'
                            : 'bg-gray-100 text-gray-600'
                            }`}
                        onClick={() => setSelectedScenario('all')}
                    >
                        全部
                    </div>
                    {PITFALL_SCENARIOS.map((scenario) => (
                        <div
                            key={scenario.value}
                            className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap cursor-pointer transition-colors ${selectedScenario === scenario.value
                                ? 'bg-[#FF8FA3] text-white'
                                : 'bg-gray-100 text-gray-600'
                                }`}
                            onClick={() => setSelectedScenario(scenario.value)}
                        >
                            {scenario.icon} {scenario.label}
                        </div>
                    ))}
                </div>
            </div>

            {/* 统计栏 */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-gray-700">
                        共 <span className="font-bold text-red-600">{stats.totalNotRecommend}</span> 位宝妈踩坑反馈
                    </span>
                </div>
                <span className="text-xs text-gray-400">数据实时更新</span>
            </div>

            {/* 避坑列表 */}
            <div className="px-4 py-4 bg-[#F7F8FA]">
                {pitfalls.length > 0 ? (
                    pitfalls.map((item, index) => (
                        <PitfallCard key={item.id} item={item} rank={index + 1} />
                    ))
                ) : (
                    <div className="text-center py-12 text-gray-400">
                        该筛选条件下暂无数据
                    </div>
                )}
            </div>

            {/* 底部提示 */}
            <div className="px-4 py-6 bg-[#F7F8FA]">
                <div className="bg-white rounded-2xl p-4 text-center">
                    <div className="text-sm text-gray-500 mb-2">发现踩坑产品？</div>
                    <button
                        className="bg-[#FF8FA3] text-white px-6 py-2 rounded-full text-sm font-medium"
                        onClick={() => router.push('/review/submit')}
                    >
                        我也要爆料 →
                    </button>
                </div>
            </div>
        </MobileContainer>
    );
}
