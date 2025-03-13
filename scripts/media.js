document.addEventListener("DOMContentLoaded", function () {
    const imageGallery = document.getElementById("imageGallery");
    const filterButtons = document.querySelectorAll(".filter-btn");

    // Define categories and image directories
    const categories = {
        all: ["general", "fractal", "cloud"],
        general: ["general"],
        fractal: ["fractal"],
        cloud: ["cloud"]
    };

    function loadImages(category) {
        imageGallery.innerHTML = ""; // Clear previous images
        let selectedCategories = categories[category];

        selectedCategories.forEach(folder => {
            fetch(`../images/${folder}/`) // Get directory contents
                .then(response => response.text())
                .then(text => {
                    let parser = new DOMParser();
                    let doc = parser.parseFromString(text, "text/html");
                    let links = [...doc.querySelectorAll("a")];

                    links.forEach(link => {
                        let href = link.getAttribute("href");
                        if (href.match(/\.(jpg|jpeg|png|gif)$/i)) {
                            let imgElement = document.createElement("img");
                            imgElement.src = `../images/${folder}/${href}`;
                            imgElement.classList.add("gallery-image");

                            let gridItem = document.createElement("div");
                            gridItem.classList.add("grid-item");
                            gridItem.appendChild(imgElement);

                            imageGallery.appendChild(gridItem);
                        }
                    });
                })
                .catch(error => console.error("Error loading images:", error));
        });
    }

    // Filter button event listener
    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            loadImages(this.getAttribute("data-category"));
        });
    });

    loadImages("all");
});
