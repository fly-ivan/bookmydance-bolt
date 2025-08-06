<template>
  <div class="flex-1 bg-gray-50">
    <!-- Header -->
    <div class="bg-gray-800 text-white p-4 flex items-center justify-between">
      <!-- Left: Logo and Clock -->
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 7h12v9H4V7z"/>
          </svg>
          <span class="text-lg font-semibold">Schedule</span>
        </div>
        
        <!-- Live Clock -->
        <div class="bg-blue-500 rounded-lg px-4 py-2 text-center">
          <div class="text-lg font-bold">{{ currentTime }}</div>
          <div class="text-xs opacity-80">{{ nextSlotText }}</div>
        </div>
      </div>

      <!-- Center: Instructor and Date Navigation -->
      <div class="flex items-center space-x-6">
        <!-- Instructor Selector -->
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <span class="text-white text-sm font-medium">{{ selectedInstructor.name.charAt(0) }}</span>
          </div>
          <select 
            v-model="selectedInstructor.id"
            @change="onInstructorChange"
            class="bg-transparent border border-gray-600 rounded px-3 py-1 text-white"
          >
            <option v-for="instructor in instructors" :key="instructor.id" :value="instructor.id" class="text-black">
              {{ instructor.name }}
            </option>
          </select>
        </div>

        <!-- Date Navigation -->
        <div class="flex items-center space-x-4">
          <button @click="previousWeek" class="p-2 hover:bg-gray-700 rounded">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          
          <span class="text-lg font-medium">{{ currentWeekDisplay }}</span>
          
          <button @click="nextWeek" class="p-2 hover:bg-gray-700 rounded">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Right: Show Weekend Toggle -->
      <div>
        <button 
          @click="toggleWeekend" 
          :class="['px-4 py-2 rounded text-sm font-medium transition-colors', 
                   showWeekend ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500']"
        >
          {{ showWeekend ? 'Hide Weekend' : 'Show Weekend' }}
        </button>
      </div>
    </div>

    <!-- Main Schedule Layout -->
    <div class="flex bg-white">
      <!-- Time Column -->
      <div class="w-20 bg-gray-700 text-white">
        <!-- Header spacer - EXACT same height as day headers -->
        <div class="h-16 bg-gray-800 flex items-center justify-center border-b border-gray-600">
          <span class="text-sm font-medium">Time</span>
        </div>
        
        <!-- Time slots - EXACT same height as grid rows -->
        <div v-for="slot in timeSlots" :key="slot.time" 
             class="h-20 border-b border-gray-600 flex flex-col items-center justify-center text-xs">
          <div class="font-medium">{{ slot.displayTime }}</div>
          <div class="opacity-75">{{ slot.endTime }}</div>
        </div>
      </div>

      <!-- Schedule Grid -->
      <div class="flex-1">
        <!-- Day Headers - EXACT same height as time column header -->
        <div :class="['grid h-16 bg-gray-50 border-b border-gray-200', gridCols]">
          <div v-for="day in displayWeekDays" :key="day.date" 
               class="flex flex-col items-center justify-center border-r border-gray-200 last:border-r-0">
            <div class="font-semibold text-gray-900">{{ day.name }}</div>
            <div class="text-sm text-gray-600">{{ day.dateDisplay }}</div>
          </div>
        </div>

        <!-- Grid Body - EXACT same height as time slots -->
        <div :class="['grid', gridCols]">
          <div v-for="day in displayWeekDays" :key="day.date" class="border-r border-gray-200 last:border-r-0">
            <div v-for="slot in timeSlots" :key="`${day.date}-${slot.time}`" 
                 class="h-20 border-b border-gray-200 p-1 relative group hover:bg-gray-50"
                 @click="handleCellClick(slot.time, day.date)"
                 @dragover.prevent="handleDragOver($event)"
                 @dragenter.prevent="handleDragEnter($event)"
                 @dragleave="handleDragLeave($event)"
                 @drop="handleDrop($event, slot.time, day.date)">
              
              <!-- Lesson tile if exists -->
              <div v-if="getLessonForSlot(day.date, slot.time)" 
                   :class="['lesson-tile h-full rounded cursor-move', getLessonTypeClass(getLessonForSlot(day.date, slot.time))]"
                   draggable="true"
                   @dragstart="handleDragStart($event, getLessonForSlot(day.date, slot.time))"
                   @click.stop="editLesson(getLessonForSlot(day.date, slot.time))">
                <div class="p-2 h-full flex flex-col justify-between text-xs">
                  <div>
                    <div class="font-medium">{{ slot.displayTime.split(' ')[0] }}</div>
                    <div class="font-semibold text-gray-900 mb-1">{{ getLessonForSlot(day.date, slot.time).studentNames }}</div>
                    <div :class="['inline-block px-2 py-1 rounded text-xs font-medium', getBadgeClass(getLessonForSlot(day.date, slot.time))]">
                      {{ getLessonBadgeText(getLessonForSlot(day.date, slot.time)) }}
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="font-bold">${{ getLessonForSlot(day.date, slot.time).price }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Drop zone -->
              <div v-else
                   :class="['h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity drop-zone', 
                           { 'bg-blue-100 opacity-100 border-2 border-blue-300 border-dashed': isDragOver }]">
                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Totals - EXACT alignment with columns -->
    <div class="bg-white border-t border-gray-200 p-4">
      <div class="flex">
        <!-- Spacer for time column - EXACT same width -->
        <div class="w-20"></div>
        
        <!-- Totals for each day - EXACT same grid as days -->
        <div :class="['flex-1 grid gap-1', gridCols]">
          <div v-for="(day, index) in displayWeekDays" :key="day.date" 
               class="flex items-center justify-center space-x-2 py-2">
            
            <!-- Lesson count -->
            <div class="bg-blue-100 text-blue-800 rounded-lg px-3 py-2 min-w-[40px] text-center">
              <div class="text-lg font-bold">{{ dailyStats[index]?.lessonCount || 0 }}</div>
            </div>
            
            <!-- Revenue -->
            <div class="bg-green-100 text-green-800 rounded-lg px-3 py-2 min-w-[60px] text-center">
              <div class="text-lg font-bold">${{ dailyStats[index]?.revenue || 0 }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Instructor {
  id: string
  name: string
}

interface TimeSlot {
  time: string
  displayTime: string
  endTime: string
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
  studentNames: string
  level: string
  price: number
  type: 'intro' | 'advanced' | 'private' | 'group' | 'wedding'
}

interface DailyStats {
  lessonCount: number
  revenue: number
}

// Reactive data
const currentTime = ref('')
const nextSlotText = ref('--')
const showWeekend = ref(false)
const currentWeekStart = ref(new Date('2025-08-04'))
const isDragOver = ref(false)

const instructors = ref<Instructor[]>([
  { id: '1', name: 'Ivan' },
  { id: '2', name: 'Maria' },
  { id: '3', name: 'Carlos' }
])

const selectedInstructor = ref(instructors.value[0])

const timeSlots = ref<TimeSlot[]>([
  { time: '13:00', displayTime: '1:00 PM', endTime: '1:40' },
  { time: '13:45', displayTime: '1:45 PM', endTime: '2:25' },
  { time: '14:30', displayTime: '2:30 PM', endTime: '3:10' },
  { time: '15:15', displayTime: '3:15 PM', endTime: '3:55' },
  { time: '16:00', displayTime: '4:00 PM', endTime: '4:40' },
  { time: '16:45', displayTime: '4:45 PM', endTime: '5:25' },
  { time: '17:30', displayTime: '5:30 PM', endTime: '6:10' },
  { time: '18:15', displayTime: '6:15 PM', endTime: '6:55' },
  { time: '19:00', displayTime: '7:00 PM', endTime: '7:40' },
  { time: '19:45', displayTime: '7:45 PM', endTime: '8:25' }
])

const lessons = ref<Lesson[]>([
  {
    id: '1',
    date: '2025-08-06',
    time: '14:30',
    studentNames: 'Stephanie & Carlo',
    level: 'Group',
    price: 80,
    type: 'group'
  },
  {
    id: '2',
    date: '2025-08-06',
    time: '15:15',
    studentNames: 'Kate Schwitz',
    level: 'Wedding',
    price: 80,
    type: 'wedding'
  },
  {
    id: '3',
    date: '2025-08-06',
    time: '16:00',
    studentNames: 'Debbie & Bryan',
    level: 'Introduction',
    price: 75,
    type: 'intro'
  },
  {
    id: '4',
    date: '2025-08-06',
    time: '16:45',
    studentNames: 'Emily & Johnny',
    level: 'Introduction',
    price: 75,
    type: 'intro'
  },
  {
    id: '5',
    date: '2025-08-06',
    time: '17:30',
    studentNames: 'Lourdes Rivera',
    level: 'Advanced',
    price: 100,
    type: 'advanced'
  },
  {
    id: '6',
    date: '2025-08-06',
    time: '18:15',
    studentNames: 'Carolin and John',
    level: 'Introduction',
    price: 75,
    type: 'intro'
  },
  {
    id: '7',
    date: '2025-08-06',
    time: '19:00',
    studentNames: 'Sharon Bricker',
    level: 'Advanced',
    price: 90,
    type: 'advanced'
  },
  {
    id: '8',
    date: '2025-08-06',
    time: '19:45',
    studentNames: 'Kate Schwitz',
    level: 'Wedding',
    price: 80,
    type: 'wedding'
  }
])

// Computed properties
const weekDays = computed<WeekDay[]>(() => {
  const days: WeekDay[] = []
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const dayCount = showWeekend.value ? 7 : 5
  
  for (let i = 0; i < dayCount; i++) {
    const date = new Date(currentWeekStart.value)
    date.setDate(currentWeekStart.value.getDate() + i)
    
    days.push({
      date: date.toISOString().split('T')[0],
      name: dayNames[i],
      dateDisplay: `${date.getMonth() + 1}/${date.getDate()}`
    })
  }
  
  return days
})

const displayWeekDays = computed(() => weekDays.value)

const gridCols = computed(() => {
  return showWeekend.value ? 'grid-cols-7' : 'grid-cols-5'
})

const currentWeekDisplay = computed(() => {
  const start = new Date(currentWeekStart.value)
  const end = new Date(start)
  end.setDate(start.getDate() + (showWeekend.value ? 6 : 4))
  
  const startMonth = start.toLocaleDateString('en-US', { month: 'long' })
  const endMonth = end.toLocaleDateString('en-US', { month: 'long' })
  const year = start.getFullYear()
  
  if (startMonth === endMonth) {
    return `${startMonth} ${start.getDate()}-${end.getDate()}, ${year}`
  } else {
    return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}, ${year}`
  }
})

const dailyStats = computed<DailyStats[]>(() => {
  return displayWeekDays.value.map(day => {
    const dayLessons = lessons.value.filter(lesson => lesson.date === day.date)
    return {
      lessonCount: dayLessons.length,
      revenue: dayLessons.reduce((sum, lesson) => sum + lesson.price, 0)
    }
  })
})

// Methods
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false
  })
  
  const minutes = now.getMinutes()
  const nextSlot = Math.ceil((minutes + 1) / 45) * 45
  const minutesUntilNext = nextSlot === 60 ? 60 - minutes : nextSlot - minutes
  nextSlotText.value = `${minutesUntilNext} min`
}

const toggleWeekend = () => {
  showWeekend.value = !showWeekend.value
  console.log('Weekend toggled:', showWeekend.value)
}

const previousWeek = () => {
  const newDate = new Date(currentWeekStart.value)
  newDate.setDate(newDate.getDate() - 7)
  currentWeekStart.value = newDate
}

const nextWeek = () => {
  const newDate = new Date(currentWeekStart.value)
  newDate.setDate(newDate.getDate() + 7)
  currentWeekStart.value = newDate
}

const onInstructorChange = () => {
  const instructor = instructors.value.find(i => i.id === selectedInstructor.value.id)
  if (instructor) {
    selectedInstructor.value = instructor
  }
}

const getLessonForSlot = (date: string, time: string) => {
  return lessons.value.find(lesson => lesson.date === date && lesson.time === time)
}

const getLessonTypeClass = (lesson: Lesson | undefined) => {
  if (!lesson) return ''
  
  switch (lesson.type) {
    case 'intro':
      return 'bg-blue-200 border-l-4 border-blue-500'
    case 'advanced':
      return 'bg-green-200 border-l-4 border-green-500'
    case 'private':
      return 'bg-purple-200 border-l-4 border-purple-500'
    case 'group':
      return 'bg-orange-200 border-l-4 border-orange-500'
    case 'wedding':
      return 'bg-yellow-200 border-l-4 border-yellow-500'
    default:
      return 'bg-gray-200 border-l-4 border-gray-500'
  }
}

const getBadgeClass = (lesson: Lesson) => {
  switch (lesson.type) {
    case 'intro':
      return 'bg-blue-100 text-blue-800'
    case 'advanced':
      return 'bg-green-100 text-green-800'
    case 'wedding':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getLessonBadgeText = (lesson: Lesson) => {
  return lesson.level
}

const handleCellClick = (time: string, date: string) => {
  const existingLesson = getLessonForSlot(date, time)
  if (!existingLesson) {
    console.log('Add lesson:', date, time)
  }
}

const editLesson = (lesson: Lesson) => {
  console.log('Edit lesson:', lesson)
}

// Drag and drop functionality
let draggedLesson: Lesson | null = null

const handleDragStart = (event: DragEvent, lesson: Lesson) => {
  draggedLesson = lesson
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', lesson.id)
  }
  console.log('Drag started:', lesson.studentNames)
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = true
}

const handleDragEnter = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = true
}

const handleDragLeave = (event: DragEvent) => {
  isDragOver.value = false
}

const handleDrop = (event: DragEvent, time: string, date: string) => {
  event.preventDefault()
  isDragOver.value = false
  
  if (draggedLesson) {
    console.log('Dropping lesson:', draggedLesson.studentNames, 'to', date, time)
    
    // Check if slot is already occupied
    const existingLesson = getLessonForSlot(date, time)
    if (existingLesson) {
      console.log('Slot already occupied')
      return
    }
    
    // Update lesson time and date
    const lessonIndex = lessons.value.findIndex(l => l.id === draggedLesson!.id)
    if (lessonIndex !== -1) {
      lessons.value[lessonIndex] = {
        ...draggedLesson,
        time,
        date
      }
      console.log('Lesson moved successfully')
    }
    draggedLesson = null
  }
}

// Lifecycle
onMounted(() => {
  updateTime()
  setInterval(updateTime, 60000)
})
</script>

<style scoped>
.lesson-tile {
  transition: all 0.2s ease;
}

.lesson-tile:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.drop-zone {
  transition: all 0.2s ease;
}
</style>