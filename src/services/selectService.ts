/**
 * 选品服务层
 * 所有数据获取逻辑封装为函数，Page 只负责调用
 */

import { API_CONFIG, buildUrl } from '@/config/apiConfig';
import { MOCK_SELECT_CONFIG, MOCK_PROBLEMS, MOCK_RECOMMENDATIONS } from '@/mocks/selectMock';
import type { SelectProblem, ProductRecommendation, SelectFeatureConfig } from '@/types/select';

// ============ Service ============

class SelectService {
    private useMock = true;

    async getConfig(): Promise<SelectFeatureConfig> {
        if (this.useMock) {
            return MOCK_SELECT_CONFIG;
        }
        const response = await fetch(buildUrl(API_CONFIG.ENDPOINTS.SELECT_CONFIG));
        return response.json();
    }

    async getProblems(category?: string): Promise<SelectProblem[]> {
        if (this.useMock) {
            return new Promise((resolve) => {
                setTimeout(() => resolve(MOCK_PROBLEMS), 200);
            });
        }
        const response = await fetch(buildUrl(API_CONFIG.ENDPOINTS.SELECT_PROBLEMS));
        return response.json();
    }

    async getRecommendations(problemId: string, budget?: string): Promise<ProductRecommendation[]> {
        if (this.useMock) {
            return new Promise((resolve) => {
                setTimeout(() => resolve(MOCK_RECOMMENDATIONS), 300);
            });
        }
        const response = await fetch(buildUrl(API_CONFIG.ENDPOINTS.SELECT_RECOMMENDATIONS));
        return response.json();
    }
}

export const selectService = new SelectService();
