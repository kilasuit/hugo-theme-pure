/**
 * Bionic Reading Functionality
 * Applies bionic reading formatting to article text
 */

(function() {
  'use strict';

  const BionicReading = {
    STORAGE_KEY: 'bionic-reading-enabled',
    CONTENT_LOAD_DELAY: 100,
    contentSelector: '.article-entry',
    
    /**
     * Calculate how many characters to bold based on word length
     */
    getBoldLength: function(wordLength) {
      if (wordLength <= 1) return 1;
      if (wordLength <= 3) return 1;
      if (wordLength <= 5) return 2;
      if (wordLength <= 8) return 3;
      return Math.ceil(wordLength / 2);
    },
    
    /**
     * Process a text node and apply bionic reading formatting
     */
    processTextNode: function(textNode) {
      const text = textNode.textContent;
      if (!text.trim()) return;
      
      // Split text into words and non-words (spaces, punctuation)
      const parts = text.split(/(\s+)/);
      const fragment = document.createDocumentFragment();
      
      parts.forEach(part => {
        if (!part) return;
        
        // If it's whitespace, keep it as is
        if (/^\s+$/.test(part)) {
          fragment.appendChild(document.createTextNode(part));
          return;
        }
        
        // Process word with punctuation
        const wordMatch = part.match(/^([^\w]*)(\w+)([^\w]*)$/);
        if (wordMatch) {
          const [, prefix, word, suffix] = wordMatch;
          
          // Add prefix punctuation
          if (prefix) {
            fragment.appendChild(document.createTextNode(prefix));
          }
          
          // Create bionic word
          const boldLength = this.getBoldLength(word.length);
          const boldPart = word.substring(0, boldLength);
          const normalPart = word.substring(boldLength);
          
          const wordSpan = document.createElement('span');
          wordSpan.className = 'bionic-word';
          
          const boldSpan = document.createElement('span');
          boldSpan.className = 'bionic-bold';
          boldSpan.textContent = boldPart;
          
          wordSpan.appendChild(boldSpan);
          if (normalPart) {
            wordSpan.appendChild(document.createTextNode(normalPart));
          }
          
          fragment.appendChild(wordSpan);
          
          // Add suffix punctuation
          if (suffix) {
            fragment.appendChild(document.createTextNode(suffix));
          }
        } else {
          // If it doesn't match the pattern, keep as is
          fragment.appendChild(document.createTextNode(part));
        }
      });
      
      textNode.parentNode.replaceChild(fragment, textNode);
    },
    
    /**
     * Process all text nodes in an element
     */
    processElement: function(element) {
      const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            // Skip code blocks, pre elements, and script/style tags
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            
            const tagName = parent.tagName.toLowerCase();
            if (['code', 'pre', 'script', 'style', 'textarea'].includes(tagName)) {
              return NodeFilter.FILTER_REJECT;
            }
            
            // Skip if already processed
            if (parent.classList && parent.classList.contains('bionic-word')) {
              return NodeFilter.FILTER_REJECT;
            }
            
            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );
      
      const textNodes = [];
      let node;
      while ((node = walker.nextNode()) !== null) {
        textNodes.push(node);
      }
      
      textNodes.forEach(textNode => this.processTextNode(textNode));
    },
    
    /**
     * Remove bionic reading formatting
     */
    removeFormatting: function(element) {
      const bionicWords = element.querySelectorAll('.bionic-word');
      bionicWords.forEach(span => {
        const text = span.textContent;
        const textNode = document.createTextNode(text);
        span.parentNode.replaceChild(textNode, span);
      });
      
      // Normalize text nodes
      element.normalize();
    },
    
    /**
     * Enable bionic reading
     */
    enable: function() {
      const content = document.querySelector(this.contentSelector);
      if (!content) return;
      
      // Check if already enabled
      if (content.classList.contains('bionic-reading-enabled')) return;
      
      this.processElement(content);
      content.classList.add('bionic-reading-enabled');
      localStorage.setItem(this.STORAGE_KEY, 'true');
      
      // Update button state
      const button = document.querySelector('.bionic-toggle');
      if (button) {
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');
      }
    },
    
    /**
     * Disable bionic reading
     */
    disable: function() {
      const content = document.querySelector(this.contentSelector);
      if (!content) return;
      
      this.removeFormatting(content);
      content.classList.remove('bionic-reading-enabled');
      localStorage.setItem(this.STORAGE_KEY, 'false');
      
      // Update button state
      const button = document.querySelector('.bionic-toggle');
      if (button) {
        button.classList.remove('active');
        button.setAttribute('aria-pressed', 'false');
      }
    },
    
    /**
     * Toggle bionic reading
     */
    toggle: function() {
      const content = document.querySelector(this.contentSelector);
      if (!content) return;
      
      if (content.classList.contains('bionic-reading-enabled')) {
        this.disable();
      } else {
        this.enable();
      }
    },
    
    /**
     * Check if bionic reading is enabled
     */
    isEnabled: function() {
      return localStorage.getItem(this.STORAGE_KEY) === 'true';
    },
    
    /**
     * Initialize bionic reading
     */
    init: function() {
      // Apply saved preference
      if (this.isEnabled()) {
        // Delay to ensure content is loaded
        setTimeout(() => this.enable(), this.CONTENT_LOAD_DELAY);
      }
      
      // Set up toggle button
      const button = document.querySelector('.bionic-toggle');
      if (button) {
        button.addEventListener('click', () => this.toggle());
        
        // Set initial button state
        if (this.isEnabled()) {
          button.classList.add('active');
          button.setAttribute('aria-pressed', 'true');
        }
      }
    }
  };
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => BionicReading.init());
  } else {
    BionicReading.init();
  }
})();
