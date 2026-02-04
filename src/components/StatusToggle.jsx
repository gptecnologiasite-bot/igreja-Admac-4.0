import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const StatusToggle = ({ status, onToggle }) => {
    const isActive = status === 'Ativo';

    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                onToggle();
            }}
            className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 focus:outline-none shadow-inner ${isActive ? 'bg-emerald-500' : 'bg-slate-400 dark:bg-slate-600'
                }`}
            aria-label={`Status: ${status}`}
        >
            {/* Sliding handle */}
            <motion.div
                className="w-4 h-4 bg-white rounded-full shadow-md flex items-center justify-center transition-all"
                animate={{
                    x: isActive ? 24 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                }}
            >
                {isActive ? (
                    <Check className="w-2.5 h-2.5 text-emerald-600 font-bold" />
                ) : (
                    <X className="w-2.5 h-2.5 text-slate-400" />
                )}
            </motion.div>

            {/* Labels (optional, hidden or small icons) */}
            <div className="absolute inset-0 flex items-center justify-between px-2 text-[8px] font-bold text-white pointer-events-none uppercase">
                <span className={isActive ? 'opacity-0' : 'opacity-100 ml-5'}>OFF</span>
                <span className={isActive ? 'opacity-100 mr-5' : 'opacity-0'}>ON</span>
            </div>
        </button>
    );
};

export default StatusToggle;
