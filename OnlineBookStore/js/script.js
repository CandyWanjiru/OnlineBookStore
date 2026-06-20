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
                const cardTitleElement = this.closest(".card")?.querySelector(".card-title, h5") || this.closest(".gallery-details-box")?.querySelector(".gallery-title");
                const itemTitle = cardTitleElement ? cardTitleElement.textContent.trim() : "this selection";
                alert(`Redirecting to purchase framework options for: ${itemTitle} 📚`);
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
                
                let targetSlug = "";
                if (catTitle.includes("finance") || catTitle.includes("wealth")) {
                    targetSlug = "psychology of money";
                } else if (catTitle.includes("mindset") || catTitle.includes("health") || catTitle.includes("habits")) {
                    targetSlug = "atomic habits";
                } else if (catTitle.includes("growth") || catTitle.includes("spiritual") || catTitle.includes("monk")) {
                    targetSlug = "think like a monk";
                } else if (catTitle.includes("business") || catTitle.includes("work") || catTitle.includes("deep")) {
                    targetSlug = "deep work";
                } else {
                    targetSlug = "all";
                }

                window.location.href = `gallery.html?highlight=${encodeURIComponent(targetSlug)}`;
            });
        });
    });

    if (window.location.pathname.includes("gallery.html")) {
        const urlParams = new URLSearchParams(window.location.search);
        const searchKeyword = urlParams.get("highlight");

        if (searchKeyword && searchKeyword !== "all") {
            const galleryRows = document.querySelectorAll(".gallery-row");
            galleryRows.forEach(row => {
                const titleEl = row.querySelector(".gallery-title");
                if (titleEl && titleEl.textContent.toLowerCase().includes(searchKeyword)) {
                    row.scrollIntoView({ behavior: "smooth", block: "center" });
                    
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
            });
        }
    }
});