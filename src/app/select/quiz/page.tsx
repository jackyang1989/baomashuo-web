'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NavBar, Steps, Button, Card, ProgressBar } from 'antd-mobile';
import { ChevronRight, CheckCircle, AlertTriangle, Star, Users, Clock } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { BABY_AGE_OPTIONS, MAIN_PROBLEMS, BUDGET_RANGES, getRecommendations } from '@/mocks/quiz';
import type { BabyAgeRange, MainProblem, BudgetRange, SelectRecommendation } from '@/types/review';

const { Step } = Steps;

export default function SelectQuizPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedAge, setSelectedAge] = useState<BabyAgeRange | null>(null);
    const [selectedProblem, setSelectedProblem] = useState<MainProblem | null>(null);
    const [selectedBudget, setSelectedBudget] = useState<BudgetRange | null>(null);
    const [recommendations, setRecommendations] = useState<SelectRecommendation[]>([]);

    const handleNext = () => {
        if (currentStep === 0 && selectedAge) {
            setCurrentStep(1);
        } else if (currentStep === 1 && selectedProblem) {
            setCurrentStep(2);
        } else if (currentStep === 2) {
            // 获取推荐结果
            const results = getRecommendations(selectedProblem!, selectedAge!, selectedBudget || undefined);
            setRecommendations(results);
            setCurrentStep(3);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        } else {
            router.back();
        }
    };

    const canProceed = () => {
        if (currentStep === 0) return !!selectedAge;
        if (currentStep === 1) return !!selectedProblem;
        if (currentStep === 2) return true; // 预算可选
        return false;
    };

    return (
        <MobileContainer>
            {/* 导航栏 */}
            <div className="sticky top-0 z-50 bg-white border-b border-gray-100">
                <NavBar
                    onBack={handleBack}
                    style={{ '--height': '44px' }}
                >
                    <span className="font-bold text-[#333]">3分钟选奶瓶</span>
                </NavBar>
            </div>

            {/* 进度条 */}
            {currentStep < 3 && (
                <div className="bg-white px-4 py-3">
                    <ProgressBar
                        percent={(currentStep + 1) * 33.33}
                        style={{ '--fill-color': '#FF8FA3', '--track-color': '#f3f4f6' }}
                    />
                    <div className="flex justify-between mt-2 text-xs text-gray-400">
                        <span className={currentStep >= 0 ? 'text-[#FF8FA3]' : ''}>月龄</span>
                        <span className={currentStep >= 1 ? 'text-[#FF8FA3]' : ''}>问题</span>
                        <span className={currentStep >= 2 ? 'text-[#FF8FA3]' : ''}>预算</span>
                    </div>
                </div>
            )}

            {/* 步骤内容 */}
            <div className="flex-1 overflow-y-auto bg-[#F7F8FA]">

                {/* Step 1: 选择月龄 */}
                {currentStep === 0 && (
                    <div className="p-4">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">宝宝多大了？</h2>
                            <p className="text-sm text-gray-500">不同月龄的奶瓶需求不同</p>
                        </div>

                        <div className="space-y-3">
                            {BABY_AGE_OPTIONS.map((age) => (
                                <div
                                    key={age.value}
                                    className={`bg-white rounded-2xl p-4 cursor-pointer transition-all ${selectedAge === age.value
                                            ? 'ring-2 ring-[#FF8FA3] shadow-md'
                                            : 'shadow-sm'
                                        }`}
                                    onClick={() => setSelectedAge(age.value)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-bold text-gray-800 mb-1">{age.label}</div>
                                            <div className="text-sm text-gray-500">{age.desc}</div>
                                        </div>
                                        {selectedAge === age.value && (
                                            <CheckCircle className="w-6 h-6 text-[#FF8FA3]" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: 选择核心问题 */}
                {currentStep === 1 && (
                    <div className="p-4">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">现在最困扰的问题？</h2>
                            <p className="text-sm text-gray-500">我们会针对性推荐解决方案</p>
                        </div>

                        <div className="space-y-3">
                            {MAIN_PROBLEMS.map((problem) => (
                                <div
                                    key={problem.value}
                                    className={`bg-white rounded-2xl p-4 cursor-pointer transition-all ${selectedProblem === problem.value
                                            ? 'ring-2 ring-[#FF8FA3] shadow-md'
                                            : 'shadow-sm'
                                        }`}
                                    onClick={() => setSelectedProblem(problem.value)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="text-3xl">{problem.icon}</div>
                                        <div className="flex-1">
                                            <div className="font-bold text-gray-800 mb-1">{problem.label}</div>
                                            <div className="text-sm text-gray-500">{problem.desc}</div>
                                        </div>
                                        {selectedProblem === problem.value && (
                                            <CheckCircle className="w-6 h-6 text-[#FF8FA3]" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 3: 选择预算（可选） */}
                {currentStep === 2 && (
                    <div className="p-4">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">预算范围？</h2>
                            <p className="text-sm text-gray-500">可选，帮你筛选更合适的产品</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {BUDGET_RANGES.map((budget) => (
                                <div
                                    key={budget.value}
                                    className={`bg-white rounded-2xl p-4 cursor-pointer transition-all text-center ${selectedBudget === budget.value
                                            ? 'ring-2 ring-[#FF8FA3] shadow-md'
                                            : 'shadow-sm'
                                        }`}
                                    onClick={() => setSelectedBudget(budget.value === selectedBudget ? null : budget.value)}
                                >
                                    <div className="font-bold text-gray-800">{budget.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 text-center text-sm text-gray-400">
                            可跳过此步骤
                        </div>
                    </div>
                )}

                {/* Step 4: 推荐结果 */}
                {currentStep === 3 && (
                    <div className="p-4">
                        <div className="mb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">为你推荐</h2>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded">
                                    {BABY_AGE_OPTIONS.find(a => a.value === selectedAge)?.label}
                                </span>
                                <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
                                    {MAIN_PROBLEMS.find(p => p.value === selectedProblem)?.label}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {recommendations.map((item, index) => (
                                <div
                                    key={item.productId}
                                    className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer"
                                    onClick={() => router.push(`/product/${item.productId}`)}
                                >
                                    {/* 排名标识 */}
                                    {index === 0 && (
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                                🏆 最佳匹配
                                            </div>
                                        </div>
                                    )}

                                    {/* 产品信息 */}
                                    <div className="flex gap-3 mb-3">
                                        <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-4xl">
                                            🍼
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs text-gray-400 mb-1">{item.brandName}</div>
                                            <div className="font-bold text-[15px] text-gray-800 mb-1 line-clamp-2">
                                                {item.productName}
                                            </div>
                                            <div className="text-[#FF8FA3] font-bold">{item.priceRange}</div>
                                        </div>
                                    </div>

                                    {/* 匹配理由 */}
                                    <div className="bg-green-50 rounded-xl p-3 mb-3">
                                        <div className="text-sm text-green-700">
                                            ✓ {item.matchReason}
                                        </div>
                                    </div>

                                    {/* 核心数据 */}
                                    <div className="flex gap-3 mb-3">
                                        <div className="flex-1 bg-gray-50 rounded-lg p-2 text-center">
                                            <div className="text-lg font-bold text-[#FF8FA3]">{item.sameAgeRecommendCount}</div>
                                            <div className="text-xs text-gray-500">同月龄推荐</div>
                                        </div>
                                        <div className="flex-1 bg-gray-50 rounded-lg p-2 text-center">
                                            <div className="text-lg font-bold text-green-600">{item.problemSolveRate}%</div>
                                            <div className="text-xs text-gray-500">问题解决率</div>
                                        </div>
                                        <div className="flex-1 bg-gray-50 rounded-lg p-2 text-center">
                                            <div className="text-lg font-bold text-blue-600">{item.usageOver30DaysRate}%</div>
                                            <div className="text-xs text-gray-500">用超30天</div>
                                        </div>
                                    </div>

                                    {/* 负面提示（透明化） */}
                                    {item.warnings && item.warnings.length > 0 && (
                                        <div className="bg-orange-50 rounded-xl p-3 mb-3">
                                            <div className="flex items-start gap-2">
                                                <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                                                <div className="text-sm text-orange-700">
                                                    {item.warnings.join('；')}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* 查看详情 */}
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                        <div className="flex items-center gap-1 text-sm text-gray-500">
                                            <Star className="w-4 h-4 text-amber-400" fill="#fbbf24" />
                                            <span>{item.overallRating}分</span>
                                            <span className="mx-1">·</span>
                                            <span>{item.recommendRate}%推荐</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-[#FF8FA3] text-sm font-medium">
                                            查看详情
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 重新选择 */}
                        <div className="mt-6 text-center">
                            <button
                                className="text-sm text-gray-500 underline"
                                onClick={() => {
                                    setCurrentStep(0);
                                    setSelectedAge(null);
                                    setSelectedProblem(null);
                                    setSelectedBudget(null);
                                    setRecommendations([]);
                                }}
                            >
                                重新选择条件
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* 底部按钮 */}
            {currentStep < 3 && (
                <div className="p-4 bg-white border-t border-gray-100">
                    <Button
                        block
                        color="primary"
                        size="large"
                        disabled={!canProceed()}
                        onClick={handleNext}
                        style={{
                            '--background-color': '#FF8FA3',
                            '--border-color': '#FF8FA3',
                            borderRadius: 24,
                        }}
                    >
                        {currentStep === 2 ? '查看推荐' : '下一步'}
                    </Button>
                </div>
            )}
        </MobileContainer>
    );
}
