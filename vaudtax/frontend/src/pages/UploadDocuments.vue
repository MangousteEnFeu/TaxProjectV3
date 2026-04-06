<template>
  <div class="min-h-screen bg-[#F8FAFC]">
    <Navbar />

    <main class="container mx-auto px-6 py-10">
      <div class="mb-8">
        <router-link to="/dashboard" class="text-[#64748B] hover:text-[#00904E] text-sm font-medium flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
          {{ t('declaration.btn_back') }}
        </router-link>
        <h1 class="text-3xl font-bold text-[#1E293B]">{{ t('upload.drop_title') }}</h1>
      </div>

      <!-- Upload Zone -->
      <div
        @click="triggerFileInput"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop"
        :class="[
          'border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300',
          isDragging
            ? 'border-[#00904E] bg-[#00904E]/5 scale-[1.01]'
            : 'border-[#CBD5E1] bg-white hover:border-[#00904E] hover:bg-[#F0FDF4]'
        ]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" :class="['w-16 h-16 transition-colors mb-6', isDragging ? 'text-[#00904E]' : 'text-[#94A3B8]']" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        <h3 class="text-[#1E293B] font-bold text-lg mb-2">{{ t('upload.drop_title') }}</h3>
        <p class="text-[#64748B] text-sm">{{ t('upload.drop_desc') }}</p>
        <input ref="fileInput" type="file" multiple accept=".pdf,.png,.jpg,.jpeg,.csv,.xlsx,.xls" class="hidden" @change="handleFileSelect" />
      </div>

      <!-- Files List -->
      <div v-if="files.length > 0" class="mt-8 space-y-3">
        <h3 class="text-[#1E293B] font-bold mb-2">{{ t('upload.files_list') }} ({{ files.length }})</h3>
        <div v-for="(file, index) in files" :key="index" class="bg-white border border-[#E2E8F0] rounded-xl p-4 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#00904E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span class="text-[#1E293B] text-sm font-medium">{{ file.name }}</span>
          </div>
          <button @click="files.splice(index, 1)" class="text-[#94A3B8] hover:text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>

      <div class="mt-8 flex justify-end">
        <button :disabled="files.length === 0" :class="['px-6 py-3 rounded-xl font-bold shadow-md transition-all border-b-4', files.length > 0 ? 'bg-[#00904E] text-white hover:bg-[#00703C] border-[#006030]' : 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed']">
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
