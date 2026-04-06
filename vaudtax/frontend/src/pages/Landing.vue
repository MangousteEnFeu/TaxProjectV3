<template>
  <div class="d-flex flex-column min-vh-100 bg-white">
    <Navbar />

    <main class="flex-grow-1 d-flex flex-column">
      <!-- Hero -->
      <div class="container py-5">
        <div class="row align-items-center g-5">
          <!-- Left -->
          <div class="col-lg-6">
            <span class="badge bg-gold-soft text-gold-dark border border-warning-subtle mb-3 px-3 py-2" style="letter-spacing:.15em;font-size:.7rem;text-transform:uppercase;font-weight:700">
              {{ t('landing.hero_badge') }}
            </span>
            <h1 class="display-4 fw-bold text-slate lh-sm mb-4">
              {{ t('landing.title_start') }}<br>
              <span class="text-brand">{{ t('landing.title_end') }}</span>
            </h1>
            <p class="fs-5 text-muted-brand mb-4">{{ t('landing.subtitle') }}</p>
            <div class="d-flex gap-3 mb-4">
              <router-link to="/register" class="btn btn-brand btn-lg d-inline-flex align-items-center gap-2 px-4">
                {{ t('landing.cta_create') }}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </router-link>
            </div>
            <div class="d-flex gap-4 text-muted-brand" style="font-size:.875rem">
              <div class="d-flex align-items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" class="text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
                </svg>
                {{ t('landing.secure') }}
              </div>
              <div class="d-flex align-items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" class="text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
                {{ t('landing.fast') }}
              </div>
              <div class="d-flex align-items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" class="text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
                {{ t('landing.compatible') }}
              </div>
            </div>
          </div>

          <!-- Right – decorative card -->
          <div class="col-lg-6 d-flex justify-content-center">
            <div class="card card-brand shadow p-4" style="max-width:400px;width:100%;transform:rotate(2deg);transition:transform .4s" onmouseenter="this.style.transform='rotate(0deg)'" onmouseleave="this.style.transform='rotate(2deg)'">
              <div class="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                <div class="d-flex align-items-center gap-3">
                  <div class="bg-brand rounded-2 d-flex align-items-center justify-content-center text-white fw-bold" style="width:40px;height:40px">VD</div>
                  <div>
                    <div class="bg-secondary bg-opacity-25 rounded" style="height:10px;width:80px;margin-bottom:4px"></div>
                    <div class="bg-secondary bg-opacity-10 rounded" style="height:8px;width:55px"></div>
                  </div>
                </div>
                <span class="text-brand fw-bold">VaudTax</span>
              </div>
              <div class="d-flex flex-column gap-2">
                <div class="bg-page rounded border border-subtle d-flex align-items-center px-3" style="height:48px">
                  <div class="bg-secondary bg-opacity-25 rounded w-50" style="height:12px"></div>
                </div>
                <div class="bg-page rounded border border-subtle d-flex align-items-center justify-content-between px-3" style="height:48px">
                  <div class="bg-secondary bg-opacity-25 rounded w-25" style="height:12px"></div>
                  <div class="bg-gold-soft rounded" style="height:12px;width:25%"></div>
                </div>
              </div>
              <div class="d-flex justify-content-end mt-3">
                <div class="bg-brand rounded" style="height:36px;width:33%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom strip -->
      <div class="bg-brand mt-auto py-4">
        <div class="container d-flex align-items-center justify-content-between text-white">
          <span class="fst-italic fs-4 opacity-25">{{ t('brand.motto') }}</span>
          <small class="opacity-75">{{ t('landing.footer') }}</small>
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
