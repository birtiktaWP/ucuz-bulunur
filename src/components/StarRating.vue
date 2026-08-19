<script setup>
import { computed } from 'vue'

const props = defineProps({
  rating: { type: Number, required: true },
  reviews: { type: Number, default: null },
})

// 0-5 arası puanı %'ye çevirip dolu yıldızları bir maske ile gösteriyoruz
const fillWidth = computed(() => `${(props.rating / 5) * 100}%`)
</script>

<template>
  <span class="rating" :aria-label="`5 üzerinden ${rating} puan`">
    <span class="stars">
      <span class="stars-bg">★★★★★</span>
      <span class="stars-fg" :style="{ width: fillWidth }">★★★★★</span>
    </span>
    <span class="rating-num">{{ rating.toFixed(1) }}</span>
    <span v-if="reviews != null" class="rating-count">({{ reviews.toLocaleString('tr-TR') }})</span>
  </span>
</template>

<style scoped>
.rating {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
}

.stars {
  position: relative;
  display: inline-block;
  font-size: 0.95rem;
  line-height: 1;
}

.stars-bg {
  color: #dcdce0;
}

.stars-fg {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  white-space: nowrap;
  color: var(--star);
}

.rating-num {
  font-weight: 700;
  color: var(--ink);
}

.rating-count {
  color: var(--muted);
}
</style>
