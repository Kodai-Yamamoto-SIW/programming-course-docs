import fs from 'fs';
import path from 'path';
import SubmissionsClient from './submissions-client';
import type { StudentWorksData } from './types';

const getStudentWorksData = (): StudentWorksData => {
  const studentWorksPath = path.join(process.cwd(), 'public', 'student-works');

  if (!fs.existsSync(studentWorksPath)) {
    return { years: {} };
  }

  const data: Record<string, string[]> = {};

  try {
    const years = fs
      .readdirSync(studentWorksPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)
      .sort();

    for (const year of years) {
      const yearPath = path.join(studentWorksPath, year);
      const studentIds = fs
        .readdirSync(yearPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name)
        .sort();

      data[year] = studentIds;
    }
  } catch (error) {
    console.error('Error reading student works data:', error);
    return { years: {} };
  }

  return { years: data };
};

export default function SubmissionsPage() {
  const studentWorks = getStudentWorksData();
  return <SubmissionsClient studentWorks={studentWorks} />;
}
