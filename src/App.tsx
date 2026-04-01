import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  FileText, 
  Type as TypeIcon, 
  Upload, 
  Search, 
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Lock,
  History
} from 'lucide-react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Dropzone } from './components/Dropzone';
import { Results } from './components/Results';
import { analyzeText, type AnalysisResult } from './lib/gemini';
import { extractTextFromFile } from './lib/documentParser';
import { cn } from './lib/utils';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleAnalyze = async () => {
    let textToAnalyze = inputText;

    if (activeTab === 'file' && selectedFile) {
      try {
        setIsAnalyzing(true);
        setError(null);
        textToAnalyze = await extractTextFromFile(selectedFile);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to read file');
        setIsAnalyzing(false);
        return;
      }
    }

    if (!textToAnalyze.trim() || textToAnalyze.length < 50) {
      setError('Please provide at least 50 characters for a reliable analysis.');
      return;
    }

    try {
      setIsAnalyzing(true);
      setError(null);
      const analysisResult = await analyzeText(textToAnalyze);
      setResult(analysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setError(null);
  };

  const resetAnalysis = () => {
    setResult(null);
    setError(null);
    setInputText('');
    setSelectedFile(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      <Header />

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center space-y-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold"
          >
            <Sparkles className="w-4 h-4" />
            Next-Gen AI Content Verification
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight"
          >
            Verify Authenticity with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              Kwila Intelligence
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Detect AI-generated text from ChatGPT, Claude, Gemini, and more with 99.9% accuracy. 
            Built for writers, educators, and publishers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-4"
          >
            <button 
              onClick={() => document.getElementById('scanner')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg transition-all shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 active:scale-[0.98] flex items-center gap-3 mx-auto"
            >
              Start Scanning Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </section>

        {/* Main Interface */}
        <div id="scanner" className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="input-stage"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
              >
                {/* Tabs */}
                <div className="flex p-1 bg-slate-900 rounded-xl border border-slate-800 w-fit mx-auto">
                  <button
                    onClick={() => setActiveTab('text')}
                    className={cn(
                      "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all",
                      activeTab === 'text' 
                        ? "bg-slate-800 text-white shadow-lg" 
                        : "text-slate-400 hover:text-slate-200"
                    )}
                  >
                    <TypeIcon className="w-4 h-4" />
                    Paste Text
                  </button>
                  <button
                    onClick={() => setActiveTab('file')}
                    className={cn(
                      "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all",
                      activeTab === 'file' 
                        ? "bg-slate-800 text-white shadow-lg" 
                        : "text-slate-400 hover:text-slate-200"
                    )}
                  >
                    <Upload className="w-4 h-4" />
                    Upload File
                  </button>
                </div>

                {/* Input Area */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                    {activeTab === 'text' ? (
                      <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Paste your text here (minimum 50 characters)..."
                        className="w-full h-80 p-8 bg-transparent text-slate-200 placeholder:text-slate-600 focus:outline-none resize-none text-lg leading-relaxed"
                      />
                    ) : (
                      <div className="p-8 h-80 flex items-center justify-center">
                        {selectedFile ? (
                          <div className="flex flex-col items-center gap-4 p-8 rounded-xl bg-slate-800/50 border border-slate-700 w-full">
                            <div className="p-4 rounded-full bg-blue-500/10">
                              <FileText className="w-10 h-10 text-blue-400" />
                            </div>
                            <div className="text-center">
                              <p className="text-lg font-semibold text-white">{selectedFile.name}</p>
                              <p className="text-sm text-slate-400">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                            </div>
                            <button 
                              onClick={() => setSelectedFile(null)}
                              className="text-sm text-rose-400 hover:text-rose-300 font-medium transition-colors"
                            >
                              Remove file
                            </button>
                          </div>
                        ) : (
                          <Dropzone onFileSelect={handleFileSelect} className="w-full h-full" />
                        )}
                      </div>
                    )}
                    
                    {/* Bottom Bar */}
                    <div className="px-8 py-4 bg-slate-950/50 border-t border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-slate-500 font-medium uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <Zap className="w-3 h-3 text-blue-500" />
                          Real-time Analysis
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Lock className="w-3 h-3 text-emerald-500" />
                          Private & Secure
                        </span>
                      </div>
                      <div className="text-sm text-slate-500">
                        {inputText.length} characters
                      </div>
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {error}
                  </motion.div>
                )}

                {/* Action Button */}
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || (activeTab === 'text' ? !inputText.trim() : !selectedFile)}
                  className={cn(
                    "w-full py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-xl",
                    isAnalyzing 
                      ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
                      : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20 hover:shadow-blue-600/40 active:scale-[0.98]"
                  )}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-slate-600 border-t-white rounded-full animate-spin" />
                      Analyzing Content...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Scan for AI Content
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </motion.div>
            ) : (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    Analysis Complete
                  </h2>
                  <button
                    onClick={resetAnalysis}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-sm font-semibold text-slate-300 transition-all"
                  >
                    <History className="w-4 h-4" />
                    New Scan
                  </button>
                </div>
                
                <Results result={result} isLoading={isAnalyzing} />
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Features Grid */}
        {!result && (
          <section id="how-it-works" className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6 text-blue-400" />,
                title: "Instant Detection",
                description: "Get results in seconds with our high-performance analysis engine powered by Gemini."
              },
              {
                icon: <Shield className="w-6 h-6 text-emerald-400" />,
                title: "99.9% Accuracy",
                description: "Advanced linguistic models detect even the most sophisticated AI writing patterns."
              },
              {
                icon: <Lock className="w-6 h-6 text-indigo-400" />,
                title: "Privacy First",
                description: "Your documents are never stored or used to train models. Complete data sovereignty."
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all group"
              >
                <div className="p-3 rounded-xl bg-slate-800 w-fit mb-6 group-hover:bg-slate-700 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
