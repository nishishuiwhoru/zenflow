import type { NextApiRequest, NextApiResponse } from 'next';
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const records = await base('Meditations').select({ view: 'Grid view' }).all();
    const items = records.map((r) => ({
      title: r.get('Title'),
      slug: r.get('Slug'),
      category: r.get('Category'),
      duration: r.get('Duration'),
      voiceActor: r.get('VoiceActor'),
      bgm: r.get('BGM'),
      audioUrl: (r.get('AudioURL') as any)?.[0]?.url,
      coverUrl: (r.get('CoverURL') as any)?.[0]?.url,
    }));
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
