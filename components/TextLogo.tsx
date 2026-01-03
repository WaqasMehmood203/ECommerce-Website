// *********************
// Role of the component: Text-based UNICART logo component
// Name of the component: TextLogo.tsx
// Developer: UNICART Team
// Version: 1.0
// Component call: <TextLogo /> or <TextLogo size="lg" />
// Input parameters: size (optional) - "sm", "md", "lg"
// Output: Styled UNICART text logo
// *********************

import React from "react";
import Link from "next/link";

interface TextLogoProps {
    size?: "sm" | "md" | "lg";
    linkTo?: string;
}

const TextLogo: React.FC<TextLogoProps> = ({ size = "md", linkTo = "/" }) => {
    const sizeClasses = {
        sm: "text-2xl md:text-3xl",
        md: "text-3xl md:text-4xl",
        lg: "text-4xl md:text-5xl",
    };

    const logoContent = (
        <span
            className={`
        ${sizeClasses[size]}
        font-extrabold
        tracking-tight
        bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-600
        bg-clip-text text-transparent
        hover:from-purple-500 hover:via-violet-400 hover:to-indigo-500
        transition-all duration-300 ease-in-out
        cursor-pointer
        select-none
        drop-shadow-sm
      `}
            style={{
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                letterSpacing: "-0.02em",
            }}
        >
            UNI
            <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                CART
            </span>
        </span>
    );

    if (linkTo) {
        return (
            <Link href={linkTo} className="inline-block">
                {logoContent}
            </Link>
        );
    }

    return logoContent;
};

export default TextLogo;
