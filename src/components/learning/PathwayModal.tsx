import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  BookOpen, 
  CheckCircle2, 
  Layers, 
  Clock, 
  BarChart, 
  Sparkles, 
  ArrowRight, 
  Database,
  Terminal,
  Award
} from 'lucide-react';

export interface CurriculumLevel {
  level: string;
  title: string;
  description: string;
  topics: string[];
}

export interface PathwayDetail {
  id: string;
  name: string;
  category: string;
  icon: string;
  level: string;
  duration: string;
  modulesCount: number;
  lessonsCount: number;
  exercisesCount: number;
  tagline: string;
  overview: string;
  curriculum: CurriculumLevel[];
  tools: string[];
  datasets: string[];
  skillsGained: string[];
  badgeColor: string;
  gradient: string;
}

interface PathwayModalProps {
  pathway: PathwayDetail | null;
  isOpen: boolean;
  onClose: () => void;
  onStartPathway: (pathwayName: string) => void;
}

export default function PathwayModal({
  pathway,
  isOpen,
  onClose,
  onStartPathway,
}: PathwayModalProps) {
  if (!isOpen || !pathway) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-900/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col my-auto border border-amber-100"
        >
          {/* Top Header Banner */}
          <div className={`p-6 sm:p-8 bg-gradient-to-br ${pathway.gradient} text-white relative flex-shrink-0`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider text-white">
                {pathway.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-wider">
                {pathway.level}
              </span>
              <span className="flex items-center space-x-1 px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-amber-100">
                <Clock className="w-3.5 h-3.5 mr-1" />
                {pathway.duration}
              </span>
            </div>

            <div className="flex items-start space-x-4">
              <div className="text-4xl p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex-shrink-0">
                {pathway.icon}
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {pathway.name}
                </h2>
                <p className="text-amber-100/90 text-sm sm:text-base mt-1.5 leading-relaxed font-light">
                  {pathway.tagline}
                </p>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 pt-4 border-t border-white/15 text-center">
              <div className="bg-black/15 backdrop-blur-sm py-2 px-3 rounded-xl border border-white/10">
                <div className="text-lg sm:text-xl font-bold text-white">{pathway.modulesCount}</div>
                <div className="text-[11px] uppercase tracking-wider text-amber-200">Modules</div>
              </div>
              <div className="bg-black/15 backdrop-blur-sm py-2 px-3 rounded-xl border border-white/10">
                <div className="text-lg sm:text-xl font-bold text-white">{pathway.lessonsCount}</div>
                <div className="text-[11px] uppercase tracking-wider text-amber-200">Lessons</div>
              </div>
              <div className="bg-black/15 backdrop-blur-sm py-2 px-3 rounded-xl border border-white/10">
                <div className="text-lg sm:text-xl font-bold text-white">{pathway.exercisesCount}</div>
                <div className="text-[11px] uppercase tracking-wider text-amber-200">Hands-on Labs</div>
              </div>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 divide-y divide-stone-100">
            {/* Overview */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Pathway Overview</span>
              </h3>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                {pathway.overview}
              </p>
            </div>

            {/* Structured Curriculum Levels */}
            <div className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center space-x-1.5">
                  <Layers className="w-4 h-4 text-amber-600" />
                  <span>Structured Learning Progression</span>
                </h3>
                <span className="text-xs font-medium text-stone-500">Step-by-step syllabus</span>
              </div>

              <div className="space-y-4">
                {pathway.curriculum.map((lvl, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-stone-50/80 border border-stone-200 hover:border-amber-300 hover:bg-amber-50/30 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="inline-flex items-center space-x-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-amber-600 text-white text-[11px] font-bold tracking-wider uppercase">
                          {lvl.level}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-stone-900">
                          {lvl.title}
                        </h4>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 mb-3">
                      {lvl.description}
                    </p>

                    {/* Topics bullet list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                      {lvl.topics.map((topic, tIdx) => (
                        <div key={tIdx} className="flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools, Datasets & Competencies */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-stone-900 uppercase tracking-wider">
                  <Terminal className="w-4 h-4 text-amber-600" />
                  <span>Tools & Stack</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {pathway.tools.map((tool, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-stone-200 text-stone-700 text-xs font-mono">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-stone-900 uppercase tracking-wider">
                  <Database className="w-4 h-4 text-amber-600" />
                  <span>Real Datasets</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {pathway.datasets.map((dataset, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-stone-200 text-stone-700 text-xs">
                      {dataset}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-stone-900 uppercase tracking-wider">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Outcomes</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {pathway.skillsGained.map((skill, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Footer CTA */}
          <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
            <div className="text-xs text-stone-600 text-center sm:text-left">
              <span className="font-semibold text-stone-800">Ready to start?</span> Enrollment grants free lifetime access to notebooks, datasets, and mentor office hours.
            </div>
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-medium text-sm transition-colors"
              >
                Back to Pathways
              </button>
              <button
                type="button"
                onClick={() => onStartPathway(pathway.name)}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium text-sm shadow-md shadow-amber-700/20 hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <span>Start This Path</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
