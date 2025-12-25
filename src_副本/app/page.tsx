'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Search, Bell, HelpCircle, ClipboardList, BookOpen,
    AlertTriangle, CheckCircle, TrendingDown, ChevronRight,
    Users, MessageCircle
} from 'lucide-react';
import { Skeleton } from 'antd-mobile';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { FeedbackCard } from '@/components/feedback/FeedbackCard';
import { useFeedbacks } from '@/hooks/useFeedbacks';
import {
    MAIN_ENTRIES, HOT_QUESTIONS, PITFALL_ALERTS,
    QUICK_TOOLS, TAB_BAR_ITEMS
} from '@/mocks/homepage';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
    HelpCircle, ClipboardList, BookOpen, AlertTriangle, CheckCircle, Users,
};

export default function HomePage() {
    const [activeTab, setActiveTab] = useState('decision');
    const [babyAge] = useState('3-6个月');

    // 使用 Service 层获取反馈数据
    const { feedbacks, loading, markHelpful } = useFeedbacks();

    return (
        <MobileContainer>
            {/* 顶部 - 强化用户身份 */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-4 text-white">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <div className="text-2xl font-bold mb-1">宝妈说</div>
                        <div className="text-sm opacity-90">真实决策，不踩坑</div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Search className="w-5 h-5" />
                        <div className="relative">
                            <Bell className="w-5 h-5" />
                            <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">3</div>
                        </div>
                    </div>
                </div>

                {/* 宝宝月龄选择器 */}
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="text-2xl">👶</div>
                        <div>
                            <div className="text-xs opacity-80">当前查看</div>
                            <div className="font-semibold">{babyAge} 宝宝</div>
                        </div>
                    </div>
                    <button className="bg-white/30 px-3 py-1 rounded-lg text-sm">
                        切换月龄
                    </button>
                </div>
            </div>

            {/* 主内容区 */}
            <div className="flex-1 overflow-y-auto pb-20 bg-[#F7F8FA]">

                {/* 五大决策入口 */}
                <div className="p-4">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="font-bold text-gray-800">我要做决策</h2>
                        <span className="text-xs text-gray-500">选择你的阶段</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                        {MAIN_ENTRIES.map((entry) => (
                            <Link
                                key={entry.id}
                                href={entry.href}
                                className="relative bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow text-left overflow-hidden"
                            >
                                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${entry.color} opacity-10 rounded-full -mr-8 -mt-8`} />

                                {entry.badge && (
                                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                        {entry.badge}
                                    </div>
                                )}

                                <div className={`w-9 h-9 mb-2 bg-gradient-to-br ${entry.color} text-white p-2 rounded-xl flex items-center justify-center text-lg`}>
                                    {entry.id === 'select' && '❓'}
                                    {entry.id === 'usage' && '📖'}
                                    {entry.id === 'review' && '✓'}
                                    {entry.id === 'pitfall' && '⚠'}
                                </div>
                                <div className="font-bold text-gray-800 mb-0.5">{entry.title}</div>
                                <div className="text-[11px] text-gray-500 mb-1">{entry.subtitle}</div>
                                <div className="text-[11px] text-gray-400">{entry.desc}</div>
                            </Link>
                        ))}
                    </div>

                    <Link
                        href="/lists"
                        className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl p-4 shadow-sm flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <div className="text-3xl">📋</div>
                            <div className="text-left text-white">
                                <div className="font-bold">清单与工具</div>
                                <div className="text-sm opacity-90">直接告诉我买什么</div>
                            </div>
                        </div>
                        <div className="text-xl text-white">→</div>
                    </Link>
                </div>

                {/* 避坑警示区 */}
                <div className="px-4 pb-4">
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-4 border border-red-200">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-xl">⚠️</span>
                            <h3 className="font-bold text-gray-800 flex-1">避坑警示</h3>
                            <span className="text-[10px] text-white bg-red-500 px-2 py-1 rounded-lg">
                                实时更新
                            </span>
                        </div>

                        {PITFALL_ALERTS.map((alert) => (
                            <div key={alert.id} className="bg-white rounded-xl p-3 mb-2 last:mb-0">
                                <div className="font-semibold text-sm text-gray-800 mb-2">
                                    📉 {alert.product}
                                </div>
                                <div className="text-xs text-gray-600 mb-2">
                                    {alert.issue}
                                </div>
                                <div className="text-[11px] text-gray-500">
                                    👥 {alert.userCount}位宝妈反馈
                                </div>
                            </div>
                        ))}

                        <Link href="/pitfalls" className="block w-full mt-3 text-sm font-semibold py-2 text-center bg-transparent border-none" style={{ color: '#dc2626' }}>
                            查看完整避坑榜 →
                        </Link>
                    </div>
                </div>

                {/* 热门决策问题 */}
                <div className="px-4 pb-4">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-800">同月龄都在问</h3>
                        <span className="text-xs text-gray-500">{babyAge}</span>
                    </div>

                    <div className="space-y-2">
                        {HOT_QUESTIONS.slice(0, 1).map((q) => (
                            <div key={q.id} className="bg-white rounded-xl p-3 shadow-sm flex gap-3">
                                <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 text-lg">
                                    ❓
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-[11px] text-blue-600 mb-1">{q.category}</div>
                                    <div className="font-semibold text-sm text-gray-800 mb-2">{q.question}</div>
                                    <div className="flex items-center gap-3 text-[11px] text-gray-500 flex-wrap">
                                        <span>💬 {q.answers}个回答</span>
                                        <span>👥 {q.realUsers}位真实用户</span>
                                        <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded text-[10px]">
                                            {q.age}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 真实使用反馈流 - 使用 Service 层数据 */}
                <div className="px-4 pb-4">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-800">真实使用反馈</h3>
                        <button className="text-sm text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-lg border-none">
                            筛选
                        </button>
                    </div>

                    {/* 加载状态 */}
                    {loading ? (
                        <div className="space-y-3">
                            {[1, 2].map((i) => (
                                <div key={i} className="bg-white rounded-2xl p-4">
                                    <Skeleton animated className="h-12 mb-3" />
                                    <Skeleton animated className="h-24 mb-3" />
                                    <Skeleton animated className="h-8" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-0">
                            {feedbacks.map((feedback) => (
                                <FeedbackCard
                                    key={feedback.id}
                                    feedback={feedback}
                                    onHelpful={markHelpful}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* 快速决策工具 */}
                <div className="px-4 pb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">快速决策工具</h3>
                    <div className="space-y-2">
                        {QUICK_TOOLS.map((tool) => (
                            <Link
                                key={tool.id}
                                href={tool.href}
                                className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="text-3xl">{tool.icon}</div>
                                    <div className="text-left">
                                        <div className="font-semibold text-sm text-gray-800">{tool.title}</div>
                                        <div className="text-[11px] text-gray-500">{tool.users}</div>
                                    </div>
                                </div>
                                <div className="text-xl text-gray-300">→</div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="text-center py-6 text-gray-400 text-sm">
                    下拉加载更多内容...
                </div>
            </div>

            {/* 底部导航 */}
            <div className="bg-white border-t border-gray-200 px-4 py-2 flex items-center justify-around fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[515px] z-50">
                {TAB_BAR_ITEMS.map((item) => {
                    const IconComponent = ICON_MAP[item.icon];
                    const isActive = activeTab === item.id;
                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            onClick={() => setActiveTab(item.id)}
                            className="flex flex-col items-center gap-1 relative flex-1"
                            style={{ color: isActive ? '#3b82f6' : '#6b7280' }}
                        >
                            {item.isEmoji ? (
                                <span className="text-2xl">{item.icon}</span>
                            ) : IconComponent ? (
                                <IconComponent className="w-6 h-6" />
                            ) : (
                                <span className="text-2xl">{
                                    item.id === 'decision' ? '❓' :
                                        item.id === 'pitfall' ? '⚠️' :
                                            item.id === 'list' ? '📋' :
                                                item.id === 'circle' ? '👥' : '👤'
                                }</span>
                            )}
                            <span className="text-[11px]">{item.label}</span>
                            {item.badge && (
                                <div className="absolute -top-0.5 right-[20%] bg-red-500 text-white text-[10px] px-[5px] py-[2px] rounded-lg">
                                    {item.badge}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </div>
        </MobileContainer>
    );
}
