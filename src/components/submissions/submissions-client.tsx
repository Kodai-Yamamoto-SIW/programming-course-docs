"use client";

import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './submissions.module.css';
import type { StudentWorksData } from './types';
import WorkComments from './work-comments';
import { getBrowserSupabaseClient } from './supabase-client';
import {
  mapWorkComments,
  mapWorkIntros,
  type WorkCommentMap,
  type WorkIntroMap,
} from './work-data-mappers';
import WorkIntroEditor from './work-intro-editor';

type SubmissionsClientProps = {
  studentWorks: StudentWorksData;
};

const buildWorkUrl = (
  baseUrl: string,
  year: string,
  studentId: string
) => {
  const workPath = `${year}/${studentId}/index.html`;
  if (!baseUrl) {
    return `/student-works/${workPath}`;
  }

  const trimmedBase = baseUrl.replace(/\/+$/, '');
  return `${trimmedBase}/${workPath}`;
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

  const studentWorksInYear = selectedYear
    ? studentWorksData[selectedYear] || []
    : [];
  const worksBaseUrl =
    process.env.NEXT_PUBLIC_WORKS_BASE_URL ??
    'https://metyatech.github.io/programming-course-docs';
  const supabase = useMemo(() => getBrowserSupabaseClient(), []);
  const [introMap, setIntroMap] = useState<WorkIntroMap>({});
  const [commentMap, setCommentMap] = useState<WorkCommentMap>({});
  const [dataError, setDataError] = useState<string | null>(null);
  const studentIds = useMemo(
    () => studentWorksInYear.map((work) => work.studentId),
    [studentWorksInYear]
  );

  const fetchIntros = useCallback(async () => {
    if (!supabase || !selectedYear || studentIds.length === 0) {
      setIntroMap({});
      return;
    }

    const { data, error } = await supabase
      .from('work_intros')
      .select('student_id,intro,updated_at')
      .eq('year', selectedYear)
      .in('student_id', studentIds);

    if (error) {
      setDataError('紹介文の読み込みに失敗しました。');
      return;
    }

    setIntroMap(mapWorkIntros(data ?? []));
  }, [selectedYear, studentIds, supabase]);

  const fetchComments = useCallback(async () => {
    if (!supabase || !selectedYear || studentIds.length === 0) {
      setCommentMap({});
      return;
    }

    const { data, error } = await supabase
      .from('work_comments')
      .select('id,student_id,author_name,message,created_at')
      .eq('year', selectedYear)
      .in('student_id', studentIds)
      .order('created_at', { ascending: false });

    if (error) {
      setDataError('コメントの読み込みに失敗しました。');
      return;
    }

    setCommentMap(mapWorkComments(data ?? []));
  }, [selectedYear, studentIds, supabase]);

  useEffect(() => {
    const load = async () => {
      setDataError(null);
      await Promise.all([fetchIntros(), fetchComments()]);
    };

    load();
  }, [fetchComments, fetchIntros]);

  useEffect(() => {
    if (!supabase || !selectedYear) {
      return;
    }

    const introChannel = supabase
      .channel(`work-intros-${selectedYear}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'work_intros',
          filter: `year=eq.${selectedYear}`,
        },
        () => {
          fetchIntros();
        }
      )
      .subscribe();

    const commentChannel = supabase
      .channel(`work-comments-${selectedYear}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'work_comments',
          filter: `year=eq.${selectedYear}`,
        },
        () => {
          fetchComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(introChannel);
      supabase.removeChannel(commentChannel);
    };
  }, [fetchComments, fetchIntros, selectedYear, supabase]);

  const submitComment = useCallback(
    async (studentId: string, name: string, message: string) => {
      if (!supabase || !selectedYear) {
        throw new Error('Supabase is not configured.');
      }

      const { error } = await supabase.from('work_comments').insert({
        year: selectedYear,
        student_id: studentId,
        author_name: name.trim() ? name.trim() : null,
        message,
      });

      if (error) {
        throw error;
      }
    },
    [selectedYear, supabase]
  );

  const saveIntro = useCallback(
    async (studentId: string, intro: string | null) => {
      if (!supabase || !selectedYear) {
        throw new Error('Supabase is not configured.');
      }

      const { error } = await supabase.from('work_intros').upsert({
        year: selectedYear,
        student_id: studentId,
        intro,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        throw error;
      }
    },
    [selectedYear, supabase]
  );

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
              <span className={styles.count}>
                ({studentWorksInYear.length}件の提出)
              </span>
            </div>

            {studentWorksInYear.length === 0 ? (
              <div className={styles.noData}>
                <p>{selectedYear}年度の提出作品がありません。</p>
              </div>
            ) : (
              <div className={styles.grid}>
                {studentWorksInYear.map((work) => {
                  const workUrl = buildWorkUrl(
                    worksBaseUrl,
                    selectedYear,
                    work.studentId
                  );
                  const intro = introMap[work.studentId];
                  const comments = commentMap[work.studentId] ?? [];

                  return (
                    <div key={work.studentId} className={styles.card}>
                      <div className={styles.cardHeader}>
                        <h3 className={styles.studentId}>{work.studentId}</h3>
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
                          title={`${work.studentId}の提出作品`}
                          loading="lazy"
                          sandbox="allow-scripts allow-same-origin"
                        />
                      </div>
                      <div className={styles.cardBody}>
                        <section className={styles.introSection}>
                          <h4 className={styles.sectionTitle}>作者からの紹介</h4>
                          {!supabase ? (
                            <p className={styles.placeholder}>
                              連携先が未設定のため紹介文を表示できません。
                            </p>
                          ) : intro ? (
                            <p className={styles.introText}>{intro}</p>
                          ) : (
                            <p className={styles.placeholder}>
                              作者からの紹介文はまだありません。
                            </p>
                          )}
                          <WorkIntroEditor
                            intro={intro}
                            isDisabled={!supabase}
                            onSave={(nextIntro) =>
                              saveIntro(work.studentId, nextIntro)
                            }
                          />
                        </section>
                        <WorkComments
                          comments={comments}
                          isDisabled={!supabase}
                          onSubmit={(name, message) =>
                            submitComment(work.studentId, name, message)
                          }
                        />
                        {dataError && (
                          <p className={styles.dataError}>{dataError}</p>
                        )}
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
