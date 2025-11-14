// ========= КОНФИГ ВСЕХ КЕЙСОВ =========

const CASES = [
  {
    id: "icon-cyprus",
    shortTitle: "I-CON Cyprus",
    title: "I-CON на Кипре<br>Brand Experience Design",
    intro:
      "Нужно было создать яркую, лёгкую и коллекционную визуальную айдентику, которая бы ощущалась как летний бренд, а не корпоративный стенд.",
    theme: {
      bg: "#000000",
      accent: "#2f80ff",
    },
    images: [
      "images/Image_here.png",
      "images/Image_here-1.png",
      "images/Image_here-2.png",
      "images/Image_here-3.png",
      "images/Image_here-4.png",
      "images/Image_here-5.png",
      "images/Image_here-6.png",
      "images/Image_here-7.png",
      "images/Image_here-8.png",
      "images/Image_here-9.png",
    ],
    textBlocks: [
      {
        title: "Проблема",
        paragraphs: [
          "Перед конференцией I-CON на Кипре стояла задача выделить Trafee среди десятков стендов и брендов.",
          "Нужно было создать яркую, лёгкую и коллекционную визуальную айдентику, которая бы ощущалась как летний бренд, а не корпоративный стенд.",
        ],
      },
      {
        title: "Решение",
        paragraphs: [
          "Мы превратили бренд в коллекцию летнего мерча: футболки, сумки и ленты выглядели как лимитированная линейка lifestyle-бренда.",
          "Вся графика была построена на сочетании чистых поверхностей, тактильных тканей и акцентов цвета — минималистично, но с характером.",
        ],
      },
      {
        title: "Результат",
        paragraphs: [
          "Коллекция стала самым заметным мерчем конференции: гости активно обменивались футболками и сумками, а посты с мерчем Trafee заполнили соцсети.",
          "Участники отмечали, что визуал воспринимается как самостоятельный fashion-бренд, а не корпоративный подарок. Линейку продолжили использовать и после I-CON на следующих ивентах.",
        ],
      },
    ],
  },

  {
    id: "second-project",
    shortTitle: "Second Project",
    title: "Второй кейс<br>Creative Direction & Design",
    intro:
      "Заглушка для второго проекта. Здесь будет описание другого кейса: например, Tesla для такси, AI Dating или UCLIQ.",
    theme: {
      bg: "#020712",
      accent: "#ff8a00",
    },
    images: [
      "images/second-1.png",
      "images/second-2.png",
      "images/second-3.png",
    ],
    textBlocks: [
      {
        title: "Проблема",
        paragraphs: [
          "Перед брендом стояла задача выделиться в перенасыщенной нише и сделать продукт заметным и желанным.",
          "Нужно было создать визуальную историю, которая передаёт ощущение премиального, но доступного сервиса.",
        ],
      },
      {
        title: "Решение",
        paragraphs: [
          "Мы собрали визуальную систему вокруг контрастных акцентов, динамики и понятных UI-паттернов.",
          "Каждый экран и визуал работали как отдельный постер, но при этом собирались в единую историю бренда.",
        ],
      },
      {
        title: "Результат",
        paragraphs: [
          "Кампании с новым визуалом показали более высокий CTR и вовлечённость.",
          "Заказчик продолжил развивать линейку материалов именно в этом стиле.",
        ],
      },
    ],
  },
];

// ========= ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =========

let currentCaseIndex = 0;

let imageSliderInstance = null;
let textSliderInstance = null;
let projectsSliderInstance = null;

let activeSlider = null; // для управления стрелками клавиатуры

// ========= ИНИЦИАЛИЗАЦИЯ =========

document.addEventListener("DOMContentLoaded", () => {
  initParallax();

  initProjectsSlider();
  renderCase(currentCaseIndex);

  // стрелки на клавиатуре
  document.addEventListener("keydown", (e) => {
    if (!activeSlider) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      activeSlider.prev && activeSlider.prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      activeSlider.next && activeSlider.next();
    }
  });
});

// ========= РЕНДЕР КЕЙСА =========

function renderCase(index) {
  const data = CASES[index];
  if (!data) return;

  currentCaseIndex = index;

  // фон / акцент
  document.documentElement.style.setProperty("--bg-main", data.theme.bg);
  document.documentElement.style.setProperty(
    "--accent-blue",
    data.theme.accent
  );

  // заголовок и интро
  const titleEl = document.getElementById("case-title");
  const introEl = document.getElementById("case-intro");

  if (titleEl) titleEl.innerHTML = data.title;
  if (introEl) introEl.textContent = data.intro;

  // ===== СЛАЙДЕР КАРТИНОК =====
  const imageSliderEl = document.querySelector('[data-slider="images"]');
  const imageTrack = document.querySelector('[data-slider-track="images"]');
  const imageDots = document.querySelector('[data-slider-dots="images"]');

  const imagePrev = document.querySelector('[data-nav-zone="images-prev"]');
  const imageNext = document.querySelector('[data-nav-zone="images-next"]');

  if (imageSliderInstance && imageSliderInstance.destroy) {
    imageSliderInstance.destroy();
  }

  if (imageSliderEl && imageTrack && imageDots) {
    imageTrack.innerHTML = "";
    imageDots.innerHTML = "";

    const items = data.images.map((src) => ({ src }));

    imageSliderInstance = createLoopSlider({
      sliderEl: imageSliderEl,
      trackEl: imageTrack,
      dotsEl: imageDots,
      items,
      buildSlide: (item) => {
        const slide = document.createElement("article");
        slide.className = "slider-slide slider-slide--image";
        const img = document.createElement("img");
        img.src = item.src;
        img.alt = "";
        slide.appendChild(img);
        return slide;
      },
      dotClass: "slider-dot",
      dotActiveClass: "slider-dot--active",
      onChange: null,
      arrowPrevEl: imagePrev,
      arrowNextEl: imageNext,
    });
  }

  // ===== СЛАЙДЕР ТЕКСТА =====
  const textSliderEl = document.querySelector('[data-slider="text"]');
  const textTrack = document.querySelector('[data-slider-track="text"]');
  const textDots = document.querySelector('[data-slider-dots="text"]');

  const textPrev = document.querySelector('[data-nav-zone="text-prev"]');
  const textNext = document.querySelector('[data-nav-zone="text-next"]');

  if (textSliderInstance && textSliderInstance.destroy) {
    textSliderInstance.destroy();
  }

  if (textSliderEl && textTrack && textDots) {
    textTrack.innerHTML = "";
    textDots.innerHTML = "";

    const items = data.textBlocks;

    textSliderInstance = createLoopSlider({
      sliderEl: textSliderEl,
      trackEl: textTrack,
      dotsEl: textDots,
      items,
      buildSlide: (block) => {
        const card = document.createElement("article");
        card.className = "text-card";

        const header = document.createElement("header");
        header.className = "text-card-header";

        const dot = document.createElement("span");
        dot.className = "text-card-dot";

        const h = document.createElement("h2");
        h.className = "text-card-title";
        h.textContent = block.title;

        header.appendChild(dot);
        header.appendChild(h);

        const body = document.createElement("div");
        body.className = "text-card-body";

        block.paragraphs.forEach((t) => {
          const p = document.createElement("p");
          p.textContent = t;
          body.appendChild(p);
        });

        card.appendChild(header);
        card.appendChild(body);

        return card;
      },
      dotClass: "text-slider-dot",
      dotActiveClass: "text-slider-dot--active",
      onChange: null,
      arrowPrevEl: textPrev,
      arrowNextEl: textNext,
    });
  }

  // обновляем выделение названия проекта
  updateProjectPillsActiveState();
}

// ========= ПРОЕКТНЫЙ СЛАЙДЕР (ВЕРХНИЙ) =========

function initProjectsSlider() {
  const sliderEl = document.querySelector('[data-slider="projects"]');
  const trackEl = document.querySelector('[data-slider-track="projects"]');
  const dotsEl = document.querySelector('[data-slider-dots="projects"]');

  const arrowPrevEl = document.querySelector('[data-nav-zone="projects-prev"]');
  const arrowNextEl = document.querySelector('[data-nav-zone="projects-next"]');

  if (!sliderEl || !trackEl || !dotsEl) return;

  trackEl.innerHTML = "";
  dotsEl.innerHTML = "";

  const items = CASES.map((c) => ({ label: c.shortTitle }));

  projectsSliderInstance = createLoopSlider({
    sliderEl,
    trackEl,
    dotsEl,
    items,
    buildSlide: (item, index) => {
      const slide = document.createElement("div");
      slide.className = "slider-slide slider-slide--project-name";

      const pill = document.createElement("span");
      pill.className =
        "project-pill" + (index === 0 ? " project-pill--active" : "");
      pill.textContent = item.label;

      slide.appendChild(pill);
      return slide;
    },
    dotClass: "slider-dot",
    dotActiveClass: "slider-dot--active",
    onChange: (realIndex) => {
      if (realIndex !== currentCaseIndex) {
        renderCase(realIndex);
      }
    },
    arrowPrevEl,
    arrowNextEl,
  });
}

function updateProjectPillsActiveState() {
  const pills = document.querySelectorAll(".project-pill");
  pills.forEach((pill, idx) => {
    pill.classList.toggle("project-pill--active", idx === currentCaseIndex);
  });
}

// ========= УНИВЕРСАЛЬНЫЙ БЕСШОВНЫЙ СЛАЙДЕР =========

function createLoopSlider({
  sliderEl,
  trackEl,
  dotsEl,
  items,
  buildSlide,
  dotClass,
  dotActiveClass,
  onChange,
  arrowPrevEl,
  arrowNextEl,
}) {
  if (!items || items.length === 0) {
    return {
      prev() {},
      next() {},
      destroy() {},
    };
  }

  const realCount = items.length;

  // создаём реальные слайды
  const realSlides = items.map((item, i) => buildSlide(item, i));

  // очищаем трек
  trackEl.innerHTML = "";

  // клоны для бесшовной прокрутки
  const firstClone = buildSlide(items[0], 0);
  const lastClone = buildSlide(items[realCount - 1], realCount - 1);
  firstClone.dataset.clone = "true";
  lastClone.dataset.clone = "true";

  trackEl.appendChild(lastClone);
  realSlides.forEach((slide) => trackEl.appendChild(slide));
  trackEl.appendChild(firstClone);

  // точки
  dotsEl.innerHTML = "";
  const dots = [];
  for (let i = 0; i < realCount; i++) {
    const dot = document.createElement("span");
    dot.className = dotClass + (i === 0 ? ` ${dotActiveClass}` : "");
    dot.addEventListener("click", () => {
      goToSlide(i + 1, true);
    });
    dotsEl.appendChild(dot);
    dots.push(dot);
  }

  let currentIndex = 1; // индекс в allSlides (0..realCount+1)
  let isTransitioning = false;

  function setTransition(enable) {
    trackEl.style.transition = enable ? "transform 0.35s ease-out" : "none";
  }

  function applyTransform() {
    const offset = -currentIndex * 100;
    trackEl.style.transform = `translateX(${offset}%)`;
  }

  function getRealIndex() {
    if (currentIndex === 0) return realCount - 1;
    if (currentIndex === realCount + 1) return 0;
    return currentIndex - 1;
  }

  function updateDots() {
    const realIndex = getRealIndex();
    dots.forEach((dot, idx) => {
      dot.classList.toggle(dotActiveClass, idx === realIndex);
    });
  }

  function goToSlide(index, animate) {
    if (isTransitioning && animate) return;
    currentIndex = index;
    setTransition(animate);
    applyTransform();
    updateDots();
  }

  function goNext() {
    goToSlide(currentIndex + 1, true);
  }

  function goPrev() {
    goToSlide(currentIndex - 1, true);
  }

  // transition события
  const onTransitionStart = () => {
    isTransitioning = true;
  };

  const onTransitionEnd = () => {
    isTransitioning = false;

    if (currentIndex === 0) {
      setTransition(false);
      currentIndex = realCount;
      applyTransform();
    } else if (currentIndex === realCount + 1) {
      setTransition(false);
      currentIndex = 1;
      applyTransform();
    }

    const realIndex = getRealIndex();
    if (typeof onChange === "function") {
      onChange(realIndex);
    }
  };

  trackEl.addEventListener("transitionstart", onTransitionStart);
  trackEl.addEventListener("transitionend", onTransitionEnd);

  // стрелки
  if (arrowPrevEl) {
    arrowPrevEl.addEventListener("click", (e) => {
      e.preventDefault();
      goPrev();
    });
  }

  if (arrowNextEl) {
    arrowNextEl.addEventListener("click", (e) => {
      e.preventDefault();
      goNext();
    });
  }

  // === TOUCH SWIPE (НОРМ ДЛЯ МОБИЛОК) ===
  let touchStartX = 0;
  let touchStartY = 0;
  let lastTouchX = 0;
  let lastTouchY = 0;
  let isTouching = false;
  let isHorizontalSwipe = false;
  const swipeThreshold = 30; // немного мягче порог

  const onTouchStart = (e) => {
    if (!e.touches || !e.touches[0]) return;
    const t = e.touches[0];
    isTouching = true;
    isHorizontalSwipe = false;
    touchStartX = t.clientX;
    touchStartY = t.clientY;
    lastTouchX = t.clientX;
    lastTouchY = t.clientY;
  };

  const onTouchMove = (e) => {
    if (!isTouching || !e.touches || !e.touches[0]) return;
    const t = e.touches[0];
    const dx = t.clientX - touchStartX;
    const dy = t.clientY - touchStartY;

    // определяем направление свайпа
    if (!isHorizontalSwipe) {
      if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
        // горизонтальный жест → берём управление на себя
        isHorizontalSwipe = true;
      } else if (Math.abs(dy) > Math.abs(dx)) {
        // вертикальный жест → не мешаем скроллу страницы
        isHorizontalSwipe = false;
        return;
      }
    }

    if (isHorizontalSwipe) {
      // блокируем дефолтный горизонтальный скролл/перелистывание
      e.preventDefault();
      lastTouchX = t.clientX;
      lastTouchY = t.clientY;
    }
  };

  const onTouchEnd = (e) => {
    if (!isTouching) return;
    isTouching = false;

    const t = (e.changedTouches && e.changedTouches[0]) || {
      clientX: lastTouchX,
      clientY: lastTouchY,
    };

    const dx = t.clientX - touchStartX;
    const dy = t.clientY - touchStartY;

    if (!isHorizontalSwipe) return;
    if (Math.abs(dx) < swipeThreshold || Math.abs(dx) < Math.abs(dy) * 0.5) {
      // свайп слабый или почти вертикальный — ничего не делаем
      return;
    }

    if (dx > 0) {
      goPrev();
    } else {
      goNext();
    }
  };

  // начало и движение — на всём слайдере
  sliderEl.addEventListener("touchstart", onTouchStart, { passive: true });
  sliderEl.addEventListener("touchmove", onTouchMove, { passive: false });
  sliderEl.addEventListener("touchend", onTouchEnd, { passive: true });

  // mouse drag
  let isMouseDown = false;
  let mouseStartX = 0;
  let mouseStartY = 0;

  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    isMouseDown = true;
    mouseStartX = e.clientX;
    mouseStartY = e.clientY;
  };

  const onMouseUp = (e) => {
    if (!isMouseDown) return;
    isMouseDown = false;

    const dx = e.clientX - mouseStartX;
    const dy = e.clientY - mouseStartY;

    if (Math.abs(dy) > Math.abs(dx)) return;

    if (dx > 25) {
      goPrev();
    } else if (dx < -25) {
      goNext();
    }
  };

  trackEl.addEventListener("mousedown", onMouseDown);
  document.addEventListener("mouseup", onMouseUp);

  // wheel / тачпад
  let wheelLocked = false;
  const wheelThreshold = 20;
  const wheelLockTime = 250;

  const onWheel = (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) return;
    const dx = e.deltaX;
    if (Math.abs(dx) < wheelThreshold) return;
    if (wheelLocked) return;

    wheelLocked = true;
    if (dx > 0) {
      goNext();
    } else if (dx < 0) {
      goPrev();
    }

    setTimeout(() => {
      wheelLocked = false;
    }, wheelLockTime);
  };

  sliderEl.addEventListener("wheel", onWheel, { passive: true });

  // активный слайдер для клавиатуры
  const onMouseEnter = () => {
    activeSlider = api;
  };
  const onMouseLeave = () => {
    if (activeSlider === api) {
      activeSlider = null;
    }
  };

  sliderEl.addEventListener("mouseenter", onMouseEnter);
  sliderEl.addEventListener("mouseleave", onMouseLeave);

  // старт
  setTransition(false);
  applyTransform();
  updateDots();

  const api = {
    prev: goPrev,
    next: goNext,
    destroy() {
      trackEl.removeEventListener("transitionstart", onTransitionStart);
      trackEl.removeEventListener("transitionend", onTransitionEnd);
      sliderEl.removeEventListener("touchstart", onTouchStart);
      sliderEl.removeEventListener("touchmove", onTouchMove);
      sliderEl.removeEventListener("touchend", onTouchEnd);
      trackEl.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      sliderEl.removeEventListener("wheel", onWheel);
      sliderEl.removeEventListener("mouseenter", onMouseEnter);
      sliderEl.removeEventListener("mouseleave", onMouseLeave);
      if (activeSlider === api) {
        activeSlider = null;
      }
    },
  };

  return api;
}

// ========= ПАРАЛЛАКС =========

function initParallax() {
  const items = Array.from(document.querySelectorAll(".parallax-item"));
  if (items.length === 0) return;

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateParallax(items);
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => updateParallax(items));

  updateParallax(items);
}

function updateParallax(items) {
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const maxShift = 16;

  items.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const elCenter = rect.top + rect.height / 2;
    const viewportCenter = viewportHeight / 2;

    const rel = (elCenter - viewportCenter) / viewportHeight;
    const shift = -rel * maxShift;

    el.style.transform = `translateY(${shift}px)`;
  });
}
