import { ref, computed, watch } from 'vue';

export type Theme = 'light' | 'dark';

const theme = ref<Theme>('light');

// Load theme from localStorage on initialization
if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('theme') as Theme;
  if (savedTheme) {
    theme.value = savedTheme;
  } else {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme.value = prefersDark ? 'dark' : 'light';
  }
}

export function useTheme() {
  const isDark = computed(() => theme.value === 'dark');
  
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  };
  
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme;
  };
  
  // Save to localStorage and apply to document
  watch(theme, (newTheme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  }, { immediate: true });
  
  return {
    theme: computed(() => theme.value),
    isDark,
    toggleTheme,
    setTheme
  };
}