<template>
  <div :class="['lesson-tile', getLessonTypeClass()]">
    <div class="lesson-header">
      <div class="time-range">
        <div class="start-time">{{ formatTime(lesson.startTime) }}</div>
        <div class="end-time">{{ formatTime(lesson.endTime) }}</div>
      </div>
      <div class="text-right">
        <span class="font-bold text-gray-900">${{ lesson.price }}</span>
      </div>
    </div>
    <div class="lesson-body">
      <div class="student-name">{{ lesson.studentNames }}</div>
      <div class="lesson-details">
        <span :class="['lesson-type-icon', getTypeIconClass()]">{{ getTypeIcon() }}</span>
        <span class="lesson-type-text">{{ getBadgeText() }}</span>
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

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

const getLessonTypeClass = () => {
  // Map lesson types to colors based on the reference
  const typeMapping: Record<string, string> = {
    'private': 'intro',
    'group': 'advanced', 
    'wedding': 'free',
    'competition': 'advanced'
  };
  
  const mappedType = typeMapping[props.lesson.lessonType] || 'intro';
  
  switch (mappedType) {
    case 'intro':
      return 'lesson-intro';
    case 'advanced':
      return 'lesson-advanced';
    case 'free':
      return 'lesson-free';
    default:
      return 'lesson-intro';
  }
};

const getBadgeClass = () => {
  switch (props.lesson.lessonType) {
    case 'private':
      return 'bg-blue-100 text-blue-800';
    case 'group':
      return 'bg-orange-100 text-orange-800';
    case 'wedding':
      return 'bg-yellow-100 text-yellow-800';
    case 'competition':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getBadgeText = () => {
  // Map lesson types to display text
  const typeMapping: Record<string, string> = {
    'private': 'intro',
    'group': 'advanced',
    'wedding': 'free', 
    'competition': 'advanced'
  };
  
  const mappedType = typeMapping[props.lesson.lessonType] || 'intro';
  
  switch (mappedType) {
    case 'intro':
      return 'Intro';
    case 'advanced':
      return 'Advanced';
    case 'free':
      return 'Free';
    default:
      return 'Intro';
  }
};

const getTypeIcon = () => {
  switch (props.lesson.lessonType) {
    case 'private':
      return '♦';
    case 'group':
      return '👥';
    case 'wedding':
      return '♦';
    case 'competition':
      return '♦';
    default:
      return '♦';
  }
}

const getTypeIconClass = () => {
  switch (props.lesson.lessonType) {
    case 'private':
      return 'icon-intro';
    case 'group':
      return 'icon-group';
    case 'wedding':
      return 'icon-free';
    case 'competition':
      return 'icon-advanced';
    default:
      return 'icon-default';
  }
}
</script>

<style scoped>
.lesson-tile {
  background: white;
  border-radius: 6px;
  padding: 6px 8px;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 11px;
  line-height: 1.2;
  cursor: move;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-left: 3px solid;
}

/* Lesson type colors - matching reference exactly */
.lesson-intro {
  background: #dbeafe;
  border-left-color: #3b82f6;
}

.lesson-advanced {
  background: #dcfce7;
  border-left-color: #22c55e;
}

.lesson-free {
  background: #fce7f3;
  border-left-color: #ec4899;
}

.lesson-header {
  margin-bottom: 4px;
}

.time-range {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.start-time {
  font-weight: 600;
  color: #1f2937;
  font-size: 11px;
}

.end-time {
  font-size: 10px;
  color: #6b7280;
}

.lesson-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.student-name {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
  font-size: 12px;
}

.lesson-details {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
}

.lesson-type-icon {
  font-size: 8px;
}

.icon-intro, .icon-free {
  color: #ec4899;
}

.icon-advanced {
  color: #22c55e;
}

.icon-group {
  color: #3b82f6;
}

.lesson-type-text {
  color: #6b7280;
  font-weight: 500;
}

.lesson-price {
  color: #059669;
  font-weight: 600;
  margin-left: auto;
}

.lesson-tile:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>