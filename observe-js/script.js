document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.querySelector(".location-popup");
    const toggleBtn = document.getElementById("togglePopup");
    const closeBtn = document.getElementById("closePopup");
    const bodyStatus = document.getElementById("bodyStatus");

    const checkStyleAndAddClass = () => {
        const computedStyle = window.getComputedStyle(overlay);

        if (computedStyle.display !== "none") {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        bodyStatus.textContent = document.body.classList.contains("overflow-hidden") ? "overflow-hidden" : "none";
    };

    if (overlay) {
        new MutationObserver(checkStyleAndAddClass).observe(overlay, { attributes: true });
    }

    toggleBtn.addEventListener("click", () => {
        overlay.style.display = overlay.style.display === "none" ? "flex" : "none";
    });

    closeBtn.addEventListener("click", () => {
        overlay.style.display = "none";
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.style.display = "none";
        }
    });
});
