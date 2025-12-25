'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown, Star } from 'lucide-react';
import type { BabyAgeRange, Review } from '@/types/product';
import { getAgeRangeLabel, getDurationLabel, getIssueLabel } from '@/types/product';

// Mock data
const MOCK_REVIEWS: (Review & { productName: string; productBrand: string })[] = [
    {
        id: 'rev-001',
        productId: 'pigeon-wide-160',
        productName: '自然实感宽口玻璃奶瓶',
        productBrand: '贝亲',
        babyAge: '0-3',
        recommend: 'recommend',
        comment: '宝宝接受度很高，没有明显胀气，清洗也方便',
        usageDuration: '1month',
        helpfulCount: 23,
        meeTooCount: 15,
        createdAt: '2024-12-20',
    },
    {
        id: 'rev-002',
        productId: 'comotomo-150',
        productName: '硅胶奶瓶',
        productBrand: '可么多么',
        babyAge: '0-3',
        recommend: 'not_recommend',
        comment: '胀气比较明显，硅胶材质清洗起来也麻烦',
        usageDuration: '1week',
        issues: ['bloat', 'clean'],
        helpfulCount: 45,
        meeTooCount: 32,
        createdAt: '2024-12-19',
    },
    {
        id: 'rev-003',
        productId: 'philips-natural',
        productName: '自然原生玻璃奶瓶',
        productBrand: '新安怡',
        babyAge: '3-6',
        recommend: 'recommend',
        comment: '从贝亲换过来的，宝宝很快就接受了',
        usageDuration: '1month',
        helpfulCount: 18,
        meeTooCount: 8,
        createdAt: '2024-12-18',
    },
    {
        id: 'rev-004',
        productId: 'dr-browns-wide',
        productName: '防胀气宽口奶瓶',
        productBrand: '布朗博士',
        babyAge: '0-3',
        recommend: 'recommend',
        comment: '防胀气效果确实好，就是配件多清洗麻烦点',
        usageDuration: '3months+',
        issues: ['clean'],
        helpfulCount: 56,
        meeTooCount: 24,
        createdAt: '2024-12-17',
    },
];

const AGE_TABS: { value: BabyAgeRange | 'all'; label: string }[] = [
    { value: 'all', label: '全部' },
    { value: '0-3', label: '0-3月' },
    { value: '3-6', label: '3-6月' },
    { value: '6-12', label: '6-12月' },
];

export default function ReviewPage() {
    return (
        <div className="min-h-screen pb-8 bg-[var(--color-bg-secondary)]">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-white border-b border-[var(--color-border)]">
                <div className="flex items-center h-12 px-4">
                    <Link href="/" className="p-2 -ml-2">
                        <ChevronLeft size={24} />
                    </Link>
                    <h1 className="flex-1 text-center font-semibold">值不值</h1>
                    <div className="w-8" />
                </div>
            </header>

            {/* Stats */}
            <div className="bg-white px-4 py-4 border-b border-[var(--color-border)]">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-2xl font-bold text-[var(--color-primary)]">
                            {MOCK_REVIEWS.length}
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)]">真实评价</p>
                    </div>
                    <Link href="/review/submit" className="btn btn-primary">
                        <Star size={16} />
                        我来评价
                    </Link>
                </div>
            </div>

            {/* Age Filter Tabs */}
            <div className="bg-white px-4 py-2 border-b border-[var(--color-border)] overflow-x-auto">
                <div className="flex gap-2">
                    {AGE_TABS.map((tab) => (
                        <button
                            key={tab.value}
                            className="px-4 py-1.5 rounded-full text-sm whitespace-nowrap bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]"
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Review List */}
            <section className="px-4 mt-4 space-y-3">
                {MOCK_REVIEWS.map((review) => (
                    <div key={review.id} className="card">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                {review.recommend === 'recommend' ? (
                                    <span className="badge-recommend flex items-center gap-1">
                                        <ThumbsUp size={12} /> 推荐
                                    </span>
                                ) : (
                                    <span className="badge-not-recommend flex items-center gap-1">
                                        <ThumbsDown size={12} /> 不推荐
                                    </span>
                                )}
                                <span className="text-xs text-[var(--color-text-muted)]">
                                    {getAgeRangeLabel(review.babyAge)}
                                </span>
                            </div>
                            <span className="text-xs text-[var(--color-text-muted)]">
                                {review.createdAt}
                            </span>
                        </div>

                        {/* Product Info */}
                        <Link
                            href={`/product/${review.productId}`}
                            className="flex items-center gap-2 p-2 bg-[var(--color-bg-tertiary)] rounded-lg mb-3"
                        >
                            <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                                <span className="text-lg">🍼</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">{review.productBrand}</p>
                                <p className="text-xs text-[var(--color-text-muted)]">
                                    {review.productName}
                                </p>
                            </div>
                            <ChevronRight size={16} className="text-[var(--color-text-muted)]" />
                        </Link>

                        {/* Comment */}
                        <p className="text-sm text-[var(--color-text-primary)] leading-relaxed">
                            {review.comment}
                        </p>

                        {/* Issues */}
                        {review.issues && review.issues.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                                {review.issues.map((issue) => (
                                    <span key={issue} className="tag tag-danger text-xs">
                                        {getIssueLabel(issue)}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--color-border)]">
                            <span className="text-xs text-[var(--color-text-muted)]">
                                使用{review.usageDuration ? getDurationLabel(review.usageDuration) : '未知'}
                            </span>
                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                                    <ThumbsUp size={14} />
                                    有用 {review.helpfulCount}
                                </button>
                                <button className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                                    我也遇到 {review.meeTooCount}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* Load More */}
            <div className="px-4 mt-6 text-center">
                <button className="btn btn-outline w-full">
                    加载更多评价
                </button>
            </div>
        </div>
    );
}
