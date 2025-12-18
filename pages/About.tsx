import React from 'react';
import { Navbar } from '../components/Navbar';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Mail, Shield, Users } from 'lucide-react';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      
      <main className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-4xl font-bold text-[#1E293B] brand-font mb-4">{t('about.title')}</h1>
            <p className="text-xl text-[#64748B]">{t('about.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-12">
              {/* Mission */}
              <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-[#00904E]/10 rounded-xl flex items-center justify-center text-[#00904E] mb-6">
                  <Users className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-[#1E293B] brand-font mb-4">{t('about.mission_title')}</h2>
                <p className="text-[#64748B] leading-relaxed">
                  {t('about.mission_desc')}
                </p>
              </section>

              {/* Privacy */}
              <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center text-[#B08D26] mb-6">
                  <Shield className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-[#1E293B] brand-font mb-4">{t('about.privacy_title')}</h2>
                <p className="text-[#64748B] leading-relaxed">
                  {t('about.privacy_desc')}
                </p>
              </section>
            </div>

            <div className="space-y-12">
               {/* Image or Visual */}
               <div className="bg-[#00904E] rounded-2xl p-8 text-white relative overflow-hidden h-64 flex items-end">
                  <div className="relative z-10">
                     <span className="font-bold text-2xl brand-font italic">Liberté et Patrie</span>
                  </div>
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#D4AF37] opacity-20 rounded-full blur-2xl transform -translate-x-10 translate-y-10"></div>
               </div>

               {/* Contact */}
               <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-[#1E293B] mb-6">
                  <Mail className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-[#1E293B] brand-font mb-4">{t('about.contact_title')}</h2>
                <p className="text-[#64748B] leading-relaxed mb-4">
                  {t('about.contact_desc')}
                </p>
                <div className="flex items-center text-[#00904E] text-sm font-bold">
                   <MapPin className="w-4 h-4 mr-2" />
                   Lausanne, Vaud, Suisse
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;