export type StudentWorkEntry = {
  studentId: string;
};

export type StudentWorksData = {
  years: Record<string, StudentWorkEntry[]>;
};
