<template>
  <div class="instructors-page">
    <div class="page-header">
      <h1>Instructors</h1>
      <p>Manage your dance instructors and their schedules</p>
    </div>
    
    <div class="instructors-grid">
      <div class="instructor-card">
        <div class="instructor-avatar">
          <img src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" alt="Ivan" />
        </div>
        <div class="instructor-info">
          <h3>Ivan Rodriguez</h3>
          <p class="instructor-title">Senior Ballroom Instructor</p>
          <div class="instructor-specialties">
            <span class="specialty-tag">Waltz</span>
            <span class="specialty-tag">Tango</span>
            <span class="specialty-tag">Foxtrot</span>
          </div>
          <div class="instructor-stats">
            <div class="stat">
              <span class="stat-value">156</span>
              <span class="stat-label">Lessons This Month</span>
            </div>
            <div class="stat">
              <span class="stat-value">$80</span>
              <span class="stat-label">Hourly Rate</span>
            </div>
          </div>
        </div>
        <div class="instructor-actions">
          <button class="btn-secondary">
            <Calendar :size="16" />
            View Schedule
          </button>
          <button class="btn-primary">
            <Edit :size="16" />
            Edit
          </button>
        </div>
      </div>
      
      <div class="instructor-card">
        <div class="instructor-avatar">
          <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" alt="Maria" />
        </div>
        <div class="instructor-info">
          <h3>Maria Santos</h3>
          <p class="instructor-title">Latin Dance Specialist</p>
          <div class="instructor-specialties">
            <span class="specialty-tag">Rumba</span>
            <span class="specialty-tag">Cha Cha</span>
            <span class="specialty-tag">Samba</span>
          </div>
          <div class="instructor-stats">
            <div class="stat">
              <span class="stat-value">142</span>
              <span class="stat-label">Lessons This Month</span>
            </div>
            <div class="stat">
              <span class="stat-value">$75</span>
              <span class="stat-label">Hourly Rate</span>
            </div>
          </div>
        </div>
        <div class="instructor-actions">
          <button class="btn-secondary">
            <Calendar :size="16" />
            View Schedule
          </button>
          <button class="btn-primary">
            <Edit :size="16" />
            Edit
          </button>
        </div>
      </div>
      
      <div class="instructor-card">
        <div class="instructor-avatar">
          <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" alt="Carlos" />
        </div>
        <div class="instructor-info">
          <h3>Carlos Martinez</h3>
          <p class="instructor-title">Social Dance Instructor</p>
          <div class="instructor-specialties">
            <span class="specialty-tag">Salsa</span>
            <span class="specialty-tag">Bachata</span>
            <span class="specialty-tag">Swing</span>
          </div>
          <div class="instructor-stats">
            <div class="stat">
              <span class="stat-value">98</span>
              <span class="stat-label">Lessons This Month</span>
            </div>
            <div class="stat">
              <span class="stat-value">$70</span>
              <span class="stat-label">Hourly Rate</span>
            </div>
          </div>
        </div>
        <div class="instructor-actions">
          <button class="btn-secondary">
            <Calendar :size="16" />
            View Schedule
          </button>
          <button class="btn-primary">
            <Edit :size="16" />
            Edit
          </button>
        </div>
      </div>
      
      <div class="add-instructor-card">
        <div class="add-instructor-content">
          <Plus :size="48" class="text-gray-400" />
          <h3>Add New Instructor</h3>
          <p>Expand your team with qualified dance instructors</p>
          <button class="btn-primary">
            <Plus :size="16" />
            Add Instructor
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Calendar, Edit, Plus } from 'lucide-vue-next';
</script>

<style scoped>
.instructors-page {
  padding: 2rem;
  height: 100vh;
  overflow-y: auto;
  background: var(--bg-secondary);
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.page-header p {
  color: var(--text-secondary);
  font-size: 1.125rem;
}

.instructors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.instructor-card {
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid var(--border-primary);
}

.instructor-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.instructor-info h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.instructor-title {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.instructor-specialties {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.specialty-tag {
  background: #e0e7ff;
  color: #3730a3;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.instructor-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.instructor-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
}

.btn-primary, .btn-secondary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  flex: 1;
  justify-content: center;
}

.btn-primary {
  background: var(--accent-blue);
  color: white;
}

.btn-primary:hover {
  background: var(--accent-blue);
  opacity: 0.9;
}

.btn-secondary {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.btn-secondary:hover {
  background: var(--bg-tertiary);
  opacity: 0.8;
}

.add-instructor-card {
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 2px dashed var(--border-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-instructor-content {
  text-align: center;
}

.add-instructor-content h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 1rem 0 0.5rem;
}

.add-instructor-content p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}
</style>