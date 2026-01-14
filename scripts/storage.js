const STORAGE_KEYS = {
    tables: 'lamitzanu_tables',
    menu: 'lamitzanu_menu_items',
    theme: 'lamitzanu_theme'
};

let INITIAL_TABLES = [];
let INITIAL_MENU = [];

async function fetchInitialData(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching data from ${filePath}:`, error);
        return null;
    }
}

async function initializeTables() {
    const stored = localStorage.getItem(STORAGE_KEYS.tables);
    if (!stored) {
        const data = await fetchInitialData('/data/tables.json');
        if (data) {
            INITIAL_TABLES = data;
            localStorage.setItem(STORAGE_KEYS.tables, JSON.stringify(INITIAL_TABLES));
        }
    }
}

async function initializeMenu() {
    const stored = localStorage.getItem(STORAGE_KEYS.menu);
    if (!stored) {
        const data = await fetchInitialData('/data/menu.json');
        if (data) {
            INITIAL_MENU = data;
            localStorage.setItem(STORAGE_KEYS.menu, JSON.stringify(INITIAL_MENU));
        }
    }
}

function getTables() {
    const stored = localStorage.getItem(STORAGE_KEYS.tables);
    return stored ? JSON.parse(stored) : INITIAL_TABLES;
}

function saveTables(tables) {
    localStorage.setItem(STORAGE_KEYS.tables, JSON.stringify(tables));
}

function getMenu() {
    const stored = localStorage.getItem(STORAGE_KEYS.menu);
    return stored ? JSON.parse(stored) : INITIAL_MENU;
}

function saveMenu(menu) {
    localStorage.setItem(STORAGE_KEYS.menu, JSON.stringify(menu));
}
