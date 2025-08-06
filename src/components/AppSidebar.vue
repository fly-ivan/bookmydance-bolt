<template>
  <div :class="['sidebar', { expanded: isExpanded }]">
    <div class="sidebar-header">
      <div class="logo-section" @click="toggleSidebar">
        <img :src="logoSrc" alt="BookMyDance" class="logo-image" />
        <div v-if="isExpanded" class="logo-text">
          <div class="company-name">BookMyDance</div>
          <div class="tagline">Studio Management</div>
        </div>
      </div>
    </div>
    
    <nav class="sidebar-nav">
      <div :class="['nav-item', { active: currentPage === 'schedule' }]" @click.stop="navigateTo('schedule')">
        <Calendar :size="20" />
        <span v-if="isExpanded" class="nav-text">Schedule</span>
      </div>
      <div :class="['nav-item', { active: currentPage === 'instructors' }]" @click.stop="navigateTo('instructors')">
        <Users :size="20" />
        <span v-if="isExpanded" class="nav-text">Instructors</span>
      </div>
      <div :class="['nav-item', { active: currentPage === 'students' }]" @click.stop="navigateTo('students')">
        <Users :size="20" />
        <span v-if="isExpanded" class="nav-text">Students</span>
      </div>
      <div :class="['nav-item', { active: currentPage === 'reports' }]" @click.stop="navigateTo('reports')">
        <BarChart3 :size="20" />
        <span v-if="isExpanded" class="nav-text">Reports</span>
      </div>
      <div :class="['nav-item', { active: currentPage === 'payments' }]" @click.stop="navigateTo('payments')">
        <CreditCard :size="20" />
        <span v-if="isExpanded" class="nav-text">Payments</span>
      </div>
      <div :class="['nav-item', { active: currentPage === 'settings' }]" @click.stop="navigateTo('settings')">
        <Settings :size="20" />
        <span v-if="isExpanded" class="nav-text">Settings</span>
      </div>
    </nav>
    
    <!-- Theme Toggle at Bottom -->
    <div class="theme-toggle-container">
      <button @click.stop="toggleTheme" class="theme-toggle" :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
        <Sun v-if="isDark" :size="20" />
        <Moon v-else :size="20" />
        <span v-if="isExpanded" class="theme-text">
          {{ isDark ? 'Light Mode' : 'Dark Mode' }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Calendar, Users, Settings, BarChart3, CreditCard, Sun, Moon } from 'lucide-vue-next';
import { useTheme } from '../composables/useTheme';

const isExpanded = ref(false);
const currentPage = ref('schedule');
const { isDark, toggleTheme } = useTheme();

// Use different logo based on theme
const logoSrc = computed(() => {
  return isDark.value ? '/bookmydance-white-logo.svg' : '/bookmydance-black-logo.svg';
});

const emit = defineEmits<{
  navigate: [page: string];
}>();

const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value;
};

const navigateTo = (page: string) => {
  currentPage.value = page;
  emit('navigate', page);
};
</script>

<style scoped>
.sidebar {
  width: 80px;
  background: #1e293b;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0 1rem 0;
  transition: width 0.3s ease;
  position: relative;
  cursor: pointer;
  border-right: 1px solid var(--border-primary);
  color: var(--text-primary);
}

/* Ensure dark mode sidebar background */
[data-theme="dark"] .sidebar {
  background: #1e293b;
  border-right-color: #475569;
}

/* Light mode sidebar background */
[data-theme="light"] .sidebar,
.sidebar {
  background: #f1f5f9;
  border-right-color: #d1d5db;
}
.sidebar.expanded {
  width: 260px;
}

.sidebar-header {
  margin-bottom: 2.5rem;
  padding: 0 1.5rem;
}

.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  white-space: nowrap;
  cursor: pointer;
}

.logo-image {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
}

.logo-text {
  text-align: center;
  opacity: 0;
  animation: fadeIn 0.3s ease 0.1s forwards;
}

.company-name {
  color: var(--text-primary);
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.2;
  margin-bottom: 0.25rem;
}

.tagline {
  color: var(--text-secondary);
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.2;
  opacity: 0;
  animation: fadeIn 0.3s ease 0.1s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.sidebar:not(.expanded) .logo-text {
  display: none;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 1rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 8px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.nav-item:hover {
  background: #e2e8f0;
  color: var(--text-primary);
}

.nav-item.active {
  background: var(--accent-blue);
  color: white;
}

.nav-text {
  font-size: 0.875rem;
  font-weight: 500;
  opacity: 0;
  animation: fadeIn 0.3s ease 0.1s forwards;
}

.sidebar:not(.expanded) .nav-text {
  display: none;
}

.sidebar:not(.expanded) .nav-item {
  width: 40px;
  height: 40px;
  justify-content: center;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background: #e2e8f0;
  color: var(--text-primary);
}

.nav-item.active {
  background: var(--accent-blue);
  color: white;
}

.theme-toggle-container {
  margin-top: auto;
  padding: 0 1rem;
}

.theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 8px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
  border: none;
  width: 100%;
  white-space: nowrap;
}

.theme-toggle:hover {
  background: #e2e8f0;
  color: var(--text-primary);
}

.theme-text {
  font-size: 0.875rem;
  font-weight: 500;
  opacity: 0;
  animation: fadeIn 0.3s ease 0.1s forwards;
}

.sidebar:not(.expanded) .theme-text {
  display: none;
}

.sidebar:not(.expanded) .theme-toggle {
  width: 40px;
  height: 40px;
  justify-content: center;
  padding: 0.75rem;
}
</style>