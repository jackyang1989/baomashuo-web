/**
 * User Service
 * 聚合获取个人中心所需数据
 */

import type { FullUserData } from '@/types/user';

// Mock Data
const MOCK_USER_DATA: FullUserData = {
    profile: {
        id: 'user-001',
        nickname: '小雨妈妈',
        avatar: '👩',
        identity: 'mom',
        city: '上海',
        createdAt: '2024-01-15',
    },
    level: {
        level: 5,
        name: '金牌宝妈',
        exp: 1250,
        nextLevelExp: 2000,
    },
    babies: [
        {
            id: 'baby-001',
            name: '小雨',
            avatar: '👶',
            gender: 'girl',
            birthDate: '2024-09-15',
            isDefault: true,
            ageMonths: 3,
            ageDays: 7,
            allergies: [
                { type: 'food', name: '牛奶蛋白', severity: 'moderate' },
            ],
            conditions: ['eczema', 'reflux'],
        },
        {
            id: 'baby-002',
            name: '小晴',
            avatar: '👧',
            gender: 'girl',
            birthDate: '2022-05-20',
            isDefault: false,
            ageMonths: 31,
            ageDays: 2,
            allergies: [],
            conditions: [],
        },
    ],
    influence: {
        totalReviews: 12,
        helpfulCount: 328, // Matches requirement
        resonateCount: 189, // Matches requirement
        helpedMoms: 328,
        topContributor: true,
    },
    achievements: [ // Renamed from badges
        { id: 'pitfall_expert', name: '避坑达人', icon: '🛡️', description: '帮助100+宝妈避开踩坑产品', earnedAt: '2024-11-20', isLocked: false },
        { id: 'helpful_heart', name: '热心肠', icon: '❤️', description: '获得500+有用点赞', earnedAt: '2024-12-01', isLocked: false },
        { id: 'knowledge_mom', name: '知识妈妈', icon: '📚', description: '发布10+高质量使用指南', isLocked: true },
        { id: 'decision_master', name: '决策大师', icon: '🎯', description: '评价被采纳50+次', isLocked: true },
    ],
    decisionHistory: [],
    wallet: {
        todayEarnings: 2.58,
        totalEarnings: 128.50,
        withdrawable: 100.00,
        pendingSettlement: 28.50,
    },
};

class UserService {
    /**
     * 获取个人中心聚合数据
     */
    async getProfileData(): Promise<FullUserData> {
        // Simulate API delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_USER_DATA);
            }, 500);
        });
    }

    /**
     * 切换默认宝宝
     */
    async switchBaby(babyId: string): Promise<boolean> {
        // In a real app, this would call an API
        console.log(`Switched to baby ${babyId}`);
        return true;
    }
}

export const userService = new UserService();
