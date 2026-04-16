const cheerio = require('cheerio');
const fs = require('fs');

const raw = fs.readFileSync('scraped.html', 'utf8');
const $ = cheerio.load(raw);

const titles = [];
$('.profile-badge-title, .badge-title').each((i, el) => titles.push($(el).text().trim()));
console.log('Class [profile-badge-title, badge-title]:', titles.length > 0 ? titles : 'None');

const altTitles = [];
$('.ql-title-medium').each((i, el) => altTitles.push($(el).text().trim()));
console.log('Class [ql-title-medium]:', altTitles.length > 0 ? altTitles : 'None');

const allText = [];
$('span, div').each((i, el) => {
    const text = $(el).text().trim();
    if (text.toLowerCase().includes('badge')) allText.push(text.substring(0, 50));
});

console.log('Elements containing "badge":', allText.filter(t => t.length > 5 && t.length < 50).slice(0, 10));
