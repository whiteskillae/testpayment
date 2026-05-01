"use client";

import React from 'react';
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import Beams from "@/components/ui/Beams";
import { Features } from "@/components/ui/features-8";
import { FocusRail, type FocusRailItem } from "@/components/ui/focus-rail";
import { Notebook } from "@/components/ui/Notebook";
import { SkillCard } from "@/components/ui/SkillCard";
import { 
  Code2, 
  Database, 
  Layout, 
  Cpu, 
  GitBranch, 
  Cloud,
  Layers,
  ArrowDown,
  Monitor,
  Server,
  Smartphone,
  ShieldCheck,
  MousePointer2
} from "lucide-react";
import { motion } from "framer-motion";

const SKILLS = [
  { name: "React / Next.js", level: 95, icon: <Layout className="size-6" />, category: "Frontend" },
  { name: "Node.js / Express", level: 90, icon: <Server className="size-6" />, category: "Backend" },
  { name: "TypeScript", level: 88, icon: <Code2 className="size-6" />, category: "Language" },
  { name: "MongoDB / SQL", level: 85, icon: <Database className="size-6" />, category: "Database" },
  { name: "DevOps / Git", level: 82, icon: <GitBranch className="size-6" />, category: "Tools" },
  { name: "Cloud / AWS", level: 80, icon: <Cloud className="size-6" />, category: "Infrastructure" },
];

const WORKFLOW_PAGES = [
  {
    id: 1,
    title: "Idea & Planning",
    content: "We begin every project by deeply understanding the core problem. Our architects collaborate with stakeholders to define scalable roadmaps and technical specifications.",
    tags: ["Strategy", "Architecture", "Feasibility"],
    logo: <Layers className="size-12" />
  },
  {
    id: 2,
    title: "UI/UX Design",
    content: "Design is not just how it looks, but how it works. We craft pixel-perfect, accessible interfaces that provide seamless user journeys and premium aesthetics.",
    tags: ["Figma", "Accessibility", "Prototyping"],
    logo: <MousePointer2 className="size-12" />
  },
  {
    id: 3,
    title: "Development",
    content: "Our engineers write clean, modular, and maintainable code. We leverage modern frameworks like Next.js and robust backends to build high-performance applications.",
    tags: ["Typescript", "Clean Code", "React"],
    logo: <Code2 className="size-12" />
  },
  {
    id: 4,
    title: "Testing & Debugging",
    content: "Quality is non-negotiable. We implement rigorous unit, integration, and E2E testing to ensure every feature works perfectly before reaching the user.",
    tags: ["Jest", "Cypress", "QA"],
    logo: <ShieldCheck className="size-12" />
  },
  {
    id: 5,
    title: "Deployment & Scaling",
    content: "We automate deployment using CI/CD pipelines. Our solutions are designed to scale globally, ensuring fast load times and high availability for every user.",
    tags: ["CI/CD", "AWS", "Vercel"],
    logo: <Cloud className="size-12" />
  }
];

const PROJECTS: FocusRailItem[] = [
  {
    id: 1,
    title: "IGT Website",
    description: "A premium recruitment portal with complex intake systems and real-time candidate tracking.",
    meta: "Web Application • Recruitment",
    imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    href: "https://ibreugt.com",
  },
  {
    id: 2,
    title: "Vertex CRM",
    description: "Enterprise resource management system with automated lead generation and deep analytics integration.",
    meta: "Software • Enterprise",
    imageSrc: "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=2070&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 3,
    title: "Client Dashboard",
    description: "Real-time monitoring system for clients to track project progress and system performance.",
    meta: "Dashboard • Analytics",
    imageSrc: "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=2070&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 4,
    title: "Partner Portal",
    description: "Collaborative platform for partners featuring licensing systems and referral tracking.",
    meta: "B2B • Networking",
    imageSrc: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    href: "#",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden selection:bg-indigo-500/30">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Beams
            beamWidth={3}
            beamHeight={20}
            beamNumber={15}
            lightColor="#4f46e5"
            speed={1.5}
            noiseIntensity={2}
            scale={0.15}
            rotation={15}
          />
        </div>
        
        <div className="relative z-10 w-full">
          <HeroGeometric 
            badge="Vertex Tech Team"
            title1="Engineering the"
            title2="Next Digital Era"
          />
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">Explore Our World</span>
            <ArrowDown className="size-5 text-indigo-500 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Our Technical <span className="text-indigo-500">Arsenal</span></h2>
            <p className="text-neutral-400 text-lg leading-relaxed">
              We leverage a cutting-edge tech stack to build solutions that are not only powerful but also maintainable and future-proof.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS.map((skill, index) => (
              <SkillCard key={index} {...skill} />
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6 text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Why Choose Vertex</h2>
        </div>
        <Features />
      </section>

      {/* Workflow Notebook Section */}
      <section className="py-24 bg-neutral-950/50">
        <div className="container mx-auto px-6 mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Workflow</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            A peek inside our journal of creation. This is how we transform abstract ideas into digital reality.
          </p>
        </div>
        
        <Notebook pages={WORKFLOW_PAGES} />
      </section>

      {/* Partner / Client System Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ecosystem Architecture</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">Our proprietary systems connect partners, clients, and developers into a single high-performance network.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Diagram Arrows (Visual decoration for desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-[22%] right-[22%] h-px border-t border-dashed border-indigo-500/30 -translate-y-1/2 -z-10" />
            
            {[
              { title: "Partner Portal", desc: "Secure gateway for strategic partners with real-time analytics.", icon: <Users className="size-6 text-indigo-500" /> },
              { title: "Client Dashboard", desc: "Centralized control panel for project management and KPIs.", icon: <Monitor className="size-6 text-emerald-500" /> },
              { title: "IB System", desc: "Advanced referral and commission tracking for our global network.", icon: <GitBranch className="size-6 text-amber-500" /> },
              { title: "Licensing", desc: "Automated license management and compliance enforcement.", icon: <ShieldCheck className="size-6 text-rose-500" /> },
            ].map((sys, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="p-8 bg-neutral-900 border border-white/5 rounded-3xl text-center flex flex-col items-center group transition-all"
              >
                <div className="p-4 bg-neutral-800 rounded-2xl mb-6 group-hover:bg-indigo-500/10 transition-colors">
                  {sys.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{sys.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{sys.desc}</p>
                
                {/* Visual Flow Arrow */}
                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                   <ArrowDown className="size-4 text-indigo-500 animate-pulse mx-auto" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase Rail */}
      <section className="py-24">
        <div className="container mx-auto px-6 mb-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="max-w-xl">
               <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Featured Projects</h2>
               <p className="text-neutral-400">Innovative solutions delivered across various industries, from high-stakes recruitment to enterprise intelligence.</p>
            </div>
            <div className="hidden md:flex gap-4 mb-4">
              <Monitor className="size-6 text-neutral-500" />
              <Smartphone className="size-6 text-neutral-500" />
              <Server className="size-6 text-neutral-500" />
            </div>
          </div>
        </div>
        
        <FocusRail 
          items={PROJECTS}
          autoPlay={true}
          loop={true}
        />
      </section>

      {/* Footer / Contact */}
      <footer className="py-20 border-t border-white/5 text-center">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4 italic">Vertex</h3>
            <p className="text-neutral-500 max-w-md mx-auto">Building the foundations of tomorrow's technology, today.</p>
          </div>
          <div className="flex justify-center gap-8 text-sm text-neutral-400 font-mono uppercase tracking-widest">
            <a href="#" className="hover:text-indigo-500 transition-colors">Twitter</a>
            <a href="#" className="hover:text-indigo-500 transition-colors">GitHub</a>
            <a href="#" className="hover:text-indigo-500 transition-colors">LinkedIn</a>
          </div>
          <p className="mt-12 text-xs text-neutral-600">© 2026 Vertex Technology Team. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
