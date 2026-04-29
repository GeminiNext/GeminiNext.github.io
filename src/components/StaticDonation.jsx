import React from 'react';
import donateImg from '../assets/donate.jpg';

const StaticDonation = () => {
    return (
        <div className="my-12 p-8 rounded-3xl bg-[#18181b] border border-yellow-500/20 text-center relative overflow-hidden group">
            {/* 背景装饰 */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-30"></div>
            
            <div className="relative z-10">
                <h3 className="text-xl font-bold text-yellow-500 mb-2 flex items-center justify-center gap-2">
                    <span>🧧</span> 赛博功德箱
                </h3>
                <p className="text-gray-400 text-sm mb-6">觉得文章有帮助？敲敲电子木鱼，攒点赛博功德</p>

                {/* 二维码 */}
                <div className="relative mx-auto w-40 h-40 bg-white p-2 rounded-xl mb-6 shadow-xl transition-transform duration-500 group-hover:scale-105">
                    <img 
                        src={donateImg} 
                        alt="微信收款码" 
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 border-2 border-yellow-500/10 rounded-xl pointer-events-none group-hover:border-yellow-500/30 transition-colors"></div>
                </div>

                <p className="text-xs text-gray-500 italic">“功德无量，代码永无 Bug”</p>
            </div>

            {/* 底部微弱光晕 */}
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-yellow-500/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl"></div>
        </div>
    );
};

export default StaticDonation;
