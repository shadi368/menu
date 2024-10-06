let itemsArray = []; // Global array to store the added items
let totalPrice = 0; // Initialize the total price
let orderSection = document.createElement('div');
let totalPriceDiv = document.createElement('div');

// Cache frequently used elements
const controlPanel = document.querySelector(".form");
const drinksItemsContainer = document.querySelector('.drinks-items');
const sandwichesItemsContainer = document.querySelector('.sandwiches-items');
const body = document.body;

// Initialize order section and total price div
function initializeOrderUI() {
    orderSection.classList.add('order-items', 'w-full', 'mt-10', 'p-5', 'bg-white', 'rounded-lg', 'shadow-lg');
    totalPriceDiv.classList.add('total-price', 'text-lg', 'font-bold', 'text-yellow-600', 'mt-5');
    body.appendChild(orderSection);
    body.appendChild(totalPriceDiv);
}

// Show control panel
function displayControlPannel() {
    controlPanel.classList.remove("hidden");
}

// Hide control panel
function removeControlPanel() {
    controlPanel.classList.add("hidden");
}

// Show image input
function addImageInput() {
    document.getElementById('image-input-container').classList.remove('hidden');
}

// Validate item input
function validateItems() {
    const fields = {
        category: document.getElementById('category'),
        name: document.getElementById('name'),
        price: document.getElementById('price'),
        details: document.getElementById('details')
    };
    let isValid = true;

    // Hide all invalid messages
    Object.keys(fields).forEach(field => document.getElementById(`invalid-${field}`).classList.add('hidden'));

    // Check for invalid inputs
    Object.keys(fields).forEach(field => {
        if (!fields[field].value.trim() || (field === 'price' && (isNaN(fields[field].value) || Number(fields[field].value) <= 0))) {
            document.getElementById(`invalid-${field}`).classList.remove('hidden');
            isValid = false;
        }
    });

    return isValid;
}

// Add new item
function addItem() {
    if (!validateItems()) return;

    const item = {
        category: document.getElementById('category').value.trim(),
        name: document.getElementById('name').value.trim(),
        price: document.getElementById('price').value.trim(),
        details: document.getElementById('details').value.trim(),
        image: null
    };

    // Handle image file
    const itemImage = document.getElementById('image').files[0];
    if (itemImage) {
        const reader = new FileReader();
        reader.onload = (e) => {
            item.image = e.target.result;
            itemsArray.push(item);
            displayItems();
        };
        reader.readAsDataURL(itemImage);
    } else {
        itemsArray.push(item);
    }

    displayItems();
    removeControlPanel();
}

// Display items for drinks and sandwiches
function displayItems() {
    drinksItemsContainer.innerHTML = '';
    sandwichesItemsContainer.innerHTML = '';

    itemsArray.forEach((item, index) => {
        const itemDiv = createItemElement(item, index);
        (item.category === 'drinks' ? drinksItemsContainer : sandwichesItemsContainer).appendChild(itemDiv);
    });
}

// Create item element (both for display and order section)
function createItemElement(item, index) {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item', 'p-4', 'bg-gray-200', 'rounded-lg', 'shadow-md', 'm-2');

    let itemImageHTML = item.image ? `<img class="item-img max-w-full max-h-48 mb-3" src="${item.image}" alt="${item.name}">` : '';

    itemDiv.innerHTML = `
        <p class="item-name font-bold text-lg mb-1">${item.name}</p>
        <p class="description text-sm mb-2">${item.details}</p>
        ${itemImageHTML}
        <p class="item-price text-lg font-bold text-yellow-600 mb-2">$${item.price}</p>
        <button class="bg-red-500 text-white py-1 px-3 rounded" onclick="orderItem(${index})">Order</button>
        <button class="bg-red-500 text-white py-1 px-3 rounded" onclick="removeItem(${index})">Remove</button>
    `;
    return itemDiv;
}

// Order an item
function orderItem(index) {
    const orderedItem = itemsArray[index];
    const orderedDiv = createItemElement(orderedItem, index);
    orderSection.appendChild(orderedDiv);

    totalPrice += parseFloat(orderedItem.price);
    getTotalPrice();
}

// Display the total price
function getTotalPrice() {
    totalPriceDiv.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
}

// Remove an item from the array
function removeItem(index) {
    totalPrice -= parseFloat(itemsArray[index].price);
    itemsArray.splice(index, 1);
    displayItems();
    getTotalPrice();
}

// Initialize the order section when the page loads
initializeOrderUI();
