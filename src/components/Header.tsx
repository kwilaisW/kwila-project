import { Shield, Github, Twitter, Instagram } from 'lucide-react';

export function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <Shield className="w-6 h-6 text-blue-400" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            Kwila <span className="text-blue-500">AI</span>
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <button 
            onClick={() => scrollToSection('how-it-works')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            How it works
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 pr-4 border-r border-slate-800">
            <a href="https://www.instagram.com/kwilaisw/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
          <button 
            onClick={() => scrollToSection('scanner')}
            className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/20"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
