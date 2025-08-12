<template>
  <div :class="['lesson-tile', getLessonTypeClass()]">
    <!-- Top Right Corner - Cancel Lesson -->
    <button 
      class="corner-button top-right cancel-button"
      @click.stop="handleCancel"
      title="Cancel Lesson"
    >
      <X :size="12" />
    </button>
    
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
    
    <!-- Bottom Left Corner - Copy Phone -->
    <button 
      class="corner-button bottom-left phone-button"
      @click.stop="handleCopyPhone"
      title="Copy Phone Number"
    >
      <Phone :size="12" />
    </button>
    
    <!-- Bottom Right Corner - Post Lesson -->
    <button 
      class="corner-button bottom-right post-button"
      @click.stop="handlePost"
      title="Post Lesson"
    >
      <Send :size="12" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { X, Phone, Send } from 'lucide-vue-next';
import type { DanceLesson } from '../../types/Event';

interface Props {
  lesson: DanceLesson;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  cancel: [lessonId: string];
  copyPhone: [lessonId: string];
  post: [lessonId: string];
}>();

const formatTimeShort = (time: string) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes}`;
};

const handleCancel = () => {
  emit('cancel', props.lesson.id);
};

const handleCopyPhone = async () => {
  // Mock phone number - in real app, this would come from student data
  const phoneNumber = '(555) 123-4567';
  
  try {
    await navigator.clipboard.writeText(phoneNumber);
    console.log('Phone number copied:', phoneNumber);
    // You could show a toast notification here
  } catch (err) {
    console.error('Failed to copy phone number:', err);
  }
  
  emit('copyPhone', props.lesson.id);
};

const handlePost = () => {
  emit('post', props.lesson.id);
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
  position: relative;
}

.lesson-tile:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.lesson-tile:hover .corner-button {
  opacity: 1;
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

/* Corner Buttons */
.corner-button {
  position: absolute;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s ease;
  z-index: 10;
}

.corner-button:hover {
  transform: scale(1.1);
}

/* Top Right - Cancel (Red) */
.top-right {
  top: -8px;
  right: -8px;
}

.cancel-button {
  background: #ef4444;
  color: white;
}

.cancel-button:hover {
  background: #dc2626;
}

/* Bottom Left - Phone (Blue) */
.bottom-left {
  bottom: -8px;
  left: -8px;
}

.phone-button {
  background: #3b82f6;
  color: white;
}

.phone-button:hover {
  background: #2563eb;
}

/* Bottom Right - Post (Orange) */
.bottom-right {
  bottom: -8px;
  right: -8px;
}

.post-button {
  background: #f59e0b;
  color: white;
}

.post-button:hover {
  background: #d97706;
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