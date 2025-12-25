'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NavBar, Tabs } from 'antd-mobile';
import { ChevronRight, Check, X, AlertTriangle, ShoppingCart } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { LIST_CATEGORIES, LIST_ITEMS, STATUS_CONFIG, type ListCategory, type ListItem } from '@/mocks/lists';

// 状态图标映射
const STATUS_ICONS = {
    must_buy: Check,
    recommended: Check,
    not_recommended: X,
    optional: AlertTriangle,
};

export default function ListsPage() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState(LIST_CATEGORIES[0].id);
    const [selectedList] = useState<string | null>(null);

    return (
        <MobileContainer>
            {/* 头部 */}
            <div className="sticky top-0 z-50 bg-white">
                <NavBar
                    onBack={() => router.back()}
                    style={{ '--height': '44px' }}
                >
                    <span className="font-bold">购物清单</span>
                </NavBar>
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-50">
                {/* 清单分类 */}
                <div className="p-4">
                    <h2 className="font-bold text-gray-800 mb-3">热门清单</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {LIST_CATEGORIES.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`bg-white rounded-xl p-4 text-left transition-all ${selectedCategory === category.id
                                        ? 'ring-2 ring-blue-500'
                                        : 'border border-gray-200'
                                    }`}
                            >
                                <div className="text-3xl mb-2">{category.emoji}</div>
                                <div className="font-semibold text-gray-800 text-sm">{category.title}</div>
                                <div className="text-xs text-gray-400 mt-1">
                                    {category.count}件 · {category.users}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 清单详情 */}
                <div className="bg-white mt-2">
                    <div className="px-4 py-3 border-b border-gray-100">
                        <h3 className="font-bold text-gray-800">
                            {LIST_CATEGORIES.find(c => c.id === selectedCategory)?.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                            基于真实妈妈反馈，帮你避开踩坑商品
                        </p>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {LIST_ITEMS.map((item) => {
                            const statusConfig = STATUS_CONFIG[item.status];
                            const StatusIcon = STATUS_ICONS[item.status];

                            return (
                                <Link
                                    key={item.id}
                                    href={`/product/${item.id}`}
                                    className="flex items-center p-4 gap-3"
                                >
                                    {/* 状态标识 */}
                                    <div className={`w-8 h-8 rounded-full ${statusConfig.color} flex items-center justify-center`}>
                                        <StatusIcon className="w-4 h-4 text-white" />
                                    </div>

                                    {/* 商品信息 */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-gray-800 text-sm truncate">
                                                {item.name}
                                            </span>
                                            <span className={`text-xs ${statusConfig.textColor} bg-gray-50 px-2 py-0.5 rounded`}>
                                                {statusConfig.label}
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">{item.reason}</div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-sm font-bold text-red-500">{item.price}</span>
                                            <span className="text-xs text-gray-400">
                                                {item.recommendRate}%妈妈推荐
                                            </span>
                                        </div>
                                    </div>

                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* 底部提示 */}
                <div className="p-4 text-center">
                    <p className="text-xs text-gray-400">
                        清单数据基于 3.2万 位妈妈的真实反馈
                    </p>
                </div>
            </div>
        </MobileContainer>
    );
}
