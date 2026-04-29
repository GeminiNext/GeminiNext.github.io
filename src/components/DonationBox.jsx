import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import donateImg from '../assets/donate.jpg';

const DonationBox = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* 悬浮按钮 */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 z-40 cursor-pointer group"
            >
                <div className="relative">
                    {/* 光晕效果 */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    
                    {/* 按钮主体 */}
                    <div className="relative flex items-center gap-2 px-4 py-3 bg-[#18181b] border border-yellow-500/30 rounded-full text-yellow-500 shadow-xl">
                        <span className="text-xl">🧧</span>
                        <span className="font-medium text-sm">功德箱</span>
                    </div>
                </div>
            </motion.div>

            {/* 弹出层 */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* 背景遮罩 */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        {/* 弹窗内容 */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-sm bg-[#18181b] border border-yellow-500/20 rounded-3xl p-8 shadow-2xl text-center overflow-hidden"
                        >
                            {/* 装饰背景 */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50"></div>
                            
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-yellow-500 mb-2">赛博功德箱</h3>
                                <p className="text-gray-400 text-sm">敲电子木鱼，刷 AI 题库，攒赛博功德</p>
                            </div>

                            {/* 二维码区域 */}
                            <div className="relative group mx-auto w-48 h-48 bg-white p-2 rounded-xl mb-6 shadow-inner overflow-hidden">
                                <img 
                                    src={donateImg} 
                                    alt="微信收款码" 
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                <div className="absolute inset-0 border-2 border-yellow-500/20 rounded-xl pointer-events-none group-hover:border-yellow-500/50 transition-colors"></div>
                            </div>

                            <p className="text-xs text-gray-500 mb-8 italic">“祝阁下考运亨通，功德无量”</p>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-full py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95"
                            >
                                领受功德
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default DonationBox;
