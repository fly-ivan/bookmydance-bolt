<template>
  <div class="time-column">
    <div class="time-header">Time</div>
    <div 
      v-for="slot in timeSlots" 
      :key="slot.time"
      class="time-slot"
    >
      <div class="time-main">{{ slot.displayTime }}</div>
      <div class="time-end">{{ slot.endTime }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TimeSlot } from '../../types/Event';

interface Props {
  timeSlots: TimeSlot[];
}

defineProps<Props>();
</script>

<style scoped>
.time-column {
  background: #374151;
  border-radius: 12px 0 0 12px;
  min-width: 120px;
}

.time-header {
  background: #1f2937;
  color: white;
  padding: 1rem;
  text-align: center;
  font-weight: 600;
  font-size: 0.875rem;
  border-radius: 12px 0 0 0;
  border-bottom: 2px solid #4b5563;
}

.time-slot {
  background: #4b5563;
  color: white;
  padding: 1rem;
  text-align: center;
  border-bottom: 2px solid #374151;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
}

.time-slot:last-child {
  border-radius: 0 0 0 12px;
}

.time-main {
  font-weight: 600;
  font-size: 0.875rem;
}

.time-end {
  font-size: 0.75rem;
  opacity: 0.8;
}
</style>