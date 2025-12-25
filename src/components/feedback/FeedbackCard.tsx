'use client';

/**
 * FeedbackCard - 真实使用反馈卡片
 * 像素级复刻设计稿
 */
import { useRouter } from 'next/navigation';
import type { FeedbackItem } from '@/types/feedback';

interface FeedbackCardProps {
    feedback: FeedbackItem;
    onHelpful?: (id: string) => void;
}

// 获取态度对应的样式和文本
function getAttitudeStyles(attitude: string) {
    switch (attitude) {
        case 'recommend':
            return {
                label: '推荐',
                className: 'bg-[#d1fae5] text-[#059669]',
            };
        case 'not_recommend':
            return {
                label: '不推荐',
                className: 'bg-[#fee2e2] text-[#dc2626]',
            };
        case 'optional':
        default:
            return {
                label: '可选',
                className: 'bg-[#e5e7eb] text-[#4b5563]',
            };
    }
}

// 获取标签样式
function getTagStyles(attitude: string) {
    switch (attitude) {
        case 'recommend':
            return 'bg-[#d1fae5] text-[#059669]';
        case 'not_recommend':
            return 'bg-[#fee2e2] text-[#dc2626]';
        default:
            return 'bg-[#fef3c7] text-[#92400e]';
    }
}

export function FeedbackCard({ feedback, onHelpful }: FeedbackCardProps) {
    const router = useRouter();
    const attitudeStyle = getAttitudeStyles(feedback.attitude);
    const tagStyle = getTagStyles(feedback.attitude);

    return (
        <div
            className="bg-white rounded-2xl p-4 mb-3 shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
        >
            {/* 用户信息头部 */}
            <div className="flex justify-between items-center mb-3">
                <div className="flex gap-2 flex-1">
                    {/* 头像 */}
                    <div className="text-[32px] leading-none">{feedback.user.avatar}</div>

                    {/* 用户详情 */}
                    <div className="flex-1">
                        <div className="flex items-center gap-[6px] mb-[2px]">
                            <span className="text-sm font-semibold text-[#1f2937]">
                                {feedback.user.name}
                            </span>
                            <span
                                className="text-[10px] text-white px-[6px] py-[2px] rounded-md"
                                style={{
                                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                                }}
                            >
                                Lv{feedback.user.level}
                            </span>
                        </div>
                        <div className="text-[11px] text-[#6b7280]">
                            {feedback.user.babyAge} · 已使用 {feedback.usageDays} 天
                        </div>
                    </div>
                </div>

                {/* 推荐态度标签 */}
                <div className={`px-3 py-[6px] rounded-lg text-xs font-semibold whitespace-nowrap ${attitudeStyle.className}`}>
                    {attitudeStyle.label}
                </div>
            </div>

            {/* 产品卡片 */}
            <div className="flex gap-3 mb-3 p-3 bg-[#f9fafb] rounded-xl border border-[#e5e7eb]">
                {/* 产品图片 */}
                <div
                    className="w-20 h-20 rounded-lg bg-white border border-[#e5e7eb] flex items-center justify-center text-5xl flex-shrink-0"
                >
                    🍼
                </div>

                {/* 产品信息 */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                        <div className="text-[11px] text-[#6b7280] mb-[2px]">
                            {feedback.product.brand}
                        </div>
                        <div className="text-sm font-semibold text-[#1f2937] mb-1 leading-[1.3] line-clamp-2">
                            {feedback.product.name}
                        </div>
                    </div>

                    <div>
                        {/* 价格 */}
                        <div className="flex items-center gap-[6px]">
                            <span className="text-base font-bold text-[#ef4444]">
                                ¥{feedback.product.currentPrice}
                            </span>
                            {feedback.product.originalPrice && (
                                <span className="text-xs text-[#9ca3af] line-through">
                                    ¥{feedback.product.originalPrice}
                                </span>
                            )}
                        </div>

                        {/* 评分 */}
                        <div className="flex items-center gap-1 text-[11px] text-[#6b7280] mt-1">
                            <span className="text-[#fbbf24]">⭐</span>
                            <span>{feedback.product.rating}分</span>
                            <span>·</span>
                            <span>{feedback.product.reviewCount}条评价</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 一句话总结 */}
            <div className="bg-[#f9fafb] p-[10px] rounded-lg text-[13px] text-[#374151] mb-2">
                💬 {feedback.summary}
            </div>

            {/* 详细内容 */}
            <div className="text-[13px] text-[#4b5563] leading-[1.5] mb-3 line-clamp-2">
                {feedback.detail}
            </div>

            {/* 标签 */}
            <div className="flex flex-wrap gap-[6px] mb-3">
                {feedback.tags.map((tag, index) => (
                    <span
                        key={index}
                        className={`text-[11px] px-[10px] py-1 rounded-lg ${tagStyle}`}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* 替换信息 */}
            {feedback.replaceFrom && (
                <div className="bg-[#fef3c7] px-[10px] py-[10px] rounded-lg text-xs text-[#92400e] mb-3">
                    ⚠️ 从「{feedback.replaceFrom}」换过来：{feedback.replaceReason}
                </div>
            )}

            {/* 弃用信息 */}
            {feedback.abandoned && (
                <div className="bg-[#fee2e2] px-[10px] py-[10px] rounded-lg text-xs text-[#991b1b] mb-3">
                    ❌ 已弃用：{feedback.abandonedReason || '实际使用体验不佳'}
                </div>
            )}

            {/* 底部操作栏 */}
            <div className="flex justify-between items-center pt-3 border-t border-[#e5e7eb]">
                <button
                    className="text-xs text-[#6b7280] bg-transparent border-none cursor-pointer"
                    onClick={() => onHelpful?.(feedback.id)}
                >
                    ⭐ {feedback.helpfulCount}人觉得有用
                </button>
                <button
                    className="bg-transparent border-none text-[#3b82f6] text-[13px] font-semibold cursor-pointer"
                    onClick={() => router.push(`/review/${feedback.id}`)}
                >
                    查看详情 →
                </button>
            </div>
        </div>
    );
}
