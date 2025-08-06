<template>
  <div class="schedule-header">
    <div class="header-left">
      <LiveClock />
    </div>

    <div class="header-center">
      <div class="instructor-selector">
        <select :value="selectedInstructor.id" @change="onInstructorChange" class="instructor-select">
          <option v-for="instructor in instructors" :key="instructor.id" :value="instructor.id">
            {{ instructor.name }}
          </option>
        </select>
      </div>

      <div class="date-navigation">
        <button @click="previousWeek" class="nav-button">
          <ChevronLeft :size="16" />
        </button>
        <div class="date-display">
          {{ currentWeekDisplay }}
        </div>
        <button @click="nextWeek" class="nav-button">
          <ChevronRight :size="16" />
        </button>
      </div>
    </div>

    <div class="header-right">
      <button 
        @click="toggleWeekend" 
        :class="['weekend-toggle', { active: showWeekend }]"
      >
        Show Weekend
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import LiveClock from './LiveClock.vue';
import type { Instructor } from '../../types/Event';

interface Props {
  instructors: Instructor[];
  selectedInstructor: Instructor;
  currentWeekDisplay: string;
  showWeekend: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:selectedInstructor': [instructor: Instructor];
  'update:showWeekend': [show: boolean];
  previousWeek: [];
  nextWeek: [];
}>();

const toggleWeekend = () => {
  emit('update:showWeekend', !props.showWeekend);
};

const previousWeek = () => {
  emit('previousWeek');
};

const nextWeek = () => {
  emit('nextWeek');
};

const onInstructorChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const selectedId = target.value;
  const instructor = props.instructors.find(i => i.id === selectedId);
  if (instructor) {
    emit('update:selectedInstructor', instructor);
  }
};
</script>

<style scoped>
.schedule-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--sidebar-bg);
  color: var(--text-primary);
  padding: 0.75rem 1rem;
  border-radius: 12px;
  margin-bottom: 0.75rem;
  border: 1px solid var(--border-primary);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0;
  width: 120px;
  justify-content: center;
  flex-shrink: 0;
}

.header-center {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.instructor-selector {
  position: relative;
}

.instructor-select {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  min-width: 120px;
}

.instructor-select:focus {
  outline: none;
  border-color: var(--accent-blue);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.date-navigation {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-button {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: var(--text-primary);
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.date-display {
  font-size: 0.875rem;
  font-weight: 500;
  min-width: 140px;
  text-align: center;
}

.header-right {
  display: flex;
  align-items: center;
}

.weekend-toggle {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.weekend-toggle:hover {
  background: rgba(255, 255, 255, 0.2);
}

.weekend-toggle.active {
  background: var(--accent-blue);
  border-color: var(--accent-blue);
  color: white;
}

@media (max-width: 1024px) {
  .schedule-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .header-center {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>