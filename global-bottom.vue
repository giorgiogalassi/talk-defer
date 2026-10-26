<template>
  <footer v-if="visible" class="talk-footer">ggalassi.dev</footer>
</template>

<script setup>
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const { $slidev } = useSlideContext()

// Hide on the title slide and on any slide with `footer: false` in its frontmatter
// (the Thank-you slide, which already shows the same information; backup slides follow it).
// Global layers must read nav state: $page is always 1 here during export.
const visible = computed(() => {
  const nav = $slidev?.nav
  const page = nav?.currentPage ?? 0
  const frontmatter = nav?.currentSlideRoute?.meta?.slide?.frontmatter ?? {}
  return page !== 1 && frontmatter.footer !== false
})
</script>

<style scoped>
.talk-footer {
  position: absolute;
  right: 1.1rem;
  bottom: 0.75rem;
  z-index: 20;
  font-size: 0.7rem;
  letter-spacing: 0.02em;
  color: var(--footer-text);
  user-select: none;
  pointer-events: none;
}
</style>
