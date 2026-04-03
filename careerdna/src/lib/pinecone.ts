import { Pinecone } from "@pinecone-database/pinecone";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

export const getPineconeIndex = () => {
  return pinecone.index(process.env.PINECONE_INDEX || "careerdna");
};

export interface CareerVector {
  id: string;
  values: number[];
  metadata: {
    studentId: string;
    stream?: string;
    class?: string;
    city?: string;
    topSkills?: string[];
    topInterests?: string[];
    timestamp: number;
  };
}

export async function upsertCareerVector(vector: CareerVector): Promise<void> {
  const index = getPineconeIndex();
  await index.upsert([
    {
      id: vector.id,
      values: vector.values,
      metadata: vector.metadata as Record<string, string | number | boolean | string[]>,
    },
  ]);
}

export async function querySimilarCareers(
  embedding: number[],
  topK: number = 10
): Promise<{ id: string; score: number; metadata: Record<string, unknown> }[]> {
  const index = getPineconeIndex();
  const result = await index.query({
    vector: embedding,
    topK,
    includeMetadata: true,
  });

  return (result.matches || []).map((match) => ({
    id: match.id,
    score: match.score || 0,
    metadata: (match.metadata as Record<string, unknown>) || {},
  }));
}

export default pinecone;
