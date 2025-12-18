import JSZip from 'jszip';
import { TaxData } from '../types';

const generateId = () => Math.floor(Math.random() * 1000000000000).toString();

export const generateVaudtaxFile = async (data: TaxData, filename: string = "declaration_2025") => {
  const zip = new JSZip();

  // Année fiscale (déduite ou défaut 2024)
  const fiscalYear = data.identification.periodeDebut.split('-')[0] || "2024";

  // Génération des comptes bancaires (etatTitres)
  const etatTitresXml = data.comptes.map((compte, index) => `
        <etatTitres>
            <id>etatTitres${index + 1}</id>
            <typeDeclarationTitres>RELEVE_FISCAL_BANCAIRE</typeDeclarationTitres>
            <isGenerated>true</isGenerated>
            <iban>${escapeXml(compte.iban)}</iban>
            <etablissement>${escapeXml(compte.banque)}</etablissement>
            <soldeCompteCHF>${compte.solde.toFixed(2)}</soldeCompteCHF>
            <interetsBrutsCHF>${compte.interets.toFixed(2)}</interetsBrutsCHF>
            <periodeDebut>01.01.${fiscalYear}</periodeDebut>
            <periodeFin>31.12.${fiscalYear}</periodeFin>
            <anneeFiscaleReleve>${fiscalYear}</anneeFiscaleReleve>
            <soldeTitreCHF>0.00</soldeTitreCHF>
            <dividendeBrutCHF>0.00</dividendeBrutCHF>
            <impRetenueCHF>0.00</impRetenueCHF>
            <rendementImmobilierBrutCHF>0.00</rendementImmobilierBrutCHF>
            <rendementImmobilierEtrangerBrutCHF>0.00</rendementImmobilierEtrangerBrutCHF>
            <autresProduitsCHF>0.00</autresProduitsCHF>
            <totalProduitsBrutsCHF>0.00</totalProduitsBrutsCHF>
            <impRetenueEtrangereCHF>0.00</impRetenueEtrangereCHF>
            <documentType>
                <type>RELEVE_FISCAL_BANCAIRE</type>
                <name>Relevé ${escapeXml(compte.banque)} ${fiscalYear}</name>
            </documentType>
        </etatTitres>`).join('');

  // Structure complète selon le modèle fourni
  const xmlContent = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<vaudTaxData xmlns="http://www.vd.ch/fiscalite/vaudtax">
    <fiscalPeriod>${fiscalYear}</fiscalPeriod>
    <lastGesdemReference>GEN-${generateId()}</lastGesdemReference>
    <identification>
        <isInitialized>true</isInitialized>
        <maritalStatus>${data.personne.etatCivil || 'CELIBATAIRE'}</maritalStatus>
        <isAloneWithChildren>false</isAloneWithChildren>
        <address>
            <houseNumber>0</houseNumber>
            <street>
                <longName>${escapeXml(data.personne.adresse.rue || 'Rue (A modifier)')}</longName>
                <estrid>0</estrid>
            </street>
            <locality>
                <zipCode>${escapeXml(data.personne.adresse.npa || '0000')}</zipCode>
                <longName>${escapeXml(data.personne.adresse.localite || 'Ville (A modifier)')}</longName>
                <postalLocalityHistoryId>0</postalLocalityHistoryId>
                <zipCodeId>0</zipCodeId>
            </locality>
            <country>
                <iso2Id>CH</iso2Id>
                <shortNameFr>Suisse</shortNameFr>
            </country>
        </address>
        <communeFiscale>
            <nomOfficiel>${escapeXml(data.personne.adresse.localite || 'Commune (A modifier)')}</nomOfficiel>
            <numeroOfs>0</numeroOfs>
            <sigleCanton>VD</sigleCanton>
            <estUneCommuneFaitiere>false</estUneCommuneFaitiere>
        </communeFiscale>
    </identification>
    <fiscalDeclarationType>
        <isMain>true</isMain>
        <isRectification>false</isRectification>
    </fiscalDeclarationType>
    <declarationForm>
        <version>${Number(fiscalYear) - 1}</version>
        <subForm>FORMULAIRE_PRINCIPAL</subForm>
    </declarationForm>
    <menuPrefs>
        <menuPrefs>
            <menuId>ETAT_DES_TITRES_RELEVERELEVE_FISCAL_BANCAIRE</menuId>
            <isOpen>true</isOpen>
        </menuPrefs>
    </menuPrefs>
    <etatTitres>
        ${etatTitresXml}
    </etatTitres>
    <!-- Note: Les certificats de salaire ne sont pas explicitement dans l'exemple XML fourni, 
         mais généralement stockés ailleurs ou dans des sous-formulaires spécifiques non visibles ici. 
         Ce fichier se concentre sur la structure fournie (Etat des titres). -->
</vaudTaxData>`;

  const xmlFilename = `vaudtax_data_${fiscalYear}.xml`;
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