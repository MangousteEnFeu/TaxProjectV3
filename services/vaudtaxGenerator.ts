import JSZip from 'jszip';
import { TaxData } from '../types';

const generateId = () => Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
const formatDate = (date: Date) => date.toISOString().split('T')[0];

export const generateVaudtaxFile = async (data: TaxData, filename: string = "declaration_2024") => {
  const zip = new JSZip();

  const accountsXml = data.comptes.map(compte => `
        <compte>
          <banque>${escapeXml(compte.banque)}</banque>
          <iban>${escapeXml(compte.iban)}</iban>
          <titulaire>${escapeXml(compte.titulaire)}</titulaire>
          <typeCompte>${escapeXml(compte.typeCompte)}</typeCompte>
          <solde>${compte.solde}</solde>
          <interets>${compte.interets}</interets>
        </compte>`).join('');

  const salariesXml = data.salaires.map(sal => `
    <revenuActiviteLucrative>
      <employeur>${escapeXml(sal.employeur)}</employeur>
      <salaireBrut>${sal.salaireBrut}</salaireBrut>
      <salaireNet>${sal.salaireNet}</salaireNet>
      <deductionsAVS>${sal.cotisationsAVS}</deductionsAVS>
      <deductionsLPP>${sal.cotisationsLPP}</deductionsLPP>
      <fraisProfessionnels>${sal.fraisProfessionnels}</fraisProfessionnels>
    </revenuActiviteLucrative>
  `).join('');

  const totalFortune = data.comptes.reduce((sum, c) => sum + (c.solde || 0), 0);
  const totalInterets = data.comptes.reduce((sum, c) => sum + (c.interets || 0), 0);

  const xmlContent = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<CTB xmlns="http://www.tax-easy.ch/tax/xml/vd">
  <version>
    <produit>VaudTax</produit>
    <annee>${data.identification.periodeDebut.split('-')[0]}</annee>
    <versionLogiciel>2024.1.0</versionLogiciel>
  </version>
  
  <identification>
    <numeroContribuable>000000</numeroContribuable> 
    <periodeDebut>${data.identification.periodeDebut}</periodeDebut>
    <periodeFin>${data.identification.periodeFin}</periodeFin>
    <isInitialized>true</isInitialized>
  </identification>
  
  <donneesPersonnelles>
    <nom>${escapeXml(data.personne.nom)}</nom>
    <prenom>${escapeXml(data.personne.prenom)}</prenom>
    <dateNaissance>${data.personne.dateNaissance}</dateNaissance>
    <etatCivil>${data.personne.etatCivil}</etatCivil>
    <adresse>
      <rue>${escapeXml(data.personne.adresse.rue)}</rue>
      <npa>${escapeXml(data.personne.adresse.npa)}</npa>
      <localite>${escapeXml(data.personne.adresse.localite)}</localite>
    </adresse>
  </donneesPersonnelles>
  
  <revenus>
    ${salariesXml}
  </revenus>
  
  <fortune>
    <fortuneMobiliere>
      <comptesBancaires>
        ${accountsXml}
      </comptesBancaires>
      <totalFortuneMobiliere>${totalFortune}</totalFortuneMobiliere>
      <totalInterets>${totalInterets}</totalInterets>
    </fortuneMobiliere>
  </fortune>
  
  <deductions>
      <fraisTransport>${data.questions.fraisTransport}</fraisTransport>
      <repasExterieur>${data.questions.repasExterieur}</repasExterieur>
      <pilier3a>${data.questions.pilier3a}</pilier3a>
      <dons>${data.questions.dons}</dons>
  </deductions>
</CTB>`;

  const xmlFilename = `CTB_PF2024_${generateId()}_${formatDate(new Date())}.xml`;
  zip.file(xmlFilename, xmlContent);

  const blob = await zip.generateAsync({ type: 'blob' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename.endsWith('.vaudtax') ? filename : `${filename}.vaudtax`;
  link.click();
};

function escapeXml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}
