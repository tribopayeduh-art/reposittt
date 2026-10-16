const artwork = [
  {
    "name": "Fortune Tiger",
    "code": "local-pg-126",
    "cover": "/games/fortune-tiger.png"
  },
  {
    "name": "Fortune Ox",
    "code": "local-pg-98",
    "cover": "/games/fortune-ox.png"
  },
  {
    "name": "Fortune Dragon",
    "code": "local-pg-1695365",
    "cover": "/games/fortune-dragon.png"
  },
  {
    "name": "Fortune Rabbit",
    "code": "local-pg-1543462",
    "cover": "/games/fortune-rabbit.png"
  },
  {
    "name": "Fortune Mouse",
    "code": "local-pg-68",
    "cover": "/games/fortune-mouse.png"
  },
  {
    "name": "Bikini Paradise",
    "code": "local-pg-69",
    "cover": "/games/bikini-paradise.png"
  },
  {
    "name": "Jungle Delight",
    "code": "local-pg-40",
    "cover": "/games/jungle-delight.png"
  },
  {
    "name": "Ganesha Gold",
    "code": "local-pg-42",
    "cover": "/games/ganesha-gold.png"
  },
  {
    "name": "Double Fortune",
    "code": "local-pg-48",
    "cover": "/games/double-fortune.png"
  },
  {
    "name": "Dragon Tiger Luck",
    "code": "local-pg-63",
    "cover": "/games/dragon-tiger-luck.png"
  },
  {
    "name": "Butterfly Blossom",
    "code": "local-pg-125",
    "cover": "/games/butterfly-blossom.png"
  }
];
export function getBrandedGameCover(name, code) {
  const normalize = (value) => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const normalized = normalize(name);
  const key = String(code || name || '').trim().toLowerCase();
  const match = artwork.find(g => g.code === key || g.code.slice(9) === key || g.code.replace('local-', '') === key || normalize(g.name) === normalize(key)) || artwork.find(g => normalize(g.name) === normalized);
  if (match) return match.cover;
  if (normalized === 'medusasstone' || normalized === 'medusastone') return '/games/medusas-stone.png';
  return undefined;
}
