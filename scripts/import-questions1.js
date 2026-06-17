// Importe questions1/levelN.txt (FR|EN) dans la collection Firestore "questions_fr_en".
// Usage: GOOGLE_APPLICATION_CREDENTIALS=<chemin-vers-service-account.json> node scripts/import-questions1.js
//
// Nécessite le package firebase-admin (npm install firebase-admin) et une clé de service
// Firebase (Console Firebase > Paramètres du projet > Comptes de service > Générer une nouvelle clé privée).
// Ce script n'est pas exécuté automatiquement : à lancer manuellement par le propriétaire du projet Firebase.
const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

admin.initializeApp({ credential: admin.credential.applicationDefault() });
const db = admin.firestore();

async function importLevel(level) {
  const filePath = path.join(__dirname, '..', 'questions1', `level${level}.txt`);
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/).filter(l => l.length > 0);

  let batch = db.batch();
  let opsInBatch = 0;
  let total = 0;

  for (const line of lines) {
    const sep = line.indexOf('|');
    const fr = line.slice(0, sep);
    const en = line.slice(sep + 1);

    const ref = db.collection('questions_fr_en').doc();
    batch.set(ref, { en: fr, hint: en, answers: [en], level });
    opsInBatch++;
    total++;

    if (opsInBatch === 450) {
      await batch.commit();
      batch = db.batch();
      opsInBatch = 0;
    }
  }
  if (opsInBatch > 0) await batch.commit();

  console.log(`level${level}: ${total} documents importés dans questions_fr_en`);
}

(async () => {
  for (let level = 1; level <= 5; level++) {
    await importLevel(level);
  }
  console.log('Import terminé.');
  process.exit(0);
})().catch(err => {
  console.error('Erreur import:', err);
  process.exit(1);
});
