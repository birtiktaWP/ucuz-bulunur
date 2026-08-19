<script setup>
import { ref, watch } from 'vue'
import MamaBag from './MamaBag.vue'

const props = defineProps({
  product: { type: Object, required: true },
  size: { type: [Number, String], default: 128 },
})

const failed = ref(false)

// Ürün değişirse hata bayrağını sıfırla
watch(
  () => props.product?.slug,
  () => {
    failed.value = false
  },
)
</script>

<template>
  <img
    v-if="product.image && !failed"
    :src="product.image"
    :alt="product.name"
    class="thumb"
    loading="lazy"
    decoding="async"
    :style="{ width: `${size}px`, height: `${size}px` }"
    @error="failed = true"
  />
  <MamaBag v-else :brand="product.brand" :pet="product.pet" :size="size" />
</template>

<style scoped>
.thumb {
  object-fit: contain;
  mix-blend-mode: multiply;
}
</style>
