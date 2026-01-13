const STORAGE_KEYS = {
    tables: 'lamitzanu_tables',
    menu: 'lamitzanu_menu_items',
    theme: 'lamitzanu_theme'
};

const INITIAL_TABLES = [
    { id: 1, number: 1, capacity: 2, status: 'available', location: 'indoor' },
    { id: 2, number: 2, capacity: 4, status: 'available', location: 'indoor' },
    { id: 3, number: 3, capacity: 4, status: 'occupied', location: 'indoor' },
    { id: 4, number: 4, capacity: 6, status: 'reserved', location: 'indoor' },
    { id: 5, number: 5, capacity: 2, status: 'available', location: 'outdoor' },
    { id: 6, number: 6, capacity: 4, status: 'available', location: 'outdoor' },
    { id: 7, number: 7, capacity: 8, status: 'available', location: 'terrace' },
    { id: 8, number: 8, capacity: 6, status: 'maintenance', location: 'vip' }
];

const INITIAL_MENU = [
    {
        id: 'carbonara',
        name: 'Spaghetti Carbonara',
        description: 'Classic Roman pasta with eggs, pancetta, pecorino cheese, and black pepper.',
        price: 45,
        image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop',
        category: 'classic'
    },
    {
        id: 'bolognese',
        name: 'Spaghetti Bolognese',
        description: 'Traditional meat sauce with tomatoes, served over perfectly cooked spaghetti.',
        price: 42,
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop',
        category: 'classic'
    },
    {
        id: 'aglio-olio',
        name: 'Spaghetti Aglio e Olio',
        description: 'Simple yet delicious pasta with garlic, olive oil, and red pepper flakes.',
        price: 35,
        image: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=400&h=300&fit=crop',
        category: 'vegetarian'
    },
    {
        id: 'vongole',
        name: 'Spaghetti alle Vongole',
        description: 'Fresh clams cooked with white wine, garlic, and parsley over spaghetti.',
        price: 55,
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop',
        category: 'seafood'
    },
    {
        id: 'cacio-pepe',
        name: 'Spaghetti Cacio e Pepe',
        description: 'Roman classic with pecorino romano cheese and freshly ground black pepper.',
        price: 38,
        image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop',
        category: 'vegetarian'
    },
    {
        id: 'puttanesca',
        name: 'Spaghetti Puttanesca',
        description: 'Bold flavors with tomatoes, olives, capers, anchovies, and garlic.',
        price: 40,
        image: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=400&h=300&fit=crop',
        category: 'seafood'
    }
];

function initializeTables() {
    const stored = localStorage.getItem(STORAGE_KEYS.tables);
    if (!stored) {
        localStorage.setItem(STORAGE_KEYS.tables, JSON.stringify(INITIAL_TABLES));
    }
}

function initializeMenu() {
    const stored = localStorage.getItem(STORAGE_KEYS.menu);
    if (!stored) {
        localStorage.setItem(STORAGE_KEYS.menu, JSON.stringify(INITIAL_MENU));
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
