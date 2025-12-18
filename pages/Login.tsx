import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signIn, signUp } from '../services/supabase';
import { Landmark, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LoginProps {
  isRegister?: boolean;
}

const Login: React.FC<LoginProps> = ({ isRegister = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error } = isRegister 
        ? await signUp(email, password)
        : await signIn(email, password);

      if (error) throw error;
      
      // Navigate to dashboard on success
      if (data.user) {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-white"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#00904E]"></div>

      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-2xl relative z-10 border border-gray-100">
        <div className="text-center mb-8">
          <div className="bg-[#00904E] p-3 rounded-xl w-fit mx-auto mb-4 shadow-lg">
            <Link to="/">
               <Landmark className="text-white w-8 h-8" />
            </Link>
          </div>
          <h2 className="text-3xl font-bold text-[#1E293B] brand-font">
            {isRegister ? t('auth.register_title') : t('auth.login_title')}
          </h2>
          <p className="text-[#64748B] mt-2">{t('auth.subtitle')}</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 p-3 rounded-lg mb-6 flex items-center text-sm">
            <AlertCircle className="w-4 h-4 mr-2" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-1">{t('auth.email')}</label>
            <input 
              type="email" 
              required
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3 text-[#1E293B] focus:outline-none focus:border-[#00904E] focus:ring-2 focus:ring-[#00904E]/20 transition-all"
              placeholder="exemple@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-1">{t('auth.password')}</label>
            <input 
              type="password" 
              required
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3 text-[#1E293B] focus:outline-none focus:border-[#00904E] focus:ring-2 focus:ring-[#00904E]/20 transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-[#00904E] text-white font-bold py-3 rounded-lg hover:bg-[#00703C] shadow-lg hover:shadow-xl transition-all border-b-4 border-[#006030] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? t('auth.loading') : (isRegister ? t('auth.submit_register') : t('auth.submit_login'))}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[#64748B]">
          {isRegister ? t('auth.has_account') : t('auth.no_account')} {' '}
          <Link 
            to={isRegister ? '/login' : '/register'}
            className="text-[#00904E] font-bold hover:underline"
          >
            {isRegister ? t('auth.link_login') : t('auth.link_register')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;