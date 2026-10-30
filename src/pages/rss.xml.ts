import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const beitraege = (await getCollection('journal')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return rss({
    title: 'Journal · Tischlerei Mustermann',
    description: 'Holzkunde, Pflegetipps und Einblicke in die Werkstatt.',
    site: context.site!,
    items: beitraege.map((b) => ({
      title: b.data.title,
      description: b.data.description,
      pubDate: b.data.date,
      link: `/journal/${b.id}/`,
    })),
    customData: '<language>de-de</language>',
  });
}
