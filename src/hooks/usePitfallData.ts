/**
 * 避坑榜数据处理 Hook
 */
import { useState, useMemo } from 'react';
import type { BabyAgeRange, PitfallScenario } from '@/types/review';
import {
    PITFALL_PRODUCTS,
    getPitfallsByAge,
    getPitfallsByScenario,
    getAllPitfalls
} from '@/mocks/pitfalls';

export function usePitfallData() {
    const [selectedAge, setSelectedAge] = useState<BabyAgeRange | 'all'>('all');
    const [selectedScenario, setSelectedScenario] = useState<PitfallScenario | 'all'>('all');

    const filteredPitfalls = useMemo(() => {
        let result = getAllPitfalls();

        // 按月龄筛选
        if (selectedAge !== 'all') {
            result = getPitfallsByAge(selectedAge);
        }

        // 按场景筛选
        if (selectedScenario !== 'all') {
            result = result.filter(p => p.scenarios.includes(selectedScenario));
        }

        return result.sort((a, b) => b.notRecommendCount - a.notRecommendCount);
    }, [selectedAge, selectedScenario]);

    // 统计数据
    const stats = useMemo(() => {
        return {
            totalProducts: filteredPitfalls.length,
            totalNotRecommend: filteredPitfalls.reduce((sum, p) => sum + p.notRecommendCount, 0),
            highSeverityCount: filteredPitfalls.filter(p => p.severity === 'high').length,
        };
    }, [filteredPitfalls]);

    return {
        selectedAge,
        setSelectedAge,
        selectedScenario,
        setSelectedScenario,
        pitfalls: filteredPitfalls,
        stats,
    };
}
