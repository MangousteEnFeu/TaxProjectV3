export interface BankAccount {
  banque: string;
  iban: string;
  titulaire: string;
  typeCompte: string;
  solde: number;
  interets: number;
  dateReleve?: string;
}

export interface Salary {
  employeur: string;
  salaireBrut: number;
  salaireNet: number;
  cotisationsAVS: number;
  cotisationsLPP: number;
  fraisProfessionnels: number;
  autresDeductions: number;
}

export interface Person {
  nom: string;
  prenom: string;
  dateNaissance: string;
  etatCivil: string;
  adresse: {
    rue: string;
    npa: string;
    localite: string;
  };
  avs?: string;
}

export interface TaxData {
  identification: {
    periodeDebut: string;
    periodeFin: string;
  };
  personne: Person;
  comptes: BankAccount[];
  salaires: Salary[];
  questions: {
    comptesEtranger: boolean;
    titres: boolean;
    dettes: boolean;
    fraisTransport: number;
    repasExterieur: number;
    pilier3a: number;
    dons: number;
  };
}

export interface UploadedFile {
  id: string;
  file: File;
  status: 'pending' | 'processing' | 'success' | 'error';
  type: 'bank' | 'salary' | 'other' | 'unknown';
}
