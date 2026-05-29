
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function initGrain() {
  const canvas = document.createElement("canvas");
  canvas.width = 200;
  canvas.height = 200;
  canvas.style.cssText = `
    position:fixed;top:0;left:0;width:100%;height:100%;
    pointer-events:none;z-index:9999;opacity:0.045;
    mix-blend-mode:overlay;
  `;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let frame = 0;

  function drawGrain() {
    const imageData = ctx.createImageData(200, 200);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const val = Math.random() * 255;
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
      data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    frame++;
    if (frame % 3 === 0) requestAnimationFrame(drawGrain);
    else requestAnimationFrame(drawGrain);
  }
  drawGrain();
}
initGrain();


function initMagnetic() {
  const magnetTargets = document.querySelectorAll(
    ".mid h1, .foottext-wrap, .cross, .right, .magnetic"
  );

  magnetTargets.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      gsap.to(el, {
        x: dx * 0.38,
        y: dy * 0.38,
        duration: 0.35,
        ease: "power2.out",
      });
    });

    el.addEventListener("mouseleave", () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    });
  });
}
initMagnetic();

function initScrollSkew() {
  let lastScrollY = window.scrollY;
  let ticking = false;
  let currentSkew = 0;

  const skewTargets = document.querySelectorAll(
    ".product-imgs img, .contentimg, .slideimg, .videodiv video"
  );

  function updateSkew() {
    const scrollY = window.scrollY;
    const delta = scrollY - lastScrollY;
    lastScrollY = scrollY;

    const targetSkew = Math.max(-6, Math.min(6, delta * 0.12));
    currentSkew += (targetSkew - currentSkew) * 0.15;

    skewTargets.forEach((el) => {
      el.style.transform = `skewY(${currentSkew.toFixed(3)}deg)`;
    });

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateSkew);
      ticking = true;
    }
  });
}
initScrollSkew();

function initMarquee() {
  const marqueeHTML = `
    <div class="marquee-section" style="
      overflow:hidden;
      background:#fff;
      color:#000;
      padding:1.2rem 0;
      border-top:1px solid rgba(255,255,255,.1);
      border-bottom:1px solid rgba(255,255,255,.1);
      mix-blend-mode:difference;
      position:relative;
      z-index:3;
    ">
      <div class="marquee-track" style="display:flex;width:max-content;">
        ${[...Array(4)].map(() => `
          <span style="
            font-family:orbitron,sans-serif;
            font-size:clamp(.9rem,1.8vw,1.4rem);
            letter-spacing:.25em;
            white-space:nowrap;
            padding:0 3rem;
            color:#fff;
          ">
            NOTHING (R) &nbsp;·&nbsp; PHONE 3A &nbsp;·&nbsp; GLYPH INTERFACE &nbsp;·&nbsp;
            DESIGNED IN LONDON &nbsp;·&nbsp; DOT MATRIX &nbsp;·&nbsp; TRANSPARENCY &nbsp;·&nbsp;
          </span>
        `).join("")}
      </div>
    </div>
  `;

  const about = document.querySelector(".about");
  if (about) about.insertAdjacentHTML("afterend", marqueeHTML);


  const footer = document.querySelector(".footer");
  if (footer) {
    footer.insertAdjacentHTML("beforebegin", marqueeHTML.replace("marquee-section", "marquee-section-2"));
    const track2 = document.querySelector(".marquee-section-2 .marquee-track");
    if (track2) {
      gsap.to(track2, {
        x: "-50%",
        duration: 22,
        ease: "none",
        repeat: -1,
        direction: -1,
      });
    }
  }

  const track = document.querySelector(".marquee-track");
  if (track) {
    gsap.to(track, {
      x: "-50%",
      duration: 18,
      ease: "none",
      repeat: -1,
    });
  }
}
initMarquee();

function initStatsSection() {
  const stats = [
    { val: 50, suffix: "MP", label: "Pro Camera" },
    { val: 5000, suffix: "mAh", label: "Battery" },
    { val: 11, suffix: "", label: "Glyph Zones" },
    { val: 120, suffix: "Hz", label: "Display" },
  ];

  const sectionHTML = `
    <div class="stats-section" style="
      width:100%;padding:8rem 5%;
      background:#000;position:relative;overflow:hidden;
    ">
      <p style="
        font-family:orbitron,sans-serif;
        font-size:clamp(.7rem,1.2vw,1rem);
        letter-spacing:.3em;color:rgba(255,255,255,.35);
        margin-bottom:5rem;
      ">PHONE 3A — BY THE NUMBERS</p>

      <div class="stats-grid" style="
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
        gap:4rem 2rem;
      ">
        ${stats.map((s, i) => `
          <div class="stat-item" data-val="${s.val}" data-suffix="${s.suffix}" style="
            border-top:1px solid rgba(255,255,255,.15);
            padding-top:2rem;
          ">
            <h2 class="stat-num" style="
              font-family:orbitron,sans-serif;
              font-size:clamp(2.5rem,5vw,4.5rem);
              font-weight:700;color:#fff;
              line-height:1;margin:0 0 .8rem;
            ">0${s.suffix}</h2>
            <p style="
              font-family:orbitron,sans-serif;
              font-size:clamp(.7rem,1.1vw,.9rem);
              letter-spacing:.2em;
              color:rgba(255,255,255,.4);margin:0;
            ">${s.label}</p>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  const videodiv = document.querySelector(".videodiv");
  if (videodiv) videodiv.insertAdjacentHTML("afterend", sectionHTML);

  document.querySelectorAll(".stat-item").forEach((item) => {
    const target = parseInt(item.dataset.val);
    const suffix = item.dataset.suffix;
    const numEl = item.querySelector(".stat-num");

    ScrollTrigger.create({
      trigger: item,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          { val: 0 },
          { val: target },
          {
            duration: 2,
            ease: "power2.out",
            onUpdate: function () {
              numEl.textContent = Math.round(this.targets()[0].val).toLocaleString() + suffix;
            },
          }
        );
        gsap.from(item, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      },
    });
  });
}
initStatsSection();

function initGlyphSection() {
  const glyphHTML = `
    <div class="glyph-section" style="
      width:100%;min-height:100vh;
      background:#000;display:flex;flex-direction:column;
      align-items:center;justify-content:center;
      padding:6rem 5%;position:relative;overflow:hidden;
    ">
      <p style="
        font-family:orbitron,sans-serif;
        font-size:clamp(.65rem,1.1vw,.85rem);
        letter-spacing:.35em;color:rgba(255,255,255,.3);
        margin-bottom:3rem;
      ">GLYPH INTERFACE</p>

      <svg class="glyph-svg" viewBox="0 0 320 560" xmlns="http://www.w3.org/2000/svg"
        style="width:min(320px,80vw);height:auto;filter:drop-shadow(0 0 30px rgba(255,255,255,.06));">

        <!-- Phone outline -->
        <rect x="10" y="10" width="300" height="540" rx="44" ry="44"
          fill="none" stroke="rgba(255,255,255,.08)" stroke-width="1.5"/>

        <!-- Camera ring -->
        <circle class="glyph-el" cx="160" cy="95" r="44"
          fill="none" stroke="rgba(255,255,255,.12)" stroke-width="1.5"/>
        <circle class="glyph-el glyph-camera" cx="160" cy="95" r="35"
          fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="220" stroke-dashoffset="220"/>

        <!-- Top strip -->
        <rect class="glyph-el glyph-strip1" x="90" y="175" width="140" height="6" rx="3"
          fill="#fff" opacity="0"/>

        <!-- Middle diagonal lines (Nothing style) -->
        <line class="glyph-el glyph-line1" x1="60" y1="210" x2="260" y2="210"
          stroke="#fff" stroke-width="1" opacity="0"/>
        <line class="glyph-el glyph-line2" x1="60" y1="230" x2="200" y2="230"
          stroke="#fff" stroke-width="1" opacity="0"/>
        <line class="glyph-el glyph-line3" x1="60" y1="250" x2="230" y2="250"
          stroke="#fff" stroke-width="1" opacity="0"/>

        <!-- Side pill (charging strip) -->
        <rect class="glyph-el glyph-pill" x="240" y="290" width="10" height="80" rx="5"
          fill="#fff" opacity="0"/>

        <!-- Bottom arc group -->
        <path class="glyph-el glyph-arc1" d="M 60 370 Q 160 330 260 370"
          fill="none" stroke="#fff" stroke-width="1.5" opacity="0"/>
        <path class="glyph-el glyph-arc2" d="M 80 395 Q 160 360 240 395"
          fill="none" stroke="#fff" stroke-width="1.2" opacity="0"/>
        <path class="glyph-el glyph-arc3" d="M 100 418 Q 160 388 220 418"
          fill="none" stroke="#fff" stroke-width="1" opacity="0"/>

        <!-- Corner dots -->
        <circle class="glyph-el glyph-dot1" cx="65"  cy="175" r="3" fill="#fff" opacity="0"/>
        <circle class="glyph-el glyph-dot2" cx="255" cy="175" r="3" fill="#fff" opacity="0"/>
        <circle class="glyph-el glyph-dot3" cx="65"  cy="460" r="3" fill="#fff" opacity="0"/>
        <circle class="glyph-el glyph-dot4" cx="255" cy="460" r="3" fill="#fff" opacity="0"/>

        <!-- Bottom bar -->
        <rect class="glyph-el glyph-bar" x="110" y="480" width="100" height="5" rx="2.5"
          fill="#fff" opacity="0"/>
      </svg>

      <p class="glyph-label" style="
        font-family:orbitron,sans-serif;
        font-size:clamp(1.2rem,2.5vw,2rem);
        letter-spacing:.15em;color:#fff;
        margin-top:3rem;opacity:0;
        text-align:center;
      ">Every light tells a story.</p>
    </div>
  `;

  const statsSection = document.querySelector(".stats-section");
  if (statsSection) statsSection.insertAdjacentHTML("afterend", glyphHTML);

  ScrollTrigger.create({
    trigger: ".glyph-section",
    start: "top 60%",
    once: true,
    onEnter: () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(".glyph-camera", {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
      });

      tl.to(
        [".glyph-strip1", ".glyph-dot1", ".glyph-dot2"],
        { opacity: 0.9, duration: 0.4, stagger: 0.1 },
        "-=0.5"
      );
      tl.to(
        [".glyph-line1", ".glyph-line2", ".glyph-line3"],
        { opacity: 0.7, duration: 0.3, stagger: 0.08 }
      );
      tl.to(".glyph-pill", { opacity: 1, duration: 0.5 });
      tl.to(
        [".glyph-arc1", ".glyph-arc2", ".glyph-arc3"],
        { opacity: 0.8, duration: 0.4, stagger: 0.1 }
      );
      tl.to(
        [".glyph-dot3", ".glyph-dot4"],
        { opacity: 0.9, duration: 0.3, stagger: 0.1 }
      );
      tl.to(".glyph-bar", { opacity: 1, duration: 0.5 });
      tl.to(".glyph-label", { opacity: 1, y: -10, duration: 0.8 });


      tl.call(() => {
        const glyphEls = document.querySelectorAll(".glyph-el");
        glyphEls.forEach((el, i) => {
          gsap.to(el, {
            opacity: Math.random() * 0.5 + 0.3,
            duration: 0.8 + Math.random(),
            repeat: -1,
            yoyo: true,
            delay: i * 0.15,
            ease: "sine.inOut",
          });
        });
      });
    },
  });
}
initGlyphSection();

function initPageWipe() {
  const wipe = document.createElement("div");
  wipe.style.cssText = `
    position:fixed;top:0;left:0;width:100%;height:100%;
    background:#fff;z-index:99999;
    transform:scaleY(0);transform-origin:bottom;
    pointer-events:none;
  `;
  document.body.appendChild(wipe);

  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("javascript")) return;

    link.addEventListener("click", (e) => {
      e.preventDefault();
      gsap.timeline()
        .to(wipe, {
          scaleY: 1,
          duration: 0.55,
          ease: "power4.inOut",
          transformOrigin: "bottom",
        })
        .call(() => {
          window.location.href = href;
        });
    });
  });

  window.addEventListener("load", () => {
    gsap.to(wipe, {
      scaleY: 0,
      duration: 0.7,
      delay: 0.1,
      ease: "power4.inOut",
      transformOrigin: "top",
    });
  });
}
initPageWipe();

function initSectionReveals() {
  // Content cards, images, headings
  const revealEls = document.querySelectorAll(
    ".contentimg, .content1 p, .content2 p, .slide1 h1, .slide2 h1, .slide3 h1, .slideelem h1"
  );

  revealEls.forEach((el) => {
    gsap.from(el, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true,
      },
    });
  });
}
initSectionReveals();


function initCursorTrail() {
  const isMobile = window.matchMedia("(max-width:768px)").matches;
  if (isMobile) return; 

  const dots = [];
  const NUM = 8;

  for (let i = 0; i < NUM; i++) {
    const dot = document.createElement("div");
    const size = 3 - i * 0.25;
    dot.style.cssText = `
      position:fixed;width:${size}px;height:${size}px;
      border-radius:50%;background:rgba(255,255,255,${0.6 - i * 0.07});
      pointer-events:none;z-index:9998;
      transform:translate(-50%,-50%);
      mix-blend-mode:difference;
      transition:opacity .3s;
    `;
    document.body.appendChild(dot);
    dots.push({ el: dot, x: 0, y: 0 });
  }

  let mouseX = 0, mouseY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function trailLoop() {
    let prevX = mouseX, prevY = mouseY;
    dots.forEach((dot, i) => {
      const speed = 0.35 - i * 0.03;
      dot.x += (prevX - dot.x) * speed;
      dot.y += (prevY - dot.y) * speed;
      dot.el.style.left = dot.x + "px";
      dot.el.style.top  = dot.y + "px";
      prevX = dot.x;
      prevY = dot.y;
    });
    requestAnimationFrame(trailLoop);
  }
  trailLoop();
}
initCursorTrail();

console.log("%c NOTHING (R) Enhancements Loaded ✓", "font-family:monospace;color:#fff;background:#000;padding:4px 12px;border-radius:4px;font-size:12px;letter-spacing:.1em");