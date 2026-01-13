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

function deleteMenuItem(itemId) {
    if (!confirm('Are you sure you want to delete this menu item?')) return;

    let menu = getMenu();
    menu = menu.filter(m => m.id !== itemId);
    saveMenu(menu);
    renderMenu();
    showToast('Menu item deleted successfully');
}

function initMenuForms() {
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
}
