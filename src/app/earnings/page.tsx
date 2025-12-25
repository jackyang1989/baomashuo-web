'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, Dialog, Toast, Input } from 'antd-mobile';
import { ArrowLeft, HelpCircle, Eye, ShoppingBag, TrendingUp as TrendingUpIcon, DollarSign, Share2, BarChart3, ChevronRight, Clock, XCircle, AlertCircle, Wallet, CheckCircle, CreditCard, Info } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { earningsService, type EarningsOverview, type EarningsStats, type EarningsOrder, type WithdrawalRecord, type PromotionData } from '@/services/earningsService';

export default function EarningsPage() {
    const router = useRouter();
    const [earnings, setEarnings] = useState<EarningsOverview | null>(null);
    const [stats, setStats] = useState<EarningsStats | null>(null);
    const [orders, setOrders] = useState<EarningsOrder[]>([]);
    const [withdrawals, setWithdrawals] = useState<WithdrawalRecord[]>([]);
    const [promotionData, setPromotionData] = useState<PromotionData[]>([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('');

    useEffect(() => {
        earningsService.getOverview().then(setEarnings);
        earningsService.getStats().then(setStats);
        earningsService.getOrders().then(setOrders);
        earningsService.getWithdrawals().then(setWithdrawals);
        earningsService.getPromotionData().then(setPromotionData);
    }, []);

    const getStatusInfo = (status: string) => {
        const map: Record<string, { text: string; color: string; bg: string }> = {
            settled: { text: '已结算', color: '#10B981', bg: '#ECFDF5' },
            confirmed: { text: '已确认', color: '#3B82F6', bg: '#DBEAFE' },
            paid: { text: '已付款', color: '#F59E0B', bg: '#FEF3C7' },
            refunded: { text: '已退款', color: '#EF4444', bg: '#FEE2E2' },
        };
        return map[status] || map.paid;
    };

    const handleWithdraw = async () => {
        if (!withdrawAmount || parseFloat(withdrawAmount) < 10) return;
        const result = await earningsService.withdraw(parseFloat(withdrawAmount));
        if (result.success) {
            Toast.show({ content: '提现申请已提交' });
            setShowWithdrawModal(false);
            setWithdrawAmount('');
            earningsService.getOverview().then(setEarnings);
        }
    };

    if (!earnings || !stats) return <MobileContainer><div style={{ padding: '48px', textAlign: 'center' }}>加载中...</div></MobileContainer>;

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F7F8FA', paddingBottom: '20px' }}>
                {/* Header */}
                <div style={{ background: '#10B981', padding: '16px', paddingBottom: '20px', color: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <button onClick={() => router.back()} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'white' }}>
                            <ArrowLeft size={20} /><span style={{ fontWeight: 'bold', fontSize: '18px' }}>我的收益</span>
                        </button>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: 'white', background: 'none', border: 'none' }}><HelpCircle size={16} />收益说明</button>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <div>
                                <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>可提现金额（元）</div>
                                <div style={{ fontSize: '36px', fontWeight: 'bold' }}>¥{earnings.available.toFixed(2)}</div>
                            </div>
                            <button onClick={() => setShowWithdrawModal(true)} disabled={earnings.available < 10} style={{ padding: '10px 24px', borderRadius: '12px', background: earnings.available >= 10 ? 'white' : 'rgba(255,255,255,0.3)', color: earnings.available >= 10 ? '#10B981' : 'rgba(255,255,255,0.6)', border: 'none', fontWeight: '600' }}>提现</button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.3)' }}>
                            <div><div style={{ fontSize: '18px', fontWeight: 'bold' }}>¥{earnings.frozen.toFixed(2)}</div><div style={{ fontSize: '11px', opacity: 0.8 }}>冻结中</div></div>
                            <div><div style={{ fontSize: '18px', fontWeight: 'bold' }}>¥{earnings.withdrawn.toFixed(2)}</div><div style={{ fontSize: '11px', opacity: 0.8 }}>已提现</div></div>
                            <div><div style={{ fontSize: '18px', fontWeight: 'bold' }}>¥{earnings.total.toFixed(2)}</div><div style={{ fontSize: '11px', opacity: 0.8 }}>累计收益</div></div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                        <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px' }}>
                            <div style={{ fontSize: '11px', opacity: 0.8, marginBottom: '4px' }}>今日预估</div>
                            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>¥{earnings.todayEstimate.toFixed(2)}</div>
                        </div>
                        <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px' }}>
                            <div style={{ fontSize: '11px', opacity: 0.8, marginBottom: '4px' }}>本月累计</div>
                            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>¥{earnings.thisMonth.toFixed(2)}</div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ background: 'white', borderBottom: '1px solid #E5E7EB', position: 'sticky', top: 0, zIndex: 40 }}>
                    <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ '--title-font-size': '14px', '--active-title-color': '#10B981', '--active-line-color': '#10B981' }}>
                        <Tabs.Tab title="概览" key="overview" />
                        <Tabs.Tab title="订单明细" key="orders" />
                        <Tabs.Tab title="提现记录" key="withdrawals" />
                    </Tabs>
                </div>

                {/* Overview */}
                {activeTab === 'overview' && (
                    <div style={{ padding: '16px' }}>
                        <div style={{ background: 'white', borderRadius: '16px', padding: '16px', marginBottom: '16px', border: '1px solid #E5E7EB' }}>
                            <h3 style={{ fontWeight: 'bold', color: '#1F2937', marginBottom: '12px' }}>推广数据</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                                <div style={{ background: '#DBEAFE', borderRadius: '12px', padding: '12px' }}><div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}><Eye size={14} color="#3B82F6" /><span style={{ fontSize: '12px', color: '#6B7280' }}>点击量</span></div><div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3B82F6' }}>{stats.clickCount}</div></div>
                                <div style={{ background: '#ECFDF5', borderRadius: '12px', padding: '12px' }}><div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}><ShoppingBag size={14} color="#10B981" /><span style={{ fontSize: '12px', color: '#6B7280' }}>订单数</span></div><div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10B981' }}>{stats.orderCount}</div></div>
                                <div style={{ background: '#F5F3FF', borderRadius: '12px', padding: '12px' }}><div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}><TrendingUpIcon size={14} color="#8B5CF6" /><span style={{ fontSize: '12px', color: '#6B7280' }}>转化率</span></div><div style={{ fontSize: '24px', fontWeight: 'bold', color: '#8B5CF6' }}>{stats.conversionRate}%</div></div>
                                <div style={{ background: '#FEF3C7', borderRadius: '12px', padding: '12px' }}><div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}><DollarSign size={14} color="#F59E0B" /><span style={{ fontSize: '12px', color: '#6B7280' }}>平均佣金</span></div><div style={{ fontSize: '24px', fontWeight: 'bold', color: '#F59E0B' }}>¥{stats.avgCommission}</div></div>
                            </div>
                        </div>

                        <div style={{ background: 'white', borderRadius: '16px', padding: '16px', marginBottom: '16px', border: '1px solid #E5E7EB' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <h3 style={{ fontWeight: 'bold', color: '#1F2937' }}>近7日收益趋势</h3>
                                <button style={{ fontSize: '12px', color: '#3B82F6', background: 'none', border: 'none' }}>查看详情 →</button>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '4px', height: '100px', marginBottom: '8px' }}>
                                {promotionData.map((data, idx) => {
                                    const maxE = Math.max(...promotionData.map(d => d.earnings));
                                    const h = (data.earnings / maxE) * 80;
                                    return (
                                        <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <div style={{ width: '100%', height: `${h}px`, background: '#10B981', borderRadius: '4px 4px 0 0' }} />
                                            <div style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '4px' }}>{data.date.slice(3)}</div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '8px', fontSize: '12px', color: '#6B7280', display: 'flex', justifyContent: 'space-between' }}>
                                <span>7日总收益</span>
                                <span style={{ fontWeight: 'bold', color: '#10B981' }}>¥{promotionData.reduce((s, d) => s + d.earnings, 0).toFixed(2)}</span>
                            </div>
                        </div>

                        <div style={{ background: '#EFF6FF', borderRadius: '12px', padding: '16px', border: '1px solid #BFDBFE' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}><Share2 size={18} color="#3B82F6" /><h3 style={{ fontWeight: 'bold', color: '#1F2937' }}>推广工具</h3></div>
                            <button style={{ width: '100%', background: 'white', borderRadius: '12px', padding: '12px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: 'none' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '40px', height: '40px', background: '#DBEAFE', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Share2 size={18} color="#3B82F6" /></div><div style={{ textAlign: 'left' }}><div style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>生成推广链接</div><div style={{ fontSize: '11px', color: '#9CA3AF' }}>分享产品赚佣金</div></div></div>
                                <ChevronRight size={18} color="#9CA3AF" />
                            </button>
                            <button style={{ width: '100%', background: 'white', borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: 'none' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '40px', height: '40px', background: '#F5F3FF', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BarChart3 size={18} color="#8B5CF6" /></div><div style={{ textAlign: 'left' }}><div style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>查看推广排行</div><div style={{ fontSize: '11px', color: '#9CA3AF' }}>看看大家都在推什么</div></div></div>
                                <ChevronRight size={18} color="#9CA3AF" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Orders */}
                {activeTab === 'orders' && (
                    <div style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '12px', paddingBottom: '4px' }}>
                            <button style={{ padding: '6px 14px', background: '#10B981', color: 'white', fontSize: '12px', borderRadius: '16px', border: 'none', whiteSpace: 'nowrap' }}>全部({orders.length})</button>
                            <button style={{ padding: '6px 14px', background: '#F3F4F6', color: '#374151', fontSize: '12px', borderRadius: '16px', border: 'none', whiteSpace: 'nowrap' }}>已结算</button>
                            <button style={{ padding: '6px 14px', background: '#F3F4F6', color: '#374151', fontSize: '12px', borderRadius: '16px', border: 'none', whiteSpace: 'nowrap' }}>待结算</button>
                            <button style={{ padding: '6px 14px', background: '#F3F4F6', color: '#374151', fontSize: '12px', borderRadius: '16px', border: 'none', whiteSpace: 'nowrap' }}>已失效</button>
                        </div>
                        {orders.map((order) => {
                            const si = getStatusInfo(order.status);
                            return (
                                <div key={order.id} style={{ background: 'white', borderRadius: '16px', padding: '16px', marginBottom: '12px', border: '1px solid #E5E7EB' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} color="#9CA3AF" /><span style={{ fontSize: '12px', color: '#9CA3AF' }}>{order.time}</span></div>
                                        <span style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '6px', background: si.bg, color: si.color, fontWeight: '500' }}>{si.text}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                                        <div style={{ width: '64px', height: '64px', background: '#F3F4F6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', flexShrink: 0 }}>{order.image}</div>
                                        <div style={{ flex: 1 }}><div style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937', marginBottom: '4px' }}>{order.product}</div><div style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '4px' }}>订单号：{order.orderId}</div>{order.buyerNote && <div style={{ fontSize: '11px', color: '#3B82F6' }}>👤 {order.buyerNote}</div>}</div>
                                    </div>
                                    <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ fontSize: '12px', color: '#6B7280' }}>订单金额</span><span style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>¥{order.orderAmount}</span></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: '12px', color: '#6B7280' }}>预估佣金（{order.commissionRate}%）</span><span style={{ fontSize: '18px', fontWeight: 'bold', color: '#10B981' }}>¥{order.commission.toFixed(2)}</span></div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: order.status === 'refunded' ? '#EF4444' : '#9CA3AF' }}>
                                        {order.status === 'refunded' ? <XCircle size={12} /> : <AlertCircle size={12} />}
                                        <span>{order.status === 'refunded' ? order.refundReason : order.settleTime}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Withdrawals */}
                {activeTab === 'withdrawals' && (
                    <div style={{ padding: '16px' }}>
                        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '12px', padding: '12px', marginBottom: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                <Info size={16} color="#3B82F6" style={{ marginTop: '2px', flexShrink: 0 }} />
                                <div style={{ fontSize: '12px', color: '#1E40AF' }}>
                                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>提现说明</div>
                                    <div>• 最低提现金额：10元</div>
                                    <div>• 每月可提现4次</div>
                                    <div>• 到账时间：1-3个工作日</div>
                                    <div>• 提现免手续费</div>
                                </div>
                            </div>
                        </div>

                        {withdrawals.map((record) => (
                            <div key={record.id} style={{ background: 'white', borderRadius: '16px', padding: '16px', marginBottom: '12px', border: '1px solid #E5E7EB' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: record.status === 'success' ? '#ECFDF5' : '#FEF3C7' }}>
                                            <Wallet size={18} color={record.status === 'success' ? '#10B981' : '#F59E0B'} />
                                        </div>
                                        <div><div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1F2937' }}>¥{record.amount.toFixed(2)}</div><div style={{ fontSize: '11px', color: '#9CA3AF' }}>提现到{record.method}</div></div>
                                    </div>
                                    <span style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '6px', background: record.status === 'success' ? '#ECFDF5' : '#FEF3C7', color: record.status === 'success' ? '#10B981' : '#F59E0B' }}>
                                        {record.status === 'success' ? '已到账' : '处理中'}
                                    </span>
                                </div>
                                <div style={{ fontSize: '11px', color: '#9CA3AF' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span>申请时间</span><span>{record.time}</span></div>
                                    {record.arriveTime && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span>到账时间</span><span>{record.arriveTime}</span></div>}
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>手续费</span><span>¥{record.fee.toFixed(2)}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Withdraw Modal */}
                <Dialog
                    visible={showWithdrawModal}
                    title="申请提现"
                    content={
                        <div>
                            <div style={{ background: '#ECFDF5', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
                                <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>可提现金额</div>
                                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#10B981' }}>¥{earnings.available.toFixed(2)}</div>
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <div style={{ fontSize: '14px', color: '#374151', marginBottom: '8px' }}>提现金额</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Input type="number" value={withdrawAmount} onChange={setWithdrawAmount} placeholder="请输入提现金额" style={{ flex: 1, fontSize: '16px' }} />
                                    <button onClick={() => setWithdrawAmount(earnings.available.toFixed(2))} style={{ fontSize: '14px', color: '#10B981', background: 'none', border: 'none' }}>全部</button>
                                </div>
                                <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>最低提现金额10元</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '14px', color: '#374151', marginBottom: '8px' }}>提现方式</div>
                                <div style={{ background: '#F9FAFB', borderRadius: '12px', padding: '12px', border: '2px solid #10B981', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '40px', height: '40px', background: '#ECFDF5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CreditCard size={18} color="#10B981" /></div>
                                        <div><div style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>微信</div><div style={{ fontSize: '11px', color: '#9CA3AF' }}>预计1-3个工作日到账</div></div>
                                    </div>
                                    <CheckCircle size={18} color="#10B981" />
                                </div>
                            </div>
                        </div>
                    }
                    actions={[
                        [{ key: 'cancel', text: '取消', onClick: () => setShowWithdrawModal(false) }, { key: 'confirm', text: '确认提现', onClick: handleWithdraw, disabled: !withdrawAmount || parseFloat(withdrawAmount) < 10, bold: true, style: { color: '#10B981' } }]
                    ]}
                />
            </div>
        </MobileContainer>
    );
}
