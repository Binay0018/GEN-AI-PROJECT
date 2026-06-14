const MAX_JOB_DESC = 5000;
const MAX_SELF_DESC = 2000;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['application/pdf'];

export function validateInterviewForm({ jobDescription, selfDescription, resumeFile }) {
  const errors = {};

  if (!jobDescription?.trim()) {
    errors.jobDescription = 'Job description is required.';
  } else if (jobDescription.length > MAX_JOB_DESC) {
    errors.jobDescription = `Job description must be under ${MAX_JOB_DESC} characters.`;
  }

  if (!resumeFile) {
    errors.resume = 'A PDF resume is required for analysis.';
  } else {
    if (!ALLOWED_TYPES.includes(resumeFile.type) && !resumeFile.name.toLowerCase().endsWith('.pdf')) {
      errors.resume = 'Only PDF files are supported.';
    }
    if (resumeFile.size > MAX_FILE_SIZE) {
      errors.resume = 'File size must be under 5MB.';
    }
  }

  if (selfDescription && selfDescription.length > MAX_SELF_DESC) {
    errors.selfDescription = `Self description must be under ${MAX_SELF_DESC} characters.`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export { MAX_JOB_DESC, MAX_SELF_DESC, MAX_FILE_SIZE };
