import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const generateId = () => Math.floor(Math.random() * 1000000000000).toString();

export const generateVaudtaxFile = async (declaration, filename = "declaration_2024") => {
    const zip = new JSZip();

    // Année fiscale (déduite ou défaut 2024)
    const fiscalYear = declaration.year || "2024";
    const data = declaration.tax_data || {};

    // Formater les données extraites
    const accounts = data.wealth ? data.wealth : [];
    let etatTitresXml = '';

    if (Array.isArray(accounts)) {
        etatTitresXml = accounts.map((compte, index) => {
            const solde = parseFloat(compte.amount || 0).toFixed(2);
            return `
          <etatTitres>
              <id>etatTitres${index + 1}</id>
              <typeDeclarationTitres>RELEVE_FISCAL_BANCAIRE</typeDeclarationTitres>
              <isGenerated>true</isGenerated>
              <iban>${escapeXml(compte.iban || '')}</iban>
              <etablissement>${escapeXml(compte.bank_name || 'Banque')}</etablissement>
              <soldeCompteCHF>${solde}</soldeCompteCHF>
              <interetsBrutsCHF>0.00</interetsBrutsCHF>
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
                  <name>Relevé ${escapeXml(compte.bank_name || 'Banque')} ${fiscalYear}</name>
              </documentType>
          </etatTitres>`;
        }).join('');
    }

    const name = escapeXml(data.name || 'Nom');
    const firstname = escapeXml(data.firstname || 'Prenom');

    // Structure complète selon le modèle fourni
    const xmlContent = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<vaudTaxData xmlns="http://www.vd.ch/fiscalite/vaudtax">
    <fiscalPeriod>${fiscalYear}</fiscalPeriod>
    <lastGesdemReference>GEN-${generateId()}</lastGesdemReference>
    <identification>
        <isInitialized>true</isInitialized>
        <maritalStatus>CELIBATAIRE</maritalStatus>
        <isAloneWithChildren>false</isAloneWithChildren>
        <address>
            <houseNumber>0</houseNumber>
            <street>
                <longName>A modifier</longName>
                <estrid>0</estrid>
            </street>
            <locality>
                <zipCode>0000</zipCode>
                <longName>A modifier</longName>
                <postalLocalityHistoryId>0</postalLocalityHistoryId>
                <zipCodeId>0</zipCodeId>
            </locality>
            <country>
                <iso2Id>CH</iso2Id>
                <shortNameFr>Suisse</shortNameFr>
            </country>
        </address>
        <communeFiscale>
            <nomOfficiel>Commune (A modifier)</nomOfficiel>
            <numeroOfs>0</numeroOfs>
            <sigleCanton>VD</sigleCanton>
            <estUneCommuneFaitiere>false</estUneCommuneFaitiere>
        </communeFiscale>
        <personne>
            <nom>${name}</nom>
            <prenom>${firstname}</prenom>
        </personne>
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
</vaudTaxData>`;

    const xmlFilename = `vaudtax_data_${fiscalYear}.xml`;
    zip.file(xmlFilename, xmlContent);

    const blob = await zip.generateAsync({ type: 'blob' });

    const finalFilename = filename.endsWith('.vaudtax') ? filename : `${filename}.vaudtax`;
    saveAs(blob, finalFilename);
};

function escapeXml(unsafe) {
    if (!unsafe) return '';
    return String(unsafe).replace(/[<>&'"]/g, function (c) {
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
