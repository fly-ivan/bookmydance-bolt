<template>
  <div class="reports-page">
    <div class="page-header">
      <h1>Reports & Analytics</h1>
      <p>Track your studio's performance and revenue</p>
    </div>
    
    <div class="reports-grid">
      <div class="report-card">
        <div class="card-header">
          <h3>Monthly Revenue</h3>
          <TrendingUp :size="24" class="text-green-500" />
        </div>
        <div class="card-content">
          <div class="metric-value">$12,450</div>
          <div class="metric-change positive">+15.3% from last month</div>
        </div>
      </div>
      
      <div class="report-card">
        <div class="card-header">
          <h3>Total Lessons</h3>
          <Calendar :size="24" class="text-blue-500" />
        </div>
        <div class="card-content">
          <div class="metric-value">156</div>
          <div class="metric-change positive">+8 from last month</div>
        </div>
      </div>
      
      <div class="report-card">
        <div class="card-header">
          <h3>Active Students</h3>
          <Users :size="24" class="text-purple-500" />
        </div>
        <div class="card-content">
          <div class="metric-value">42</div>
          <div class="metric-change positive">+3 new students</div>
        </div>
      </div>
      
      <div class="report-card">
        <div class="card-header">
          <h3>Average Lesson Price</h3>
          <DollarSign :size="24" class="text-yellow-500" />
        </div>
        <div class="card-content">
          <div class="metric-value">$79.80</div>
          <div class="metric-change neutral">No change</div>
        </div>
      </div>
    </div>
    
    <div class="charts-section">
      <div class="chart-card">
        <h3>Revenue Trend</h3>
        <div class="chart-placeholder">
          <BarChart3 :size="48" class="text-gray-400" />
          <p>Chart visualization would go here</p>
        </div>
      </div>
      
      <div class="chart-card">
        <h3>Lesson Types Distribution</h3>
        <div class="chart-placeholder">
          <PieChart :size="48" class="text-gray-400" />
          <p>Pie chart visualization would go here</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TrendingUp, Calendar, Users, DollarSign, BarChart3, PieChart } from 'lucide-vue-next';
</script>

<style scoped>
.reports-page {
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

.reports-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.report-card {
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-primary);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-header h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.card-content {
  text-align: left;
}

.metric-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.metric-change {
  font-size: 0.875rem;
  font-weight: 500;
}

.metric-change.positive {
  color: #059669;
}

.metric-change.neutral {
  color: #6b7280;
}

.charts-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
}

.chart-card {
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-primary);
}

.chart-card h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.chart-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  background: var(--bg-tertiary);
  border-radius: 8px;
  border: 2px dashed var(--border-secondary);
}

.chart-placeholder p {
  color: var(--text-secondary);
  margin-top: 1rem;
}
</style>