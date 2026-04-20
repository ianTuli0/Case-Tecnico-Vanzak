import { loadLottie } from "./lottie.js";

const products = [
  {
    bg: "../../assets/images/bg/blue.svg",
    bgMobile: "../../assets/images/bg/blue-mobile.svg",
    heroBg: "../../assets/images/products/vitamina-d.svg",
    content: "../../assets/images/products/vitamina-d-content.svg",
    contentMobile: "../../assets/images/products/vitamina-d-mobile-content.svg",
    benefits: "../../assets/images/products/vitamina-d-benefits.svg",
    lottie: "../../assets/lottie/vitamina-d.json",
    shadowColor: "rgba(80, 120, 200, 0.6)"
  },
  {
    bg: "../../assets/images/bg/green.svg",
    bgMobile: "../../assets/images/bg/green-mobile.svg",
    heroBg: "../../assets/images/products/ferro.svg",
    content: "../../assets/images/products/ferro-content.svg",
    contentMobile: "../../assets/images/products/ferro-mobile-content.svg",
    benefits: "../../assets/images/products/ferro-benefits.svg",
    lottie: "../../assets/lottie/ferro.json",
    shadowColor: "rgba(18, 61, 2, 0.6)"
  },
  {
    bg: "../../assets/images/bg/yellow.svg",
    bgMobile: "../../assets/images/bg/yellow-mobile.svg",
    heroBg: "../../assets/images/products/omega.svg",
    content: "../../assets/images/products/omega-content.svg",
    contentMobile: "../../assets/images/products/omega-mobile-content.svg",
    benefits: "../../assets/images/products/omega-benefits.svg",
    lottie: "../../assets/lottie/omega-3.json",
    shadowColor: "rgba(200, 140, 0, 0.6)"
  }
];

let currentIndex = 0;
let isAnimating = false;

function isMobile() {
  return window.innerWidth <= 768;
}

// Atualiza imagens ao cruzar o breakpoint mobile/desktop
let lastMobile = isMobile();

window.addEventListener('resize', () => {
  const nowMobile = isMobile();
  if (nowMobile !== lastMobile) {
    lastMobile = nowMobile;
    renderProduct();
  }
});

// Renderização

export function renderProduct() {
  const product = products[currentIndex];
  const mobile = isMobile();

  const bgSrc = mobile && product.bgMobile ? product.bgMobile : product.bg;

  const layer = document.getElementById("background-layer");
  const layerNext = document.getElementById("background-layer-next");

  layerNext.style.backgroundImage = `url('${bgSrc}')`;
  layer.style.opacity = "0";

  setTimeout(() => {
    layer.style.backgroundImage = `url('${bgSrc}')`;
    layer.style.opacity = "1";
  }, 600);

  const hero = document.querySelector(".hero-section");
  hero.style.backgroundImage = `url('${product.heroBg}')`;

  if (mobile) {
    document.getElementById("mobile-content-img")?.setAttribute("src", product.contentMobile);
    document.getElementById("mobile-benefits-img")?.setAttribute("src", product.benefits);
  } else {
    document.getElementById("content-img")?.setAttribute("src", product.content);
    document.getElementById("benefits-img")?.setAttribute("src", product.benefits);
  }

  document.documentElement.style.setProperty('--shadow-color', product.shadowColor);

  document.getElementById("hero-animation").innerHTML = "";

  loadLottie({
    containerId: "hero-animation",
    path: product.lottie
  });
}

// Animações do hero

function resetHero() {
  const hero = document.querySelector(".hero-section");
  hero.classList.remove("hero-slide-down");
}

function animateHeroInMobile() {
  const hero = document.querySelector(".hero-section");

  hero.style.transition = "none";
  hero.style.transform = "translateY(-120vh)";
  hero.style.opacity = "0";

  hero.offsetHeight;

  hero.style.transition = "transform 0.8s ease, opacity 0.8s ease";
  hero.style.transform = "translateY(0)";
  hero.style.opacity = "1";

  setTimeout(() => {
    hero.style.transition = "";
    hero.style.transform = "";
    hero.style.opacity = "";
  }, 800);
}

// Helpers

function getMobileImages() {
  return [
    document.getElementById("mobile-content-img"),
    document.getElementById("mobile-benefits-img")
  ].filter(Boolean);
}

function getDesktopImages() {
  return [
    document.getElementById("content-img"),
    document.getElementById("benefits-img")
  ].filter(Boolean);
}

// Animações desktop

function animateSideImagesOut() {
  getDesktopImages().forEach(img => {
    img.getBoundingClientRect();
    img.classList.add("slide-up-out");
  });
}

function animateSideImagesIn() {
  if (isMobile()) return;

  const hero = document.querySelector(".hero-section");
  const imgs = getDesktopImages();

  imgs.forEach(img => {
    img.style.transition = "none";
    img.style.transform = "translateY(-120vh)";
    img.style.opacity = "0";
  });

  hero.style.transition = "none";
  hero.style.transform = "translateY(-120vh)";
  hero.style.opacity = "0";

  hero.offsetHeight;

  imgs.forEach(img => {
    img.style.transition = "transform 0.8s ease, opacity 0.8s ease";
    img.style.transform = "translateY(0)";
    img.style.opacity = "1";
  });

  hero.style.transition = "transform 0.8s ease, opacity 0.8s ease";
  hero.style.transform = "translateY(0)";
  hero.style.opacity = "1";

  setTimeout(() => {
    hero.style.transition = "";
    hero.style.transform = "";
    hero.style.opacity = "";
  }, 800);
}

function animateHeroOut(callback) {
  const portal = document.querySelector(".portal");
  const hero = document.querySelector(".hero-section");

  portal.classList.add("portal-open");

  setTimeout(() => {
    hero.classList.add("hero-slide-down");

    setTimeout(() => {
      portal.classList.remove("portal-open");

      setTimeout(() => {
        if (!isMobile()) animateSideImagesOut();

        setTimeout(() => {
          if (!isMobile()) {
            getDesktopImages().forEach(img => img.classList.remove("slide-up-out"));
          }

          callback();

          if (!isMobile()) {
            animateSideImagesIn();
          }

        }, 400);
      }, 300);
    }, 800);
  }, 600);
}

// Animações mobile

function slideMobileImgs(direction) {
  const imgs = getMobileImages();
  const outX = direction === "left" ? "-110%" : "110%";
  const inX  = direction === "left" ? "110%"  : "-110%";

  setTimeout(() => {
    imgs.forEach(img => {
      img.style.transition = "none";
      img.style.transform = "";
      img.style.opacity = "";
    });

    imgs[0]?.offsetHeight;

    imgs.forEach(img => {
      img.style.transition = "transform 0.4s ease, opacity 0.4s ease";
      img.style.transform = `translateX(${outX})`;
      img.style.opacity = "0";
    });
  }, 2000);

  return () => {
    imgs.forEach(img => {
      img.style.transition = "none";
      img.style.transform = `translateX(${inX})`;
      img.style.opacity = "0";
    });

    imgs[0]?.offsetHeight;

    imgs.forEach(img => {
      img.style.transition = "transform 0.4s ease, opacity 0.4s ease";
      img.style.transform = "translateX(0)";
      img.style.opacity = "1";
    });

    setTimeout(() => {
      imgs.forEach(img => {
        img.style.transition = "";
        img.style.transform = "";
        img.style.opacity = "";
      });
    }, 800);
  };
}

// Controles de navegação

export function next() {
  if (isAnimating) return;
  isAnimating = true;

  if (isMobile()) {
    const enterImgs = slideMobileImgs("left");

    animateHeroOut(() => {
      currentIndex = (currentIndex + 1) % products.length;

      renderProduct();
      resetHero();
      animateHeroInMobile();
      enterImgs();

      setTimeout(() => { isAnimating = false; }, 800);
    });
  } else {
    animateHeroOut(() => {
      currentIndex = (currentIndex + 1) % products.length;

      renderProduct();
      resetHero();

      isAnimating = false;
    });
  }
}

export function prev() {
  if (isAnimating) return;
  isAnimating = true;

  if (isMobile()) {
    const enterImgs = slideMobileImgs("right");

    animateHeroOut(() => {
      currentIndex = (currentIndex - 1 + products.length) % products.length;

      renderProduct();
      resetHero();
      animateHeroInMobile();
      enterImgs();

      setTimeout(() => { isAnimating = false; }, 800);
    });
  } else {
    animateHeroOut(() => {
      currentIndex = (currentIndex - 1 + products.length) % products.length;

      renderProduct();
      resetHero();

      isAnimating = false;
    });
  }
}