import { motion } from 'motion/react';
import { CheckCircle2, AlertTriangle, Info, ShieldCheck, TrendingUp, Search, FileText } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import type { AnalysisResult } from '@/src/lib/gemini';

interface ResultsProps {
  result: AnalysisResult;
  isLoading: boolean;
}

export function Results({ result, isLoading }: ResultsProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-6">
        <div className="relative w-24 h-24">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-4 border-slate-800 border-t-blue-500"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Search className="w-8 h-8 text-blue-400" />
          </motion.div>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-slate-100">Analyzing Content...</h3>
          <p className="text-slate-400 mt-2">Checking for AI patterns and linguistic markers</p>
        </div>
      </div>
    );
  }

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'Human': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Likely AI': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'Highly Likely AI': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
      default: return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    }
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'Human': return <ShieldCheck className="w-6 h-6" />;
      case 'Likely AI': return <AlertTriangle className="w-6 h-6" />;
      case 'Highly Likely AI': return <AlertTriangle className="w-6 h-6" />;
      default: return <Info className="w-6 h-6" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Score */}
        <div className="md:col-span-2 p-8 rounded-2xl bg-slate-800/50 border border-slate-700 flex flex-col items-center justify-center text-center gap-6">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                className="stroke-slate-700 fill-none"
                strokeWidth="8"
              />
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                className={cn(
                  "fill-none transition-all duration-1000",
                  result.aiProbability > 50 ? "stroke-rose-500" : "stroke-emerald-500"
                )}
                strokeWidth="8"
                strokeDasharray={440}
                initial={{ strokeDashoffset: 440 }}
                animate={{ strokeDashoffset: 440 - (440 * result.aiProbability) / 100 }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-slate-100">{result.aiProbability}%</span>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">AI Probability</span>
            </div>
          </div>
          
          <div className={cn(
            "px-6 py-3 rounded-full border flex items-center gap-3 font-bold text-lg",
            getVerdictColor(result.verdict)
          )}>
            {getVerdictIcon(result.verdict)}
            {result.verdict}
          </div>
        </div>

        {/* Confidence Score */}
        <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700 flex flex-col items-center justify-center text-center gap-4">
          <TrendingUp className="w-10 h-10 text-blue-400" />
          <div>
            <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Confidence Score</p>
            <p className="text-3xl font-bold text-slate-100 mt-1">{(result.confidenceScore * 100).toFixed(0)}%</p>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Based on linguistic patterns, perplexity, and structural analysis.
          </p>
        </div>
      </div>

      {/* Reasoning */}
      <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700 space-y-4">
        <div className="flex items-center gap-3 text-slate-100 font-semibold text-lg">
          <Info className="w-5 h-5 text-blue-400" />
          Analysis Reasoning
        </div>
        <p className="text-slate-300 leading-relaxed">
          {result.reasoning}
        </p>
      </div>

      {/* Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {result.indicators.map((indicator, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-600 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-slate-200">{indicator.label}</h4>
              <span className="px-2 py-1 rounded bg-slate-700 text-xs font-mono text-blue-400">
                {indicator.value}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {indicator.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
