import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { PlusCircle, FileText, Clock, ChevronRight, Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { getDeclarations } from '../services/supabase';

interface DeclarationItem {
    id: string;
    name: string;
    year: number;
    updated_at: string;
    status: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [declarations, setDeclarations] = useState<DeclarationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeclarations = async () => {
        if (!user) return;
        const { data, error } = await getDeclarations(user.id);
        if (data) {
            setDeclarations(data as DeclarationItem[]);
        }
        setLoading(false);
    };
    fetchDeclarations();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      <Navbar />
      
      <main className="container mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-[#1E293B] brand-font">{t('dashboard.title')}</h1>
          <Link 
            to="/declaration"
            className="bg-[#00904E] text-white px-6 py-3 rounded-xl font-bold flex items-center hover:bg-[#00703C] shadow-md hover:shadow-lg transition-all"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            {t('dashboard.new_btn')}
          </Link>
        </div>

        {loading ? (
            <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-[#00904E]" />
            </div>
        ) : (
            <div className="grid gap-6">
            {declarations.length > 0 ? (
                declarations.map((decl) => (
                    <div 
                        key={decl.id}
                        onClick={() => navigate(`/declaration/${decl.id}`)}
                        className="bg-white border border-[#E2E8F0] rounded-xl p-6 hover:border-[#00904E] hover:shadow-md transition-all cursor-pointer group"
                    >
                        <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <div className="bg-[#F0FDF4] p-3 rounded-lg text-[#00904E]">
                            <FileText className="w-6 h-6" />
                            </div>
                            <div>
                            <h3 className="text-lg font-bold text-[#1E293B] group-hover:text-[#00904E] transition-colors">{decl.name || `Déclaration ${decl.year}`}</h3>
                            <p className="text-sm text-[#64748B]">{t('dashboard.modified')} {new Date(decl.updated_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="bg-[#00904E]/10 text-[#00904E] px-3 py-1 rounded-full text-xs font-bold border border-[#00904E]/20">
                                {decl.status === 'draft' ? 'Brouillon' : t('dashboard.status_finished')}
                            </span>
                            <ChevronRight className="w-5 h-5 text-[#94A3B8]" />
                        </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="bg-[#F8FAFC] border-2 border-dashed border-[#CBD5E1] rounded-xl p-8 flex flex-col items-center justify-center text-center">
                    <Clock className="w-12 h-12 text-[#94A3B8] mb-4" />
                    <h3 className="text-[#1E293B] font-medium brand-font text-lg">{t('dashboard.empty_title')}</h3>
                    <p className="text-[#64748B] text-sm mt-1">{t('dashboard.empty_desc')}</p>
                    <Link 
                    to="/declaration"
                    className="mt-4 text-[#00904E] text-sm font-bold hover:underline"
                    >
                    {t('dashboard.start_now')}
                    </Link>
                </div>
            )}
            </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;