import { GoogleGenAI, Type } from "@google/genai";

// Use the key defined in constants.ts
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelId = "gemini-2.0-flash"; // Updated to recommended model for text/extraction tasks

export const extractDataFromDocument = async (file: File) => {
  try {
    const base64Data = await fileToGenerativePart(file);
    
    // We want a structured JSON response
    const extractionSchema = {
      type: Type.OBJECT,
      properties: {
        documentType: { type: Type.STRING, description: "Type of document: 'BankStatement', 'SalaryCertificate', 'SalarySlip', 'Other'" },
        bankAccount: {
          type: Type.OBJECT,
          properties: {
            banque: { type: Type.STRING },
            iban: { type: Type.STRING },
            titulaire: { type: Type.STRING },
            typeCompte: { type: Type.STRING },
            solde: { type: Type.NUMBER, description: "Balance at end of year, normalized number without ' or spaces" },
            interets: { type: Type.NUMBER, description: "Interest amount, normalized number" },
            dateReleve: { type: Type.STRING }
          }
        },
        salary: {
          type: Type.OBJECT,
          properties: {
            employeur: { type: Type.STRING },
            salaireBrut: { type: Type.NUMBER },
            salaireNet: { type: Type.NUMBER },
            cotisationsAVS: { type: Type.NUMBER },
            cotisationsLPP: { type: Type.NUMBER },
            fraisProfessionnels: { type: Type.NUMBER },
            autresDeductions: { type: Type.NUMBER }
          }
        }
      }
    };

    const prompt = `
      You are an expert tax assistant for the Canton of Vaud, Switzerland.
      Analyze this document image or PDF.
      
      If it is a Bank Statement (Attestation fiscale):
      Extract Bank Name (e.g. UBS, BCV), IBAN, Holder Name, Account Type, Balance (Solde) at 31.12, and Gross Interest (Intérêts bruts/créanciers).
      
      If it is a Salary Certificate (Certificat de salaire / Lohnausweis):
      Extract Employer, Gross Salary (Chiffre 8), Net Salary (Chiffre 11), AVS/AI/APG (Chiffre 9), LPP (Chiffre 10), and other deductions.
      
      Ignore purely decorative text. Convert all Swiss formatted numbers (e.g. 1'200.50) to standard floats.
      Return the data in the specified JSON structure.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          { inlineData: base64Data },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: extractionSchema
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    
    return JSON.parse(text);

  } catch (error) {
    console.error("Gemini Extraction Error:", error);
    throw error;
  }
};

async function fileToGenerativePart(file: File): Promise<{ mimeType: string; data: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the Data-URL prefix (e.g., "data:application/pdf;base64,")
      const base64Data = base64String.split(',')[1];
      resolve({
        mimeType: file.type,
        data: base64Data
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}