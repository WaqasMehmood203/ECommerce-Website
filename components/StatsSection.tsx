// *********************
// Role of the component: Stats Section with Products, Happy Customers, Rating
// Name of the component: StatsSection.tsx
// Developer: UNICART Team
// Version: 1.0
// Component call: <StatsSection />
// Input parameters: no input parameters
// Output: Stats section with purple gradient background
// *********************

import React from "react";

interface StatItemProps {
    value: string;
    label: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label }) => {
    return (
        <div
            className="
        flex flex-col items-center justify-center
        px-8 py-8
        bg-white/[0.12]
        rounded-xl
        backdrop-blur-sm
        transition-all duration-300
        hover:bg-white/[0.18]
        hover:scale-105
      "
            style={{
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
            }}
        >
            <span
                className="
          text-white
          font-bold
          text-4xl md:text-5xl
          tracking-tight
          drop-shadow-lg
        "
                style={{
                    fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                    fontWeight: 700,
                    textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
                }}
            >
                {value}
            </span>
            <span
                className="
          text-white
          mt-2
          text-sm md:text-base
          tracking-wide
        "
                style={{
                    fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                    fontWeight: 500,
                    letterSpacing: "0.5px",
                    textShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
                }}
            >
                {label}
            </span>
        </div>
    );
};

const StatsSection: React.FC = () => {
    const stats = [
        { value: "500+", label: "Products" },
        { value: "50K+", label: "Happy Customers" },
        { value: "4.9", label: "Rating" },
    ];

    return (
        <section
            className="w-full py-16 md:py-20 -mt-10 md:-mt-10 relative z-1"
            style={{
                background: "linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%)",
            }}
        >
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {stats.map((stat, index) => (
                        <StatItem key={index} value={stat.value} label={stat.label} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
