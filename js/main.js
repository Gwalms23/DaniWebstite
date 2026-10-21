/* Danielle Fernandez — Art Portfolio */

/*
 * CONTACT FORM SETUP
 * Leave FORM_ENDPOINT empty and the Submit button opens the visitor's email
 * app with the message already filled in, addressed to CONTACT_EMAIL.
 * To receive messages without the email app, create a free form at
 * https://formspree.io and paste its URL here, e.g.
 *   const FORM_ENDPOINT = "https://formspree.io/f/abcdwxyz";
 */
const FORM_ENDPOINT = "";
const CONTACT_EMAIL = "dfernandez@ithaca.edu";

document.querySelectorAll(".contact-form").forEach((form) => {
  const status = form.querySelector(".form-status");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    if (!FORM_ENDPOINT) {
      const body = `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`;
      const subject = data.get("subject") || `Message from ${data.get("name")}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }
    status.textContent = "Sending…";
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(res.statusText);
      form.reset();
      status.textContent = "Thanks for submitting!";
    } catch {
      status.textContent = "Sorry, something went wrong. Please try again.";
    }
  });
});

/* ---------- Gallery lightbox ---------- */
const gallery = document.querySelector(".gallery");
if (gallery) {
  const items = [...gallery.querySelectorAll("button")];
  const box = document.querySelector(".lightbox");
  const stage = box.querySelector(".lb-stage");
  const info = box.querySelector(".lb-info");
  let current = 0;
  let lastFocus = null;

  const el = (tag, props = {}) => Object.assign(document.createElement(tag), props);

  function show(i) {
    current = (i + items.length) % items.length;
    const d = items[current].dataset;
    stage.replaceChildren();
    if (d.type === "video") {
      stage.append(el("video", { src: d.src, poster: d.poster, controls: true, autoplay: true, playsInline: true }));
    } else if (d.type === "vimeo") {
      stage.append(el("iframe", {
        src: `https://player.vimeo.com/video/${d.vimeo}?autoplay=1`,
        allow: "autoplay; fullscreen; picture-in-picture",
        allowFullscreen: true,
        title: d.title,
      }));
    } else {
      stage.append(el("img", { src: d.src, alt: d.title }));
    }
    info.replaceChildren(el("h2", { textContent: d.title }));
    (d.desc || "").split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean)
      .forEach((para) => info.append(el("p", { textContent: para })));
    if (d.link) {
      const p = el("p");
      p.append(el("a", { href: d.link, textContent: "Watch on Vimeo", target: "_blank", rel: "noopener" }));
      info.append(p);
    }
    info.scrollTop = 0;
  }

  function open(i) {
    lastFocus = document.activeElement;
    box.classList.add("open");
    document.body.style.overflow = "hidden";
    show(i);
    box.querySelector(".lb-close").focus();
  }

  function close() {
    box.classList.remove("open");
    stage.replaceChildren();
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  items.forEach((btn, i) => btn.addEventListener("click", () => open(i)));
  box.querySelector(".lb-close").addEventListener("click", close);
  box.querySelector(".lb-prev").addEventListener("click", () => show(current - 1));
  box.querySelector(".lb-next").addEventListener("click", () => show(current + 1));
  box.addEventListener("click", (e) => { if (e.target === box || e.target === stage) close(); });
  document.addEventListener("keydown", (e) => {
    if (!box.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
}
