<template>
  <div class="app-layout">
    <AppSidebar @navigate="handleNavigation" />
    <div class="main-content">
      <SchedulePage v-if="currentPage === 'schedule'" />
      <ReportsPage v-else-if="currentPage === 'reports'" />
      <PaymentsPage v-else-if="currentPage === 'payments'" />
      <InstructorsPage v-else-if="currentPage === 'instructors'" />
      <StudentsPage v-else-if="currentPage === 'students'" />
      <SettingsPage v-else-if="currentPage === 'settings'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppSidebar from './components/AppSidebar.vue';
import SchedulePage from './components/SchedulePage.vue';
import ReportsPage from './components/ReportsPage.vue';
import PaymentsPage from './components/PaymentsPage.vue';
import InstructorsPage from './components/InstructorsPage.vue';
import StudentsPage from './components/StudentsPage.vue';
import SettingsPage from './components/SettingsPage.vue';

const currentPage = ref('schedule');

const handleNavigation = (page: string) => {
  currentPage.value = page;
};
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
}

.main-content {
  flex: 1;
  overflow: hidden;
}
</style>