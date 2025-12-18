import React from 'react';
import { LogOut, Landmark, Globe, Menu, X, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../constants/translations';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.pricing'), path: '/pricing' },
    { name: t('nav.about'), path: '/about' },
  ];

  return (
    <nav className="bg-white border-b border-[#E2E8F0] sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 cursor-pointer group z-50">
            <div className="bg-[#00904E] p-2 rounded-lg shadow-md group-hover:bg-[#00703C] transition-colors">
               <Landmark className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[#1E293B] tracking-tight brand-font leading-none">VaudTax</span>
              <span className="text-[10px] text-[#D4AF37] font-bold tracking-widest uppercase mt-0.5">{t('brand.motto')}</span>
            </div>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${location.pathname === link.path ? 'text-[#00904E] font-bold' : 'text-[#64748B] hover:text-[#00904E]'}`}
                >
                  {link.name}
                </Link>
              ))}
              {user && (
                <Link 
                  to="/dashboard"
                  className={`text-sm font-medium transition-colors ${location.pathname === '/dashboard' ? 'text-[#00904E] font-bold' : 'text-[#64748B] hover:text-[#00904E]'}`}
                >
                  Dashboard
                </Link>
              )}
            </div>

            <div className="h-6 w-px bg-gray-200"></div>

            <div className="flex items-center space-x-4">
               {/* Language Selector */}
               <div className="relative group flex items-center">
                  <Globe className="w-4 h-4 text-gray-400 mr-2" />
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="bg-transparent text-sm font-medium text-[#64748B] focus:outline-none cursor-pointer hover:text-[#00904E]"
                  >
                    <option value="fr">FR</option>
                    <option value="de">DE</option>
                    <option value="it">IT</option>
                    <option value="en">EN</option>
                    <option value="pt">PT</option>
                    <option value="rm">RM</option>
                    <option value="sq">SQ</option>
                    <option value="hr">HR</option>
                  </select>
              </div>

              {user ? (
                <div className="flex items-center space-x-4">
                   <div className="text-xs text-[#64748B] flex items-center bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
                      <User className="w-3 h-3 mr-1" />
                      <span className="max-w-[100px] truncate">{user.email}</span>
                   </div>
                   <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-[#64748B] hover:text-[#00904E] transition-colors text-sm font-medium"
                   >
                    <span>{t('nav.logout')}</span>
                    <LogOut className="w-4 h-4" />
                   </button>
                </div>
              ) : (
                 <div className="flex items-center space-x-4">
                    <Link to="/login" className="text-[#64748B] hover:text-[#00904E] font-medium transition-colors text-sm">{t('nav.login')}</Link>
                    <Link to="/register" className="bg-[#00904E] text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-[#00703C] shadow-md transition-all">
                      {t('nav.start')}
                    </Link>
                 </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center z-50">
             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#1E293B]">
               {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-[#E2E8F0] py-4 px-6 flex flex-col space-y-4 shadow-xl animate-in slide-in-from-top-5">
           {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-base font-medium ${location.pathname === link.path ? 'text-[#00904E]' : 'text-[#64748B]'}`}
                >
                  {link.name}
                </Link>
           ))}
           {user && (
             <Link 
               to="/dashboard"
               onClick={() => setIsMenuOpen(false)}
               className="text-base font-medium text-[#64748B]"
             >
               Dashboard
             </Link>
           )}
           <hr className="border-gray-100" />
           <div className="flex flex-col space-y-4 pt-2">
             <div className="flex items-center justify-between">
                <span className="text-[#64748B] text-sm font-medium">Langue</span>
                <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="bg-transparent text-sm font-bold text-[#00904E] focus:outline-none"
                  >
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="it">Italiano</option>
                    <option value="en">English</option>
                    <option value="pt">Português</option>
                    <option value="rm">Rumantsch</option>
                    <option value="sq">Shqip</option>
                    <option value="hr">B/H/S</option>
                  </select>
             </div>
             {user ? (
                <button 
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  className="text-left text-[#64748B] hover:text-[#00904E] font-medium"
                >
                  {t('nav.logout')}
                </button>
             ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-[#64748B] font-medium">{t('nav.login')}</Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)} className="bg-[#00904E] text-white px-5 py-3 rounded-lg font-bold text-center">
                      {t('nav.start')}
                  </Link>
                </>
             )}
           </div>
        </div>
      )}
    </nav>
  );
};