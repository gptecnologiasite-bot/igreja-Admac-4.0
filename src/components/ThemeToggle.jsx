import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ isDark, toggleTheme }) => {
    return (
        <button
            onClick={toggleTheme}
            className="relative w-14 h-7 flex items-center bg-[#EAB308] dark:bg-[#EAB308] rounded-full p-1 cursor-pointer transition-all duration-300 focus:outline-none border-2 border-[#CA8A04] shadow-md"
            aria-label="Alternar tema"
        >
            <motion.div
                className="w-5 h-5 bg-[#FEF08A] rounded-full shadow-sm flex items-center justify-center border border-[#EAB308]"
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
                    <Moon className="w-3.5 h-3.5 text-[#854D0E] fill-[#854D0E]" />
                ) : (
                    <Sun className="w-3.5 h-3.5 text-[#854D0E]" />
                )}
            </motion.div>

            {/* Background Icons */}
            <div className={`absolute ${isDark ? 'left-2.5' : 'right-2.5'} transition-opacity duration-300 opacity-40`}>
                {isDark ? <Sun className="w-3 h-3 text-[#713F12]" /> : <Moon className="w-3 h-3 text-[#713F12]" />}
            </div>
        </button>
    );
};

export default ThemeToggle;
