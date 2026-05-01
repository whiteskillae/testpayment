"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkillCardProps {
  name: string;
  level: number;
  icon: React.ReactNode;
  category: string;
}

export function SkillCard({ name, level, icon, category }: SkillCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 bg-neutral-900/50 border border-white/10 rounded-2xl backdrop-blur-sm group hover:border-indigo-500/50 transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-neutral-800 rounded-xl group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors">
          {icon}
        </div>
        <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono">{category}</span>
      </div>
      
      <h3 className="text-lg font-bold text-white mb-4">{name}</h3>
      
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-neutral-400">
          <span>Proficiency</span>
          <span>{level}%</span>
        </div>
        <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500"
          />
        </div>
      </div>
    </motion.div>
  );
}
