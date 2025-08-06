<template>
  <div class="w-32 bg-white border-r border-gray-200">
    <!-- Header spacer -->
    <div class="h-16 border-b border-gray-200 bg-gray-50 flex items-center justify-center">
      <span class="text-sm font-medium text-gray-600">Time</span>
    </div>
    
    <!-- Time slots -->
    <div v-for="slot in timeSlots" :key="slot.start" 
         class="h-20 border-b border-gray-200 flex items-center justify-center bg-gray-600 text-white">
      <div class="text-center">
        <div class="text-sm font-medium">{{ slot.startDisplay }}</div>
        <div class="text-xs opacity-75">{{ slot.end }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TimeSlot {
  start: string
  end: string
  startDisplay: string
  endDisplay: string
}

interface Props {
  timeSlots: TimeSlot[]
}

defineProps<Props>()
</script>