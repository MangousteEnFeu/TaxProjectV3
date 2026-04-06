<template>
  <div class="min-vh-100 bg-page">
    <Navbar />

    <main class="container py-5">
      <div class="mb-4">
        <router-link to="/dashboard" class="text-muted-brand text-decoration-none small d-inline-flex align-items-center gap-1 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
          {{ t('declaration.btn_back') }}
        </router-link>
        <h1 class="fw-bold text-slate">{{ t('declaration.step2_title') }}</h1>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="d-flex align-items-center justify-content-center py-5">
        <div class="spinner-border spinner-brand me-3" role="status"></div>
        <span class="text-muted-brand">{{ t('auth.loading') }}</span>
      </div>

      <div v-else>
        <!-- Extracted data -->
        <div class="card card-brand shadow-sm mb-4">
          <div class="card-body p-4">
            <h5 class="fw-bold text-slate mb-4">{{ t('declaration.extracted_title') }}</h5>
            <div class="row g-4">
              <div class="col-md-6">
                <h6 class="fw-bold text-brand mb-3">{{ t('declaration.income_title') }}</h6>
                <div class="bg-page rounded-3 p-3 border border-subtle">
                  <div v-if="extractedIncome.length > 0">
                    <div v-for="(item, idx) in extractedIncome" :key="idx" class="d-flex justify-content-between py-2 border-bottom border-subtle last-no-border">
                      <small class="text-muted-brand">{{ item.label }}</small>
                      <small class="fw-semibold text-slate">{{ item.value }} CHF</small>
                    </div>
                  </div>
                  <p v-else class="text-light-brand small fst-italic mb-0">{{ t('declaration.no_salary') }}</p>
                </div>
              </div>
              <div class="col-md-6">
                <h6 class="fw-bold text-gold mb-3">{{ t('declaration.wealth_title') }}</h6>
                <div class="bg-page rounded-3 p-3 border border-subtle">
                  <div v-if="extractedWealth.length > 0">
                    <div v-for="(item, idx) in extractedWealth" :key="idx" class="d-flex justify-content-between py-2 border-bottom border-subtle">
                      <small class="text-muted-brand">{{ item.label }}</small>
                      <small class="fw-semibold text-slate">{{ item.value }} CHF</small>
                    </div>
                  </div>
                  <p v-else class="text-light-brand small fst-italic mb-0">{{ t('declaration.no_bank') }}</p>
                </div>
              </div>
            </div>

            <div v-if="extractedIncome.length > 0 || extractedWealth.length > 0" class="row g-4 mt-2 pt-3 border-top border-subtle">
              <div class="col-md-6 d-flex justify-content-between align-items-center">
                <span class="fw-bold text-slate">{{ t('declaration.total_net') }}</span>
                <span class="fw-bold fs-5 text-brand">{{ totalIncome }} CHF</span>
              </div>
              <div class="col-md-6 d-flex justify-content-between align-items-center">
                <span class="fw-bold text-slate">{{ t('declaration.total_wealth') }}</span>
                <span class="fw-bold fs-5 text-gold">{{ totalWealth }} CHF</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Documents list -->
        <div v-if="documents.length > 0" class="card card-brand shadow-sm mb-4">
          <div class="card-body p-4">
            <h6 class="fw-bold text-slate mb-3">{{ t('upload.files_list') }} ({{ documents.length }})</h6>
            <ul class="list-group list-group-flush">
              <li v-for="doc in documents" :key="doc.id" class="list-group-item d-flex align-items-center justify-content-between px-0 border-subtle">
                <div class="d-flex align-items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" class="text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                  </svg>
                  <small class="fw-semibold text-slate">{{ doc.file?.split('/').pop() || 'Document' }}</small>
                </div>
                <span class="badge" :class="doc.extracted_data && Object.keys(doc.extracted_data).length > 0 && !doc.extracted_data.error ? 'text-bg-success' : 'text-bg-warning'">
                  {{ doc.extracted_data && Object.keys(doc.extracted_data).length > 0 && !doc.extracted_data.error ? t('upload.status_success') : t('upload.status_pending') }}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Personal data form -->
        <div class="card card-brand shadow-sm mb-4">
          <div class="card-body p-4">
            <h5 class="fw-bold text-slate mb-4">{{ t('declaration.section_personal') }}</h5>
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">{{ t('declaration.label_name') }}</label>
                <input type="text" v-model="form.name" class="form-control" />
              </div>
              <div class="col-md-6">
                <label class="form-label">{{ t('declaration.label_firstname') }}</label>
                <input type="text" v-model="form.firstname" class="form-control" />
              </div>
              <div class="col-md-6">
                <label class="form-label">{{ t('declaration.label_birthdate') }}</label>
                <input type="date" v-model="form.birthdate" class="form-control" />
              </div>
              <div class="col-md-6">
                <label class="form-label">{{ t('declaration.label_civilstatus') }}</label>
                <select v-model="form.civilStatus" class="form-select">
                  <option value="">{{ t('declaration.civil_select') }}</option>
                  <option value="single">{{ t('declaration.civil_single') }}</option>
                  <option value="married">{{ t('declaration.civil_married') }}</option>
                  <option value="divorced">{{ t('declaration.civil_divorced') }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Deductions form -->
        <div class="card card-brand shadow-sm mb-4">
          <div class="card-body p-4">
            <h5 class="fw-bold text-slate mb-4">{{ t('declaration.section_deductions') }}</h5>
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">{{ t('declaration.label_transport') }}</label>
                <div class="input-group">
                  <input type="number" v-model="form.transport" class="form-control" placeholder="0" />
                  <span class="input-group-text">CHF</span>
                </div>
              </div>
              <div class="col-md-6">
                <label class="form-label">{{ t('declaration.label_meal') }}</label>
                <div class="input-group">
                  <input type="number" v-model="form.meal" class="form-control" placeholder="0" />
                  <span class="input-group-text">CHF</span>
                </div>
              </div>
              <div class="col-md-6">
                <label class="form-label">{{ t('declaration.label_3a') }}</label>
                <div class="input-group">
                  <input type="number" v-model="form.pillar3a" class="form-control" placeholder="0" />
                  <span class="input-group-text">CHF</span>
                </div>
              </div>
              <div class="col-md-6">
                <label class="form-label">{{ t('declaration.label_donations') }}</label>
                <div class="input-group">
                  <input type="number" v-model="form.donations" class="form-control" placeholder="0" />
                  <span class="input-group-text">CHF</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="error" class="alert alert-danger small mb-4">{{ error }}</div>

        <div class="d-flex justify-content-between">
          <router-link to="/dashboard" class="btn btn-outline-brand">{{ t('declaration.btn_back') }}</router-link>
          <button @click="handleGenerate" :disabled="saving" class="btn btn-brand d-flex align-items-center gap-2">
            <span v-if="saving" class="spinner-border spinner-border-sm" role="status"></span>
            {{ t('declaration.btn_generate') }}
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import { useLanguageStore } from '../stores/language'
import api from '../services/api'

const languageStore = useLanguageStore()
const route = useRoute()
const router = useRouter()
const t = (key) => languageStore.t(key)

const loading = ref(true)
const saving = ref(false)
const error = ref('')
const declaration = ref(null)
const documents = ref([])

const form = ref({
  name: '', firstname: '', birthdate: '', civilStatus: '',
  transport: 0, meal: 0, pillar3a: 0, donations: 0,
})

const extractedIncome = computed(() => {
  const items = []
  for (const doc of documents.value) {
    if (!doc.extracted_data || doc.extracted_data.error) continue
    const data = doc.extracted_data.data || doc.extracted_data
    if (doc.document_type === 'SALARY' || doc.extracted_data.documentType === 'SalaryCertificate') {
      if (data.grossSalary || data.salaireBrut) items.push({ label: 'Salaire brut', value: data.grossSalary || data.salaireBrut || 0 })
      if (data.netSalary || data.salaireNet) items.push({ label: 'Salaire net', value: data.netSalary || data.salaireNet || 0 })
      Object.entries(data).forEach(([key, val]) => {
        if (typeof val === 'number' && !['grossSalary','netSalary','salaireBrut','salaireNet'].includes(key))
          items.push({ label: key, value: val })
      })
    }
  }
  return items
})

const extractedWealth = computed(() => {
  const items = []
  for (const doc of documents.value) {
    if (!doc.extracted_data || doc.extracted_data.error) continue
    const data = doc.extracted_data.data || doc.extracted_data
    if (doc.document_type === 'BANK' || doc.extracted_data.documentType === 'BankStatement') {
      if (data.balance || data.solde) items.push({ label: 'Solde bancaire', value: data.balance || data.solde || 0 })
      if (data.interest || data.interets) items.push({ label: 'Intérêts', value: data.interest || data.interets || 0 })
      Object.entries(data).forEach(([key, val]) => {
        if (typeof val === 'number' && !['balance','solde','interest','interets'].includes(key))
          items.push({ label: key, value: val })
      })
    }
  }
  return items
})

const totalIncome = computed(() => extractedIncome.value.reduce((s, i) => s + (parseFloat(i.value) || 0), 0).toFixed(2))
const totalWealth = computed(() => extractedWealth.value.reduce((s, i) => s + (parseFloat(i.value) || 0), 0).toFixed(2))

const prefillForm = () => {
  for (const doc of documents.value) {
    if (!doc.extracted_data || doc.extracted_data.error) continue
    const data = doc.extracted_data.data || doc.extracted_data
    if (data.name || data.nom) form.value.name = data.name || data.nom || form.value.name
    if (data.firstName || data.prenom) form.value.firstname = data.firstName || data.prenom || form.value.firstname
    if (data.birthDate || data.dateNaissance) form.value.birthdate = data.birthDate || data.dateNaissance || form.value.birthdate
  }
}

onMounted(async () => {
  const id = route.params.id
  try {
    const response = await api.get(`/declarations/list/${id}/`)
    declaration.value = response.data
    documents.value = response.data.documents || []
    if (declaration.value.tax_data && Object.keys(declaration.value.tax_data).length > 0)
      Object.assign(form.value, declaration.value.tax_data)
    prefillForm()
  } catch (err) {
    error.value = 'Impossible de charger la déclaration.'
  } finally {
    loading.value = false
  }
})

const handleGenerate = async () => {
  saving.value = true
  error.value = ''
  try {
    const id = route.params.id
    await api.patch(`/declarations/list/${id}/`, { tax_data: { ...form.value }, status: 'READY' })
    router.push(`/declaration/${id}/preview`)
  } catch (err) {
    error.value = err.response?.data?.detail || 'Erreur lors de la sauvegarde'
    saving.value = false
  }
}
</script>
