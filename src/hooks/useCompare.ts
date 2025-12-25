import { useState, useEffect } from 'react';
import type { CompareResult } from '@/types/compare';

// Mock Data for demonstration
const MOCK_COMPARE_DATA: CompareResult = {
    items: [
        {
            id: 'p1',
            name: 'Hegen 奶瓶',
            image: '🍼',
            brand: 'Hegen',
            price: 298,
            recommendRate: 92,
            abandonRate: 5,
            abandonReasons: ['价格太贵，配件也贵', '盖子容易松动漏奶', '方形不好握持'],
            ageSuitabilityScore: 95,
            dimensions: [
                { name: '防胀气', score: 9.5 },
                { name: '清洗便捷', score: 9.8 },
                { name: '耐摔度', score: 8.0 },
            ],
            summary: {
                pros: ['偏中心奶嘴设计防胀气', '方瓶口极其好洗', 'PPSU材质耐摔'],
                cons: ['价格较贵', '盖子容易松'],
            },
        },
        {
            id: 'p2',
            name: '贝亲 玻璃',
            image: '👶',
            brand: 'Pigeon',
            price: 158,
            recommendRate: 85,
            abandonRate: 15,
            abandonReasons: ['玻璃太重，手酸', '容易摔碎，不安全', '奶嘴容易塌陷'],
            ageSuitabilityScore: 88,
            dimensions: [
                { name: '防胀气', score: 8.5 },
                { name: '清洗便捷', score: 8.0 },
                { name: '耐摔度', score: 6.0 },
            ],
            pitfallWarning: '易碎慎入', // Pitfall warning
            summary: {
                pros: ['奶嘴亲和度高', '玻璃材质安全', '价格实惠'],
                cons: ['玻璃易碎', '比较重'],
            },
        }
    ],
    decisionAdvise: {
        title: '宝妈决策建议',
        content: '如果您预算充足且追求清洗方便，强烈推荐 Hegen；如果您更看重材质安全且预算有限，贝亲是不错的入门选择，但需注意防摔。',
        matchScore: 95,
    },
};

export function useCompare() {
    const [data, setData] = useState<CompareResult | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, parse URL search params (e.g. ?ids=p1,p2)
        // and fetch data from API.
        // For MVP, we simulate a delay and return mock data.
        const timer = setTimeout(() => {
            setData(MOCK_COMPARE_DATA);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    /**
     * Check if a product has the best score for a specific dimension
     */
    const isLeading = (productId: string, dimensionName: string): boolean => {
        if (!data) return false;

        // Find the max score for this dimension across all products
        let maxScore = -1;
        data.items.forEach(item => {
            if (dimensionName === 'recommendRate') {
                if (item.recommendRate > maxScore) maxScore = item.recommendRate;
            } else if (dimensionName === 'abandonRate') {
                // Typically lower abandon rate is better, but this helper seems to just check max "score"
                // We should ideally handle min/max logic. 
                // For now, let's keep it simple: UI should handle logic if it's specific.
                // Or we adjust logic here. Let's make "leading" mean "best desirable outcome".
                // For abandonRate, "leading" means LOWEST.
            } else {
                const dim = item.dimensions.find(d => d.name === dimensionName);
                if (dim && dim.score > maxScore) maxScore = dim.score;
            }
        });

        // Special handling for abandonRate: Leading means lowest value
        if (dimensionName === 'abandonRate') {
            let minRate = 101;
            data.items.forEach(item => {
                if (item.abandonRate < minRate) minRate = item.abandonRate;
            });
            const product = data.items.find(p => p.id === productId);
            return product ? product.abandonRate === minRate : false;
        }

        // Check if current product has that max score
        const product = data.items.find(p => p.id === productId);
        if (!product) return false;

        if (dimensionName === 'recommendRate') return product.recommendRate === maxScore;
        const dim = product.dimensions.find(d => d.name === dimensionName);
        return dim ? dim.score === maxScore : false;
    };

    return {
        data,
        loading,
        isLeading,
    };
}
