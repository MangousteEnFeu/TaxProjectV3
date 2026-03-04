import OpenAI from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

const openai = new OpenAI({
  apiKey: process.env.INFOMANIAK_API_KEY,
  baseURL: 'https://api.infomaniak.com/1/ai/llm/v1',
  dangerouslyAllowBrowser: true, // Required for Vite client-side calls
});

// Infomaniak recommended model
const modelId = "llama3-70b-instruct";

export const extractDataFromDocument = async (file: File) => {
  try {
    const base64Data = await fileToGenerativePart(file);

    // We want a structured JSON response
    const ExtractionSchema = z.object({
      documentType: z.string().describe("Type of document: 'BankStatement', 'SalaryCertificate', 'SalarySlip', 'Other'"),
      bankAccount: z.object({
        banque: z.string().optional(),
        iban: z.string().optional(),
        titulaire: z.string().optional(),
        typeCompte: z.string().optional(),
        solde: z.number().optional().describe("Balance at end of year, normalized number without ' or spaces"),
        interets: z.number().optional().describe("Interest amount, normalized number"),
        dateReleve: z.string().optional()
      }).optional(),
      salary: z.object({
        employeur: z.string().optional(),
        salaireBrut: z.number().optional().describe("Gross Salary (Chiffre 8)"),
        salaireNet: z.number().optional().describe("Net Salary (Chiffre 11)"),
        cotisationsAVS: z.number().optional().describe("AVS/AI/APG (Chiffre 9)"),
        cotisationsLPP: z.number().optional().describe("LPP (Chiffre 10)"),
        fraisProfessionnels: z.number().optional(),
        autresDeductions: z.number().optional()
      }).optional()
    });

    const prompt = `
      You are an expert tax assistant for the Canton of Vaud, Switzerland.
      Analyze this document text/data.
      
      If it is a Bank Statement (Attestation fiscale):
      Extract Bank Name (e.g. UBS, BCV), IBAN, Holder Name, Account Type, Balance (Solde) at 31.12, and Gross Interest (Intérêts bruts/créanciers).
      
      If it is a Salary Certificate (Certificat de salaire / Lohnausweis):
      Extract Employer, Gross Salary (Chiffre 8), Net Salary (Chiffre 11), AVS/AI/APG (Chiffre 9), LPP (Chiffre 10), and other deductions.
      
      Ignore purely decorative text. Convert all Swiss formatted numbers (e.g. 1'200.50) to standard floats.
      Return the data in the specified JSON structure.
    `;

    const response = await openai.chat.completions.create({
      model: modelId,
      messages: [
        { role: 'system', content: prompt },
        // Since Infomaniak LLM might not fully support image vision endpoints out of the box in the regular chat API in the same way as Gemini,
        // We pass image text if we had OCR, but typically we send the image as a data url if the model supports it.
        // Warning: if Infomaniak's Llama-3-70b doesn't support images, this will fail. Assuming text-only for now or multimodality if supported by their API.
        // Let's pass the base64 as an image url structure used by OpenAI vision models.
        {
          role: 'user',
          content: [
            { type: "text", text: "Please extract the relevant tax data from this document image." },
            { type: "image_url", image_url: { url: `data:${base64Data.mimeType};base64,${base64Data.data}` } }
          ]
        }
      ],
      response_format: zodResponseFormat(ExtractionSchema, "tax_extraction"),
    });

    const text = response.choices[0].message.content;
    if (!text) throw new Error("No response from Infomaniak LLM API");

    return JSON.parse(text);

  } catch (error) {
    console.error("LLM Extraction Error:", error);
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