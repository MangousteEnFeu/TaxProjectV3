<template>
  <div class="min-vh-100 bg-page">
    <Navbar />

    <main class="container py-5">
      <div class="mb-4">
        <router-link to="/dashboard" class="text-muted-brand text-decoration-none small d-inline-flex align-items-center gap-1 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
          {{ t('declaration.btn_back') }}
        </router-link>
        <h1 class="fw-bold text-slate">{{ t('declaration.step1_title') }}</h1>
      </div>

      <!-- Drop zone -->
      <div
        @click="triggerFileInput"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop"
        :class="['drop-zone', isDragging ? 'dragging' : '']"
      >
        <svg xmlns="http://www.w3.org/2000/svg" :class="['mb-3', isDragging ? 'text-brand' : 'text-light-brand']" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
        <h5 class="fw-bold text-slate mb-1">{{ t('upload.drop_title') }}</h5>
        <p class="text-muted-brand small mb-1">{{ t('upload.drop_desc') }}</p>
        <p class="text-light-brand" style="font-size:.75rem">Cliquez ou glissez-déposez vos fichiers</p>
        <input ref="fileInput" type="file" multiple accept=".pdf,.png,.jpg,.jpeg,.csv,.xlsx,.xls" class="d-none" @change="handleFileSelect" />
      </div>

      <!-- File list -->
      <div v-if="files.length > 0" class="mt-4">
        <h6 class="fw-bold text-slate mb-3">{{ t('upload.files_list') }} ({{ files.length }})</h6>
        <ul class="list-group">
          <li v-for="(file, index) in files" :key="index" class="list-group-item d-flex align-items-center justify-content-between border-subtle">
            <div class="d-flex align-items-center gap-3">
              <div class="rounded-2 d-flex align-items-center justify-content-center p-2" :class="getFileIconClass(file)">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
              </div>
              <div>
                <p class="mb-0 fw-semibold small text-slate">{{ file.name }}</p>
                <small class="text-light-brand">{{ formatFileSize(file.size) }}</small>
              </div>
            </div>
            <div class="d-flex align-items-center gap-2">
              <span class="badge" :class="getStatusClass(index)">{{ getStatusText(index) }}</span>
              <button v-if="!uploading" @click.stop="removeFile(index)" class="btn btn-sm btn-outline-danger border-0 p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </li>
        </ul>
      </div>

      <!-- Error -->
      <div v-if="error" class="alert alert-danger d-flex align-items-center gap-2 mt-4 py-2" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="flex-shrink-0">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <small>{{ error }}</small>
      </div>

      <!-- Actions -->
      <div class="d-flex justify-content-end mt-4">
        <button
          @click="handleContinue"
          :disabled="files.length === 0 || uploading"
          class="btn d-flex align-items-center gap-2"
          :class="files.length > 0 && !uploading ? 'btn-brand' : 'btn-secondary disabled'"
        >
          <span v-if="uploading" class="spinner-border spinner-border-sm" role="status"></span>
          {{ uploading ? t('auth.loading') : t('declaration.btn_continue') }}
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import { useLanguageStore } from '../stores/language'
import api from '../services/api'

const languageStore = useLanguageStore()
const router = useRouter()
const t = (key) => languageStore.t(key)

const fileInput = ref(null)
const files = ref([])
const isDragging = ref(false)
const uploading = ref(false)
const error = ref('')
const fileStatuses = ref({})

const triggerFileInput = () => fileInput.value?.click()

const handleFileSelect = (event) => {
  const target = event.target
  if (target.files) { addFiles(Array.from(target.files)); target.value = '' }
}

const handleDrop = (event) => {
  isDragging.value = false
  if (event.dataTransfer?.files) addFiles(Array.from(event.dataTransfer.files))
}

const addFiles = (newFiles) => {
  const accepted = ['.pdf', '.png', '.jpg', '.jpeg', '.csv', '.xlsx', '.xls']
  const validFiles = newFiles.filter(f => accepted.includes('.' + f.name.split('.').pop()?.toLowerCase()))
  const startIdx = files.value.length
  files.value = [...files.value, ...validFiles]
  validFiles.forEach((_, i) => { fileStatuses.value[startIdx + i] = 'pending' })
}

const removeFile = (index) => {
  files.value.splice(index, 1)
  const newStatuses = {}
  files.value.forEach((_, i) => { newStatuses[i] = 'pending' })
  fileStatuses.value = newStatuses
}

const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

const getFileIconClass = (file) => {
  const ext = file.name.split('.').pop()?.toLowerCase()
  if (ext === 'pdf') return 'bg-danger bg-opacity-10 text-danger'
  if (['png', 'jpg', 'jpeg'].includes(ext || '')) return 'bg-primary bg-opacity-10 text-primary'
  if (['csv', 'xlsx', 'xls'].includes(ext || '')) return 'bg-success bg-opacity-10 text-success'
  return 'bg-secondary bg-opacity-10 text-secondary'
}

const getStatusClass = (index) => {
  const s = fileStatuses.value[index] || 'pending'
  if (s === 'done') return 'text-bg-success'
  if (s === 'uploading') return 'text-bg-primary'
  if (s === 'error') return 'text-bg-danger'
  return 'text-bg-warning'
}

const getStatusText = (index) => {
  const s = fileStatuses.value[index] || 'pending'
  if (s === 'done') return t('upload.status_success')
  if (s === 'uploading') return t('upload.status_processing')
  if (s === 'error') return t('upload.status_error')
  return t('upload.status_pending')
}

const guessDocType = (filename) => {
  const name = filename.toLowerCase()
  if (name.includes('salaire') || name.includes('salary') || name.includes('lohn')) return 'SALARY'
  if (name.includes('banque') || name.includes('bank') || name.includes('attestation')) return 'BANK'
  return 'OTHER'
}

const handleContinue = async () => {
  error.value = ''
  uploading.value = true
  try {
    const currentYear = new Date().getFullYear() - 1
    const declResponse = await api.post('/declarations/list/', { year: currentYear })
    const declarationId = declResponse.data.id

    for (let i = 0; i < files.value.length; i++) {
      fileStatuses.value[i] = 'uploading'
      try {
        const formData = new FormData()
        formData.append('file', files.value[i])
        formData.append('declaration', declarationId)
        formData.append('document_type', guessDocType(files.value[i].name))
        const docResponse = await api.post('/declarations/documents/', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        const docId = docResponse.data.id
        try { await api.post('/extraction/process/', { document_id: docId }) } catch {}
        fileStatuses.value[i] = 'done'
      } catch (err) {
        fileStatuses.value[i] = 'error'
        console.error('Upload error:', files.value[i].name, err)
      }
    }
    router.push(`/declaration/${declarationId}`)
  } catch (err) {
    error.value = err.response?.data?.detail || err.message || 'Erreur lors de la création'
    uploading.value = false
  }
}
</script>
