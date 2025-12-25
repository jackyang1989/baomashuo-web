'use client';

import { Card } from 'antd-mobile';
import { Sparkles, Lightbulb } from 'lucide-react';
import type { CompareResult } from '@/types/compare';

interface DecisionAdviceProps {
    advise: CompareResult['decisionAdvise'];
}

export default function DecisionAdvice({ advise }: DecisionAdviceProps) {
    // Floating panel style bottom card
    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            left: '16px',
            right: '16px',
            zIndex: 90,
            maxWidth: 'calc(512px - 32px)', // Constrain max width for desktop view within mobile container
            margin: '0 auto',
        }}>
            <Card style={{
                borderRadius: '16px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                border: '1px solid rgba(255, 143, 163, 0.2)', // Soft pink border
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
            }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #FF8FA3, #FF6B8B)', // Main Pink Theme
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 2px 8px rgba(255, 107, 139, 0.3)'
                    }}>
                        <Sparkles size={16} color="white" />
                    </div>
                    <div>
                        <div style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: '#1F2937',
                            marginBottom: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}>
                            {advise.title}
                            <span style={{ fontSize: '10px', color: '#FF6B8B', fontWeight: 'normal', background: '#FFF0F3', padding: '1px 6px', borderRadius: '4px' }}>AI 智能分析</span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#4B5563', lineHeight: '1.5' }}>
                            {advise.content}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
