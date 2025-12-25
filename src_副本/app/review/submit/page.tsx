'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { NavBar, Form, Input, TextArea, Selector, Stepper, Button, Toast, Rate } from 'antd-mobile';
import { ChevronRight, Camera, Check } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import type { RecommendAttitude, UsageDuration, BabyAgeRange } from '@/types/review';

// 推荐态度选项
const ATTITUDE_OPTIONS = [
    { label: '👍 推荐', value: 'recommend' },
    { label: '👎 不推荐', value: 'not_recommend' },
    { label: '🤔 可选', value: 'optional' },
];

// 使用时长选项
const USAGE_DURATION_OPTIONS = [
    { label: '不足1周', value: 'less_than_week' },
    { label: '1个月', value: 'one_month' },
    { label: '3个月', value: 'three_months' },
    { label: '半年', value: 'six_months' },
    { label: '1年以上', value: 'over_year' },
];

// 月龄选项
const AGE_OPTIONS = [
    { label: '0-3个月', value: '0-3' },
    { label: '3-6个月', value: '3-6' },
    { label: '6-12个月', value: '6-12' },
    { label: '1-2岁', value: '12-24' },
];

// 决策维度
const RATING_DIMENSIONS = [
    { key: 'antiColic', label: '防胀气效果' },
    { key: 'babyAcceptance', label: '宝宝接受度' },
    { key: 'easyToClean', label: '清洗难度' },
    { key: 'valueForMoney', label: '性价比' },
    { key: 'durability', label: '耐用性' },
];

export default function ReviewSubmitPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const productId = searchParams.get('productId');

    const [attitude, setAttitude] = useState<RecommendAttitude | null>(null);
    const [usageDuration, setUsageDuration] = useState<UsageDuration | null>(null);
    const [usageDays, setUsageDays] = useState(30);
    const [babyAge, setBabyAge] = useState<BabyAgeRange | null>(null);
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [stillInUse, setStillInUse] = useState(true);
    const [wouldRepurchase, setWouldRepurchase] = useState<'yes' | 'no' | 'maybe' | null>(null);
    const [replaceFrom, setReplaceFrom] = useState('');
    const [replaceReason, setReplaceReason] = useState('');
    const [ratings, setRatings] = useState<Record<string, number>>({});

    const handleSubmit = () => {
        if (!attitude) {
            Toast.show('请选择推荐态度');
            return;
        }
        if (!summary.trim()) {
            Toast.show('请填写一句话总结');
            return;
        }
        if (!content.trim()) {
            Toast.show('请填写详细评价');
            return;
        }

        // TODO: 调用服务提交
        Toast.show({
            icon: 'success',
            content: '发布成功！',
        });
        setTimeout(() => {
            router.back();
        }, 1500);
    };

    return (
        <MobileContainer>
            {/* 头部 */}
            <div className="sticky top-0 z-50 bg-white">
                <NavBar
                    onBack={() => router.back()}
                    right={
                        <button
                            className="text-blue-600 font-semibold"
                            onClick={handleSubmit}
                        >
                            发布
                        </button>
                    }
                    style={{ '--height': '44px' }}
                >
                    写评价
                </NavBar>
            </div>

            {/* 表单内容 */}
            <div className="flex-1 overflow-y-auto bg-[#F7F8FA] pb-6">
                {/* 推荐态度 - 核心决策 */}
                <div className="bg-white p-4 mb-3">
                    <h3 className="font-bold text-gray-800 mb-3">你会推荐这款产品吗？ *</h3>
                    <div className="flex gap-2">
                        {ATTITUDE_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => setAttitude(opt.value as RecommendAttitude)}
                                className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${attitude === opt.value
                                    ? opt.value === 'recommend'
                                        ? 'bg-green-500 text-white'
                                        : opt.value === 'not_recommend'
                                            ? 'bg-red-500 text-white'
                                            : 'bg-gray-500 text-white'
                                    : 'bg-gray-100 text-gray-600'
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 使用信息 */}
                <div className="bg-white p-4 mb-3">
                    <h3 className="font-bold text-gray-800 mb-3">使用信息</h3>

                    {/* 宝宝月龄 */}
                    <div className="mb-4">
                        <label className="text-sm text-gray-600 mb-2 block">宝宝使用时月龄</label>
                        <div className="flex gap-2 flex-wrap">
                            {AGE_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => setBabyAge(opt.value as BabyAgeRange)}
                                    className={`px-4 py-2 rounded-full text-sm ${babyAge === opt.value
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 text-gray-600'
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 使用时长 */}
                    <div className="mb-4">
                        <label className="text-sm text-gray-600 mb-2 block">已使用多久</label>
                        <div className="flex gap-2 flex-wrap">
                            {USAGE_DURATION_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => setUsageDuration(opt.value as UsageDuration)}
                                    className={`px-3 py-2 rounded-full text-sm ${usageDuration === opt.value
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 text-gray-600'
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 精确天数 */}
                    <div className="flex items-center justify-between py-3 border-t border-gray-100">
                        <span className="text-sm text-gray-600">精确使用天数</span>
                        <div className="flex items-center gap-2">
                            <Stepper
                                value={usageDays}
                                onChange={setUsageDays}
                                min={1}
                                max={365}
                                style={{ '--input-width': '60px' }}
                            />
                            <span className="text-sm text-gray-500">天</span>
                        </div>
                    </div>

                    {/* 是否仍在使用 */}
                    <div className="flex items-center justify-between py-3 border-t border-gray-100">
                        <span className="text-sm text-gray-600">是否仍在使用</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setStillInUse(true)}
                                className={`px-4 py-1 rounded-full text-sm ${stillInUse ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
                                    }`}
                            >
                                是
                            </button>
                            <button
                                onClick={() => setStillInUse(false)}
                                className={`px-4 py-1 rounded-full text-sm ${!stillInUse ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
                                    }`}
                            >
                                已弃用
                            </button>
                        </div>
                    </div>

                    {/* 是否会回购 */}
                    <div className="flex items-center justify-between py-3 border-t border-gray-100">
                        <span className="text-sm text-gray-600">是否会回购</span>
                        <div className="flex gap-2">
                            {[
                                { value: 'yes', label: '会' },
                                { value: 'no', label: '不会' },
                                { value: 'maybe', label: '不确定' },
                            ].map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => setWouldRepurchase(opt.value as typeof wouldRepurchase)}
                                    className={`px-3 py-1 rounded-full text-sm ${wouldRepurchase === opt.value
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

                {/* 维度评分 */}
                <div className="bg-white p-4 mb-3">
                    <h3 className="font-bold text-gray-800 mb-3">维度评分</h3>
                    <div className="space-y-4">
                        {RATING_DIMENSIONS.map((dim) => (
                            <div key={dim.key} className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">{dim.label}</span>
                                <Rate
                                    value={ratings[dim.key] || 0}
                                    onChange={(val) => setRatings({ ...ratings, [dim.key]: val })}
                                    style={{ '--star-size': '24px' }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* 评价内容 */}
                <div className="bg-white p-4 mb-3">
                    <h3 className="font-bold text-gray-800 mb-3">评价内容</h3>

                    {/* 一句话总结 */}
                    <div className="mb-4">
                        <label className="text-sm text-gray-600 mb-2 block">一句话总结 *</label>
                        <Input
                            placeholder="最多50字，概括使用体验"
                            value={summary}
                            onChange={setSummary}
                            maxLength={50}
                            style={{ '--font-size': '14px' }}
                        />
                        <div className="text-right text-xs text-gray-400 mt-1">{summary.length}/50</div>
                    </div>

                    {/* 详细评价 */}
                    <div>
                        <label className="text-sm text-gray-600 mb-2 block">详细评价 *</label>
                        <TextArea
                            placeholder="分享你的真实使用体验，帮助其他宝妈做决策"
                            value={content}
                            onChange={setContent}
                            rows={4}
                            maxLength={500}
                            showCount
                            style={{ '--font-size': '14px' }}
                        />
                    </div>

                    {/* 添加图片 */}
                    <div className="mt-4">
                        <button className="w-20 h-20 bg-gray-100 rounded-xl flex flex-col items-center justify-center gap-1 text-gray-400">
                            <Camera className="w-6 h-6" />
                            <span className="text-xs">添加图片</span>
                        </button>
                    </div>
                </div>

                {/* 替换信息 */}
                <div className="bg-white p-4 mb-3">
                    <h3 className="font-bold text-gray-800 mb-3">替换信息（选填）</h3>
                    <p className="text-xs text-gray-500 mb-3">如果这款产品是替换其他产品使用的，请填写</p>

                    <div className="mb-3">
                        <Input
                            placeholder="之前用的是什么产品？"
                            value={replaceFrom}
                            onChange={setReplaceFrom}
                            style={{ '--font-size': '14px' }}
                        />
                    </div>
                    <div>
                        <Input
                            placeholder="为什么换掉？"
                            value={replaceReason}
                            onChange={setReplaceReason}
                            style={{ '--font-size': '14px' }}
                        />
                    </div>
                </div>

                {/* 提交按钮 */}
                <div className="px-4 mt-4">
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-500 text-white py-3 rounded-full font-bold flex items-center justify-center gap-2"
                    >
                        <Check className="w-5 h-5" />
                        <span>发布评价</span>
                    </button>
                </div>
            </div>
        </MobileContainer>
    );
}
