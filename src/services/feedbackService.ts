/**
 * 反馈服务 - 数据与业务逻辑抽离
 * Page 文件不应包含任何 API 链接或测试数据
 */
import type { FeedbackItem, FeedbackListResponse, FeedbackFilter } from '@/types/feedback';

// ============ Mock 数据（仅服务层内部使用）============

const MOCK_FEEDBACKS: FeedbackItem[] = [
    {
        id: 'fb-1',
        user: {
            id: 'u-1',
            name: '小雨妈妈',
            avatar: '👩',
            level: 5,
            babyAge: '3个月宝宝',
        },
        product: {
            id: 'comotomo-250',
            brand: 'Comotomo',
            name: '可么多么硅胶奶瓶 250ml',
            imageUrl: '/images/products/comotomo-bottle.png',
            currentPrice: 128,
            originalPrice: 189,
            rating: 4.8,
            reviewCount: 234,
        },
        attitude: 'recommend',
        usageDays: 45,
        summary: '从180ml用到现在，宝宝接受度高，没胀气',
        detail: '用了45天，宝宝一直很喜欢，奶嘴柔软度接近母乳，转奶很顺利。清洗也方便，瓶身宽口设计...',
        tags: ['防胀气有效', '易清洗', '宝宝接受度高'],
        replaceFrom: 'XX品牌玻璃奶瓶',
        replaceReason: '之前那款胀气严重',
        helpfulCount: 234,
        createdAt: '2024-12-20T10:00:00Z',
    },
    {
        id: 'fb-2',
        user: {
            id: 'u-2',
            name: '晴天妈妈',
            avatar: '👱‍♀️',
            level: 3,
            babyAge: '5个月宝宝',
        },
        product: {
            id: 'babycare-bowl',
            brand: 'babycare',
            name: '宝宝吸盘碗辅食碗套装',
            imageUrl: '/images/products/babycare-bowl.png',
            currentPrice: 68,
            originalPrice: 118,
            rating: 3.2,
            reviewCount: 189,
        },
        attitude: 'not_recommend',
        usageDays: 15,
        summary: '吸盘不牢，宝宝一拉就掉，已闲置',
        detail: '买回来用了3次就不用了，吸盘根本吸不住，宝宝一拽就掉。本来想着吸盘设计能防止打翻...',
        tags: ['吸盘不牢', '容易打翻', '性价比低'],
        abandoned: true,
        abandonedReason: '实际使用体验不佳',
        helpfulCount: 156,
        createdAt: '2024-12-19T14:30:00Z',
    },
    {
        id: 'fb-3',
        user: {
            id: 'u-3',
            name: '暖暖妈咪',
            avatar: '🙋‍♀️',
            level: 4,
            babyAge: '4个月宝宝',
        },
        product: {
            id: 'nuk-sterilizer',
            brand: 'NUK',
            name: '奶瓶消毒器 烘干一体',
            imageUrl: '/images/products/nuk-sterilizer.png',
            currentPrice: 299,
            originalPrice: 459,
            rating: 4.1,
            reviewCount: 567,
        },
        attitude: 'optional',
        usageDays: 30,
        summary: '功能正常，但占地方，使用频率不高',
        detail: '消毒效果还行，但体积太大占地方。后来发现直接用开水煮也挺方便的，现在基本闲置了...',
        tags: ['占空间', '使用频率低', '可替代'],
        helpfulCount: 89,
        createdAt: '2024-12-18T09:15:00Z',
    },
];

// ============ 服务类 ============

class FeedbackService {
    private baseUrl = '/api/feedbacks';

    /**
     * 获取反馈列表
     */
    async getList(filter?: FeedbackFilter, page = 1, pageSize = 10): Promise<FeedbackListResponse> {
        // TODO: 替换为真实 API 调用
        // const response = await fetch(`${this.baseUrl}?page=${page}&pageSize=${pageSize}`);
        // return response.json();

        let items = [...MOCK_FEEDBACKS];

        // 应用筛选
        if (filter?.attitude) {
            items = items.filter(item => item.attitude === filter.attitude);
        }

        return {
            items,
            total: items.length,
            hasMore: false,
        };
    }

    /**
     * 获取单条反馈详情
     */
    async getDetail(id: string): Promise<FeedbackItem | null> {
        // TODO: 替换为真实 API 调用
        return MOCK_FEEDBACKS.find(item => item.id === id) || null;
    }

    /**
     * 标记反馈为有用
     */
    async markHelpful(id: string): Promise<{ success: boolean; count: number }> {
        // TODO: 替换为真实 API 调用
        const item = MOCK_FEEDBACKS.find(i => i.id === id);
        if (item) {
            item.helpfulCount += 1;
            return { success: true, count: item.helpfulCount };
        }
        return { success: false, count: 0 };
    }
}

// 单例导出
export const feedbackService = new FeedbackService();

// 导出类型
export type { FeedbackItem, FeedbackListResponse, FeedbackFilter };
