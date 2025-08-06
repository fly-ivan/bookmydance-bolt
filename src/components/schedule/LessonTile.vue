<template>
  <div :class="['lesson-tile', getLessonTypeClass()]">
    <div class="lesson-content">
      <!-- First line: Time + Student Name -->
      <div class="lesson-first-line">
        <span class="lesson-time">{{ formatTimeShort(lesson.startTime) }}</span>
        <span class="lesson-student">{{ lesson.studentNames }}</span>
      </div>
      
      <!-- Second line: Type + Price -->
      <div class="lesson-second-line">
        <span class="lesson-type">{{ getBadgeText() }}</span>
        <span class="lesson-price">${{ lesson.price }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DanceLesson } from '../../types/Event';

interface Props {
  lesson: DanceLesson;
}

const props = defineProps<Props>();

const formatTimeShort = (time: string) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes}`;
};

const getLessonTypeClass = () => {
  const type = props.lesson.lessonType;
  switch (type) {
    case 'private':
      return 'lesson-intro';
    case 'group':
      return 'lesson-advanced';
    case 'wedding':
      return 'lesson-free';
    case 'competition':
      return 'lesson-advanced';
    default:
      return 'lesson-intro';
  }
};

const getBadgeText = () => {
  const type = props.lesson.lessonType;
  switch (type) {
    case 'private':
      return 'Intro';
    case 'group':
      return 'Advanced';
    case 'wedding':
      return 'Free';
    case 'competition':
      return 'Advanced';
    default:
      return 'Intro';
  }
};
</script>

<style scoped>
.lesson-tile {
  background: var(--bg-primary);
  border-radius: 8px;
  padding: 8px;
  height: 100%;
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: 4px solid;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
}

.lesson-tile:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Background colors with Tailwind equivalents */
.lesson-intro {
  background-color: #dbeafe; /* bg-blue-100 */
  border-left-color: #3b82f6; /* border-blue-500 */
}

.lesson-advanced {
  background-color: #dcfce7; /* bg-green-100 */
  border-left-color: #22c55e; /* border-green-500 */
}

.lesson-free {
  background-color: #fce7f3; /* bg-pink-100 */
  border-left-color: #ec4899; /* border-pink-500 */
}

.lesson-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: 100%;
  justify-content: center;
}

.lesson-first-line {
  display: flex;
  align-items: center;
  gap: 6px;
}

.lesson-time {
  font-size: 11px;
  font-weight: 600;
  color: #4b5563; /* text-gray-600 - slightly lighter */
  min-width: 35px;
}

.lesson-student {
  font-size: 13px;
  font-weight: 700;
  color: #1f2937; /* text-gray-800 - darker for better readability */
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.lesson-second-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lesson-type {
  font-size: 10px;
  font-weight: 500;
  color: #6b7280; /* text-gray-500 - lighter for secondary info */
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.lesson-price {
  font-size: 13px;
  font-weight: 700;
  color: #059669; /* text-emerald-600 - green for money */
}

@media (max-width: 1024px) {
  .lesson-tile {
    padding: 8px;
  }
  
  .lesson-time {
    font-size: 12px;
    min-width: 35px;
  }
  
  .lesson-student {
    font-size: 14px;
  }
  
  .lesson-type {
    font-size: 11px;
  }
  
  .lesson-price {
    font-size: 12px;
  }
}
</style>