<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Aree Sportive - {{ sport }}</h2>

    <label for="zona" class="block mb-2 font-semibold">Filtra per zona:</label>
    <select id="zona" v-model="zona" @change="onZonaChange" class="mb-4 p-2 border rounded">
      <option value="">Tutte le zone</option>
      <option v-for="z in zoneDisponibili" :key="z" :value="z">{{ z }}</option>
    </select>

    <div v-if="loading" class="text-gray-500">Caricamento...</div>
    <div v-else-if="error" class="text-red-500">Errore: {{ error }}</div>
    <div v-else>
      <div v-if="aree.length === 0" class="text-gray-600">Nessuna area trovata.</div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="area in aree"
          :key="area._id"
          class="border rounded-xl p-4 shadow hover:shadow-md transition"
        >
          <h3 class="text-lg font-semibold">{{ area.nome }}</h3>
          <p class="text-sm text-gray-600">Zona: {{ area.zona }}</p>
          <p v-if="area.selfDescription" class="mt-2">{{ area.selfDescription }}</p>
          <p class="text-sm mt-2">
            Tipo: <strong>{{ area.privata ? 'Privata' : 'Pubblica' }}</strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const sport = route.params.sport
const zona = ref(route.query.zona || '')

const zoneDisponibili = ['Trento Nord', 'Trento Sud', 'Trento Centro', 'Trento Ovest', 'Trento Est']

const aree = ref([])
const loading = ref(false)
const error = ref(null)

async function caricaAree() {
  loading.value = true
  error.value = null
  try {
    // Costruisco url con eventuale query zona
    let url = `/sport/${sport}/areesportive`
    if (zona.value) {
      url += `?zona=${encodeURIComponent(zona.value)}`
    }
    const res = await axios.get(url)
    aree.value = res.data
  } catch (err) {
    error.value = err.response?.data?.errore || 'Errore nella richiesta'
    aree.value = []
  } finally {
    loading.value = false
  }
}

function onZonaChange() {
  // Aggiorno la query senza ricaricare la pagina
  router.replace({ query: zona.value ? { zona: zona.value } : {} })
  caricaAree()
}

watch(() => route.params.sport, (newSport, oldSport) => {
  if (newSport !== oldSport) {
    caricaAree()
  }
})

watch(() => route.query.zona, (newZona, oldZona) => {
  if (newZona !== oldZona) {
    zona.value = newZona || ''
    caricaAree()
  }
})

onMounted(() => {
  caricaAree()
})
</script>


