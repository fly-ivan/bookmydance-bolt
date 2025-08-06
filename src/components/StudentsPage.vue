<template>
  <div class="students-page">
    <div class="page-header">
      <h1>Students</h1>
      <p>Manage your dance students and their information</p>
      <button class="btn-primary">
        <Plus :size="16" />
        Add New Student
      </button>
    </div>
    
    <div class="students-grid">
      <div class="student-card">
        <div class="student-avatar">
          <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" alt="Stephanie" />
        </div>
        <div class="student-info">
          <h3>Stephanie & Carlo</h3>
          <p class="student-email">stephanie.carlo@email.com</p>
          <p class="student-phone">(555) 123-4567</p>
          <div class="student-stats">
            <div class="stat">
              <span class="stat-value">12</span>
              <span class="stat-label">Lessons Taken</span>
            </div>
            <div class="stat">
              <span class="stat-value">$960</span>
              <span class="stat-label">Total Paid</span>
            </div>
          </div>
          <div class="student-dances">
            <span class="dance-tag">Waltz</span>
            <span class="dance-tag">Tango</span>
          </div>
        </div>
        <div class="student-actions">
          <button class="btn-secondary">
            <Calendar :size="16" />
            Schedule
          </button>
          <button class="btn-primary">
            <Edit :size="16" />
            Edit
          </button>
        </div>
      </div>
      
      <div class="student-card">
        <div class="student-avatar">
          <img src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" alt="Kate" />
        </div>
        <div class="student-info">
          <h3>Kate Schwitz</h3>
          <p class="student-email">kate.schwitz@email.com</p>
          <p class="student-phone">(555) 234-5678</p>
          <div class="student-stats">
            <div class="stat">
              <span class="stat-value">8</span>
              <span class="stat-label">Lessons Taken</span>
            </div>
            <div class="stat">
              <span class="stat-value">$640</span>
              <span class="stat-label">Total Paid</span>
            </div>
          </div>
          <div class="student-dances">
            <span class="dance-tag">Rumba</span>
            <span class="dance-tag">Wedding Prep</span>
          </div>
        </div>
        <div class="student-actions">
          <button class="btn-secondary">
            <Calendar :size="16" />
            Schedule
          </button>
          <button class="btn-primary">
            <Edit :size="16" />
            Edit
          </button>
        </div>
      </div>
      
      <div class="student-card">
        <div class="student-avatar">
          <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" alt="Debbie" />
        </div>
        <div class="student-info">
          <h3>Debbie & Bryan</h3>
          <p class="student-email">debbie.bryan@email.com</p>
          <p class="student-phone">(555) 345-6789</p>
          <div class="student-stats">
            <div class="stat">
              <span class="stat-value">15</span>
              <span class="stat-label">Lessons Taken</span>
            </div>
            <div class="stat">
              <span class="stat-value">$1125</span>
              <span class="stat-label">Total Paid</span>
            </div>
          </div>
          <div class="student-dances">
            <span class="dance-tag">Waltz</span>
            <span class="dance-tag">Foxtrot</span>
          </div>
        </div>
        <div class="student-actions">
          <button class="btn-secondary">
            <Calendar :size="16" />
            Schedule
          </button>
          <button class="btn-primary">
            <Edit :size="16" />
            Edit
          </button>
        </div>
      </div>
      
      <div class="student-card">
        <div class="student-avatar">
          <img src="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" alt="Emily" />
        </div>
        <div class="student-info">
          <h3>Emily & Johnny</h3>
          <p class="student-email">emily.johnny@email.com</p>
          <p class="student-phone">(555) 456-7890</p>
          <div class="student-stats">
            <div class="stat">
              <span class="stat-value">6</span>
              <span class="stat-label">Lessons Taken</span>
            </div>
            <div class="stat">
              <span class="stat-value">$450</span>
              <span class="stat-label">Total Paid</span>
            </div>
          </div>
          <div class="student-dances">
            <span class="dance-tag">Foxtrot</span>
            <span class="dance-tag">Quickstep</span>
          </div>
        </div>
        <div class="student-actions">
          <button class="btn-secondary">
            <Calendar :size="16" />
            Schedule
          </button>
          <button class="btn-primary">
            <Edit :size="16" />
            Edit
          </button>
        </div>
      </div>
      
      <div class="add-student-card">
        <div class="add-student-content">
          <Plus :size="48" class="text-gray-400" />
          <h3>Add New Student</h3>
          <p>Register new students for dance lessons</p>
          <button class="btn-primary">
            <Plus :size="16" />
            Add Student
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
.students-page {
  padding: 2rem;
  height: 100vh;
  overflow-y: auto;
  background: var(--bg-secondary);
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.students-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.student-card {
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid var(--border-primary);
}

.student-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.student-info h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.student-email, .student-phone {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.student-stats {
  display: flex;
  gap: 2rem;
  margin: 1rem 0;
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

.student-dances {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.dance-tag {
  background: #e0e7ff;
  color: #3730a3;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.student-actions {
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

.add-student-card {
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 2px dashed var(--border-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-student-content {
  text-align: center;
}

.add-student-content h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 1rem 0 0.5rem;
}

.add-student-content p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}
</style>