<script setup>
import { ref } from 'vue'

const open = ref(false)

// "Yakında" gelecek örnek ibareler / hızlı sorular
const suggestions = [
  'En ucuz kedi maması hangisi?',
  'Royal Canin fiyatı düştü mü?',
  'Bütçeme uygun köpek maması öner',
  'Fiyat alarmı nasıl kurulur?',
]

function toggle() {
  open.value = !open.value
}
</script>

<template>
  <div class="assistant" :class="{ open }">
    <!-- Açılan panel — yukarı doğru büyür -->
    <div class="panel" role="dialog" aria-label="UCUZCU Yapay Zeka Asistanı">
      <div class="panel-head">
        <div class="panel-title">
          <span class="avatar" aria-hidden="true">✦</span>
          <div>
            <strong>UCUZCU</strong>
            <span class="sub">Yapay Zeka Asistanı</span>
          </div>
        </div>
        <span class="soon">Yakında</span>
      </div>

      <div class="panel-body">
        <div class="bubble">
          Merhaba! 👋 Sana en uygun ve en ucuz mamayı bulmakta yardımcı olacağım.
          Bu özellik <strong>çok yakında</strong> aktif olacak.
        </div>

        <span class="chips-label">Yakında sorabileceklerin</span>
        <div class="chips">
          <span v-for="s in suggestions" :key="s" class="chip">{{ s }}</span>
        </div>
      </div>

      <div class="panel-foot">
        <input type="text" placeholder="Yakında hizmetinizde…" disabled />
        <button class="send accent-fill" disabled aria-label="Gönder">→</button>
      </div>
    </div>

    <!-- Alt bar / tetikleyici -->
    <button class="bar accent-fill" @click="toggle" :aria-expanded="open">
      <span class="bar-icon" aria-hidden="true">✦</span>
      <span class="bar-text">UCUZCU · Yapay Zeka Asistanı</span>
      <span class="bar-caret" :class="{ up: open }" aria-hidden="true">⌃</span>
    </button>
  </div>
</template>

<style scoped>
.assistant {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

/* ---- Bar ---- */
.bar {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.92rem;
  letter-spacing: -0.01em;
  box-shadow: var(--shadow-md);
}

.bar-icon {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.12);
  font-size: 0.8rem;
}

.bar-caret {
  font-size: 1rem;
  line-height: 1;
  transition: transform 0.22s ease;
}

.bar-caret.up {
  transform: rotate(180deg);
}

/* ---- Panel (yukarı doğru büyür) ---- */
.panel {
  width: 340px;
  max-width: calc(100vw - 40px);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transform-origin: bottom right;
  transform: translateY(16px) scale(0.94);
  opacity: 0;
  visibility: hidden;
  transition: transform 0.24s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease,
    visibility 0.24s;
}

.assistant.open .panel {
  transform: translateY(0) scale(1);
  opacity: 1;
  visibility: visible;
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px;
  background: var(--accent);
  color: var(--accent-ink);
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 11px;
}

.avatar {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.14);
  font-size: 1rem;
}

.panel-title strong {
  display: block;
  font-size: 1rem;
  letter-spacing: -0.02em;
}

.panel-title .sub {
  font-size: 0.76rem;
  opacity: 0.7;
}

.soon {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  background: var(--ink);
  color: #fff;
  padding: 4px 9px;
  border-radius: 999px;
}

.panel-body {
  padding: 16px;
}

.bubble {
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 12px 14px;
  font-size: 0.9rem;
  color: var(--body);
  line-height: 1.5;
}

.bubble strong {
  color: var(--ink);
}

.chips-label {
  display: block;
  margin: 16px 0 9px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  font-size: 0.82rem;
  color: var(--body);
  background: var(--surface);
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  padding: 7px 13px;
}

.panel-foot {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px 16px;
  border-top: 1px solid var(--line);
}

.panel-foot input {
  flex: 1;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  padding: 10px 13px;
  font-size: 0.9rem;
  color: var(--ink);
  background: var(--bg-soft);
  outline: none;
  min-width: 0;
}

.send {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius);
  font-size: 1.1rem;
  font-weight: 700;
  flex-shrink: 0;
}

.send:disabled,
.panel-foot input:disabled {
  cursor: not-allowed;
  opacity: 0.75;
}

@media (max-width: 480px) {
  .assistant {
    right: 14px;
    bottom: 14px;
  }
  .bar-text {
    display: none;
  }
  .bar {
    padding: 12px;
  }
}
</style>
