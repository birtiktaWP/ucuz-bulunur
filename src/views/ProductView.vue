<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getProductBySlug } from '@/data/catalog'
import ProductThumb from '@/components/ProductThumb.vue'

const route = useRoute()
const product = computed(() => getProductBySlug(route.params.slug))
</script>

<template>
  <section class="section">
    <div class="container">
      <RouterLink to="/" class="link-more">← Ana sayfa</RouterLink>

      <div v-if="product" class="ph">
        <div class="ph-media">
          <ProductThumb :product="product" :size="200" />
        </div>
        <h1>{{ product.name }}</h1>
        <p class="ph-note">
          Ürün detay sayfası (fiyat karşılaştırma tablosu, fiyat geçmişi grafiği,
          yorumlar) bir sonraki adımda hazırlanacak.
        </p>
      </div>

      <div v-else class="ph">
        <span class="ph-thumb">🐾</span>
        <h1>Ürün bulunamadı</h1>
        <p class="ph-note">Aradığın ürün mevcut değil.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ph {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 48px 0;
}
.ph-media {
  width: 240px;
  height: 240px;
  display: grid;
  place-items: center;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 16px;
  overflow: hidden;
}
.ph-thumb {
  font-size: 4rem;
}
.ph h1 {
  margin: 16px 0 12px;
  font-size: 1.8rem;
}
.ph-note {
  color: var(--muted);
  max-width: 520px;
  margin: 0 auto;
}
</style>
