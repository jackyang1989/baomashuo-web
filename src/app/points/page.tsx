'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, Toast } from 'antd-mobile';
import { ArrowLeft, Award, TrendingUp, Target, CheckCircle, Users, Sparkles, Package, AlertCircle } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { pointsService, type UserPoints, type PointsTask, type PointsProduct } from '@/services/pointsService';

export default function PointsStorePage() {
    const router = useRouter();
    const [userPoints, setUserPoints] = useState<UserPoints | null>(null);
    const [tasks, setTasks] = useState<PointsTask[]>([]);
    const [products, setProducts] = useState<PointsProduct[]>([]);
    const [categories, setCategories] = useState<Array<{ id: string; name: string; icon: string }>>([]);
    const [activeTab, setActiveTab] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState<PointsProduct | null>(null);

    useEffect(() => {
        pointsService.getUserPoints().then(setUserPoints);
        pointsService.getTasks().then(setTasks);
        pointsService.getCategories().then(setCategories);
    }, []);

    useEffect(() => {
        pointsService.getProducts(activeTab).then(setProducts);
    }, [activeTab]);

    const handleRedeem = (product: PointsProduct) => {
        setSelectedProduct(product);
    };

    const confirmRedeem = async () => {
        if (!selectedProduct || !userPoints) return;
        const result = await pointsService.redeemProduct(selectedProduct.id);
        if (result.success) {
            Toast.show({ content: '兑换成功！' });
            setUserPoints({ ...userPoints, current: userPoints.current - selectedProduct.points });
        }
        setSelectedProduct(null);
    };

    if (!userPoints) return <MobileContainer><div style={{ padding: '48px', textAlign: 'center' }}>加载中...</div></MobileContainer>;

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F7F8FA', paddingBottom: '64px' }}>
                {/* Header */}
                <div style={{ background: '#F97316', padding: '16px', paddingBottom: '20px', color: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <button onClick={() => router.back()} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'white' }}>
                            <ArrowLeft size={20} /><span style={{ fontWeight: 'bold', fontSize: '18px' }}>积分商城</span>
                        </button>
                        <button style={{ fontSize: '14px', color: 'white', background: 'none', border: 'none' }}>兑换记录 →</button>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <div>
                                <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>我的积分</div>
                                <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{userPoints.current.toLocaleString()}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}><Award size={16} /><span style={{ fontSize: '14px' }}>{userPoints.level}</span></div>
                                <div style={{ fontSize: '12px', opacity: 0.9 }}>排名 #{userPoints.rank}</div>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.3)' }}>
                            <div style={{ textAlign: 'center' }}><div style={{ fontSize: '20px', fontWeight: 'bold' }}>{userPoints.total.toLocaleString()}</div><div style={{ fontSize: '11px', opacity: 0.8 }}>累计获得</div></div>
                            <div style={{ textAlign: 'center' }}><div style={{ fontSize: '20px', fontWeight: 'bold', color: '#FDE047' }}>+{userPoints.thisMonth}</div><div style={{ fontSize: '11px', opacity: 0.8 }}>本月新增</div></div>
                            <div style={{ textAlign: 'center' }}><button style={{ background: 'none', border: 'none', color: 'white' }}><TrendingUp size={20} /></button><div style={{ fontSize: '11px', opacity: 0.8 }}>获取攻略</div></div>
                        </div>
                    </div>
                </div>

                {/* Tasks */}
                <div style={{ background: 'white', margin: '16px', borderRadius: '12px', padding: '16px', border: '1px solid #E5E7EB' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Target size={18} color="#F97316" /><h3 style={{ fontWeight: 'bold', color: '#1F2937' }}>每日任务</h3></div>
                        <span style={{ fontSize: '11px', color: '#F97316', background: '#FEF3C7', padding: '4px 10px', borderRadius: '10px' }}>今日可得 180积分</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {tasks.map((task) => (
                            <div key={task.id} style={{ background: '#FEF3C7', borderRadius: '8px', padding: '12px', border: '1px solid #FDE68A' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ fontSize: '24px' }}>{task.icon}</span>
                                        <div><div style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>{task.name}</div><div style={{ fontSize: '12px', color: '#6B7280' }}>奖励 <span style={{ color: '#F97316', fontWeight: '600' }}>+{task.points}积分</span></div></div>
                                    </div>
                                    {task.status === 'completed' ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#10B981', background: '#ECFDF5', padding: '4px 12px', borderRadius: '12px' }}><CheckCircle size={12} />已完成</div>
                                    ) : task.status === 'ongoing' ? (
                                        <div style={{ textAlign: 'right' }}><div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '4px' }}>{task.progress}/{task.total}</div><button style={{ fontSize: '12px', color: '#3B82F6', background: '#DBEAFE', padding: '4px 12px', borderRadius: '12px', border: 'none' }}>去完成</button></div>
                                    ) : (
                                        <button style={{ fontSize: '12px', color: '#F97316', background: '#FEF3C7', padding: '4px 12px', borderRadius: '12px', border: 'none', fontWeight: '500' }}>去完成</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Points Rules */}
                <div style={{ margin: '16px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '12px', padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <Sparkles size={16} color="#3B82F6" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <div style={{ fontSize: '12px', color: '#1E40AF' }}>
                            <div style={{ fontWeight: '600', marginBottom: '4px' }}>积分获取方式</div>
                            <div>• 每日签到 +10分</div>
                            <div>• 发布评价 +50分</div>
                            <div>• 发布帖子 +20分</div>
                            <div>• 邀请好友 +100分</div>
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div style={{ padding: '0 16px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
                        {categories.map((cat) => (
                            <button key={cat.id} onClick={() => setActiveTab(cat.id)} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 16px', borderRadius: '16px', whiteSpace: 'nowrap', background: activeTab === cat.id ? '#F97316' : '#F3F4F6', color: activeTab === cat.id ? 'white' : '#374151', border: 'none', fontSize: '13px', fontWeight: '500' }}>
                                <span>{cat.icon}</span>{cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                <div style={{ padding: '0 16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                        {products.map((product) => (
                            <div key={product.id} style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden', position: 'relative' }}>
                                {product.tag && (
                                    <div style={{ position: 'absolute', top: 0, right: 0, padding: '4px 10px', fontSize: '10px', fontWeight: '600', color: 'white', borderBottomLeftRadius: '8px', background: product.tag === '热兑' ? '#EF4444' : product.tag === '新品' ? '#3B82F6' : product.tag === '限时' ? '#8B5CF6' : product.tag === '无门槛' ? '#10B981' : '#F97316', zIndex: 1 }}>
                                        {product.tag}
                                    </div>
                                )}
                                <div style={{ aspectRatio: '1', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px' }}>{product.image}</div>
                                <div style={{ padding: '12px' }}>
                                    <div style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '4px' }}>{product.brand}</div>
                                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#1F2937', marginBottom: '8px', height: '36px', overflow: 'hidden' }}>{product.name}</div>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#F97316' }}>{product.points}</span>
                                        <span style={{ fontSize: '11px', color: '#9CA3AF' }}>积分</span>
                                        <span style={{ fontSize: '11px', color: '#9CA3AF', textDecoration: 'line-through', marginLeft: 'auto' }}>¥{product.originalPrice}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#9CA3AF', marginBottom: '12px' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={10} />{product.redeemCount}人兑换</span>
                                        <span style={{ color: product.stock < 20 ? '#EF4444' : '#9CA3AF' }}>剩{product.stock}件</span>
                                    </div>
                                    <button
                                        onClick={() => handleRedeem(product)}
                                        disabled={product.points > userPoints.current || product.stock === 0}
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '8px',
                                            fontSize: '13px',
                                            fontWeight: '600',
                                            border: 'none',
                                            background: product.points > userPoints.current || product.stock === 0 ? '#E5E7EB' : '#F97316',
                                            color: product.points > userPoints.current || product.stock === 0 ? '#9CA3AF' : 'white',
                                            cursor: product.points > userPoints.current || product.stock === 0 ? 'not-allowed' : 'pointer',
                                        }}
                                    >
                                        {product.stock === 0 ? '已兑完' : product.points > userPoints.current ? '积分不足' : '立即兑换'}
                                    </button>
                                    {product.limit && <div style={{ fontSize: '11px', color: '#F97316', textAlign: 'center', marginTop: '8px' }}>每人限兑{product.limit}件</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Redeem Modal */}
                <Dialog
                    visible={!!selectedProduct}
                    title={selectedProduct?.name}
                    content={selectedProduct && (
                        <div>
                            <div style={{ textAlign: 'center', marginBottom: '16px' }}><span style={{ fontSize: '64px' }}>{selectedProduct.image}</span></div>
                            <div style={{ background: '#FEF3C7', borderRadius: '12px', padding: '12px', marginBottom: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ fontSize: '14px', color: '#374151' }}>兑换所需</span><span style={{ fontSize: '20px', fontWeight: 'bold', color: '#F97316' }}>{selectedProduct.points}积分</span></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ fontSize: '14px', color: '#374151' }}>当前积分</span><span style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>{userPoints.current.toLocaleString()}</span></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #FDE68A' }}><span style={{ fontSize: '14px', color: '#374151' }}>兑换后剩余</span><span style={{ fontSize: '18px', fontWeight: 'bold', color: '#3B82F6' }}>{(userPoints.current - selectedProduct.points).toLocaleString()}</span></div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#6B7280' }}><Package size={14} />预计3-7天发货</div>
                        </div>
                    )}
                    actions={[
                        [{ key: 'cancel', text: '取消', onClick: () => setSelectedProduct(null) }, { key: 'confirm', text: '确认兑换', onClick: confirmRedeem, bold: true }]
                    ]}
                />
            </div>
        </MobileContainer>
    );
}
