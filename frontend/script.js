class Chatbot {
    constructor() {
        this.apiBase = 'http://localhost:5000/api';
        this.isProcessing = false;
        this.overlayShown = false;
        
        this.initializeElements();
        this.attachEventListeners();
        this.initializeOverlay();
    }
    
    initializeElements() {
        this.statusDiv = document.getElementById('status');
        this.questionInput = document.getElementById('questionInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.chatMessages = document.getElementById('chatMessages');
        this.overlay = document.getElementById('imageOverlay');
    }
    
    attachEventListeners() {
        this.sendBtn.addEventListener('click', () => this.sendQuestion());
        this.questionInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !this.isProcessing) {
                this.sendQuestion();
            }
        });
    }
    
    initializeOverlay() {
        // Always show overlay on page load
        if (this.overlay) {
            this.overlay.style.display = 'flex';
            this.overlayShown = true;
            
            // Add click event listener to hide overlay
            this.overlay.addEventListener('click', () => {
                this.hideOverlay();
            });
            
            // Add keyboard event listener for accessibility
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
                    this.hideOverlay();
                }
            });
        }
    }
    
    hideOverlay() {
        if (this.overlay && this.overlayShown) {
            this.overlay.classList.add('hidden');
            
            // Remove overlay from DOM after animation completes
            setTimeout(() => {
                this.overlay.style.display = 'none';
            }, 500);
            
            this.overlayShown = false;
        }
    }
    
    updateStatus(message, type = 'info') {
        this.statusDiv.textContent = message;
        this.statusDiv.className = `status ${type}`;
    }
    
    
    async sendQuestion() {
        const question = this.questionInput.value.trim();
        if (!question || this.isProcessing) return;
        
        this.isProcessing = true;
        this.questionInput.disabled = true;
        this.sendBtn.disabled = true;
        
        // Add user message
        this.addMessage('You', question, 'user');
        this.questionInput.value = '';
        
        // Show loading message
        const loadingMessage = this.addMessage('Bot', 'Thinking...', 'bot');
        
        try {
            const response = await fetch(`${this.apiBase}/ask`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question })
            });
            
            const data = await response.json();
            
            // Remove loading message
            loadingMessage.remove();
            
            if (data.success) {
                this.addMessage('Bot', data.answer, 'bot');
            } else {
                this.addMessage('Bot', `Error: ${data.error}`, 'bot');
            }
        } catch (error) {
            loadingMessage.remove();
            this.addMessage('Bot', `Network error: ${error.message}`, 'bot');
        } finally {
            this.questionInput.disabled = false;
            this.sendBtn.disabled = false;
            this.isProcessing = false;
            this.questionInput.focus();
        }
    }
    
    addMessage(sender, content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type === 'bot' ? 'ai-message' : 'user-message'}`;
        
        const timestamp = new Date().toLocaleTimeString();
        
        // Format content for better display
        const formattedContent = this.formatMessageContent(content);
        
        if (type === 'bot' || type === 'ai-message') {
            messageDiv.innerHTML = `
                <div class="message-header">
                    <div class="message-icon">
                        <i class="fas fa-lightbulb"></i>
                    </div>
                    <div class="message-info">
                        <div class="sender-name">AI Assistant</div>
                    </div>
                    <div class="message-status">
                        <div class="status-indicator online"></div>
                        <span>Online</span>
                    </div>
                </div>
                <div class="message-content">${formattedContent}</div>
                <div class="message-timestamp">${timestamp}</div>
            `;
        } else {
            messageDiv.innerHTML = `
            <div class="message-info">
                        <div class="sender-name">User</div>
                    </div>
                <div class="message-content">${formattedContent}</div>
                <div class="message-timestamp">${timestamp}</div>
            `;
        }
        
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        
        return messageDiv;
    }
    
    formatMessageContent(content) {
        // Escape HTML to prevent XSS
        const escapedContent = content
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        
        // Convert line breaks to <br> tags
        let formatted = escapedContent.replace(/\n/g, '<br>');
        
        // Convert bullet points (lines starting with "-") to proper HTML lists
        const lines = formatted.split('<br>');
        const processedLines = [];
        let inList = false;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Check if line starts with "-" (bullet point)
            if (line.startsWith('-')) {
                if (!inList) {
                    processedLines.push('<ul class="message-list">');
                    inList = true;
                }
                // Remove the "-" and add as list item
                const listItem = line.substring(1).trim();
                processedLines.push(`<li class="message-list-item">${listItem}</li>`);
            } else {
                if (inList) {
                    processedLines.push('</ul>');
                    inList = false;
                }
                processedLines.push(line);
            }
        }
        
        // Close list if we're still in one
        if (inList) {
            processedLines.push('</ul>');
        }
        
        return processedLines.join('<br>');
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});
