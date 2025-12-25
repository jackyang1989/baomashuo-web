'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, HelpCircle, Filter, Heart, CheckCircle, Users, TrendingUp, Star, Sparkles } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { useSelect } from '@/hooks/useSelect';

export default function SelectPage() {
    const router = useRouter();
    const {
        step,
        setStep,
        categories,
        problems,
        budgets,
        selections,
        handleSelect,
        recommendations,
        resultFilters,
        totalCount,
        loading,
        loadingResults,
    } = useSelect();

    if (loading) {
        return (
            <MobileContainer>
                <div className="flex items-center justify-center h-screen bg-gray-50">
                    <div className="text-gray-400">加载中...</div>
                </div>
            </MobileContainer>
        );
    }

    // 第一步：选择产品类型
    const renderStep1 = () => (
        <div className="p-4">
            <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">选择产品类型</h2>
                <p className="text-sm text-gray-500">从奶瓶开始，逐步拓展到其他品类</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => {
                            handleSelect('category', cat.id);
                            setStep(2);
                        }}
                        className={`relative bg-white rounded-xl p-4 border-2 transition-all ${selections.category === cat.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                    >
                        {cat.hot && (
                            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                热门
                            </div>
                        )}
                        <div className="text-4xl mb-2">{cat.icon}</div>
                        <div className="font-semibold text-gray-800">{cat.name}</div>
                    </button>
                ))}
            </div>
        </div>
    );

    // 第二步：选择问题
    const renderStep2 = () => (
        <div className="p-4">
            <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">你遇到什么问题？</h2>
                <p className="text-sm text-gray-500">选择最困扰你的问题，我们推荐解决方案</p>
            </div>

            <div className="space-y-3">
                {problems.map((problem) => (
                    <button
                        key={problem.id}
                        onClick={() => {
                            handleSelect('problem', problem.id);
                            setStep(3);
                        }}
                        className={`w-full bg-white rounded-xl p-4 border-2 transition-all text-left ${selections.problem === problem.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            <div className="text-3xl">{problem.icon}</div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-semibold text-gray-800">{problem.title}</span>
                                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                                        {problem.effectiveness}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">{problem.desc}</p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            <button
                onClick={() => setStep(3)}
                className="w-full mt-4 text-gray-600 text-sm py-2"
            >
                跳过，直接看推荐 →
            </button>
        </div>
    );

    // 第三步：选择预算
    const renderStep3 = () => (
        <div className="p-4">
            <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">预算范围</h2>
                <p className="text-sm text-gray-500">不同价位都有好选择</p>
            </div>

            <div className="space-y-3">
                {budgets.map((budget) => (
                    <button
                        key={budget.id}
                        onClick={() => {
                            handleSelect('budget', budget.id);
                            setStep(4);
                        }}
                        className={`w-full bg-white rounded-xl p-4 border-2 transition-all flex items-center justify-between ${selections.budget === budget.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="text-2xl">{budget.icon}</div>
                            <span className="font-semibold text-gray-800">{budget.range}</span>
                        </div>
                        {budget.popular && (
                            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                最多选择
                            </span>
                        )}
                    </button>
                ))}
            </div>

            <button
                onClick={() => setStep(4)}
                className="w-full mt-4 text-gray-600 text-sm py-2"
            >
                预算不限，看所有推荐 →
            </button>
        </div>
    );

    // 第四步：推荐结果
    const renderResults = () => (
        <div className="flex-1 overflow-y-auto">
            {/* 筛选条件总结 */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-bold text-gray-800">为你推荐</h2>
                    <button className="text-sm text-blue-600 flex items-center gap-1">
                        <Filter className="w-4 h-4" />
                        筛选
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-white px-3 py-1 rounded-full text-gray-700">
                        {resultFilters.babyAge}
                    </span>
                    <span className="text-xs bg-white px-3 py-1 rounded-full text-gray-700">
                        {resultFilters.problem}
                    </span>
                    <span className="text-xs bg-white px-3 py-1 rounded-full text-gray-700">
                        {resultFilters.budget}
                    </span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                    找到 <span className="text-blue-600 font-semibold">{totalCount}个</span> 符合条件的产品
                </div>
            </div>

            {loadingResults ? (
                <div className="flex items-center justify-center py-20">
                    <div className="text-gray-400">正在匹配推荐产品...</div>
                </div>
            ) : (
                <>
                    {/* 推荐产品列表 */}
                    <div className="p-4 space-y-4">
                        {recommendations.map((product, index) => (
                            <div key={product.id} className="bg-white rounded-2xl p-4 shadow-md border border-gray-200">
                                {/* 匹配度标签 */}
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-bold text-blue-600">#{index + 1}</span>
                                        <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${product.matchScore >= 90
                                                ? 'bg-green-100 text-green-700'
                                                : product.matchScore >= 80
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            <Sparkles className="w-3 h-3" />
                                            匹配度 {product.matchScore}%
                                        </div>
                                    </div>
                                    <button className="text-gray-400">
                                        <Heart className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* 产品信息卡片 */}
                                <div className="flex gap-3 mb-3">
                                    <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center text-5xl flex-shrink-0 border border-gray-200">
                                        {product.image}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
                                        <div className="font-semibold text-gray-800 mb-2 line-clamp-2">
                                            {product.name}
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-red-500 font-bold text-lg">¥{product.price}</span>
                                            <span className="text-xs text-gray-400 line-through">¥{product.originalPrice}</span>
                                            <span className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded">
                                                省{product.originalPrice - product.price}元
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                            <span className="font-semibold">{product.rating}</span>
                                            <span>•</span>
                                            <span>{product.reviewCount}条评价</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 推荐理由 */}
                                <div className="bg-blue-50 rounded-xl p-3 mb-3">
                                    <div className="text-xs text-blue-800 font-semibold mb-2">💡 为什么推荐</div>
                                    <div className="space-y-1">
                                        {product.reasons.map((reason, idx) => (
                                            <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                                                <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                                                <span>{reason}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 同月龄数据 */}
                                <div className="flex items-center gap-4 mb-3 text-xs">
                                    <div className="flex items-center gap-1 text-gray-600">
                                        <Users className="w-4 h-4" />
                                        <span>{product.userCount}位宝妈使用</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-green-600">
                                        <TrendingUp className="w-4 h-4" />
                                        <span>同月龄推荐率{product.sameAgeRate}%</span>
                                    </div>
                                </div>

                                {/* 标签 */}
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {product.tags.map((tag, idx) => (
                                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* 操作按钮 */}
                                <div className="flex gap-2">
                                    <button
                                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold text-sm"
                                        onClick={() => router.push(`/product/${product.id}`)}
                                    >
                                        查看详情
                                    </button>
                                    <button className="px-4 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold text-sm">
                                        对比
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 查看更多 */}
                    <div className="p-4 text-center">
                        <button className="text-sm text-gray-600">
                            查看更多产品 →
                        </button>
                    </div>
                </>
            )}
        </div>
    );

    return (
        <div className="max-w-[515px] mx-auto bg-gray-50 min-h-screen flex flex-col lg:shadow-xl">
            {/* 顶部导航 - 无阴影 */}
            <div className="bg-white px-4 py-3 flex items-center justify-between">
                <button
                    className="flex items-center gap-2 text-gray-800"
                    onClick={() => step > 1 ? setStep(step - 1) : router.back()}
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-semibold">怎么选</span>
                </button>
                <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-gray-400" />
                </div>
            </div>

            {/* 进度条 - 无 border-b */}
            {step < 4 && (
                <div className="bg-white px-4 py-3">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">第 {step} 步，共 3 步</span>
                        <span className="text-xs text-gray-500">可随时跳过</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                            style={{ width: `${(step / 3) * 100}%` }}
                        />
                    </div>
                </div>
            )}

            {/* 内容区域 */}
            <div className="flex-1 overflow-y-auto">
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
                {step === 4 && renderResults()}
            </div>

            {/* 底部操作栏 - 固定在底部 */}
            {step > 1 && step < 4 && (
                <div className="bg-white border-t border-gray-200 px-4 py-3">
                    <button
                        onClick={() => setStep(step - 1)}
                        className="w-full py-3 text-gray-600 border border-gray-300 rounded-xl font-semibold"
                    >
                        上一步
                    </button>
                </div>
            )}
        </div>
    );
}
