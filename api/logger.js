export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const forwarded = req.headers['x-forwarded-for'];

    let ip;
    if (forwarded) {
        ip = forwarded.split(',')[0].trim();
    } else {
        ip = req.socket.remoteAddress;
    }
    
    const { page, clientTime } = req.body || {};

    const serverTime = new Date().toISOString();

    console.log(`[VISIT] IP=${ip} | page=${page} | clientTime=${clientTime} | serverTime=${serverTime}`);

    return res.status(200).json({ ok: true });
}
