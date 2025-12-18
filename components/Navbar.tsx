import React from 'react';
import { LogOut, Landmark, Globe } from 'lucide-react';
import { signOut } from '../services/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../constants/translations';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-[#E2E8F0] px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      <Link to="/dashboard" className="flex items-center space-x-3 cursor-pointer group">
        <div className="bg-[#00904E] p-2 rounded-lg shadow-md group-hover:bg-[#00703C] transition-colors">
           <Landmark className="text-white w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-[#1E293B] tracking-tight brand-font leading-none">VaudTax</span>
          <span className="text-[10px] text-[#D4AF37] font-bold tracking-widest uppercase mt-0.5">{t('brand.motto')}</span>
        </div>
      </Link>
      
      <div className="flex items-center space-x-6">
        <div className="relative group flex items-center">
            <Globe className="w-4 h-4 text-gray-400 mr-2" />
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent text-sm font-medium text-[#64748B] focus:outline-none cursor-pointer hover:text-[#00904E]"
            >
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="it">Italiano</option>
              <option value="rm">Rumantsch</option>
              <option value="en">English</option>
              <option value="pt">Português</option>
              <option value="hr">B/H/S</option>
              <option value="sq">Shqip</option>
            </select>
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center space-x-2 text-[#64748B] hover:text-[#00904E] transition-colors text-sm font-medium"
        >
          <span>{t('nav.logout')}</span>
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
};