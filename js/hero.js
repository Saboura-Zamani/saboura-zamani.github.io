document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero-section");
  const main = document.querySelector("#main-content");
  const button = document.querySelector(".hero-button");

  if (!hero || !main) return;

  let isEntering = false;
  let touchStartY = 0;

  function enterWebsite(event) {
    if (event) event.preventDefault();
    if (isEntering) return;

    isEntering = true;

    // Start the fade-out animation
    hero.classList.add("hero-fading");
    document.body.classList.add("lock-scroll");

    // After the fade completes, fully remove the hero from the layout
    // so it can no longer be scrolled back into, and jump to the top
    // of the main content cleanly.
    setTimeout(() => {
      hero.classList.add("hero-gone");      // sets display:none in CSS
      document.body.classList.remove("lock-scroll");
      window.scrollTo({ top: 0, behavior: "auto" });
      isEntering = false;
    }, 350);
  }

  // Desktop/laptop mouse wheel
  hero.addEventListener(
    "wheel",
    (event) => {
      if (event.deltaY > 5 && window.scrollY < hero.offsetHeight * 0.7) {
        enterWebsite(event);
      }
    },
    { passive: false }
  );

  // Mobile touch start
  hero.addEventListener(
    "touchstart",
    (event) => {
      touchStartY = event.touches[0].clientY;
    },
    { passive: true }
  );

  // Mobile swipe up
  hero.addEventListener(
    "touchmove",
    (event) => {
      const touchCurrentY = event.touches[0].clientY;
      const swipeDistance = touchStartY - touchCurrentY;

      if (swipeDistance > 40 && window.scrollY < hero.offsetHeight * 0.7) {
        enterWebsite(event);
      }
    },
    { passive: false }
  );

  // Button click
  if (button) {
    button.addEventListener("click", enterWebsite);
  }
});
