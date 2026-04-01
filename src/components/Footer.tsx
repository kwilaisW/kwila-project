import { Shield, Mail, Phone, Github, Twitter, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              Kwila <span className="text-blue-500">AI</span>
            </span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md">
            Empowering writers, educators, and businesses to verify content authenticity with state-of-the-art AI detection.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/kwilaisw/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="space-y-6 md:justify-self-end">
          <h4 className="text-white font-semibold text-lg">Contact Us</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-blue-400" />
              obadiahkwila19@gmail.com
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-blue-400" />
              +234 9131743068
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-24 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-500 text-xs">
          © 2026 Kwila AI. All rights reserved.
        </p>
        <div className="flex items-center gap-8 text-xs text-slate-500">
          <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
}
