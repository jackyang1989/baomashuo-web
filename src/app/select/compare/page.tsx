'use client';

import { MobileContainer } from '@/components/layout/MobileContainer';
import { useCompare } from '@/hooks/useCompare';
import CompareHeader from '@/components/compare/CompareHeader';
import CompareMatrix from '@/components/compare/CompareMatrix';
import DecisionAdvice from '@/components/compare/DecisionAdvice';
import { Toast } from 'antd-mobile';

export default function ComparePage() {
    const { data, loading, isLeading } = useCompare();

    if (loading || !data) {
        return (
            <MobileContainer>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    background: '#F7F8FA',
                    color: '#9CA3AF'
                }}>
                    加载对比数据...
                </div>
            </MobileContainer>
        );
    }

    return (
        <MobileContainer>
            <div style={{
                minHeight: '100vh',
                background: '#F7F8FA',
                paddingBottom: '100px', // Extra padding for floating panel
                position: 'relative',
            }}>
                {/* Sticky Header */}
                <CompareHeader items={data.items} />

                {/* Data Matrix */}
                <CompareMatrix items={data.items} isLeading={isLeading} />

                {/* Decision Advice (Floating or Bottom) */}
                <DecisionAdvice advise={data.decisionAdvise} />
            </div>
        </MobileContainer>
    );
}
