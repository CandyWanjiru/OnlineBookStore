const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {
    themeBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            themeBtn.innerHTML = "☀️ Light Mode";
        } else {
            themeBtn.innerHTML = "🌙 Dark Mode";
        }
    });
}

const form = document.getElementById("contactForm");

if (form) {
    form.addEventListener("submit", function (event) {

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || message === "") {
            event.preventDefault();
            alert("Please fill in all fields.");
        }
    });
}const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("keyup", function () {

        const filter =
            searchInput.value.toLowerCase();

        const books =
            document.querySelectorAll(".book-card");

        books.forEach(function (book) {

            const text =
                book.innerText.toLowerCase();

            if (text.includes(filter)) {
                book.style.display = "";
            } else {
                book.style.display = "none";
            }

        });

    });
}