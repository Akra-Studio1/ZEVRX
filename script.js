
/* =========================================
   ZEVRX — PREMIUM DETAILING
   AKRA STUDIO
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     ELEMENTS
  ===================================== */

  const intro = document.getElementById("intro");
  const mainSite = document.getElementById("mainSite");
  const startButton = document.getElementById("startButton");
  const skipButton = document.getElementById("skipButton");
  const progressBar = document.getElementById("introProgress");

  let introFinished = false;
  let audioContext = null;
  let soundEnabled = true;

  /* =====================================
     ENGINE SOUND
     Original synthesized sound
  ===================================== */

  function playEngineSound() {
    if (!soundEnabled) return;

    try {
      const AudioContext =
        window.AudioContext || window.webkitAudioContext;

      if (!AudioContext) return;

      if (!audioContext) {
        audioContext = new AudioContext();
      }

      if (audioContext.state === "suspended") {
        audioContext.resume();
      }

      const ctx = audioContext;
      const now = ctx.currentTime;

      // Main engine oscillator
      const oscillator = ctx.createOscillator();
      const engineGain = ctx.createGain();

      oscillator.type = "sawtooth";

      oscillator.frequency.setValueAtTime(38, now);
      oscillator.frequency.exponentialRampToValueAtTime(
        115,
        now + 0.7
      );
      oscillator.frequency.exponentialRampToValueAtTime(
        65,
        now + 1.8
      );
      oscillator.frequency.exponentialRampToValueAtTime(
        48,
        now + 3.1
      );

      engineGain.gain.setValueAtTime(0.001, now);
      engineGain.gain.linearRampToValueAtTime(
        0.16,
        now + 0.35
      );
      engineGain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 3.2
      );

      oscillator.connect(engineGain);
      engineGain.connect(ctx.destination);

      oscillator.start(now);
      oscillator.stop(now + 3.3);

      // Secondary low-frequency layer
      const bass = ctx.createOscillator();
      const bassGain = ctx.createGain();

      bass.type = "sine";
      bass.frequency.setValueAtTime(42, now);
      bass.frequency.exponentialRampToValueAtTime(
        75,
        now + 0.8
      );
      bass.frequency.exponentialRampToValueAtTime(
        38,
        now + 3
      );

      bassGain.gain.setValueAtTime(0.001, now);
      bassGain.gain.linearRampToValueAtTime(
        0.12,
        now + 0.4
      );
      bassGain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 3.1
      );

      bass.connect(bassGain);
      bassGain.connect(ctx.destination);

      bass.start(now);
      bass.stop(now + 3.2);

    } catch (error) {
      console.warn("Audio could not be started:", error);
    }
  }

  /* =====================================
     INTRO PROGRESS
  ===================================== */

  function animateProgress(duration = 3000) {
    if (!progressBar) return;

    const start = performance.now();

    function update(currentTime) {
      if (introFinished) return;

      const elapsed = currentTime - start;
      const progress = Math.min(
        (elapsed / duration) * 100,
        100
      );

      progressBar.style.width = progress + "%";

      if (progress < 100) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  /* =====================================
     FINISH INTRO
  ===================================== */

  function finishIntro() {
    if (introFinished) return;

    introFinished = true;

    if (intro) {
      intro.classList.add("hidden");
    }

    if (mainSite) {
      mainSite.classList.add("visible");
    }

    document.body.classList.remove("intro-active");
  }

  /* =====================================
     START INTRO
  ===================================== */

  if (intro && mainSite) {
    document.body.classList.add("intro-active");

    if (startButton) {
      startButton.addEventListener("click", () => {
        if (introFinished) return;

        playEngineSound();
        animateProgress(3000);

        startButton.disabled = true;

        setTimeout(() => {
          finishIntro();
        }, 3200);
      });
    }

    if (skipButton) {
      skipButton.addEventListener("click", () => {
        finishIntro();
      });
    }

  } else if (mainSite) {
    mainSite.classList.add("visible");
  }

  /* =====================================
     MOBILE MENU
  ===================================== */

  const mobileMenu = document.querySelector(".mobile-menu");
  const navigation = document.querySelector(".navigation");

  if (mobileMenu && navigation) {

    mobileMenu.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
      navigation.classList.toggle("open");
    });

    navigation.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        navigation.classList.remove("open");
      });
    });

  }

  /* =====================================
     BEFORE / AFTER SLIDER
  ===================================== */

  const comparison = document.querySelector(".comparison");
  const comparisonInput = comparison
    ? comparison.querySelector("input")
    : null;

  const comparisonAfter = document.querySelector(
    ".comparison-after"
  );

  const comparisonDivider = document.querySelector(
    ".comparison-divider"
  );

  function updateComparison(value) {
    if (!comparisonAfter || !comparisonDivider) return;

    const position = Number(value);

    comparisonAfter.style.clipPath =
      `inset(0 0 0 ${position}%)`;

    comparisonDivider.style.left = position + "%";
  }

  if (comparisonInput) {
    updateComparison(comparisonInput.value || 50);

    comparisonInput.addEventListener("input", event => {
      updateComparison(event.target.value);
    });
  }

  /* =====================================
     CONTACT FORM
  ===================================== */

  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();

      const nameInput = contactForm.querySelector(
        'input[name="name"], input[type="text"]'
      );

      const phoneInput = contactForm.querySelector(
        'input[name="phone"], input[type="tel"]'
      );

      const serviceInput = contactForm.querySelector("select");

      const name = nameInput ? nameInput.value.trim() : "";
      const phone = phoneInput ? phoneInput.value.trim() : "";
      const service = serviceInput
        ? serviceInput.value
        : "";

      if (!name || !phone) {
        alert("Пожалуйста, заполните имя и номер телефона.");
        return;
      }

      alert(
        "Спасибо, " + name +
        "! Это демонстрационная форма ZEVRX. " +
        "Для отправки заявок необходимо подключить контакт компании."
      );

      contactForm.reset();
    });
  }

  /* =====================================
     BUTTON HOVER FEEDBACK
  ===================================== */

  document.querySelectorAll(".button-primary").forEach(button => {
    button.addEventListener("pointerdown", () => {
      button.style.transform = "scale(0.97)";
    });

    button.addEventListener("pointerup", () => {
      button.style.transform = "";
    });

    button.addEventListener("pointerleave", () => {
      button.style.transform = "";
    });
  });

  /* =====================================
     CURRENT YEAR
  ===================================== */

  const yearElement = document.querySelector("[data-year]");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

});
