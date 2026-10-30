// Fiktive Stammdaten der Beispiel-Tischlerei. Alles hier ist erfunden.
export const firma = {
  name: 'Tischlerei Mustermann',
  kurzname: 'Mustermann',
  claim: 'Möbel, die bleiben.',
  gruendung: 1987,
  inhaber: 'Max Mustermann',
  strasse: 'Am Sägewerk 7',
  plz: '12345',
  ort: 'Musterstadt',
  telefon: '+49 123 456 789 0',
  telefonHref: 'tel:+491234567890',
  email: 'hallo@tischlerei-mustermann.example',
  oeffnungszeiten: [
    { tage: 'Montag – Donnerstag', zeit: '7:30 – 17:00 Uhr' },
    { tage: 'Freitag', zeit: '7:30 – 14:00 Uhr' },
    { tage: 'Samstag', zeit: 'Ausstellung nach Termin' },
  ],
};

export const navigation = [
  { href: '/leistungen/', label: 'Leistungen' },
  { href: '/moebel/', label: 'Möbel' },
  { href: '/werkstatt/', label: 'Werkstatt' },
  { href: '/journal/', label: 'Journal' },
];

export const ersteller = {
  name: 'Hannes Schaletzky',
  url: 'https://hschaletzky.com',
};

export const euro = (wert: number) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(wert);

export const datum = (d: Date) =>
  new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);

// Alle Fotos stammen von Unsplash (Unsplash-Lizenz).
export const bildnachweise = [
  ['Darin Wicentowich', 'MWti0Vr2A-M'],
  ['Heng Yin', 'KKY0GrQPqVo'],
  ['Ali Mkumbwa', 'PxlKOcj0a3Q'],
  ['Craft Kitties', 'GfYA6q5ESLI'],
  ['Dominik Scythe', '3cIvvzjE6Lk'],
  ['Bailey Alexander', 'DfffcjQ106U'],
  ['Paulina Herpel', 'uIjytgNbjgE'],
  ['Paulina Herpel', 'y54M7lMwfX0'],
  ['Minh Đức', 'WWLuyDP3t1U'],
  ['Janosch Lino', 'oQQEXoG8Oqc'],
  ['Minh Đức', 'lQIUbkn6jj4'],
  ['Pickawood', 'cEKpNmGIlGQ'],
  ['Suryakant Prajapati', '6OCmgz7n4fM'],
  ['Tommao Wang', 'ehbFlJBwR7w'],
  ['Raygar He', 'iyOEfpWjky0'],
  ['Pickawood', 't2IGE2VqtwA'],
  ['Pickawood', 'o_dokgznFKQ'],
  ['Costa Live', 'h_BP6DlGOvo'],
  ['Tim Schmidbauer', 'caA5D7QCHyA'],
  ['Kam Idris', 'hYb7kbu4x7E'],
  ['Clay Banks', 'htmZWzApbJE'],
  ['Tai Jyun Chang', 'JScz5-b5Vto'],
  ['Andrea Davis', '7Wg_9Dq17_U'],
  ['Clay Banks', 'JbLev8Y0xUQ'],
  ['Clay Banks', 'bcaFHquzu3M'],
  ['Simon Berger', 'JH_R66BihvA'],
] as const;
