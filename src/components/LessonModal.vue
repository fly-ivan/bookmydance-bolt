<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <div class="header-content">
          <div class="header-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="m18.5 2.5 a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="header-text">
            <h3>{{ isEditing ? `Edit Lesson for ${formData.studentNames}` : 'Schedule New Lesson' }}</h3>
            <div v-if="isEditing" class="lesson-info">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>{{ formatDate(formData.date) }} {{ formatTime(formData.startTime) }} - {{ formatTime(formData.endTime) }}</span>
              <span class="duration-badge">{{ formData.duration }} min lesson</span>
            </div>
          </div>
        </div>
        <button @click="closeModal" class="close-button">
          <X :size="20" />
        </button>
      </div>
      
      <form @submit.prevent="handleSubmit" class="modal-form">
        <!-- Client/Student with Autocomplete -->
        <div class="form-group">
          <label for="studentNames">Client / Student</label>
          <div class="autocomplete-container">
            <input
              id="studentNames"
              v-model="formData.studentNames"
              type="text"
              placeholder="Start typing student name..."
              required
              class="form-input"
              @input="handleStudentInput"
              @focus="showSuggestions = true"
              @blur="hideSuggestions"
            />
            <div v-if="showSuggestions && filteredStudents.length > 0" class="suggestions-dropdown">
              <div 
                v-for="student in filteredStudents" 
                :key="student.id"
                class="suggestion-item"
                @mousedown="selectStudent(student)"
              >
                <div class="student-info">
                  <div class="student-name">{{ student.name }}</div>
                  <div class="student-details">{{ student.phone }} • {{ student.lessonCount }} lessons</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Phone Number -->
        <div class="form-group">
          <label for="phoneNumber">Phone Number</label>
          <div class="phone-input">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <input
              id="phoneNumber"
              v-model="formData.phoneNumber"
              type="tel"
              placeholder="(555) 123-4567"
              class="form-input phone-field"
            />
          </div>
        </div>

        <!-- Lesson Type Buttons -->
        <div class="form-group">
          <label>Lesson Type</label>
          <div class="lesson-type-buttons">
            <button
              type="button"
              :class="['type-button', { active: formData.lessonType === 'private' }]"
              @click="formData.lessonType = 'private'"
            >
              Free
            </button>
            <button
              type="button"
              :class="['type-button', { active: formData.lessonType === 'group' }]"
              @click="formData.lessonType = 'group'"
            >
              Intro
            </button>
            <button
              type="button"
              :class="['type-button', { active: formData.lessonType === 'competition' }]"
              @click="formData.lessonType = 'competition'"
            >
              Advanced
            </button>
          </div>
        </div>

        <!-- Price -->
        <div class="form-group">
          <label for="price">Price ($)</label>
          <input
            id="price"
            v-model.number="formData.price"
            type="number"
            min="0"
            step="5"
            required
            class="form-input"
            placeholder="75"
          />
        </div>

        <!-- Notes/Description -->
        <div class="form-group">
          <label for="notes">Notes/Description</label>
          <textarea
            id="notes"
            v-model="formData.notes"
            placeholder="Any special notes about this lesson..."
            rows="4"
            class="form-input"
          ></textarea>
        </div>
        
        <div class="modal-actions">
          <button v-if="isEditing" type="button" @click="handleDelete" class="btn-danger">
            Delete Lesson
          </button>
          <button type="button" @click="closeModal" class="btn-secondary">
            Cancel
          </button>
          <button type="submit" class="btn-primary">
            {{ isEditing ? 'Update Lesson' : 'Schedule Lesson' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, computed, ref } from 'vue';
import { X } from 'lucide-vue-next';
import type { DanceLesson, DanceStyle, LessonType, Instructor, TimeSlot } from '../types/Event';

interface Student {
  id: string;
  name: string;
  phone: string;
  lessonCount: number;
}

interface Props {
  isOpen: boolean;
  lesson?: DanceLesson;
  selectedTime?: string;
  selectedDate?: Date;
  instructors: Instructor[];
  timeSlots: TimeSlot[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [];
  save: [lesson: Omit<DanceLesson, 'id'>];
  update: [lessonId: string, lesson: Omit<DanceLesson, 'id'>];
  delete: [lessonId: string];
}>();

// Sample student data for autocomplete
const students = ref<Student[]>([
  { id: '1', name: 'Stephanie & Carlo', phone: '(555) 123-4567', lessonCount: 12 },
  { id: '2', name: 'Kate Schwitz', phone: '(555) 234-5678', lessonCount: 8 },
  { id: '3', name: 'Debbie & Bryan', phone: '(555) 345-6789', lessonCount: 15 },
  { id: '4', name: 'Emily & Johnny', phone: '(555) 456-7890', lessonCount: 6 },
  { id: '5', name: 'Lourdes Rivera', phone: '(555) 567-8901', lessonCount: 20 },
  { id: '6', name: 'Carolin and John', phone: '(555) 678-9012', lessonCount: 4 },
  { id: '7', name: 'Sharon Bricker', phone: '(555) 789-0123', lessonCount: 18 },
]);

const showSuggestions = ref(false);
const filteredStudents = ref<Student[]>([]);

const formData = reactive({
  studentNames: '',
  phoneNumber: '',
  instructorId: '',
  startTime: '',
  endTime: '',
  date: '',
  danceStyle: 'waltz' as DanceStyle,
  lessonType: 'group' as LessonType,
  price: 75,
  duration: 40,
  notes: ''
});

const isEditing = computed(() => !!props.lesson);

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
};

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

const handleStudentInput = () => {
  const query = formData.studentNames.toLowerCase();
  if (query.length > 0) {
    filteredStudents.value = students.value.filter(student =>
      student.name.toLowerCase().includes(query)
    );
    showSuggestions.value = true;
  } else {
    filteredStudents.value = [];
    showSuggestions.value = false;
  }
};

const selectStudent = (student: Student) => {
  formData.studentNames = student.name;
  formData.phoneNumber = student.phone;
  showSuggestions.value = false;
};

const hideSuggestions = () => {
  setTimeout(() => {
    showSuggestions.value = false;
  }, 200);
};

const updateEndTime = () => {
  if (formData.startTime && formData.duration) {
    const [hours, minutes] = formData.startTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0);
    
    const endDate = new Date(startDate.getTime() + formData.duration * 60000);
    formData.endTime = endDate.toTimeString().slice(0, 5);
  }
};

const resetForm = () => {
  formData.studentNames = '';
  formData.phoneNumber = '';
  formData.instructorId = props.instructors[0]?.id || '';
  formData.startTime = '';
  formData.endTime = '';
  formData.date = '';
  formData.danceStyle = 'waltz';
  formData.lessonType = 'group';
  formData.price = 75;
  formData.duration = 40;
  formData.notes = '';
};

const closeModal = () => {
  emit('close');
  resetForm();
};

const handleSubmit = () => {
  if (isEditing.value && props.lesson) {
    emit('update', props.lesson.id, { ...formData });
  } else {
    emit('save', { ...formData });
  }
  closeModal();
};

const handleDelete = () => {
  if (props.lesson) {
    emit('delete', props.lesson.id);
    closeModal();
  }
};

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    if (props.lesson) {
      // Edit mode
      Object.assign(formData, props.lesson);
    } else {
      // Add mode
      resetForm();
      if (props.selectedDate) {
        formData.date = props.selectedDate.toISOString().split('T')[0];
      }
      if (props.selectedTime) {
        formData.startTime = props.selectedTime;
        updateEndTime();
      }
    }
  }
});

watch(() => formData.lessonType, (newType) => {
  // Adjust default pricing based on lesson type
  switch (newType) {
    case 'private':
      formData.price = 0; // Free
      break;
    case 'group':
      formData.price = 75; // Intro
      break;
    case 'competition':
      formData.price = 120; // Advanced
      break;
  }
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  font-family: 'Inter', sans-serif;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  border-radius: 12px 12px 0 0;
}

.header-content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  flex: 1;
}

.header-icon {
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.header-text h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.3;
}

.lesson-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  opacity: 0.9;
  flex-wrap: wrap;
}

.duration-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.125rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.close-button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.modal-form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  font-family: 'Inter', sans-serif;
}

.form-input:focus {
  outline: none;
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.form-input::placeholder {
  color: #9ca3af;
}

/* Autocomplete Styles */
.autocomplete-container {
  position: relative;
}

.suggestions-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #d1d5db;
  border-top: none;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
}

.suggestion-item {
  padding: 0.75rem;
  cursor: pointer;
  border-bottom: 1px solid #f3f4f6;
  transition: background-color 0.2s ease;
}

.suggestion-item:hover {
  background: #f9fafb;
}

.suggestion-item:last-child {
  border-bottom: none;
}

.student-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.student-name {
  font-weight: 500;
  color: #374151;
}

.student-details {
  font-size: 0.75rem;
  color: #6b7280;
}

/* Phone Input */
.phone-input {
  position: relative;
  display: flex;
  align-items: center;
}

.phone-input svg {
  position: absolute;
  left: 0.75rem;
  color: #9ca3af;
  z-index: 1;
}

.phone-field {
  padding-left: 2.5rem;
}

/* Lesson Type Buttons */
.lesson-type-buttons {
  display: flex;
  gap: 0.5rem;
  background: #f3f4f6;
  padding: 0.25rem;
  border-radius: 8px;
}

.type-button {
  flex: 1;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
  color: #6b7280;
  font-family: 'Inter', sans-serif;
}

.type-button.active {
  background: #3b82f6;
  color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.type-button:hover:not(.active) {
  background: #e5e7eb;
  color: #374151;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.btn-primary, .btn-secondary, .btn-danger {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  font-family: 'Inter', sans-serif;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

@media (max-width: 768px) {
  .modal-content {
    margin: 1rem;
    max-width: none;
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .lesson-type-buttons {
    flex-direction: column;
  }
}
</style>