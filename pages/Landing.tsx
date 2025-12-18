import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, ShieldCheck, Zap, ArrowRight, Landmark } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Navbar } from '../components/Navbar';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Hero */}
      <main className="flex-grow flex flex-col">
        <div className="container mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 space-y-8 z-10">
            <div className="inline-block px-4 py-1 bg-[#D4AF37]/20 border border-[#D4AF37] rounded-full">
              <span className="text-[#B08D26] font-bold text-xs tracking-[0.2em] uppercase">{t('landing.hero_badge')}</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-[#1E293B] leading-tight brand-font">
              {t('landing.title_start')} <br />
              <span className="text-[#00904E]">{t('landing.title_end')}</span>
            </h1>
            <p className="text-xl text-[#64748B] max-w-lg leading-relaxed">
              {t('landing.subtitle')}
            </p>
            <div className="flex space-x-4">
              <Link to="/register" className="bg-[#00904E] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#00703C] transition-all hover:scale-105 flex items-center inline-flex shadow-xl border-b-4 border-[#006030]">
                {t('landing.cta_create')} <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            <div className="flex items-center space-x-6 pt-4 text-sm text-[#64748B]">
              <div className="flex items-center"><ShieldCheck className="w-5 h-5 mr-2 text-[#D4AF37]" /> {t('landing.secure')}</div>
              <div className="flex items-center"><Zap className="w-5 h-5 mr-2 text-[#D4AF37]" /> {t('landing.fast')}</div>
              <div className="flex items-center"><FileText className="w-5 h-5 mr-2 text-[#D4AF37]" /> {t('landing.compatible')}</div>
            </div>
          </div>
          
          <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
            {/* Decorative Flag Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00904E] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
            <div className="absolute top-0 right-40 w-96 h-96 bg-[#D4AF37] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
            
            <div className="relative bg-white border border-[#E2E8F0] p-8 rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="space-y-6">
                 {/* Fake UI Representation */}
                 <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#00904E] rounded-lg flex items-center justify-center text-white font-bold">VD</div>
                      <div>
                        <div className="h-3 bg-gray-200 rounded w-24 mb-1"></div>
                        <div className="h-2 bg-gray-100 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="text-[#00904E] font-bold">VaudTax</div>
                 </div>
                 <div className="space-y-3">
                    <div className="h-12 bg-[#F8FAFC] rounded border border-gray-100 w-full flex items-center px-4">
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="h-12 bg-[#F8FAFC] rounded border border-gray-100 w-full flex items-center px-4 justify-between">
                       <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                       <div className="h-4 bg-[#D4AF37]/40 rounded w-1/4"></div>
                    </div>
                 </div>
                 <div className="pt-4 flex justify-end">
                   <div className="h-10 bg-[#00904E] rounded w-1/3 shadow-lg"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Green Strip representing the flag */}
        <div className="bg-[#00904E] w-full h-32 mt-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="container mx-auto px-6 h-full flex items-center justify-between text-white/80">
             <span className="brand-font italic text-2xl text-white/20">{t('brand.motto')}</span>
             <span className="text-sm">{t('landing.footer')}</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;