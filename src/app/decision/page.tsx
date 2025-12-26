'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ThumbsUp, ThumbsDown, MessageCircle, Sparkles, AlertTriangle, Check, HelpCircle, Beaker } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';

// 决策路径配置
const DECISION_PATHS: Record<string, Record<string, {
    title: string;
    subtitle: string;
    targetAudience: string[];
    conclusions: string[];
    reasoning: Array<{ icon: string; title: string; points: string[] }>;
    solutions: Array<{ id: string; name: string; highlight: string; pros: string[]; cons: string[]; bestFor: string }>;
    products: Array<{ id: string; name: string; image: string; likes: number; pros: string[]; solutionId: string }>;
    faqs: Array<{ q: string; a: string }>;
    comboSolutions: Array<{
        id: string;
        problem: string;
        structure: { body: string; nipple: string; connector: string };
        verified: number;
        pros: string[];
        cons: string[];
    }>;
}>> = {
    bottle: {
        '0-3个月': {
            title: '0-3个月宝宝怎么选奶瓶',
            subtitle: '新生儿选奶瓶，防胀气比品牌更重要',
            targetAudience: ['新生儿/纯奶粉喂养', '容易胀气/吐奶', '新手爸妈'],
            conclusions: [
                '奶嘴重要性 > 瓶身，别只看瓶子',
                '防胀气结构必须有，否则基本都会胀',
                '不要一步到位买大容量，120ml够用',
            ],
            reasoning: [
                { icon: '🍼', title: '奶嘴', points: ['流速必须慢（S/SS号）', '太软容易塌陷', '建议选仿母乳设计'] },
                { icon: '🫧', title: '防胀气', points: ['新生儿吞气多', '无导气结构基本都会胀', '防胀气 > 防呛奶'] },
                { icon: '📏', title: '容量', points: ['实际单次60-90ml', '120ml完全足够', '大容量浪费且过重'] },
            ],
            solutions: [
                { id: 'A', name: '最稳妥（新手首选）', highlight: 'Comotomo类', pros: ['防胀气成熟', '奶嘴偏慢更安全', '硅胶柔软高接受'], cons: ['清洗稍麻烦', '价格偏高'], bestFor: '推荐：完全新手、不想试错' },
                { id: 'B', name: '好清洗', highlight: '贝亲类', pros: ['结构简单易清洗', '夜奶友好', '配件通用'], cons: ['防胀气一般', '奶嘴偏软'], bestFor: '推荐：重视方便、夜奶多' },
                { id: 'C', name: '性价比', highlight: '国产大牌', pros: ['价格友好', '配件便宜', '通用性强'], cons: ['做工普通', '品牌溢价低'], bestFor: '推荐：预算有限、备用瓶' },
            ],
            products: [
                { id: 'b1', name: 'Comotomo可么多么', image: '🍼', likes: 500, pros: ['胀气改善明显', '接受度高'], solutionId: 'A' },
                { id: 'b2', name: 'Pigeon贝亲', image: '🍼', likes: 380, pros: ['清洗方便', '性价比高'], solutionId: 'B' },
                { id: 'b3', name: '世喜防胀气', image: '🍼', likes: 280, pros: ['国产放心', '价格实惠'], solutionId: 'C' },
            ],
            faqs: [
                { q: '宝宝不吃是奶瓶问题吗？', a: '70%实际是奶嘴阶段不合适，建议先换奶嘴试试' },
                { q: '要不要直接买240ml？', a: '不建议，新生儿用不上，等3个月后再升级' },
                { q: '玻璃和塑料哪个好？', a: '新生儿推荐玻璃（安全）或硅胶（轻便），塑料3个月后考虑' },
            ],
            comboSolutions: [
                {
                    id: 'combo1',
                    problem: '宝宝只接受贝亲奶嘴，但防胀气不够',
                    structure: { body: '布朗博士防胀气奶瓶', nipple: '贝亲S阶段奶嘴', connector: '适配组件' },
                    verified: 326,
                    pros: ['防胀气结构保留', '宝宝接受度明显提升', '夜奶哭闹减少'],
                    cons: ['非官方方案', '需确认奶嘴阶段匹配'],
                },
            ],
        },
        '3-6个月': {
            title: '3-6个月宝宝怎么选奶瓶',
            subtitle: '开始有自己偏好，转换期要注意',
            targetAudience: ['开始认奶瓶', '可能到辅食过渡期', '有一定喂养经验'],
            conclusions: [
                '这个阶段宝宝开始"挑剔"，别轻易换品牌',
                '容量可以升级到180-240ml',
                '开始关注奶嘴阶段升级（S→M）',
            ],
            reasoning: [
                { icon: '🍼', title: '奶嘴升级', points: ['3个月后可考虑M号', '观察宝宝吃奶时间判断', '15-20分钟正常'] },
                { icon: '📏', title: '容量升级', points: ['单次奶量增加到120-150ml', '可选180-240ml', '考虑外出便携性'] },
                { icon: '🔄', title: '品牌延续', points: ['尽量延续原品牌', '突然换品牌可能拒奶', '配件通用性考虑'] },
            ],
            solutions: [
                { id: 'A', name: '延续升级', highlight: '同品牌大容量', pros: ['宝宝熟悉', '配件通用', '过渡顺利'], cons: ['选择受限'], bestFor: '推荐：原奶瓶用得好' },
                { id: 'B', name: '功能升级', highlight: '增加防胀气', pros: ['解决问题', '功能更强'], cons: ['需要适应期'], bestFor: '推荐：原奶瓶有问题' },
                { id: 'C', name: '外出专用', highlight: '轻便款', pros: ['外出方便', '不怕摔'], cons: ['可能有备瓶定位'], bestFor: '推荐：经常外出' },
            ],
            products: [
                { id: 'b1', name: 'Comotomo 250ml', image: '🍼', likes: 420, pros: ['延续0-3月', '容量合适'], solutionId: 'A' },
                { id: 'b3', name: "Dr.Brown's导气管", image: '🍼', likes: 356, pros: ['防胀气升级', '专业设计'], solutionId: 'B' },
            ],
            faqs: [
                { q: '什么时候换M号奶嘴？', a: '宝宝吃奶超过20分钟且显得费力，就可以考虑升级' },
                { q: '能不能直接换品牌？', a: '可以但建议渐进，先混用几天观察' },
            ],
            comboSolutions: [],
        },
    },
};

export default function DecisionPathPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const category = searchParams.get('category') || 'bottle';
    const path = searchParams.get('path') || 'age';
    const filter = searchParams.get('filter') || '0-3个月';

    const pathConfig = DECISION_PATHS[category]?.[filter] || DECISION_PATHS.bottle['0-3个月'];
    const [activeSolution, setActiveSolution] = useState('A');
    const [showCombo, setShowCombo] = useState(false);

    const categoryColors: Record<string, string> = {
        bottle: '#3B82F6',
        nipple: '#8B5CF6',
        accessory: '#10B981',
    };
    const color = categoryColors[category] || '#3B82F6';

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F7F8FA', paddingBottom: '100px' }}>
                {/* 顶部导航 */}
                <div style={{ background: color, padding: '16px', color: 'white' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: 'white' }}>
                            <ArrowLeft size={20} />
                        </button>
                        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{pathConfig.title}</div>
                    </div>
                    <div style={{ fontSize: '13px', opacity: 0.9 }}>{pathConfig.subtitle}</div>
                </div>

                {/* ① 身份确认 */}
                <div style={{ background: 'white', margin: '12px 16px', borderRadius: '14px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '10px' }}>适合人群：</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {pathConfig.targetAudience.map((t, i) => (
                            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#059669', background: '#ECFDF5', padding: '6px 12px', borderRadius: '8px' }}>
                                <Check size={12} /> {t}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ② 结论先行 */}
                <div style={{ background: '#FFFBEB', margin: '0 16px 12px', borderRadius: '14px', padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <Sparkles size={18} color="#F59E0B" />
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#92400E' }}>结论先行（你只需记住3点）</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {pathConfig.conclusions.map((c, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                <span style={{ width: '24px', height: '24px', background: '#FCD34D', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', color: '#78350F', flexShrink: 0 }}>{i + 1}</span>
                                <span style={{ fontSize: '14px', color: '#78350F', lineHeight: 1.5 }}>{c}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ③ 决策条件拆解 */}
                <div style={{ padding: '0 16px 12px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '12px' }}>为什么{filter}要注意这些？</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {pathConfig.reasoning.map((r, i) => (
                            <div key={i} style={{ background: 'white', borderRadius: '12px', padding: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '20px' }}>{r.icon}</span>
                                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>{r.title}</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    {r.points.map((p, j) => (
                                        <div key={j} style={{ fontSize: '12px', color: '#6B7280' }}>• {p}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ④ 收敛方案 */}
                <div style={{ padding: '0 16px 12px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>我们帮你整理了3种安全方案</div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '12px' }}>点击切换方案查看对应推荐</div>

                    {/* 方案Tab */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                        {pathConfig.solutions.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => setActiveSolution(s.id)}
                                style={{
                                    flex: 1,
                                    padding: '10px 8px',
                                    background: activeSolution === s.id ? color : 'white',
                                    border: activeSolution === s.id ? 'none' : '1px solid #E5E7EB',
                                    borderRadius: '10px',
                                    color: activeSolution === s.id ? 'white' : '#6B7280',
                                    fontSize: '12px',
                                    fontWeight: activeSolution === s.id ? '600' : '400',
                                }}
                            >
                                方案{s.id}
                            </button>
                        ))}
                    </div>

                    {/* 当前方案详情 */}
                    {pathConfig.solutions.filter(s => s.id === activeSolution).map((s) => (
                        <div key={s.id} style={{ background: 'white', borderRadius: '14px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <div>
                                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937' }}>方案{s.id}｜{s.name}</div>
                                    <div style={{ fontSize: '12px', color: color }}>{s.highlight}</div>
                                </div>
                            </div>

                            <div style={{ marginBottom: '12px' }}>
                                {s.pros.map((p, i) => (
                                    <div key={i} style={{ fontSize: '13px', color: '#059669', marginBottom: '4px' }}>✓ {p}</div>
                                ))}
                                {s.cons.map((c, i) => (
                                    <div key={i} style={{ fontSize: '13px', color: '#D97706', marginBottom: '4px' }}>⚠ {c}</div>
                                ))}
                            </div>

                            <div style={{ fontSize: '12px', color: '#6B7280', background: '#F9FAFB', padding: '8px 12px', borderRadius: '8px' }}>
                                {s.bestFor}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ⑤ 精选商品承接 */}
                <div style={{ padding: '0 16px 12px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '12px' }}>方案{activeSolution} 推荐产品</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {pathConfig.products.filter(p => p.solutionId === activeSolution).map((product) => (
                            <Link key={product.id} href={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                                <div style={{ background: 'white', borderRadius: '12px', padding: '14px', display: 'flex', gap: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                                    <div style={{ width: '60px', height: '60px', background: '#F9FAFB', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0 }}>
                                        {product.image}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '6px' }}>{product.name}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                                            <ThumbsUp size={12} color="#10B981" />
                                            <span style={{ fontSize: '12px', color: '#10B981' }}>{product.likes}+ 位{filter}宝妈</span>
                                        </div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                            {product.pros.map((p, i) => (
                                                <span key={i} style={{ fontSize: '10px', color: '#059669', background: '#ECFDF5', padding: '3px 6px', borderRadius: '4px' }}>✓ {p}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <ChevronRight size={18} color="#9CA3AF" style={{ alignSelf: 'center' }} />
                                </div>
                            </Link>
                        ))}
                        {pathConfig.products.filter(p => p.solutionId === activeSolution).length === 0 && (
                            <div style={{ fontSize: '13px', color: '#9CA3AF', textAlign: 'center', padding: '20px' }}>该方案暂无推荐产品</div>
                        )}
                    </div>
                </div>

                {/* 🧪 混搭进阶方案 */}
                {pathConfig.comboSolutions.length > 0 && (
                    <div style={{ padding: '0 16px 12px' }}>
                        <div
                            onClick={() => setShowCombo(!showCombo)}
                            style={{ background: '#F0F9FF', border: '1px dashed #93C5FD', borderRadius: '12px', padding: '14px', cursor: 'pointer' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Beaker size={18} color="#3B82F6" />
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#1E40AF' }}>宝妈进阶组合方案</div>
                                        <div style={{ fontSize: '11px', color: '#6B7280' }}>非官方 · 来自真实长期使用</div>
                                    </div>
                                </div>
                                <ChevronRight size={18} color="#3B82F6" style={{ transform: showCombo ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                            </div>

                            {!showCombo && (
                                <div style={{ fontSize: '12px', color: '#3B82F6', marginTop: '8px' }}>
                                    有 {pathConfig.comboSolutions.reduce((a, b) => a + b.verified, 0)}+ 位宝妈在标准方案之外，通过"混搭使用"解决了问题
                                </div>
                            )}
                        </div>

                        {showCombo && (
                            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {pathConfig.comboSolutions.map((combo) => (
                                    <div key={combo.id} style={{ background: 'white', borderRadius: '14px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                                        {/* 适用问题 */}
                                        <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '10px' }}>
                                            适用问题：<span style={{ color: '#1F2937' }}>{combo.problem}</span>
                                        </div>

                                        {/* 组合结构 */}
                                        <div style={{ background: '#F9FAFB', borderRadius: '10px', padding: '12px', marginBottom: '12px' }}>
                                            <div style={{ fontSize: '12px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>组合结构：</div>
                                            <div style={{ fontSize: '12px', color: '#6B7280' }}>
                                                <div>• 瓶身：{combo.structure.body}</div>
                                                <div>• 奶嘴：{combo.structure.nipple}</div>
                                                <div>• 连接：{combo.structure.connector}</div>
                                            </div>
                                        </div>

                                        {/* 验证数据 */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                                            <ThumbsUp size={12} color="#10B981" />
                                            <span style={{ fontSize: '12px', color: '#10B981' }}>{combo.verified}位宝妈长期验证</span>
                                        </div>

                                        {/* 优缺点 */}
                                        <div style={{ marginBottom: '12px' }}>
                                            {combo.pros.map((p, i) => (
                                                <div key={i} style={{ fontSize: '12px', color: '#059669', marginBottom: '3px' }}>✓ {p}</div>
                                            ))}
                                            {combo.cons.map((c, i) => (
                                                <div key={i} style={{ fontSize: '12px', color: '#D97706', marginBottom: '3px' }}>⚠ {c}</div>
                                            ))}
                                        </div>

                                        {/* 操作按钮 */}
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '8px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', fontSize: '11px', color: '#059669' }}>
                                                <ThumbsUp size={12} /> 我也在用
                                            </button>
                                            <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '8px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', fontSize: '11px', color: '#DC2626' }}>
                                                <ThumbsDown size={12} /> 我家不适合
                                            </button>
                                            <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '8px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '11px', color: '#6B7280' }}>
                                                <MessageCircle size={12} /> 补充
                                            </button>
                                        </div>

                                        {/* 声明 */}
                                        <div style={{ marginTop: '10px', fontSize: '10px', color: '#9CA3AF', textAlign: 'center' }}>
                                            ⚠ 本组合为宝妈长期使用总结，非品牌官方推荐方案
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* ⑥ 常见反对意见 */}
                <div style={{ padding: '0 16px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                        <HelpCircle size={16} color="#6B7280" />
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>你可能还在纠结</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {pathConfig.faqs.map((faq, i) => (
                            <div key={i} style={{ background: 'white', borderRadius: '12px', padding: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                                <div style={{ fontSize: '13px', fontWeight: '500', color: '#1F2937', marginBottom: '6px' }}>Q：{faq.q}</div>
                                <div style={{ fontSize: '13px', color: '#6B7280' }}>A：{faq.a}</div>
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
