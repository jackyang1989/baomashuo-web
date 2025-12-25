/**
 * 个人中心 Service
 */

import {
    MOCK_USER,
    MOCK_BABY,
    MOCK_REVIEW_STATS,
    MOCK_MY_REVIEWS,
    MOCK_FAVORITES,
    MENU_ITEMS,
    type UserProfile,
    type BabyInfo,
    type ReviewStats,
    type MyReviewItem,
    type FavoriteItem,
    type MenuItem,
} from '@/mocks/profile';

class ProfileService {
    /**
     * 获取用户信息
     */
    async getUserProfile(): Promise<UserProfile> {
        return MOCK_USER;
    }

    /**
     * 获取宝宝信息
     */
    async getBabyInfo(): Promise<BabyInfo> {
        return MOCK_BABY;
    }

    /**
     * 获取评价统计
     */
    async getReviewStats(): Promise<ReviewStats> {
        return MOCK_REVIEW_STATS;
    }

    /**
     * 获取我的评价列表
     */
    async getMyReviews(): Promise<MyReviewItem[]> {
        return MOCK_MY_REVIEWS;
    }

    /**
     * 获取收藏列表
     */
    async getFavorites(): Promise<FavoriteItem[]> {
        return MOCK_FAVORITES;
    }

    /**
     * 获取菜单项
     */
    async getMenuItems(): Promise<MenuItem[]> {
        return MENU_ITEMS;
    }

    /**
     * 签到
     */
    async checkIn(): Promise<{ success: boolean; gold: number }> {
        return { success: true, gold: 10 };
    }

    /**
     * 更新宝宝信息
     */
    async updateBabyInfo(data: Partial<BabyInfo>): Promise<{ success: boolean }> {
        console.log('更新宝宝信息:', data);
        return { success: true };
    }
}

export const profileService = new ProfileService();

export type {
    UserProfile,
    BabyInfo,
    ReviewStats,
    MyReviewItem,
    FavoriteItem,
    MenuItem,
};
