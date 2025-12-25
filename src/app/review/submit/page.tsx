'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    ArrowLeft, Search, X, Camera, Check, ChevronRight,
    ThumbsUp, ThumbsDown, MinusCircle, RefreshCw, ShoppingCart
} from 'lucide-react';
import { Toast } from 'antd-mobile';
import {
    reviewService,
    type ReviewAttitude,
    type DecisionPathType,
    type UseScenario,
    type IssueTag,
    type SearchProductResult,
} from '@/services/reviewService';

export default function ReviewSubmitPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const productIdFromUrl = searchParams.get('productId');

    // 表单状态
    const [selectedProduct, setSelectedProduct] = useState<SearchProductResult | null>(null);
    const [attitude, setAttitude] = useState<ReviewAttitude | null>(null);
    const [summary, setSummary] = useState('');
    const [detail, setDetail] = useState('');
    const [usageDays, setUsageDays] = useState<number | null>(null);
    const [babyAge, setBabyAge] = useState<string | null>(null);
    const [decisionPath, setDecisionPath] = useState<DecisionPathType | null>(null);
    const [fromProduct, setFromProduct] = useState('');
    const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // 数据
    const [scenarios, setScenarios] = useState<UseScenario[]>([]);
    const [positiveTags, setPositiveTags] = useState<IssueTag[]>([]);
    const [negativeTags, setNegativeTags] = useState<IssueTag[]>([]);
    const [babyAgeOptions, setBabyAgeOptions] = useState<string[]>([]);
    const [usageDaysOptions, setUsageDaysOptions] = useState<{ value: number; label: string }[]>([]);

    // 产品搜索
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResults, setSearchResults] = useState<SearchProductResult[]>([]);
    const [showSearch, setShowSearch] = useState(false);

    // 提交状态
    const [submitting, setSubmitting] = useState(false);

    // 初始化数据
    useEffect(() => {
        async function loadData() {
            const [scen, posTags, negTags, ageOpts, daysOpts] = await Promise.all([
                reviewService.getScenarios(),
                reviewService.getPositiveTags(),
                reviewService.getNegativeTags(),
                reviewService.getBabyAgeOptions(),
                reviewService.getUsageDaysOptions(),
            ]);
            setScenarios(scen);
            setPositiveTags(posTags);
            setNegativeTags(negTags);
            setBabyAgeOptions(ageOpts);
            setUsageDaysOptions(daysOpts);

            // 从URL预填产品
            if (productIdFromUrl) {
                const product = await reviewService.getProductById(productIdFromUrl);
                if (product) {
                    setSelectedProduct(product);
                }
            }
        }
        loadData();
    }, [productIdFromUrl]);

    // 搜索产品
    const handleSearch = async (keyword: string) => {
        setSearchKeyword(keyword);
        if (keyword.trim()) {
            const results = await reviewService.searchProducts(keyword);
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    // 选择产品
    const handleSelectProduct = (product: SearchProductResult) => {
        setSelectedProduct(product);
        setShowSearch(false);
        setSearchKeyword('');
        setSearchResults([]);
    };

    // 切换场景
    const toggleScenario = (id: string) => {
        setSelectedScenarios(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    // 切换标签
    const toggleTag = (id: string) => {
        setSelectedTags(prev =>
            prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
        );
    };

    // 提交评价
    const handleSubmit = async () => {
        if (!selectedProduct) {
            Toast.show({ content: '请选择产品', icon: 'fail' });
            return;
        }
        if (!attitude) {
            Toast.show({ content: '请选择推荐态度', icon: 'fail' });
            return;
        }
        if (!summary.trim()) {
            Toast.show({ content: '请填写一句话总结', icon: 'fail' });
            return;
        }

        setSubmitting(true);
        const result = await reviewService.submitReview({
            productId: selectedProduct.id,
            attitude,
            summary,
            detail,
            usageDays: usageDays || 0,
            babyAge: babyAge || '',
            decisionPath: {
                type: decisionPath || 'first_buy',
                fromProduct: fromProduct || undefined,
            },
            scenarios: selectedScenarios,
            tags: selectedTags,
        });
        setSubmitting(false);

        if (result.success) {
            Toast.show({ content: '评价发布成功！', icon: 'success' });
            router.back();
        } else {
            Toast.show({ content: result.error || '提交失败', icon: 'fail' });
        }
    };

    // 当前显示的标签（根据态度）
    const currentTags = attitude === 'recommend' ? positiveTags :
        attitude === 'not-recommend' ? negativeTags :
            [...positiveTags, ...negativeTags];

    return (
        <div className="max-w-[515px] mx-auto bg-gray-50 min-h-screen flex flex-col lg:shadow-xl">
            {/* 顶部导航 */}
            <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-50 border-b border-gray-100">
                <button onClick={() => router.back()}>
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <span className="font-semibold">发布评价</span>
                <div className="w-5" />
            </div>

            {/* 产品搜索弹层 */}
            {showSearch && (
                <div className="fixed inset-0 bg-white z-50 flex flex-col">
                    <div className="px-4 py-3 flex items-center gap-3 border-b">
                        <button onClick={() => setShowSearch(false)}>
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div className="flex-1 bg-gray-100 rounded-xl px-3 py-2 flex items-center gap-2">
                            <Search className="w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={searchKeyword}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="搜索产品名称或品牌"
                                className="flex-1 bg-transparent outline-none text-sm"
                                autoFocus
                            />
                            {searchKeyword && (
                                <button onClick={() => handleSearch('')}>
                                    <X className="w-4 h-4 text-gray-400" />
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4">
                        {searchResults.length > 0 ? (
                            <div className="space-y-2">
                                {searchResults.map(product => (
                                    <button
                                        key={product.id}
                                        onClick={() => handleSelectProduct(product)}
                                        className="w-full bg-white rounded-xl p-3 flex items-center gap-3 border border-gray-200 text-left"
                                    >
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                                            {product.image}
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-xs text-gray-500">{product.brand}</div>
                                            <div className="text-sm font-medium text-gray-800">{product.name}</div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                    </button>
                                ))}
                            </div>
                        ) : searchKeyword ? (
                            <div className="text-center text-gray-400 py-10">
                                未找到相关产品
                            </div>
                        ) : (
                            <div className="text-center text-gray-400 py-10">
                                输入产品名称或品牌搜索
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* 表单内容 */}
            <div className="flex-1 overflow-y-auto pb-24">
                {/* 选择产品 */}
                <div className="bg-white p-4 mb-3">
                    <div className="text-sm font-semibold text-gray-800 mb-3">
                        选择产品 <span className="text-red-500">*</span>
                    </div>
                    {selectedProduct ? (
                        <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl border border-gray-100">
                                {selectedProduct.image}
                            </div>
                            <div className="flex-1">
                                <div className="text-xs text-gray-500">{selectedProduct.brand}</div>
                                <div className="text-sm font-medium text-gray-800">{selectedProduct.name}</div>
                            </div>
                            <button
                                onClick={() => setShowSearch(true)}
                                className="text-xs text-blue-600"
                            >
                                更换
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowSearch(true)}
                            className="w-full bg-gray-50 rounded-xl p-4 flex items-center justify-center gap-2 text-gray-500 border-2 border-dashed border-gray-200"
                        >
                            <Search className="w-4 h-4" />
                            <span className="text-sm">搜索选择产品</span>
                        </button>
                    )}
                </div>

                {/* 推荐态度 */}
                <div className="bg-white p-4 mb-3">
                    <div className="text-sm font-semibold text-gray-800 mb-3">
                        推荐态度 <span className="text-red-500">*</span>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setAttitude('recommend')}
                            className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${attitude === 'recommend'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                        >
                            <ThumbsUp className="w-5 h-5" />
                            <span className="font-medium">推荐</span>
                        </button>
                        <button
                            onClick={() => setAttitude('optional')}
                            className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${attitude === 'optional'
                                    ? 'bg-gray-500 text-white'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                        >
                            <MinusCircle className="w-5 h-5" />
                            <span className="font-medium">可选</span>
                        </button>
                        <button
                            onClick={() => setAttitude('not-recommend')}
                            className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${attitude === 'not-recommend'
                                    ? 'bg-red-500 text-white'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                        >
                            <ThumbsDown className="w-5 h-5" />
                            <span className="font-medium">不推荐</span>
                        </button>
                    </div>
                </div>

                {/* 一句话总结 */}
                <div className="bg-white p-4 mb-3">
                    <div className="text-sm font-semibold text-gray-800 mb-3">
                        一句话总结 <span className="text-red-500">*</span>
                    </div>
                    <input
                        type="text"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder="例如：防胀气效果好，宝宝接受度高"
                        className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none"
                        maxLength={50}
                    />
                    <div className="text-right text-xs text-gray-400 mt-1">{summary.length}/50</div>
                </div>

                {/* 详细评价 */}
                <div className="bg-white p-4 mb-3">
                    <div className="text-sm font-semibold text-gray-800 mb-3">详细评价（选填）</div>
                    <textarea
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                        placeholder="分享你的真实使用体验..."
                        className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none resize-none h-24"
                        maxLength={500}
                    />
                    <div className="text-right text-xs text-gray-400 mt-1">{detail.length}/500</div>
                </div>

                {/* 上传图片 */}
                <div className="bg-white p-4 mb-3">
                    <div className="text-sm font-semibold text-gray-800 mb-3">上传图片（选填）</div>
                    <div className="flex gap-2">
                        <button className="w-20 h-20 bg-gray-50 rounded-xl flex flex-col items-center justify-center gap-1 border-2 border-dashed border-gray-200">
                            <Camera className="w-6 h-6 text-gray-400" />
                            <span className="text-xs text-gray-400">添加图片</span>
                        </button>
                    </div>
                </div>

                {/* 使用信息 */}
                <div className="bg-white p-4 mb-3">
                    <div className="text-sm font-semibold text-gray-800 mb-3">使用信息</div>

                    {/* 宝宝月龄 */}
                    <div className="mb-4">
                        <div className="text-xs text-gray-500 mb-2">宝宝月龄</div>
                        <div className="flex flex-wrap gap-2">
                            {babyAgeOptions.map(age => (
                                <button
                                    key={age}
                                    onClick={() => setBabyAge(age)}
                                    className={`px-3 py-1.5 rounded-full text-xs transition-all ${babyAge === age
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 text-gray-600'
                                        }`}
                                >
                                    {age}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 使用时长 */}
                    <div>
                        <div className="text-xs text-gray-500 mb-2">已使用时长</div>
                        <div className="flex flex-wrap gap-2">
                            {usageDaysOptions.map(opt => (
                                <button
                                    key={opt.value}
                                    onClick={() => setUsageDays(opt.value)}
                                    className={`px-3 py-1.5 rounded-full text-xs transition-all ${usageDays === opt.value
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 text-gray-600'
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 决策路径 */}
                <div className="bg-white p-4 mb-3">
                    <div className="text-sm font-semibold text-gray-800 mb-3">决策路径</div>
                    <div className="space-y-2">
                        <button
                            onClick={() => setDecisionPath('first_buy')}
                            className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${decisionPath === 'first_buy'
                                    ? 'bg-blue-50 border-2 border-blue-500'
                                    : 'bg-gray-50 border-2 border-transparent'
                                }`}
                        >
                            <ShoppingCart className={`w-5 h-5 ${decisionPath === 'first_buy' ? 'text-blue-500' : 'text-gray-400'}`} />
                            <span className={`text-sm ${decisionPath === 'first_buy' ? 'text-blue-700' : 'text-gray-600'}`}>
                                首次购买这个产品
                            </span>
                        </button>
                        <button
                            onClick={() => setDecisionPath('switched_from')}
                            className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${decisionPath === 'switched_from'
                                    ? 'bg-blue-50 border-2 border-blue-500'
                                    : 'bg-gray-50 border-2 border-transparent'
                                }`}
                        >
                            <RefreshCw className={`w-5 h-5 ${decisionPath === 'switched_from' ? 'text-blue-500' : 'text-gray-400'}`} />
                            <span className={`text-sm ${decisionPath === 'switched_from' ? 'text-blue-700' : 'text-gray-600'}`}>
                                从其他产品换过来
                            </span>
                        </button>
                        {decisionPath === 'switched_from' && (
                            <input
                                type="text"
                                value={fromProduct}
                                onChange={(e) => setFromProduct(e.target.value)}
                                placeholder="从哪个产品换过来？"
                                className="w-full bg-white rounded-xl px-4 py-3 text-sm outline-none border border-gray-200 ml-8"
                                style={{ width: 'calc(100% - 2rem)' }}
                            />
                        )}
                        <button
                            onClick={() => setDecisionPath('repurchased')}
                            className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${decisionPath === 'repurchased'
                                    ? 'bg-green-50 border-2 border-green-500'
                                    : 'bg-gray-50 border-2 border-transparent'
                                }`}
                        >
                            <Check className={`w-5 h-5 ${decisionPath === 'repurchased' ? 'text-green-500' : 'text-gray-400'}`} />
                            <span className={`text-sm ${decisionPath === 'repurchased' ? 'text-green-700' : 'text-gray-600'}`}>
                                回购用户
                            </span>
                        </button>
                        <button
                            onClick={() => setDecisionPath('idle')}
                            className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${decisionPath === 'idle'
                                    ? 'bg-red-50 border-2 border-red-500'
                                    : 'bg-gray-50 border-2 border-transparent'
                                }`}
                        >
                            <X className={`w-5 h-5 ${decisionPath === 'idle' ? 'text-red-500' : 'text-gray-400'}`} />
                            <span className={`text-sm ${decisionPath === 'idle' ? 'text-red-700' : 'text-gray-600'}`}>
                                已闲置
                            </span>
                        </button>
                    </div>
                </div>

                {/* 使用场景 */}
                <div className="bg-white p-4 mb-3">
                    <div className="text-sm font-semibold text-gray-800 mb-3">使用场景（选填）</div>
                    <div className="flex flex-wrap gap-2">
                        {scenarios.map(scenario => (
                            <button
                                key={scenario.id}
                                onClick={() => toggleScenario(scenario.id)}
                                className={`px-3 py-1.5 rounded-full text-xs flex items-center gap-1 transition-all ${selectedScenarios.includes(scenario.id)
                                        ? 'bg-purple-500 text-white'
                                        : 'bg-gray-100 text-gray-600'
                                    }`}
                            >
                                <span>{scenario.icon}</span>
                                <span>{scenario.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 标签选择 */}
                {attitude && (
                    <div className="bg-white p-4 mb-3">
                        <div className="text-sm font-semibold text-gray-800 mb-3">
                            {attitude === 'recommend' ? '优点标签' : attitude === 'not-recommend' ? '缺点标签' : '特点标签'}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {currentTags.map(tag => (
                                <button
                                    key={tag.id}
                                    onClick={() => toggleTag(tag.id)}
                                    className={`px-3 py-1.5 rounded-full text-xs transition-all ${selectedTags.includes(tag.id)
                                            ? tag.type === 'positive'
                                                ? 'bg-green-500 text-white'
                                                : 'bg-red-500 text-white'
                                            : tag.type === 'positive'
                                                ? 'bg-green-50 text-green-700'
                                                : 'bg-red-50 text-red-700'
                                        }`}
                                >
                                    {tag.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* 底部提交按钮 */}
            <div className="bg-white border-t border-gray-200 px-4 py-3 fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[515px] z-50">
                <button
                    onClick={handleSubmit}
                    disabled={submitting || !selectedProduct || !attitude || !summary.trim()}
                    className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${submitting || !selectedProduct || !attitude || !summary.trim()
                            ? 'bg-gray-300'
                            : 'bg-gradient-to-r from-blue-500 to-purple-500'
                        }`}
                >
                    {submitting ? '提交中...' : '发布评价'}
                </button>
            </div>
        </div>
    );
}
