// Scrape structured data from job.lighthuman.vn into a JSON file.
// Usage: node data.js <out.json>
const { chromium } = require('playwright');
const fs = require('fs');

const BASE = 'https://job.lighthuman.vn/';
const slugOf = (url) => (url || '').split('/').filter(Boolean).pop();

(async () => {
  const out = process.argv[2];
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.route('**/*', (r) => {
    const t = r.request().resourceType();
    if (['image', 'font', 'media'].includes(t) || /cxgenie|recaptcha|cloudflareinsights|google/.test(r.request().url())) return r.abort();
    return r.continue();
  });
  const page = await ctx.newPage();
  const go = async (p) => {
    for (let i = 0; i < 3; i++) {
      try { await page.goto(BASE + p, { waitUntil: 'domcontentloaded', timeout: 60000 }); return true; } catch (e) { console.error('retry', p, String(e.message).slice(0, 80)); }
    }
    return false;
  };

  // ---------- Jobs list + sidebar filters ----------
  const jobs = [];
  const seen = new Set();
  let filters = null;
  for (let n = 1; n < 30; n++) {
    await go('jobs?page=' + n);
    const data = await page.evaluate(() => {
      const items = [...document.querySelectorAll('.listpgWraper ul.searchList > li')].filter(li => li.querySelector('.jobinfo h3 a'));
      const list = items.map(li => ({
        url: li.querySelector('.jobinfo h3 a').href,
        title: li.querySelector('.jobinfo h3 a').textContent.trim(),
        companyUrl: li.querySelector('.companyName a')?.href || '',
        companyName: li.querySelector('.companyName a')?.textContent.trim() || '',
        logo: li.querySelector('.jobimg img')?.getAttribute('src') || '',
        location: li.querySelector('.location label[title=location]')?.textContent.trim() || '',
        types: [...li.querySelectorAll('.location span.fulltime')].map(s => s.textContent.trim()),
        excerpt: (li.querySelector(':scope > p')?.textContent || '').replace(/\s+/g, ' ').trim(),
      }));
      const widgets = [...document.querySelectorAll('.sidebar .widget')].map(w => ({
        title: w.querySelector('.widget-title')?.textContent.trim() || '',
        name: w.querySelector('input[type=checkbox]')?.name || '',
        options: [...w.querySelectorAll('li')].filter(li => li.querySelector('input')).map(li => ({
          value: li.querySelector('input').value,
          label: li.childNodes ? [...li.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join(' ').replace(/\s+/g, ' ').trim() : '',
          count: +(li.querySelector('span')?.textContent || 0),
        })),
      }));
      const total = document.querySelector('.topstatinfo')?.textContent.replace(/\s+/g, ' ').trim() || '';
      return { list, widgets, total };
    });
    if (!filters) filters = { widgets: data.widgets, total: data.total };
    const fresh = data.list.filter(j => !seen.has(j.url));
    if (!fresh.length) break;
    fresh.forEach(j => { seen.add(j.url); jobs.push(j); });
    console.error('jobs page', n, '+', fresh.length);
  }

  // ---------- Job details ----------
  for (const j of jobs) {
    await go(j.url.replace(BASE, ''));
    const d = await page.evaluate(() => {
      const fields = {};
      document.querySelectorAll('.jbdetail li').forEach(li => {
        const k = li.children[0]?.textContent.replace(':', '').trim();
        const v = li.children[1]?.textContent.replace(/\s+/g, ' ').trim();
        if (k) fields[k] = v;
      });
      const boxes = [...document.querySelectorAll('.job-header .contentbox')];
      const html = (i) => {
        const b = boxes[i];
        if (!b) return '';
        const c = b.cloneNode(true);
        c.querySelector('h3')?.remove();
        c.querySelectorAll('[style]').forEach(e => e.removeAttribute('style'));
        return c.innerHTML.replace(/\s+/g, ' ').replace(/<p><\/p>/g, '').trim();
      };
      const box = (word) => boxes.findIndex(b => b.querySelector('h3')?.textContent.includes(word));
      return {
        heading: document.querySelector('.jobPagetitle h2')?.textContent.trim() || '',
        posted: (document.querySelector('.jobPagetitle .ptext')?.textContent || '').replace('Ngày đăng:', '').trim(),
        fields,
        description: html(box('Mô tả')),
        benefits: html(box('phúc lợi')),
        skills: [...document.querySelectorAll('.skillslist li a')].map(a => a.textContent.trim()),
        related: [...document.querySelectorAll('.relatedJobs .searchList li h3 a')].map(a => a.href),
      };
    });
    Object.assign(j, d);
    process.stderr.write('.');
  }
  console.error('\njob details done');

  // ---------- Companies ----------
  const companies = [];
  const cseen = new Set();
  for (let n = 1; n < 30; n++) {
    await go('companies?page=' + n);
    const list = await page.evaluate(() => [...document.querySelectorAll('.compnaieslist li .empint a, ul.employerList li .empint a')].map(a => ({
      url: a.href,
      name: a.querySelector('h4')?.textContent.trim() || a.title,
      logo: a.querySelector('img')?.getAttribute('src') || '',
      location: a.querySelector('.emloc')?.textContent.trim() || '',
      openJobs: +((a.querySelector('.cm-info-bottom')?.textContent.match(/\d+/) || [0])[0]),
    })));
    const fresh = list.filter(c => !cseen.has(c.url));
    if (!fresh.length) break;
    fresh.forEach(c => { cseen.add(c.url); companies.push(c); });
    console.error('companies page', n, '+', fresh.length);
  }
  for (const c of companies) {
    await go(c.url.replace(BASE, ''));
    const d = await page.evaluate(() => {
      const details = {};
      document.querySelectorAll('.companyinfo ul li, .company-details li, .jbdetail li').forEach(li => {
        const k = li.children[0]?.textContent.replace(':', '').trim();
        const v = li.children[1]?.textContent.replace(/\s+/g, ' ').trim();
        if (k && v !== undefined) details[k] = v;
      });
      const about = [...document.querySelectorAll('.contentbox, .companyinfo')].find(e => /Về công ty/.test(e.querySelector('h3')?.textContent || ''));
      let aboutHtml = '';
      if (about) {
        const c = about.cloneNode(true);
        c.querySelector('h3')?.remove();
        c.querySelectorAll('[style]').forEach(e => e.removeAttribute('style'));
        aboutHtml = c.innerHTML.replace(/\s+/g, ' ').trim();
      }
      const head = document.querySelector('.job-header .jobinfo, .userPic')?.closest('.job-header') || document.querySelector('.job-header');
      return {
        industry: head?.querySelector('.desi')?.textContent.trim() || '',
        locTexts: [...(head?.querySelectorAll('.loctext') || [])].map(e => e.textContent.replace(/\s+/g, ' ').trim()),
        details,
        aboutHtml,
        jobUrls: [...document.querySelectorAll('.searchList li .jobinfo h3 a')].map(a => a.href),
      };
    });
    Object.assign(c, d);
    process.stderr.write('.');
  }
  console.error('\ncompanies done');

  // ---------- Categories ----------
  await go('all-categories');
  const categories = await page.evaluate(() => [...document.querySelectorAll('.section a')].filter(a => /\(\d+\)/.test(a.textContent)).map(a => ({
    url: a.href,
    name: (a.title || a.querySelector('h3')?.textContent || '').trim(),
    image: a.querySelector('img')?.getAttribute('src') || '',
    count: +((a.textContent.match(/\((\d+)\)/) || [0, 0])[1]),
  })));
  console.error('categories', categories.length);

  // ---------- Blog categories ----------
  await go('blog');
  const blogCategories = await page.evaluate(() => [...document.querySelectorAll('.sidebar a, .widget a')].map(a => ({ name: a.textContent.trim(), url: a.href })).filter(x => x.name));

  fs.writeFileSync(out, JSON.stringify({ scrapedAt: new Date().toISOString(), filters, jobs, companies, categories, blogCategories }, null, 1));
  console.error('saved', out, 'jobs', jobs.length, 'companies', companies.length);
  await browser.close();
})();
