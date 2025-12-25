'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NavBar } from 'antd-mobile';
import { ChevronRight, HelpCircle, AlertTriangle, Users, Sparkles } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { FEATURES } from '@/constants/features';
import type { BabyAgeRange, ProductCategory } from '@/types/product';
import { getAgeRangeLabel, getCategoryLabel } from '@/types/product';

/** 品类卡片配置 */
const CATEGORIES: { category: ProductCategory; emoji: string; desc: string; color: string; enabled: boolean }[] = [
    {
        category: 'bottle',
        emoji: '🍼',
        desc: '新生儿第一个奶瓶怎么选？',
        color: 'from-blue-500 to-cyan-500',
        enabled: FEATURES.SELECT_BOTTLE,
    },
    {
        category: 'nipple',
        emoji: '🧷',
        desc: '不同月龄该用什么奶嘴？',
        color: 'from-purple-500 to-pink-500',
        enabled: FEATURES.SELECT_NIPPLE,
    },
    {
        category: 'accessory',
        emoji: '🔧',
        desc: '防胀气配件有用吗？',
        color: 'from-amber-500 to-orange-500',
        enabled: FEATURES.SELECT_ACCESSORIES,
    },
];

const AGE_RANGES: { value: BabyAgeRange; label: string }[] = [
    { value: '0-3', label: '0-3个月' },
    { value: '3-6', label: '3-6个月' },
    { value: '6-12', label: '6-12个月' },
    { value: '12-24', label: '1-2岁' },
];

/** 决策工具 */
const TOOLS = [
    {
        id: 'quiz',
        icon: '🎯',
        title: '3分钟选奶瓶',
        desc: '问答式快速匹配',
        href: '/select/quiz',
        color: 'from-green-500 to-emerald-500',
        badge: '热门',
    },
    {
        id: 'age',
        icon: '👶',
        title: '同月龄怎么选',
        desc: '看同龄宝妈选择',
        href: '/select/age',
        color: 'from-blue-500 to-indigo-500',
        badge: null,
    },
    {
        id: 'pitfall',
        icon: '⚠️',
        title: '真实踩坑反馈',
        desc: '避免重复踩坑',
        href: '/pitfalls',
        color: 'from-red-500 to-orange-500',
        badge: '独家',
    },
    {
        id: 'compare',
        icon: '⚖️',
        title: '品牌对比',
        desc: '横向对比找差异',
        href: '/select/compare',
        color: 'from-purple-500 to-violet-500',
        badge: null,
        enabled: FEATURES.SELECT_COMPARE,
    },
];

export default function SelectPage() {
    const router = useRouter();
    const [selectedAge, setSelectedAge] = useState<BabyAgeRange | null>(null);

    return (
        <MobileContainer>
            {/* Header - 蓝紫渐变风格 */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <NavBar
                    onBack={() => router.back()}
                    style={{
                        '--height': '44px',
                        '--border-bottom': 'none',
                        background: 'transparent',
                        color: 'white',
                    }}
                    backIcon={<ChevronRight className="w-6 h-6 rotate-180" />}
                >
                    <span className="font-bold text-white">怎么选</span>
                </NavBar>

                {/* 月龄选择器 */}
                <div className="px-4 pb-4">
                    <p className="text-sm opacity-90 mb-3">选择宝宝月龄，查看同龄推荐</p>
                    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                        {AGE_RANGES.map((age) => (
                            <button
                                key={age.value}
                                onClick={() => setSelectedAge(age.value === selectedAge ? null : age.value)}
                                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${selectedAge === age.value
                                        ? 'bg-white text-blue-600 font-semibold'
                                        : 'bg-white/20 text-white'
                                    }`}
                            >
                                {age.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 主内容区 */}
            <div className="flex-1 overflow-y-auto bg-[#F7F8FA] pb-6">
                {/* 品类选择 */}
                <div className="p-4">
                    <h2 className="text-lg font-bold text-gray-800 mb-3">选择品类</h2>
                    <div className="space-y-3">
                        {CATEGORIES.filter(c => c.enabled).map((item) => (
                            <Link
                                key={item.category}
                                href={`/select/${item.category}${selectedAge ? `?age=${selectedAge}` : ''}`}
                                className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                                        <span className="text-3xl">{item.emoji}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">
                                            {getCategoryLabel(item.category)}怎么选
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="text-gray-400" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 决策工具 */}
                <div className="px-4">
                    <h2 className="text-lg font-bold text-gray-800 mb-3">决策工具</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {TOOLS.filter(t => t.enabled !== false).map((tool) => (
                            <Link
                                key={tool.id}
                                href={tool.href}
                                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                            >
                                {/* 背景装饰 */}
                                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${tool.color} opacity-10 rounded-full -mr-6 -mt-6`} />

                                {/* 徽章 */}
                                {tool.badge && (
                                    <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                                        {tool.badge}
                                    </div>
                                )}

                                <div className="text-3xl mb-2">{tool.icon}</div>
                                <h3 className="font-bold text-sm text-gray-800">{tool.title}</h3>
                                <p className="text-xs text-gray-500 mt-0.5">{tool.desc}</p>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 快速入口提示 */}
                <div className="px-4 mt-6">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-800">不知道怎么选？</h3>
                                <p className="text-xs text-gray-600 mt-0.5">回答几个问题，3分钟帮你匹配最适合的产品</p>
                            </div>
                            <Link
                                href="/select/quiz"
                                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium"
                            >
                                开始
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </MobileContainer>
    );
}
