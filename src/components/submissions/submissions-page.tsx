import SubmissionsClient from './submissions-client';
import { getStudentWorksData } from './work-data';

export default function SubmissionsPage() {
  const studentWorks = getStudentWorksData();
  return <SubmissionsClient studentWorks={studentWorks} />;
}
