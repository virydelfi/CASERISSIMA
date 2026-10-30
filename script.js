const WHATSAPP_NUMBER = "5493462626562";
const DEFAULT_MESSAGE =
  "¡Hola! Quisiera consultar por los servicios de Casserisima y solicitar un presupuesto";

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
const inquiryForm = document.querySelector("#inquiry-form");

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Abrir menú" : "Cerrar menú");
    primaryNav.classList.toggle("is-open", !isExpanded);
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
      primaryNav.classList.remove("is-open");
    });
  });
}

if (inquiryForm) {
  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!inquiryForm.reportValidity()) {
      return;
    }

    const formData = new FormData(inquiryForm);
    const fields = [
      ["Nombre", formData.get("name")],
      ["Teléfono", formData.get("phone")],
      ["Tipo de evento", formData.get("eventType")],
      ["Fecha del evento", formData.get("eventDate")],
      ["Cantidad aproximada de invitados", formData.get("guests")],
      ["Mensaje adicional", formData.get("message")],
    ];
    const details = fields
      .filter(([, value]) => String(value ?? "").trim() !== "")
      .map(([label, value]) => `${label}: ${String(value).trim()}`);
    const message = `${DEFAULT_MESSAGE}\n\n${details.join("\n")}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

   js
posthog.capture("whatsapp_form_submitted", {
  event_type: formData.get("eventType"),
}); 
window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
}

const currentYear = document.querySelector("#current-year");
if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}
