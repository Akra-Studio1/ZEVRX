
/* =====================================================
   ZEVRX — PREMIUM DETAILING
   COMPLETE NEW JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ================================================
    // ELEMENTS
    // ================================================

    const intro = document.getElementById("intro");
    const site = document.getElementById("site");
    const enterButton = document.getElementById("enterSite");
    const engineSound = document.getElementById("engineSound");

    const menuToggle = document.getElementById("menuToggle");
    const navigation = document.getElementById("navigation");

    const header = document.getElementById("header");
    const contactForm = document.getElementById("contact-form");

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    // ================================================
    // INTRO — CINEMATIC CAR EXPERIENCE
    // ================================================

    let introStarted = false;

    function openWebsite() {

        if (!intro || !site) return;

        intro.classList.add("hidden");
        site.classList.add("visible");

        document.body.classList.remove("loading");

        setTimeout(() => {
            intro.style.display = "none";
        }, 1100);

    }


    function startExperience() {

        if (introStarted) return;

        introStarted = true;

        if (enterButton) {
            enterButton.disabled = true;
            enterButton.innerHTML = `
                <span>STARTING EXPERIENCE</span>
                <span class="intro-button-arrow">↗</span>
            `;
        }

        // Start engine sound after the user's click.
        if (engineSound) {

            engineSound.volume = 0.7;
            engineSound.currentTime = 0;

            const soundPromise = engineSound.play();

            if (soundPromise && typeof soundPromise.catch === "function") {
                soundPromise.catch(() => {
                    // Website still opens if audio is unavailable.
                });
            }

        }

        // Trigger the car departure animation.
        if (intro) {
            intro.classList.add("is-running");
        }

        // Give the car time to leave the screen.
        const animationDuration = reducedMotion ? 500 : 2800;

        setTimeout(() => {
            openWebsite();
        }, animationDuration);

    }


    if (enterButton) {
        enterButton.addEventListener("click", startExperience);
    } else {
        openWebsite();
    }


    // ================================================
    // MOBILE NAVIGATION
    // ================================================

    function closeMenu() {

        if (!menuToggle || !navigation) return;

        navigation.classList.remove("open");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

    }


    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", (event) => {

            event.stopPropagation();

            const isOpen = navigation.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });


        navigation.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", closeMenu);

        });


        document.addEventListener("click", (event) => {

            const clickedInsideMenu =
                navigation.contains(event.target) ||
                menuToggle.contains(event.target);

            if (!clickedInsideMenu) {
                closeMenu();
            }

        });

    }


    // ================================================
    // HEADER SCROLL EFFECT
    // ================================================

    function updateHeader() {

        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 40
        );

    }


    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    // ================================================
    // SCROLL REVEAL ANIMATIONS
    // ================================================

    const revealSelectors = [
        ".section-heading",
        ".about-layout",
        ".about-stats",
        ".service-card",
        ".feature-content",
        ".gallery-item",
        ".contact-heading",
        ".contact-form"
    ];

    const revealElements = document.querySelectorAll(
        revealSelectors.join(",")
    );


    if ("IntersectionObserver" in window && !reducedMotion) {

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("revealed");

                        currentObserver.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );


        revealElements.forEach(element => {

            element.classList.add("reveal");

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("revealed");
        });

    }


    // ================================================
    // CONTACT FORM — DEMO MODE
    // ================================================

    if (contactForm) {

        contactForm.addEventListener("submit", (event) => {

            event.preventDefault();

            if (!contactForm.reportValidity()) return;

            const name = document.getElementById("name");
            const phone = document.getElementById("phone");
            const service = document.getElementById("service");

            if (!name || !phone || !service) return;

            const customerName = name.value.trim();
            const customerPhone = phone.value.trim();
            const selectedService = service.value;

            if (
                customerName.length < 2 ||
                customerPhone.length < 5 ||
                !selectedService
            ) {
                return;
            }

            alert(
                "Спасибо, " + customerName + "!\n\n" +
                "Ваша демонстрационная заявка заполнена.\n\n" +
                "Услуга: " + selectedService + "\n\n" +
                "Реальная отправка заявок пока не подключена."
            );

            contactForm.reset();

        });

    }


    // ================================================
    // IMAGE FALLBACK
    // ================================================

    document.querySelectorAll("img").forEach(image => {

        image.addEventListener("error", () => {

            image.classList.add("image-error");

            console.warn(
                "ZEVRX image not found:",
                image.getAttribute("src")
            );

        });

    });


    // ================================================
    // ESCAPE KEY — CLOSE MOBILE MENU
    // ================================================

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    // ================================================
    // INITIALIZATION
    // ================================================

    console.log("ZEVRX website initialized successfully.");

});
