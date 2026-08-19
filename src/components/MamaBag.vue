<script setup>
import { computed } from 'vue'

const props = defineProps({
  brand: { type: String, default: '' },
  pet: { type: String, default: 'cat' },
  size: { type: [Number, String], default: 200 },
})

const initials = computed(() =>
  props.brand
    .replace(/[^A-Za-zÇĞİÖŞÜçğıöşü ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join(''),
)
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    class="bag"
  >
    <!-- paket gövdesi (monokrom) -->
    <path
      d="M54 44h92a5 5 0 0 1 5 5.3l-5.4 108A11 11 0 0 1 134.6 168H65.4a11 11 0 0 1-11-10.7L49 49.3A5 5 0 0 1 54 44z"
      fill="#1a1a1a"
    />
    <!-- yumuşak kenar hacmi -->
    <path
      d="M128 44h18a5 5 0 0 1 5 5.3l-5.4 108A11 11 0 0 1 134.6 168h-18a11 11 0 0 0 11-10.7L133 49.3a5 5 0 0 0-5-5.3z"
      fill="#000"
      opacity="0.18"
    />
    <!-- üst kırım -->
    <rect x="60" y="36" width="80" height="12" rx="2.5" fill="#1a1a1a" />
    <path d="M49 49h102l-.5 10H49.5z" fill="#000" opacity="0.22" />

    <!-- etiket -->
    <rect x="70" y="78" width="60" height="66" rx="6" fill="#ffffff" opacity="0.96" />
    <rect x="70" y="78" width="60" height="20" rx="6" fill="#000" opacity="0.08" />

    <!-- pati -->
    <g fill="#1a1a1a" transform="translate(100 112)">
      <ellipse cx="0" cy="3" rx="9.5" ry="8" />
      <circle cx="-10.5" cy="-7" r="3.6" />
      <circle cx="-3.5" cy="-11" r="3.6" />
      <circle cx="4" cy="-11" r="3.6" />
      <circle cx="10.5" cy="-7" r="3.6" />
    </g>

    <text
      x="100"
      y="138"
      text-anchor="middle"
      font-family="'DM Sans Variable', sans-serif"
      font-weight="700"
      font-size="12"
      letter-spacing="0.5"
      fill="#1a1a1a"
    >{{ initials }}</text>
  </svg>
</template>

<style scoped>
.bag {
  display: block;
}
</style>
