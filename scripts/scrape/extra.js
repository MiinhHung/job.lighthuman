const { chromium } = require('playwright'); const fs = require('fs');
(async () => {
  const [sitePath, ...slugs] = process.argv.slice(2);
  const site = JSON.parse(fs.readFileSync(sitePath, 'utf8'));
  const home = fs.readFileSync(require('path').resolve(__dirname, '../../../ref/home.clean.html'), 'utf8');
  const b = await chromium.launch(); const page = await b.newPage();
  for (const slug of slugs) {
    await page.goto('https://job.lighthuman.vn/company/' + slug, { waitUntil: 'domcontentloaded', timeout: 60000 });
    const d = await page.evaluate(() => {
      const details = {};
      document.querySelectorAll('.jbdetail li').forEach(li => { const k = li.children[0]?.textContent.replace(':', '').trim(); const v = li.children[1]?.textContent.replace(/\s+/g, ' ').trim(); if (k) details[k] = v; });
      const about = [...document.querySelectorAll('.contentbox')].find(e => /Về công ty/.test(e.querySelector('h3')?.textContent || ''));
      let aboutHtml = ''; if (about) { const c = about.cloneNode(true); c.querySelector('h3')?.remove(); c.querySelectorAll('[style]').forEach(e => e.removeAttribute('style')); aboutHtml = c.innerHTML.replace(/\s+/g, ' ').trim(); }
      const ci = document.querySelector('.candidateinfo');
      return { name: ci?.querySelector('.title')?.textContent.trim(), logo: ci?.querySelector('img')?.getAttribute('src') || '', industry: ci?.querySelector('.desi')?.textContent.trim() || '', locTexts: [...(ci?.querySelectorAll('.loctext') || [])].map(e => e.textContent.replace(/\s+/g, ' ').trim()), details, aboutHtml, jobUrls: [...document.querySelectorAll('.searchList li .jobinfo h3 a')].map(a => a.href) };
    });
    const card = home.match(new RegExp('href="https://job.lighthuman.vn/company/' + slug + '"[\s\S]*?emloc">([\s\S]*?)</div>[\s\S]*?(\d+) Công việc mở'));
    const loc = card ? card[1].replace(/<[^>]+>/g, '').trim() : '';
    site.companies.push({ url: 'https://job.lighthuman.vn/company/' + slug, location: loc, openJobs: +(d.details['Số lượng công việc đang tuyển'] || 0), hiddenFromList: true, ...d });
    console.log(slug, d.name, loc, d.jobUrls.length, d.logo);
  }
  fs.writeFileSync(sitePath, JSON.stringify(site, null, 1)); await b.close();
})();
