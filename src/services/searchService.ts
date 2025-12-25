/**
 * 搜索服务层
 * 所有数据获取逻辑封装为函数，Page 只负责调用
 */

import { API_CONFIG, buildUrl } from '@/config/apiConfig';
import {
    MOCK_SEARCH_HISTORY,
    MOCK_HOT_SEARCHES,
    MOCK_SUGGESTIONS,
    MOCK_SEARCH_PRODUCTS,
    MOCK_SEARCH_POSTS,
    MOCK_SEARCH_REVIEWS,
    MOCK_SEARCH_USERS,
    MOCK_SEARCH_TOPICS,
} from '@/mocks/searchMock';

// ============ 类型定义 ============

export interface HotSearch {
    id: string;
    keyword: string;
    icon: string;
    trend: 'hot' | 'new' | 'up';
    count: string;
}

export interface SearchProduct {
    id: string;
    name: string;
    brand: string;
    image: string;
    price: number;
    rating: number;
    reviewCount: number;
    recommendRate: number;
    tag?: string;
}

export interface SearchPost {
    id: string;
    type: 'share' | 'help';
    user: { name: string; avatar: string; level: string };
    title: string;
    content: string;
    likes: number;
    comments: number;
    time: string;
    tags?: string[];
    hasAnswer?: boolean;
    reward?: number;
}

export interface SearchReview {
    id: string;
    user: { name: string; avatar: string; level: string; babyAge: string };
    product: string;
    rating: 'recommend' | 'not_recommend' | 'optional';
    summary: string;
    useDays: number;
    helpful: number;
}

export interface SearchUser {
    id: string;
    name: string;
    avatar: string;
    level: string;
    badges: string[];
    followers: number;
    posts: number;
}

export interface SearchTopic {
    id: string;
    name: string;
    icon: string;
    posts: number;
    followers: number;
}

export interface SearchResults {
    products: SearchProduct[];
    posts: SearchPost[];
    reviews: SearchReview[];
    users: SearchUser[];
    topics: SearchTopic[];
}

// ============ Service ============

class SearchService {
    private useMock = true;

    async getSearchHistory(): Promise<string[]> {
        // 从本地存储获取历史记录
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('search_history');
            if (saved) return JSON.parse(saved);
        }
        return MOCK_SEARCH_HISTORY;
    }

    async saveSearchHistory(keyword: string): Promise<void> {
        if (typeof window !== 'undefined') {
            const history = await this.getSearchHistory();
            const updated = [keyword, ...history.filter(k => k !== keyword)].slice(0, 10);
            localStorage.setItem('search_history', JSON.stringify(updated));
        }
    }

    async clearSearchHistory(): Promise<void> {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('search_history');
        }
    }

    async getHotSearches(): Promise<HotSearch[]> {
        if (this.useMock) {
            return MOCK_HOT_SEARCHES;
        }
        const response = await fetch(buildUrl('/search/hot'));
        return response.json();
    }

    async getSuggestions(query: string): Promise<string[]> {
        if (this.useMock) {
            return MOCK_SUGGESTIONS.filter(s => s.toLowerCase().includes(query.toLowerCase()));
        }
        const response = await fetch(buildUrl(`/search/suggest?q=${query}`));
        return response.json();
    }

    async search(query: string, type?: string): Promise<SearchResults> {
        if (this.useMock) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        products: MOCK_SEARCH_PRODUCTS.filter(p =>
                            p.name.toLowerCase().includes(query.toLowerCase()) ||
                            p.brand.toLowerCase().includes(query.toLowerCase())
                        ),
                        posts: MOCK_SEARCH_POSTS.filter(p =>
                            p.title.toLowerCase().includes(query.toLowerCase()) ||
                            p.content.toLowerCase().includes(query.toLowerCase())
                        ),
                        reviews: MOCK_SEARCH_REVIEWS,
                        users: MOCK_SEARCH_USERS,
                        topics: MOCK_SEARCH_TOPICS,
                    });
                }, 300);
            });
        }
        const response = await fetch(buildUrl(`/search?q=${query}&type=${type || 'all'}`));
        return response.json();
    }
}

export const searchService = new SearchService();
