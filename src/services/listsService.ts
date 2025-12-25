/**
 * 清单服务层
 * 所有数据获取逻辑封装为函数，Page 只负责调用
 */

import { API_CONFIG, buildUrl } from '@/config/apiConfig';
import {
    MOCK_AGE_GROUPS,
    MOCK_OFFICIAL_LISTS,
    MOCK_SCENARIO_LISTS,
    MOCK_MY_LISTS,
} from '@/mocks/listsMock';

// ============ 类型定义 ============

export type NecessityLevel = 'must' | 'recommended' | 'optional';

export interface ListItem {
    id: string;
    name: string;
    category: string;
    necessity: NecessityLevel;
    reason: string;
    price: number;
    recommendRate: number;
}

export interface OfficialList {
    id: string;
    title: string;
    desc: string;
    icon: string;
    userCount: number;
    items: ListItem[];
}

export interface ScenarioList {
    id: string;
    title: string;
    desc: string;
    icon: string;
    userCount: number;
    tips: string[];
}

export interface MyList {
    id: string;
    title: string;
    itemCount: number;
    totalPrice: number;
    checkedCount: number;
    updatedAt: string;
}

// ============ Service ============

class ListsService {
    private useMock = true;

    async getAgeGroups(): Promise<string[]> {
        return MOCK_AGE_GROUPS;
    }

    async getOfficialLists(ageGroup?: string): Promise<OfficialList[]> {
        if (this.useMock) {
            return new Promise((resolve) => {
                setTimeout(() => resolve(MOCK_OFFICIAL_LISTS), 200);
            });
        }
        const response = await fetch(buildUrl(API_CONFIG.ENDPOINTS.LISTS_OFFICIAL));
        return response.json();
    }

    async getScenarioLists(): Promise<ScenarioList[]> {
        if (this.useMock) {
            return new Promise((resolve) => {
                setTimeout(() => resolve(MOCK_SCENARIO_LISTS), 200);
            });
        }
        const response = await fetch(buildUrl(API_CONFIG.ENDPOINTS.LISTS_SCENARIO));
        return response.json();
    }

    async getMyLists(): Promise<MyList[]> {
        if (this.useMock) {
            return new Promise((resolve) => {
                setTimeout(() => resolve(MOCK_MY_LISTS), 100);
            });
        }
        const response = await fetch(buildUrl(API_CONFIG.ENDPOINTS.LISTS_MY));
        return response.json();
    }

    async createList(title: string): Promise<MyList> {
        return { id: `ml${Date.now()}`, title, itemCount: 0, totalPrice: 0, checkedCount: 0, updatedAt: '刚刚' };
    }

    async deleteList(listId: string): Promise<boolean> {
        return true;
    }

    async toggleItem(listId: string, itemId: string): Promise<boolean> {
        return true;
    }
}

export const listsService = new ListsService();
