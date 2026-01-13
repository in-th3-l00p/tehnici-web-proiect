function initManagePage() {
    loadTheme();
    initThemeSwitcher();
    initializeTables();
    initializeMenu();
    renderTables();
    renderMenu();
    initTabs();
    initTableForms();
    initMenuForms();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initManagePage);
} else {
    initManagePage();
}
