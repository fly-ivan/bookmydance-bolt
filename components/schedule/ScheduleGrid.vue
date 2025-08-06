<template>
  <div class="flex-1 bg-white">
    <!-- Day headers -->
    <div :class="['grid h-16 border-b border-gray-200 bg-gray-50', gridCols]">
      <div v-for="day in weekDays" :key="day.date" 
           class="flex flex-col items-center justify-center border-r border-gray-200 last:border-r-0 bg-gray-50">
        <div class="font-semibold text-gray-900">{{ day.name }}</div>
        <div class="text-sm text-gray-600">{{ day.dateDisplay }}</div>
      </div>
    </div>

    <!-- Grid body -->
    <div :class="['grid', gridCols]">
      <div v-for="day in weekDays" :key="day.date" class="border-r border-gray-200 last:border-r-0">
        <div v-for="(slot, index) in timeSlots" :key="`${day.date}-${slot.start}`" 
             class="h-20 border-b border-gray-200 p-1 relative group hover:bg-gray-50">
          
          <!-- Lesson tile if exists -->
          <LessonTile v-if="getLessonForSlot(day.date, slot.start)" 
                      :lesson="getLessonForSlot(day.date, slot.start)!" 
                      @click="editLesson(getLessonForSlot(day.date, slot.start)!)" />
          
          <!-- Add button if no lesson -->
          <button v-else @click="addLesson(day.date, slot.start)"
                  class="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import LessonTile from './LessonTile.vue'

interface TimeSlot {
  start: string
  end: string
  startDisplay: string
  endDisplay: string
}

interface WeekDay {
  date: string
  name: string
  dateDisplay: string
}

interface Lesson {
  id: string
  date: string
  time: string
  studentName: string
  level: string
  price: number
  type: 'intro' | 'advanced' | 'private' | 'group'
}

interface Props {
  timeSlots: TimeSlot[]
  weekDays: WeekDay[]
  lessons: Lesson[]
}

const props = defineProps<Props>()

const gridCols = computed(() => {
  const colCount = props.weekDays.length
  return colCount === 5 ? 'grid-cols-5' : 'grid-cols-7'
})

const emit = defineEmits<{
  addLesson: [date: string, time: string]
  editLesson: [lesson: Lesson]
}>()

const getLessonForSlot = (date: string, time: string) => {
  return props.lessons.find(lesson => lesson.date === date && lesson.time === time)
}

const addLesson = (date: string, time: string) => {
  emit('addLesson', date, time)
}

const editLesson = (lesson: Lesson) => {
  emit('editLesson', lesson)
}
</script>