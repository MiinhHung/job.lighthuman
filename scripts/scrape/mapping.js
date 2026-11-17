// Map functional areas / industries to job slugs by querying the listing with each filter.
// Usage: node mapping.js <site.json> <home.clean.html> <out.json>
const { chromium } = require('playwright');
const fs = require('fs');

const BASE = 'https://job.lighthuman.vn/';

(async () => {
  const [sitePath, homePath, out] = process.argv.slice(2);
  const site = JSON.parse(fs.readFileSync(sitePath, 'utf8'));
  const home = fs.readFileSync(homePath, 'utf8');

  const queries = [];
  site.categories.filter(c => c.count > 0).forEach(c => {
    const id = decodeURIComponent(c.url).match(/functional_area_id\[\]=(\d+)/)[1];
    queries.push({ kind: 'functional_area_id', id, name: c.name });
  });
  const sel = home.match(/<select class="form-control" id="functional_area_id"[\s\S]*?<\/select>/)[0];
  [...sel.matchAll(/<option value="(\d+)">([^<]+)<\/option>/g)].forEach(m => {
    if (!queries.some(q => q.kind === 'functional_area_id' && q.id === m[1])) queries.push({ kind: 'functional_area_id', id: m[1], name: m[2] });
  });
  const footer = home.slice(home.indexOf('footerWrap'));
  [...footer.matchAll(/href="https:\/\/job\.lighthuman\.vn\/jobs\?(industry_id|functional_area_id)%5B%5D=(\d+)"[^>]*>([^<]+)</g)].forEach(m => {
    if (!queries.some(q => q.kind === m[1] && q.id === m[2])) queries.push({ kind: m[1], id: m[2], name: m[3].trim(), footer: true });
    else queries.find(q => q.kind === m[1] && q.id === m[2]).footer = true;
  });

  const browser = await chromium.launch();
  const ctx = await browser.newContext();
  await ctx.route('**/*', r => (['image', 'font', 'media', 'stylesheet'].includes(r.request().resourceType()) || /cxgenie|recaptcha|google|cloudflare/.test(r.request().url())) ? r.abort() : r.continue());
  const page = await ctx.newPage();
  for (const q of queries) {
    q.jobs = [];
    for (let n = 1; n < 10; n++) {
      try {
        await page.goto(`${BASE}jobs?${q.kind}%5B%5D=${q.id}&page=${n}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
      } catch (e) { continue; }
      const slugs = await page.evaluate(() => [...document.querySelectorAll('.listpgWraper ul.searchList > li .jobinfo h3 a')].map(a => a.href.split('/').pop()));
      const fresh = slugs.filter(s => !q.jobs.includes(s));
      if (!fresh.length) break;
      q.jobs.push(...fresh);
    }
    process.stderr.write(`${q.kind}=${q.id} ${q.jobs.length}\n`);
  }
  fs.writeFileSync(out, JSON.stringify(queries, null, 1));
  await browser.close();
})();
