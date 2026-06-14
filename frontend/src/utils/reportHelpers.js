export function getScoreLevel(score) {
  if (score >= 80) return 'high';
  if (score >= 60) return 'mid';
  return 'low';
}

export function getScoreLabel(score) {
  if (score >= 80) return 'Excellent match';
  if (score >= 60) return 'Good match';
  if (score >= 40) return 'Moderate match';
  return 'Needs improvement';
}

export function deriveReportInsights(report) {
  const matchScore = report?.matchScore ?? 0;
  const skillGaps = report?.skillGaps ?? [];
  const preparationPlan = report?.preparationPlan ?? [];

  const highGaps = skillGaps.filter((g) => g.severity === 'High');
  const mediumGaps = skillGaps.filter((g) => g.severity === 'Medium');
  const lowGaps = skillGaps.filter((g) => g.severity === 'Low');

  const gapPenalty = highGaps.length * 8 + mediumGaps.length * 4 + lowGaps.length * 2;
  const atsScore = Math.min(100, Math.max(0, Math.round(matchScore * 0.92 + (100 - gapPenalty) * 0.08)));
  const readinessScore = Math.min(100, Math.max(0, Math.round(matchScore - highGaps.length * 5)));

  const strengths = [];
  if (matchScore >= 70) strengths.push('Strong alignment with job requirements');
  if (matchScore >= 50) strengths.push('Relevant experience highlighted in profile');
  if (lowGaps.length > 0) strengths.push(`Proficiency in ${lowGaps.slice(0, 2).map((g) => g.skill).join(', ')}`);
  if (report?.technicalQuestions?.length >= 5) strengths.push('Solid technical foundation for interview prep');
  if (strengths.length === 0) strengths.push('Motivated candidate with growth potential');

  const weaknesses = highGaps.map((g) => g.skill);
  mediumGaps.slice(0, 3).forEach((g) => weaknesses.push(g.skill));
  if (weaknesses.length === 0 && matchScore < 70) {
    weaknesses.push('Further skill development recommended for this role');
  }

  const improvements = preparationPlan.slice(0, 4).map((day) => ({
    title: day.focus,
    description: normalizeTasks(day.tasks),
  }));

  const learningAreas = [
    ...highGaps.map((g) => g.skill),
    ...preparationPlan.slice(0, 3).map((d) => d.focus),
  ].filter((v, i, arr) => arr.indexOf(v) === i).slice(0, 6);

  const hrQuestions = (report?.behavioralQuestions ?? []).slice(0, Math.ceil((report?.behavioralQuestions?.length ?? 0) / 2));

  return {
    atsScore,
    readinessScore,
    skillMatch: matchScore,
    strengths,
    weaknesses,
    improvements,
    learningAreas,
    missingSkills: skillGaps.map((g) => g.skill),
    hrQuestions,
  };
}

export function normalizeTasks(tasks) {
  if (Array.isArray(tasks)) return tasks;
  if (typeof tasks === 'string') {
    return tasks.split(/[;\n•]|(?<=\.)\s+/).map((t) => t.trim()).filter(Boolean);
  }
  return [];
}

export function formatDate(dateString) {
  if (!dateString) return 'Unknown date';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function extractJobTitle(jobDescription) {
  if (!jobDescription) return 'Interview Report';
  const firstLine = jobDescription.split('\n')[0].trim();
  return firstLine.length > 60 ? `${firstLine.slice(0, 57)}...` : firstLine || 'Interview Report';
}
