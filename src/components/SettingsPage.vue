<template>
  <div class="settings-page">
    <div class="page-header">
      <h1>Settings</h1>
      <p>Configure your studio preferences and system settings</p>
    </div>
    
    <div class="settings-sections">
      <div class="settings-section">
        <h2>Studio Information</h2>
        <div class="settings-form">
          <div class="form-group">
            <label>Studio Name</label>
            <input type="text" value="BookMyDance Studio" class="form-input" />
          </div>
          <div class="form-group">
            <label>Address</label>
            <input type="text" value="123 Dance Street, City, State 12345" class="form-input" />
          </div>
          <div class="form-group">
            <label>Phone Number</label>
            <input type="tel" value="(555) 123-4567" class="form-input" />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" value="info@bookmydance.com" class="form-input" />
          </div>
        </div>
      </div>
      
      <div class="settings-section">
        <h2>Business Hours</h2>
        <div class="hours-grid">
          <div class="day-hours">
            <span class="day-label">Monday</span>
            <div class="time-inputs">
              <input type="time" value="09:00" class="time-input" />
              <span>to</span>
              <input type="time" value="21:00" class="time-input" />
            </div>
          </div>
          <div class="day-hours">
            <span class="day-label">Tuesday</span>
            <div class="time-inputs">
              <input type="time" value="09:00" class="time-input" />
              <span>to</span>
              <input type="time" value="21:00" class="time-input" />
            </div>
          </div>
          <div class="day-hours">
            <span class="day-label">Wednesday</span>
            <div class="time-inputs">
              <input type="time" value="09:00" class="time-input" />
              <span>to</span>
              <input type="time" value="21:00" class="time-input" />
            </div>
          </div>
          <div class="day-hours">
            <span class="day-label">Thursday</span>
            <div class="time-inputs">
              <input type="time" value="09:00" class="time-input" />
              <span>to</span>
              <input type="time" value="21:00" class="time-input" />
            </div>
          </div>
          <div class="day-hours">
            <span class="day-label">Friday</span>
            <div class="time-inputs">
              <input type="time" value="09:00" class="time-input" />
              <span>to</span>
              <input type="time" value="21:00" class="time-input" />
            </div>
          </div>
          <div class="day-hours">
            <span class="day-label">Saturday</span>
            <div class="time-inputs">
              <input type="time" value="10:00" class="time-input" />
              <span>to</span>
              <input type="time" value="18:00" class="time-input" />
            </div>
          </div>
          <div class="day-hours">
            <span class="day-label">Sunday</span>
            <div class="time-inputs">
              <span class="closed-label">Closed</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="settings-section">
        <h2>Lesson Settings</h2>
        <div class="settings-form">
          <div class="form-group">
            <label>Default Lesson Duration</label>
            <select class="form-input">
              <option value="30">30 minutes</option>
              <option value="40" selected>40 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">60 minutes</option>
            </select>
          </div>
          <div class="form-group">
            <label>Time Slot Interval</label>
            <select class="form-input">
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45" selected>45 minutes</option>
            </select>
          </div>
          <div class="form-group">
            <label>Cancellation Policy (hours)</label>
            <input type="number" value="24" class="form-input" />
          </div>
        </div>
      </div>
      
      <div class="settings-section">
        <h2>Notifications</h2>
        <div class="notification-settings">
          <div class="notification-item">
            <div class="notification-info">
              <h4>Email Reminders</h4>
              <p>Send email reminders to students before lessons</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" checked />
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="notification-item">
            <div class="notification-info">
              <h4>SMS Notifications</h4>
              <p>Send SMS notifications for lesson confirmations</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" />
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="notification-item">
            <div class="notification-info">
              <h4>Payment Reminders</h4>
              <p>Automatically send payment reminder emails</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" checked />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
    
    <div class="settings-actions">
      <button class="btn-secondary">Cancel</button>
      <button class="btn-primary">
        <Save :size="16" />
        Save Settings
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Save } from 'lucide-vue-next';
</script>

<style scoped>
.settings-page {
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

.settings-sections {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
}

.settings-section {
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-primary);
}

.settings-section h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.settings-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.form-input {
  padding: 0.75rem;
  border: 1px solid var(--border-primary);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.form-input:focus {
  outline: none;
  border-color: var(--accent-blue);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.hours-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.day-hours {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: var(--bg-tertiary);
  border-radius: 8px;
}

.day-label {
  font-weight: 500;
  color: var(--text-primary);
  min-width: 100px;
}

.time-inputs {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.time-input {
  padding: 0.5rem;
  border: 1px solid var(--border-primary);
  border-radius: 6px;
  font-size: 0.875rem;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.closed-label {
  color: var(--text-secondary);
  font-style: italic;
}

.notification-settings {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.notification-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--bg-tertiary);
  border-radius: 8px;
}

.notification-info h4 {
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.notification-info p {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--border-secondary);
  transition: 0.3s;
  border-radius: 24px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: var(--accent-blue);
}

input:checked + .toggle-slider:before {
  transform: translateX(24px);
}

.settings-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-primary);
}

.btn-primary, .btn-secondary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
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
</style>