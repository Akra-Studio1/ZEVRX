
/* =========================================
   ZEVRX — MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTS
    const intro = document.getElementById("intro");
    const site = document.getElementById("site");
    const enterButton = document.getElementById("enterSite");
    const engineSound = document.getElementById("engineSound");

    const menuToggle = document.getElementById("menuToggle");
    const navigation = document.getElementById("navigation");

    const contactForm = document.getElementById("contact-form");


    // =====================================
    // INTRO EXPERIENCE
    // =====================================

    document.body.classList.add("loading");

    let introFinished = false;

    function enterWebsite() {

        if (introFinished) return;

        introFinished = true;

        // Stop engine sound
        if (engineSound) {
            engineSound.pause();
            engineSound.currentTime = 0;
        }

        // Hide intro
        intro.classList.add("hidden");

        // Show website
        site.classList.add("visible");

        document.body.classList.remove("loading");

        // Remove intro from page after animation
        setTimeout(() => {
            intro.style.display = "none";
        }, 1100);
    }


    // Start sound only after a real user interaction
    if (enterButton && engineSound) {

        enterButton.addEventListener("click", async () => {

            if (introFinished) return;

            try {
                engineSound.volume = 0.65;
                engineSound.currentTime = 0;

                await engineSound.play();

                // Let the engine sound play while the intro is visible.
                // The visitor can enter the website with the button again.
            } catch (error) {
                console.warn("Engine audio could not be played:", error);
            }

            // Enter after a short cinematic pause
            setTimeout(() => {
                enterWebsite();
            }, 4200);

        });

    } else if (enterButton) {

        enterButton.addEventListener("click", enterWebsite);

    }


    // =====================================
    // MOBILE NAVIGATION
    // =====================================

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navigation.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute("aria-expanded", String(isOpen));

        });


        // Close menu after clicking a link
        navigation.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navigation.classList.remove("open");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

            });

        });


        // Close menu when clicking outside
        document.addEventListener("click", event => {

            const clickedInsideMenu =
                navigation.contains(event.target) ||
                menuToggle.contains(event.target);

            if (!clickedInsideMenu) {

                navigation.classList.remove("open");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

            }

        });

    }


    // =====================================
    // HEADER SCROLL EFFECT
    // =====================================

    const header = document.getElementById("header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateHeader, { passive: true });

    updateHeader();


    // =====================================
    // SCROLL REVEAL
    // =====================================

    const revealElements = document.querySelectorAll(
        ".section-heading, .about-grid, .about-bottom, .service-card, .feature-content, .feature-image, .gallery-item, .contact-grid"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver((entries, currentObserver) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                    currentObserver.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.12
        });

        revealElements.forEach(element => {
            element.classList.add("reveal");
            observer.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("revealed");
        });

    }


    // =====================================
    // CONTACT FORM — DEMO MODE
    // =====================================

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            if (!contactForm.reportValidity()) return;

            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const service = document.getElementById("service").value;

            if (!name || !phone || !service) return;

            alert(
                "Спасибо, " + name + "!\n\n" +
                "Ваша демонстрационная заявка заполнена.\n" +
                "Для реальной отправки необходимо подключить контакты студии."
            );

            contactForm.reset();

        });

    }


    // =====================================
    // IMAGE FALLBACK
    // =====================================

    document.querySelectorAll("img").forEach(image => {

        image.addEventListener("error", () => {

            console.warn("Image not found:", image.getAttribute("src"));

        });

    });


    // =====================================
    // SMOOTH ANCHOR NAVIGATION
    // =====================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", event => {

            const targetId = anchor.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    console.log("ZEVRX website initialized.");

});
