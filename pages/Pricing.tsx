import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { useLanguage } from '../contexts/LanguageContext';
import { Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing: React.FC = () => {
  const { t } = useLanguage();
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');

  const features = [
    t('pricing.feature_extract'),
    t('pricing.feature_export'),
    t('pricing.feature_support'),
    t('pricing.feature_review'),
  ];

  const getRegisterLink = (plan: string) => {
    return `/register?plan=${plan}&billing=${billing}`;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      
      <main className="container mx-auto px-6 py-20">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs mb-3 block">VaudTax Helper</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E293B] brand-font mb-6">{t('pricing.title')}</h1>
          <p className="text-[#64748B] text-lg">{t('pricing.subtitle')}</p>
        </div>

        {/* Toggle Monthly/Annual */}
        <div className="flex justify-center mb-16">
          <div className="bg-white p-1 rounded-xl border border-gray-200 inline-flex shadow-sm">
             <button 
               onClick={() => setBilling('monthly')}
               className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${billing === 'monthly' ? 'bg-[#1E293B] text-white shadow' : 'text-[#64748B] hover:text-[#1E293B]'}`}
             >
               {t('pricing.toggle_monthly')}
             </button>
             <button 
               onClick={() => setBilling('annual')}
               className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${billing === 'annual' ? 'bg-[#00904E] text-white shadow' : 'text-[#64748B] hover:text-[#00904E]'}`}
             >
               {t('pricing.toggle_annual')}
             </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 group-hover:bg-[#64748B] transition-colors"></div>
             <h3 className="text-xl font-bold text-[#1E293B] mb-2">{t('pricing.free_title')}</h3>
             <div className="text-4xl font-bold text-[#1E293B] brand-font mb-4">{t('pricing.free_price')}</div>
             <p className="text-[#64748B] text-sm mb-8 min-h-[40px]">{t('pricing.free_desc')}</p>
             
             <Link to={getRegisterLink('free')} className="block w-full py-3 px-4 rounded-xl border-2 border-[#E2E8F0] text-[#1E293B] font-bold text-center hover:border-[#00904E] hover:text-[#00904E] transition-all">
                {t('pricing.btn_choose')}
             </Link>

             <div className="mt-8 space-y-4">
               {[0].map(i => (
                 <div key={i} className="flex items-center text-sm text-[#1E293B]">
                   <Check className="w-5 h-5 text-[#00904E] mr-3" />
                   {features[i]}
                 </div>
               ))}
                {[1, 2, 3].map(i => (
                 <div key={i} className="flex items-center text-sm text-gray-300">
                   <Check className="w-5 h-5 mr-3" />
                   {features[i]}
                 </div>
               ))}
             </div>
          </div>

          {/* Standard Plan (Highlighted) */}
          <div className="bg-white rounded-2xl p-8 border-2 border-[#00904E] shadow-2xl relative overflow-hidden transform md:-translate-y-4">
             <div className="absolute top-0 right-0 bg-[#00904E] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAIRE</div>
             <h3 className="text-xl font-bold text-[#1E293B] mb-2">{t('pricing.standard_title')}</h3>
             <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-[#00904E] brand-font">
                   {billing === 'monthly' ? t('pricing.standard_price_mo') : t('pricing.standard_price_yr')}
                </span>
                <span className="text-sm text-[#64748B] ml-2">
                   {billing === 'monthly' ? t('pricing.per_month') : t('pricing.per_year')}
                </span>
             </div>
             <p className="text-[#64748B] text-sm mb-8 min-h-[40px]">{t('pricing.standard_desc')}</p>
             
             <Link to={getRegisterLink('standard')} className="block w-full py-3 px-4 rounded-xl bg-[#00904E] text-white font-bold text-center hover:bg-[#00703C] shadow-lg transition-all">
                {t('pricing.btn_choose')}
             </Link>

             <div className="mt-8 space-y-4">
               {[0, 1].map(i => (
                 <div key={i} className="flex items-center text-sm text-[#1E293B]">
                   <Check className="w-5 h-5 text-[#00904E] mr-3" />
                   {features[i]}
                 </div>
               ))}
               {[2, 3].map(i => (
                 <div key={i} className="flex items-center text-sm text-gray-300">
                   <Check className="w-5 h-5 mr-3" />
                   {features[i]}
                 </div>
               ))}
             </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37]"></div>
             <h3 className="text-xl font-bold text-[#1E293B] mb-2 flex items-center">
                {t('pricing.pro_title')} <Star className="w-4 h-4 text-[#D4AF37] ml-2 fill-current" />
             </h3>
             <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-[#1E293B] brand-font">
                   {billing === 'monthly' ? t('pricing.pro_price_mo') : t('pricing.pro_price_yr')}
                </span>
                <span className="text-sm text-[#64748B] ml-2">
                   {billing === 'monthly' ? t('pricing.per_month') : t('pricing.per_year')}
                </span>
             </div>
             <p className="text-[#64748B] text-sm mb-8 min-h-[40px]">{t('pricing.pro_desc')}</p>
             
             <Link to={getRegisterLink('pro')} className="block w-full py-3 px-4 rounded-xl border-2 border-[#E2E8F0] text-[#1E293B] font-bold text-center hover:border-[#D4AF37] hover:text-[#B08D26] transition-all">
                {t('pricing.btn_choose')}
             </Link>

             <div className="mt-8 space-y-4">
               {[0, 1, 2, 3].map(i => (
                 <div key={i} className="flex items-center text-sm text-[#1E293B]">
                   <Check className="w-5 h-5 text-[#D4AF37] mr-3" />
                   {features[i]}
                 </div>
               ))}
             </div>
          </div>
        </div>

        <div className="mt-20 text-center">
            <p className="text-[#64748B] text-sm">
              * Tous les prix incluent la TVA. Paiement sécurisé via Stripe. <br/>
              Satisfait ou remboursé sous 14 jours.
            </p>
        </div>
      </main>
    </div>
  );
};

export default Pricing;