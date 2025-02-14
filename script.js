// Get references to elements
const uploadBtn = document.getElementById('uploadBtn');
const imageInput = document.getElementById('imageInput');
const imageGallery = document.getElementById('imageGallery');

// Load existing images from local storage
function loadImages() {
    const images = JSON.parse(localStorage.getItem('images')) || [];
    imageGallery.innerHTML = ''; // Clear the gallery
    images.forEach((image, index) => {
        displayImage(image, index);
    });
}

// Display image in the gallery
function displayImage(image, index) {
    const imgElement = document.createElement('div');
    imgElement.classList.add('image-item');
    imgElement.innerHTML = `
        <img src="${image}" alt="Uploaded Image">
        <button class="delete-btn" onclick="deleteImage(${index})">X</button>
    `;
    imageGallery.appendChild(imgElement);
}

// Handle image upload
uploadBtn.addEventListener('click', () => {
    const files = imageInput.files;
    if (files.length > 0) {
        const images = JSON.parse(localStorage.getItem('images')) || [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = (e) => {
                images.push(e.target.result);
                localStorage.setItem('images', JSON.stringify(images));
                displayImage(e.target.result, images.length - 1);
            };
            reader.readAsDataURL(file);
        }
    }
});

// Delete image
function deleteImage(index) {
    const images = JSON.parse(localStorage.getItem('images')) || [];
    images.splice(index, 1);
    localStorage.setItem('images', JSON.stringify(images));
    loadImages();
}

// Initialize the page by loading stored images
loadImages();
