document.addEventListener("DOMContentLoaded", function () {
    const imageGrid = document.getElementById("imageGrid");

    if (!imageGrid) {
        console.error("imageGrid not found!");
        return;
    }

    // Automatically detect all images in /images/
    const imageList = [
        "image1.jpg", "image2.png", "image3.webp",
        // Add all images you want here
    ];

    imageList.forEach(filename => {
        let img = document.createElement("img");
        img.src = `../images/${filename}`;
        img.alt = "Media Image";
        img.classList.add("grid-image");
        imageGrid.appendChild(img);
    });
});
