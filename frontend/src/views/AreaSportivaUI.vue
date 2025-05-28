<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Cerca Aree Sportive</h2>
    
    <input
      type="text"
      v-model="query"
      placeholder="Cerca per nome o sport..."
      class="border p-2 rounded mb-4 w-full"
    />

    <div class="flex space-x-2 mb-4">
      <button
        v-for="tipo in tipiFiltro"
        :key="tipo"
        @click="tipoFiltro = tipo"
        :class="['px-4 py-2 rounded', tipoFiltro === tipo ? 'bg-blue-600 text-white' : 'bg-gray-300']"
      >
        {{ tipo }}
      </button>
    </div>

    <div v-if="loading" class="text-gray-500">Caricamento...</div>
    <div v-else-if="error" class="text-red-500">Errore: {{ error }}</div>
    <div v-else>
      <div v-if="risultati.length === 0" class="text-gray-600">Nessuna area trovata.</div>
      <div class="space-y-4">
        <div
          v-for="area in risultati"
          :key="area.id"
          class="border rounded-xl p-4 shadow hover:shadow-md transition"
        >
          <h3 class="font-semibold text-lg">{{ area.nome }}</h3>
          <p>Tipo: {{ area.tipo }}</p>
          <p>Sport: {{ area.sport }}</p>
          <p>Indirizzo: {{ area.indirizzo }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const datiDB = ref([])
const query = ref('')
const tipoFiltro = ref('Tutti')
const risultati = ref([])
const loading = ref(false)
const error = ref(null)

const tipiFiltro = ['Tutti', 'Pubblico', 'Privato']

// Carica dati (simile al fetch in React)
async function caricaDati() {
  loading.value = true
  error.value = null
  try {
    const res = await fetch('https://private-44d07-wesport2.apiary-mock.com')
    if (!res.ok) throw new Error('Errore nella fetch')
    datiDB.value = await res.json()
    risultati.value = datiDB.value
    suggerisciCategoria()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

// Salva ricerca nel localStorage (simile a AsyncStorage)
function salvaRicerca(termine) {
  if (!termine || termine.trim() === '') return

  let ricerche = JSON.parse(localStorage.getItem('ricerche') || '{}')
  ricerche[termine] = (ricerche[termine] || 0) + 1
  localStorage.setItem('ricerche', JSON.stringify(ricerche))
}

// Suggerisci categoria più cercata
function suggerisciCategoria() {
  let ricerche = JSON.parse(localStorage.getItem('ricerche') || '{}')
  let entries = Object.entries(ricerche)
  if (entries.length === 0) return
  entries.sort((a, b) => b[1] - a[1])
  query.value = entries[0][0]
}

// Funzione di filtro simile a React
function filtra() {
  if (query.value) salvaRicerca(query.value)

  let filtrati = datiDB.value.filter(a =>
    a.nome.toLowerCase().includes(query.value.toLowerCase()) ||
    a.sport.toLowerCase().includes(query.value.toLowerCase())
  )

  if (tipoFiltro.value !== 'Tutti') {
    filtrati = filtrati.filter(a => a.tipo === tipoFiltro.value)
  }

  risultati.value = filtrati
}

watch([query, tipoFiltro, datiDB], filtra)

onMounted(caricaDati)
</script>

<style scoped>
/* Stili base per rendere simile al React */
</style>
