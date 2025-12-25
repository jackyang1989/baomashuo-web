/**
 * 积分商城服务层
 */

import { buildUrl } from '@/config/apiConfig';
import { MOCK_USER_POINTS, MOCK_TASKS, MOCK_POINTS_PRODUCTS, MOCK_CATEGORIES, MOCK_REDEMPTIONS } from '@/mocks/pointsMock';

// ============ 类型定义 ============

export interface UserPoints {
    current: number;
    total: number;
    thisMonth: number;
    rank: number;
    level: string;
}

export interface PointsTask {
    id: string;
    name: string;
    points: number;
    icon: string;
    progress: number;
    total: number;
    status: 'completed' | 'ongoing' | 'available';
}

export interface PointsProduct {
    id: string;
    name: string;
    brand: string;
    image: string;
    points: number;
    originalPrice: number;
    stock: number;
    limit: number;
    tag?: string;
    redeemCount: number;
    category: string;
    needVerify?: boolean;
}

export interface RedemptionRecord {
    id: string;
    product: string;
    points: number;
    status: 'shipped' | 'completed' | 'processing';
    time: string;
    trackingNo?: string;
}

// ============ Service ============

class PointsService {
    private useMock = true;

    async getUserPoints(): Promise<UserPoints> {
        return MOCK_USER_POINTS;
    }

    async getTasks(): Promise<PointsTask[]> {
        return MOCK_TASKS;
    }

    async getProducts(category?: string): Promise<PointsProduct[]> {
        if (category && category !== 'all') {
            return MOCK_POINTS_PRODUCTS.filter(p => p.category === category);
        }
        return MOCK_POINTS_PRODUCTS;
    }

    async getCategories(): Promise<Array<{ id: string; name: string; icon: string }>> {
        return MOCK_CATEGORIES;
    }

    async getRedemptions(): Promise<RedemptionRecord[]> {
        return MOCK_REDEMPTIONS;
    }

    async redeemProduct(productId: string): Promise<{ success: boolean; orderId: string }> {
        return { success: true, orderId: `R${Date.now()}` };
    }

    async completeTask(taskId: string): Promise<{ success: boolean; points: number }> {
        return { success: true, points: 10 };
    }
}

export const pointsService = new PointsService();
