// Mängelfassung für den Beispielbericht des Website-Check-ups: derselbe Code, mit MAENGEL=1 gebaut, zeigt typische
// Mängel kleiner Websites. Nur Sichtbares und Einstellungen, keine echten Datenflüsse zu Dritten.
export const maengel = process.env.MAENGEL === '1';

export const guteFassung = 'https://tischlerei-mustermann.hschaletzky.com';

/** Leistungsseiten ohne Beschreibung für Suchmaschinen */
export const ohneBeschreibung = ['kuechen', 'treppen', 'restaurierung'];
