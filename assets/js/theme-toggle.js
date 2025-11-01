/**
 * Theme Toggle Functionality
 * Handles dark/light mode switching with system preference detection
 */

(function() {
  'use strict';

  // Theme management
  const ThemeManager = {
    STORAGE_KEY: 'theme-preference',
    THEME_DARK: 'dark',
    THEME_LIGHT: 'light',
    
    /**
     * Get the current theme from localStorage or system preference
     */
    getPreferredTheme: function() {
      const storedTheme = localStorage.getItem(this.STORAGE_KEY);
      
      if (storedTheme) {
        return storedTheme;
      }
      
      // Detect system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return this.THEME_DARK;
      }
      
      return this.THEME_LIGHT;
    },
    
    /**
     * Set the theme on the document
     */
    setTheme: function(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(this.STORAGE_KEY, theme);
    },
    
    /**
     * Toggle between light and dark themes
     */
    toggleTheme: function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === this.THEME_DARK ? this.THEME_LIGHT : this.THEME_DARK;
      this.setTheme(newTheme);
      return newTheme;
    },
    
    /**
     * Initialize theme on page load
     */
    init: function() {
      const preferredTheme = this.getPreferredTheme();
      this.setTheme(preferredTheme);
      
      // Listen for system theme changes
      if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
          // Only auto-switch if user hasn't manually set a preference
          if (!localStorage.getItem(this.STORAGE_KEY)) {
            this.setTheme(e.matches ? this.THEME_DARK : this.THEME_LIGHT);
          }
        });
      }
    }
  };
  
  // Initialize theme before page renders (prevents flash)
  ThemeManager.init();
  
  // Set up toggle button after DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.querySelector('.theme-toggle');
    
    if (toggleButton) {
      toggleButton.addEventListener('click', function() {
        ThemeManager.toggleTheme();
      });
    }
  });
  
  // Make ThemeManager globally accessible if needed
  window.ThemeManager = ThemeManager;
})();
