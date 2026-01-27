import { spawn } from 'node:child_process';
import net from 'node:net';

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
    process.exit(code ?? 1);
  });
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
