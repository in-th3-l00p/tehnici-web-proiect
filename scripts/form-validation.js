const FormValidation = {
    patterns: {
        name: /^[a-zA-Z\s\-]{2,}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^(\+40|0)?[0-9\s\(\)\-]{9,}$/,
        message: /^.{10,}$/
    },

    messages: {
        name: 'Please enter a valid name (at least 2 characters, letters and hyphens only)',
        email: 'Please enter a valid email address (e.g., name@example.com)',
        phone: 'Please enter a valid phone number (e.g., +40 268 123 456)',
        message: 'Message must be at least 10 characters long'
    },

    init() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        Object.keys(this.patterns).forEach(field => {
            const input = document.getElementById(field);
            if (input) {
                input.addEventListener('blur', () => this.validateField(field));
            }
        });
    },

    validateField(fieldName) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(`${fieldName}-error`);
        const value = field.value.trim();

        if (!value) {
            this.showError(errorElement, 'This field is required');
            field.classList.add('invalid');
            return false;
        }

        if (!this.patterns[fieldName].test(value)) {
            this.showError(errorElement, this.messages[fieldName]);
            field.classList.add('invalid');
            return false;
        }

        if (fieldName === 'email' && !this.isValidEmail(value)) {
            this.showError(errorElement, this.messages[fieldName]);
            field.classList.add('invalid');
            return false;
        }

        if (fieldName === 'phone' && !this.isValidPhone(value)) {
            this.showError(errorElement, this.messages[fieldName]);
            field.classList.add('invalid');
            return false;
        }

        this.clearError(errorElement);
        field.classList.remove('invalid');
        return true;
    },

    isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    },

    isValidPhone(phone) {
        const digitsOnly = phone.replace(/[\s\(\)\-]/g, '');
        
        if (!/^\+?40?[0-9]{9,}$/.test(digitsOnly)) {
            return false;
        }
        
        return true;
    },

    showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
    },

    clearError(element) {
        element.textContent = '';
        element.style.display = 'none';
    },

    handleSubmit(e) {
        e.preventDefault();

        const isValid = Object.keys(this.patterns).every(field => 
            this.validateField(field)
        );

        if (isValid) {
            this.submitForm();
        }
    },

    submitForm() {
        const form = document.getElementById('contact-form');
        const statusElement = document.getElementById('form-status');

        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };

        statusElement.className = 'form-status success';
        statusElement.textContent = '✓ Message sent successfully! We\'ll contact you soon.';
        statusElement.style.display = 'block';

        const messages = JSON.parse(localStorage.getItem('lamitzanu_messages') || '[]');
        messages.push(data);
        localStorage.setItem('lamitzanu_messages', JSON.stringify(messages));

        form.reset();

        setTimeout(() => {
            statusElement.style.display = 'none';
            statusElement.textContent = '';
        }, 5000);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    FormValidation.init();
});
