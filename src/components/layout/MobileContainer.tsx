import React from 'react';

interface MobileContainerProps {
    children: React.ReactNode;
    className?: string;
    showTabBarSpacer?: boolean;
}

/**
 * 移动端沉浸式容器
 * PC端呈现为515px宽度，无圆角，顶边对齐
 */
export const MobileContainer: React.FC<MobileContainerProps> = ({
    children,
    className = '',
    showTabBarSpacer = false
}) => {
    return (
        // 外层：PC端背景居中
        <div className="min-h-screen bg-[#E5E5E5] flex justify-center items-start">
            {/* 内层：515px宽度容器，无圆角 */}
            <div
                className={`
          w-full lg:w-[515px] 
          min-h-screen
          bg-[#F7F8FA] 
          relative 
          shadow-none lg:shadow-2xl 
          overflow-hidden 
          flex flex-col
          ${className}
        `}
            >
                <div className="flex-1 overflow-y-auto no-scrollbar">
                    {children}
                    {showTabBarSpacer && <div className="h-24" />}
                </div>
            </div>
        </div>
    );
};

