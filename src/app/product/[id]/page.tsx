'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    ArrowLeft, Share2, Heart, Star, ThumbsUp, ThumbsDown,
    MinusCircle, TrendingUp, Users, Clock, AlertTriangle,
    CheckCircle, ShoppingCart
} from 'lucide-react';
import { Toast } from 'antd-mobile';
import {
    productDetailService,
    type ProductDetail,
    type UserReview,
} from '@/services/productDetailService';

export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [data, setData] = useState<ProductDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('summary');
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const result = await productDetailService.getProductDetail(id);
            setData(result);
            setLoading(false);
        }
        if (id) fetchData();
    }, [id]);

    const handleLike = async (reviewId: number) => {
        await productDetailService.likeReview(reviewId);
        Toast.show({ content: '点赞成功', icon: 'success' });
    };

    if (loading) {
        return (
            <div className="max-w-[515px] mx-auto bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-gray-400">加载中...</div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="max-w-[515px] mx-auto bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-gray-400">暂无数据</div>
            </div>
        );
    }

    const { product, usageData, dimensionScores, aiAnalysis, reviews, purchaseChannels } = data;

    // 智能总结Tab
    const renderSummaryTab = () => (
        <div className="p-4 space-y-4">
            {/* 真实使用数据卡片 */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-gray-800">真实使用数据</h3>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-white rounded-xl p-3">
                        <div className="text-2xl font-bold text-green-600">{usageData.recommendRate}%</div>
                        <div className="text-xs text-gray-600">推荐</div>
                    </div>
                    <div className="bg-white rounded-xl p-3">
                        <div className="text-2xl font-bold text-blue-600">{usageData.stillUsing}</div>
                        <div className="text-xs text-gray-600">仍在使用</div>
                    </div>
                    <div className="bg-white rounded-xl p-3">
                        <div className="text-2xl font-bold text-purple-600">{usageData.over30Days}</div>
                        <div className="text-xs text-gray-600">使用30天+</div>
                    </div>
                    <div className="bg-white rounded-xl p-3">
                        <div className="text-2xl font-bold text-orange-600">{usageData.repurchase}</div>
                        <div className="text-xs text-gray-600">已回购</div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-700">推荐态度分布</span>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                                <div className="bg-green-500 h-full" style={{ width: `${usageData.recommendRate}%` }} />
                            </div>
                            <span className="text-xs text-gray-600 w-12">{usageData.recommendRate}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                                <div className="bg-red-500 h-full" style={{ width: `${usageData.notRecommendRate}%` }} />
                            </div>
                            <span className="text-xs text-gray-600 w-12">{usageData.notRecommendRate}%</span>
                        </div>
                    </div>
                </div>

                {/* 弃用警示 */}
                {usageData.abandoned > 0 && (
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 mt-3">
                        <div className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                            <div className="text-xs text-orange-800">
                                <span className="font-semibold">{usageData.abandoned}人</span> 中途弃用（{Math.round(usageData.abandoned / usageData.totalUsers * 100)}%）
                                {usageData.abandonedReasons && (
                                    <div className="text-orange-600 mt-1">
                                        主要原因：{usageData.abandonedReasons}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 同月龄数据 */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-purple-600" />
                    <h3 className="font-bold text-gray-800">同月龄数据（你的宝宝{usageData.ageMatch.age}）</h3>
                </div>
                <div className="bg-purple-50 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-700">{usageData.ageMatch.age}宝宝推荐率</span>
                        <span className="text-lg font-bold text-purple-600">{usageData.ageMatch.rate}%</span>
                    </div>
                    <div className="text-xs text-gray-600">
                        基于 {usageData.ageMatch.count} 位同月龄宝妈的真实反馈
                    </div>
                </div>
            </div>

            {/* 分维度评分 */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-3">分维度评分</h3>
                <div className="space-y-3">
                    {dimensionScores.map((dim, idx) => (
                        <div key={idx}>
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-gray-700">{dim.name}</span>
                                <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm font-semibold">{dim.score}</span>
                                </div>
                            </div>
                            <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full" style={{ width: `${dim.progress}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* AI智能分析 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs">AI</span>
                    </div>
                    <h3 className="font-bold text-gray-800">智能分析</h3>
                    <span className="text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full ml-auto">
                        基于{usageData.totalUsers}条真实评价
                    </span>
                </div>

                {/* 优点 */}
                <div className="mb-3">
                    <div className="text-sm font-semibold text-green-700 mb-2 flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        常见优点
                    </div>
                    <div className="space-y-2">
                        {aiAnalysis.pros.map((pro, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm text-gray-700 bg-white rounded-lg p-2">
                                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>{pro}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 缺点 */}
                <div className="mb-3">
                    <div className="text-sm font-semibold text-red-700 mb-2 flex items-center gap-1">
                        <ThumbsDown className="w-4 h-4" />
                        常见缺点
                    </div>
                    <div className="space-y-2">
                        {aiAnalysis.cons.map((con, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm text-gray-700 bg-white rounded-lg p-2">
                                <MinusCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                                <span>{con}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 使用建议 */}
                <div className="bg-white rounded-lg p-3">
                    <div className="text-xs font-semibold text-gray-700 mb-2">💡 使用建议</div>
                    <div className="space-y-1">
                        {aiAnalysis.tips.map((tip, idx) => (
                            <div key={idx} className="text-xs text-gray-600">• {tip}</div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 适配性分析 */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-3">适合你的宝宝吗？</h3>
                <div className="space-y-3">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                        <div className="text-sm font-semibold text-green-700 mb-1">✓ 适合</div>
                        <div className="text-xs text-gray-700">{aiAnalysis.suitable}</div>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
                        <div className="text-sm font-semibold text-orange-700 mb-1">⚠️ 注意</div>
                        <div className="text-xs text-gray-700">{aiAnalysis.notSuitable}</div>
                    </div>
                </div>
            </div>
        </div>
    );

    // 真实评价Tab
    const renderReviewsTab = () => (
        <div className="p-4 space-y-3">
            {/* 筛选栏 */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded-full whitespace-nowrap">
                    全部({usageData.totalUsers})
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full whitespace-nowrap">
                    推荐({Math.round(usageData.totalUsers * usageData.recommendRate / 100)})
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full whitespace-nowrap">
                    不推荐({Math.round(usageData.totalUsers * usageData.notRecommendRate / 100)})
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full whitespace-nowrap">
                    有图片
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full whitespace-nowrap">
                    30天+
                </button>
            </div>

            {/* 评价列表 */}
            {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-2xl p-4 border border-gray-200">
                    {/* 用户信息 */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="text-2xl">{review.user.avatar}</div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-sm">{review.user.name}</span>
                                    <span className="text-xs bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-0.5 rounded">
                                        {review.user.level}
                                    </span>
                                    {review.verified && (
                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                                            已购买
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <span>{review.user.age}</span>
                                    <span>•</span>
                                    <Clock className="w-3 h-3" />
                                    <span>已使用 {review.user.useDays} 天</span>
                                </div>
                            </div>
                        </div>
                        <div className={`px-3 py-1 rounded-lg text-xs font-medium ${review.rating === 'recommend'
                            ? 'bg-green-100 text-green-700'
                            : review.rating === 'not-recommend'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                            {review.rating === 'recommend' ? '推荐' : review.rating === 'not-recommend' ? '不推荐' : '可选'}
                        </div>
                    </div>

                    {/* 一句话总结 */}
                    <div className="text-sm font-semibold text-gray-800 mb-2 bg-gray-50 p-2 rounded-lg">
                        💬 {review.summary}
                    </div>

                    {/* 详细评价 */}
                    <div className="text-sm text-gray-600 mb-3 leading-relaxed">
                        {review.detail}
                    </div>

                    {/* 图片 */}
                    {review.images && (
                        <div className="flex gap-2 mb-3">
                            {review.images.map((img, idx) => (
                                <div key={idx} className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                                    {img}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 标签 */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {review.tags.map((tag, idx) => (
                            <span key={idx} className={`text-xs px-2 py-1 rounded ${review.rating === 'recommend'
                                ? 'bg-green-50 text-green-700'
                                : 'bg-orange-50 text-orange-700'
                                }`}>
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* 替换信息 */}
                    {review.replaceFrom && (
                        <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded-lg mb-3">
                            ⚠️ 从「{review.replaceFrom}」换过来：{review.replaceReason}
                        </div>
                    )}

                    {/* 互动 */}
                    <div className="flex items-center gap-4 pt-3 border-t text-gray-600">
                        <button
                            className="flex items-center gap-1 text-sm"
                            onClick={() => handleLike(review.id)}
                        >
                            <ThumbsUp className="w-4 h-4" />
                            <span>{review.helpful}</span>
                        </button>
                        <button className="text-sm">
                            回复
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="max-w-[515px] mx-auto bg-gray-50 min-h-screen flex flex-col lg:shadow-xl">
            {/* 顶部导航 */}
            <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-50">
                <button
                    className="flex items-center gap-2"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3">
                    <Share2 className="w-5 h-5 text-gray-600" />
                    <Heart className="w-5 h-5 text-gray-600" />
                </div>
            </div>

            {/* 产品图片轮播 */}
            <div className="bg-white p-4">
                <div className="w-full h-64 bg-gray-100 rounded-2xl flex items-center justify-center text-8xl mb-3">
                    {product.images[selectedImage]}
                </div>
                <div className="flex gap-2 justify-center">
                    {product.images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedImage(idx)}
                            className={`w-16 h-16 rounded-lg flex items-center justify-center text-3xl ${selectedImage === idx ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100'
                                }`}
                        >
                            {img}
                        </button>
                    ))}
                </div>
            </div>

            {/* 产品基础信息 */}
            <div className="bg-white px-4 py-3 border-b border-gray-100">
                <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
                <h1 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h1>
                <div className="text-xs text-gray-600 mb-3">{product.model}</div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-red-500">¥{product.price}</span>
                        <span className="text-sm text-gray-400 line-through">¥{product.originalPrice}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{product.rating}</span>
                        <span className="text-sm text-gray-500">({product.reviewCount})</span>
                    </div>
                </div>
            </div>

            {/* Tab导航 */}
            <div className="bg-white px-4 flex gap-6 border-b border-gray-100 sticky top-12 z-40">
                <button
                    onClick={() => setActiveTab('summary')}
                    className={`pb-3 font-medium transition-all ${activeTab === 'summary'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600'
                        }`}
                >
                    智能总结
                </button>
                <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-3 font-medium transition-all ${activeTab === 'reviews'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600'
                        }`}
                >
                    真实评价({product.reviewCount})
                </button>
            </div>

            {/* 内容区域 */}
            <div className="flex-1 overflow-y-auto pb-44">
                {activeTab === 'summary' && renderSummaryTab()}
                {activeTab === 'reviews' && renderReviewsTab()}
            </div>

            {/* 底部购买栏 */}
            <div className="bg-white border-t border-gray-200 px-4 py-3 fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[515px] z-50">
                <div className="flex items-center gap-2 mb-2">
                    {purchaseChannels.map((channel, idx) => (
                        <button
                            key={idx}
                            className="flex-1 bg-gray-50 rounded-lg p-2 border border-gray-200 relative"
                        >
                            {channel.tag && (
                                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                    {channel.tag}
                                </div>
                            )}
                            <div className="text-xs text-gray-600">{channel.platform}</div>
                            <div className="text-sm font-bold text-red-500">¥{channel.price}</div>
                            {channel.coupon > 0 && (
                                <div className="text-xs text-orange-600">券{channel.coupon}元</div>
                            )}
                        </button>
                    ))}
                </div>
                <div className="flex gap-2">
                    <button className="flex-1 bg-gradient-to-r from-orange-400 to-red-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        立即购买
                    </button>
                </div>
            </div>
        </div>
    );
}
