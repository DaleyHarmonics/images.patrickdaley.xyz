document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".menu-item");
    const contentArea = document.getElementById("content-area");

    function loadPage(page) {
        fetch(`pages/${page}`)
            .then(response => response.text())
            .then(data => {
                contentArea.innerHTML = data;
            })
            .catch(error => console.error("Error loading page:", error));
    }

    menuItems.forEach(item => {
        item.addEventListener("click", function () {
            menuItems.forEach(el => el.classList.remove("active"));
            this.classList.add("active");
            loadPage(this.dataset.page);
        });
    });

    loadPage("tagline.html");
});
