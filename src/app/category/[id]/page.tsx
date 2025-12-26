'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ThumbsUp, MessageCircle, Sparkles, AlertTriangle, Baby, HelpCircle, GitCompare } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';

// 品类配置
const CATEGORY_CONFIG: Record<string, {
    name: string;
    icon: string;
    color: string;
    subtitle: string;
    decisionPaths: Array<{ id: string; icon: string; title: string; subtitle: string; tags: string[]; desc: string }>;
    aiConclusions: string[];
    pitfalls: string[];
    products: Array<{ id: string; name: string; image: string; likes: number; pros: string[]; cons: string[]; suitable: string }>;
    experiences: Array<{ id: number; user: { name: string; avatar: string; stage: string }; content: string; agrees: number }>;
}> = {
    bottle: {
        name: '奶瓶',
        icon: '🍼',
        color: '#3B82F6',
        subtitle: '90%宝妈踩坑，都是第一步选错',
        decisionPaths: [
            { id: 'age', icon: '👶', title: '按宝宝月龄选', subtitle: '新手宝妈首选', tags: ['0-3个月', '3-6个月', '6-12个月'], desc: '根据宝宝发育阶段，推荐最适合的奶瓶' },
            { id: 'problem', icon: '😣', title: '按问题场景选', subtitle: '已踩坑宝妈快速解决', tags: ['胀气', '拒奶瓶', '夜奶多', '漏奶'], desc: '遇到问题？直接匹配解决方案' },
            { id: 'compare', icon: '🆚', title: '品牌/型号对比', subtitle: '犹豫型宝妈', tags: ['同价位', '同品牌', '通用性'], desc: '不知道选哪个？帮你对比着选' },
        ],
        aiConclusions: [
            '0-3个月防胀气 > 品牌',
            '宽口≠一定好吸，要看奶嘴设计',
            '奶嘴比瓶身更重要，别只看瓶子',
        ],
        pitfalls: [
            '宝宝不吃 ≠ 奶瓶不好，可能是奶嘴问题',
            '防胀气 ≠ 一定不胀气，喂养姿势也关键',
            '配件不通用是大坑，换品牌前先查',
        ],
        products: [
            { id: 'b1', name: 'Comotomo可么多么', image: '🍼', likes: 320, pros: ['防胀气好', '高接受度'], cons: ['清洗稍麻烦'], suitable: '适合胀气/转奶困难宝宝' },
            { id: 'b2', name: 'Pigeon贝亲', image: '🍼', likes: 280, pros: ['性价比高', '经典耐用'], cons: ['奶嘴偏软'], suitable: '适合日常使用/新手' },
            { id: 'b3', name: "Dr.Brown's布朗博士", image: '🍼', likes: 256, pros: ['导气管专业', '防呛奶'], cons: ['配件多'], suitable: '适合吐奶/呛奶宝宝' },
        ],
        experiences: [
            { id: 1, user: { name: '小雨妈妈', avatar: '👩', stage: '3个月' }, content: '换了3个，才知道不是越贵越好', agrees: 234 },
            { id: 2, user: { name: '安安妈妈', avatar: '👱‍♀️', stage: '新手' }, content: '原来奶嘴阶段比瓶身重要', agrees: 189 },
        ],
    },
    nipple: {
        name: '奶嘴',
        icon: '🔵',
        color: '#8B5CF6',
        subtitle: '奶嘴选错，宝宝拒奶很头疼',
        decisionPaths: [
            { id: 'stage', icon: '📊', title: '按阶段/流速选', subtitle: '匹配宝宝吸吮能力', tags: ['新生儿S号', 'M号中速', 'L号快速'], desc: '流速不对会呛奶或吃不饱' },
            { id: 'problem', icon: '😣', title: '按问题场景选', subtitle: '解决抗拒/咬奶嘴问题', tags: ['抗拒奶嘴', '咬奶嘴', '漏奶', '不含住'], desc: '宝宝不配合？帮你找原因' },
            { id: 'material', icon: '🧪', title: '按材质/品牌选', subtitle: '硅胶/乳胶对比', tags: ['硅胶', '乳胶', '仿母乳'], desc: '不同材质手感差别大' },
        ],
        aiConclusions: [
            '新生儿一定用S号慢流速',
            '硅胶比乳胶更耐用，但乳胶更软',
            '奶嘴3个月换一次，别等咬坏',
        ],
        pitfalls: [
            '选大了会呛奶，宁小勿大',
            '不同品牌奶嘴不一定通用',
            '奶嘴变黄/变形要立刻换',
        ],
        products: [
            { id: 'n1', name: 'Pigeon贝亲仿母乳', image: '🔵', likes: 245, pros: ['柔软接近母乳', '接受度高'], cons: ['易老化'], suitable: '适合母乳转奶瓶' },
            { id: 'n2', name: 'Comotomo硅胶奶嘴', image: '🔵', likes: 198, pros: ['超软硅胶', '防胀气'], cons: ['价格略高'], suitable: '适合敏感宝宝' },
            { id: 'n3', name: 'NUK宽口奶嘴', image: '🔵', likes: 167, pros: ['扁平仿真', '德国品质'], cons: ['需适应'], suitable: '适合扁平奶嘴喜好' },
        ],
        experiences: [
            { id: 1, user: { name: '豆豆妈', avatar: '👩‍🦰', stage: '4个月' }, content: '换了仿母乳奶嘴后终于愿意吃了', agrees: 176 },
            { id: 2, user: { name: '糖糖妈', avatar: '👩', stage: '新手' }, content: '新生儿建议S号，流速太快会呛', agrees: 145 },
        ],
    },
    accessory: {
        name: '奶瓶配件',
        icon: '🧴',
        color: '#10B981',
        subtitle: '配件选对，带娃省心一半',
        decisionPaths: [
            { id: 'type', icon: '🧹', title: '按配件类型选', subtitle: '清洗/消毒/外出', tags: ['奶瓶刷', '消毒器', '保温袋', '奶瓶夹'], desc: '不同场景需要不同配件' },
            { id: 'brand', icon: '🏷️', title: '按品牌适配选', subtitle: '确保通用性', tags: ['Comotomo', 'Pigeon', "Dr.Brown's", '通用'], desc: '配件不通用是大坑' },
            { id: 'scene', icon: '🎒', title: '按场景需求选', subtitle: '居家/外出/旅行', tags: ['居家必备', '外出便携', '旅行套装'], desc: '按使用场景配齐' },
        ],
        aiConclusions: [
            '消毒器 > 水煮，省时省力',
            '奶瓶刷要定期换，别等发霉',
            '外出保温袋是带娃神器',
        ],
        pitfalls: [
            '配件和奶瓶品牌要匹配',
            '便宜消毒器可能消毒不彻底',
            '硅胶配件不能用沸水消毒',
        ],
        products: [
            { id: 'a1', name: 'Babycare奶瓶刷套装', image: '🧹', likes: 312, pros: ['刷头柔软', '多功能'], cons: ['需定期换'], suitable: '适合日常清洗' },
            { id: 'a2', name: '小白熊蒸汽消毒器', image: '♨️', likes: 287, pros: ['大容量', '消毒彻底'], cons: ['占地较大'], suitable: '适合居家使用' },
            { id: 'a3', name: 'bbox保温袋', image: '🎒', likes: 198, pros: ['保温好', '便携'], cons: ['容量有限'], suitable: '适合外出携带' },
        ],
        experiences: [
            { id: 1, user: { name: '米粒妈妈', avatar: '👱‍♀️', stage: '6个月' }, content: '蒸汽消毒真的比水煮方便太多', agrees: 198 },
            { id: 2, user: { name: '小七妈', avatar: '👩‍🦰', stage: '8个月' }, content: '保温袋是外出带娃神器', agrees: 134 },
        ],
    },
};

export default function CategoryHubPage() {
    const router = useRouter();
    const params = useParams();
    const categoryId = (params?.id as string) || 'bottle';

    const config = CATEGORY_CONFIG[categoryId] || CATEGORY_CONFIG.bottle;

    const handleDecisionPath = (pathId: string, tag?: string) => {
        const params = new URLSearchParams();
        params.set('category', categoryId);
        params.set('path', pathId);
        if (tag) params.set('filter', tag);
        router.push(`/decision?${params.toString()}`);
    };

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F7F8FA', paddingBottom: '80px' }}>
                {/* 顶部导航 */}
                <div style={{ background: config.color, padding: '16px', color: 'white' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: 'white' }}>
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{config.icon} {config.name}怎么选</div>
                        </div>
                    </div>
                    <div style={{ fontSize: '13px', opacity: 0.9 }}>{config.subtitle}</div>
                </div>

                {/* ① 决策主入口 */}
                <div style={{ padding: '16px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#6B7280', marginBottom: '12px' }}>👉 选一个开始，帮你精准匹配</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {config.decisionPaths.map((path) => (
                            <div
                                key={path.id}
                                onClick={() => handleDecisionPath(path.id)}
                                style={{ background: 'white', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', cursor: 'pointer' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                    <div style={{ width: '48px', height: '48px', background: `${config.color}15`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>
                                        {path.icon}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div>
                                                <div style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937' }}>{path.title}</div>
                                                <div style={{ fontSize: '12px', color: config.color }}>{path.subtitle}</div>
                                            </div>
                                            <ChevronRight size={18} color="#9CA3AF" />
                                        </div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
                                            {path.tags.map((tag, i) => (
                                                <button
                                                    key={i}
                                                    onClick={(e) => { e.stopPropagation(); handleDecisionPath(path.id, tag); }}
                                                    style={{ fontSize: '11px', background: '#F3F4F6', color: '#6B7280', padding: '5px 10px', borderRadius: '6px', border: 'none' }}
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>
                                        <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '8px' }}>{path.desc}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ② AI结论 */}
                <div style={{ padding: '0 16px 16px' }}>
                    <div style={{ background: '#FFFBEB', borderRadius: '16px', padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <Sparkles size={18} color="#F59E0B" />
                            <span style={{ fontSize: '14px', fontWeight: '600', color: '#92400E' }}>{config.name}选购 3 个关键结论</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {config.aiConclusions.map((c, i) => (
                                <div key={i} style={{ fontSize: '13px', color: '#78350F', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                    <span style={{ width: '20px', height: '20px', background: '#FCD34D', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold', color: '#78350F', flexShrink: 0 }}>{i + 1}</span>
                                    {c}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ③ 精选口碑产品 */}
                <div style={{ padding: '0 16px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1F2937' }}>🏆 {config.name}口碑前3</div>
                        <Link href={`/select/results?category=${categoryId}`} style={{ fontSize: '12px', color: config.color, textDecoration: 'none' }}>查看更多</Link>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {config.products.map((product) => (
                            <Link key={product.id} href={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                                <div style={{ background: 'white', borderRadius: '14px', padding: '14px', display: 'flex', gap: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                                    <div style={{ width: '64px', height: '64px', background: '#F9FAFB', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', flexShrink: 0 }}>
                                        {product.image}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>{product.name}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                                            <ThumbsUp size={12} color="#10B981" />
                                            <span style={{ fontSize: '12px', color: '#10B981', fontWeight: '500' }}>{product.likes}位宝妈认可</span>
                                        </div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '6px' }}>
                                            {product.pros.map((p, i) => (
                                                <span key={i} style={{ fontSize: '10px', color: '#059669', background: '#ECFDF5', padding: '2px 6px', borderRadius: '4px' }}>✓ {p}</span>
                                            ))}
                                            {product.cons.map((c, i) => (
                                                <span key={i} style={{ fontSize: '10px', color: '#D97706', background: '#FEF3C7', padding: '2px 6px', borderRadius: '4px' }}>⚠ {c}</span>
                                            ))}
                                        </div>
                                        <div style={{ fontSize: '11px', color: config.color }}>→ {product.suitable}</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* ④ 高频避坑速览 */}
                <div style={{ padding: '0 16px 16px' }}>
                    <div style={{ background: '#FEF2F2', borderRadius: '14px', padding: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                            <AlertTriangle size={16} color="#DC2626" />
                            <span style={{ fontSize: '14px', fontWeight: '600', color: '#DC2626' }}>{config.name}常见踩坑</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '10px' }}>
                            {config.pitfalls.map((p, i) => (
                                <div key={i} style={{ fontSize: '12px', color: '#7F1D1D' }}>• {p}</div>
                            ))}
                        </div>
                        <Link href="/pitfalls" style={{ fontSize: '12px', color: '#DC2626', textDecoration: 'none' }}>
                            → 查看完整避坑清单
                        </Link>
                    </div>
                </div>

                {/* ⑤ 真实宝妈短经验 */}
                <div style={{ padding: '0 16px 16px' }}>
                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1F2937', marginBottom: '12px' }}>💬 宝妈真实使用</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {config.experiences.map((exp) => (
                            <div key={exp.id} style={{ background: 'white', borderRadius: '12px', padding: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '24px' }}>{exp.user.avatar}</span>
                                    <div>
                                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1F2937' }}>{exp.user.name}</div>
                                        <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{exp.user.stage}</div>
                                    </div>
                                </div>
                                <div style={{ fontSize: '13px', color: '#374151', lineHeight: 1.5, marginBottom: '10px' }}>"{exp.content}"</div>
                                <button style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '16px', fontSize: '11px', color: '#059669' }}>
                                    <ThumbsUp size={12} />
                                    我也踩过 {exp.agrees}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 底部导航 */}
                <div style={{ background: 'white', borderTop: '1px solid #E5E7EB', padding: '10px 16px', display: 'flex', justifyContent: 'space-around', position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '515px', zIndex: 50 }}>
                    {[
                        { id: 'home', icon: '🏠', label: '首页', href: '/' },
                        { id: 'community', icon: '👥', label: '圈子', href: '/community' },
                        { id: 'lists', icon: '📋', label: '清单', href: '/lists' },
                        { id: 'me', icon: '👤', label: '我的', href: '/me' },
                    ].map((item) => (
                        <Link key={item.id} href={item.href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', textDecoration: 'none', color: '#6B7280' }}>
                            <span style={{ fontSize: '22px' }}>{item.icon}</span>
                            <span style={{ fontSize: '11px' }}>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </MobileContainer>
    );
}
