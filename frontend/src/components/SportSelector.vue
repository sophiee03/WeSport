<template>
  <div>
    <label for="sport">Scegli uno sport:</label>
    <select v-model="selectedSport">
      <option disabled value="">-- Seleziona --</option>
      <option value="Calcio">Calcio</option>
      <option value="Basket">Basket</option>
      <option value="Tennis">Tennis</option>
      <option value="Padel">Padel</option>
      <option value="Nuoto">Nuoto</option>
      <option value="Arrampicata">Arrampicata</option>
      <option value="Pallavolo/BeachVolley">Pallavolo/BeachVolley</option>
    </select>
    <button @click="vaiASport">Vedi aree</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedSport = ref('')

const vaiASport = () => {
  if (selectedSport.value) {
    router.push(`/sport/${selectedSport.value}`)
  }
}
</script>
