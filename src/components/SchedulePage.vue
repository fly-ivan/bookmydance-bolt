<template>
  <div class="schedule-page-container">
    <ScheduleHeader
      :instructors="instructors"
      :selected-instructor="selectedInstructor"
      :current-week-display="currentWeekDisplay"
      :show-weekend="showWeekend"
      @update:selected-instructor="selectedInstructor = $event"
      @update:show-weekend="showWeekend = $event"
      @previous-week="previousWeek"
      @next-week="nextWeek"
    />

    <!-- Main Schedule Grid Container -->
    <div class="schedule-container">
      <!-- Time Column Header -->
      <div class="time-header">Time</div>
      
      <!-- Day Headers -->
      <div 
        v-for="day in currentWeekDays" 
        :key="`header-${day.date.toISOString()}`"
        class="day-header"
      >
        <div class="day-name">{{ day.dayName }}</div>
        <div class="day-date">{{ day.month }}/{{ day.dayNumber }}</div>
      </div>
      
      <!-- Time Slots and Grid Cells -->
      <template v-for="(slot, slotIndex) in timeSlots" :key="slot.time">
        <!-- Time Slot -->
        <div class="time-slot">
          <div class="time-main">{{ slot.displayTime }}</div>
          <div class="time-end">{{ slot.endTime }}</div>
        </div>
        
        <!-- Grid Cells for this time slot -->
        <div 
          v-for="day in currentWeekDays" 
          :key="`${day.date.toISOString()}-${slot.time}`"
          class="grid-cell"
          @click="handleCellClick(slot.time, day.date)"
          @dragover.prevent="handleDragOver"
          @drop="handleDrop($event, slot.time, day.date)"
        >
          <div 
            v-if="getLessonForSlot(slot.time, day.date)"
            class="lesson-tile"
            draggable="true"
            @dragstart="handleDragStart($event, getLessonForSlot(slot.time, day.date)!)"
            @click.stop="editLesson(getLessonForSlot(slot.time, day.date)!)"
            @cancel="handleCancelLesson"
            @copy-phone="handleCopyPhone"  
            @post="handlePostLesson"
          >
            <LessonTile :lesson="getLessonForSlot(slot.time, day.date)!" />
          </div>
          <button v-else class="add-lesson-btn">
            <Plus :size="16" />
          </button>
        </div>
      </template>
      
      <!-- Studio Totals Row -->
      <!-- Empty cells for studio totals row - removed from grid -->
    </div>

    <!-- Bottom Totals -->
    <div class="totals-container">
      <!-- Studio Totals in time column position -->
      <div class="studio-totals-bottom">
        <div class="totals-header">Studio Totals</div>
        <div class="totals-content">
          <div class="total-lessons">
            <span class="total-number">{{ totalLessons }}</span>
            <span class="total-label">Lessons</span>
          </div>
          <div class="total-revenue">
            <span class="total-number">${{ totalRevenue }}</span>
            <span class="total-label">Revenue</span>
          </div>
        </div>
      </div>
      
      <!-- Totals for each day -->
      <div 
        v-for="(day, index) in currentWeekDays" 
        :key="`total-${day.date.toISOString()}`"
        class="day-total"
      >
        <div class="lesson-count">
          <span class="count-number">{{ dailyStats[index]?.lessonCount || 0 }}</span>
          <span class="count-label">Lessons</span>
        </div>
        <div class="revenue-total">
          <span class="revenue-number">${{ dailyStats[index]?.revenue || 0 }}</span>
          <span class="revenue-label">Revenue</span>
        </div>
      </div>
    </div>

    <LessonModal
      :is-open="isModalOpen"
      :lesson="selectedLesson"
      :selected-time="selectedTime"
      :selected-date="selectedDate"
      :instructors="instructors"
      :time-slots="timeSlots"
      @close="closeModal"
      @save="handleSaveLesson"
      @update="handleUpdateLesson"
      @delete="handleDeleteLesson"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Plus } from 'lucide-vue-next';
import ScheduleHeader from './schedule/ScheduleHeader.vue';
import LessonTile from './schedule/LessonTile.vue';
import LessonModal from './LessonModal.vue';
import { useStudioSchedule } from '../composables/useStudioSchedule';
import type { DanceLesson } from '../types/Event';

const {
  currentWeekDisplay,
  instructors,
  selectedInstructor,
  lessons,
  timeSlots,
  weekDays,
  dailyStats,
  previousWeek,
  nextWeek,
  addLesson,
  updateLesson,
  deleteLesson
} = useStudioSchedule();

const showWeekend = ref(false);
const isModalOpen = ref(false);
const selectedLesson = ref<DanceLesson | undefined>();
const selectedTime = ref<string | undefined>();
const selectedDate = ref<Date | undefined>();

const currentWeekDays = computed(() => {
  const dayCount = showWeekend.value ? 7 : 5;
  const days: any[] = [];
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  for (let i = 0; i < dayCount; i++) {
    const date = new Date(weekDays.value[0].date);
    date.setDate(date.getDate() + i);
    
    days.push({
      date,
      dayName: dayNames[i],
      dayNumber: date.getDate(),
      month: date.getMonth() + 1,
      lessons: []
    });
  }
  
  return days;
});

const totalLessons = computed(() => {
  return lessons.value.filter(lesson => 
    lesson.instructorId === selectedInstructor.value.id
  ).length;
});

const totalRevenue = computed(() => {
  return lessons.value
    .filter(lesson => lesson.instructorId === selectedInstructor.value.id)
    .reduce((sum, lesson) => sum + lesson.price, 0);
});


const getLessonForSlot = (time: string, date: Date) => {
  const dateString = date.toISOString().split('T')[0];
  return lessons.value.find(lesson => 
    lesson.startTime === time && 
    lesson.date === dateString &&
    lesson.instructorId === selectedInstructor.value.id
  );
};

let draggedLesson: DanceLesson | null = null;

const handleDragStart = (event: DragEvent, lesson: DanceLesson) => {
  draggedLesson = lesson;
  console.log('Drag started:', lesson.studentNames);
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
};

const handleDrop = (event: DragEvent, time: string, date: Date) => {
  event.preventDefault();
  
  const dateString = date.toISOString().split('T')[0];
  
  if (draggedLesson) {
    console.log('Dropping lesson:', draggedLesson.studentNames, 'to', dateString, time);
    
    const existingLesson = getLessonForSlot(time, date);
    if (existingLesson) {
      console.log('Slot already occupied');
      return;
    }
    
    // Update lesson
    updateLesson(draggedLesson.id, {
      ...draggedLesson,
      startTime: time,
      date: dateString
    });
    
    draggedLesson = null;
  }
};

const handleCellClick = (time: string, date: Date) => {
  const existingLesson = getLessonForSlot(time, date);
  if (!existingLesson) {
    openLessonModal(time, date);
  }
};

const openLessonModal = (time: string, date: Date) => {
  selectedLesson.value = undefined;
  selectedTime.value = time;
  selectedDate.value = date;
  isModalOpen.value = true;
};

const editLesson = (lesson: DanceLesson) => {
  selectedLesson.value = lesson;
  selectedTime.value = undefined;
  selectedDate.value = undefined;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedLesson.value = undefined;
  selectedTime.value = undefined;
  selectedDate.value = undefined;
};

const handleSaveLesson = (lesson: Omit<DanceLesson, 'id'>) => {
  addLesson(lesson);
};

const handleUpdateLesson = (lessonId: string, lesson: Omit<DanceLesson, 'id'>) => {
  updateLesson(lessonId, lesson);
};

const handleDeleteLesson = (lessonId: string) => {
  deleteLesson(lessonId);
};

const handleCancelLesson = (lessonId: string) => {
  console.log('Cancel lesson:', lessonId);
  // Handle lesson cancellation
  deleteLesson(lessonId);
};

const handleCopyPhone = (lessonId: string) => {
  console.log('Phone copied for lesson:', lessonId);
  // Phone number copying is handled in LessonTile component
};

const handlePostLesson = (lessonId: string) => {
  console.log('Post lesson:', lessonId);
  // Handle lesson posting logic
};
</script>

<style scoped>
.schedule-page-container {
  flex: 1;
  padding: 0.75rem;
  background: var(--bg-secondary);
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Main Schedule Grid Container */
.schedule-container {
  background: var(--bg-primary);
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 112px repeat(v-bind(showWeekend ? 7 : 5), 1fr);
  gap: 4px;
  padding: 6px;
  grid-template-rows: 48px repeat(10, 64px);
  border: 1px solid var(--border-primary);
}

.schedule-container {
  --day-count: v-bind(showWeekend ? 7 : 5);
}

/* Time Column Header */
.time-header {
  background: var(--time-column-header);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  border-radius: 8px;
  grid-column: 1;
  grid-row: 1;
  border: 1px solid var(--border-secondary);
  width: 112px;
  margin: 0;
}

/* Day Headers */
.day-header {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.75rem;
  gap: 0.5rem;
}

.day-name {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 1rem;
}

.day-date {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-top: 0;
}

/* Time Slots */
.time-slot {
  background: var(--time-column-bg);
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  padding: 0.5rem;
  grid-column: 1;
  text-align: center;
  border: 1px solid var(--border-secondary);
  width: 112px;
  margin: 0;
}

.time-main {
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1;
}

.time-end {
  font-size: 0.75rem;
  opacity: 0.8;
  line-height: 1;
}


/* Studio Totals */
.studio-totals-bottom {
  background: var(--time-column-header);
  color: var(--text-primary);
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--border-secondary);
  width: 112px;
  margin: 0;
}

.totals-header {
  font-weight: 600;
  font-size: 0.75rem;
  text-align: center;
  opacity: 0.9;
}

.totals-content {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.total-lessons, .total-revenue {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.total-number {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
}

.total-label {
  font-size: 0.65rem;
  opacity: 0.8;
  line-height: 1;
}


/* Grid Cells */
.grid-cell {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 4px;
  position: relative;
}

.grid-cell:hover:not(:has(.lesson-tile)) {
  background: var(--bg-tertiary);
  border-color: var(--accent-blue);
}

.lesson-tile {
  width: 100%;
  height: 100%;
  cursor: move;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.lesson-tile:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.lesson-tile-wrapper {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  overflow: hidden;
}

.add-lesson-btn {
  background: transparent;
  border: 2px dashed var(--border-secondary);
  color: var(--text-tertiary);
  border-radius: 6px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0;
}

.grid-cell:hover .add-lesson-btn {
  opacity: 1;
  border-color: var(--accent-blue);
  color: var(--accent-blue);
}

/* Bottom Totals */
.totals-container {
  background: var(--bg-primary);
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
  padding: 8px;
  display: grid;
  grid-template-columns: 112px repeat(v-bind(showWeekend ? 7 : 5), 1fr);
  gap: 8px;
  align-items: center;
  border: 1px solid var(--border-primary);
}

.totals-time-spacer {
  /* Empty space to align with time column */
}

.day-total {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 0.75rem;
  background: var(--bg-tertiary);
  border-radius: 8px;
  border: 1px solid var(--border-primary);
}

.lesson-count {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(59, 130, 246, 0.1);
  color: #6b7280; /* text-gray-500 */
  padding: 0.5rem;
  border-radius: 8px;
  min-width: 60px;
  font-family: 'Inter', sans-serif;
}

.count-number {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1;
}

.count-label {
  font-size: 0.75rem;
  font-weight: 500;
  opacity: 0.8;
}

.revenue-total {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(16, 185, 129, 0.1);
  color: #6b7280; /* text-gray-500 */
  padding: 0.5rem;
  border-radius: 8px;
  min-width: 70px;
  font-family: 'Inter', sans-serif;
}

.revenue-number {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1;
}

.revenue-label {
  font-size: 0.75rem;
  font-weight: 500;
  opacity: 0.8;
}

/* Weekend Support */
.schedule-container:has(.show-weekend) {
  --day-count: 7;
}

@media (max-width: 1024px) {
  .schedule-page-container {
    padding: 0.5rem;
  }
  
  .schedule-container {
    grid-template-columns: 120px repeat(var(--day-count, 5), 1fr);
  }
  
  .totals-container {
    grid-template-columns: 120px repeat(var(--day-count, 5), 1fr);
  }
}
</style>