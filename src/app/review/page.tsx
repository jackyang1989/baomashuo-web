'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NavBar, Tabs, Toast } from 'antd-mobile';
import {
    ThumbsUp, ThumbsDown, ChevronRight, Clock, RefreshCw,
    Search, Filter, PenLine, TrendingUp, Users, X, ShoppingCart
} from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { REVIEW_LIST, AGE_TABS, type ReviewListItem, type DecisionPathType } from '@/mocks/reviewList';

// 态度配置
const ATTITUDE_CONFIG = {
    recommend: { label: '推荐', bg: 'bg-green-100', text: 'text-green-600', icon: ThumbsUp },
    not_recommend: { label: '不推荐', bg: 'bg-red-100', text: 'text-red-600', icon: ThumbsDown },
    optional: { label: '可选', bg: 'bg-gray-100', text: 'text-gray-600', icon: null },
};

// 决策路径配置
const PATH_CONFIG = {
    switched_from: { label: '从其他品牌换过来', icon: RefreshCw, color: 'text-blue-600' },
    idle: { label: '已闲置', icon: X, color: 'text-red-600' },
    repurchased: { label: '回购用户', icon: ShoppingCart, color: 'text-green-600' },
    first_buy: { label: '首次购买', icon: ShoppingCart, color: 'text-gray-500' },
};

export default function ReviewPage() {
    const router = useRouter();
    const [selectedAge, setSelectedAge] = useState('all');
    const [filterType, setFilterType] = useState<'all' | 'recommend' | 'not_recommend'>('all');
    const [reviews, setReviews] = useState<ReviewListItem[]>([]);

    useEffect(() => {
        setReviews(REVIEW_LIST);
    }, []);

    const filteredReviews = reviews.filter(review => {
        if (selectedAge !== 'all' && !review.babyAge.includes(selectedAge.split('-')[0])) {
            return false;
        }
        if (filterType !== 'all' && review.attitude !== filterType) {
            return false;
        }
        return true;
    });

    const handleResonate = (reviewId: string) => {
        Toast.show({ content: '已投票，感谢共鸣！', icon: 'success' });
    };

    // 统计数据
    const stats = {
        total: reviews.length,
        recommend: reviews.filter(r => r.attitude === 'recommend').length,
        notRecommend: reviews.filter(r => r.attitude === 'not_recommend').length,
    };

    return (
        <MobileContainer>
            {/* 头部导航 */}
            <div className="sticky top-0 z-50 bg-white border-b border-gray-100">
                <NavBar
                    onBack={() => router.back()}
                    right={
                        <button
                            className="text-blue-600 text-sm font-medium"
                            onClick={() => router.push('/review/submit')}
                        >
                            写评价
                        </button>
                    }
                    style={{ '--height': '44px' }}
                >
                    <span className="font-bold">值不值</span>
                </NavBar>
            </div>

            {/* 主内容 */}
            <div className="flex-1 overflow-y-auto bg-gray-50 pb-6">

                {/* 统计概览 */}
                <div className="bg-white p-4 mb-3">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-blue-500" />
                            <span className="font-bold text-gray-800">真实妈妈反馈</span>
                        </div>
                        <span className="text-xs text-gray-400">数据实时更新</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gray-50 rounded-xl p-3 text-center">
                            <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
                            <div className="text-xs text-gray-500">总评价</div>
                        </div>
                        <div className="bg-green-50 rounded-xl p-3 text-center">
                            <div className="text-2xl font-bold text-green-600">{stats.recommend}</div>
                            <div className="text-xs text-gray-500">推荐</div>
                        </div>
                        <div className="bg-red-50 rounded-xl p-3 text-center">
                            <div className="text-2xl font-bold text-red-600">{stats.notRecommend}</div>
                            <div className="text-xs text-gray-500">不推荐</div>
                        </div>
                    </div>
                </div>

                {/* 筛选器 */}
                <div className="bg-white px-4 py-3 mb-3 flex items-center justify-between">
                    <div className="flex gap-2">
                        {[
                            { key: 'all', label: '全部' },
                            { key: 'recommend', label: '👍 推荐' },
                            { key: 'not_recommend', label: '👎 不推荐' },
                        ].map(item => (
                            <button
                                key={item.key}
                                onClick={() => setFilterType(item.key as typeof filterType)}
                                className={`px-3 py-1.5 rounded-full text-xs ${filterType === item.key
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 text-gray-600'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                    <button className="flex items-center gap-1 text-xs text-gray-500">
                        <Filter className="w-4 h-4" />
                        筛选
                    </button>
                </div>

                {/* 月龄筛选 */}
                <div className="bg-white mb-3">
                    <Tabs
                        activeKey={selectedAge}
                        onChange={setSelectedAge}
                        style={{
                            '--active-line-color': '#3b82f6',
                            '--active-title-color': '#3b82f6',
                        }}
                    >
                        {AGE_TABS.map(tab => (
                            <Tabs.Tab key={tab.key} title={tab.title} />
                        ))}
                    </Tabs>
                </div>

                {/* 评价列表 */}
                <div className="px-4 space-y-3">
                    {filteredReviews.map((review) => {
                        const attitudeConfig = ATTITUDE_CONFIG[review.attitude];
                        const pathConfig = PATH_CONFIG[review.decisionPath.type];
                        const AttitudeIcon = attitudeConfig.icon;
                        const PathIcon = pathConfig.icon;

                        return (
                            <div key={review.id} className="bg-white rounded-2xl p-4 shadow-sm">
                                {/* 用户信息 + 态度 */}
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">{review.avatar}</span>
                                        <div>
                                            <div className="font-medium text-sm text-gray-800">{review.userName}</div>
                                            <div className="text-[10px] text-gray-400 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {review.babyAge} · 用了{review.usageDays}天
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`px-2.5 py-1 rounded-full text-xs flex items-center gap-1 ${attitudeConfig.bg} ${attitudeConfig.text}`}>
                                        {AttitudeIcon && <AttitudeIcon className="w-3 h-3" />}
                                        {attitudeConfig.label}
                                    </span>
                                </div>

                                {/* 决策路径 - 核心差异化 */}
                                <div className={`flex items-center gap-2 mb-3 px-3 py-2 bg-gray-50 rounded-lg ${pathConfig.color}`}>
                                    <PathIcon className="w-4 h-4" />
                                    <span className="text-xs">
                                        {review.decisionPath.type === 'switched_from' && (
                                            <>从「{review.decisionPath.fromProduct}」换过来</>
                                        )}
                                        {review.decisionPath.type === 'idle' && '已闲置'}
                                        {review.decisionPath.type === 'repurchased' && '回购用户'}
                                        {review.decisionPath.type === 'first_buy' && '首次购买'}
                                    </span>
                                    {review.decisionPath.reason && (
                                        <span className="text-xs text-gray-400">- {review.decisionPath.reason}</span>
                                    )}
                                </div>

                                {/* 产品信息 */}
                                <Link
                                    href={`/product/${review.productId}`}
                                    className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl mb-3"
                                >
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl border border-gray-100">
                                        {review.productImage}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs text-gray-400">{review.productBrand}</div>
                                        <div className="text-sm font-medium text-gray-800 truncate">{review.productName}</div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </Link>

                                {/* 评价内容 */}
                                <div className="text-sm text-gray-700 font-medium mb-1">{review.summary}</div>
                                <div className="text-xs text-gray-500 mb-3 line-clamp-2">{review.content}</div>

                                {/* 底部操作 */}
                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <button
                                            className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full"
                                            onClick={() => handleResonate(review.id)}
                                        >
                                            <ThumbsUp className="w-3.5 h-3.5" />
                                            我也遇到 ({review.resonateCount})
                                        </button>
                                        <button className="flex items-center gap-1 text-xs text-gray-400">
                                            <TrendingUp className="w-3.5 h-3.5" />
                                            有用 {review.helpfulCount}
                                        </button>
                                    </div>
                                    <span className="text-[10px] text-gray-400">{review.createdAt}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 加载更多 */}
                <div className="px-4 mt-6">
                    <button className="w-full py-3 bg-white rounded-xl text-sm text-gray-600 font-medium border border-gray-200">
                        加载更多评价
                    </button>
                </div>

                {/* 底部引导 */}
                <div className="px-4 mt-4">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 flex items-center justify-between">
                        <div>
                            <div className="font-bold text-gray-800 text-sm">用过？分享你的真实体验</div>
                            <div className="text-xs text-gray-500 mt-0.5">帮助更多宝妈做决策</div>
                        </div>
                        <button
                            onClick={() => router.push('/review/submit')}
                            className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1"
                        >
                            <PenLine className="w-4 h-4" />
                            写评价
                        </button>
                    </div>
                </div>
            </div>
        </MobileContainer>
    );
}
