import fs from 'fs';
import path from 'path';
import type { StudentWorkEntry, StudentWorksData } from './types';

export const getStudentWorksData = (
  basePath = path.join(process.cwd(), 'public', 'student-works')
): StudentWorksData => {
  if (!fs.existsSync(basePath)) {
    return { years: {} };
  }

  const data: Record<string, StudentWorkEntry[]> = {};

  try {
    const years = fs
      .readdirSync(basePath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)
      .sort();

    for (const year of years) {
      const yearPath = path.join(basePath, year);
      const studentIds = fs
        .readdirSync(yearPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name)
        .sort();

      data[year] = studentIds.map((studentId) => ({ studentId }));
    }
  } catch (error) {
    console.error('Error reading student works data:', error);
    return { years: {} };
  }

  return { years: data };
};
