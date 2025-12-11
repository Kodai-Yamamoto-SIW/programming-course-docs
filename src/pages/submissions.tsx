import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { usePluginData } from '@docusaurus/useGlobalData';
import styles from './submissions.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface StudentWorksData {
    years: {
        [year: string]: string[];
    };
}

export default function Submissions(): React.ReactElement {
    const { siteConfig } = useDocusaurusContext();
    const baseUrl = siteConfig.baseUrl;

    // プラグインからデータを取得
    const pluginData = usePluginData('student-works-plugin') as StudentWorksData;
    const studentWorksData = pluginData?.years || {};

    // 利用可能な年度リスト（降順）
    const availableYears = Object.keys(studentWorksData).sort().reverse();

    // 最新年度を取得
    const getLatestYear = (): string | null => {
        return availableYears.length > 0 ? availableYears[0] : null;
    };

    // URLクエリパラメータから年度を取得、なければ最新年度を使用
    const [selectedYear, setSelectedYear] = useState<string>('');

    useEffect(() => {
        // クライアントサイドでのみ実行
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const yearFromUrl = params.get('year');

            if (yearFromUrl && studentWorksData[yearFromUrl]) {
                setSelectedYear(yearFromUrl);
            } else {
                const latestYear = getLatestYear();
                if (latestYear) {
                    setSelectedYear(latestYear);
                }
            }
        }
    }, []);

    // 年度変更ハンドラ
    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const year = event.target.value;
        setSelectedYear(year);

        // URLクエリパラメータを更新
        if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            url.searchParams.set('year', year);
            window.history.pushState({}, '', url.toString());
        }
    };

    // 選択された年度の学生番号リスト
    const studentIds = selectedYear ? studentWorksData[selectedYear] || [] : [];

    return (
        <Layout
            title="提出作品一覧"
            description="学生の期末課題提出作品を一覧で確認できます">
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
                                    className={styles.select}>
                                    {availableYears.map(year => (
                                        <option key={year} value={year}>
                                            {year}年度
                                        </option>
                                    ))}
                                </select>
                                <span className={styles.count}>
                                    ({studentIds.length}件の提出)
                                </span>
                            </div>

                            {studentIds.length === 0 ? (
                                <div className={styles.noData}>
                                    <p>{selectedYear}年度の提出作品がありません。</p>
                                </div>
                            ) : (
                                <div className={styles.grid}>
                                    {studentIds.map(studentId => {
                                        // キャッシュを回避するためにタイムスタンプを追加
                                        const workUrl = `${baseUrl}student-works/${selectedYear}/${studentId}/index.html`;

                                        return (
                                            <div key={studentId} className={styles.card}>
                                                <div className={styles.cardHeader}>
                                                    <h3 className={styles.studentId}>{studentId}</h3>
                                                </div>
                                                <div
                                                    className={styles.iframeWrapper}
                                                    onClick={() => window.open(workUrl, '_blank')}
                                                    style={{ cursor: 'pointer' }}
                                                    title="クリックして新しいタブで開く">
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
        </Layout>
    );
}
