import React, { useCallback } from 'react';
import { UploadCloud, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { UploadedFile } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  files: UploadedFile[];
  onRemove: (id: string) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFilesSelected, files, onRemove }) => {
  const { t } = useLanguage();
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      onFilesSelected(droppedFiles);
    }
  }, [onFilesSelected]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files));
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'pending': return t('upload.status_pending');
      case 'processing': return t('upload.status_processing');
      case 'success': return t('upload.status_success');
      case 'error': return t('upload.status_error');
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div 
        className="border-2 border-dashed border-[#00904E]/30 rounded-xl p-10 bg-[#F0FDF4]/50 hover:bg-[#F0FDF4] hover:border-[#00904E] transition-all cursor-pointer group text-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        <input 
          type="file" 
          id="fileInput" 
          multiple 
          className="hidden" 
          accept=".pdf,image/*,.csv,.xls,.xlsx"
          onChange={handleFileInput}
        />
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
            <UploadCloud className="w-10 h-10 text-[#00904E]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#1E293B]">{t('upload.drop_title')}</h3>
            <p className="text-[#64748B] text-sm mt-1">{t('upload.drop_desc')}</p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC]">
            <h4 className="text-sm font-bold text-[#1E293B]">{t('upload.files_list')} ({files.length})</h4>
          </div>
          <div className="divide-y divide-[#E2E8F0]">
            {files.map((f) => (
              <div key={f.id} className="p-4 flex items-center justify-between hover:bg-[#F8FAFC] transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    f.status === 'success' ? 'bg-green-100 text-[#00904E]' : 
                    f.status === 'error' ? 'bg-red-100 text-red-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {f.status === 'success' ? <CheckCircle className="w-5 h-5" /> :
                     f.status === 'error' ? <XCircle className="w-5 h-5" /> :
                     <Loader2 className="w-5 h-5 animate-spin" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1E293B] truncate max-w-[200px]">{f.file.name}</p>
                    <p className="text-xs text-[#64748B]">
                      {(f.file.size / 1024 / 1024).toFixed(2)} MB • {getStatusLabel(f.status)}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => onRemove(f.id)}
                  className="p-2 text-[#94A3B8] hover:text-red-500 transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};