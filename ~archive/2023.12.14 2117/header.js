document.addEventListener("DOMContentLoaded", function () {
    // Load the header.html content into the current document
    fetch("C:/Users/jogle/Documents/GitHub/rutvikjoglekar.github.io/common.html")
        .then(response => response.text())
        .then(html => {
            document.querySelector("head").insertAdjacentHTML("afterbegin", html);
        });
});