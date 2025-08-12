<template>
  <div class="lesson-grid">
    <!-- Day Headers -->
    <div class="grid-header">
      <div 
        v-for="day in weekDays" 
        :key="day.date.toISOString()"
        class="day-header"
      >
        <div class="day-name">{{ day.dayName }}</div>
        <div class="day-date">{{ day.month }}/{{ day.dayNumber }}</div>
      </div>
    </div>

    <!-- Grid Body -->
    <div class="grid-body">
      <div 
        v-for="slot in timeSlots" 
        :key="slot.time"
        class="time-row"
      >
        <div 
          v-for="day in weekDays" 
          :key="`${day.date.toISOString()}-${slot.time}`"
          :class="['grid-cell', { 'has-lesson': getLessonForSlot(slot.time, day.date) }]"
          @click="handleCellClick(slot.time, day.date)"
        >
          <LessonTile 
            v-if="getLessonForSlot(slot.time, day.date)"
            :lesson="getLessonForSlot(slot.time, day.date)!"
            @click="editLesson(getLessonForSlot(slot.time, day.date)!)"
            @cancel="handleCancelLesson"
            @copy-phone="handleCopyPhone"
            @post="handlePostLesson"
          />
          <button v-else class="add-lesson-btn">
            <Plus :size="16" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from 'lucide-vue-next';
import LessonTile from './LessonTile.vue';
import type { DanceLesson, TimeSlot, WeekDay } from '../../types/Event';

interface Props {
  timeSlots: TimeSlot[];
  weekDays: WeekDay[];
  lessons: DanceLesson[];
  selectedInstructorId: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  openLessonModal: [time: string, date: Date];
  editLesson: [lesson: DanceLesson];
}>();

const getLessonForSlot = (time: string, date: Date) => {
  const dateString = date.toISOString().split('T')[0];
  return props.lessons.find(lesson => 
    lesson.startTime === time && 
    lesson.date === dateString &&
    lesson.instructorId === props.selectedInstructorId
  );
};

const handleCellClick = (time: string, date: Date) => {
  const existingLesson = getLessonForSlot(time, date);
  if (!existingLesson) {
    emit('openLessonModal', time, date);
  }
};

const editLesson = (lesson: DanceLesson) => {
  emit('editLesson', lesson);
};

const handleCancelLesson = (lessonId: string) => {
  console.log('Cancel lesson:', lessonId);
  // You can emit this to parent or handle cancellation logic
};

const handleCopyPhone = (lessonId: string) => {
  console.log('Phone copied for lesson:', lessonId);
  // Phone number is already copied in the LessonTile component
};

const handlePostLesson = (lessonId: string) => {
  console.log('Post lesson:', lessonId);
  // You can emit this to parent or handle posting logic
};
</script>

<style scoped>
.lesson-grid {
  background: white;
  border-radius: 0 12px 12px 0;
  overflow: hidden;
  flex: 1;
}

.grid-header {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background: #f8fafc;
  border-bottom: 2px solid #e2e8f0;
}

.day-header {
  padding: 1rem;
  text-align: center;
  border-right: 1px solid #e2e8f0;
  background: #f1f5f9;
}

.day-header:last-child {
  border-right: none;
}

.day-name {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.875rem;
}

.day-date {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

.grid-body {
  display: flex;
  flex-direction: column;
}

.time-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  border-bottom: 1px solid #e2e8f0;
}

.time-row:last-child {
  border-bottom: none;
}

.grid-cell {
  height: 80px;
  border-right: 1px solid #e2e8f0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafbfc;
  cursor: pointer;
  transition: all 0.2s ease;
}

.grid-cell:last-child {
  border-right: none;
}

.grid-cell:hover:not(.has-lesson) {
  background: #f0f9ff;
}

.grid-cell.has-lesson {
  padding: 0;
  cursor: default;
}

.add-lesson-btn {
  background: transparent;
  border: 2px dashed #cbd5e1;
  color: #94a3b8;
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
  border-color: #3b82f6;
  color: #3b82f6;
}

.add-lesson-btn:hover {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}
</style>