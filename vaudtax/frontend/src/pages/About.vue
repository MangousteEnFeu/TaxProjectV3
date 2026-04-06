<template>
  <div class="min-vh-100 bg-page">
    <Navbar />

    <main class="container py-5">
      <div class="mx-auto" style="max-width:900px">
        <!-- Header -->
        <div class="mb-5">
          <h1 class="fw-bold text-slate mb-2">{{ t('about.title') }}</h1>
          <p class="fs-5 text-muted-brand">{{ t('about.subtitle') }}</p>
        </div>

        <div class="row g-5">
          <!-- Left column -->
          <div class="col-md-6 d-flex flex-column gap-4">
            <!-- Mission -->
            <div class="card card-brand shadow-sm h-auto">
              <div class="card-body p-4">
                <div class="bg-brand-soft rounded-3 d-inline-flex align-items-center justify-content-center text-brand mb-4 p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h4 class="fw-bold text-slate mb-3">{{ t('about.mission_title') }}</h4>
                <p class="text-muted-brand lh-lg mb-0">{{ t('about.mission_desc') }}</p>
              </div>
            </div>

            <!-- Privacy -->
            <div class="card card-brand shadow-sm">
              <div class="card-body p-4">
                <div class="bg-gold-soft rounded-3 d-inline-flex align-items-center justify-content-center text-gold-dark mb-4 p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <h4 class="fw-bold text-slate mb-3">{{ t('about.privacy_title') }}</h4>
                <p class="text-muted-brand lh-lg mb-0">{{ t('about.privacy_desc') }}</p>
              </div>
            </div>
          </div>

          <!-- Right column -->
          <div class="col-md-6 d-flex flex-column gap-4">
            <!-- Green decorative block -->
            <div class="bg-brand rounded-4 p-5 text-white position-relative overflow-hidden d-flex align-items-end" style="min-height:220px">
              <span class="fw-bold fs-3 fst-italic position-relative" style="z-index:1">Liberté et Patrie</span>
              <div class="position-absolute top-0 end-0 bg-white rounded-circle opacity-10" style="width:160px;height:160px;transform:translate(30%,-30%)"></div>
              <div class="position-absolute bottom-0 start-0 rounded-circle opacity-25" style="width:120px;height:120px;background:var(--brand-gold);transform:translate(-30%,30%)"></div>
            </div>

            <!-- Contact -->
            <div class="card card-brand shadow-sm">
              <div class="card-body p-4">
                <div class="bg-light rounded-3 d-inline-flex align-items-center justify-content-center text-slate mb-4 p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <h4 class="fw-bold text-slate mb-3">{{ t('about.contact_title') }}</h4>
                <p class="text-muted-brand lh-lg mb-3">{{ t('about.contact_desc') }}</p>
                <div class="d-flex align-items-center gap-2 text-brand small fw-bold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  Lausanne, Vaud, Suisse
                </div>
              </div>
            </div>
          </div>
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
