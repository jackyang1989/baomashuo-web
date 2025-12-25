/**
 * API 配置文件
 * 所有 API 路径必须从此处引用，禁止在代码中硬编码
 */

export const API_CONFIG = {
    // 基础 URL - 开发环境
    BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',

    // 各模块 API 端点
    ENDPOINTS: {
        // 产品相关
        PRODUCTS: '/products',
        PRODUCT_DETAIL: (id: string) => `/products/${id}`,
        PRODUCT_REVIEWS: (id: string) => `/products/${id}/reviews`,

        // 评价相关
        REVIEWS: '/reviews',
        REVIEW_SUBMIT: '/reviews/submit',
        REVIEW_DRAFT: '/reviews/draft',

        // 选品相关
        SELECT_CONFIG: '/select/config',
        SELECT_PROBLEMS: '/select/problems',
        SELECT_RECOMMENDATIONS: '/select/recommendations',

        // 避坑榜
        PITFALLS: '/pitfalls',
        PITFALL_SCENARIOS: '/pitfalls/scenarios',
        PITFALL_REASONS: '/pitfalls/reasons',

        // 清单
        LISTS: '/lists',
        LISTS_OFFICIAL: '/lists/official',
        LISTS_SCENARIO: '/lists/scenario',
        LISTS_MY: '/lists/my',

        // 用户
        USER_PROFILE: '/user/profile',
        USER_BABIES: '/user/babies',

        // 首页
        HOME_ENTRIES: '/home/entries',
        HOME_ALERTS: '/home/alerts',
        HOME_QUESTIONS: '/home/questions',
        HOME_FEEDBACKS: '/home/feedbacks',
    },
};

// 构建完整 URL 的辅助函数
export const buildUrl = (endpoint: string): string => {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
};
