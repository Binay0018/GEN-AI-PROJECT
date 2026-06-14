const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

async function invokeGenAI() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "What is an interview?",
    });

    console.log(response.text);
    return response.text;
  } catch (error) {
    console.error("GenAI Error:", error.message);
    return "AI service unavailable";
  }
}

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
  try {
    const prompt = `
Generate an interview report based on the following information.

Job Description:
${jobDescription}

Resume:
${resume}

Self Description:
${selfDescription}

Return ONLY a valid JSON object in this EXACT format, no markdown, no extra text:

{
  "matchScore": 75,
  "technicalQuestions": [
    {
      "question": "question text here",
      "intention": "intention text here",
      "answer": "answer text here"
    }
  ],
  "behavioralQuestions": [
    {
      "question": "question text here",
      "intention": "intention text here",
      "answer": "answer text here"
    }
  ],
  "skillGaps": [
    {
      "skill": "skill name here",
      "severity": "Medium"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "focus area here",
      "tasks": "specific tasks here"
    }
  ]
}

Rules:
- matchScore must be a NUMBER between 0 and 100, not a string
- technicalQuestions must have at least 5 items
- behavioralQuestions must have at least 3 items
- skillGaps severity must be exactly "Low", "Medium", or "High"
- preparationPlan must have exactly 7 items (day 1 to day 7)
- Return ONLY the JSON, nothing else
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const cleaned = response.text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return {
      matchScore: Number(parsed.matchScore) || 0,
      technicalQuestions: parsed.technicalQuestions || [],
      behavioralQuestions: parsed.behavioralQuestions || [],
      skillGaps: parsed.skillGaps || [],
      preparationPlan: parsed.preparationPlan || [],
    };

  } catch (error) {
    console.error("Interview Report Error:", error);
    
    // Handle specific error types
    if (error.status === 503 || error.code === 503 || error.message?.includes('UNAVAILABLE')) {
      throw new Error('AI service is currently unavailable. Please try again in a few moments.');
    }
    
    if (error.message?.includes('JSON')) {
      throw new Error('Failed to parse AI response. Please try again.');
    }
    
    throw new Error(error.message || 'Failed to generate interview report');
  }
}

module.exports = {
  invokeGenAI,
  generateInterviewReport,
};