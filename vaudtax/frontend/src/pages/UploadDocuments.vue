<template>
  <div class="min-vh-100 bg-page">
    <Navbar />

    <main class="container py-5">
      <div class="mb-4">
        <router-link to="/dashboard" class="text-muted-brand text-decoration-none small d-inline-flex align-items-center gap-1 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
          {{ t('declaration.btn_back') }}
        </router-link>
        <h1 class="fw-bold text-slate">{{ t('upload.drop_title') }}</h1>
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
        <p class="text-muted-brand small mb-0">{{ t('upload.drop_desc') }}</p>
        <input ref="fileInput" type="file" multiple accept=".pdf,.png,.jpg,.jpeg,.csv,.xlsx,.xls" class="d-none" @change="handleFileSelect" />
      </div>

      <!-- File list -->
      <div v-if="files.length > 0" class="mt-4">
        <h6 class="fw-bold text-slate mb-3">{{ t('upload.files_list') }} ({{ files.length }})</h6>
        <ul class="list-group">
          <li v-for="(file, index) in files" :key="index" class="list-group-item d-flex align-items-center justify-content-between border-subtle">
            <div class="d-flex align-items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" class="text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
              </svg>
              <small class="fw-semibold text-slate">{{ file.name }}</small>
            </div>
            <button @click="files.splice(index, 1)" class="btn btn-sm btn-outline-danger border-0 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </li>
        </ul>
      </div>

      <div class="d-flex justify-content-end mt-4">
        <button
          :disabled="files.length === 0"
          class="btn"
          :class="files.length > 0 ? 'btn-brand' : 'btn-secondary disabled'"
        >
          {{ t('declaration.btn_continue') }}
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import { useLanguageStore } from '../stores/language'

const languageStore = useLanguageStore()
const t = (key) => languageStore.t(key)
const fileInput = ref(null)
const files = ref([])
const isDragging = ref(false)

const triggerFileInput = () => fileInput.value?.click()
const handleFileSelect = (event) => {
  if (event.target.files) { files.value = [...files.value, ...Array.from(event.target.files)]; event.target.value = '' }
}
const handleDrop = (event) => {
  isDragging.value = false
  if (event.dataTransfer?.files) files.value = [...files.value, ...Array.from(event.dataTransfer.files)]
}
</script>
