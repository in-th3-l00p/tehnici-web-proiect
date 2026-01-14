async function initManagePage() {
    loadTheme();
    initThemeSwitcher();
    await initializeTables();
    await initializeMenu();
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
