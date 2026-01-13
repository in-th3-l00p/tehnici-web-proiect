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

function deleteTable(tableId) {
    if (!confirm('Are you sure you want to delete this table?')) return;

    let tables = getTables();
    tables = tables.filter(t => t.id !== tableId);
    saveTables(tables);
    renderTables();
    showToast('Table deleted successfully');
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

function initTableForms() {
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
}
