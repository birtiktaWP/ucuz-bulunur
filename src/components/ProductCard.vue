<script setup>
import { computed } from 'vue'
import StarRating from './StarRating.vue'
import ProductThumb from './ProductThumb.vue'
import PriceSpark from './PriceSpark.vue'

const props = defineProps({
  product: { type: Object, required: true },
})

const p = props.product

const priceLabel = computed(() =>
  p.lowestPrice.toLocaleString('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0,
  }),
)

const isDrop = computed(() => p.priceChange < 0)
</script>

<template>
  <RouterLink :to="`/urun/${p.slug}`" class="card">
    <div class="media">
      <span v-if="isDrop" class="drop">%{{ Math.abs(p.priceChange) }} indirim</span>
      <ProductThumb :product="p" :size="150" />
    </div>

    <div class="body">
      <span class="brand">{{ p.brand }}</span>
      <h3 class="name">{{ p.name }}</h3>
      <StarRating :rating="p.rating" :reviews="p.reviews" />

      <div class="foot">
        <div class="price-col">
          <span class="from">En düşük fiyat</span>
          <span class="price">{{ priceLabel }}</span>
          <span class="stores">{{ p.storeCount }} mağazada</span>
        </div>
        <div class="spark-col">
          <PriceSpark :history="p.history" :down="isDrop" :width="86" :height="38" />
          <span class="spark-label" :class="{ up: !isDrop }">
            {{ isDrop ? '30 günde düştü' : 'yükselişte' }}
          </span>
        </div>
      </div>

      <span class="cta">Fiyatları karşılaştır</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  overflow: hidden;
  height: 100%;
  transition: box-shadow 0.16s ease, border-color 0.16s ease, transform 0.16s ease;
}

.card:hover {
  border-color: var(--line-strong);
  box-shadow: var(--shadow-md);
  transform: translateY(-3px);
}

.media {
  position: relative;
  background: #fff;
  aspect-ratio: 16 / 11;
  display: grid;
  place-items: center;
  padding: 14px;
  border-bottom: 1px solid var(--line);
}

.drop {
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--accent-ink);
  background: var(--accent);
  padding: 4px 10px;
  border-radius: 4px;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 16px 18px;
  flex: 1;
}

.brand {
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--muted);
}

.name {
  font-size: 0.96rem;
  font-weight: 600;
  color: var(--ink);
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.7em;
}

.foot {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
  margin-top: 6px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
}

.price-col {
  display: flex;
  flex-direction: column;
}

.from {
  font-size: 0.72rem;
  color: var(--muted);
}

.price {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.stores {
  font-size: 0.75rem;
  color: var(--muted);
}

.spark-col {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 3px;
}

.spark-label {
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--green);
}

.spark-label.up {
  color: var(--brand);
}

.cta {
  margin-top: 14px;
  display: block;
  text-align: center;
  padding: 10px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--ink);
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.card:hover .cta {
  background: var(--brand);
  border-color: var(--brand);
  color: #fff;
}
</style>
