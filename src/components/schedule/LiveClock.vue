<template>
  <div class="live-clock">
    <div class="time-display">{{ currentTime }}</div>
    <div class="duration-display">{{ nextSlotDuration }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const currentTime = ref('');
const nextSlotDuration = ref('--');

let timeInterval: number;

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false
  });
  
  // Calculate minutes until next 45-minute slot
  const minutes = now.getMinutes();
  const nextSlot = Math.ceil((minutes + 1) / 45) * 45;
  const minutesUntilNext = nextSlot === 60 ? 60 - minutes : nextSlot - minutes;
  nextSlotDuration.value = `${minutesUntilNext} min`;
};

onMounted(() => {
  updateTime();
  timeInterval = setInterval(updateTime, 60000);
});

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval);
});
</script>

<style scoped>
.live-clock {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border-radius: 12px;
  padding: 0.75rem;
  color: white;
  text-align: center;
  min-width: 100px;
}

.time-display {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1;
}

.duration-display {
  font-size: 0.75rem;
  opacity: 0.9;
  margin-top: 0.25rem;
}
</style>