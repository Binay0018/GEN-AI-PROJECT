import api from './api';

export async function generateInterviewReport({ jobDescription, selfDescription, resumeFile }) {
  const formData = new FormData();
  formData.append('jobDescription', jobDescription);
  formData.append('selfDescription', selfDescription || '');
  formData.append('resume', resumeFile);

  const response = await api.post('/api/interview', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
}
