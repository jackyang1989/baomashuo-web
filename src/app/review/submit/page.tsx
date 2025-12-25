'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toast, ProgressBar } from 'antd-mobile';
import { ArrowLeft, Search, ChevronRight, Star, CheckCircle, AlertCircle, Upload, ShieldCheck } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { reviewService, USE_DURATION_OPTIONS, ATTITUDE_OPTIONS, QUICK_TAGS, type SearchProduct } from '@/services/reviewService';
import type { RecommendAttitude, UsageDuration } from '@/types/review';

interface FormState {
    product: SearchProduct | null;
    useDuration: UsageDuration | null;
    attitude: RecommendAttitude | null;
    ratings: Record<string, number>;
    content: string;
    tags: string[];
    stillInUse: boolean | null;
    orderImage: string | null;
}

const RATING_DIMENSIONS = [
    { key: 'antiColic', label: '防胀气效果' },
    { key: 'babyAcceptance', label: '宝宝接受度' },
    { key: 'easyToClean', label: '清洗难度' },
    { key: 'valueForMoney', label: '性价比' },
    { key: 'durability', label: '耐用性' },
];

export default function ReviewSubmitPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
    const [submitting, setSubmitting] = useState(false);

    const [form, setForm] = useState<FormState>({
        product: null,
        useDuration: null,
        attitude: null,
        ratings: { antiColic: 0, babyAcceptance: 0, easyToClean: 0, valueForMoney: 0, durability: 0 },
        content: '',
        tags: [],
        stillInUse: null,
        orderImage: null,
    });

    useEffect(() => {
        reviewService.searchProducts('').then(setSearchResults);
    }, []);

    const handleSearch = async (query: string) => {
        setSearchQuery(query);
        const results = await reviewService.searchProducts(query);
        setSearchResults(results);
    };

    const handleSelectProduct = (product: SearchProduct) => {
        setForm({ ...form, product });
        setStep(2);
    };

    const handleRating = (key: string, score: number) => {
        setForm({ ...form, ratings: { ...form.ratings, [key]: score } });
    };

    const toggleTag = (tag: string) => {
        const tags = form.tags.includes(tag)
            ? form.tags.filter(t => t !== tag)
            : [...form.tags, tag];
        setForm({ ...form, tags });
    };

    const handleOrderImageUpload = () => {
        setForm({ ...form, orderImage: 'uploaded' });
        Toast.show({ content: '订单截图已上传', icon: 'success' });
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            const result = await reviewService.submitReview({
                productId: form.product?.id,
                attitude: form.attitude!,
                summary: form.content.substring(0, 50),
                content: form.content,
                tags: form.tags,
                stillInUse: form.stillInUse!,
                ratings: form.ratings as any,
                purchaseVerified: !!form.orderImage,
            });

            if (result.success) {
                const bonus = form.orderImage ? 20 : 0;
                Toast.show({ content: `发布成功！获得${result.points + bonus}积分`, icon: 'success' });
                router.push('/review');
            }
        } catch (error) {
            Toast.show({ content: '发布失败，请重试', icon: 'fail' });
        } finally {
            setSubmitting(false);
        }
    };

    const totalSteps = 3;
    const progress = (step / totalSteps) * 100;
    const canSubmit = form.content.length >= 20;

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F7F8FA', display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <div style={{
                    background: 'white',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #F3F4F6',
                    position: 'sticky',
                    top: 0,
                    zIndex: 50,
                }}>
                    <button onClick={() => step > 1 ? setStep(step - 1) : router.back()} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ArrowLeft size={20} color="#374151" />
                        <span style={{ fontSize: '17px', fontWeight: 'bold', color: '#1F2937' }}>发布评价</span>
                    </button>
                    <button onClick={() => reviewService.saveDraft(form as any).then(() => Toast.show({ content: '已保存草稿' }))}
                        style={{ background: 'none', border: 'none', fontSize: '14px', color: '#6B7280' }}>
                        草稿
                    </button>
                </div>

                {/* Progress */}
                <div style={{ background: 'white', padding: '12px 16px', borderBottom: '1px solid #F3F4F6' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>
                        <span>第 {step} 步，共 {totalSteps} 步</span>
                    </div>
                    <ProgressBar percent={progress} style={{ '--track-width': '6px', '--fill-color': 'linear-gradient(90deg, #3B82F6, #8B5CF6)' }} />
                </div>

                {/* Content */}
                <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>

                    {/* Step 1: Select Product */}
                    {step === 1 && (
                        <div>
                            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937', marginBottom: '8px' }}>选择产品</h2>
                            <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '16px' }}>搜索你要评价的产品</p>

                            <div style={{ position: 'relative', marginBottom: '16px' }}>
                                <Search size={18} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    placeholder="输入产品名称搜索..."
                                    style={{
                                        width: '100%',
                                        padding: '12px 12px 12px 40px',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: '12px',
                                        fontSize: '14px',
                                        outline: 'none',
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {searchResults.map((product) => (
                                    <button
                                        key={product.id}
                                        onClick={() => handleSelectProduct(product)}
                                        style={{
                                            background: 'white',
                                            border: '1px solid #E5E7EB',
                                            borderRadius: '12px',
                                            padding: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                        }}
                                    >
                                        <div style={{ width: '48px', height: '48px', background: '#F9FAFB', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                                            {product.image}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{product.brand}</div>
                                            <div style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>{product.name}</div>
                                        </div>
                                        <ChevronRight size={18} color="#D1D5DB" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Rate */}
                    {step === 2 && (
                        <div>
                            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937', marginBottom: '8px' }}>产品评分</h2>
                            <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '16px' }}>你的态度和分维度评分</p>

                            {form.product && (
                                <div style={{ background: '#F9FAFB', borderRadius: '12px', padding: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                                        {form.product.image}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{form.product.brand}</div>
                                        <div style={{ fontSize: '13px', fontWeight: '500', color: '#1F2937' }}>{form.product.name}</div>
                                    </div>
                                    <button onClick={() => setStep(1)} style={{ fontSize: '13px', color: '#3B82F6', background: 'none', border: 'none' }}>更换</button>
                                </div>
                            )}

                            {/* Attitude */}
                            <div style={{ marginBottom: '24px' }}>
                                <div style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937', marginBottom: '12px' }}>你的态度 <span style={{ color: '#EF4444' }}>*</span></div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                                    {ATTITUDE_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => setForm({ ...form, attitude: opt.value })}
                                            style={{
                                                padding: '16px 8px',
                                                borderRadius: '12px',
                                                border: form.attitude === opt.value ? '2px solid' : '1px solid #E5E7EB',
                                                borderColor: form.attitude === opt.value ? (opt.color === 'green' ? '#10B981' : opt.color === 'red' ? '#EF4444' : '#6B7280') : '#E5E7EB',
                                                background: form.attitude === opt.value ? (opt.color === 'green' ? '#ECFDF5' : opt.color === 'red' ? '#FEF2F2' : '#F9FAFB') : 'white',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <div style={{ fontSize: '28px', marginBottom: '4px' }}>{opt.icon}</div>
                                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>{opt.label}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Dimension Ratings */}
                            <div style={{ marginBottom: '24px' }}>
                                {RATING_DIMENSIONS.map((dim) => (
                                    <div key={dim.key} style={{ marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '14px', color: '#374151' }}>{dim.label}</span>
                                            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#3B82F6' }}>{form.ratings[dim.key]}.0</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            {[1, 2, 3, 4, 5].map((score) => (
                                                <button key={score} onClick={() => handleRating(dim.key, score)} style={{ flex: 1, background: 'none', border: 'none', cursor: 'pointer' }}>
                                                    <Star size={28} color={score <= form.ratings[dim.key] ? '#FBBF24' : '#E5E7EB'} fill={score <= form.ratings[dim.key] ? '#FBBF24' : 'none'} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Use Duration */}
                            <div style={{ marginBottom: '24px' }}>
                                <div style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937', marginBottom: '12px' }}>使用时长 <span style={{ color: '#EF4444' }}>*</span></div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                                    {USE_DURATION_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => setForm({ ...form, useDuration: opt.value })}
                                            style={{
                                                padding: '12px',
                                                borderRadius: '12px',
                                                border: form.useDuration === opt.value ? '2px solid #3B82F6' : '1px solid #E5E7EB',
                                                background: form.useDuration === opt.value ? '#EFF6FF' : 'white',
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                            }}
                                        >
                                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>{opt.label}</div>
                                            <div style={{ fontSize: '11px', color: '#3B82F6' }}>{opt.badge}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => setStep(3)}
                                disabled={!form.attitude || !form.useDuration}
                                style={{
                                    width: '100%',
                                    padding: '14px',
                                    borderRadius: '12px',
                                    border: 'none',
                                    background: form.attitude && form.useDuration ? 'linear-gradient(90deg, #3B82F6, #2563EB)' : '#E5E7EB',
                                    color: form.attitude && form.useDuration ? 'white' : '#9CA3AF',
                                    fontSize: '15px',
                                    fontWeight: '600',
                                    cursor: form.attitude && form.useDuration ? 'pointer' : 'not-allowed',
                                }}
                            >
                                下一步
                            </button>
                        </div>
                    )}

                    {/* Step 3: Write (Simplified - single content field + order upload) */}
                    {step === 3 && (
                        <div>
                            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937', marginBottom: '8px' }}>写评价</h2>
                            <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '16px' }}>分享你的真实体验</p>

                            {/* Single Content Field */}
                            <div style={{ marginBottom: '16px' }}>
                                <div style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937', marginBottom: '8px' }}>评价内容 <span style={{ color: '#EF4444' }}>*</span></div>
                                <textarea
                                    value={form.content}
                                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                                    placeholder="分享使用感受、宝宝反应、优缺点... (至少20字)"
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: '12px',
                                        fontSize: '14px',
                                        outline: 'none',
                                        height: '140px',
                                        resize: 'none',
                                    }}
                                />
                                <div style={{ fontSize: '11px', color: form.content.length >= 20 ? '#10B981' : '#9CA3AF', textAlign: 'right', marginTop: '4px' }}>
                                    {form.content.length}/500 {form.content.length < 20 && `(还需${20 - form.content.length}字)`}
                                </div>
                            </div>

                            {/* Order Image Upload */}
                            <div style={{ marginBottom: '20px' }}>
                                <div style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937', marginBottom: '8px' }}>
                                    上传订单截图 <span style={{ fontSize: '12px', fontWeight: 'normal', color: '#6B7280' }}>（选填，+20积分）</span>
                                </div>
                                <button
                                    onClick={handleOrderImageUpload}
                                    style={{
                                        width: '100%',
                                        padding: '20px',
                                        border: form.orderImage ? '2px solid #10B981' : '2px dashed #D1D5DB',
                                        borderRadius: '12px',
                                        background: form.orderImage ? '#ECFDF5' : 'white',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '8px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {form.orderImage ? (
                                        <>
                                            <ShieldCheck size={28} color="#10B981" />
                                            <span style={{ fontSize: '14px', color: '#059669', fontWeight: '600' }}>已上传订单截图</span>
                                            <span style={{ fontSize: '11px', color: '#6B7280' }}>获得认证徽章 + 20积分</span>
                                        </>
                                    ) : (
                                        <>
                                            <Upload size={28} color="#9CA3AF" />
                                            <span style={{ fontSize: '14px', color: '#6B7280' }}>点击上传订单截图</span>
                                            <span style={{ fontSize: '11px', color: '#9CA3AF' }}>真实购买用户更受信任</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Quick Tags */}
                            <div style={{ marginBottom: '16px' }}>
                                <div style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937', marginBottom: '12px' }}>快速标签</div>
                                <div style={{ marginBottom: '12px' }}>
                                    <div style={{ fontSize: '11px', color: '#059669', marginBottom: '8px' }}>优点</div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {QUICK_TAGS.positive.map((tag) => (
                                            <button
                                                key={tag}
                                                onClick={() => toggleTag(tag)}
                                                style={{
                                                    padding: '6px 12px',
                                                    borderRadius: '16px',
                                                    border: 'none',
                                                    background: form.tags.includes(tag) ? '#10B981' : '#ECFDF5',
                                                    color: form.tags.includes(tag) ? 'white' : '#059669',
                                                    fontSize: '12px',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '11px', color: '#DC2626', marginBottom: '8px' }}>缺点</div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {QUICK_TAGS.negative.map((tag) => (
                                            <button
                                                key={tag}
                                                onClick={() => toggleTag(tag)}
                                                style={{
                                                    padding: '6px 12px',
                                                    borderRadius: '16px',
                                                    border: 'none',
                                                    background: form.tags.includes(tag) ? '#EF4444' : '#FEF2F2',
                                                    color: form.tags.includes(tag) ? 'white' : '#DC2626',
                                                    fontSize: '12px',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Still in use */}
                            <div style={{ marginBottom: '24px' }}>
                                <div style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937', marginBottom: '12px' }}>现在还在用吗？</div>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button
                                        onClick={() => setForm({ ...form, stillInUse: true })}
                                        style={{
                                            flex: 1,
                                            padding: '12px',
                                            borderRadius: '12px',
                                            border: form.stillInUse === true ? '2px solid #10B981' : '1px solid #E5E7EB',
                                            background: form.stillInUse === true ? '#ECFDF5' : 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <CheckCircle size={18} color="#10B981" />
                                        <span style={{ fontSize: '14px', color: '#1F2937' }}>仍在使用</span>
                                    </button>
                                    <button
                                        onClick={() => setForm({ ...form, stillInUse: false })}
                                        style={{
                                            flex: 1,
                                            padding: '12px',
                                            borderRadius: '12px',
                                            border: form.stillInUse === false ? '2px solid #EF4444' : '1px solid #E5E7EB',
                                            background: form.stillInUse === false ? '#FEF2F2' : 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <AlertCircle size={18} color="#EF4444" />
                                        <span style={{ fontSize: '14px', color: '#1F2937' }}>已弃用</span>
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                onClick={handleSubmit}
                                disabled={submitting || !canSubmit}
                                style={{
                                    width: '100%',
                                    padding: '14px',
                                    borderRadius: '12px',
                                    border: 'none',
                                    background: canSubmit ? 'linear-gradient(90deg, #3B82F6, #8B5CF6)' : '#E5E7EB',
                                    color: canSubmit ? 'white' : '#9CA3AF',
                                    fontSize: '15px',
                                    fontWeight: '600',
                                    cursor: canSubmit ? 'pointer' : 'not-allowed',
                                }}
                            >
                                {submitting ? '发布中...' : '发布评价'}
                            </button>

                            {/* Reward hint */}
                            <div style={{ marginTop: '16px', background: '#FEF3C7', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                                <span style={{ fontSize: '13px', color: '#92400E' }}>
                                    🎁 发布评价 <strong>+50积分</strong>
                                    {form.orderImage && <> + 订单认证 <strong>+20积分</strong></>}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </MobileContainer>
    );
}
