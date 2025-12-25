'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft, Search, ChevronRight, ChevronDown, ChevronUp,
    Eye, ThumbsUp, BookOpen, HelpCircle
} from 'lucide-react';
import { Toast } from 'antd-mobile';
import {
    usageService,
    type UsageCategory,
    type UsageGuide,
    type FAQ,
} from '@/services/usageService';

export default function UsagePage() {
    const router = useRouter();
    const [categories, setCategories] = useState<UsageCategory[]>([]);
    const [guides, setGuides] = useState<UsageGuide[]>([]);
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const [cats, popularGuides, popularFaqs] = await Promise.all([
                usageService.getCategories(),
                usageService.getPopularGuides(4),
                usageService.getPopularFAQs(5),
            ]);
            setCategories(cats);
            setGuides(popularGuides);
            setFaqs(popularFaqs);
            setLoading(false);
        }
        loadData();
    }, []);

    const handleCategoryClick = async (categoryId: string) => {
        if (selectedCategory === categoryId) {
            setSelectedCategory(null);
            const popularGuides = await usageService.getPopularGuides(4);
            setGuides(popularGuides);
        } else {
            setSelectedCategory(categoryId);
            const categoryGuides = await usageService.getGuides(categoryId);
            setGuides(categoryGuides);
        }
    };

    const handleFaqToggle = (faqId: string) => {
        setExpandedFaq(expandedFaq === faqId ? null : faqId);
    };

    const handleHelpful = async (type: 'guide' | 'faq', id: string) => {
        await usageService.markHelpful(type, id);
        Toast.show({ content: '感谢反馈！', icon: 'success' });
    };

    if (loading) {
        return (
            <div className="max-w-[515px] mx-auto bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-gray-400">加载中...</div>
            </div>
        );
    }

    return (
        <div className="max-w-[515px] mx-auto bg-gray-50 min-h-screen flex flex-col lg:shadow-xl pb-6">
            {/* 顶部导航 */}
            <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-50 border-b border-gray-100">
                <button onClick={() => router.back()}>
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <span className="font-bold text-gray-800">怎么用</span>
                <button onClick={() => Toast.show('搜索功能开发中')}>
                    <Search className="w-5 h-5 text-gray-600" />
                </button>
            </div>

            {/* 分类入口 */}
            <div className="bg-white p-4 mb-3">
                <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold text-gray-800 text-sm">使用指南分类</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat.id)}
                            className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${selectedCategory === cat.id
                                    ? 'bg-blue-50 border-2 border-blue-500'
                                    : 'bg-gray-50 border-2 border-transparent'
                                }`}
                        >
                            <span className="text-2xl">{cat.icon}</span>
                            <span className="text-xs text-gray-800">{cat.name}</span>
                            <span className="text-xs text-gray-400">{cat.count}篇</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* 指南列表 */}
            <div className="bg-white p-4 mb-3">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-blue-500" />
                        <span className="font-semibold text-gray-800 text-sm">
                            {selectedCategory
                                ? categories.find(c => c.id === selectedCategory)?.name
                                : '热门指南'}
                        </span>
                    </div>
                    {selectedCategory && (
                        <button
                            onClick={() => handleCategoryClick(selectedCategory)}
                            className="text-xs text-blue-600"
                        >
                            查看全部
                        </button>
                    )}
                </div>

                <div className="space-y-3">
                    {guides.map((guide) => (
                        <div
                            key={guide.id}
                            className="bg-gray-50 rounded-xl p-3 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => Toast.show('详情页开发中')}
                        >
                            <div className="flex gap-3">
                                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-3xl flex-shrink-0 border border-gray-100">
                                    {guide.coverImage}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">
                                        {guide.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 line-clamp-1 mb-2">
                                        {guide.summary}
                                    </p>
                                    <div className="flex items-center gap-3 text-xs text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <Eye className="w-3 h-3" />
                                            {(guide.readCount / 1000).toFixed(1)}k
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <ThumbsUp className="w-3 h-3" />
                                            {guide.helpfulCount}
                                        </span>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                            </div>
                            {guide.tags.length > 0 && (
                                <div className="flex gap-1 mt-2">
                                    {guide.tags.map((tag, idx) => (
                                        <span key={idx} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* 常见问题 */}
            <div className="bg-white p-4">
                <div className="flex items-center gap-2 mb-3">
                    <HelpCircle className="w-4 h-4 text-orange-500" />
                    <span className="font-semibold text-gray-800 text-sm">常见问题</span>
                </div>

                <div className="space-y-2">
                    {faqs.map((faq) => (
                        <div key={faq.id} className="border border-gray-100 rounded-xl overflow-hidden">
                            <button
                                onClick={() => handleFaqToggle(faq.id)}
                                className="w-full p-3 flex items-center gap-3 bg-white text-left"
                            >
                                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs text-orange-600 flex-shrink-0">
                                    Q
                                </div>
                                <span className="flex-1 text-sm text-gray-800">{faq.question}</span>
                                {expandedFaq === faq.id
                                    ? <ChevronUp className="w-4 h-4 text-gray-400" />
                                    : <ChevronDown className="w-4 h-4 text-gray-400" />
                                }
                            </button>

                            {expandedFaq === faq.id && (
                                <div className="px-3 pb-3 bg-gray-50">
                                    <div className="flex gap-3">
                                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs text-blue-600 flex-shrink-0">
                                            A
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                            <div className="flex items-center justify-between mt-3">
                                                <span className="text-xs text-gray-400">
                                                    {faq.helpfulCount}人觉得有用
                                                </span>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleHelpful('faq', faq.id);
                                                    }}
                                                    className="text-xs text-blue-600 flex items-center gap-1"
                                                >
                                                    <ThumbsUp className="w-3 h-3" />
                                                    有用
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
