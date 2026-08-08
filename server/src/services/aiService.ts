import { ContentRepository } from "../repositories/contentRepository";
import { Logger } from "../utils/logger";

export class AIService {
  static async askQuestion(question: string): Promise<string> {
    try {
      // 1. Fetch Knowledge Base facts
      const facts = await ContentRepository.getKnowledgeBase();
      const factsContext = facts
        .map((f) => `Category: ${f.category}\nTitle: ${f.title}\nContent: ${f.content}`)
        .join("\n\n");

      const systemPrompt = `
You are the AI Assistant for Alex Mercer's premium developer portfolio website.
Your purpose is to answer recruiter, engineering manager, and user questions about Alex Mercer's work history, engineering skills, projects, and bio.

Here is the verified knowledge base about Alex Mercer:
===
${factsContext}
===

Rules:
1. Answer questions accurately based ONLY on the verified knowledge base provided.
2. If the user asks something not in the knowledge base, state politely that you don't know the exact answer, and suggest they contact Alex directly.
3. Keep responses highly professional, technical, concise (under 3-4 sentences), and suitable for a retro terminal interface.
`;

      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        Logger.info("Gemini API key found. Querying Gemini for AI Terminal response...");
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [{ text: `${systemPrompt}\n\nUser Question: ${question}` }],
                },
              ],
            }),
          }
        );

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Gemini API responded with status ${response.status}: ${errText}`);
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return text.trim();
        }
      }

      // 2. Fallback rule-based matching if API key is not present
      Logger.warn("No GEMINI_API_KEY set or API failed. Using local keyword-matching agent.");
      return this.localRuleBasedMatch(question, facts);
    } catch (err) {
      Logger.error("AI Service Error:", err);
      return "AI Terminal system is experiencing high latency. Please try again or type 'contact' to send a direct message.";
    }
  }

  private static localRuleBasedMatch(question: string, facts: any[]): string {
    const q = question.toLowerCase();

    // Find facts that have keywords matching the question
    let bestFact = null;
    let maxMatches = 0;

    for (const fact of facts) {
      const keywords = fact.keywords ? fact.keywords.split(",") : [];
      let matches = 0;
      
      keywords.forEach((kw: string) => {
        if (q.includes(kw.trim().toLowerCase())) {
          matches += 2; // Keyword matches have higher weight
        }
      });

      // Also check content/title matches
      if (fact.content.toLowerCase().includes(q) || fact.title.toLowerCase().includes(q)) {
        matches += 1;
      }

      if (matches > maxMatches) {
        maxMatches = matches;
        bestFact = fact;
      }
    }

    if (bestFact && maxMatches > 0) {
      return bestFact.content;
    }

    return "Hi! I am Alex's AI Terminal. I can answer questions about his skills, experience (at Vercel and Linear), and projects like OmniRAG and Aura3D. What would you like to know? (Type 'contact' to get his details directly).";
  }
}
