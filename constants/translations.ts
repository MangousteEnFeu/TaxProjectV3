export type Language = 'fr' | 'de' | 'it' | 'en' | 'pt' | 'sq' | 'hr' | 'rm';

export const TRANSLATIONS: Record<Language, any> = {
  fr: {
    brand: {
      motto: "Liberté et Patrie",
      desc: "Assistant VaudTax"
    },
    nav: {
      home: "Accueil",
      pricing: "Tarifs",
      about: "À propos",
      logout: "Déconnexion",
      login: "Connexion",
      start: "Commencer"
    },
    pricing: {
      title: "Nos Formules",
      subtitle: "Choisissez l'abonnement qui vous convient. Mensuel ou Annuel.",
      toggle_monthly: "Mensuel",
      toggle_annual: "Annuel (-20%)",
      free_title: "Découverte",
      free_price: "0 CHF",
      free_desc: "Pour tester l'extraction.",
      standard_title: "Standard",
      standard_price_mo: "9.90 CHF",
      standard_price_yr: "99.00 CHF",
      standard_desc: "L'essentiel pour déclarer.",
      pro_title: "Expert",
      pro_price_mo: "29.90 CHF",
      pro_price_yr: "299.00 CHF",
      pro_desc: "Support complet et revue.",
      feature_extract: "Extraction IA automatique",
      feature_export: "Export .vaudtax officiel",
      feature_support: "Support prioritaire",
      feature_review: "Vérification fiscale",
      btn_choose: "Choisir cette formule",
      per_month: "/ mois",
      per_year: "/ an"
    },
    payment: {
      title: "Paiement Sécurisé",
      summary_title: "Récapitulatif de la commande",
      plan_label: "Formule",
      billing_label: "Facturation",
      total_label: "Total à payer",
      card_details: "Détails de la carte",
      card_holder: "Titulaire de la carte",
      pay_btn: "Payer avec Stripe",
      secure_badge: "Paiement chiffré SSL",
      success_title: "Paiement Réussi !",
      success_desc: "Merci pour votre abonnement. Vous pouvez maintenant accéder à votre assistant.",
      btn_dashboard: "Accéder au Dashboard"
    },
    about: {
      title: "À propos de VaudTax Helper",
      subtitle: "Simplifier la fiscalité pour le canton de Vaud.",
      mission_title: "Notre Mission",
      mission_desc: "Nous utilisons l'intelligence artificielle de pointe pour rendre la déclaration d'impôts accessible, rapide et sans erreur pour tous les habitants du canton.",
      privacy_title: "Confidentialité",
      privacy_desc: "Vos données sont traitées localement et sécurisées. Nous ne conservons aucune donnée bancaire sensible après le traitement.",
      contact_title: "Contact",
      contact_desc: "Une question ? Écrivez-nous à support@vaudtax-helper.ch"
    },
    landing: {
      hero_badge: "Liberté et Patrie",
      title_start: "Vos impôts",
      title_end: "vaudois simplifiés",
      subtitle: "L'assistant intelligent pour générer votre déclaration VaudTax officielle en quelques minutes. Extractions automatiques, précis et sécurisé.",
      cta_create: "Créer ma déclaration",
      secure: "Sécurisé",
      fast: "Rapide",
      compatible: "Compatible VaudTax",
      footer: "© 2025 VaudTax Helper"
    },
    auth: {
      login_title: "Bienvenue",
      register_title: "Créer un compte",
      subtitle: "Accédez à votre assistant fiscal VaudTax",
      email: "Email",
      password: "Mot de passe",
      submit_login: "Se connecter",
      submit_register: "S'inscrire",
      loading: "Chargement...",
      no_account: "Pas encore de compte ?",
      has_account: "Déjà un compte ?",
      link_register: "S'inscrire",
      link_login: "Se connecter"
    },
    dashboard: {
      title: "Vos Déclarations",
      new_btn: "Nouvelle déclaration",
      empty_title: "Historique vide",
      empty_desc: "Commencez votre première déclaration pour l'année fiscale en cours",
      start_now: "Commencer maintenant",
      status_finished: "Terminée",
      modified: "Modifiée le"
    },
    upload: {
      drop_title: "Glissez vos fichiers ici",
      drop_desc: "PDF, Images, Excel, CSV",
      files_list: "Fichiers",
      status_pending: "En attente",
      status_processing: "Analyse...",
      status_success: "Traité",
      status_error: "Erreur"
    },
    declaration: {
      step1_title: "1. Importez vos documents",
      step2_title: "2. Complétez les informations",
      step3_title: "Fichier prêt !",
      step3_desc: "Votre fichier .vaudtax a été généré et téléchargé.",
      new_decl_btn: "Nouvelle déclaration",
      extracted_title: "Données extraites (Aperçu)",
      income_title: "Revenus",
      wealth_title: "Fortune",
      no_salary: "Aucun certificat de salaire détecté",
      no_bank: "Aucune attestation bancaire détectée",
      total_net: "Total Net",
      total_wealth: "Total Fortune",
      btn_continue: "Continuer",
      btn_back: "Retour",
      btn_generate: "Générer le fichier .vaudtax",
      
      section_personal: "Données personnelles",
      section_deductions: "Déductions supplémentaires",
      label_name: "Nom",
      label_firstname: "Prénom",
      label_birthdate: "Date de naissance",
      label_civilstatus: "État Civil",
      civil_select: "Sélectionner...",
      civil_single: "Célibataire",
      civil_married: "Marié(e)",
      civil_divorced: "Divorcé(e)",
      
      label_transport: "Frais de transport (annuel)",
      label_meal: "Repas hors domicile",
      label_3a: "Pilier 3a",
      label_donations: "Dons"
    }
  },
  de: {
    brand: { motto: "Freiheit und Vaterland", desc: "VaudTax Assistent" },
    nav: { home: "Startseite", pricing: "Preise", about: "Über uns", logout: "Abmelden", login: "Anmelden", start: "Starten" },
    pricing: {
      title: "Unsere Preise", subtitle: "Wählen Sie Ihr Abonnement. Monatlich oder Jährlich.",
      toggle_monthly: "Monatlich", toggle_annual: "Jährlich (-20%)",
      free_title: "Entdeckung", free_price: "0 CHF", free_desc: "Zum Testen der Extraktion.",
      standard_title: "Standard", standard_price_mo: "9.90 CHF", standard_price_yr: "99.00 CHF", standard_desc: "Die komplette Erklärung.",
      pro_title: "Experte", pro_price_mo: "29.90 CHF", pro_price_yr: "299.00 CHF", pro_desc: "Mit Expertenprüfung.",
      feature_extract: "Automatische KI-Extraktion", feature_export: "Offizieller .vaudtax Export",
      feature_support: "Prioritäts-Support", feature_review: "Steuerprüfung", btn_choose: "Wählen",
      per_month: "/ monat", per_year: "/ jahr"
    },
    payment: {
      title: "Sichere Zahlung", summary_title: "Bestellübersicht", plan_label: "Plan", billing_label: "Abrechnung",
      total_label: "Gesamtbetrag", card_details: "Kartendetails", card_holder: "Karteninhaber",
      pay_btn: "Mit Stripe bezahlen", secure_badge: "SSL-verschlüsselt",
      success_title: "Zahlung erfolgreich!", success_desc: "Danke für Ihr Abonnement.", btn_dashboard: "Zum Dashboard"
    },
    about: {
      title: "Über VaudTax Helper", subtitle: "Steuern im Kanton Waadt vereinfachen.",
      mission_title: "Unsere Mission", mission_desc: "Wir nutzen modernste KI, um die Steuererklärung für alle zugänglich zu machen.",
      privacy_title: "Datenschutz", privacy_desc: "Ihre Daten sind sicher und werden lokal verarbeitet.",
      contact_title: "Kontakt", contact_desc: "Fragen? Schreiben Sie an support@vaudtax-helper.ch"
    },
    landing: {
      hero_badge: "Freiheit und Vaterland",
      title_start: "Ihre Waadtländer Steuern",
      title_end: "vereinfacht",
      subtitle: "Der intelligente Assistent zur Erstellung Ihrer offiziellen VaudTax-Erklärung in wenigen Minuten.",
      cta_create: "Erklärung erstellen",
      secure: "Sicher", fast: "Schnell", compatible: "VaudTax kompatibel",
      footer: "© 2025 VaudTax Helfer"
    },
    auth: {
      login_title: "Willkommen", register_title: "Konto erstellen",
      subtitle: "Zugang zu Ihrem Steuerassistenten",
      email: "E-Mail", password: "Passwort",
      submit_login: "Anmelden", submit_register: "Registrieren",
      loading: "Laden...", no_account: "Noch kein Konto?", has_account: "Bereits ein Konto?",
      link_register: "Registrieren", link_login: "Anmelden"
    },
    dashboard: {
      title: "Ihre Erklärungen", new_btn: "Neue Erklärung",
      empty_title: "Leerer Verlauf", empty_desc: "Starten Sie Ihre erste Erklärung",
      start_now: "Jetzt starten", status_finished: "Abgeschlossen", modified: "Geändert am"
    },
    upload: {
      drop_title: "Dateien hier ablegen", drop_desc: "PDF, Bilder, Excel, CSV",
      files_list: "Dateien", status_pending: "Warten", status_processing: "Analyse...",
      status_success: "Fertig", status_error: "Fehler"
    },
    declaration: {
      step1_title: "1. Dokumente importieren", step2_title: "2. Informationen vervollständigen",
      step3_title: "Datei bereit!", step3_desc: "Ihre .vaudtax Datei wurde generiert.",
      new_decl_btn: "Neue Erklärung", extracted_title: "Extrahierte Daten",
      income_title: "Einkommen", wealth_title: "Vermögen",
      no_salary: "Kein Lohnausweis erkannt", no_bank: "Kein Bankbeleg erkannt",
      total_net: "Netto Total", total_wealth: "Vermögen Total",
      btn_continue: "Weiter", btn_back: "Zurück", btn_generate: ".vaudtax generieren",
      section_personal: "Persönliche Daten", section_deductions: "Zusätzliche Abzüge",
      label_name: "Name", label_firstname: "Vorname", label_birthdate: "Geburtsdatum",
      label_civilstatus: "Zivilstand", civil_select: "Wählen...",
      civil_single: "Ledig", civil_married: "Verheiratet", civil_divorced: "Geschieden",
      label_transport: "Fahrtkosten", label_meal: "Auswärtige Verpflegung",
      label_3a: "Säule 3a", label_donations: "Spenden"
    }
  },
  en: {
    brand: { motto: "Freedom and Fatherland", desc: "VaudTax Helper" },
    nav: { home: "Home", pricing: "Pricing", about: "About", logout: "Logout", login: "Login", start: "Start" },
    pricing: {
      title: "Our Pricing", subtitle: "Choose your subscription plan. Monthly or Annual.",
      toggle_monthly: "Monthly", toggle_annual: "Annual (-20%)",
      free_title: "Discovery", free_price: "0 CHF", free_desc: "To test the extraction.",
      standard_title: "Standard", standard_price_mo: "9.90 CHF", standard_price_yr: "99.00 CHF", standard_desc: "Full declaration.",
      pro_title: "Expert", pro_price_mo: "29.90 CHF", pro_price_yr: "299.00 CHF", pro_desc: "With expert review.",
      feature_extract: "Automatic AI Extraction", feature_export: "Official .vaudtax export",
      feature_support: "Priority Support", feature_review: "Tax Review", btn_choose: "Choose plan",
      per_month: "/ month", per_year: "/ year"
    },
    payment: {
      title: "Secure Payment", summary_title: "Order Summary", plan_label: "Plan", billing_label: "Billing",
      total_label: "Total to pay", card_details: "Card Details", card_holder: "Card Holder",
      pay_btn: "Pay with Stripe", secure_badge: "SSL Encrypted",
      success_title: "Payment Successful!", success_desc: "Thank you for subscribing.", btn_dashboard: "Go to Dashboard"
    },
    about: {
      title: "About VaudTax Helper", subtitle: "Simplifying taxation for the Canton of Vaud.",
      mission_title: "Our Mission", mission_desc: "We use cutting-edge AI to make tax declaration accessible, fast, and error-free for everyone.",
      privacy_title: "Privacy", privacy_desc: "Your data is processed locally and secured.",
      contact_title: "Contact", contact_desc: "Questions? Email us at support@vaudtax-helper.ch"
    },
    landing: {
      hero_badge: "Freedom and Fatherland",
      title_start: "Your Vaud taxes",
      title_end: "simplified",
      subtitle: "The intelligent assistant to generate your official VaudTax declaration in minutes.",
      cta_create: "Create declaration",
      secure: "Secure", fast: "Fast", compatible: "VaudTax compatible",
      footer: "© 2025 VaudTax Helper"
    },
    auth: {
      login_title: "Welcome", register_title: "Create account",
      subtitle: "Access your tax assistant",
      email: "Email", password: "Password",
      submit_login: "Login", submit_register: "Sign up",
      loading: "Loading...", no_account: "No account yet?", has_account: "Already have an account?",
      link_register: "Sign up", link_login: "Login"
    },
    dashboard: {
      title: "Your Declarations", new_btn: "New declaration",
      empty_title: "Empty history", empty_desc: "Start your first declaration",
      start_now: "Start now", status_finished: "Finished", modified: "Modified on"
    },
    upload: {
      drop_title: "Drop files here", drop_desc: "PDF, Images, Excel, CSV",
      files_list: "Files", status_pending: "Pending", status_processing: "Analyzing...",
      status_success: "Done", status_error: "Error"
    },
    declaration: {
      step1_title: "1. Import documents", step2_title: "2. Complete information",
      step3_title: "File ready!", step3_desc: "Your .vaudtax file has been generated.",
      new_decl_btn: "New declaration", extracted_title: "Extracted Data",
      income_title: "Income", wealth_title: "Wealth",
      no_salary: "No salary certificate detected", no_bank: "No bank statement detected",
      total_net: "Total Net", total_wealth: "Total Wealth",
      btn_continue: "Continue", btn_back: "Back", btn_generate: "Generate .vaudtax",
      section_personal: "Personal Data", section_deductions: "Additional Deductions",
      label_name: "Last Name", label_firstname: "First Name", label_birthdate: "Birthdate",
      label_civilstatus: "Civil Status", civil_select: "Select...",
      civil_single: "Single", civil_married: "Married", civil_divorced: "Divorced",
      label_transport: "Transport costs", label_meal: "Meals away from home",
      label_3a: "Pillar 3a", label_donations: "Donations"
    }
  },
  it: {
    brand: { motto: "Libertà e Patria", desc: "Assistente VaudTax" },
    nav: { home: "Home", pricing: "Prezzi", about: "Info", logout: "Disconnetti", login: "Accedi", start: "Inizia" },
    pricing: {
      title: "I nostri prezzi", subtitle: "Scegli il tuo abbonamento.",
      toggle_monthly: "Mensile", toggle_annual: "Annuale (-20%)",
      free_title: "Scoperta", free_price: "0 CHF", free_desc: "Per testare.",
      standard_title: "Standard", standard_price_mo: "9.90 CHF", standard_price_yr: "99.00 CHF", standard_desc: "Dichiarazione completa.",
      pro_title: "Esperto", pro_price_mo: "29.90 CHF", pro_price_yr: "299.00 CHF", pro_desc: "Con revisione.",
      feature_extract: "Estrazione IA", feature_export: "Export .vaudtax ufficiale",
      feature_support: "Supporto prioritario", feature_review: "Revisione fiscale", btn_choose: "Scegliere",
      per_month: "/ mese", per_year: "/ anno"
    },
    payment: {
      title: "Pagamento Sicuro", summary_title: "Riepilogo", plan_label: "Piano", billing_label: "Fatturazione",
      total_label: "Totale", card_details: "Dettagli carta", card_holder: "Titolare",
      pay_btn: "Paga con Stripe", secure_badge: "Crittografia SSL",
      success_title: "Pagamento Riuscito!", success_desc: "Grazie per l'abbonamento.", btn_dashboard: "Vai al Dashboard"
    },
    about: {
      title: "Chi siamo", subtitle: "Semplifichiamo la fiscalità nel Canton Vaud.",
      mission_title: "La nostra missione", mission_desc: "Usiamo l'IA per rendere la dichiarazione accessibile e veloce.",
      privacy_title: "Privacy", privacy_desc: "I tuoi dati sono sicuri.",
      contact_title: "Contatto", contact_desc: "Domande? support@vaudtax-helper.ch"
    },
    landing: {
      hero_badge: "Libertà e Patria",
      title_start: "Le tue tasse",
      title_end: "semplificate",
      subtitle: "L'assistente intelligente per generare la tua dichiarazione VaudTax in pochi minuti.",
      cta_create: "Crea dichiarazione",
      secure: "Sicuro", fast: "Veloce", compatible: "Compatibile VaudTax",
      footer: "© 2025 VaudTax Helper"
    },
    auth: {
      login_title: "Benvenuto", register_title: "Crea account",
      subtitle: "Accedi al tuo assistente fiscale",
      email: "Email", password: "Password",
      submit_login: "Accedi", submit_register: "Registrati",
      loading: "Caricamento...", no_account: "Non hai un account?", has_account: "Hai già un account?",
      link_register: "Registrati", link_login: "Accedi"
    },
    dashboard: {
      title: "Le tue dichiarazioni", new_btn: "Nuova dichiarazione",
      empty_title: "Cronologia vuota", empty_desc: "Inizia la tua prima dichiarazione",
      start_now: "Inizia ora", status_finished: "Completata", modified: "Modificato il"
    },
    upload: {
      drop_title: "Trascina i file qui", drop_desc: "PDF, Immagini, Excel, CSV",
      files_list: "File", status_pending: "In attesa", status_processing: "Analisi...",
      status_success: "Fatto", status_error: "Errore"
    },
    declaration: {
      step1_title: "1. Importa documenti", step2_title: "2. Completa informazioni",
      step3_title: "File pronto!", step3_desc: "Il tuo file .vaudtax è stato generato.",
      new_decl_btn: "Nuova dichiarazione", extracted_title: "Dati estratti",
      income_title: "Reddito", wealth_title: "Sostanza",
      no_salary: "Nessun certificato di salario", no_bank: "Nessuna attestazione bancaria",
      total_net: "Totale Netto", total_wealth: "Totale Sostanza",
      btn_continue: "Continua", btn_back: "Indietro", btn_generate: "Genera .vaudtax",
      section_personal: "Dati personali", section_deductions: "Deduzioni supplementari",
      label_name: "Cognome", label_firstname: "Nome", label_birthdate: "Data di nascita",
      label_civilstatus: "Stato civile", civil_select: "Seleziona...",
      civil_single: "Celibe/Nubile", civil_married: "Coniugato/a", civil_divorced: "Divorziato/a",
      label_transport: "Spese trasporto", label_meal: "Pasti fuori casa",
      label_3a: "Pilastro 3a", label_donations: "Donazioni"
    }
  },
  pt: {
    brand: { motto: "Liberdade e Pátria", desc: "Assistente VaudTax" },
    nav: { home: "Início", pricing: "Preços", about: "Sobre", logout: "Sair", login: "Entrar", start: "Começar" },
    pricing: {
      title: "Nossos Preços", subtitle: "Planos transparentes.",
      toggle_monthly: "Mensal", toggle_annual: "Anual (-20%)",
      free_title: "Descoberta", free_price: "0 CHF", free_desc: "Para testar.",
      standard_title: "Padrão", standard_price_mo: "9.90 CHF", standard_price_yr: "99.00 CHF", standard_desc: "Declaração completa.",
      pro_title: "Expert", pro_price_mo: "29.90 CHF", pro_price_yr: "299.00 CHF", pro_desc: "Com revisão.",
      feature_extract: "Extração IA", feature_export: "Exportação .vaudtax",
      feature_support: "Suporte", feature_review: "Revisão", btn_choose: "Escolher",
      per_month: "/ mês", per_year: "/ ano"
    },
    payment: {
      title: "Pagamento Seguro", summary_title: "Resumo", plan_label: "Plano", billing_label: "Cobrança",
      total_label: "Total", card_details: "Detalhes do cartão", card_holder: "Titular",
      pay_btn: "Pagar com Stripe", secure_badge: "SSL Seguro",
      success_title: "Sucesso!", success_desc: "Obrigado.", btn_dashboard: "Ir para Dashboard"
    },
    about: {
      title: "Sobre Nós", subtitle: "Simplificando impostos em Vaud.",
      mission_title: "Missão", mission_desc: "IA para impostos acessíveis.",
      privacy_title: "Privacidade", privacy_desc: "Dados seguros.",
      contact_title: "Contato", contact_desc: "support@vaudtax-helper.ch"
    },
    landing: {
      hero_badge: "Liberdade e Pátria",
      title_start: "Seus impostos",
      title_end: "simplificados",
      subtitle: "O assistente inteligente para gerar sua declaração VaudTax em minutos.",
      cta_create: "Criar declaração",
      secure: "Seguro", fast: "Rápido", compatible: "Compatível VaudTax",
      footer: "© 2025 VaudTax Helper"
    },
    auth: {
      login_title: "Bem-vindo", register_title: "Criar conta",
      subtitle: "Acesse seu assistente fiscal",
      email: "Email", password: "Senha",
      submit_login: "Entrar", submit_register: "Registrar",
      loading: "Carregando...", no_account: "Ainda não tem conta?", has_account: "Já tem conta?",
      link_register: "Registrar", link_login: "Entrar"
    },
    dashboard: {
      title: "Suas Declarações", new_btn: "Nova declaração",
      empty_title: "Histórico vazio", empty_desc: "Comece sua primeira declaração",
      start_now: "Começar agora", status_finished: "Concluída", modified: "Modificado em"
    },
    upload: {
      drop_title: "Arraste arquivos aqui", drop_desc: "PDF, Imagens, Excel, CSV",
      files_list: "Arquivos", status_pending: "Pendente", status_processing: "Analisando...",
      status_success: "Pronto", status_error: "Erro"
    },
    declaration: {
      step1_title: "1. Importar documentos", step2_title: "2. Completar informações",
      step3_title: "Arquivo pronto!", step3_desc: "Seu arquivo .vaudtax foi gerado.",
      new_decl_btn: "Nova declaração", extracted_title: "Dados extraídos",
      income_title: "Renda", wealth_title: "Fortuna",
      no_salary: "Nenhum certificado salarial", no_bank: "Nenhuma declaração bancária",
      total_net: "Total Líquido", total_wealth: "Total Fortuna",
      btn_continue: "Continuar", btn_back: "Voltar", btn_generate: "Gerar .vaudtax",
      section_personal: "Dados pessoais", section_deductions: "Deduções adicionais",
      label_name: "Sobrenome", label_firstname: "Nome", label_birthdate: "Data de nascimento",
      label_civilstatus: "Estado civil", civil_select: "Selecionar...",
      civil_single: "Solteiro(a)", civil_married: "Casado(a)", civil_divorced: "Divorciado(a)",
      label_transport: "Custos de transporte", label_meal: "Refeições fora",
      label_3a: "Pilar 3a", label_donations: "Doações"
    }
  },
  sq: {
    brand: { motto: "Liri dhe Atdhe", desc: "Asistenti VaudTax" },
    nav: { home: "Ballina", pricing: "Çmimet", about: "Rreth nesh", logout: "Dil", login: "Hyr", start: "Fillo" },
    pricing: {
      title: "Çmimet tona", subtitle: "Zgjidhni planin tuaj.",
      toggle_monthly: "Mujore", toggle_annual: "Vjetore (-20%)",
      free_title: "Zbulim", free_price: "0 CHF", free_desc: "Për testim.",
      standard_title: "Standard", standard_price_mo: "9.90 CHF", standard_price_yr: "99.00 CHF", standard_desc: "Deklaratë e plotë.",
      pro_title: "Ekspert", pro_price_mo: "29.90 CHF", pro_price_yr: "299.00 CHF", pro_desc: "Me rishikim.",
      feature_extract: "Nxjerrja IA", feature_export: "Eksport .vaudtax",
      feature_support: "Mbështetje", feature_review: "Rishikim", btn_choose: "Zgjidhni",
      per_month: "/ muaj", per_year: "/ vit"
    },
    payment: {
      title: "Pagesë e Sigurt", summary_title: "Përmbledhje", plan_label: "Plani", billing_label: "Faturimi",
      total_label: "Totali", card_details: "Detajet e kartës", card_holder: "Mbajtësi",
      pay_btn: "Paguaj me Stripe", secure_badge: "SSL i sigurt",
      success_title: "Pagesa u krye!", success_desc: "Faleminderit.", btn_dashboard: "Shko te Paneli"
    },
    about: {
      title: "Rreth nesh", subtitle: "Thjeshtimi i taksave.",
      mission_title: "Misioni", mission_desc: "IA për taksa të lehta.",
      privacy_title: "Privatësia", privacy_desc: "Të dhëna të sigurta.",
      contact_title: "Kontakt", contact_desc: "support@vaudtax-helper.ch"
    },
    landing: {
      hero_badge: "Liri dhe Atdhe",
      title_start: "Taksat tuaja",
      title_end: "të thjeshtuara",
      subtitle: "Asistenti inteligjent për të gjeneruar deklaratën tuaj zyrtare VaudTax në pak minuta.",
      cta_create: "Krijo deklaratë",
      secure: "I sigurt", fast: "I shpejtë", compatible: "E përputhshme me VaudTax",
      footer: "© 2025 VaudTax Helper"
    },
    auth: {
      login_title: "Mirësevini", register_title: "Krijo llogari",
      subtitle: "Hyni në asistentin tuaj tatimor",
      email: "Email", password: "Fjalëkalimi",
      submit_login: "Hyr", submit_register: "Regjistrohu",
      loading: "Duke ngarkuar...", no_account: "Nuk keni llogari?", has_account: "Keni llogari?",
      link_register: "Regjistrohu", link_login: "Hyr"
    },
    dashboard: {
      title: "Deklaratat tuaja", new_btn: "Deklaratë e re",
      empty_title: "Historiku bosh", empty_desc: "Filloni deklaratën tuaj të parë",
      start_now: "Fillo tani", status_finished: "Përfunduar", modified: "Modifikuar më"
    },
    upload: {
      drop_title: "Hidhni skedarët këtu", drop_desc: "PDF, Foto, Excel, CSV",
      files_list: "Skedarët", status_pending: "Në pritje", status_processing: "Duke analizuar...",
      status_success: "Gati", status_error: "Gabim"
    },
    declaration: {
      step1_title: "1. Importo dokumentet", step2_title: "2. Plotëso informacionin",
      step3_title: "Skedari gati!", step3_desc: "Skedari juaj .vaudtax u gjenerua.",
      new_decl_btn: "Deklaratë e re", extracted_title: "Të dhënat e nxjerra",
      income_title: "Të ardhurat", wealth_title: "Pasuria",
      no_salary: "Nuk u zbulua certifikatë page", no_bank: "Nuk u zbulua deklaratë bankare",
      total_net: "Neto Totale", total_wealth: "Pasuria Totale",
      btn_continue: "Vazhdo", btn_back: "Kthehu", btn_generate: "Gjenero .vaudtax",
      section_personal: "Të dhënat personale", section_deductions: "Zbritje shtesë",
      label_name: "Mbiemri", label_firstname: "Emri", label_birthdate: "Datëlindja",
      label_civilstatus: "Gjendja civile", civil_select: "Zgjidhni...",
      civil_single: "Beqar/e", civil_married: "I/E martuar", civil_divorced: "I/E divorcuar",
      label_transport: "Shpenzimet e transportit", label_meal: "Ushqim jashtë",
      label_3a: "Shtylla 3a", label_donations: "Donacione"
    }
  },
  hr: {
    brand: { motto: "Sloboda i Domovina", desc: "VaudTax Pomoćnik" },
    nav: { home: "Početna", pricing: "Cijene", about: "O nama", logout: "Odjava", login: "Prijava", start: "Počni" },
    pricing: {
      title: "Cjenik", subtitle: "Odaberite plan.",
      toggle_monthly: "Mjesečno", toggle_annual: "Godišnje (-20%)",
      free_title: "Otkriće", free_price: "0 CHF", free_desc: "Za test.",
      standard_title: "Standard", standard_price_mo: "9.90 CHF", standard_price_yr: "99.00 CHF", standard_desc: "Puna prijava.",
      pro_title: "Ekspert", pro_price_mo: "29.90 CHF", pro_price_yr: "299.00 CHF", pro_desc: "Stručna revizija.",
      feature_extract: "AI Ekstrakcija", feature_export: "Izvoz .vaudtax",
      feature_support: "Podrška", feature_review: "Revizija", btn_choose: "Odaberi",
      per_month: "/ mj", per_year: "/ god"
    },
    payment: {
      title: "Sigurno plaćanje", summary_title: "Sažetak", plan_label: "Plan", billing_label: "Naplata",
      total_label: "Ukupno", card_details: "Detalji kartice", card_holder: "Vlasnik",
      pay_btn: "Plati (Stripe)", secure_badge: "SSL Sigurno",
      success_title: "Uspjeh!", success_desc: "Hvala na pretplati.", btn_dashboard: "Na nadzornu ploču"
    },
    about: {
      title: "O nama", subtitle: "Pojednostavljujemo poreze.",
      mission_title: "Misija", mission_desc: "AI za poreze.",
      privacy_title: "Privatnost", privacy_desc: "Sigurni podaci.",
      contact_title: "Kontakt", contact_desc: "support@vaudtax-helper.ch"
    },
    landing: {
      hero_badge: "Sloboda i Domovina",
      title_start: "Vaši porezi",
      title_end: "pojednostavljeni",
      subtitle: "Pametni asistent za generiranje vaše službene VaudTax prijave u nekoliko minuta.",
      cta_create: "Nova prijava",
      secure: "Sigurno", fast: "Brzo", compatible: "VaudTax kompatibilno",
      footer: "© 2025 VaudTax Helper"
    },
    auth: {
      login_title: "Dobrodošli", register_title: "Napravi račun",
      subtitle: "Pristupite svom poreznom asistentu",
      email: "Email", password: "Lozinka",
      submit_login: "Prijava", submit_register: "Registracija",
      loading: "Učitavanje...", no_account: "Nemate račun?", has_account: "Imate račun?",
      link_register: "Registracija", link_login: "Prijava"
    },
    dashboard: {
      title: "Vaše Prijave", new_btn: "Nova prijava",
      empty_title: "Prazna povijest", empty_desc: "Započnite svoju prvu prijavu",
      start_now: "Započni sada", status_finished: "Završeno", modified: "Izmijenjeno"
    },
    upload: {
      drop_title: "Povucite datoteke ovdje", drop_desc: "PDF, Slike, Excel, CSV",
      files_list: "Datoteke", status_pending: "Na čekanju", status_processing: "Analiza...",
      status_success: "Gotovo", status_error: "Greška"
    },
    declaration: {
      step1_title: "1. Uvoz dokumenata", step2_title: "2. Dopuna informacija",
      step3_title: "Datoteka spremna!", step3_desc: "Vaša .vaudtax datoteka je generirana.",
      new_decl_btn: "Nova prijava", extracted_title: "Izvučeni podaci",
      income_title: "Prihodi", wealth_title: "Imovina",
      no_salary: "Nije pronađena potvrda o plaći", no_bank: "Nije pronađen bankovni izvadak",
      total_net: "Ukupno Neto", total_wealth: "Ukupna Imovina",
      btn_continue: "Nastavi", btn_back: "Natrag", btn_generate: "Generiraj .vaudtax",
      section_personal: "Osobni podaci", section_deductions: "Dodatni odbici",
      label_name: "Prezime", label_firstname: "Ime", label_birthdate: "Datum rođenja",
      label_civilstatus: "Bračni status", civil_select: "Odaberi...",
      civil_single: "Samac/Samica", civil_married: "Oženjen/Udana", civil_divorced: "Razveden/a",
      label_transport: "Troškovi prijevoza", label_meal: "Obroci izvan kuće",
      label_3a: "Stup 3a", label_donations: "Donacije"
    }
  },
  rm: {
    brand: { motto: "Libertad e Patria", desc: "Assistent VaudTax" },
    nav: { home: "Chasa", pricing: "Pretschs", about: "Davart", logout: "Sortir", login: "S'annunziar", start: "Cumenzar" },
    pricing: {
      title: "Noss Pretschs", subtitle: "Plans transparents.",
      toggle_monthly: "Mensil", toggle_annual: "Annual (-20%)",
      free_title: "Descuverta", free_price: "0 CHF", free_desc: "Per testar.",
      standard_title: "Standard", standard_price_mo: "9.90 CHF", standard_price_yr: "99.00 CHF", standard_desc: "Decleraziun cumpletta.",
      pro_title: "Expert", pro_price_mo: "29.90 CHF", pro_price_yr: "299.00 CHF", pro_desc: "Cun controlla.",
      feature_extract: "Extracziun AI", feature_export: "Export .vaudtax",
      feature_support: "Support", feature_review: "Controlla", btn_choose: "Tscherner",
      per_month: "/ mais", per_year: "/ onn"
    },
    payment: {
      title: "Pajament Segir", summary_title: "Resumaziun", plan_label: "Plan", billing_label: "Fakturaziun",
      total_label: "Total", card_details: "Detagls carta", card_holder: "Possessur",
      pay_btn: "Pajar cun Stripe", secure_badge: "SSL Segir",
      success_title: "Reussì!", success_desc: "Grazia.", btn_dashboard: "Al Dashboard"
    },
    about: {
      title: "Davart nus", subtitle: "Simplifitgar taglias.",
      mission_title: "Missiun", mission_desc: "AI per taglias.",
      privacy_title: "Protecziun", privacy_desc: "Datas segiras.",
      contact_title: "Contact", contact_desc: "support@vaudtax-helper.ch"
    },
    landing: {
      hero_badge: "Libertad e Patria",
      title_start: "Vossas taglias",
      title_end: "simplifitgadas",
      subtitle: "L'assistent intelligent per generar vossa decleraziun uffiziala VaudTax en paucas minutas.",
      cta_create: "Crear decleraziun",
      secure: "Segir", fast: "Spert", compatible: "Compatibel cun VaudTax",
      footer: "© 2025 VaudTax Helper"
    },
    auth: {
      login_title: "Bainvegni", register_title: "Crear conto",
      subtitle: "Access a voss assistent fiscal",
      email: "Email", password: "Password",
      submit_login: "S'annunziar", submit_register: "Sa registrar",
      loading: "Chargiar...", no_account: "Anc nagin conto?", has_account: "Gia in conto?",
      link_register: "Sa registrar", link_login: "S'annunziar"
    },
    dashboard: {
      title: "Vossas Decleraziuns", new_btn: "Nova decleraziun",
      empty_title: "Istorgia vida", empty_desc: "Cumenzai vossa emprima decleraziun",
      start_now: "Cumenzar ussa", status_finished: "Terminà", modified: "Modifitgà il"
    },
    upload: {
      drop_title: "Trai datotecas qua", drop_desc: "PDF, Maletgs, Excel, CSV",
      files_list: "Datotecas", status_pending: "Spetga", status_processing: "Analisa...",
      status_success: "Fatg", status_error: "Sbagl"
    },
    declaration: {
      step1_title: "1. Importar documents", step2_title: "2. Cumplettar infurmaziuns",
      step3_title: "Datoteca pronta!", step3_desc: "Vossa datoteca .vaudtax è vegnida generada.",
      new_decl_btn: "Nova decleraziun", extracted_title: "Datas extratgas",
      income_title: "Entradas", wealth_title: "Vermegen",
      no_salary: "Nagin certificat da salari", no_bank: "Naginas attestaziuns bancaras",
      total_net: "Total Net", total_wealth: "Total Vermegen",
      btn_continue: "Cuntinuar", btn_back: "Enavos", btn_generate: "Generar .vaudtax",
      section_personal: "Datas persunalas", section_deductions: "Deducziuns supplementaras",
      label_name: "Num", label_firstname: "Prenum", label_birthdate: "Data da naschientscha",
      label_civilstatus: "Stadi civil", civil_select: "Tscherna...",
      civil_single: "Ledig", civil_married: "Maridà", civil_divorced: "Divorzià",
      label_transport: "Custs da transport", label_meal: "Pasts ordaifer",
      label_3a: "Piler 3a", label_donations: "Donaziuns"
    }
  }
};