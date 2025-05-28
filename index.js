// On page load
document.addEventListener("DOMContentLoaded", function () {
  const words = ["تطوّر", "تحدي", "إنجاز", "ريادة", "فكرة"];
  let i = 0;
  setInterval(() => {
    document.getElementById("text-switchig").textContent = words[i];
    i++;
    if (i === words.length) i = 0;
  }, 1000);

  const path = document.querySelector(".green-line path");
  const L = path.getTotalLength();
  path.style.strokeDasharray = L;
  path.style.strokeDashoffset = L;

  // Trigger reflow to apply stroke values before animation
  path.getBoundingClientRect(); // forces reflow

  path.style.animation = "draw-line 2s ease-out forwards";

  const navbar = document.getElementById("mainNavbar");
  if (window.scrollY <= 50) {
    navbar.classList.add("transparent");
  }

  window.addEventListener("scroll", function () {
    const navbar = document.getElementById("mainNavbar");
    if (window.scrollY > 180) {
      navbar.classList.add("scrolled");
      navbar.classList.remove("transparent");
    } else {
      navbar.classList.add("transparent");
      navbar.classList.remove("scrolled");
    }
  });

  particlesJS("particles-js", {
    particles: {
      number: { value: 160, density: { enable: true, value_area: 800 } },
      color: { value: "#009895" },
      shape: {
        type: "circle",
        stroke: { width: 0, color: "#000000" },
        polygon: { nb_sides: 5 },
        image: { src: "img/github.svg", width: 100, height: 100 },
      },
      opacity: {
        value: 1,
        random: true,
        anim: { enable: true, speed: 1, opacity_min: 0, sync: false },
      },
      size: {
        value: 3,
        random: true,
        anim: { enable: false, speed: 4, size_min: 0.3, sync: false },
      },
      line_linked: {
        enable: false,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 600 },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "bubble" },
        onclick: { enable: true, mode: "repulse" },
        resize: true,
      },
      modes: {
        grab: { distance: 400, line_linked: { opacity: 1 } },
        bubble: {
          distance: 250,
          size: 0,
          duration: 2,
          opacity: 0,
          speed: 3,
        },
        repulse: { distance: 400, duration: 0.4 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 },
      },
    },
    retina_detect: true,
  });
  // stats = new Stats();
  // stats.setMode(0);
  // stats.domElement.style.position = "absolute";
  // stats.domElement.style.left = "0px";
  // stats.domElement.style.top = "0px";
  // document.body.appendChild(stats.domElement);

  // update = function () {
  //   stats.begin();
  //   stats.end();

  //   requestAnimationFrame(update);
  // };
  // requestAnimationFrame(update);

  // Binary
  const valuesMap = {
    "twenty-five": [
      "1 0 1 1",
      "0 1 0 1",
      "1 0 0 0",
      "1 0 1 1",
      "0 0 1 0",
      "2 0 2 5",
    ],
    binary1: ["1 0 1 1", "0 1 0 1", "1 1 0 0", "1 0 0 1", "0 1 1 0", "1 0 1 0"],
    binary2: ["0 1 0 1", "0 1 0 0", "0 1 0 0", "1 1 0 1", "0 0 1 0", "0 1 1 0"],
  };

  const elements = document.querySelectorAll(".binary p");

  elements.forEach((p) => {
    const className = p.classList[0];
    const values = valuesMap[className];
    if (!values || values.length === 0) return;

    // Initialize with first value
    p.textContent = values[0];

    if (className === "twenty-five") {
      animateOneTime(p, values);
    } else {
      animateLoop(p, values);
    }
  });

  function animateOneTime(el, values, index = 0) {
    if (index < values.length - 1) {
      el.textContent = values[index];
      el.classList.remove("green");
      el.style.color = "gray";
      setTimeout(() => animateOneTime(el, values, index + 1), 700);
    } else {
      el.textContent = values[values.length - 1];
      el.classList.add("green");
    }
  }

  function animateLoop(el, values, index = 0, direction = 1) {
    el.textContent = values[index];
    el.classList.remove("green", "brown");
    el.style.color = "gray";

    let nextIndex = index + direction;

    let isEnd = direction === 1 ? nextIndex >= values.length : nextIndex < 0;

    if (isEnd) {
      // At end, show last value in brown, then reverse
      el.textContent = values[index];
      el.classList.add("brown");
      setTimeout(() => {
        animateLoop(
          el,
          values,
          direction === 1 ? values.length - 2 : 1,
          -direction
        );
      }, 1000);
    } else {
      setTimeout(
        () => animateLoop(el, values, nextIndex, direction),
        direction === 1 ? 700 : 300
      );
    }
  }

  console.log("Binary elements found:", elements.length); // Should be 3

  elements.forEach((p) => {
    const className = p.classList[0];
    console.log("Animating:", className); // Debug check
  });

  //  committee swiper
  let committeeData = [],
    currentIndex = 0;

  function showDescription(idx) {
    const desc = document.getElementById("description-box");
    const cards = document.querySelectorAll(".committee-content");
    const w = window.innerWidth;

    cards.forEach((c, i) => {
      c.classList.remove("active", "visible");
      if (w < 768) {
        if (i === idx) c.classList.add("visible", "active");
      } else if (w < 1200) {
        if (
          Math.abs(i - idx) <= 1 ||
          (i === 0 && idx === committeeData.length - 1) ||
          (i === committeeData.length - 1 && idx === 0)
        ) {
          c.classList.add("visible");
          if (i === idx) c.classList.add("active");
        }
      } else {
        c.classList.add("visible");
        if (i === idx) c.classList.add("active");
      }
    });

    desc.innerText = committeeData[idx].jobDescription;
    const act = document.querySelector(".committee-content.active");
    // act && act.scrollIntoView({ behavior: "smooth", inline: "center" });
    //  act && act.scrollIntoView({
    //  behavior: "smooth",
    //  block: "nearest",    // يمنع السحب الرأسي
    //  inline: "center"     // يحافظ على التمركز الأفقي
  //  });
  }

  function renderCards() {
    const cont = document.getElementById("committee-container");
    cont.innerHTML = "";
    committeeData.forEach((p, i) => {
      const d = document.createElement("div");
      d.className = "committee-content";
      d.innerHTML = `
          <div class="profile-img"><img src="${p.image}" alt=""></div>
          <div class="person-info">
            <p class="name">${p.name}</p><p class="title">${p.title}</p>
          </div>`;
      d.onclick = () => {
        currentIndex = i;
        showDescription(i);
      };
      cont.appendChild(d);
    });
  }

  function nextCard() {
    currentIndex = (currentIndex + 1) % committeeData.length;
    showDescription(currentIndex);
  }
  function prevCard() {
    currentIndex =
      (currentIndex - 1 + committeeData.length) % committeeData.length;
    showDescription(currentIndex);
  }

  window.addEventListener("resize", () => showDescription(currentIndex));

  fetch("committeData.json")
    .then((r) => r.json())
    .then((data) => {
      committeeData = data;
      renderCards();
      showDescription(0);
      document.getElementById("nextBtn").onclick = nextCard;
      document.getElementById("prevBtn").onclick = prevCard;
    });

  const swiper = new Swiper(".mySwiper", {
          loop: true,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          breakpoints: {
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            576: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 40,
            },
          },
        });
});
