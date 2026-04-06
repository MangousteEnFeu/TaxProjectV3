<template>
  <nav class="navbar navbar-expand-md bg-white border-bottom sticky-top shadow-sm">
    <div class="container">
      <!-- Logo -->
      <router-link to="/" class="navbar-brand d-flex align-items-center gap-2 text-decoration-none">
        <div class="navbar-brand-logo">
          <svg xmlns="http://www.w3.org/2000/svg" class="text-white" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="22"/><line x1="10" y1="14" x2="10" y2="22"/>
            <line x1="14" y1="10" x2="14" y2="22"/><line x1="18" y1="6" x2="18" y2="22"/><path d="M2 6l6.5-4L12 5l4-3 6 4"/>
          </svg>
        </div>
        <div class="d-flex flex-column lh-1">
          <span class="fw-bold text-slate" style="font-size:1.1rem">VaudTax</span>
          <span class="text-gold fw-bold" style="font-size:.6rem;letter-spacing:.15em;text-transform:uppercase">{{ t('brand.motto') }}</span>
        </div>
      </router-link>

      <!-- Mobile toggler -->
      <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Nav links -->
      <div class="collapse navbar-collapse" id="navbarMain">
        <ul class="navbar-nav me-auto ms-md-4 mb-2 mb-md-0 gap-md-1">
          <li class="nav-item">
            <router-link to="/" :class="navLinkClass('/')">{{ t('nav.home') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/pricing" :class="navLinkClass('/pricing')">{{ t('nav.pricing') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" :class="navLinkClass('/about')">{{ t('nav.about') }}</router-link>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <router-link to="/dashboard" :class="navLinkClass('/dashboard')">Dashboard</router-link>
          </li>
        </ul>

        <div class="d-flex align-items-center gap-3 flex-wrap">
          <!-- Language selector -->
          <div class="d-flex align-items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-muted-brand">
              <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <select v-model="currentLanguage" @change="changeLanguage" class="form-select form-select-sm border-0 bg-transparent text-muted-brand p-0" style="width:auto;cursor:pointer">
              <option value="fr">FR</option>
              <option value="de">DE</option>
              <option value="it">IT</option>
              <option value="en">EN</option>
              <option value="pt">PT</option>
              <option value="rm">RM</option>
              <option value="sq">SQ</option>
              <option value="hr">HR</option>
            </select>
          </div>

          <template v-if="isAuthenticated">
            <span class="badge bg-light text-muted-brand border border-subtle d-flex align-items-center gap-1 fw-normal">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              <span class="text-truncate" style="max-width:100px">{{ authStore.user?.username }}</span>
            </span>
            <button @click="handleLogout" class="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1">
              {{ t('nav.logout') }}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </button>
          </template>
          <template v-else>
            <router-link to="/login" class="btn btn-sm btn-outline-secondary">{{ t('nav.login') }}</router-link>
            <router-link to="/register" class="btn btn-sm btn-brand">{{ t('nav.start') }}</router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useLanguageStore } from '../stores/language'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const languageStore = useLanguageStore()

const currentLanguage = ref(languageStore.language)
const isAuthenticated = computed(() => authStore.isAuthenticated)
const t = (key) => languageStore.t(key)

const navLinkClass = (path) => {
  return `nav-link ${route.path === path ? 'active-brand' : 'text-muted-brand'}`
}

const changeLanguage = () => {
  languageStore.setLanguage(currentLanguage.value)
}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>
