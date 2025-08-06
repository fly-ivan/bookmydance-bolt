<template>
  <div class="totals-bar">
    <div class="totals-grid">
      <div 
        v-for="(day, index) in weekDays" 
        :key="day.date.toISOString()"
        class="day-total"
      >
        <div class="lesson-count">{{ dailyStats[index]?.lessonCount || 0 }}</div>
        <div class="revenue-total">${{ dailyStats[index]?.revenue || 0 }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WeekDay, DailyStats } from '../../types/Event';

interface Props {
  weekDays: WeekDay[];
  dailyStats: DailyStats[];
}

defineProps<Props>();
</script>

<style scoped>
.totals-bar {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  margin-top: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.totals-grid {
  display: grid;
  grid-template-columns: 120px repeat(5, 1fr);
  gap: 1px;
  align-items: center;
}

.totals-grid::before {
  content: '';
  grid-column: 1;
}

.day-total {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.lesson-count {
  background: #e0e7ff;
  color: #3730a3;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.875rem;
  min-width: 32px;
  text-align: center;
}

.revenue-total {
  background: #d1fae5;
  color: #065f46;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.875rem;
  min-width: 48px;
  text-align: center;
}
</style>