"use client";

import { useEffect, useMemo, useState } from 'react';
import styles from './submissions.module.css';
import type { StudentWorksData } from './types';

type SubmissionsClientProps = {
  studentWorks: StudentWorksData;
};

export default function SubmissionsClient({
  studentWorks,
}: SubmissionsClientProps) {
  const studentWorksData = studentWorks.years;
  const availableYears = useMemo(
    () => Object.keys(studentWorksData).sort().reverse(),
    [studentWorksData]
  );
  const [selectedYear, setSelectedYear] = useState<string>(
    availableYears[0] ?? ''
  );

  useEffect(() => {
    if (typeof window === 'undefined' || availableYears.length === 0) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const yearFromUrl = params.get('year');

    if (yearFromUrl && studentWorksData[yearFromUrl]) {
      setSelectedYear(yearFromUrl);
    } else {
      setSelectedYear(availableYears[0]);
    }
  }, [availableYears, studentWorksData]);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = event.target.value;
    setSelectedYear(year);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('year', year);
      window.history.pushState({}, '', url.toString());
    }
  };

  const studentIds = selectedYear ? studentWorksData[selectedYear] || [] : [];

  return (
    <main className={styles.submissionsMain}>
      <div className={styles.container}>
        <h1 className={styles.title}>提出作品一覧</h1>

        {availableYears.length === 0 ? (
          <div className={styles.noData}>
            <p>提出作品がまだありません。</p>
          </div>
        ) : (
          <>
            <div className={styles.controls}>
              <label htmlFor="year-select" className={styles.label}>
                年度:
              </label>
              <select
                id="year-select"
                value={selectedYear}
                onChange={handleYearChange}
                className={styles.select}
              >
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}年度
                  </option>
                ))}
              </select>
              <span className={styles.count}>({studentIds.length}件の提出)</span>
            </div>

            {studentIds.length === 0 ? (
              <div className={styles.noData}>
                <p>{selectedYear}年度の提出作品がありません。</p>
              </div>
            ) : (
              <div className={styles.grid}>
                {studentIds.map((studentId) => {
                  const workUrl = `/student-works/${selectedYear}/${studentId}/index.html`;

                  return (
                    <div key={studentId} className={styles.card}>
                      <div className={styles.cardHeader}>
                        <h3 className={styles.studentId}>{studentId}</h3>
                      </div>
                      <div
                        className={styles.iframeWrapper}
                        onClick={() => window.open(workUrl, '_blank')}
                        style={{ cursor: 'pointer' }}
                        title="クリックして新しいタブで開く"
                      >
                        <iframe
                          src={workUrl}
                          className={styles.iframe}
                          title={`${studentId}の提出作品`}
                          loading="lazy"
                          sandbox="allow-scripts allow-same-origin"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
