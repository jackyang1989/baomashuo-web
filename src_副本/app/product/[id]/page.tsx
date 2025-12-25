'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { NavBar, Toast, ProgressBar } from 'antd-mobile';
import { ChevronRight, Star, Users, Clock, TrendingUp, ShoppingCart, Share2 } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { productService, type ProductDetail } from '@/services/productService';
import { useFeedbacks } from '@/hooks/useFeedbacks';
import { FeedbackCard } from '@/components/feedback/FeedbackCard';

// 维度评分项
const RATING_DIMENSIONS = [
    { key: 'antiColic', label: '防胀气效果' },
    { key: 'babyAcceptance', label: '宝宝接受度' },
    { key: 'easyToClean', label: '清洗难度' },
    { key: 'valueForMoney', label: '性价比' },
    { key: 'durability', label: '耐用性' },
];

export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const { feedbacks, markHelpful } = useFeedbacks();

    useEffect(() => {
        async function fetchProduct() {
            setLoading(true);
            const data = await productService.getDetail(id);
            setProduct(data);
            setLoading(false);
        }
        if (id) fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <MobileContainer>
                <div className="flex items-center justify-center h-screen">
                    <div className="text-gray-400">加载中...</div>
                </div>
            </MobileContainer>
        );
    }

    if (!product) {
        return (
            <MobileContainer>
                <NavBar onBack={() => router.back()}>产品详情</NavBar>
                <div className="flex items-center justify-center h-[60vh]">
                    <div className="text-gray-400">产品不存在</div>
                </div>
            </MobileContainer>
        );
    }

    return (
        <MobileContainer>
            {/* 头部导航 */}
            <div className="sticky top-0 z-50 bg-white">
                <NavBar
                    onBack={() => router.back()}
                    right={<Share2 className="w-5 h-5 text-gray-600" onClick={() => Toast.show('分享功能开发中')} />}
                    style={{ '--height': '44px' }}
                >
                    产品详情
                </NavBar>
            </div>

            {/* 主内容 */}
            <div className="flex-1 overflow-y-auto bg-[#F7F8FA] pb-24">
                {/* 产品基础信息 */}
                <div className="bg-white p-4">
                    {/* 产品图片 */}
                    <div className="w-full h-48 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                        <span className="text-8xl">🍼</span>
                    </div>

                    {/* 品牌+名称 */}
                    <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
                    <h1 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h1>

                    {/* 价格 */}
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl font-bold text-red-500">¥{product.currentPrice}</span>
                        {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">¥{product.originalPrice}</span>
                        )}
                    </div>

                    {/* 评分概览 */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-amber-400" fill="#fbbf24" />
                            <span className="font-bold text-gray-800">{product.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">{product.reviewCount}条评价</span>
                        <span className="text-sm text-green-600">{product.recommendRate}%推荐</span>
                    </div>
                </div>

                {/* 核心数据统计 */}
                <div className="bg-white mt-3 p-4">
                    <h2 className="font-bold text-gray-800 mb-4">📊 真实使用数据</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-green-50 rounded-xl p-3 text-center">
                            <div className="text-2xl font-bold text-green-600">{product.stats.stillInUseRate}%</div>
                            <div className="text-xs text-gray-600 mt-1">仍在使用</div>
                        </div>
                        <div className="bg-blue-50 rounded-xl p-3 text-center">
                            <div className="text-2xl font-bold text-blue-600">{product.stats.usageOver30DaysRate}%</div>
                            <div className="text-xs text-gray-600 mt-1">用超30天</div>
                        </div>
                        <div className="bg-purple-50 rounded-xl p-3 text-center">
                            <div className="text-2xl font-bold text-purple-600">{product.stats.repurchaseRate}%</div>
                            <div className="text-xs text-gray-600 mt-1">会回购</div>
                        </div>
                        <div className="bg-red-50 rounded-xl p-3 text-center">
                            <div className="text-2xl font-bold text-red-500">{product.stats.abandonedRate}%</div>
                            <div className="text-xs text-gray-600 mt-1">弃用率</div>
                        </div>
                    </div>
                </div>

                {/* 维度评分 */}
                <div className="bg-white mt-3 p-4">
                    <h2 className="font-bold text-gray-800 mb-4">⭐ 决策维度评分</h2>
                    <div className="space-y-3">
                        {RATING_DIMENSIONS.map((dim) => (
                            <div key={dim.key} className="flex items-center gap-3">
                                <span className="w-20 text-sm text-gray-600">{dim.label}</span>
                                <div className="flex-1">
                                    <ProgressBar
                                        percent={(product.ratings[dim.key as keyof typeof product.ratings] / 5) * 100}
                                        style={{
                                            '--fill-color': '#3b82f6',
                                            '--track-color': '#e5e7eb',
                                            '--track-width': '8px',
                                        }}
                                    />
                                </div>
                                <span className="w-8 text-sm font-bold text-gray-800">
                                    {product.ratings[dim.key as keyof typeof product.ratings]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 同月龄推荐率 */}
                <div className="bg-white mt-3 p-4">
                    <h2 className="font-bold text-gray-800 mb-4">👶 同月龄推荐率</h2>
                    <div className="flex gap-2">
                        {product.ageRecommendRates.map((item) => (
                            <div key={item.age} className="flex-1 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-3 text-center">
                                <div className="text-xs text-gray-500 mb-1">{item.age}个月</div>
                                <div className="text-xl font-bold text-blue-600">{item.rate}%</div>
                                <div className="text-[10px] text-gray-400">{item.count}人评价</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 产品特点 */}
                <div className="bg-white mt-3 p-4">
                    <h2 className="font-bold text-gray-800 mb-3">✨ 产品特点</h2>
                    <div className="flex flex-wrap gap-2">
                        {product.features.map((feature, idx) => (
                            <span key={idx} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                                {feature}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 规格参数 */}
                <div className="bg-white mt-3 p-4">
                    <h2 className="font-bold text-gray-800 mb-3">📋 规格参数</h2>
                    <div className="space-y-2">
                        {product.specs.map((spec, idx) => (
                            <div key={idx} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                                <span className="text-sm text-gray-500">{spec.label}</span>
                                <span className="text-sm text-gray-800">{spec.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 真实评价 */}
                <div className="mt-3 p-4 bg-white">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-bold text-gray-800">💬 真实评价</h2>
                        <button className="text-sm text-blue-600">查看全部 {product.reviewCount}条</button>
                    </div>
                    <div className="space-y-0">
                        {feedbacks.slice(0, 2).map((feedback) => (
                            <FeedbackCard key={feedback.id} feedback={feedback} onHelpful={markHelpful} />
                        ))}
                    </div>
                </div>
            </div>

            {/* 底部购买栏 */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[515px] bg-white border-t border-gray-200 px-4 py-3 flex items-center gap-3 z-50">
                <button
                    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-full font-bold flex items-center justify-center gap-2"
                    onClick={() => Toast.show('即将跳转购买页面')}
                >
                    <ShoppingCart className="w-5 h-5" />
                    去购买
                </button>
                <button
                    className="px-6 py-3 border border-blue-500 text-blue-500 rounded-full font-bold"
                    onClick={() => router.push('/review/submit?productId=' + product.id)}
                >
                    写评价
                </button>
            </div>
        </MobileContainer>
    );
}
