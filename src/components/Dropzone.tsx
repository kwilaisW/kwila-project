import React, { useState, useRef } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  className?: string;
}

export function Dropzone({ onFileSelect, className }: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={cn(
        "relative group cursor-pointer border-2 border-dashed rounded-xl p-8 transition-all duration-200 flex flex-col items-center justify-center gap-4",
        isDragging 
          ? "border-blue-500 bg-blue-500/5" 
          : "border-slate-700 hover:border-slate-500 hover:bg-slate-800/50",
        className
      )}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        className="hidden"
        accept=".txt,.docx,.pdf"
      />
      
      <div className="p-4 rounded-full bg-slate-800 group-hover:bg-slate-700 transition-colors">
        <Upload className="w-8 h-8 text-blue-400" />
      </div>
      
      <div className="text-center">
        <p className="text-lg font-medium text-slate-200">
          Click or drag document to upload
        </p>
        <p className="text-sm text-slate-400 mt-1">
          Supports .txt, .docx, and .pdf
        </p>
      </div>
    </div>
  );
}
