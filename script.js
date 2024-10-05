let itemsArray = []; // Global array to store the added items

function displayControlPannel() {
    let controlPanel = document.querySelector(".form");
    controlPanel.classList.remove("hidden");
}

function removeControlPanel() {
    let controlPanel = document.querySelector(".form");
    controlPanel.classList.add("hidden");
}

function addImageInput() {
    let imageInputContainer = document.getElementById('image-input-container');
    imageInputContainer.classList.remove('hidden'); // Use Tailwind's hidden class
}

function addItem() {
    let itemCategory = document.getElementById('category').value.trim();
    let itemName = document.getElementById('name').value.trim();
    let itemPrice = document.getElementById('price').value.trim();
    let itemDetails = document.getElementById('details').value.trim();
    let itemImage = document.getElementById('image').files[0];

    let isValid = validateItems();

    if (isValid) {
        let reader = new FileReader();
        reader.onload = function(event) {
            let imageUrl = event.target.result;
            let newItem = {
                category: itemCategory,
                name: itemName,
                price: itemPrice,
                details: itemDetails,
                image: imageUrl
            };

            itemsArray.push(newItem);
            displayItems();
            removeControlPanel(); // Hide the form after adding
        };

        if (itemImage) {
            reader.readAsDataURL(itemImage);
        } else {
            let newItem = {
                category: itemCategory,
                name: itemName,
                price: itemPrice,
                details: itemDetails,
                image: null // No image provided
            };

            itemsArray.push(newItem);
            displayItems();
            alert("Item added successfully!");
            removeControlPanel();
        }
    }
}

function validateItems() {
    let itemCategory = document.getElementById('category').value.trim();
    let itemName = document.getElementById('name').value.trim();
    let itemPrice = document.getElementById('price').value.trim();
    let itemDetails = document.getElementById('details').value.trim();

    let isValid = true;

    document.getElementById('invalid-category').classList.add('hidden');
    document.getElementById('invalid-name').classList.add('hidden');
    document.getElementById('invalid-price').classList.add('hidden');
    document.getElementById('invalid-details').classList.add('hidden');

    if (itemCategory === "") {
        document.getElementById('invalid-category').classList.remove('hidden');
        isValid = false;
    }

    if (itemName === "") {
        document.getElementById('invalid-name').classList.remove('hidden');
        isValid = false;
    }

    if (itemPrice === "" || isNaN(itemPrice) || Number(itemPrice) <= 0) {
        document.getElementById('invalid-price').classList.remove('hidden');
        isValid = false;
    }

    if (itemDetails === "") {
        document.getElementById('invalid-details').classList.remove('hidden');
        isValid = false;
    }

    return isValid;
}

function displayItems() {
    document.querySelector('.drinks-items').innerHTML = '';
    document.querySelector('.sandwiches-items').innerHTML = '';

    itemsArray.forEach((item, index) => {
        let itemDiv = document.createElement('div');
        itemDiv.classList.add('item', 'p-4', 'bg-gray-200', 'rounded-lg', 'shadow-md', 'm-2');

        let itemImageHTML = item.image ? `<img class="item-img max-w-full max-h-48 mb-3" src="${item.image}" alt="${item.name}">` : '';

        itemDiv.innerHTML = `
            <p class="item-name font-bold text-lg mb-1">${item.name}</p>
            <p class="description text-sm mb-2">${item.details}</p>
            ${itemImageHTML}
            <p class="item-price text-lg font-bold text-yellow-600 mb-2">$${item.price}</p>
            <button class="bg-red-500 text-white py-1 px-3 rounded" onclick="removeItem(${index})">Order</button>
        `;

        if (item.category === 'drinks') {
            document.querySelector('.drinks-items').appendChild(itemDiv);
        } else if (item.category === 'sandwiches') {
            document.querySelector('.sandwiches-items').appendChild(itemDiv);
        }
    });
}

function removeItem(index) {
    itemsArray.splice(index, 1);
    displayItems();
}
