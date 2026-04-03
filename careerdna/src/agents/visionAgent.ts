import { analyzeImageBase64 } from "@/lib/openai";

export interface MarksheetData {
  subjects: { name: string; marks: number; maxMarks: number; grade?: string }[];
  totalMarks?: number;
  percentage?: number;
  class?: string;
  board?: string;
  year?: string;
  studentName?: string;
}

export async function runVisionAgent(base64Image: string): Promise<MarksheetData> {
  const prompt = `You are an expert at reading Indian school marksheets and report cards.
  
Analyze this marksheet/report card image and extract:
1. Student name
2. Class/Grade
3. Board (CBSE/ICSE/State Board)
4. Academic year
5. All subjects with marks obtained, maximum marks, and grade
6. Total marks and percentage

Return the data as a JSON object with this exact structure:
{
  "studentName": "string",
  "class": "string", 
  "board": "string",
  "year": "string",
  "subjects": [
    {"name": "subject name", "marks": number, "maxMarks": number, "grade": "string"}
  ],
  "totalMarks": number,
  "percentage": number
}

If you cannot read any field, use null for that field.
Return ONLY the JSON object, no other text.`;

  try {
    const result = await analyzeImageBase64(base64Image, prompt);
    
    // Parse the JSON response
    const cleanResult = result.replace(/```json\n?|\n?```/g, "").trim();
    const parsed = JSON.parse(cleanResult) as MarksheetData;
    return parsed;
  } catch (error) {
    console.error("Vision agent error:", error);
    // Return empty structure if parsing fails
    return {
      subjects: [],
      totalMarks: undefined,
      percentage: undefined,
      class: undefined,
      board: undefined,
      year: undefined,
      studentName: undefined,
    };
  }
}

export function marksheetToText(data: MarksheetData): string {
  const lines: string[] = ["Academic Performance:"];
  
  if (data.studentName) lines.push(`Student: ${data.studentName}`);
  if (data.class) lines.push(`Class: ${data.class}`);
  if (data.board) lines.push(`Board: ${data.board}`);
  if (data.year) lines.push(`Year: ${data.year}`);
  if (data.percentage) lines.push(`Overall Percentage: ${data.percentage}%`);
  
  if (data.subjects.length > 0) {
    lines.push("Subject Performance:");
    for (const subject of data.subjects) {
      lines.push(
        `${subject.name}: ${subject.marks}/${subject.maxMarks}${subject.grade ? ` (${subject.grade})` : ""}`
      );
    }
  }
  
  return lines.join("\n");
}
