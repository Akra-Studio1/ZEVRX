const intro = document.getElementById("intro");
const introCar = document.getElementById("introCar");
const enterButton = document.getElementById("enterSite");
const engineSound = document.getElementById("engineSound");
const site = document.getElementById("site");

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const header = document.getElementById("header");

let experienceStarted = false;

function startExperience() {
    if (experienceStarted) return;

    experienceStarted = true;

    // Запускаем звук двигателя
    if (engineSound) {
        engineSound.volume = 0.7;
        engineSound.currentTime = 0;

        const audioPromise = engineSound.play();

        if (audioPromise) {
            audioPromise.catch(() => {
                // Сайт продолжит работать, даже если звук заблокирован
            });
        }
    }

    // Двигаем только отдельный слой автомобиля
    intro.classList.add("is-running");

    // Показываем основной сайт после анимации
    setTimeout(() => {
        intro.classList.add("hidden");
        site.classList.add("visible");

        setTimeout(() => {
            intro.style.display = "none";
        }, 850);
    }, 2600);
}

enterButton.addEventListener("click", startExperience);

// Мобильное меню
menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
    });
});

// Шапка при прокрутке
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Появление блоков при прокрутке
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(element => {
    revealObserver.observe(element);
});

// Демонстрационная форма
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    alert("Это демонстрационная форма. Для реального сайта нужно подключить отправку заявок.");

    contactForm.reset();
});