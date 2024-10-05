let itemsArray = []; // Global array to store the added items

function displayControlPannel() {
    let controlPanel = document.getElementById("form");
    controlPanel.style.display = "flex";
}

function removeControlPanel() {
    let controlPanel = document.getElementById("form");
    controlPanel.style.display = "none";
}

function addImageInput() {
    // Show the hidden image input field
    let imageInputContainer = document.getElementById('image-input-container');
    imageInputContainer.style.display = 'block';
}

function addItem() {
    // Get the values from the input fields
    let itemCategory = document.getElementById('category').value.trim();
    let itemName = document.getElementById('name').value.trim();
    let itemPrice = document.getElementById('price').value.trim();
    let itemDetails = document.getElementById('details').value.trim();
    let itemImage = document.getElementById('image').files[0]; // Get the image file

    // Run validation before proceeding
    let isValid = validateItems();

    // If the form is valid, proceed with adding the item
    if (isValid) {
        // Convert image to base64
        let reader = new FileReader();
        reader.onload = function(event) {
            let imageUrl = event.target.result;

            // Add the item to the array
            let newItem = {
                category: itemCategory,
                name: itemName,
                price: itemPrice,
                details: itemDetails,
                image: imageUrl // Store the base64 image data
            };

            // Push the new item to the array
            itemsArray.push(newItem);

            // Display the updated items in the appropriate category
            displayItems();

            // Alert success message

            // Optionally, hide the control panel after adding an item
            removeControlPanel();
        };
        
        // Read the image as base64 if an image was uploaded
        if (itemImage) {
            reader.readAsDataURL(itemImage);
        } else {
            // If no image is uploaded, proceed without an image
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

    let isValid = true; // Flag to track if form is valid

    // Clear previous error messages
    document.getElementById('invalid-category').style.display = 'none';
    document.getElementById('invalid-name').style.display = 'none';
    document.getElementById('invalid-price').style.display = 'none';
    document.getElementById('invalid-details').style.display = 'none';

    // Validate item category (not empty)
    if (itemCategory === "") {
        document.getElementById('invalid-category').style.display = 'block';
        isValid = false;
    }

    // Validate item name (not empty)
    if (itemName === "") {
        document.getElementById('invalid-name').style.display = 'block';
        isValid = false;
    }

    // Validate item price (not empty and a valid positive number)
    if (itemPrice === "") {
        document.getElementById('invalid-price').style.display = 'block';
        isValid = false;
    } else if (isNaN(itemPrice) || Number(itemPrice) <= 0) {
        document.getElementById('invalid-price').style.display = 'block';
        isValid = false;
    }

    // Validate item details (not empty)
    if (itemDetails === "") {
        document.getElementById('invalid-details').style.display = 'block';
        isValid = false;
    }

    return isValid; // Return false if invalid, true if valid
}

function displayItems() {
    // Clear both sections before displaying updated items
    document.querySelector('.drinks-items').innerHTML = '';
    document.querySelector('.sandwiches-items').innerHTML = '';

    // Loop through itemsArray and display each item in the appropriate section
    itemsArray.forEach((item, index) => {
        // Create an item div
        let itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        // Add the content inside the item div
        let itemImageHTML = item.image ? `<img class="item-img" src="${item.image}" alt="${item.name}" style="max-width: 200px; max-height: 200px;">` : '';

        itemDiv.innerHTML = `
            <p class="item-name">${item.name}</p>
            <p class="description">${item.details}</p>
            ${itemImageHTML}
            <div>
            <p class="item-price">$${item.price}</p>
            <button onclick="removeItem(${index})">Order</button>
            </div>
            
        `;

        // Append the new item to the correct category section
        if (item.category === 'drinks') {
            document.querySelector('.drinks-items').appendChild(itemDiv);
        } else if (item.category === 'sandwiches') {
            document.querySelector('.sandwiches-items').appendChild(itemDiv);
        }
    });
}

function removeItem(index) {
    // Remove the item from the array
    itemsArray.splice(index, 1);

    // Update the displayed items
    displayItems();
}
