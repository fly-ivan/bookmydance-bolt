<template>
  <div class="bg-white border-t border-gray-200 p-4">
    <div class="flex">
      <!-- Spacer for time column -->
      <div class="w-32"></div>
      
      <!-- Totals for each day -->
      <div :class="['flex-1 grid', gridCols]">
        <div v-for="(day, index) in weekDays" :key="day.date" 
             class="flex items-center justify-center space-x-2 border-r border-gray-200 last:border-r-0 py-2">
          
          <!-- Lesson count -->
          <div class="bg-blue-100 text-blue-800 rounded-lg px-3 py-2 min-w-[50px] text-center">
            <div class="text-lg font-bold">{{ dailyStats[index]?.lessonCount || 0 }}</div>
          </div>
          
          <!-- Revenue -->
          <div class="bg-green-100 text-green-800 rounded-lg px-3 py-2 min-w-[70px] text-center">
            <div class="text-lg font-bold">${{ dailyStats[index]?.revenue || 0 }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface WeekDay {
  date: string
  name: string
  dateDisplay: string
}

interface DailyStats {
  lessonCount: number
  revenue: number
}

interface Props {
  weekDays: WeekDay[]
  dailyStats: DailyStats[]
}

const props = defineProps<Props>()

const gridCols = computed(() => {
  const colCount = props.weekDays.length
  return colCount === 5 ? 'grid-cols-5' : 'grid-cols-7'
})
</script>