import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const defaultBasePath = path.join(
  process.cwd(),
  'public',
  'student-works'
);

const extractStudentId = (name) => {
  const match = /^(\d+)/.exec(name);
  return match ? match[1] : null;
};

const hasSamePath = (left, right) =>
  path.normalize(left) === path.normalize(right);

const isUnderPath = (parentPath, targetPath) => {
  const relative = path.relative(parentPath, targetPath);
  return Boolean(relative) && !relative.startsWith('..') && !path.isAbsolute(relative);
};

const tryGitMove = (fromPath, toPath) => {
  const result = spawnSync('git', ['mv', '--', fromPath, toPath], {
    stdio: 'inherit',
  });
  return result.status === 0;
};

export const sanitizeStudentWorks = ({
  basePath = defaultBasePath,
  dryRun = false,
} = {}) => {
  if (!fs.existsSync(basePath)) {
    return { renamed: [], skipped: [], errors: [] };
  }

  const renamed = [];
  const skipped = [];
  const errors = [];

  const years = fs
    .readdirSync(basePath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory());

  for (const yearDir of years) {
    const yearPath = path.join(basePath, yearDir.name);
    const students = fs
      .readdirSync(yearPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory());

    for (const studentDir of students) {
      const currentName = studentDir.name;
      const studentId = extractStudentId(currentName);
      const currentPath = path.join(yearPath, currentName);

      if (!studentId) {
        errors.push(
          `Missing numeric student id for ${path.relative(
            process.cwd(),
            currentPath
          )}`
        );
        continue;
      }

      if (currentName === studentId) {
        skipped.push(currentName);
        continue;
      }

      const nextPath = path.join(yearPath, studentId);

      if (fs.existsSync(nextPath) && !hasSamePath(currentPath, nextPath)) {
        errors.push(
          `Target path already exists: ${path.relative(
            process.cwd(),
            nextPath
          )}`
        );
        continue;
      }

      renamed.push({
        from: path.relative(process.cwd(), currentPath),
        to: path.relative(process.cwd(), nextPath),
      });

      if (dryRun) {
        continue;
      }

      if (isUnderPath(process.cwd(), currentPath)) {
        const moved = tryGitMove(currentPath, nextPath);
        if (moved) {
          continue;
        }
      }

      fs.renameSync(currentPath, nextPath);
    }
  }

  return { renamed, skipped, errors };
};

const run = () => {
  const report = sanitizeStudentWorks();

  if (report.errors.length > 0) {
    console.error('Student works sanitization failed:');
    for (const message of report.errors) {
      console.error(`- ${message}`);
    }
    process.exit(1);
  }
};

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  run();
}
