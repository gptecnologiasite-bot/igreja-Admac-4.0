import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ isDark, toggleTheme }) => {
    return (
        <button
            onClick={toggleTheme}
            className="relative w-14 h-7 flex items-center bg-[#E5B51D] rounded-full p-1 cursor-pointer transition-all duration-300 focus:outline-none border-2 border-black/20 dark:border-white/10 shadow-sm"
            aria-label="Alternar tema"
        >
            {/* Sliding handle */}
            <motion.div
                className="w-5 h-5 bg-[#FFD700] rounded-full shadow-md flex items-center justify-center border border-black/10"
                animate={{
                    x: isDark ? 28 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                }}
            >
                {isDark ? (
                    <Moon className="w-3.5 h-3.5 text-slate-900 fill-slate-900" />
                ) : (
                    <Sun className="w-3.5 h-3.5 text-orange-600" />
                )}
            </motion.div>

            {/* Background Icons */}
            <div className={`absolute ${isDark ? 'left-2.5' : 'right-2.5'} transition-opacity duration-300 opacity-20`}>
                {isDark ? <Sun className="w-3 h-3 text-black" /> : <Moon className="w-3 h-3 text-black" />}
            </div>
        </button>
    );
};

export default ThemeToggle;
