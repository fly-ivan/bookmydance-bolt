<template>
  <div class="payments-page">
    <div class="page-header">
      <h1>Payments</h1>
      <p>Manage student payments and billing</p>
    </div>
    
    <div class="payments-summary">
      <div class="summary-card">
        <div class="summary-header">
          <h3>Outstanding Payments</h3>
          <AlertCircle :size="24" class="text-red-500" />
        </div>
        <div class="summary-value">$2,340</div>
        <div class="summary-detail">12 overdue invoices</div>
      </div>
      
      <div class="summary-card">
        <div class="summary-header">
          <h3>This Month's Revenue</h3>
          <DollarSign :size="24" class="text-green-500" />
        </div>
        <div class="summary-value">$8,750</div>
        <div class="summary-detail">98 payments received</div>
      </div>
      
      <div class="summary-card">
        <div class="summary-header">
          <h3>Pending Payments</h3>
          <Clock :size="24" class="text-yellow-500" />
        </div>
        <div class="summary-value">$1,560</div>
        <div class="summary-detail">8 pending invoices</div>
      </div>
    </div>
    
    <div class="payments-table">
      <div class="table-header">
        <h3>Recent Payments</h3>
        <button class="btn-primary">
          <Plus :size="16" />
          New Invoice
        </button>
      </div>
      
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="student-info">
                  <div class="student-avatar">JS</div>
                  <span>John Smith</span>
                </div>
              </td>
              <td class="amount">$80.00</td>
              <td>Aug 5, 2025</td>
              <td><span class="status-badge paid">Paid</span></td>
              <td>Credit Card</td>
              <td>
                <button class="action-btn">
                  <Eye :size="16" />
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <div class="student-info">
                  <div class="student-avatar">MJ</div>
                  <span>Mary Johnson</span>
                </div>
              </td>
              <td class="amount">$120.00</td>
              <td>Aug 4, 2025</td>
              <td><span class="status-badge pending">Pending</span></td>
              <td>Bank Transfer</td>
              <td>
                <button class="action-btn">
                  <Eye :size="16" />
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <div class="student-info">
                  <div class="student-avatar">RW</div>
                  <span>Robert Wilson</span>
                </div>
              </td>
              <td class="amount">$75.00</td>
              <td>Aug 3, 2025</td>
              <td><span class="status-badge overdue">Overdue</span></td>
              <td>Cash</td>
              <td>
                <button class="action-btn">
                  <Eye :size="16" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AlertCircle, DollarSign, Clock, Plus, Eye } from 'lucide-vue-next';
</script>

<style scoped>
.payments-page {
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

.payments-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.summary-card {
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-primary);
}

.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.summary-header h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.summary-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.summary-detail {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.payments-table {
  background: var(--bg-primary);
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid var(--border-primary);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-primary);
}

.table-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--accent-blue);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: var(--accent-blue);
  opacity: 0.9;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 1rem 1.5rem;
  text-align: left;
  border-bottom: 1px solid var(--border-primary);
  color: var(--text-primary);
}

th {
  background: var(--bg-tertiary);
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.student-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.student-avatar {
  width: 32px;
  height: 32px;
  background: var(--accent-blue);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}

.amount {
  font-weight: 600;
  color: var(--accent-green);
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
}

.status-badge.paid {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.pending {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.overdue {
  background: #fee2e2;
  color: #991b1b;
}

.action-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s;
}

.action-btn:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}
</style>