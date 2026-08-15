/* Modern Mercantile data layer: browser-only demo inventory and localStorage state. */
const SommieStore = (() => {
  const storage = {
    products: 'sommie_products', cart: 'sommie_cart', wishlist: 'sommie_wishlist',
    theme: 'sommie_theme', user: 'sommie_user', viewed: 'sommie_viewed'
  };

  const localAssetPrefix = location.pathname.includes('/admin/') ? '../customer/assets/images/' : './assets/images/';
  const assets = {
    hero: location.protocol === 'file:' ? `${localAssetPrefix}sommie-hero-editorial.jpg` : '/manus-storage/sommie-hero-editorial_0e42a688.jpg',
    style: location.protocol === 'file:' ? `${localAssetPrefix}sommie-category-style.jpg` : '/manus-storage/sommie-category-style_94073ee1.jpg',
    home: location.protocol === 'file:' ? `${localAssetPrefix}sommie-category-home.jpg` : '/manus-storage/sommie-category-home_abc5ee1e.jpg',
    objects: location.protocol === 'file:' ? `${localAssetPrefix}sommie-category-objects.jpg` : '/manus-storage/sommie-category-objects_e2f374b9.jpg',
    logo: location.protocol === 'file:' ? `${localAssetPrefix}sommie-logo-mark.png` : '/manus-storage/sommie-logo-mark_56f50d65.png'
  };

  const seedProducts = [
    {id:1,name:'Arc Lounge Chair',category:'Home',price:580,oldPrice:640,badge:'New',image:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=86',description:'A low, generous lounge chair with a soft silhouette and a quiet suede finish.',colors:['#d8cabb','#1f211f','#9e6042'],sizes:['One size'],stock:12},
    {id:2,name:'Field Notes Tote',category:'Style',price:96,badge:'Edition 02',image:'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=86',description:'Structured canvas, vegetable-tanned trim, and enough room for the day’s essentials.',colors:['#232321','#c0a47b','#a55243'],sizes:['One size'],stock:23},
    {id:3,name:'Tactile Ceramic Set',category:'Home',price:74,badge:'New',image:'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=86',description:'Four hand-finished stoneware pieces made for unhurried meals and open shelves.',colors:['#e9e3d8','#77736d','#29352b'],sizes:['4 piece'],stock:18},
    {id:4,name:'Studio Runner',category:'Style',price:138,oldPrice:172,badge:'Sale',image:'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=86',description:'A low-profile everyday runner with supple panels and a planted, lightweight sole.',colors:['#f1eee5','#30302e','#7b836c'],sizes:['38','39','40','41','42','43','44'],stock:8},
    {id:5,name:'Signal Desk Lamp',category:'Home',price:184,badge:'Limited',image:'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=86',description:'Directional illumination with a hand-spun shade and a compact weighted base.',colors:['#191919','#dbd3c6','#f04d36'],sizes:['One size'],stock:6},
    {id:6,name:'Interval Watch',category:'Objects',price:220,badge:'New',image:'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=86',description:'A precise analogue companion with a brushed case and tightly woven fabric strap.',colors:['#30302e','#b7b2aa','#626e5a'],sizes:['One size'],stock:15},
    {id:7,name:'Morrow Carry Bottle',category:'Objects',price:42,image:'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=86',description:'Insulated stainless steel, a quiet matte finish, and an easy loop cap.',colors:['#20211f','#e3dfd5','#6b846e'],sizes:['500ml'],stock:32},
    {id:8,name:'Soft Form Throw',category:'Home',price:124,image:'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=86',description:'A weighted jacquard throw with an oversized weave in a low-contrast charcoal check.',colors:['#4a4a43','#c5bbad','#827766'],sizes:['130 × 170 cm'],stock:11},
    {id:9,name:'Everyday Overshirt',category:'Style',price:148,badge:'New',image:'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=86',description:'A softly structured layer cut from crisp cotton twill with utility pockets.',colors:['#161616','#d6d1c6','#697867'],sizes:['S','M','L','XL'],stock:27},
    {id:10,name:'Column Incense Holder',category:'Home',price:38,image:'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=86',description:'A small architectural object in dark clay, formed to hold a single fragrant line.',colors:['#2c2b28','#dcd5c8'],sizes:['One size'],stock:25},
    {id:11,name:'Index Speaker',category:'Objects',price:156,badge:'Edition 02',image:'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=900&q=86',description:'Compact room sound in an upholstered, carryable form with one tactile dial.',colors:['#e8e4dc','#242522','#717968'],sizes:['One size'],stock:9},
    {id:12,name:'Civic Cap',category:'Style',price:46,image:'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=86',description:'An unstructured six-panel cap cut from washed cotton with a tonal embroidered mark.',colors:['#20211f','#e6dfd4','#a85642'],sizes:['Adjustable'],stock:19}
  ];

  const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
  const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const products = () => read(storage.products, seedProducts);
  const getProduct = id => products().find(product => product.id === Number(id));
  const cart = () => read(storage.cart, []);
  const wishlist = () => read(storage.wishlist, []);
  const saveCart = value => write(storage.cart, value);
  const saveWishlist = value => write(storage.wishlist, value);
  const cartDetails = () => cart().map(line => ({...getProduct(line.id), qty:line.qty, size:line.size || 'One size', color:line.color || ''})).filter(Boolean);
  const cartTotal = () => cartDetails().reduce((sum,line) => sum + line.price * line.qty, 0);
  const formatMoney = value => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(value);

  return {
    storage, assets, products, getProduct, cart, wishlist, cartDetails, cartTotal, formatMoney,
    addToCart(id, qty=1, options={}) { const lines=cart(); const existing=lines.find(line=>line.id===Number(id)&&line.size===(options.size||'One size')&&line.color===(options.color||'')); if(existing) existing.qty+=qty; else lines.push({id:Number(id),qty,size:options.size||'One size',color:options.color||''}); saveCart(lines); return lines; },
    updateCart(id, qty, options={}) { const lines=cart(); const line=lines.find(item=>item.id===Number(id)&&item.size===(options.size||'One size')&&item.color===(options.color||'')); if(line) line.qty=Math.max(1,qty); saveCart(lines); },
    removeCart(id, options={}) { saveCart(cart().filter(line=>!(line.id===Number(id)&&line.size===(options.size||'One size')&&line.color===(options.color||'')))); },
    toggleWishlist(id) { const ids=wishlist(); const index=ids.indexOf(Number(id)); index===-1?ids.push(Number(id)):ids.splice(index,1); saveWishlist(ids); return ids.includes(Number(id)); },
    isWishlisted(id) { return wishlist().includes(Number(id)); },
    setTheme(theme) { localStorage.setItem(storage.theme,theme); document.documentElement.dataset.theme=theme; },
    getTheme() { return localStorage.getItem(storage.theme)||'light'; },
    setUser(user) { write(storage.user,user); }, getUser() { return read(storage.user,null); },
    addViewed(id) { const viewed=read(storage.viewed,[]).filter(item=>item!==Number(id)); viewed.unshift(Number(id)); write(storage.viewed,viewed.slice(0,6)); },
    recentlyViewed() { return read(storage.viewed,[]).map(getProduct).filter(Boolean); },
    resetProducts() { write(storage.products,seedProducts); }
  };
})();
