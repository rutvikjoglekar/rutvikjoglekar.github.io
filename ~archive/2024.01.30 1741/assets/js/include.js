// include.js
document.addEventListener('DOMContentLoaded', function () {
    // Include header
    fetch('header.html')
        .then(response => response.text())
        .then(html => document.getElementById('header').innerHTML = html);

});
