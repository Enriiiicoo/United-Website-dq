// app/api/whitelist/route.ts
import { pool } from '@/lib/mysql';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  const { discordId, irlName, irlAge, ingameName, ingameAge, experience, serial } = body;

  try {
    // Check for existing submission
    const [existing]: any = await pool.execute(
      'SELECT 1 FROM whitelist_submissions WHERE discord_id = ? LIMIT 1',
      [discordId]
    );

    if (existing.length) {
      return NextResponse.json({ error: 'You already submitted an application.' }, { status: 409 });
    }

    // Save to DB
    await pool.execute(
      `INSERT INTO whitelist_submissions 
        (discord_id, irl_name, irl_age, ingame_name, ingame_age, experience, serial)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
      , [discordId, irlName, irlAge, ingameName, ingameAge, experience, serial]
    );

    // Send to Discord webhook
    await fetch(process.env.DISCORD_WEBHOOK_URL as string, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [
          {
            title: '📝 New Whitelist Application',
            color: 3447003,
            fields: [
              { name: 'IRL Name', value: irlName },
              { name: 'IRL Age', value: irlAge },
              { name: 'In-Game Name', value: ingameName },
              { name: 'In-Game Age', value: ingameAge },
              { name: 'Experience', value: experience },
              { name: 'Serial', value: serial },
              { name: 'Discord', value: `<@${discordId}> (${discordId})` }
            ],
            timestamp: new Date().toISOString()
          }
        ]
      })
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Whitelist API Error]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
