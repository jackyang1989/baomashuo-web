'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toast } from 'antd-mobile';
import { ArrowLeft, X, Camera, Image, Video, Smile, Hash, Package, AlertCircle, Gift, ChevronRight } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { createPostService, type PostType, type HotTopic, type MilestoneOption, type BabyOption, type CreatePostData } from '@/services/createPostService';

export default function CreatePostPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [postType, setPostType] = useState<string | null>(null);

    const [postTypes, setPostTypes] = useState<PostType[]>([]);
    const [hotTopics, setHotTopics] = useState<HotTopic[]>([]);
    const [milestones, setMilestones] = useState<MilestoneOption[]>([]);
    const [babies, setBabies] = useState<BabyOption[]>([]);
    const [rewardOptions, setRewardOptions] = useState<number[]>([]);

    const [formData, setFormData] = useState<CreatePostData>({
        type: '',
        title: '',
        content: '',
        images: [],
        topics: [],
        visibility: 'public',
        allowComment: true,
        reward: 0,
    });

    useEffect(() => {
        createPostService.getPostTypes().then(setPostTypes);
        createPostService.getHotTopics().then(setHotTopics);
        createPostService.getMilestones().then(setMilestones);
        createPostService.getBabies().then(setBabies);
        createPostService.getRewardOptions().then(setRewardOptions);
    }, []);

    const handleSelectType = (typeId: string) => {
        setPostType(typeId);
        setFormData({ ...formData, type: typeId });
        setStep(2);
    };

    const handleImageUpload = () => {
        if (formData.images.length < 9) {
            setFormData({ ...formData, images: [...formData.images, '📸'] });
        }
    };

    const handleRemoveImage = (index: number) => {
        setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });
    };

    const handleAddTopic = (topicName: string) => {
        if (!formData.topics.includes(topicName) && formData.topics.length < 3) {
            setFormData({ ...formData, topics: [...formData.topics, topicName] });
        }
    };

    const handleRemoveTopic = (topicName: string) => {
        setFormData({ ...formData, topics: formData.topics.filter(t => t !== topicName) });
    };

    const handleSubmit = async () => {
        if (!formData.content.trim()) {
            Toast.show({ content: '请输入内容' });
            return;
        }
        if (postType === 'recommend' && !formData.linkedProductId) {
            Toast.show({ content: '请关联产品' });
            return;
        }
        const result = await createPostService.createPost(formData);
        if (result.success) {
            Toast.show({ content: `发布成功！获得${result.points}积分` });
            router.push('/community');
        }
    };

    const renderTypeSelection = () => (
        <div style={{ padding: '16px' }}>
            <div style={{ marginBottom: '16px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937', marginBottom: '4px' }}>选择发布类型</h2>
                <p style={{ fontSize: '14px', color: '#6B7280' }}>不同类型有不同的展示和互动方式</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {postTypes.map((type) => (
                    <button
                        key={type.id}
                        onClick={() => handleSelectType(type.id)}
                        style={{
                            background: 'white',
                            borderRadius: '16px',
                            padding: '16px',
                            border: '2px solid #E5E7EB',
                            textAlign: 'left',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {type.badge && (
                            <div style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '10px', background: '#EF4444', color: 'white', padding: '2px 8px', borderRadius: '10px' }}>
                                {type.badge}
                            </div>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                                backgroundImage: type.color.includes('blue') ? 'linear-gradient(135deg, #3B82F6, #06B6D4)' :
                                    type.color.includes('orange') ? 'linear-gradient(135deg, #F97316, #EF4444)' :
                                        type.color.includes('green') ? 'linear-gradient(135deg, #22C55E, #10B981)' :
                                            type.color.includes('purple') ? 'linear-gradient(135deg, #8B5CF6, #EC4899)' :
                                                'linear-gradient(135deg, #6366F1, #3B82F6)',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '24px',
                            }}>
                                {type.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 'bold', color: '#1F2937', marginBottom: '2px' }}>{type.name}</div>
                                <div style={{ fontSize: '12px', color: '#6B7280' }}>{type.desc}</div>
                            </div>
                            <ChevronRight size={20} color="#9CA3AF" />
                        </div>
                    </button>
                ))}
            </div>

            <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '12px', padding: '12px', marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <AlertCircle size={16} color="#3B82F6" style={{ marginTop: '2px' }} />
                    <div style={{ fontSize: '12px', color: '#1E40AF' }}>
                        <div style={{ fontWeight: '600', marginBottom: '4px' }}>发帖提示</div>
                        <div>• 真实分享，尊重他人</div>
                        <div>• 不发布广告营销内容</div>
                        <div>• 保护个人隐私信息</div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderEditor = () => (
        <div style={{ flex: 1, overflow: 'auto', padding: '16px', paddingBottom: '140px' }}>
            {/* Title (for help/recommend) */}
            {(postType === 'help' || postType === 'recommend') && (
                <div style={{ marginBottom: '16px' }}>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder={postType === 'help' ? '描述你的问题...' : '推荐的产品是什么？'}
                        maxLength={50}
                        style={{ width: '100%', fontSize: '18px', fontWeight: '600', padding: '8px 0', border: 'none', borderBottom: '2px solid #E5E7EB', outline: 'none' }}
                    />
                    <div style={{ fontSize: '11px', color: '#9CA3AF', textAlign: 'right', marginTop: '4px' }}>{formData.title?.length || 0}/50</div>
                </div>
            )}

            {/* Milestone Selection */}
            {postType === 'milestone' && (
                <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>选择里程碑</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                        {milestones.map((m) => (
                            <button
                                key={m.id}
                                onClick={() => setFormData({ ...formData, milestone: m.id })}
                                style={{
                                    padding: '12px',
                                    borderRadius: '12px',
                                    border: '2px solid',
                                    borderColor: formData.milestone === m.id ? '#FBBF24' : '#E5E7EB',
                                    background: formData.milestone === m.id ? '#FEF3C7' : 'white',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                }}
                            >
                                <div style={{ fontSize: '24px', marginBottom: '4px' }}>{m.icon}</div>
                                <div style={{ fontSize: '12px', fontWeight: '500', color: '#374151' }}>{m.name}</div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Content */}
            <div style={{ marginBottom: '16px' }}>
                <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder={
                        postType === 'help' ? '详细描述你遇到的问题，包括宝宝的情况、你尝试过的方法等...' :
                            postType === 'recommend' ? '分享产品的使用体验、优缺点、适合什么样的宝宝...' :
                                postType === 'milestone' ? '记录这个特别的时刻，分享你的心情和经验...' :
                                    '分享你的经验、想法、日常...'
                    }
                    maxLength={2000}
                    style={{ width: '100%', minHeight: '200px', padding: '8px 0', border: 'none', outline: 'none', resize: 'none', fontSize: '15px', lineHeight: 1.6 }}
                />
                <div style={{ fontSize: '11px', color: '#9CA3AF', textAlign: 'right' }}>{formData.content.length}/2000</div>
            </div>

            {/* Images */}
            <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    {formData.images.map((img, index) => (
                        <div key={index} style={{ position: 'relative', aspectRatio: '1' }}>
                            <div style={{ width: '100%', height: '100%', background: '#F3F4F6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px' }}>{img}</div>
                            <button onClick={() => handleRemoveImage(index)} style={{ position: 'absolute', top: '-8px', right: '-8px', width: '24px', height: '24px', background: '#EF4444', color: 'white', borderRadius: '50%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                    {formData.images.length < 9 && (
                        <button onClick={handleImageUpload} style={{ aspectRatio: '1', border: '2px dashed #D1D5DB', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', background: 'none', cursor: 'pointer' }}>
                            <Camera size={24} color="#9CA3AF" />
                            <span style={{ fontSize: '11px', color: '#9CA3AF' }}>添加图片</span>
                        </button>
                    )}
                </div>
                <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '8px' }}>最多上传9张图片</div>
            </div>

            {/* Link Product (for recommend) */}
            {postType === 'recommend' && (
                <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>关联产品</div>
                    {formData.linkedProductId ? (
                        <div style={{ background: '#F9FAFB', borderRadius: '12px', padding: '12px', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '48px', height: '48px', background: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🍼</div>
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>Comotomo奶瓶</div>
                                    <div style={{ fontSize: '12px', color: '#9CA3AF' }}>¥128</div>
                                </div>
                            </div>
                            <button onClick={() => setFormData({ ...formData, linkedProductId: undefined })} style={{ color: '#EF4444', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer' }}>移除</button>
                        </div>
                    ) : (
                        <button onClick={() => setFormData({ ...formData, linkedProductId: 'p1' })} style={{ width: '100%', background: '#EFF6FF', border: '2px dashed #BFDBFE', borderRadius: '12px', padding: '16px', cursor: 'pointer' }}>
                            <Package size={24} color="#3B82F6" style={{ margin: '0 auto 4px' }} />
                            <div style={{ fontSize: '14px', color: '#3B82F6', fontWeight: '500' }}>搜索产品</div>
                        </button>
                    )}
                </div>
            )}

            {/* Topics */}
            <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>添加话题</span>
                    <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{formData.topics.length}/3</span>
                </div>

                {formData.topics.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                        {formData.topics.map((topic) => (
                            <div key={topic} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#DBEAFE', color: '#1E40AF', padding: '4px 12px', borderRadius: '12px', fontSize: '13px' }}>
                                #{topic}
                                <button onClick={() => handleRemoveTopic(topic)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={12} /></button>
                            </div>
                        ))}
                    </div>
                )}

                <div style={{ background: '#F9FAFB', borderRadius: '12px', padding: '12px' }}>
                    <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '8px' }}>热门话题</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {hotTopics.map((topic) => (
                            <button
                                key={topic.id}
                                onClick={() => handleAddTopic(topic.name)}
                                disabled={formData.topics.length >= 3}
                                style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', background: 'white', border: '1px solid #E5E7EB', borderRadius: '12px', fontSize: '12px', cursor: 'pointer', opacity: formData.topics.length >= 3 ? 0.5 : 1 }}
                            >
                                <span>{topic.icon}</span><span>{topic.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Baby Selection */}
            <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>关联宝宝</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {babies.map((baby) => (
                        <button
                            key={baby.id}
                            onClick={() => setFormData({ ...formData, babyId: baby.id })}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '8px',
                                background: formData.babyId === baby.id ? '#8B5CF6' : '#F3F4F6',
                                color: formData.babyId === baby.id ? 'white' : '#374151',
                                border: 'none',
                                fontSize: '13px',
                                fontWeight: '500',
                                cursor: 'pointer',
                            }}
                        >
                            👶 {baby.name} ({baby.age})
                        </button>
                    ))}
                    <button style={{ padding: '8px 16px', border: '2px dashed #D1D5DB', borderRadius: '8px', background: 'none', fontSize: '13px', color: '#6B7280', cursor: 'pointer' }}>
                        + 添加宝宝
                    </button>
                </div>
            </div>

            {/* Reward (for help) */}
            {postType === 'help' && (
                <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>设置悬赏（可选）</div>
                    <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '12px', padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <Gift size={18} color="#D97706" />
                            <span style={{ fontSize: '14px', fontWeight: '500', color: '#92400E' }}>悬赏积分</span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {rewardOptions.map((amount) => (
                                <button
                                    key={amount}
                                    onClick={() => setFormData({ ...formData, reward: amount })}
                                    style={{
                                        flex: 1,
                                        padding: '8px',
                                        borderRadius: '8px',
                                        background: formData.reward === amount ? '#F59E0B' : 'white',
                                        color: formData.reward === amount ? 'white' : '#374151',
                                        border: formData.reward === amount ? 'none' : '1px solid #E5E7EB',
                                        fontSize: '12px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {amount === 0 ? '不悬赏' : `${amount}积分`}
                                </button>
                            ))}
                        </div>
                        <div style={{ fontSize: '11px', color: '#92400E', marginTop: '8px' }}>当前积分：2850 • 设置悬赏可提高回答积极性</div>
                    </div>
                </div>
            )}

            {/* Settings */}
            <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>发布设置</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F9FAFB', borderRadius: '12px', padding: '12px' }}>
                        <span style={{ fontSize: '14px', color: '#374151' }}>谁可以看</span>
                        <button style={{ fontSize: '14px', color: '#3B82F6', fontWeight: '500', background: 'none', border: 'none' }}>所有人 →</button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F9FAFB', borderRadius: '12px', padding: '12px' }}>
                        <span style={{ fontSize: '14px', color: '#374151' }}>允许评论</span>
                        <button
                            onClick={() => setFormData({ ...formData, allowComment: !formData.allowComment })}
                            style={{
                                width: '48px',
                                height: '24px',
                                borderRadius: '12px',
                                background: formData.allowComment ? '#3B82F6' : '#D1D5DB',
                                border: 'none',
                                position: 'relative',
                                cursor: 'pointer',
                            }}
                        >
                            <div style={{
                                width: '20px',
                                height: '20px',
                                background: 'white',
                                borderRadius: '50%',
                                position: 'absolute',
                                top: '2px',
                                left: formData.allowComment ? '26px' : '2px',
                                transition: 'left 0.2s',
                            }} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F7F8FA', display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <div style={{ background: 'white', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                    <button onClick={() => step === 1 ? router.back() : setStep(1)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none' }}>
                        {step === 1 ? <X size={20} /> : <ArrowLeft size={20} />}
                        <span style={{ fontWeight: '600' }}>{step === 1 ? '取消' : '发布'}</span>
                    </button>
                    {step === 2 && (
                        <button style={{ fontSize: '14px', color: '#6B7280', background: 'none', border: 'none' }}>草稿箱</button>
                    )}
                </div>

                {/* Content */}
                {step === 1 ? renderTypeSelection() : renderEditor()}

                {/* Bottom Bar */}
                {step === 2 && (
                    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, maxWidth: '515px', margin: '0 auto', background: 'white', borderTop: '1px solid #E5E7EB', padding: '12px 16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <button onClick={handleImageUpload} style={{ color: '#6B7280', background: 'none', border: 'none' }}><Image size={24} /></button>
                                <button style={{ color: '#6B7280', background: 'none', border: 'none' }}><Video size={24} /></button>
                                <button style={{ color: '#6B7280', background: 'none', border: 'none' }}><Smile size={24} /></button>
                                <button style={{ color: '#6B7280', background: 'none', border: 'none' }}><Hash size={24} /></button>
                            </div>
                            <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{formData.content.length}/2000</span>
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={!formData.content.trim() || (postType === 'recommend' && !formData.linkedProductId)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '12px',
                                background: formData.content.trim() && (postType !== 'recommend' || formData.linkedProductId) ? 'linear-gradient(135deg, #3B82F6, #8B5CF6)' : '#E5E7EB',
                                color: formData.content.trim() && (postType !== 'recommend' || formData.linkedProductId) ? 'white' : '#9CA3AF',
                                border: 'none',
                                fontWeight: 'bold',
                                fontSize: '15px',
                                cursor: 'pointer',
                            }}
                        >
                            发布
                        </button>
                    </div>
                )}
            </div>
        </MobileContainer>
    );
}
