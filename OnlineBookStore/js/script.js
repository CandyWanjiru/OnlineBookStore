document.addEventListener("DOMContentLoaded", function () {
    const topBtn = document.getElementById("topBtn");
    if (topBtn) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                topBtn.style.display = "block";
                setTimeout(() => { topBtn.style.opacity = "1"; }, 10);
            } else {
                topBtn.style.opacity = "0";
                setTimeout(() => { 
                    if (window.scrollY <= 300) topBtn.style.display = "none"; 
                }, 300);
            }
        });
        topBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    const themeBtn = document.getElementById("themeBtn");
    const currentTheme = localStorage.getItem("theme") || "light";
    if (currentTheme === "dark") {
        document.body.classList.add("dark-theme");
        if (themeBtn) themeBtn.innerHTML = "☀️ Light Mode";
    }
    if (themeBtn) {
        themeBtn.addEventListener("click", function () {
            document.body.classList.toggle("dark-theme");
            let theme = "light";
            if (document.body.classList.contains("dark-theme")) {
                theme = "dark";
                themeBtn.innerHTML = "☀️ Light Mode";
            } else {
                themeBtn.innerHTML = "🌙 Dark Mode";
            }
            localStorage.setItem("theme", theme);
        });
    }

    const contactForm = document.querySelector(".contact-glass-card form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const nameInput = document.getElementById("contactName").value;
            alert(`Thank you for your message, ${nameInput}! 🚀 Candy will get back to you shortly.`);
            contactForm.reset();
        });
    }

    const exploreBtns = document.querySelectorAll(".btn-explore, .book-card .btn, .card .btn, .gallery-row .btn");
    exploreBtns.forEach(btn => {
        if (btn.closest(".category-card")) return;
        if (btn.getAttribute("href") === "#" || !btn.getAttribute("href")) {
            btn.addEventListener("click", function (e) {
                e.preventDefault();
                const parentBox = this.closest(".card") || this.closest(".gallery-details-box");
                const cardTitleElement = parentBox?.querySelector(".card-title, h5, .gallery-title");
                const priceElement = parentBox?.querySelector(".book-price-tag");
                
                const itemTitle = cardTitleElement ? cardTitleElement.textContent.trim() : "this selection";
                const itemPrice = priceElement ? priceElement.textContent.trim() : "Standard Price";
                
                alert(`Proceeding to processing options for:\n📚 ${itemTitle}\n💰 Price: ${itemPrice}`);
            });
        }
    });

    const categoryCards = document.querySelectorAll(".category-card");
    categoryCards.forEach(card => {
        const actionBtn = card.querySelector(".btn");
        const triggerTargets = actionBtn ? [card, actionBtn] : [card];
        
        triggerTargets.forEach(target => {
            if (target === card) card.style.cursor = "pointer";
            target.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                const catTitle = card.querySelector("h5") ? card.querySelector("h5").textContent.trim().toLowerCase() : "";
                
                let targetSlugs = [];
                if (catTitle.includes("self help") || catTitle.includes("self-help")) {
                    targetSlugs = ["7 habits", "atomic habits", "subtle art", "can't hurt me"];
                } else if (catTitle.includes("finance") || catTitle.includes("wealth")) {
                    targetSlugs = ["rich dad", "psychology of money"];
                } else if (catTitle.includes("psychology")) {
                    targetSlugs = ["think and grow rich"];
                } else if (catTitle.includes("productivity")) {
                    targetSlugs = ["deep work"];
                } else if (catTitle.includes("business")) {
                    targetSlugs = ["lean"];
                } else if (catTitle.includes("biography")) {
                    targetSlugs = ["educated"];
                } else if (catTitle.includes("fiction")) {
                    targetSlugs = ["alchemist", "midnight library"];
                }

                if (targetSlugs.length > 0) {
                    window.location.href = `gallery.html?highlight=${encodeURIComponent(targetSlugs.join(","))}`;
                } else {
                    window.location.href = "gallery.html";
                }
            });
        });
    });

    if (window.location.pathname.includes("gallery.html")) {
        const urlParams = new URLSearchParams(window.location.search);
        const searchKeywordsParam = urlParams.get("highlight");

        if (searchKeywordsParam) {
            const searchKeywords = searchKeywordsParam.split(",");
            const galleryRows = document.querySelectorAll(".gallery-row");
            let firstScrolled = false;

            galleryRows.forEach(row => {
                const titleEl = row.querySelector(".gallery-title");
                if (titleEl) {
                    const rowTitleLower = titleEl.textContent.toLowerCase();
                    const matchFound = searchKeywords.some(keyword => rowTitleLower.includes(keyword.trim().toLowerCase()));

                    if (matchFound) {
                        if (!firstScrolled) {
                            row.scrollIntoView({ behavior: "smooth", block: "center" });
                            firstScrolled = true;
                        }
                        
                        const frame = row.querySelector(".gallery-img-frame") || row;
                        const originalTransition = frame.style.transition;
                        
                        frame.style.transition = "all 0.3s ease";
                        frame.style.boxShadow = "0 0 35px 15px #ffffff";
                        frame.style.transform = "scale(1.05)";
                        frame.style.borderColor = "#ffffff";

                        setTimeout(() => {
                            frame.style.boxShadow = "";
                            frame.style.transform = "";
                            frame.style.borderColor = "";
                            setTimeout(() => {
                                frame.style.transition = originalTransition;
                            }, 300);
                        }, 1000);
                    }
                }
            });
        }
    }
=======
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
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

if (topBtn) {
    topBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
window.addEventListener("load", function () {
    console.log("Welcome to Book Haven!");
>>>>>>> 4d75370033993493267c7af212467c8ab4c37ac4
});