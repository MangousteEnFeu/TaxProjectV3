import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { FileUpload } from '../components/FileUpload';
import { UploadedFile, TaxData } from '../types';
import { DEFAULT_TAX_DATA } from '../constants';
import { extractDataFromDocument } from '../services/geminiService';
import { generateVaudtaxFile } from '../services/vaudtaxGenerator';
import { Loader2, CheckCircle, FileText, ChevronRight, Save, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Declaration: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [taxData, setTaxData] = useState<TaxData>(DEFAULT_TAX_DATA);
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Upload, 2: Questions, 3: Success
  const [processing, setProcessing] = useState(false);
  const { t } = useLanguage();

  // --- Handlers ---

  const handleFilesSelected = async (newFiles: File[]) => {
    const newUploadedFiles: UploadedFile[] = newFiles.map(f => ({
      id: Math.random().toString(36).substr(2, 9),
      file: f,
      status: 'pending',
      type: 'unknown'
    }));

    setFiles(prev => [...prev, ...newUploadedFiles]);
    processFiles(newUploadedFiles);
  };

  const processFiles = async (filesToProcess: UploadedFile[]) => {
    setProcessing(true);
    
    for (const fileObj of filesToProcess) {
      // Update status to processing
      setFiles(prev => prev.map(f => f.id === fileObj.id ? { ...f, status: 'processing' } : f));

      try {
        const extracted = await extractDataFromDocument(fileObj.file);
        console.log("Extracted Data:", extracted);

        // Update Tax Data based on extraction
        setTaxData(prev => {
          const newData = { ...prev };
          
          // Merge Bank Account
          if (extracted.bankAccount && (extracted.bankAccount.iban || extracted.bankAccount.solde)) {
            newData.comptes = [...newData.comptes, {
              banque: extracted.bankAccount.banque || "Banque Inconnue",
              iban: extracted.bankAccount.iban || "",
              titulaire: extracted.bankAccount.titulaire || "",
              typeCompte: extracted.bankAccount.typeCompte || "Privé",
              solde: extracted.bankAccount.solde || 0,
              interets: extracted.bankAccount.interets || 0,
              dateReleve: extracted.bankAccount.dateReleve
            }];
          }

          // Merge Salary
          if (extracted.salary && extracted.salary.salaireNet) {
            newData.salaires = [...newData.salaires, {
              employeur: extracted.salary.employeur || "Employeur",
              salaireBrut: extracted.salary.salaireBrut || 0,
              salaireNet: extracted.salary.salaireNet || 0,
              cotisationsAVS: extracted.salary.cotisationsAVS || 0,
              cotisationsLPP: extracted.salary.cotisationsLPP || 0,
              fraisProfessionnels: extracted.salary.fraisProfessionnels || 0,
              autresDeductions: extracted.salary.autresDeductions || 0
            }];
          }

          return newData;
        });

        // Update file status to success
        setFiles(prev => prev.map(f => f.id === fileObj.id ? { ...f, status: 'success' } : f));

      } catch (e) {
        console.error("Error processing file", e);
        setFiles(prev => prev.map(f => f.id === fileObj.id ? { ...f, status: 'error' } : f));
      }
    }
    setProcessing(false);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleGenerate = async () => {
    try {
      await generateVaudtaxFile(taxData, `declaration_2024_${taxData.personne.nom || 'export'}`);
      setStep(3);
    } catch (e) {
      console.error("Error generating file", e);
      alert("Erreur lors de la génération du fichier.");
    }
  };

  // --- Render Steps ---

  const renderUploadStep = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-bold text-[#1E293B] mb-4 brand-font">{t('declaration.step1_title')}</h2>
        <FileUpload onFilesSelected={handleFilesSelected} files={files} onRemove={removeFile} />
      </div>
      
      <div>
        <h2 className="text-xl font-bold text-[#1E293B] mb-4 brand-font">{t('declaration.extracted_title')}</h2>
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 space-y-6 h-fit shadow-sm">
          <div>
            <h3 className="text-[#00904E] font-bold text-sm uppercase tracking-wider mb-2">{t('declaration.income_title')}</h3>
            {taxData.salaires.length === 0 ? (
              <p className="text-[#64748B] italic text-sm">{t('declaration.no_salary')}</p>
            ) : (
              <div className="space-y-2">
                {taxData.salaires.map((s, i) => (
                  <div key={i} className="flex justify-between text-sm text-[#1E293B] border-b border-[#E2E8F0] pb-2">
                    <span>{s.employeur}</span>
                    <span className="font-mono font-medium">{s.salaireNet.toFixed(2)} CHF</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-[#1E293B] pt-2">
                  <span>{t('declaration.total_net')}</span>
                  <span>{taxData.salaires.reduce((acc, s) => acc + s.salaireNet, 0).toFixed(2)} CHF</span>
                </div>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-[#00904E] font-bold text-sm uppercase tracking-wider mb-2">{t('declaration.wealth_title')}</h3>
            {taxData.comptes.length === 0 ? (
              <p className="text-[#64748B] italic text-sm">{t('declaration.no_bank')}</p>
            ) : (
              <div className="space-y-2">
                {taxData.comptes.map((c, i) => (
                  <div key={i} className="flex justify-between text-sm text-[#1E293B] border-b border-[#E2E8F0] pb-2">
                    <span>{c.banque} ({c.iban.slice(-4)})</span>
                    <span className="font-mono font-medium">{c.solde.toFixed(2)} CHF</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-[#1E293B] pt-2">
                  <span>{t('declaration.total_wealth')}</span>
                  <span>{taxData.comptes.reduce((acc, c) => acc + c.solde, 0).toFixed(2)} CHF</span>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={() => setStep(2)}
            disabled={processing || files.length === 0}
            className={`w-full py-3 rounded-lg font-bold flex justify-center items-center transition-colors shadow-md ${
              processing || files.length === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#00904E] text-white hover:bg-[#00703C] hover:shadow-lg'
            }`}
          >
            {processing ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : t('declaration.btn_continue')}
            {!processing && <ChevronRight className="w-5 h-5 ml-1" />}
          </button>
        </div>
      </div>
    </div>
  );

  const renderQuestionsStep = () => (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-[#1E293B] mb-6 brand-font">{t('declaration.step2_title')}</h2>
      
      <div className="space-y-8">
        {/* Identité */}
        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
          <h3 className="text-lg font-bold text-[#1E293B] mb-4 flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#00904E]/10 text-[#00904E] flex items-center justify-center text-sm font-bold mr-3 border border-[#00904E]/20">1</div>
            {t('declaration.section_personal')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
               <label className="block text-sm text-[#64748B] mb-1 font-medium">{t('declaration.label_name')}</label>
               <input type="text" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded p-2 text-[#1E293B] focus:border-[#00904E] focus:outline-none" 
                 value={taxData.personne.nom} onChange={e => setTaxData({...taxData, personne: {...taxData.personne, nom: e.target.value}})} />
            </div>
            <div>
               <label className="block text-sm text-[#64748B] mb-1 font-medium">{t('declaration.label_firstname')}</label>
               <input type="text" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded p-2 text-[#1E293B] focus:border-[#00904E] focus:outline-none"
                 value={taxData.personne.prenom} onChange={e => setTaxData({...taxData, personne: {...taxData.personne, prenom: e.target.value}})} />
            </div>
            <div>
               <label className="block text-sm text-[#64748B] mb-1 font-medium">{t('declaration.label_birthdate')}</label>
               <input type="date" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded p-2 text-[#1E293B] focus:border-[#00904E] focus:outline-none"
                 value={taxData.personne.dateNaissance} onChange={e => setTaxData({...taxData, personne: {...taxData.personne, dateNaissance: e.target.value}})} />
            </div>
            <div>
               <label className="block text-sm text-[#64748B] mb-1 font-medium">{t('declaration.label_civilstatus')}</label>
               <select className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded p-2 text-[#1E293B] focus:border-[#00904E] focus:outline-none"
                 value={taxData.personne.etatCivil} onChange={e => setTaxData({...taxData, personne: {...taxData.personne, etatCivil: e.target.value}})}>
                 <option value="">{t('declaration.civil_select')}</option>
                 <option value="single">{t('declaration.civil_single')}</option>
                 <option value="married">{t('declaration.civil_married')}</option>
                 <option value="divorced">{t('declaration.civil_divorced')}</option>
               </select>
            </div>
          </div>
        </div>

        {/* Déductions */}
        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
          <h3 className="text-lg font-bold text-[#1E293B] mb-4 flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#00904E]/10 text-[#00904E] flex items-center justify-center text-sm font-bold mr-3 border border-[#00904E]/20">2</div>
            {t('declaration.section_deductions')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
               <label className="block text-sm text-[#64748B] mb-1 font-medium">{t('declaration.label_transport')}</label>
               <input type="number" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded p-2 text-[#1E293B] focus:border-[#00904E] focus:outline-none" 
                 value={taxData.questions.fraisTransport} onChange={e => setTaxData({...taxData, questions: {...taxData.questions, fraisTransport: Number(e.target.value)}})} />
             </div>
             <div>
               <label className="block text-sm text-[#64748B] mb-1 font-medium">{t('declaration.label_meal')}</label>
               <input type="number" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded p-2 text-[#1E293B] focus:border-[#00904E] focus:outline-none"
                 value={taxData.questions.repasExterieur} onChange={e => setTaxData({...taxData, questions: {...taxData.questions, repasExterieur: Number(e.target.value)}})} />
             </div>
             <div>
               <label className="block text-sm text-[#64748B] mb-1 font-medium">{t('declaration.label_3a')}</label>
               <input type="number" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded p-2 text-[#1E293B] focus:border-[#00904E] focus:outline-none"
                 value={taxData.questions.pilier3a} onChange={e => setTaxData({...taxData, questions: {...taxData.questions, pilier3a: Number(e.target.value)}})} />
             </div>
             <div>
               <label className="block text-sm text-[#64748B] mb-1 font-medium">{t('declaration.label_donations')}</label>
               <input type="number" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded p-2 text-[#1E293B] focus:border-[#00904E] focus:outline-none"
                 value={taxData.questions.dons} onChange={e => setTaxData({...taxData, questions: {...taxData.questions, dons: Number(e.target.value)}})} />
             </div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <button onClick={() => setStep(1)} className="text-[#64748B] hover:text-[#1E293B] font-medium">{t('declaration.btn_back')}</button>
          <button 
            onClick={handleGenerate}
            className="bg-[#00904E] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#00703C] transition-colors flex items-center shadow-md"
          >
            <Download className="w-5 h-5 mr-2" />
            {t('declaration.btn_generate')}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        
        {/* Progress Bar */}
        <div className="flex justify-between max-w-2xl mx-auto mb-12 relative">
           <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#E2E8F0] -z-10 transform -translate-y-1/2"></div>
           <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${step >= 1 ? 'bg-[#00904E] border-[#00904E] text-white' : 'bg-white border-[#E2E8F0] text-[#94A3B8]'}`}>1</div>
           <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${step >= 2 ? 'bg-[#00904E] border-[#00904E] text-white' : 'bg-white border-[#E2E8F0] text-[#94A3B8]'}`}>2</div>
           <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${step >= 3 ? 'bg-[#00904E] border-[#00904E] text-white' : 'bg-white border-[#E2E8F0] text-[#94A3B8]'}`}>3</div>
        </div>

        {step === 1 && renderUploadStep()}
        {step === 2 && renderQuestionsStep()}
        {step === 3 && (
           <div className="max-w-md mx-auto text-center py-20">
             <div className="bg-[#00904E]/10 p-6 rounded-full w-fit mx-auto mb-6 text-[#00904E]">
               <CheckCircle className="w-16 h-16" />
             </div>
             <h2 className="text-3xl font-bold text-[#1E293B] mb-2 brand-font">{t('declaration.step3_title')}</h2>
             <p className="text-[#64748B] mb-8">{t('declaration.step3_desc')}</p>
             <button onClick={() => setStep(1)} className="text-[#00904E] font-bold hover:underline">{t('declaration.new_decl_btn')}</button>
           </div>
        )}
      </div>
    </div>
  );
};

export default Declaration;