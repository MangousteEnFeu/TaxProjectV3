<template>
  <div class="min-vh-100 bg-page">
    <Navbar />

    <main class="container py-5">
      <div v-if="loading" class="d-flex align-items-center justify-content-center py-5">
        <div class="spinner-border spinner-brand me-3" role="status"></div>
        <span class="text-muted-brand">{{ t('auth.loading') }}</span>
      </div>

      <div v-else class="mx-auto" style="max-width:640px">
        <!-- Success header -->
        <div class="text-center mb-5">
          <div class="bg-brand-soft rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style="width:80px;height:80px">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" class="text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h1 class="fw-bold text-slate mb-3">{{ t('declaration.step3_title') }}</h1>
          <p class="fs-5 text-muted-brand">{{ t('declaration.step3_desc') }}</p>
        </div>

        <!-- Summary card -->
        <div class="card card-brand shadow-sm mb-4">
          <div class="card-body p-4">
            <h5 class="fw-bold text-slate mb-4">Résumé de la déclaration</h5>
            <ul class="list-group list-group-flush">
              <li v-if="declaration.tax_data?.name || declaration.tax_data?.firstname" class="list-group-item d-flex justify-content-between px-0 border-subtle">
                <small class="text-muted-brand">Contribuable</small>
                <small class="fw-semibold text-slate">{{ declaration.tax_data?.firstname }} {{ declaration.tax_data?.name }}</small>
              </li>
              <li class="list-group-item d-flex justify-content-between px-0 border-subtle">
                <small class="text-muted-brand">Année fiscale</small>
                <small class="fw-semibold text-slate">{{ declaration.year }}</small>
              </li>
              <li class="list-group-item d-flex justify-content-between px-0 border-subtle">
                <small class="text-muted-brand">Documents</small>
                <small class="fw-semibold text-slate">{{ documents.length }} fichier(s)</small>
              </li>
              <li v-if="declaration.tax_data?.transport" class="list-group-item d-flex justify-content-between px-0 border-subtle">
                <small class="text-muted-brand">{{ t('declaration.label_transport') }}</small>
                <small class="fw-semibold text-slate">{{ declaration.tax_data.transport }} CHF</small>
              </li>
              <li v-if="declaration.tax_data?.pillar3a" class="list-group-item d-flex justify-content-between px-0 border-subtle">
                <small class="text-muted-brand">{{ t('declaration.label_3a') }}</small>
                <small class="fw-semibold text-slate">{{ declaration.tax_data.pillar3a }} CHF</small>
              </li>
            </ul>
          </div>
        </div>

        <!-- Download -->
        <div class="d-flex flex-column align-items-center gap-3 mb-5">
          <button @click="downloadVaudtax" :disabled="downloading" class="btn btn-brand btn-lg d-flex align-items-center gap-2 px-5">
            <span v-if="downloading" class="spinner-border spinner-border-sm" role="status"></span>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Télécharger le fichier .vaudtax
          </button>
          <div v-if="downloaded" class="text-brand small fw-semibold d-flex align-items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            Fichier téléchargé !
          </div>
        </div>

        <div v-if="error" class="alert alert-danger small text-center mb-4">{{ error }}</div>

        <!-- Navigation -->
        <div class="d-flex justify-content-center gap-3">
          <router-link :to="`/declaration/${route.params.id}`" class="btn btn-outline-brand">{{ t('declaration.btn_back') }}</router-link>
          <router-link to="/declarations/new" class="btn btn-brand">{{ t('declaration.new_decl_btn') }}</router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import { useLanguageStore } from '../stores/language'
import api from '../services/api'
import { generateVaudtaxFile } from '../services/vaudtaxGenerator'

const languageStore = useLanguageStore()
const route = useRoute()
const t = (key) => languageStore.t(key)

const loading = ref(true)
const downloading = ref(false)
const downloaded = ref(false)
const error = ref('')
const declaration = ref({})
const documents = ref([])

onMounted(async () => {
  const id = route.params.id
  try {
    const response = await api.get(`/declarations/list/${id}/`)
    declaration.value = response.data
    documents.value = response.data.documents || []
  } catch (err) {
    error.value = 'Impossible de charger la déclaration.'
  } finally {
    loading.value = false
  }
})

const downloadVaudtax = async () => {
  downloading.value = true
  error.value = ''
  try {
    await generateVaudtaxFile(declaration.value, `declaration_${declaration.value.year || 'vaudtax'}`)
    downloaded.value = true
  } catch (err) {
    error.value = 'Erreur lors du téléchargement: ' + err.message
  } finally {
    downloading.value = false
  }
}
</script>
