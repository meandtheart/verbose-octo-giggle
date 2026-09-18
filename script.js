// ================================
// ENTER BUTTON & INITIAL SETUP
// ================================

const intro = document.getElementById("intro");
const mainSite = document.getElementById("mainSite");
const enterBtn = document.getElementById("enterBtn");

enterBtn.addEventListener("click", function () {
    // Hide intro screen
    intro.classList.add("hide");

    // Show main website after a brief pause
    setTimeout(function () {
        mainSite.classList.add("visible");
        window.scrollTo(0, 0);

        // Show the first section (hero) by default
        const heroSection = document.querySelector(".hero");
        if (heroSection) {
            heroSection.classList.add("active-section");
        }

        startRevealObserver();
    }, 700);
});


// ================================
// SAFE GRID SCREEN SWITCHER
// ================================

const scrollButtons = document.querySelectorAll(".scroll-btn");
const allSections = document.querySelectorAll("#mainSite .section, #mainSite .secret-section");

scrollButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const targetId = button.getAttribute("data-target");
        const target = document.getElementById(targetId);

        if (target) {
            // Remove active and direction classes from all sections
            allSections.forEach(function (sec) {
                sec.classList.remove(
                    "active-section",
                    "slide-from-top",
                    "slide-from-right",
                    "fade-in-only",
                    "fade-out-style",
                    "final-cinematic-reveal"
                );
            });

            // Assign the correct transition effect based on your custom flow
            if (targetId === "birthday" || targetId === "unknown" || targetId === "letter") {
                target.classList.add("slide-from-top");
            } else if (targetId === "story" || targetId === "timeline") {
                target.classList.add("slide-from-right");
            } else if (targetId === "archive" || targetId === "things") {
                target.classList.add("fade-in-only");
            } else if (targetId === "music") {
                target.classList.add("fade-out-style");
            } else if (targetId === "final-section") {
                target.classList.add("final-cinematic-reveal");
            } else {
                target.classList.add("fade-in-only");
            }

            // Activate the target section right in place
            target.classList.add("active-section");

            // Gently scroll to the top of the new section after the transition starts
            setTimeout(function () {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }, 300);
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
