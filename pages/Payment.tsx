import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Lock, CheckCircle, ShieldCheck } from 'lucide-react';

const Payment: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const plan = searchParams.get('plan') || 'standard';
  const billing = searchParams.get('billing') || 'annual';

  // Mock Price Calculation
  const getPrice = () => {
    if (plan === 'standard') return billing === 'annual' ? '99.00 CHF' : '9.90 CHF';
    if (plan === 'pro') return billing === 'annual' ? '299.00 CHF' : '29.90 CHF';
    return '0 CHF';
  };

  const handlePayment = () => {
    setLoading(true);
    // Simulate Stripe processing delay
    setTimeout(() => {
        setLoading(false);
        setSuccess(true);
    }, 2000);
  };

  if (success) {
      return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            <div className="container mx-auto px-6 py-20 flex justify-center">
                <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full border border-green-100">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-[#00904E]">
                        <CheckCircle className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#1E293B] brand-font mb-4">{t('payment.success_title')}</h2>
                    <p className="text-[#64748B] mb-8">{t('payment.success_desc')}</p>
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="w-full bg-[#00904E] text-white py-3 rounded-lg font-bold hover:bg-[#00703C] shadow-lg transition-all"
                    >
                        {t('payment.btn_dashboard')}
                    </button>
                </div>
            </div>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-[#1E293B] brand-font mb-8 text-center">{t('payment.title')}</h1>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
           {/* Order Summary */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E2E8F0] h-fit">
              <h2 className="text-xl font-bold text-[#1E293B] mb-6">{t('payment.summary_title')}</h2>
              
              <div className="space-y-4 mb-6">
                 <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <span className="text-[#64748B]">{t('payment.plan_label')}</span>
                    <span className="font-bold text-[#1E293B] capitalize">{plan}</span>
                 </div>
                 <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <span className="text-[#64748B]">{t('payment.billing_label')}</span>
                    <span className="font-bold text-[#1E293B] capitalize">{billing}</span>
                 </div>
                 <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold text-[#1E293B]">{t('payment.total_label')}</span>
                    <span className="text-2xl font-bold text-[#00904E] brand-font">{getPrice()}</span>
                 </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg flex items-center text-sm text-[#64748B]">
                 <ShieldCheck className="w-5 h-5 mr-3 text-[#00904E]" />
                 {t('payment.secure_badge')}
              </div>
           </div>

           {/* Fake Stripe Form */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E2E8F0]">
              <div className="flex items-center justify-between mb-6">
                 <h2 className="text-xl font-bold text-[#1E293B]">{t('payment.card_details')}</h2>
                 <div className="flex space-x-2">
                    <div className="h-6 w-10 bg-gray-200 rounded"></div>
                    <div className="h-6 w-10 bg-gray-200 rounded"></div>
                 </div>
              </div>

              <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-[#1E293B] mb-1">{t('payment.card_holder')}</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#00904E]" placeholder="Jean Dupont" />
                 </div>
                 
                 <div>
                    <label className="block text-sm font-medium text-[#1E293B] mb-1">Numéro de carte</label>
                    <div className="relative">
                        <input type="text" className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:border-[#00904E]" placeholder="0000 0000 0000 0000" />
                        <CreditCard className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-[#1E293B] mb-1">Expiration</label>
                        <input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#00904E]" placeholder="MM/YY" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#1E293B] mb-1">CVC</label>
                        <div className="relative">
                            <input type="text" className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:border-[#00904E]" placeholder="123" />
                            <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                        </div>
                    </div>
                 </div>

                 <button 
                    onClick={handlePayment}
                    disabled={loading}
                    className={`w-full bg-[#635BFF] text-white py-4 rounded-lg font-bold hover:bg-[#534ac2] shadow-lg transition-all mt-6 flex justify-center items-center ${loading ? 'opacity-70 cursor-wait' : ''}`}
                 >
                    {loading ? 'Traitement...' : t('payment.pay_btn')}
                 </button>
                 
                 <p className="text-xs text-center text-gray-400 mt-4">
                    Ceci est une simulation. Aucune carte n'est réellement débitée.
                 </p>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

export default Payment;