<template>
  <div class="min-vh-100 bg-page pb-5">
    <Navbar />

    <main class="container py-5">
      <div class="d-flex justify-content-between align-items-center mb-5">
        <h1 class="fw-bold text-slate mb-0">{{ t('dashboard.title') }}</h1>
        <router-link to="/declarations/new" class="btn btn-brand d-flex align-items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
          {{ t('dashboard.new_btn') }}
        </router-link>
      </div>

      <!-- Empty state -->
      <div class="card card-brand border-dashed text-center p-5">
        <div class="d-flex flex-column align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" class="text-light-brand mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <h5 class="fw-semibold text-slate">{{ t('dashboard.empty_title') }}</h5>
          <p class="text-muted-brand small mb-3">{{ t('dashboard.empty_desc') }}</p>
          <router-link to="/declarations/new" class="text-brand fw-bold small text-decoration-none">
            {{ t('dashboard.start_now') }}
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import { useLanguageStore } from '../stores/language'

const languageStore = useLanguageStore()
const t = (key) => languageStore.t(key)
</script>

<style scoped>
.border-dashed { border: 2px dashed var(--brand-border) !important; }
</style>
