/**
 * 产品对比核心数据模型
 * 宝妈说 - 决策导向的对比系统
 */

export interface ProductBasicInfo {
    id: string;
    name: string;
    image: string;
    brand: string;
    price: number;
}

/** 核心指标评分 (0-10) */
export interface DimensionScore {
    name: string; // e.g. "防胀气", "清洗便捷"
    score: number;
}

/** AI 总结的优缺点 */
export interface ProsCons {
    pros: string[];
    cons: string[];
}

/** 单个产品的对比数据 */
export interface CompareItem extends ProductBasicInfo {
    // 决策数据
    recommendRate: number;      // 推荐率 (e.g. 92%)
    abandonRate: number;        // 弃用率 (e.g. 5%)
    abandonReasons: string[];   // Top 3 弃用理由
    ageSuitabilityScore: number;// 同月龄适用度评分 (0-100)

    // 维度评分
    dimensions: DimensionScore[];

    // 避坑信息
    pitfallWarning?: string;    // 避坑提醒文案，如果有值则显示红色警告

    // 总结
    summary: ProsCons;
}

/** 整个对比页面的结果集 */
export interface CompareResult {
    items: CompareItem[];

    // 智能决策建议（基于多款产品的综合分析）
    decisionAdvise: {
        title: string;
        content: string; // e.g. "追求极致防胀气选 A，注重清洗便捷选 B"
        matchScore?: number; // 匹配度
    };
}
