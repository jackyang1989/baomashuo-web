'use client';

import { Grid } from 'antd-mobile';
import type { CompareItem } from '@/types/compare';

interface CompareHeaderProps {
    items: CompareItem[];
}

export default function CompareHeader({ items }: CompareHeaderProps) {
    // Requirement: Sticky Header
    return (
        <div style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            background: 'rgba(247, 248, 250, 0.95)', // #F7F8FA with transparency
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid #E5E7EB',
            padding: '12px 16px',
        }}>
            {/* 
        Grid Layout: 
        First column is empty (for labels in matrix, though header only shows products).
        Or better: Header just aligns with Matrix columns. 
        Matrix usually has: [Label Column] [Product 1] [Product 2]
        Let's assume a 3-column layout where 1st is smaller label column?
        Actually, for mobile, typically we have 2-3 products side by side, and labels are row headers?
        Or labels are small text inside each cell?
        
        Let's try: [Label: 20%] [Prod 1: 40%] [Prod 2: 40%]
      */}

            <div style={{ display: 'flex' }}>
                <div style={{ width: '80px', flexShrink: 0 }}>
                    {/* Placeholder for left label column space */}
                </div>

                <div style={{ flex: 1, display: 'flex' }}>
                    {items.map((item) => (
                        <div key={item.id} style={{ flex: 1, textAlign: 'center', padding: '0 4px' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: 'white',
                                borderRadius: '8px',
                                margin: '0 auto 4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '20px',
                                border: '1px solid #E5E7EB'
                            }}>
                                {item.image}
                            </div>
                            <div style={{
                                fontSize: '12px',
                                fontWeight: 'bold',
                                color: '#1F2937',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                                {item.brand}
                            </div>
                            <div style={{
                                fontSize: '10px',
                                color: '#6B7280',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                                {item.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
