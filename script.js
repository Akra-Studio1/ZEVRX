
/* =========================================
   ZEVRX — COMPLETE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const intro = document.getElementById("intro");
    const site = document.getElementById("site");
    const enterButton = document.getElementById("enterSite");
    const engineSound = document.getElementById("engineSound");

    const menuToggle = document.getElementById("menuToggle");
    const navigation = document.getElementById("navigation");

    const contactForm = document.getElementById("contact-form");
    const header = document.getElementById("header");


    // =====================================
    // INTRO — CAR DEPARTURE
    // =====================================

    document.body.classList.add("loading");

    let introStarted = false;

    function finishIntro() {

        if (!intro || !site) return;

        intro.classList.add("hidden");
        site.classList.add("visible");

        document.body.classList.remove("loading");

        setTimeout(() => {
            intro.style.display = "none";
        }, 1000);
    }


    async function startIntro() {

        if (introStarted) return;

        introStarted = true;

        if (enterButton) {
            enterButton.disabled = true;
            enterButton.setAttribute("aria-label", "Машина отправляется");
        }

        // Start engine audio after the user's click.
        if (engineSound) {

            try {
                engineSound.volume = 0.65;
                engineSound.currentTime = 0;

                await engineSound.play();

            } catch (error) {
                // The website will still open if audio is unavailable.
                console.warn("Engine audio unavailable:", error);
            }

        }

        // Start the car animation.
        if (intro) {
            intro.classList.add("is-running");
        }

        // Match the CSS car animation duration.
        setTimeout(() => {
            finishIntro();
        }, 2900);

    }


    if (enterButton) {
        enterButton.addEventListener("click", startIntro);
    } else {
        finishIntro();
    }


    // =====================================
    // MOBILE NAVIGATION
    // =====================================

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navigation.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });


        navigation.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navigation.classList.remove("open");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

            });

        });


        document.addEventListener("click", event => {

            const clickedInside =
                navigation.contains(event.target) ||
                menuToggle.contains(event.target);

            if (!clickedInside) {

                navigation.classList.remove("open");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

            }

        });

    }


    // =====================================
    // HEADER SCROLL EFFECT
    // =====================================

    function updateHeader() {

        if (!header) return;

        header.classList.toggle("scrolled", window.scrollY > 40);

    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    // =====================================
    // SCROLL REVEAL
    // =====================================

    const revealElements = document.querySelectorAll(
        ".section-heading, .about-grid, .about-bottom, .service-card, .feature-content, .feature-image, .gallery-item, .contact-grid"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("revealed");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {

            element.classList.add("reveal");

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("revealed");
        });

    }


    // =====================================
    // DEMO CONTACT FORM
    // =====================================

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            if (!contactForm.reportValidity()) return;

            const name = document.getElementById("name");
            const phone = document.getElementById("phone");
            const service = document.getElementById("service");

            if (
                !name ||
                !phone ||
                !service ||
                !name.value.trim() ||
                !phone.value.trim() ||
                !service.value
            ) {
                return;
            }

            alert(
                "Спасибо, " + name.value.trim() + "!\n\n" +
                "Демонстрационная заявка заполнена.\n" +
                "Для реальной отправки необходимо подключить контакты студии."
            );

            contactForm.reset();

        });

    }


    // =====================================
    // IMAGE ERROR CHECK
    // =====================================

    document.querySelectorAll("img").forEach(image => {

        image.addEventListener("error", () => {

            console.warn(
                "Image not found: " + image.getAttribute("src")
            );

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


    console.log("ZEVRX — website successfully initialized.");

});
