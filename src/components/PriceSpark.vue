<script setup>
import { computed } from 'vue'

const props = defineProps({
  history: { type: Array, required: true },
  width: { type: Number, default: 120 },
  height: { type: Number, default: 40 },
  down: { type: Boolean, default: true },
  color: { type: String, default: '' },
})

const pad = 3

const geom = computed(() => {
  const h = props.history
  const min = Math.min(...h)
  const max = Math.max(...h)
  const span = max - min || 1
  const stepX = (props.width - pad * 2) / (h.length - 1)

  const pts = h.map((v, i) => {
    const x = pad + i * stepX
    const y = pad + (1 - (v - min) / span) * (props.height - pad * 2)
    return [x, y]
  })

  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)} ${props.height} L${pts[0][0].toFixed(1)} ${props.height} Z`
  const end = pts[pts.length - 1]
  return { line, area, end }
})

const stroke = computed(() => props.color || (props.down ? 'var(--green)' : 'var(--brand)'))
const uid = Math.random().toString(36).slice(2, 8)
</script>

<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="`0 0 ${width} ${height}`"
    fill="none"
    aria-hidden="true"
    class="spark"
  >
    <defs>
      <linearGradient :id="`g-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" :stop-color="stroke" stop-opacity="0.22" />
        <stop offset="1" :stop-color="stroke" stop-opacity="0" />
      </linearGradient>
    </defs>
    <path :d="geom.area" :fill="`url(#g-${uid})`" />
    <path :d="geom.line" :stroke="stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <circle :cx="geom.end[0]" :cy="geom.end[1]" r="3" :fill="stroke" />
  </svg>
</template>

<style scoped>
.spark {
  display: block;
}
</style>
