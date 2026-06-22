// Genere data/questions-en-fr.json et data/questions-fr-en.json a partir des
// fichiers sources questions/levelN.txt (EN|FR_hint|extra...) et
// questions1/levelN.txt (FR|EN), pour servir les phrases en statique (Netlify)
// au lieu de les lire depuis Firestore.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function parseEnFr(content) {
  return content.split(/\r?\n/).map(l => l.trim()).filter(Boolean).map(line => {
    const parts = line.split('|');
    return {
      en: parts[0].trim(),
      hint: parts[1].trim(),
      answers: parts.slice(2).map(a => a.trim()).filter(Boolean),
    };
  });
}

function parseFrEn(content) {
  return content.split(/\r?\n/).map(l => l.trim()).filter(Boolean).map(line => {
    const sep = line.indexOf('|');
    const fr = line.slice(0, sep).trim();
    const en = line.slice(sep + 1).trim();
    return { en: fr, hint: en, answers: [en] };
  });
}

function build(srcDir, parser, outFile) {
  const all = [];
  for (let level = 1; level <= 5; level++) {
    const filePath = path.join(ROOT, srcDir, `level${level}.txt`);
    const content = fs.readFileSync(filePath, 'utf8');
    parser(content).forEach((q, i) => all.push({ id: `l${level}-${i}`, level, ...q }));
  }
  fs.mkdirSync(path.join(ROOT, 'data'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'data', outFile), JSON.stringify(all));
  console.log(outFile, '->', all.length, 'phrases');
}

build('questions', parseEnFr, 'questions-en-fr.json');
build('questions1', parseFrEn, 'questions-fr-en.json');
