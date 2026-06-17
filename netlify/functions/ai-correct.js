export default async (req) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  const { en, correct, userAnswer, wasCorrect, mode } = await req.json();

  if (mode === 'ping') {
    const probe = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.GROQ_API_KEY}` },
      body: JSON.stringify({ model: 'llama-3.1-8b-instant', messages: [{ role: 'user', content: '.' }], max_tokens: 1 })
    });
    const info = {
      ok: probe.ok,
      status: probe.status,
      remaining: probe.headers.get('x-ratelimit-remaining-requests'),
      limit: probe.headers.get('x-ratelimit-limit-requests'),
      reset: probe.headers.get('x-ratelimit-reset-requests'),
      keyPresent: !!process.env.GROQ_API_KEY
    };
    return new Response(JSON.stringify(info), { headers: { 'Content-Type': 'application/json' } });
  }

  if (mode === 'check') {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.GROQ_API_KEY}` },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: `Tu es un correcteur bienveillant pour un exercice de traduction anglais → français.
Réponds UNIQUEMENT par "oui" ou "non".
La réponse de l'élève est-elle une traduction correcte ou acceptable de la phrase anglaise ?
Règles strictes :
- IGNORE totalement les accents manquants ou incorrects (ex: "fatigue" = "fatigué", "etre" = "être") → toujours accepter
- IGNORE la ponctuation et les majuscules
- ACCEPTE les synonymes et formulations équivalentes
- ACCEPTE les variantes tu/vous, passé composé/imparfait si les deux sont valides
- ACCEPTE les formes interrogatives équivalentes (ex: "Est-ce loin ?" = "C'est loin ?", "Où est-ce que tu vas ?" = "Où vas-tu ?", inversion vs "est-ce que" vs forme déclarative + "?")
- Si la traduction de référence liste plusieurs formulations séparées par " / ", ce sont TOUTES des variantes valides : accepte toute réponse proche de N'IMPORTE LAQUELLE d'entre elles
- REJETTE uniquement si le sens est clairement faux, incomplet ou hors sujet`
          },
          {
            role: 'user',
            content: `Phrase anglaise : "${en}"\nTraduction(s) de référence : "${correct}"\nRéponse de l'élève : "${userAnswer}"`
          }
        ],
        max_tokens: 5,
        temperature: 0
      })
    });
    if (!res.ok) return new Response(JSON.stringify({ correct: null }), { headers: { 'Content-Type': 'application/json' } });
    const data = await res.json();
    const answer = data.choices?.[0]?.message?.content?.trim().toLowerCase() ?? '';
    const isOui = answer.startsWith('oui');
    const isNon = answer.startsWith('non');
    return new Response(JSON.stringify({ correct: isOui || isNon ? isOui : null }), { headers: { 'Content-Type': 'application/json' } });
  }

  const system = mode === 'live'
    ? 'Tu corriges brièvement des traductions EN→FR. 1 phrase max, directe, en français. Pas de politesse.'
    : wasCorrect
      ? 'Confirme la bonne traduction en ajoutant un point linguistique court. 1 phrase en français.'
      : 'Explique pourquoi la traduction est incorrecte et comment la corriger. 2 phrases max en français.';

  const user = mode === 'live'
    ? `Original: "${en}"\nAttendu: "${correct}"\nBrouillon: "${userAnswer}"\nFeedback:`
    : `Original: "${en}"\nAttendu: "${correct}"\nRéponse: "${userAnswer}"`;

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
      max_tokens: mode === 'live' ? 60 : 110,
      temperature: mode === 'live' ? 0.2 : 0.3
    })
  });

  if (!res.ok) return new Response(JSON.stringify({ text: '' }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content?.trim() ?? '';
  return new Response(JSON.stringify({ text }), {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const config = { path: '/api/ai-correct' };
