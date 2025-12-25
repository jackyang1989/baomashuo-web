/**
 * useSelect Hook - 选品流程状态管理
 */
import { useState, useEffect, useCallback } from 'react';
import {
    selectService,
    type ProductCategory,
    type SelectProblem,
    type BudgetRange,
    type RecommendedProduct,
    type SelectionFilters,
} from '@/services/selectService';

export interface UseSelectReturn {
    // 当前步骤
    step: number;
    setStep: (step: number) => void;

    // 数据
    categories: ProductCategory[];
    problems: SelectProblem[];
    budgets: BudgetRange[];

    // 选择状态
    selections: SelectionFilters;
    handleSelect: (key: keyof SelectionFilters, value: string) => void;

    // 推荐结果
    recommendations: RecommendedProduct[];
    resultFilters: { babyAge: string; problem: string; budget: string };
    totalCount: number;

    // 加载状态
    loading: boolean;
    loadingResults: boolean;

    // 操作
    goNext: () => void;
    goPrev: () => void;
    skipToResults: () => void;
    fetchRecommendations: () => Promise<void>;
}

export function useSelect(): UseSelectReturn {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const [loadingResults, setLoadingResults] = useState(false);

    // 数据
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [problems, setProblems] = useState<SelectProblem[]>([]);
    const [budgets, setBudgets] = useState<BudgetRange[]>([]);

    // 选择状态
    const [selections, setSelections] = useState<SelectionFilters>({
        category: '',
        problem: '',
        budget: '',
    });

    // 推荐结果
    const [recommendations, setRecommendations] = useState<RecommendedProduct[]>([]);
    const [resultFilters, setResultFilters] = useState({ babyAge: '', problem: '', budget: '' });
    const [totalCount, setTotalCount] = useState(0);

    // 初始化加载数据
    useEffect(() => {
        async function loadData() {
            setLoading(true);
            const [cats, probs, buds] = await Promise.all([
                selectService.getCategories(),
                selectService.getProblems(),
                selectService.getBudgets(),
            ]);
            setCategories(cats);
            setProblems(probs);
            setBudgets(buds);
            setLoading(false);
        }
        loadData();
    }, []);

    // 选择处理
    const handleSelect = useCallback((key: keyof SelectionFilters, value: string) => {
        setSelections(prev => ({ ...prev, [key]: value }));
    }, []);

    // 获取推荐
    const fetchRecommendations = useCallback(async () => {
        setLoadingResults(true);
        const result = await selectService.getRecommendations(selections);
        setRecommendations(result.products);
        setResultFilters(result.filters);
        setTotalCount(result.totalCount);
        setLoadingResults(false);
    }, [selections]);

    // 进入结果页时自动获取推荐
    useEffect(() => {
        if (step === 4) {
            fetchRecommendations();
        }
    }, [step, fetchRecommendations]);

    const goNext = useCallback(() => setStep(s => Math.min(s + 1, 4)), []);
    const goPrev = useCallback(() => setStep(s => Math.max(s - 1, 1)), []);
    const skipToResults = useCallback(() => setStep(4), []);

    return {
        step,
        setStep,
        categories,
        problems,
        budgets,
        selections,
        handleSelect,
        recommendations,
        resultFilters,
        totalCount,
        loading,
        loadingResults,
        goNext,
        goPrev,
        skipToResults,
        fetchRecommendations,
    };
}
