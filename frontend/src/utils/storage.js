const REPORTS_KEY = 'interview_reports';
const FILES_KEY = 'interview_resume_files';

function getReportsKey(userId) {
  return `${REPORTS_KEY}_${userId}`;
}

function getFilesKey(userId) {
  return `${FILES_KEY}_${userId}`;
}

export function saveReport(userId, report) {
  if (!userId || !report?._id) return;

  const key = getReportsKey(userId);
  const existing = getReports(userId);
  const sanitized = { ...report, resume: undefined };
  const updated = [sanitized, ...existing.filter((r) => r._id !== report._id)].slice(0, 20);

  localStorage.setItem(key, JSON.stringify(updated));
}

export function getReports(userId) {
  if (!userId) return [];
  try {
    return JSON.parse(localStorage.getItem(getReportsKey(userId)) || '[]');
  } catch {
    return [];
  }
}

export function getReportById(userId, reportId) {
  return getReports(userId).find((r) => r._id === reportId) || null;
}

export async function saveResumeFile(userId, reportId, file) {
  if (!userId || !reportId || !file) return;

  const buffer = await file.arrayBuffer();
  const base64 = btoa(
    new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
  );

  const key = getFilesKey(userId);
  const existing = JSON.parse(localStorage.getItem(key) || '{}');

  existing[reportId] = {
    name: file.name,
    type: file.type,
    size: file.size,
    uploadedAt: new Date().toISOString(),
    data: base64,
  };

  localStorage.setItem(key, JSON.stringify(existing));
}

export function getResumeFile(userId, reportId) {
  if (!userId || !reportId) return null;

  try {
    const files = JSON.parse(localStorage.getItem(getFilesKey(userId)) || '{}');
    const fileData = files[reportId];
    if (!fileData) return null;

    const binary = atob(fileData.data);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: fileData.type || 'application/pdf' });
    return {
      name: fileData.name,
      type: fileData.type,
      size: fileData.size,
      uploadedAt: fileData.uploadedAt,
      blob,
      url: URL.createObjectURL(blob),
    };
  } catch {
    return null;
  }
}

export function downloadResumeFile(userId, reportId) {
  const file = getResumeFile(userId, reportId);
  if (!file) return false;

  const link = document.createElement('a');
  link.href = file.url;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return true;
}
