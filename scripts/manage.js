const MANAGE_STORAGE_KEYS = {
    tables: 'lamitzanu_tables',
    menu: 'lamitzanu_menu_items'
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

function initManagePage() {
    loadTheme();
    initThemeSwitcher();
    initializeTables();
    initializeMenu();
    renderTables();
    renderMenu();
    initTabs();
}

function loadTheme() {
    const savedTheme = localStorage.getItem('lamitzanu_theme') || 'light';
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
        localStorage.setItem('lamitzanu_theme', newTheme);

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

function initializeTables() {
    const stored = localStorage.getItem(MANAGE_STORAGE_KEYS.tables);
    if (!stored) {
        localStorage.setItem(MANAGE_STORAGE_KEYS.tables, JSON.stringify(INITIAL_TABLES));
    }
}

function initializeMenu() {
    const stored = localStorage.getItem(MANAGE_STORAGE_KEYS.menu);
    if (!stored) {
        localStorage.setItem(MANAGE_STORAGE_KEYS.menu, JSON.stringify(INITIAL_MENU));
    }
}

function getTables() {
    const stored = localStorage.getItem(MANAGE_STORAGE_KEYS.tables);
    return stored ? JSON.parse(stored) : INITIAL_TABLES;
}

function saveTables(tables) {
    localStorage.setItem(MANAGE_STORAGE_KEYS.tables, JSON.stringify(tables));
}

function getMenu() {
    const stored = localStorage.getItem(MANAGE_STORAGE_KEYS.menu);
    return stored ? JSON.parse(stored) : INITIAL_MENU;
}

function saveMenu(menu) {
    localStorage.setItem(MANAGE_STORAGE_KEYS.menu, JSON.stringify(menu));
}

function renderTables() {
    const grid = document.getElementById('tables-grid');
    if (!grid) return;

    const tables = getTables();

    if (tables.length === 0) {
        grid.innerHTML = '<p class="no-data">No tables available. Add one to get started.</p>';
        return;
    }

    grid.innerHTML = tables.map(table => `
        <div class="table-card status-${table.status}">
            <div class="table-header">
                <h3>Table ${table.number}</h3>
                <span class="table-status-badge">${table.status}</span>
            </div>
            <div class="table-info">
                <div class="info-row">
                    <span class="info-label">Capacity:</span>
                    <span class="info-value">${table.capacity} seats</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Location:</span>
                    <span class="info-value">${table.location}</span>
                </div>
            </div>
            <div class="table-actions">
                <button class="edit-btn" onclick="openEditTableModal(${table.id})">Edit</button>
                <button class="delete-btn" onclick="deleteTable(${table.id})">Delete</button>
                <button class="status-btn" onclick="cycleTableStatus(${table.id})">Change Status</button>
            </div>
        </div>
    `).join('');
}

function renderMenu() {
    const list = document.getElementById('menu-list');
    if (!list) return;

    const menu = getMenu();

    if (menu.length === 0) {
        list.innerHTML = '<p class="no-data">No menu items available. Add one to get started.</p>';
        return;
    }

    list.innerHTML = menu.map(item => `
        <div class="menu-card">
            <div class="menu-card-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="menu-card-content">
                <div class="menu-card-header">
                    <h3>${item.name}</h3>
                    <span class="category-badge">${item.category}</span>
                </div>
                <p class="menu-card-description">${item.description}</p>
                <div class="menu-card-footer">
                    <span class="menu-card-price">${item.price} RON</span>
                    <div class="menu-card-actions">
                        <button class="edit-btn" onclick="openEditMenuModal('${item.id}')">Edit</button>
                        <button class="delete-btn" onclick="deleteMenuItem('${item.id}')">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function openAddTableModal() {
    const modal = document.getElementById('add-table-modal');
    if (modal) modal.showModal();
}

function closeAddTableModal() {
    const modal = document.getElementById('add-table-modal');
    if (modal) modal.close();
}

function openEditTableModal(tableId) {
    const tables = getTables();
    const table = tables.find(t => t.id === tableId);
    if (!table) return;

    document.getElementById('edit-table-id').value = table.id;
    document.getElementById('edit-table-number').value = table.number;
    document.getElementById('edit-table-capacity').value = table.capacity;
    document.getElementById('edit-table-status').value = table.status;
    document.getElementById('edit-table-location').value = table.location;

    const modal = document.getElementById('edit-table-modal');
    if (modal) modal.showModal();
}

function closeEditTableModal() {
    const modal = document.getElementById('edit-table-modal');
    if (modal) modal.close();
}

function openAddMenuModal() {
    const modal = document.getElementById('add-menu-modal');
    if (modal) modal.showModal();
}

function closeAddMenuModal() {
    const modal = document.getElementById('add-menu-modal');
    if (modal) modal.close();
}

function openEditMenuModal(itemId) {
    const menu = getMenu();
    const item = menu.find(m => m.id === itemId);
    if (!item) return;

    document.getElementById('edit-menu-id').value = item.id;
    document.getElementById('edit-menu-name').value = item.name;
    document.getElementById('edit-menu-description').value = item.description;
    document.getElementById('edit-menu-price').value = item.price;
    document.getElementById('edit-menu-category').value = item.category;
    document.getElementById('edit-menu-image').value = item.image;

    const modal = document.getElementById('edit-menu-modal');
    if (modal) modal.showModal();
}

function closeEditMenuModal() {
    const modal = document.getElementById('edit-menu-modal');
    if (modal) modal.close();
}

function deleteTable(tableId) {
    if (!confirm('Are you sure you want to delete this table?')) return;

    let tables = getTables();
    tables = tables.filter(t => t.id !== tableId);
    saveTables(tables);
    renderTables();
    showToast('Table deleted successfully');
}

function deleteMenuItem(itemId) {
    if (!confirm('Are you sure you want to delete this menu item?')) return;

    let menu = getMenu();
    menu = menu.filter(m => m.id !== itemId);
    saveMenu(menu);
    renderMenu();
    showToast('Menu item deleted successfully');
}

function cycleTableStatus(tableId) {
    const statusOrder = ['available', 'occupied', 'reserved', 'maintenance'];
    let tables = getTables();
    const table = tables.find(t => t.id === tableId);

    if (!table) return;

    const currentIndex = statusOrder.indexOf(table.status);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    table.status = statusOrder[nextIndex];

    saveTables(tables);
    renderTables();
    showToast(`Table ${table.number} status changed to ${table.status}`);
}

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

const addTableForm = document.getElementById('add-table-form');
if (addTableForm) {
    addTableForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const tables = getTables();
        const newId = tables.length > 0 ? Math.max(...tables.map(t => t.id)) + 1 : 1;

        const newTable = {
            id: newId,
            number: parseInt(document.getElementById('table-number').value),
            capacity: parseInt(document.getElementById('table-capacity').value),
            status: document.getElementById('table-status').value,
            location: document.getElementById('table-location').value
        };

        tables.push(newTable);
        saveTables(tables);
        renderTables();
        addTableForm.reset();
        closeAddTableModal();
        showToast('Table added successfully');
    });
}

const editTableForm = document.getElementById('edit-table-form');
if (editTableForm) {
    editTableForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const tableId = parseInt(document.getElementById('edit-table-id').value);
        let tables = getTables();
        const tableIndex = tables.findIndex(t => t.id === tableId);

        if (tableIndex === -1) return;

        tables[tableIndex] = {
            id: tableId,
            number: parseInt(document.getElementById('edit-table-number').value),
            capacity: parseInt(document.getElementById('edit-table-capacity').value),
            status: document.getElementById('edit-table-status').value,
            location: document.getElementById('edit-table-location').value
        };

        saveTables(tables);
        renderTables();
        closeEditTableModal();
        showToast('Table updated successfully');
    });
}

const addMenuForm = document.getElementById('add-menu-form');
if (addMenuForm) {
    addMenuForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const menu = getMenu();
        const name = document.getElementById('menu-name').value;
        const newId = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

        const newItem = {
            id: newId,
            name: name,
            description: document.getElementById('menu-description').value,
            price: parseFloat(document.getElementById('menu-price').value),
            category: document.getElementById('menu-category').value,
            image: document.getElementById('menu-image').value
        };

        menu.push(newItem);
        saveMenu(menu);
        renderMenu();
        addMenuForm.reset();
        closeAddMenuModal();
        showToast('Menu item added successfully');
    });
}

const editMenuForm = document.getElementById('edit-menu-form');
if (editMenuForm) {
    editMenuForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const itemId = document.getElementById('edit-menu-id').value;
        let menu = getMenu();
        const itemIndex = menu.findIndex(m => m.id === itemId);

        if (itemIndex === -1) return;

        menu[itemIndex] = {
            id: itemId,
            name: document.getElementById('edit-menu-name').value,
            description: document.getElementById('edit-menu-description').value,
            price: parseFloat(document.getElementById('edit-menu-price').value),
            category: document.getElementById('edit-menu-category').value,
            image: document.getElementById('edit-menu-image').value
        };

        saveMenu(menu);
        renderMenu();
        closeEditMenuModal();
        showToast('Menu item updated successfully');
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initManagePage);
} else {
    initManagePage();
}
