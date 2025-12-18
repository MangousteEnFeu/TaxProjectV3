export const GEMINI_API_KEY = "AIzaSyC5cs3_gulQ8wWtoDxD72gYr3KyjF-hNKw";

export const SWISS_AMOUNT_PATTERN = /-?\d{1,3}(?:[']\d{3})*(?:\.\d{2})?/g;
export const IBAN_PATTERN = /CH\d{2}[\s]?\d{4}[\s]?\d{4}[\s]?\d{4}[\s]?\d{4}[\s]?[\d\w]{0,3}/gi;
export const DATE_PATTERN = /\d{1,2}\.\d{1,2}\.\d{4}/g;

export const KNOWN_BANKS = [
  "UBS Switzerland AG", "UBS SA", "UBS AG", "UBS",
  "Credit Suisse", "CS",
  "Raiffeisen",
  "PostFinance",
  "Banque Cantonale Vaudoise", "BCV",
  "Banque Cantonale de Genève", "BCGE",
  "Zürcher Kantonalbank", "ZKB",
  "Crédit Agricole",
  "Migros Bank"
];

export const DEFAULT_TAX_DATA = {
  identification: {
    periodeDebut: "2024-01-01",
    periodeFin: "2024-12-31",
  },
  personne: {
    nom: "",
    prenom: "",
    dateNaissance: "",
    etatCivil: "",
    adresse: {
      rue: "",
      npa: "",
      localite: "",
    },
  },
  comptes: [],
  salaires: [],
  questions: {
    comptesEtranger: false,
    titres: false,
    dettes: false,
    fraisTransport: 0,
    repasExterieur: 0,
    pilier3a: 0,
    dons: 0,
  },
};
