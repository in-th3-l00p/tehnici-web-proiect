function showToast(message) {
    const existing = document.querySelector('.success-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'success-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function loadTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.theme) || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function initThemeSwitcher() {
    const switcher = document.getElementById('theme-switcher');
    if (!switcher) return;

    const currentTheme = document.documentElement.getAttribute('data-theme');
    switcher.checked = currentTheme === 'dark';

    switcher.addEventListener('change', (e) => {
        const newTheme = e.target.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem(STORAGE_KEYS.theme, newTheme);

        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
    });
}

function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.currentTarget;
            const tabName = target.getAttribute('data-tab');

            tabButtons.forEach(b => b.classList.remove('active'));
            target.classList.add('active');

            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });

            const tabContent = document.getElementById(`${tabName}-tab`);
            if (tabContent) {
                tabContent.classList.add('active');
            }
        });
    });
}
