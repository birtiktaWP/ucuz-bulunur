<script setup>
import { ref } from 'vue'
import { categories, products, priceDrops, brands } from '@/data/catalog'
import ProductCard from '@/components/ProductCard.vue'
import ProductThumb from '@/components/ProductThumb.vue'
import PriceSpark from '@/components/PriceSpark.vue'
import StarRating from '@/components/StarRating.vue'

const heroQuery = ref('')

const popular = products.slice(0, 8)
const drops = priceDrops.slice(0, 5)

const featured = products[0]
const featuredStores = [
  { store: 'MamaDeposu', price: 489, cargo: 'Ücretsiz kargo' },
  { store: 'Petlebi', price: 512, cargo: '39,90 ₺ kargo' },
  { store: 'Zoomart', price: 534, cargo: 'Ücretsiz kargo' },
  { store: 'Pet Dükkanı', price: 559, cargo: '49,90 ₺ kargo' },
]

const valueProps = [
  { t: '180+ mağaza', d: 'tek ekranda karşılaştır' },
  { t: '90 günlük fiyat geçmişi', d: 'gerçek grafik' },
  { t: 'Ücretsiz fiyat alarmı', d: 'düşünce haber ver' },
  { t: 'Günlük fiyat taraması', d: '2M+ kayıt' },
]

const steps = [
  { title: 'Mamayı ara', text: 'Marka, ürün ya da kategoriyle aradığın mamayı bul.' },
  { title: 'Fiyatları karşılaştır', text: 'Onlarca mağazanın güncel fiyatını yan yana gör.' },
  { title: 'Alarm kur, ucuza al', text: 'Hedef fiyata düştüğünde anında haber ver.' },
]

const money = (v) =>
  v.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 })
</script>

<template>
  <!-- HERO -->
  <section class="hero">
    <div class="container hero-grid">
      <div class="hero-copy">
        <span class="eyebrow">Kedi &amp; köpek maması fiyat karşılaştırma</span>
        <h1>Aynı mamayı <span class="accent">en ucuza</span> bulmanın en kolay yolu</h1>
        <p class="hero-sub">
          Yüzlerce mağazanın güncel fiyatını tek ekranda karşılaştır, fiyat
          geçmişini incele, düştüğü an haberdar ol.
        </p>

        <form class="hero-search" role="search" @submit.prevent>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" />
            <path d="m20 20-3.2-3.2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
          <input
            v-model="heroQuery"
            type="search"
            placeholder="Örn. Royal Canin, tahılsız kedi maması…"
            aria-label="Mama ara"
          />
          <button type="submit" class="btn accent-fill">Karşılaştır</button>
        </form>

        <div class="hero-tries">
          <span>Sık aranan:</span>
          <RouterLink to="/" class="try">Royal Canin</RouterLink>
          <RouterLink to="/" class="try">tahılsız kedi maması</RouterLink>
          <RouterLink to="/" class="try">yavru köpek maması</RouterLink>
        </div>
      </div>

      <aside class="compare" aria-label="Örnek fiyat karşılaştırması">
        <div class="compare-head">
          <div class="compare-thumb">
            <ProductThumb :product="featured" :size="60" />
          </div>
          <div>
            <span class="compare-brand">{{ featured.brand }}</span>
            <h3 class="compare-name">Indoor Yetişkin Kedi Maması 2 kg</h3>
            <StarRating :rating="featured.rating" :reviews="featured.reviews" />
          </div>
        </div>

        <ul class="compare-list">
          <li
            v-for="(s, i) in featuredStores"
            :key="s.store"
            class="compare-row"
            :class="{ best: i === 0 }"
          >
            <div class="row-store">
              <span class="store-name">{{ s.store }}</span>
              <span class="store-cargo">{{ s.cargo }}</span>
            </div>
            <div class="row-price">
              <span v-if="i === 0" class="best-tag">en ucuz</span>
              <span class="pval">{{ money(s.price) }}</span>
            </div>
          </li>
        </ul>

        <div class="compare-foot">
          <PriceSpark
            :history="featured.history"
            :down="true"
            :width="210"
            :height="40"
            color="var(--accent)"
          />
          <div class="foot-note">
            <strong>30 günde %8 düştü</strong>
            <span>{{ featured.storeCount }} mağazada</span>
          </div>
        </div>
      </aside>
    </div>
  </section>

  <!-- DEĞER ŞERİDİ -->
  <div class="value-strip">
    <div class="container value-inner">
      <div v-for="v in valueProps" :key="v.t" class="value-item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m4 12 5 5L20 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span><strong>{{ v.t }}</strong> — {{ v.d }}</span>
      </div>
    </div>
  </div>

  <!-- KATEGORİLER -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <div>
          <span class="eyebrow">Kategoriler</span>
          <h2>Kategoriye göre keşfet</h2>
        </div>
        <RouterLink to="/" class="link-more">Tüm kategoriler →</RouterLink>
      </div>

      <div class="cat-grid">
        <RouterLink v-for="c in categories" :key="c.slug" to="/" class="cat-tile">
          <span class="cat-name">{{ c.name }}</span>
          <span class="cat-meta">
            <span class="pet-dot" :class="c.pet"></span>
            {{ c.count.toLocaleString('tr-TR') }} ürün
          </span>
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- POPÜLER -->
  <section class="section band">
    <div class="container">
      <div class="section-head">
        <div>
          <span class="eyebrow">Bu hafta öne çıkan</span>
          <h2>En çok karşılaştırılan mamalar</h2>
        </div>
        <RouterLink to="/" class="link-more">Tümünü gör →</RouterLink>
      </div>

      <div class="product-grid">
        <ProductCard v-for="p in popular" :key="p.slug" :product="p" />
      </div>
    </div>
  </section>

  <!-- FİYAT DÜŞÜŞ TABLOSU -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <div>
          <span class="eyebrow">Son 30 gün</span>
          <h2>En çok ucuzlayan mamalar</h2>
        </div>
        <RouterLink to="/" class="link-more">Tüm fırsatlar →</RouterLink>
      </div>

      <div class="drop-board">
        <div v-for="(p, i) in drops" :key="p.slug">
          <RouterLink :to="`/urun/${p.slug}`" class="drop-row">
            <span class="rank">{{ i + 1 }}</span>
            <span class="drop-thumb"><ProductThumb :product="p" :size="44" /></span>
            <span class="drop-info">
              <span class="drop-brand">{{ p.brand }}</span>
              <span class="drop-name">{{ p.name }}</span>
            </span>
            <span class="drop-spark"><PriceSpark :history="p.history" :down="true" :width="104" :height="36" /></span>
            <span class="drop-prices">
              <span class="old">{{ money(p.highestPrice) }}</span>
              <span class="new">{{ money(p.lowestPrice) }}</span>
            </span>
            <span class="drop-pct">%{{ Math.abs(p.priceChange) }} ↓</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

  <!-- NASIL ÇALIŞIR -->
  <section class="section band">
    <div class="container">
      <div class="section-head">
        <div>
          <span class="eyebrow">3 adım</span>
          <h2>Nasıl çalışır?</h2>
        </div>
      </div>
      <div class="steps">
        <div v-for="(s, i) in steps" :key="s.title" class="step">
          <span class="step-num">{{ i + 1 }}</span>
          <div>
            <h3>{{ s.title }}</h3>
            <p>{{ s.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- MARKALAR -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <div>
          <span class="eyebrow">Markalar</span>
          <h2>Popüler mama markaları</h2>
        </div>
      </div>
      <div class="brand-grid">
        <RouterLink v-for="b in brands" :key="b.name" to="/" class="brand-chip">
          <span class="brand-name">{{ b.name }}</span>
          <StarRating :rating="b.rating" :reviews="b.reviews" />
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- FİYAT ALARMI CTA -->
  <section class="section">
    <div class="container">
      <div class="cta">
        <div class="cta-text">
          <span class="eyebrow">Ücretsiz</span>
          <h2>Fiyat düşünce ilk sen haberdar ol</h2>
          <p>Takip ettiğin mama hedeflediğin fiyata inince e-postana haber uçuralım.</p>
        </div>
        <form class="cta-form" @submit.prevent>
          <input type="email" placeholder="E-posta adresin" aria-label="E-posta adresi" />
          <button type="submit" class="btn accent-fill">Alarmı kur</button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ---------- HERO ---------- */
.hero {
  background: var(--bg-soft);
  border-bottom: 1px solid var(--line);
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 56px;
  align-items: center;
  padding: 64px 24px;
}

.hero-copy h1 {
  font-size: clamp(2rem, 3.8vw, 3rem);
  margin: 6px 0 16px;
  line-height: 1.1;
}

.accent {
  color: var(--ink);
  text-decoration: underline;
  text-decoration-thickness: 3px;
  text-underline-offset: 4px;
}

.hero-sub {
  font-size: 1.08rem;
  color: var(--body);
  max-width: 46ch;
  margin: 0 0 26px;
}

.hero-search {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--surface);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  padding: 6px 6px 6px 16px;
  max-width: 540px;
  box-shadow: var(--shadow-sm);
}

.hero-search:focus-within {
  border-color: var(--brand);
  box-shadow: 0 0 0 3px var(--brand-soft);
}

.hero-search svg {
  color: var(--muted);
  flex-shrink: 0;
}

.hero-search input {
  flex: 1;
  border: none;
  outline: none;
  padding: 10px 0;
  font-size: 1rem;
  color: var(--ink);
  background: none;
  min-width: 0;
}

.hero-tries {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  font-size: 0.88rem;
  color: var(--muted);
}

.try {
  font-weight: 500;
  color: var(--body);
  background: var(--surface);
  border: 1px solid var(--line);
  padding: 4px 12px;
  border-radius: 999px;
}

.try:hover {
  border-color: var(--brand);
  color: var(--brand);
}

/* Compare widget — flat, clean */
.compare {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 20px;
}

.compare-head {
  display: flex;
  gap: 14px;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--line);
}

.compare-thumb {
  width: 64px;
  height: 64px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  display: grid;
  place-items: center;
  flex-shrink: 0;
  overflow: hidden;
  padding: 4px;
}

.compare-brand {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--muted);
}

.compare-name {
  font-size: 1.02rem;
  margin: 2px 0 6px;
  line-height: 1.25;
}

.compare-list {
  margin: 14px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.compare-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 11px 13px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
}

.compare-row.best {
  border-color: var(--green);
  background: var(--green-soft);
}

.store-name {
  display: block;
  font-weight: 600;
  color: var(--ink);
  font-size: 0.92rem;
}

.store-cargo {
  display: block;
  font-size: 0.75rem;
  color: var(--muted);
}

.row-price {
  display: flex;
  align-items: center;
  gap: 8px;
}

.best-tag {
  font-size: 0.64rem;
  font-weight: 700;
  color: var(--accent-ink);
  background: var(--accent);
  padding: 3px 7px;
  border-radius: 5px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.pval {
  font-weight: 700;
  font-size: 1rem;
  color: var(--ink);
}

.compare-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
}

.foot-note {
  text-align: right;
}

.foot-note strong {
  display: block;
  color: var(--ink);
  font-size: 0.92rem;
}

.foot-note span {
  font-size: 0.78rem;
  color: var(--muted);
}

/* ---------- VALUE STRIP ---------- */
.value-strip {
  background: var(--surface);
  border-bottom: 1px solid var(--line);
}

.value-inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 18px;
  padding: 18px 24px;
}

.value-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: var(--muted);
}

.value-item svg {
  color: var(--green);
  flex-shrink: 0;
}

.value-item strong {
  color: var(--ink);
  font-weight: 600;
}

/* ---------- CATEGORIES ---------- */
.cat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.cat-tile {
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 20px 18px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.cat-tile:hover {
  border-color: var(--line-strong);
  box-shadow: var(--shadow);
}

.cat-name {
  font-size: 1.02rem;
  font-weight: 600;
  color: var(--ink);
}

.cat-meta {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.8rem;
  color: var(--muted);
}

.pet-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.pet-dot.cat,
.pet-dot.dog,
.pet-dot.both {
  background: var(--accent);
}

/* ---------- BAND / PRODUCTS ---------- */
.band {
  background: var(--bg);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

/* ---------- DROP BOARD ---------- */
.drop-board {
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--surface);
}

.drop-board > div + div .drop-row {
  border-top: 1px solid var(--line);
}

.drop-row {
  display: grid;
  grid-template-columns: 36px 46px 1fr 104px auto auto;
  align-items: center;
  gap: 18px;
  padding: 14px 20px;
  transition: background 0.12s ease;
}

.drop-row:hover {
  background: var(--bg-soft);
}

.rank {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--muted);
}

.drop-thumb {
  display: grid;
  place-items: center;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  width: 46px;
  height: 46px;
  overflow: hidden;
  padding: 3px;
}

.drop-brand {
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--muted);
}

.drop-name {
  font-weight: 600;
  color: var(--ink);
  font-size: 0.95rem;
}

.drop-prices {
  text-align: right;
  white-space: nowrap;
}

.drop-prices .old {
  color: var(--muted);
  text-decoration: line-through;
  font-size: 0.82rem;
  margin-right: 8px;
}

.drop-prices .new {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--ink);
}

.drop-pct {
  font-weight: 700;
  color: var(--accent-ink);
  background: var(--accent);
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 0.82rem;
  white-space: nowrap;
}

/* ---------- HOW IT WORKS ---------- */
.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.step {
  display: flex;
  gap: 14px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 24px 22px;
}

.step-num {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--brand-soft);
  color: var(--brand);
  font-weight: 700;
  font-size: 1.05rem;
  flex-shrink: 0;
}

.step h3 {
  font-size: 1.05rem;
  margin-bottom: 5px;
}

.step p {
  color: var(--muted);
  font-size: 0.9rem;
  margin: 0;
}

/* ---------- BRANDS ---------- */
.brand-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.brand-chip {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 15px 18px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.brand-chip:hover {
  border-color: var(--ink);
  box-shadow: var(--shadow);
}

.brand-name {
  font-weight: 600;
  color: var(--ink);
  font-size: 0.94rem;
}

/* ---------- CTA ---------- */
.cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 36px;
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 40px 44px;
}

.cta-text h2 {
  font-size: clamp(1.4rem, 2.6vw, 1.9rem);
}

.cta-text p {
  margin: 8px 0 0;
  color: var(--muted);
  max-width: 44ch;
}

.cta-form {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

.cta-form input {
  border: 1px solid var(--line-strong);
  background: var(--surface);
  color: var(--ink);
  border-radius: var(--radius);
  outline: none;
  padding: 12px 16px;
  font-size: 1rem;
  min-width: 240px;
}

.cta-form input:focus {
  border-color: var(--brand);
  box-shadow: 0 0 0 3px var(--brand-soft);
}

/* ---------- RESPONSIVE ---------- */
@media (max-width: 980px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .compare {
    max-width: 480px;
  }
  .cat-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .brand-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .steps {
    grid-template-columns: 1fr;
  }
  .drop-row {
    grid-template-columns: 28px 46px 1fr auto auto;
  }
  .drop-spark {
    display: none;
  }
}

@media (max-width: 700px) {
  .cta {
    flex-direction: column;
    align-items: flex-start;
    padding: 28px 24px;
  }
  .cta-form {
    width: 100%;
  }
  .cta-form input {
    flex: 1;
    min-width: 0;
  }
}

@media (max-width: 560px) {
  .cat-grid {
    grid-template-columns: 1fr 1fr;
  }
  .brand-grid {
    grid-template-columns: 1fr 1fr;
  }
  .hero-search {
    flex-wrap: wrap;
  }
  .drop-row {
    grid-template-columns: 24px 1fr auto;
    gap: 12px;
  }
  .drop-thumb,
  .drop-prices .old {
    display: none;
  }
}
</style>
