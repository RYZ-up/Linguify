// Génère questions1/levelN.txt (FR|EN) à partir de questions/levelN.txt (EN|FR1|FR2|...)
// Pur swap de colonnes : aucune traduction générée, zéro phrase oubliée.
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'questions');
const outDir = path.join(__dirname, '..', 'questions1');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

for (let level = 1; level <= 5; level++) {
  const srcPath = path.join(srcDir, `level${level}.txt`);
  const outPath = path.join(outDir, `level${level}.txt`);

  const lines = fs.readFileSync(srcPath, 'utf8').split(/\r?\n/).filter(l => l.length > 0);
  const outLines = [];

  for (const line of lines) {
    const parts = line.split('|');
    if (parts.length < 2) {
      throw new Error(`Ligne malformée dans level${level}.txt: "${line}"`);
    }
    const en = parts[0];
    const fr = parts[1];
    outLines.push(`${fr}|${en}`);
  }

  fs.writeFileSync(outPath, outLines.join('\n') + '\n', 'utf8');
  console.log(`level${level}.txt: ${lines.length} lignes source -> ${outLines.length} lignes générées`);
}
