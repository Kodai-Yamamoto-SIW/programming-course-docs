const fs = require('fs');
const path = require('path');

/**
 * Docusaurusカスタムプラグイン
 * ビルド時にstatic/student-works/内の年度フォルダと学生番号フォルダを読み取り、
 * グローバルデータとして提供する
 */
module.exports = function studentWorksPlugin(context, options) {
    return {
        name: 'student-works-plugin',

        async loadContent() {
            const studentWorksPath = path.join(context.siteDir, 'static', 'student-works');

            // ディレクトリが存在しない場合は空オブジェクトを返す
            if (!fs.existsSync(studentWorksPath)) {
                return { years: {} };
            }

            const data = {};

            try {
                // 年度フォルダを読み取る
                const years = fs.readdirSync(studentWorksPath, { withFileTypes: true })
                    .filter(dirent => dirent.isDirectory())
                    .map(dirent => dirent.name)
                    .sort(); // 年度を昇順にソート

                // 各年度フォルダ内の学生番号フォルダを読み取る
                for (const year of years) {
                    const yearPath = path.join(studentWorksPath, year);
                    const studentIds = fs.readdirSync(yearPath, { withFileTypes: true })
                        .filter(dirent => dirent.isDirectory())
                        .map(dirent => dirent.name)
                        .sort(); // 学生番号を昇順にソート

                    data[year] = studentIds;
                }
            } catch (error) {
                console.error('Error reading student works data:', error);
                return { years: {} };
            }

            return { years: data };
        },

        async contentLoaded({ content, actions }) {
            const { setGlobalData } = actions;
            setGlobalData(content);
        },
    };
};
