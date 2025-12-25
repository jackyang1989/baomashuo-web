'use client';

import { useEffect } from 'react';

/**
 * antd-mobile React 19 兼容性配置
 * 参考: https://mobile.ant.design/guide/v5-for-19
 */
export function AntdMobileCompat() {
    useEffect(() => {
        // React 19 兼容性警告抑制
        const originalConsoleError = console.error;
        console.error = (...args: unknown[]) => {
            const message = args[0];
            if (typeof message === 'string' &&
                (message.includes('[Compatible] antd-mobile v5 support React') ||
                    message.includes('Warning: [antd-mobile]'))) {
                return; // 忽略兼容性警告
            }
            originalConsoleError.apply(console, args);
        };

        return () => {
            console.error = originalConsoleError;
        };
    }, []);

    return null;
}
