/**
 * 收益钱包 Mock 数据
 */

import type { EarningsOverview, EarningsStats, EarningsOrder, WithdrawalRecord, PromotionData } from '@/services/earningsService';

export const MOCK_EARNINGS: EarningsOverview = {
    available: 128.50,
    frozen: 45.80,
    withdrawn: 256.00,
    total: 430.30,
    thisMonth: 89.60,
    todayEstimate: 12.30,
};

export const MOCK_STATS: EarningsStats = {
    clickCount: 456,
    orderCount: 23,
    conversionRate: 5.04,
    avgCommission: 5.59,
};

export const MOCK_ORDERS: EarningsOrder[] = [
    { id: 'o1', product: 'Comotomo奶瓶250ml', image: '🍼', orderId: 'TB202412230001', orderAmount: 128, commission: 12.80, commissionRate: 10, status: 'settled', time: '2小时前', buyerNote: '3个月宝宝妈妈', settleTime: '预计1月20日结算' },
    { id: 'o2', product: 'Dr.Brown防胀气奶瓶', image: '🍼', orderId: 'TB202412220045', orderAmount: 98, commission: 9.80, commissionRate: 10, status: 'confirmed', time: '1天前', settleTime: '预计1月19日结算' },
    { id: 'o3', product: 'NUK辅食碗套装', image: '🥣', orderId: 'TB202412210023', orderAmount: 68, commission: 6.80, commissionRate: 10, status: 'paid', time: '2天前', settleTime: '等待确认收货' },
    { id: 'o4', product: 'babycare湿巾10包', image: '🧻', orderId: 'TB202412200012', orderAmount: 45, commission: 4.50, commissionRate: 10, status: 'refunded', time: '3天前', refundReason: '买家退款' },
];

export const MOCK_WITHDRAWALS: WithdrawalRecord[] = [
    { id: 'w1', amount: 100, status: 'success', time: '2024-12-20 14:30', arriveTime: '2024-12-21 10:15', method: '微信', fee: 0 },
    { id: 'w2', amount: 156, status: 'processing', time: '2024-12-23 16:20', method: '微信', fee: 0 },
];

export const MOCK_PROMOTION_DATA: PromotionData[] = [
    { date: '12-17', clicks: 45, orders: 2, earnings: 15.60 },
    { date: '12-18', clicks: 52, orders: 3, earnings: 22.40 },
    { date: '12-19', clicks: 38, orders: 1, earnings: 8.90 },
    { date: '12-20', clicks: 61, orders: 4, earnings: 28.50 },
    { date: '12-21', clicks: 48, orders: 2, earnings: 16.20 },
    { date: '12-22', clicks: 55, orders: 3, earnings: 24.80 },
    { date: '12-23', clicks: 67, orders: 4, earnings: 32.70 },
];
