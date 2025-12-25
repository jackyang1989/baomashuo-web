/**
 * 使用指南 Service
 */

import {
    USAGE_CATEGORIES,
    USAGE_GUIDES,
    USAGE_FAQS,
    type UsageCategory,
    type UsageGuide,
    type FAQ,
} from '@/mocks/usage';

class UsageService {
    /**
     * 获取所有分类
     */
    async getCategories(): Promise<UsageCategory[]> {
        return USAGE_CATEGORIES;
    }

    /**
     * 获取指南列表
     */
    async getGuides(categoryId?: string): Promise<UsageGuide[]> {
        if (categoryId) {
            return USAGE_GUIDES.filter(g => g.categoryId === categoryId);
        }
        return USAGE_GUIDES;
    }

    /**
     * 获取热门指南
     */
    async getPopularGuides(limit: number = 4): Promise<UsageGuide[]> {
        return [...USAGE_GUIDES]
            .sort((a, b) => b.readCount - a.readCount)
            .slice(0, limit);
    }

    /**
     * 获取指南详情
     */
    async getGuideById(id: string): Promise<UsageGuide | null> {
        return USAGE_GUIDES.find(g => g.id === id) || null;
    }

    /**
     * 获取常见问题
     */
    async getFAQs(categoryId?: string): Promise<FAQ[]> {
        if (categoryId) {
            return USAGE_FAQS.filter(f => f.categoryId === categoryId);
        }
        return USAGE_FAQS;
    }

    /**
     * 获取热门问题
     */
    async getPopularFAQs(limit: number = 5): Promise<FAQ[]> {
        return [...USAGE_FAQS]
            .sort((a, b) => b.helpfulCount - a.helpfulCount)
            .slice(0, limit);
    }

    /**
     * 搜索指南和问题
     */
    async search(keyword: string): Promise<{ guides: UsageGuide[]; faqs: FAQ[] }> {
        const lower = keyword.toLowerCase();
        return {
            guides: USAGE_GUIDES.filter(g =>
                g.title.toLowerCase().includes(lower) ||
                g.summary.toLowerCase().includes(lower)
            ),
            faqs: USAGE_FAQS.filter(f =>
                f.question.toLowerCase().includes(lower) ||
                f.answer.toLowerCase().includes(lower)
            ),
        };
    }

    /**
     * 标记问题有用
     */
    async markHelpful(type: 'guide' | 'faq', id: string): Promise<{ success: boolean }> {
        console.log(`标记 ${type} ${id} 有用`);
        return { success: true };
    }
}

export const usageService = new UsageService();

export type {
    UsageCategory,
    UsageGuide,
    FAQ,
};
