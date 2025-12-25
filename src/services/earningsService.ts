/**
 * 收益钱包服务层
 */

import { buildUrl } from '@/config/apiConfig';
import { MOCK_EARNINGS, MOCK_STATS, MOCK_ORDERS, MOCK_WITHDRAWALS, MOCK_PROMOTION_DATA } from '@/mocks/earningsMock';

// ============ 类型定义 ============

export interface EarningsOverview {
    available: number;
    frozen: number;
    withdrawn: number;
    total: number;
    thisMonth: number;
    todayEstimate: number;
}

export interface EarningsStats {
    clickCount: number;
    orderCount: number;
    conversionRate: number;
    avgCommission: number;
}

export interface EarningsOrder {
    id: string;
    product: string;
    image: string;
    orderId: string;
    orderAmount: number;
    commission: number;
    commissionRate: number;
    status: 'settled' | 'confirmed' | 'paid' | 'refunded';
    time: string;
    buyerNote?: string;
    settleTime?: string;
    refundReason?: string;
}

export interface WithdrawalRecord {
    id: string;
    amount: number;
    status: 'success' | 'processing';
    time: string;
    arriveTime?: string;
    method: string;
    fee: number;
}

export interface PromotionData {
    date: string;
    clicks: number;
    orders: number;
    earnings: number;
}

// ============ Service ============

class EarningsService {
    private useMock = true;

    async getOverview(): Promise<EarningsOverview> {
        return MOCK_EARNINGS;
    }

    async getStats(): Promise<EarningsStats> {
        return MOCK_STATS;
    }

    async getOrders(filter?: string): Promise<EarningsOrder[]> {
        if (filter) {
            return MOCK_ORDERS.filter(o => o.status === filter);
        }
        return MOCK_ORDERS;
    }

    async getWithdrawals(): Promise<WithdrawalRecord[]> {
        return MOCK_WITHDRAWALS;
    }

    async getPromotionData(): Promise<PromotionData[]> {
        return MOCK_PROMOTION_DATA;
    }

    async withdraw(amount: number): Promise<{ success: boolean; withdrawalId: string }> {
        return { success: true, withdrawalId: `W${Date.now()}` };
    }
}

export const earningsService = new EarningsService();
