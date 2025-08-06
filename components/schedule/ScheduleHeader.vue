<template>
  <div class="bg-white border-b border-gray-200 px-6 py-4">
    <div class="flex items-center justify-between">
      <!-- Left side: Logo and Title -->
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 7h12v9H4V7z"/>
            </svg>
          </div>
          <span class="text-xl font-semibold text-gray-900">Schedule</span>
        </div>
        
        <!-- Instructor Selector -->
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <span class="text-white text-sm font-medium">I</span>
          </div>
          <select :value="selectedInstructor.id" @change="onInstructorChange" 
                  class="border-0 bg-transparent text-gray-900 font-medium focus:ring-0 cursor-pointer">
            <option v-for="instructor in instructors" :key="instructor.id" :value="instructor.id">
              {{ instructor.name }}
            </option>
          </select>
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>

      <!-- Center: Date Navigation -->
      <div class="flex items-center space-x-4">
        <button @click="previousWeek" class="p-2 hover:bg-gray-100 rounded">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <span class="text-lg font-medium text-gray-900">{{ currentWeekDisplay }}</span>
        </div>
        
        <button @click="nextWeek" class="p-2 hover:bg-gray-100 rounded">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

      <!-- Right side: Show Weekend Toggle -->
      <div class="flex items-center space-x-2">
        <span class="text-sm text-gray-700">Show Weekend</span>
        <button @click="toggleWeekend" 
                :class="['px-3 py-1 rounded text-sm font-medium transition-colors', 
                         showWeekend ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300']">
          {{ showWeekend ? 'Hide Weekend' : 'Show Weekend' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Instructor {
  id: string
  name: string
}

interface Props {
  instructors: Instructor[]
  selectedInstructor: Instructor
  currentWeekDisplay: string
  showWeekend: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:selectedInstructor': [instructor: Instructor]
  'update:showWeekend': [show: boolean]
  previousWeek: []
  nextWeek: []
}>()

const toggleWeekend = () => {
  emit('update:showWeekend', !props.showWeekend)
}

const previousWeek = () => {
  emit('previousWeek')
}

const nextWeek = () => {
  emit('nextWeek')
}

const onInstructorChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const selectedId = target.value
  const instructor = props.instructors.find(i => i.id === selectedId)
  if (instructor) {
    emit('update:selectedInstructor', instructor)
  }
}
</script>