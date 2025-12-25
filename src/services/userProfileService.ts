/**
 * 用户主页服务层
 */

import { buildUrl } from '@/config/apiConfig';
import { MOCK_USER_PROFILE, MOCK_USER_POSTS, MOCK_USER_REVIEWS, MOCK_USER_ANSWERS, MOCK_FOLLOWERS } from '@/mocks/userProfileMock';

// ============ 类型定义 ============

export interface Badge {
    id: string;
    name: string;
    icon: string;
    color: string;
}

export interface Baby {
    id: string;
    name: string;
    age: string;
    gender: string;
    emoji: string;
}

export interface UserStats {
    posts: number;
    reviews: number;
    answers: number;
    followers: number;
    following: number;
    totalLikes: number;
    helpful: number;
}

export interface UserProfile {
    id: string;
    name: string;
    avatar: string;
    level: string;
    levelName: string;
    signature: string;
    location: string;
    joinDate: string;
    badges: Badge[];
    babies: Baby[];
    stats: UserStats;
    isVerified: boolean;
    isExpert: boolean;
}

export interface UserPost {
    id: string;
    type: string;
    title: string;
    content: string;
    images?: string[];
    likes: number;
    comments: number;
    time: string;
    milestone?: { name: string; icon: string };
}

export interface UserReview {
    id: string;
    product: { name: string; image: string; brand: string };
    rating: 'recommend' | 'not-recommend';
    summary: string;
    useDays: number;
    helpful: number;
    time: string;
}

export interface UserAnswer {
    id: string;
    question: string;
    answer: string;
    likes: number;
    adopted: boolean;
    time: string;
}

export interface Follower {
    id: string;
    name: string;
    avatar: string;
    mutualFollow: boolean;
}

// ============ Service ============

class UserProfileService {
    private useMock = true;

    async getUserProfile(userId: string): Promise<UserProfile> {
        return MOCK_USER_PROFILE;
    }

    async getUserPosts(userId: string): Promise<UserPost[]> {
        return MOCK_USER_POSTS;
    }

    async getUserReviews(userId: string): Promise<UserReview[]> {
        return MOCK_USER_REVIEWS;
    }

    async getUserAnswers(userId: string): Promise<UserAnswer[]> {
        return MOCK_USER_ANSWERS;
    }

    async getFollowers(userId: string): Promise<Follower[]> {
        return MOCK_FOLLOWERS;
    }

    async followUser(userId: string): Promise<boolean> {
        return true;
    }

    async unfollowUser(userId: string): Promise<boolean> {
        return true;
    }
}

export const userProfileService = new UserProfileService();
