import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { ARTWORK_VERSION, BANNER_FILES, artworkUrl, brandedImage, brandedRecordImage, normalizeBanner, normalizeArtworkSettings, markArtwork } from '../shared/bannerIdentity.mjs';
test('every manifest entry resolves to an existing versioned Vamobet image',()=>{for(const name of BANNER_FILES)assert.ok(fs.existsSync('public'+artworkUrl(name)),name);});
test('legacy local URLs, Firebase encoded object names and numbered copies resolve locally',()=>{
 for(const value of ['/banners/bannerborah1.png?v=nacional-original-2','https://old.example/bannerborah1(3).png','https://firebasestorage.googleapis.com/v0/b/demo/o/banners%2Fbannerborah1%25283%2529.png?alt=media&token=old','https://old.example/banners/BANNERBORAH1%20(2).png'])assert.equal(brandedImage(value),artworkUrl('bannerborah1.png'));
});
test('unknown legacy campaigns never override the official fallback',()=>{assert.equal(normalizeBanner({desktopImage:'https://storage.example/old-random.png',mobileImage:'data:image/png;base64,old',active:true}),null);});
test('a campaign keeps its action, targeting, metrics, order and amounts',()=>{
 const input={id:'a',title:'Nacional Bet R$ 200',desktopImage:'https://old.example/bannerborah1(3).png',mobileImage:'https://old.example/uuid.jpg',priority:123,sortOrder:8,action:{type:'DEPOSIT',amount:200},targeting:{neverDeposited:true},metrics:{clicks:12}};
 const n=normalizeBanner(input);assert.equal(n.title,'Vamobet R$ 200');assert.equal(n.mobileImage,n.desktopImage);for(const key of ['id','priority','sortOrder','action','targeting','metrics'])assert.deepEqual(n[key],input[key]);assert.equal(input.title,'Nacional Bet R$ 200');
});
test('new custom artwork remains usable after an explicit image edit',()=>{
 const edited=markArtwork({desktopImage:'https://old.example/unidentified.png',mobileImage:'https://old.example/mobile.png'},'desktopImage','https://new.example/vamobet-campaign.webp');
 const n=normalizeBanner(edited);assert.equal(n.desktopImage,'https://new.example/vamobet-campaign.webp');assert.equal(n.mobileImage,n.desktopImage);assert.equal(brandedRecordImage({artworkBrandVersion:ARTWORK_VERSION,image:'https://old.example/image.png'},'image'),'');
});
test('old settings get branded defaults while new settings retain explicit uploads',()=>{
 const old=normalizeArtworkSettings({homeBannerImage:'https://old.example/random.jpg',popupImage:'/banners/desafio-tiger-mobile(2).png',minDeposit:25});assert.equal(old.homeBannerImage,artworkUrl('bannerborah1.png'));assert.equal(old.popupImage,artworkUrl('desafio-tiger-mobile.png'));assert.equal(old.minDeposit,25);
 const recent=normalizeArtworkSettings(markArtwork({},'popupImage','/uploads/design/new-uuid.png'));assert.equal(recent.popupImage,'/uploads/design/new-uuid.png');
});
test('unapproved bonus imagery disappears without removing bonus rules',()=>{assert.equal(brandedRecordImage({image:'https://old.example/random-bonus.jpg',percent:300},'image'),'');});
