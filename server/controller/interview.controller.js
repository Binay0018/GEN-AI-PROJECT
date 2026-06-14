const PDFParser = require("pdf2json");
const { generateInterviewReport } = require("../services/ai.service");
const InterviewReport = require("../model/interviewReport.model");

async function generateInterviewReprtController(req, res) {
  try {
    // Parse PDF buffer - suppress verbose warnings from pdf2json
    const text = await new Promise((resolve, reject) => {
      const pdfParser = new PDFParser();
      
      // Suppress verbose warnings from pdf2json library
      const originalWarn = console.warn;
      console.warn = (...args) => {
        // Only show critical warnings
        if (!args[0]?.includes('Unsupported') && !args[0]?.includes('NOT valid form element')) {
          originalWarn(...args);
        }
      };
      
      pdfParser.on("pdfParser_dataReady", (data) => {
        console.warn = originalWarn; // Restore original console.warn
        const extractedText = data.Pages
          .flatMap((page) => page.Texts)
          .map((t) => decodeURIComponent(t.R[0].T))
          .join(" ");
        resolve(extractedText);
      });
      
      pdfParser.on("pdfParser_dataError", (error) => {
        console.warn = originalWarn; // Restore original console.warn
        reject(error);
      });
      
      pdfParser.parseBuffer(req.file.buffer);
    });

    const { selfDescription, jobDescription } = req.body;

    const interviewReprtByAI = await generateInterviewReport({
      resume: text,
      selfDescription,
      jobDescription,
    });

    const interviewReport = await InterviewReport.create({
      user: req.user._id,
      resume: text,
      selfDescription,
      jobDescription,
      ...interviewReprtByAI,
    });

    return res.status(200).json({
      message: "Interview report generated successfully",
      interviewReport,
    });

  } catch (error) {
    console.error("Controller Error:", error.message);
    
    // Check if this is a service error with a user-friendly message
    if (error.message?.includes('AI service is currently unavailable') || 
        error.message?.includes('Currently experiencing high demand')) {
      return res.status(503).json({
        message: error.message,
      });
    }
    
    if (error.message?.includes('Failed to parse')) {
      return res.status(400).json({
        message: error.message,
      });
    }
    
    return res.status(500).json({
      message: error.message || "Something went wrong while generating the report",
    });
  }
}

module.exports = generateInterviewReprtController;