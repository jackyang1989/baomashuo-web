/**
 * 发帖服务层
 */

import { API_CONFIG, buildUrl } from '@/config/apiConfig';
import { MOCK_POST_TYPES, MOCK_HOT_TOPICS, MOCK_MILESTONES, MOCK_BABIES, MOCK_REWARD_OPTIONS } from '@/mocks/createPostMock';

// ============ 类型定义 ============

export interface PostType {
    id: string;
    name: string;
    icon: string;
    desc: string;
    color: string;
    badge?: string;
}

export interface HotTopic {
    id: string;
    name: string;
    icon: string;
    posts: number;
}

export interface MilestoneOption {
    id: string;
    name: string;
    icon: string;
}

export interface BabyOption {
    id: string;
    name: string;
    age: string;
    gender: string;
}

export interface CreatePostData {
    type: string;
    title?: string;
    content: string;
    images: string[];
    video?: string;
    topics: string[];
    babyId?: string;
    milestone?: string;
    linkedProductId?: string;
    visibility: 'public' | 'same_age' | 'followers' | 'private';
    allowComment: boolean;
    pollOptions?: string[];
    reward?: number;
}

// ============ Service ============

class CreatePostService {
    private useMock = true;

    async getPostTypes(): Promise<PostType[]> {
        return MOCK_POST_TYPES;
    }

    async getHotTopics(): Promise<HotTopic[]> {
        return MOCK_HOT_TOPICS;
    }

    async getMilestones(): Promise<MilestoneOption[]> {
        return MOCK_MILESTONES;
    }

    async getBabies(): Promise<BabyOption[]> {
        return MOCK_BABIES;
    }

    async getRewardOptions(): Promise<number[]> {
        return MOCK_REWARD_OPTIONS;
    }

    async searchProducts(query: string): Promise<Array<{ id: string; name: string; image: string; price: number }>> {
        return [
            { id: 'p1', name: 'Comotomo奶瓶', image: '🍼', price: 128 },
            { id: 'p2', name: 'Pigeon贝亲奶瓶', image: '🍼', price: 98 },
        ];
    }

    async createPost(data: CreatePostData): Promise<{ success: boolean; postId: string; points: number }> {
        if (this.useMock) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ success: true, postId: `post${Date.now()}`, points: 20 });
                }, 500);
            });
        }
        const response = await fetch(buildUrl('/posts'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response.json();
    }

    async saveDraft(data: Partial<CreatePostData>): Promise<boolean> {
        console.log('Saving draft:', data);
        return true;
    }

    async getDrafts(): Promise<Partial<CreatePostData>[]> {
        return [];
    }
}

export const createPostService = new CreatePostService();
