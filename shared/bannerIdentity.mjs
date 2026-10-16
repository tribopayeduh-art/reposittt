// One source of truth for artwork received from files, APIs or database listeners.
export const ARTWORK_VERSION = 'vamobet-20261017-v2';
export const BANNER_FILES = ['bannerborah1.png','bannerborah2.png','bannerdep.png','bonus300-900.png','deposito-300.png','ca100por500.png','ca200por1000.png','100por500.png','200por1000.png','desafio-tiger-desktop.png','desafio-tiger-home-v2.png','desafio-tiger-mobile.png','popupdeposito001.png','zerobet-primeiro-deposito-200-1200.png','zerobet-primeiro-deposito-stories.png','zerobet-stories-cta.png','auth-welcome-tiger.png','auth-register-tiger.png'];
export function artworkUrl(file) { return `/banners/${ARTWORK_VERSION}/${file}`; }
export function brandedImage(value, version = '') {
  let decoded = String(value || '').trim();
  if (!decoded) return '';
  for (let i=0;i<3;i++) { try { const next=decodeURIComponent(decoded); if(next===decoded)break; decoded=next; } catch { break; } }
  const filename=decoded.split(/[?#]/)[0].split('/').pop().replace(/\s*\(\d+\)(?=\.[a-z]+$)/i,'').toLowerCase();
  const known=BANNER_FILES.find(file=>file.toLowerCase()===filename);
  if(known)return artworkUrl(known);
  // Unknown pre-rebrand database images cannot be identified by URL alone.
  if(version!==ARTWORK_VERSION)return '';
  if(!/^(https?:\/\/|\/(?!\/))/i.test(decoded))return '';
  return String(value).trim();
}
export function brandedText(value) { return typeof value==='string'?value.replace(/Nacional\s*Bet|Zero\s*Bet|Velo\s*Bet|Borah\s*Bet|Amora\s*Bet|Resenha\s*Bet|Playzada\s*Bet|Can[áa]rio\s*Bet/gi,'Vamobet'):value; }
export function normalizeBanner(b) {
  if(!b || typeof b!=='object')return null;
  const next={...b};
  const desktop=brandedRecordImage(b,b.desktopImage?'desktopImage':b.imageUrl?'imageUrl':'image_path');
  const mobile=brandedRecordImage(b,'mobileImage');
  if(!desktop&&!mobile)return null;
  next.desktopImage=desktop||mobile;next.mobileImage=mobile||desktop;next.imageUrl=desktop||mobile;
  next.artworkBrandVersion=ARTWORK_VERSION;
  for(const key of ['title','name','subtitle','badge','buttonText'])next[key]=brandedText(next[key]);
  return next;
}
export function normalizeArtworkSettings(settings) {
  const next={...(settings||{})};
  if(next.homeBannerImage)next.homeBannerImage=brandedRecordImage(next,'homeBannerImage')||artworkUrl('bannerborah1.png');
  if(next.popupImage)next.popupImage=brandedRecordImage(next,'popupImage')||artworkUrl('desafio-tiger-mobile.png');
  return next;
}
export function brandedRecordImage(record, key) {
  const value=record?.[key];
  const approved=record?.artworkBrandVersion===ARTWORK_VERSION && Array.isArray(record.artworkSources) && record.artworkSources.includes(value);
  return brandedImage(value,approved?ARTWORK_VERSION:'');
}
export function markArtwork(record, key, value) {
  return {...record,[key]:value,artworkBrandVersion:ARTWORK_VERSION,artworkSources:[...new Set([...(record.artworkSources||[]),String(value||'')].filter(Boolean))]};
}
