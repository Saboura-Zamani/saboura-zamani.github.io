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

    hero.classList.add("hero-fading");
    document.body.classList.add("lock-scroll");

    setTimeout(() => {
      window.scrollTo({
        top: main.offsetTop,
        behavior: "auto"
      });

      document.body.classList.remove("lock-scroll");

      setTimeout(() => {
        hero.classList.remove("hero-fading");
        isEntering = false;
      }, 300);
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