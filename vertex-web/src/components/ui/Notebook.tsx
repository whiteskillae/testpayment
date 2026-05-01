"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Globe, ArrowRight, BookOpen } from 'lucide-react';

interface NotebookPage {
  id: number;
  title: string;
  content: string;
  link?: string;
  logo?: React.ReactNode;
  tags?: string[];
}

interface NotebookProps {
  pages: NotebookPage[];
}

const TypewriterText = ({ text }: { text: string }) => {
  const letters = Array.from(text);
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 5,
    },
  };

  return (
    <motion.p 
      className="text-lg text-neutral-800 leading-relaxed font-serif italic"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter}
        </motion.span>
      ))}
    </motion.p>
  );
};

export function Notebook({ pages }: NotebookProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setDirection(1);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      rotateY: direction < 0 ? 90 : -90,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto h-[600px] perspective-[2000px] py-10 px-4">
      {/* Notebook Container */}
      <div className="relative w-full h-full bg-neutral-900 rounded-lg shadow-2xl overflow-hidden border border-white/5 flex">
        {/* Binder Spine (Visual only) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-4 bg-neutral-800 -translate-x-1/2 z-30 shadow-inner flex flex-col justify-around py-4 opacity-50 md:opacity-100">
           {[...Array(10)].map((_, i) => (
             <div key={i} className="w-full h-1 bg-black/50 rounded-full" />
           ))}
        </div>

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              rotateY: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="w-full h-full flex flex-col md:flex-row origin-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Left Page */}
            <div className="flex-1 bg-white p-8 md:p-12 relative overflow-hidden flex flex-col justify-center items-center text-center border-r border-neutral-200">
              {/* Paper Texture Overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]" />
              
              <div className="relative z-10 space-y-6">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-24 h-24 mx-auto bg-neutral-900 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl"
                >
                  {pages[currentPage].logo || "V"}
                </motion.div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-neutral-900">{pages[currentPage].title}</h3>
                  {pages[currentPage].link && (
                    <a 
                      href={pages[currentPage].link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                    >
                      <Globe className="size-4" />
                      {pages[currentPage].link.replace('https://', '')}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Page */}
            <div className="flex-1 bg-white p-8 md:p-12 relative overflow-hidden flex flex-col">
              {/* Paper Texture Overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]" />
              
              {/* Notebook Lines */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none flex flex-col space-y-6 pt-12 px-8">
                {[...Array(15)].map((_, i) => (
                  <div key={i} className="w-full border-b border-black" />
                ))}
              </div>

              <div className="relative z-10 flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                   <span className="text-xs font-mono text-neutral-400 block mb-2 tracking-widest uppercase">Process Step {currentPage + 1}</span>
                   <TypewriterText text={pages[currentPage].content} />
                </motion.div>

                {pages[currentPage].tags && (
                  <div className="mt-8 flex flex-wrap gap-2">
                    {pages[currentPage].tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full border border-neutral-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-6">
          <button 
            onClick={prevPage}
            disabled={currentPage === 0}
            className="p-3 rounded-full bg-neutral-900 text-white shadow-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-800 transition-colors"
          >
            <ArrowRight className="size-5 rotate-180" />
          </button>
          
          <div className="flex gap-2">
            {pages.map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  currentPage === i ? "bg-indigo-500 w-4" : "bg-neutral-400"
                )} 
              />
            ))}
          </div>

          <button 
            onClick={nextPage}
            disabled={currentPage === pages.length - 1}
            className="p-3 rounded-full bg-neutral-900 text-white shadow-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-800 transition-colors"
          >
            <ArrowRight className="size-5" />
          </button>
        </div>

        {/* Hand-drawn elements decoration */}
        <div className="absolute top-4 right-4 z-40 text-neutral-300 opacity-20 pointer-events-none hidden md:block">
           <BookOpen size={64} />
        </div>
      </div>
    </div>
  );
}
