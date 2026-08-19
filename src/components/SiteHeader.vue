<script setup>
import { ref } from 'vue'
import { categories } from '@/data/catalog'

const query = ref('')
const mobileOpen = ref(false)

const topCategories = categories.slice(0, 6)
</script>

<template>
  <header class="site-header">
    <div class="topbar">
      <div class="container topbar-inner">
        <span>180+ mağaza Türkiye geneli taranıyor</span>
        <span class="topbar-alt">Bugün 2.140 fiyat güncellendi</span>
      </div>
    </div>

    <div class="container header-inner">
      <RouterLink to="/" class="logo" aria-label="Ucuz Bulunur ana sayfa">
        <span class="logo-text">ucuz<span class="logo-accent">bulunur</span></span>
      </RouterLink>

      <form class="search" role="search" @submit.prevent>
        <svg class="search-ic" width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" />
          <path d="m20 20-3.2-3.2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
        <input
          v-model="query"
          type="search"
          placeholder="Mama, marka veya ürün ara…"
          aria-label="Ürün ara"
        />
        <button type="submit" class="btn accent-fill search-btn">Ara</button>
      </form>

      <nav class="header-actions">
        <RouterLink to="/" class="nav-link">Fırsatlar</RouterLink>
        <RouterLink to="/" class="nav-link">Fiyat alarmı</RouterLink>
        <button class="btn btn-ghost btn-sm">Giriş yap</button>
      </nav>

      <button
        class="burger"
        :aria-expanded="mobileOpen"
        aria-label="Menüyü aç/kapat"
        @click="mobileOpen = !mobileOpen"
      >
        <span></span><span></span><span></span>
      </button>
    </div>

    <div class="subnav">
      <div class="container subnav-inner">
        <RouterLink v-for="c in topCategories" :key="c.slug" to="/" class="subnav-link">
          {{ c.name }}
        </RouterLink>
        <RouterLink to="/" class="subnav-link subnav-all">Tüm kategoriler</RouterLink>
      </div>
    </div>

    <div v-if="mobileOpen" class="mobile-menu">
      <RouterLink to="/" class="nav-link" @click="mobileOpen = false">Fırsatlar</RouterLink>
      <RouterLink to="/" class="nav-link" @click="mobileOpen = false">Fiyat alarmı</RouterLink>
      <RouterLink
        v-for="c in topCategories"
        :key="c.slug"
        to="/"
        class="nav-link"
        @click="mobileOpen = false"
      >
        {{ c.name }}
      </RouterLink>
      <button class="btn accent-fill">Giriş yap</button>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--surface);
  border-bottom: 1px solid var(--line);
}

.topbar {
  background: var(--bg-soft);
  border-bottom: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.78rem;
}

.topbar-inner {
  display: flex;
  justify-content: space-between;
  height: 34px;
  align-items: center;
}

.topbar-alt {
  color: var(--green);
  font-weight: 600;
}

.header-inner {
  display: flex;
  align-items: center;
  gap: 24px;
  height: 72px;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: var(--ink);
  letter-spacing: -1px;
  flex-shrink: 0;
}

.logo-text {
  font-weight: 300;
}

.logo-accent {
  color: var(--ink);
  font-weight: 800;
}

.search {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--surface);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  padding: 5px 5px 5px 14px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.search:focus-within {
  border-color: var(--brand);
  box-shadow: 0 0 0 3px var(--brand-soft);
}

.search-ic {
  color: var(--muted);
  flex-shrink: 0;
}

.search input {
  flex: 1;
  border: none;
  background: none;
  outline: none;
  font-size: 0.98rem;
  color: var(--ink);
  min-width: 0;
  padding: 8px 0;
}

.search-btn {
  padding: 9px 20px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
}

.nav-link {
  font-weight: 600;
  color: var(--body);
  font-size: 0.94rem;
}

.nav-link:hover {
  color: var(--brand);
}

.btn-sm {
  padding: 9px 18px;
  font-size: 0.9rem;
}

.subnav {
  border-top: 1px solid var(--line);
  background: var(--surface);
}

.subnav-inner {
  display: flex;
  align-items: center;
  gap: 28px;
  height: 46px;
  overflow-x: auto;
}

.subnav-link {
  font-size: 0.89rem;
  font-weight: 500;
  color: var(--body);
  white-space: nowrap;
}

.subnav-link:hover {
  color: var(--brand);
}

.subnav-all {
  color: var(--brand);
  font-weight: 600;
}

.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 8px;
}

.burger span {
  width: 22px;
  height: 2px;
  background: var(--ink);
  border-radius: 2px;
}

.mobile-menu {
  display: none;
}

@media (max-width: 900px) {
  .header-actions {
    display: none;
  }
  .burger {
    display: flex;
  }
  .search-btn {
    display: none;
  }
}

@media (max-width: 640px) {
  .topbar-alt {
    display: none;
  }
  .header-inner {
    flex-wrap: wrap;
    height: auto;
    padding: 12px 0;
    gap: 12px;
  }
  .search {
    order: 3;
    flex-basis: 100%;
  }
  .mobile-menu {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 18px 24px 24px;
    border-top: 1px solid var(--line);
  }
}
</style>
