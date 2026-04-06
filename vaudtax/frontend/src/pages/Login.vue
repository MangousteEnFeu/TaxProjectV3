<template>
  <div class="min-vh-100 d-flex align-items-center justify-content-center bg-page position-relative overflow-hidden">
    <!-- Background halves -->
    <div class="position-absolute top-0 start-0 w-100 bg-white" style="height:50%"></div>
    <div class="position-absolute bottom-0 start-0 w-100 bg-brand" style="height:50%"></div>

    <div class="card card-brand shadow-lg p-4 p-md-5 position-relative z-1" style="width:100%;max-width:450px">
      <div class="text-center mb-4">
        <router-link to="/" class="navbar-brand-logo d-inline-flex mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="text-white" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="22"/>
            <line x1="10" y1="14" x2="10" y2="22"/><line x1="14" y1="10" x2="14" y2="22"/>
            <line x1="18" y1="6" x2="18" y2="22"/><path d="M2 6l6.5-4L12 5l4-3 6 4"/>
          </svg>
        </router-link>
        <h2 class="fw-bold text-slate">{{ t('auth.login_title') }}</h2>
        <p class="text-muted-brand">{{ t('auth.subtitle') }}</p>
      </div>

      <div v-if="error" class="alert alert-danger d-flex align-items-center gap-2 py-2 px-3" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="flex-shrink-0">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <small>{{ error }}</small>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label class="form-label">{{ t('auth.email') }}</label>
          <input v-model="username" type="text" required class="form-control" placeholder="johndoe" />
        </div>
        <div class="mb-4">
          <label class="form-label">{{ t('auth.password') }}</label>
          <input v-model="password" type="password" required class="form-control" placeholder="••••••••" />
        </div>
        <button type="submit" :disabled="loading" class="btn btn-brand w-100 py-2">
          {{ loading ? t('auth.loading') : t('auth.submit_login') }}
        </button>
      </form>

      <p class="mt-4 text-center text-muted-brand" style="font-size:.875rem">
        {{ t('auth.no_account') }}
        <router-link to="/register" class="text-brand fw-bold text-decoration-none">{{ t('auth.link_register') }}</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useLanguageStore } from '../stores/language'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const languageStore = useLanguageStore()
const router = useRouter()
const t = (key) => languageStore.t(key)

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleSubmit = async () => {
  error.value = ''
  loading.value = true
  try {
    await authStore.login({ username: username.value, password: password.value })
    router.push('/dashboard')
  } catch (err) {
    error.value = err.message || 'Une erreur est survenue'
  } finally {
    loading.value = false
  }
}
</script>
