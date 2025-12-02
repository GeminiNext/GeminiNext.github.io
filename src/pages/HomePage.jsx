import React from 'react';
import ToolCard from '../components/ToolCard';
import { phases } from '../data/tools';

const HomePage = () => {
    return (
        <div className="space-y-16">
            {phases.map((phase) => (
                <section key={phase.id}>
                    <div className="flex items-center gap-4 mb-8">
                        <span className={`font-mono text-xl font-bold ${phase.color === 'secondary' ? 'text-geek-secondary' : phase.color === 'primary' ? 'text-geek-primary' : 'text-white/50'}`}>
                            {phase.number}
                        </span>
                        <h2 className="text-2xl font-bold text-white">
                            {phase.title}
                            <span className={`font-mono text-sm ml-2 border px-2 py-0.5 rounded ${phase.color === 'secondary' ? 'text-geek-secondary border-geek-secondary/30' :
                                    phase.color === 'primary' ? 'text-geek-primary border-geek-primary/30' :
                                        'text-white/50 border-white/20'
                                }`}>
                                {phase.subtitle}
                            </span>
                        </h2>
                    </div>

                    <div className={`grid grid-cols-1 md:grid-cols-2 ${phase.id === 2 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6`}>
                        {phase.categories.map((category, index) => (
                            <ToolCard
                                key={index}
                                icon={category.icon}
                                title={category.title}
                                tools={category.tools}
                            />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default HomePage;
