// ================================
// ENTER BUTTON
// ================================

const intro = document.getElementById("intro");
const mainSite = document.getElementById("mainSite");
const enterBtn = document.getElementById("enterBtn");

enterBtn.addEventListener("click", function () {

    // Hide intro
    intro.classList.add("hide");

    // Show website
    setTimeout(function () {

        mainSite.classList.add("visible");

        startRevealObserver();

        initSlides();

    }, 700);
});


// ================================
// CLICK-TO-NAVIGATE SLIDES
// (each section is a full-screen "page";
// moving between them happens by clicking
// a dot, the arrow, or a text-button —
// never by scrolling the page itself)
// ================================

const slidesTrack = document.getElementById("slidesTrack");
const slideNav = document.getElementById("slideNav");
const slideNextBtn = document.getElementById("slideNextBtn");

let slides = [];
let currentSlide = 0;
let slidesReady = false;

// Sections whose background is dark, so the
// nav dots / arrow can switch to a light-safe look
const darkSlideIds = ["timeline", "final"];

function initSlides() {

    if (slidesReady) {
        return;
    }

    slides = Array.prototype.slice.call(slidesTrack.children);

    // Build the dot navigation
    slides.forEach(function (slide, index) {

        const dot = document.createElement("button");

        dot.classList.add("slide-dot");
        dot.type = "button";
        dot.setAttribute("aria-label", "Go to section " + (index + 1) + " of " + slides.length);

        dot.addEventListener("click", function () {
            goToSlide(index);
        });

        slideNav.appendChild(dot);

    });

    slideNextBtn.classList.add("visible");

    slideNextBtn.addEventListener("click", function () {

        if (currentSlide === slides.length - 1) {
            goToSlide(0);
        } else {
            goToSlide(currentSlide + 1);
        }

    });

    document.addEventListener("keydown", function (event) {

        if (!mainSite.classList.contains("visible")) {
            return;
        }

        if (secretOverlay.classList.contains("active")) {
            return;
        }

        if (["ArrowDown", "ArrowRight", "PageDown"].indexOf(event.key) !== -1) {
            event.preventDefault();
            goToSlide(currentSlide + 1);
        }

        if (["ArrowUp", "ArrowLeft", "PageUp"].indexOf(event.key) !== -1) {
            event.preventDefault();
            goToSlide(currentSlide - 1);
        }

        if (event.key === "Home") {
            event.preventDefault();
            goToSlide(0);
        }

        if (event.key === "End") {
            event.preventDefault();
            goToSlide(slides.length - 1);
        }

    });

    slidesReady = true;

    goToSlide(0);

}

function goToSlide(index) {

    if (index < 0 || index > slides.length - 1) {
        return;
    }

    currentSlide = index;

    slidesTrack.style.transform = "translateY(-" + (index * 100) + "vh)";

    const dots = slideNav.querySelectorAll(".slide-dot");

    dots.forEach(function (dot, dotIndex) {
        dot.classList.toggle("active", dotIndex === index);
    });

    const currentId = slides[index].id;
    const onDark = darkSlideIds.indexOf(currentId) !== -1;

    slideNav.setAttribute("data-on-dark", onDark ? "true" : "false");
    slideNextBtn.setAttribute("data-on-dark", onDark ? "true" : "false");

    slideNextBtn.classList.toggle("at-end", index === slides.length - 1);

}


// ================================
// TEXT-BUTTON SECTION LINKS
// (the "right here", "Anyway..." etc. buttons
// jump straight to a named slide, with the
// same click-to-navigate animation)
// ================================

const scrollButtons = document.querySelectorAll(".scroll-btn");

scrollButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const targetId = button.getAttribute("data-target");
        const targetIndex = slides.findIndex(function (slide) {
            return slide.id === targetId;
        });

        if (targetIndex !== -1) {
            goToSlide(targetIndex);
        }

    });

});


// ================================
// SCROLL REVEAL
// ================================

function startRevealObserver() {

    const elements = document.querySelectorAll(
        ".timeline-item, .thing-card, .unknown-item, .chat-photo, .letter-paper, .music-card"
    );

    elements.forEach(function (element) {
        element.classList.add("reveal");
    });

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.1
    });

    elements.forEach(function (element) {
        observer.observe(element);
    });
}


// ================================
// SECRET ECLIPSE
// ================================

const eclipseButton = document.getElementById("eclipseButton");
const secretOverlay = document.getElementById("secretOverlay");
const closeSecret = document.getElementById("closeSecret");

eclipseButton.addEventListener("click", function () {

    secretOverlay.classList.add("active");
    document.body.style.overflow = "hidden";

});

closeSecret.addEventListener("click", function () {

    secretOverlay.classList.remove("active");
    document.body.style.overflow = "";

});


// Click outside secret box to close

secretOverlay.addEventListener("click", function (event) {

    if (event.target === secretOverlay) {

        secretOverlay.classList.remove("active");
        document.body.style.overflow = "";

    }

});


// ================================
// ESC KEY
// ================================

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        secretOverlay.classList.remove("active");
        document.body.style.overflow = "";
    }

});


// ================================
// MUSIC
// ================================

const music = document.getElementById("birthdayMusic");
const musicBtn = document.getElementById("musicBtn");
const musicIcon = document.getElementById("musicIcon");
const musicText = document.getElementById("musicText");

if (musicBtn) {

    musicBtn.addEventListener("click", function () {

        if (music.paused) {

            music.play()
                .then(function () {

                    musicIcon.textContent = "Ⅱ";
                    musicText.textContent = "pause";

                })
                .catch(function () {

                    alert("Put your music file at assets/song.mp3");

                });

        } else {

            music.pause();

            musicIcon.textContent = "▶";
            musicText.textContent = "play something";

        }

    });

}


// ================================
// PREVENT IMAGE DRAGGING
// ================================

document.querySelectorAll("img").forEach(function (image) {

    image.addEventListener("dragstart", function (event) {

        event.preventDefault();

    });

});