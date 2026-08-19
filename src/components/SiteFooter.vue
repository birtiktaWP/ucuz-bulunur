<script setup>
const year = new Date().getFullYear()

const columns = [
  {
    title: 'Kategoriler',
    links: ['Kedi Kuru Mama', 'Kedi Yaş Mama', 'Köpek Kuru Mama', 'Tahılsız Mama', 'Yavru Maması'],
  },
  {
    title: 'Ucuz Bulunur',
    links: ['Hakkımızda', 'Nasıl çalışır?', 'Kariyer', 'İletişim', 'Basın'],
  },
  {
    title: 'Yardım',
    links: ['Sık sorulan sorular', 'Mağaza ekle', 'Fiyat alarmı', 'Gizlilik', 'Kullanım şartları'],
  },
]
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <RouterLink to="/" class="logo">
          <span class="logo-text">ucuz<span class="logo-accent">bulunur</span></span>
        </RouterLink>
        <p>
          Kedi ve köpek mamalarını yüzlerce mağazada karşılaştır, fiyat geçmişini
          takip et, doğru zamanda en ucuza kapat.
        </p>
        <div class="socials">
          <a href="#" aria-label="Instagram">IG</a>
          <a href="#" aria-label="X">X</a>
          <a href="#" aria-label="YouTube">YT</a>
        </div>
      </div>

      <div v-for="col in columns" :key="col.title" class="footer-col">
        <h4>{{ col.title }}</h4>
        <ul>
          <li v-for="link in col.links" :key="link">
            <a href="#">{{ link }}</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <span>© {{ year }} Ucuz Bulunur — ucuzbulunur.com</span>
        <span>Türkiye'nin mama fiyat karşılaştırma platformu</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--ink);
  color: #9aa1ab;
  margin-top: 20px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.6fr repeat(3, 1fr);
  gap: 44px;
  padding: 60px 22px 44px;
}

.footer-brand .logo {
  display: inline-flex;
  align-items: center;
  font-size: 1.5rem;
  color: #fff;
  letter-spacing: -1px;
}

.footer-brand .logo-text {
  font-weight: 300;
}

.logo-accent {
  color: #fff;
  font-weight: 800;
}

.footer-brand p {
  margin: 18px 0 22px;
  max-width: 330px;
  font-size: 0.92rem;
  line-height: 1.65;
}

.socials {
  display: flex;
  gap: 10px;
}

.socials a {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 9px;
  font-size: 0.8rem;
  font-weight: 700;
  color: #fff;
  transition: background 0.15s ease;
}

.socials a:hover {
  background: var(--brand);
  border-color: var(--brand);
  color: #fff;
}

.footer-col h4 {
  color: #fff;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 18px;
}

.footer-col li {
  margin-bottom: 11px;
}

.footer-col a {
  color: #9aa1ab;
  font-size: 0.92rem;
}

.footer-col a:hover {
  color: #fff;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-bottom-inner {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 20px 22px;
  font-size: 0.85rem;
  color: #6b727c;
}

@media (max-width: 860px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 34px;
  }
}

@media (max-width: 560px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
  .footer-bottom-inner {
    flex-direction: column;
    text-align: center;
  }
}
</style>
