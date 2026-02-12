import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const StatusToggle = ({ status, onToggle }) => {
    const isActive = status === 'Ativo';

    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                onToggle();
            }}
            className={`relative w-14 h-8 flex items-center rounded-full transition-colors duration-300 focus:outline-none ${isActive ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
                }`}
            aria-label={`Status: ${status}`}
        >
            <motion.div
                className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center absolute left-1"
                animate={{
                    x: isActive ? 24 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                }}
            >
                {isActive && (
                    <Check className="w-3.5 h-3.5 text-emerald-500 font-bold" strokeWidth={3} />
                )}
            </motion.div>
        </button>
    );
};

export default StatusToggle;
