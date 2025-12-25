/**
 * 智能选品问答 Mock 数据
 */
import type { BabyAgeRange, MainProblem, BudgetRange, SelectRecommendation } from '@/types/review';

// 核心问题选项
export const MAIN_PROBLEMS: { value: MainProblem; label: string; desc: string; icon: string }[] = [
    { value: 'bloating', label: '胀气严重', desc: '宝宝喝完经常胀气、打嗝', icon: '💨' },
    { value: 'rejection', label: '拒绝奶瓶', desc: '宝宝不接受奶瓶或奶嘴', icon: '🙅' },
    { value: 'night_feeding', label: '夜奶频繁', desc: '需要方便夜间操作', icon: '🌙' },
    { value: 'weaning', label: '转奶困难', desc: '母乳转奶瓶过渡期', icon: '🍼' },
    { value: 'first_time', label: '刚开始用', desc: '新手妈妈，想要稳妥选择', icon: '👶' },
];

// 预算选项
export const BUDGET_RANGES: { value: BudgetRange; label: string }[] = [
    { value: 'under_100', label: '100元以下' },
    { value: '100_200', label: '100-200元' },
    { value: '200_300', label: '200-300元' },
    { value: 'over_300', label: '300元以上' },
];

// 月龄选项（复用）
export const BABY_AGE_OPTIONS: { value: BabyAgeRange; label: string; desc: string }[] = [
    { value: '0-3', label: '0-3个月', desc: '新生儿期' },
    { value: '3-6', label: '3-6个月', desc: '成长期' },
    { value: '6-12', label: '6-12个月', desc: '辅食期' },
    { value: '12-24', label: '1-2岁', desc: '断奶过渡期' },
];

// 推荐结果 Mock（根据问题匹配）
export const RECOMMENDATIONS: Record<MainProblem, SelectRecommendation[]> = {
    bloating: [
        {
            productId: 'comotomo-150',
            productName: 'Comotomo可么多么奶瓶 150ml',
            brandName: 'Comotomo',
            imageUrl: '',
            priceRange: '¥168-198',
            matchReason: '硅胶材质+独特排气设计，76%用户反馈防胀气效果明显',
            sameAgeRecommendCount: 156,
            problemSolveRate: 76,
            usageOver30DaysRate: 82,
            overallRating: 4.6,
            recommendRate: 85,
            warnings: ['奶嘴偏软，部分宝宝需适应3-5天'],
        },
        {
            productId: 'dr-browns-240',
            productName: 'Dr.Brown\'s布朗博士防胀气奶瓶 240ml',
            brandName: 'Dr.Brown\'s',
            imageUrl: '',
            priceRange: '¥128-158',
            matchReason: '专利导气系统，医院推荐品牌，68%用户有效缓解胀气',
            sameAgeRecommendCount: 132,
            problemSolveRate: 68,
            usageOver30DaysRate: 78,
            overallRating: 4.4,
            recommendRate: 79,
            warnings: ['配件较多，清洗稍麻烦', '需注意导气管是否堵塞'],
        },
    ],
    rejection: [
        {
            productId: 'comotomo-150',
            productName: 'Comotomo可么多么奶瓶 150ml',
            brandName: 'Comotomo',
            imageUrl: '',
            priceRange: '¥168-198',
            matchReason: '奶嘴仿母乳设计，82%转奶成功率',
            sameAgeRecommendCount: 189,
            problemSolveRate: 82,
            usageOver30DaysRate: 85,
            overallRating: 4.7,
            recommendRate: 88,
            warnings: ['价格偏高'],
        },
        {
            productId: 'pigeon-ss',
            productName: '贝亲自然实感奶瓶 160ml',
            brandName: '贝亲',
            imageUrl: '',
            priceRange: '¥89-119',
            matchReason: 'SS/S号奶嘴接近母乳流速，性价比高',
            sameAgeRecommendCount: 145,
            problemSolveRate: 71,
            usageOver30DaysRate: 80,
            overallRating: 4.3,
            recommendRate: 75,
            warnings: ['玻璃材质较重', '摔落需小心'],
        },
    ],
    night_feeding: [
        {
            productId: 'hegen-150',
            productName: 'Hegen奶瓶 150ml',
            brandName: 'Hegen',
            imageUrl: '',
            priceRange: '¥258-298',
            matchReason: '方形设计单手操作，按压式开盖夜间便捷',
            sameAgeRecommendCount: 98,
            problemSolveRate: 85,
            usageOver30DaysRate: 88,
            overallRating: 4.8,
            recommendRate: 91,
            warnings: ['价格较高'],
        },
    ],
    weaning: [
        {
            productId: 'comotomo-150',
            productName: 'Comotomo可么多么奶瓶 150ml',
            brandName: 'Comotomo',
            imageUrl: '',
            priceRange: '¥168-198',
            matchReason: '硅胶瓶身触感接近乳房，转奶过渡期首选',
            sameAgeRecommendCount: 203,
            problemSolveRate: 79,
            usageOver30DaysRate: 84,
            overallRating: 4.6,
            recommendRate: 86,
            warnings: ['容量较小，6个月后需换大号'],
        },
    ],
    first_time: [
        {
            productId: 'pigeon-wide',
            productName: '贝亲宽口径玻璃奶瓶 160ml',
            brandName: '贝亲',
            imageUrl: '',
            priceRange: '¥69-99',
            matchReason: '国民品牌，性价比高，新手入门首选',
            sameAgeRecommendCount: 312,
            problemSolveRate: 72,
            usageOver30DaysRate: 76,
            overallRating: 4.2,
            recommendRate: 78,
            warnings: ['玻璃材质需轻拿轻放'],
        },
        {
            productId: 'comotomo-150',
            productName: 'Comotomo可么多么奶瓶 150ml',
            brandName: 'Comotomo',
            imageUrl: '',
            priceRange: '¥168-198',
            matchReason: '综合评分最高，适合预算充足的新手',
            sameAgeRecommendCount: 256,
            problemSolveRate: 78,
            usageOver30DaysRate: 85,
            overallRating: 4.6,
            recommendRate: 86,
        },
    ],
};

// 根据条件获取推荐
export function getRecommendations(
    problem: MainProblem,
    ageRange?: BabyAgeRange,
    budget?: BudgetRange
): SelectRecommendation[] {
    let results = RECOMMENDATIONS[problem] || [];

    // 可以根据月龄和预算进一步筛选（简化版直接返回）
    return results;
}
