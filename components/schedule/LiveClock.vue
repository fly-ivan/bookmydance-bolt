<template>
  <div class="bg-blue-500 text-white rounded-lg p-4 w-32 h-20 flex flex-col items-center justify-center">
    <div class="text-2xl font-bold">{{ currentTime }}</div>
    <div class="text-xs opacity-80">{{ nextSlotText }}</div>
  </div>
</template>

<script setup lang="ts">
const currentTime = ref('')
const nextSlotText = ref('--')

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false
  })
  
  // Calculate minutes until next 45-minute slot
  const minutes = now.getMinutes()
  const nextSlot = Math.ceil((minutes + 1) / 45) * 45
  const minutesUntilNext = nextSlot === 60 ? 60 - minutes : nextSlot - minutes
  nextSlotText.value = `${minutesUntilNext} min`
}

onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
})
</script>