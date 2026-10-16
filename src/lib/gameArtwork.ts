const artwork = [
  {
    "name": "Fortune Tiger",
    "code": "local-pg-126",
    "cover": "/games/fortune-tiger.png?v=vamobet-20261017"
  },
  {
    "name": "Fortune Ox",
    "code": "local-pg-98",
    "cover": "/games/fortune-ox.png?v=vamobet-20261017"
  },
  {
    "name": "Fortune Dragon",
    "code": "local-pg-1695365",
    "cover": "/games/fortune-dragon.png?v=vamobet-20261017"
  },
  {
    "name": "Fortune Rabbit",
    "code": "local-pg-1543462",
    "cover": "/games/fortune-rabbit.png?v=vamobet-20261017"
  },
  {
    "name": "Fortune Mouse",
    "code": "local-pg-68",
    "cover": "/games/fortune-mouse.png?v=vamobet-20261017"
  },
  {
    "name": "Bikini Paradise",
    "code": "local-pg-69",
    "cover": "/games/bikini-paradise.png?v=vamobet-20261017"
  },
  {
    "name": "Jungle Delight",
    "code": "local-pg-40",
    "cover": "/games/jungle-delight.png?v=vamobet-20261017"
  },
  {
    "name": "Ganesha Gold",
    "code": "local-pg-42",
    "cover": "/games/ganesha-gold.png?v=vamobet-20261017"
  },
  {
    "name": "Double Fortune",
    "code": "local-pg-48",
    "cover": "/games/double-fortune.png?v=vamobet-20261017"
  },
  {
    "name": "Dragon Tiger Luck",
    "code": "local-pg-63",
    "cover": "/games/dragon-tiger-luck.png?v=vamobet-20261017"
  },
  {
    "name": "Butterfly Blossom",
    "code": "local-pg-125",
    "cover": "/games/butterfly-blossom.png?v=vamobet-20261017"
  }
];
export function getBrandedGameCover(name: string, code?: string): string | undefined {
  const normalize = (value: string) => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const normalized = normalize(name);
  const key = String(code || name || '').trim().toLowerCase();
  const match = artwork.find(g => g.code === key || g.code.slice(9) === key || g.code.replace('local-', '') === key || normalize(g.name) === normalize(key)) || artwork.find(g => normalize(g.name) === normalized);
  if (match) return match.cover;
  if (normalized === 'medusasstone' || normalized === 'medusastone') return '/games/medusas-stone.png';
  return undefined;
}
