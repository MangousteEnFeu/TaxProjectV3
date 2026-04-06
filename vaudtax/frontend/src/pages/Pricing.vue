<template>
  <div class="min-vh-100 bg-page">
    <Navbar />

    <main class="container py-5">
      <!-- Header -->
      <div class="text-center mb-5 mx-auto" style="max-width:600px">
        <span class="text-gold fw-bold d-block mb-2" style="letter-spacing:.15em;font-size:.75rem;text-transform:uppercase">VaudTax Helper</span>
        <h1 class="fw-bold text-slate display-5 mb-3">{{ t('pricing.title') }}</h1>
        <p class="fs-5 text-muted-brand">{{ t('pricing.subtitle') }}</p>
      </div>

      <!-- Billing toggle -->
      <div class="d-flex justify-content-center mb-5">
        <div class="bg-white border border-subtle rounded-3 p-1 d-inline-flex shadow-sm">
          <button @click="billing = 'monthly'" class="btn btn-sm px-4 rounded-2 fw-bold" :class="billing === 'monthly' ? 'btn-dark' : 'btn-link text-muted-brand text-decoration-none'">
            {{ t('pricing.toggle_monthly') }}
          </button>
          <button @click="billing = 'annual'" class="btn btn-sm px-4 rounded-2 fw-bold" :class="billing === 'annual' ? 'btn-brand' : 'btn-link text-muted-brand text-decoration-none'">
            {{ t('pricing.toggle_annual') }}
          </button>
        </div>
      </div>

      <div class="row g-4 justify-content-center align-items-start">
        <!-- Free -->
        <div class="col-md-4">
          <div class="card card-brand shadow-sm h-100 position-relative overflow-hidden">
            <div class="position-absolute top-0 start-0 end-0 bg-secondary bg-opacity-25" style="height:4px"></div>
            <div class="card-body p-4 d-flex flex-column">
              <h4 class="fw-bold text-slate mb-1">{{ t('pricing.free_title') }}</h4>
              <div class="display-6 fw-bold text-slate mb-2">{{ t('pricing.free_price') }}</div>
              <p class="text-muted-brand small mb-4" style="min-height:40px">{{ t('pricing.free_desc') }}</p>
              <router-link :to="getRegisterLink('free')" class="btn btn-outline-brand w-100 mb-4">{{ t('pricing.btn_choose') }}</router-link>
              <ul class="list-unstyled d-flex flex-column gap-3 mt-auto">
                <li class="d-flex align-items-center gap-2 small text-slate">
                  <svg class="text-brand flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                  {{ features[0] }}
                </li>
                <li v-for="i in [1,2,3]" :key="i" class="d-flex align-items-center gap-2 small text-light-brand">
                  <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                  {{ features[i] }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Standard (featured) -->
        <div class="col-md-4">
          <div class="card shadow pricing-card-featured h-100 position-relative overflow-hidden">
            <div class="position-absolute top-0 end-0 bg-brand text-white px-3 py-1 rounded-bottom-start" style="font-size:.7rem;font-weight:700">POPULAIRE</div>
            <div class="card-body p-4 d-flex flex-column">
              <h4 class="fw-bold text-slate mb-1">{{ t('pricing.standard_title') }}</h4>
              <div class="d-flex align-items-baseline gap-2 mb-2">
                <span class="display-6 fw-bold text-brand">
                  {{ billing === 'monthly' ? t('pricing.standard_price_mo') : t('pricing.standard_price_yr') }}
                </span>
                <small class="text-muted-brand">{{ billing === 'monthly' ? t('pricing.per_month') : t('pricing.per_year') }}</small>
              </div>
              <p class="text-muted-brand small mb-4" style="min-height:40px">{{ t('pricing.standard_desc') }}</p>
              <router-link :to="getRegisterLink('standard')" class="btn btn-brand w-100 mb-4">{{ t('pricing.btn_choose') }}</router-link>
              <ul class="list-unstyled d-flex flex-column gap-3 mt-auto">
                <li v-for="i in [0,1]" :key="i" class="d-flex align-items-center gap-2 small text-slate">
                  <svg class="text-brand flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                  {{ features[i] }}
                </li>
                <li v-for="i in [2,3]" :key="i" class="d-flex align-items-center gap-2 small text-light-brand">
                  <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                  {{ features[i] }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Pro -->
        <div class="col-md-4">
          <div class="card card-brand shadow-sm h-100 position-relative overflow-hidden">
            <div class="position-absolute top-0 start-0 end-0 bg-warning" style="height:4px"></div>
            <div class="card-body p-4 d-flex flex-column">
              <h4 class="fw-bold text-slate mb-1 d-flex align-items-center gap-2">
                {{ t('pricing.pro_title') }}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="text-gold" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </h4>
              <div class="d-flex align-items-baseline gap-2 mb-2">
                <span class="display-6 fw-bold text-slate">
                  {{ billing === 'monthly' ? t('pricing.pro_price_mo') : t('pricing.pro_price_yr') }}
                </span>
                <small class="text-muted-brand">{{ billing === 'monthly' ? t('pricing.per_month') : t('pricing.per_year') }}</small>
              </div>
              <p class="text-muted-brand small mb-4" style="min-height:40px">{{ t('pricing.pro_desc') }}</p>
              <router-link :to="getRegisterLink('pro')" class="btn btn-outline-brand w-100 mb-4">{{ t('pricing.btn_choose') }}</router-link>
              <ul class="list-unstyled d-flex flex-column gap-3 mt-auto">
                <li v-for="i in [0,1,2,3]" :key="i" class="d-flex align-items-center gap-2 small text-slate">
                  <svg class="text-gold flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                  {{ features[i] }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <p class="text-center text-muted-brand small mt-5">
        * Tous les prix incluent la TVA. Paiement sécurisé via Stripe.<br>
        Satisfait ou remboursé sous 14 jours.
      </p>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Navbar from '../components/Navbar.vue'
import { useLanguageStore } from '../stores/language'

const languageStore = useLanguageStore()
const t = (key) => languageStore.t(key)

const billing = ref('annual')

const features = computed(() => [
  t('pricing.feature_extract'),
  t('pricing.feature_export'),
  t('pricing.feature_support'),
  t('pricing.feature_review'),
])

const getRegisterLink = (plan) => `/register?plan=${plan}&billing=${billing.value}`
</script>
