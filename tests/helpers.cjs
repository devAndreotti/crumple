// shared by tests/ and tools/: a static server for the repo root and a Chrome launcher (puppeteer-core, no download)
const fs = require('fs');
const http = require('http');
const path = require('path');
const puppeteer = require('puppeteer-core');

const root = path.join(__dirname, '..');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.cjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.map': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2' };
// first existing Chrome wins; CHROME env overrides; none found → channel 'chrome' (puppeteer's own lookup)
const candidates = [
  '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/local/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  path.join(process.env.LOCALAPPDATA || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
];

function chromePath() {
  if (process.env.CHROME) return process.env.CHROME;
  return candidates.find((p) => p && fs.existsSync(p)) || null;
}

// static server for the repo root on a free port: serve(); base = 'http://127.0.0.1:<port>'
function serve() {
  const server = http.createServer((req, res) => {
    let rel;
    try { rel = decodeURIComponent(req.url.split('?')[0]); } catch (e) { res.writeHead(400); res.end(); return; }
    // normalized, then kept inside the repo root: '..' in a URL never reaches other files
    const f = path.normalize(path.join(root, rel));
    if (!f.startsWith(root + path.sep)) { res.writeHead(403); res.end(); return; }
    if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    fs.createReadStream(f).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve({
    base: 'http://127.0.0.1:' + server.address().port,
    close: () => new Promise((r) => { server.close(r); server.closeAllConnections(); }),
  })));
}

// launch Chrome; extra puppeteer options are merged in (e.g. args, headless). Recent Chrome only falls back to
// software WebGL (SwiftShader, as on CI runners without a GPU) with --enable-unsafe-swiftshader
function launch(extra = {}) {
  const exe = chromePath();
  const opts = { args: ['--no-sandbox', '--hide-scrollbars', '--enable-unsafe-swiftshader'], timeout: 120000, protocolTimeout: 900000, ...extra };
  if (exe) opts.executablePath = exe; else opts.channel = 'chrome';
  return puppeteer.launch(opts);
}

// a browser plus a base URL: the optional argv[2] is an external server (kept for running against a live site);
// without it the repo is served locally. session.close() stops both.
async function session(baseArg, extra) {
  const srv = baseArg ? null : await serve();
  let browser;
  try { browser = await launch(extra); } catch (e) { if (srv) await srv.close(); throw e; }
  return {
    base: baseArg || srv.base,
    browser,
    async close() { await browser.close().catch(() => {}); if (srv) await srv.close(); },
  };
}

module.exports = { root, serve, launch, session, chromePath, puppeteer };
