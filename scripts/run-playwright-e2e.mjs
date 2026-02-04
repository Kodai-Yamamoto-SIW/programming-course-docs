import { spawn } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';

const e2eYear = '2099';

const ensureE2EStudentWorks = () => {
  const basePath = path.join(
    process.cwd(),
    'public',
    'student-works',
    e2eYear
  );
  const markerPath = path.join(basePath, '.e2e-marker');
  const studentRoot = path.join(basePath, '25020001');
  const studentNested = path.join(basePath, '25020002', 'project');

  fs.mkdirSync(studentRoot, { recursive: true });
  fs.mkdirSync(studentNested, { recursive: true });

  fs.writeFileSync(
    path.join(studentRoot, 'index.html'),
    '<!doctype html><html><body>fixture root</body></html>'
  );
  fs.writeFileSync(
    path.join(studentNested, 'index.html'),
    '<!doctype html><html><body>fixture nested</body></html>'
  );
  fs.writeFileSync(markerPath, 'e2e');

  return () => {
    if (!fs.existsSync(markerPath)) {
      return;
    }
    fs.rmSync(basePath, { recursive: true, force: true });
  };
};

const getFreePort = () =>
  new Promise((resolve, reject) => {
    const server = net.createServer();
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      if (!address || typeof address === 'string') {
        server.close();
        reject(new Error('Failed to acquire a free port.'));
        return;
      }
      const { port } = address;
      server.close(() => resolve(port));
    });
    server.on('error', reject);
  });

const run = async () => {
  const port = await getFreePort();
  const baseUrl = `http://localhost:${port}`;
  const cleanupStudentWorks = ensureE2EStudentWorks();

  const isWindows = process.platform === 'win32';
  const command = isWindows ? 'cmd.exe' : 'npm';
  const args = isWindows
    ? ['/c', 'npm', 'run', 'test:e2e:inner']
    : ['run', 'test:e2e:inner'];
  const child = spawn(command, args, {
    stdio: 'inherit',
    env: {
      ...process.env,
      E2E_PORT: String(port),
      E2E_BASE_URL: baseUrl,
    },
  });

  child.on('exit', (code) => {
    cleanupStudentWorks();
    process.exit(code ?? 1);
  });
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
