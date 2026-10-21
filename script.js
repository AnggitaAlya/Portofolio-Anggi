
/* =====================================
   1. MENU NAVIGASI HP
===================================== */
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", function () {
    const isOpen = navMenu.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  // Tutup menu setelah salah satu tautan dipilih
  navMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navMenu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

/* =====================================
   2. TAHUN OTOMATIS DI FOOTER
===================================== */
const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* =====================================
   3. POP-UP DETAIL PROYEK
===================================== */
const projectModal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalResult = document.getElementById("modalResult");
const modalClose = document.getElementById("modalClose");

let previousFocus = null;

function openProjectModal(button) {
  if (!projectModal) return;

  previousFocus = document.activeElement;

  modalTitle.textContent = button.dataset.title || "Detail Proyek";
  modalDescription.textContent =
    button.dataset.description || "Informasi proyek belum tersedia.";
  modalResult.textContent = button.dataset.result || "";

  projectModal.classList.add("is-open");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  if (modalClose) {
    modalClose.focus();
  }
}

function closeProjectModal() {
  if (!projectModal) return;

  projectModal.classList.remove("is-open");
  projectModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (previousFocus && typeof previousFocus.focus === "function") {
    previousFocus.focus();
  }
}

// Tombol "Lihat detail" pada setiap proyek
document.querySelectorAll(".project-detail").forEach(function (button) {
  button.addEventListener("click", function () {
    openProjectModal(button);
  });
});

// Tombol X untuk menutup pop-up
if (modalClose) {
  modalClose.addEventListener("click", closeProjectModal);
}

// Klik area gelap untuk menutup pop-up
document.querySelectorAll("[data-close-modal]").forEach(function (element) {
  element.addEventListener("click", closeProjectModal);
});

// Tombol Escape untuk menutup pop-up
document.addEventListener("keydown", function (event) {
  if (
    event.key === "Escape" &&
    projectModal &&
    projectModal.classList.contains("is-open")
  ) {
    closeProjectModal();
  }
});

/* =====================================
   4. TOMBOL SALIN EMAIL
===================================== */
const copyEmail = document.getElementById("copyEmail");
const copyMessage = document.getElementById("copyMessage");
const emailAddress = "anggitas973@gmail.com";

if (copyEmail && copyMessage) {
  copyEmail.addEventListener("click", async function () {
    try {
      await navigator.clipboard.writeText(emailAddress);
      copyMessage.textContent = "Alamat email berhasil disalin!";
    } catch (error) {
      // Alternatif jika fitur clipboard tidak tersedia
      const textArea = document.createElement("textarea");

      textArea.value = emailAddress;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "absolute";
      textArea.style.left = "-9999px";

      document.body.appendChild(textArea);
      textArea.select();

      const copied = document.execCommand("copy");
      textArea.remove();

      copyMessage.textContent = copied
        ? "Alamat email berhasil disalin!"
        : "Silakan salin email ini: " + emailAddress;
    }
  });
}