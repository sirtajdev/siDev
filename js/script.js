(() => {
	const navToggle = document.getElementById("nav-toggle");
	const menuButton = document.querySelector(".menu-button");

	const updateMenuState = () => {
		const isOpen = Boolean(navToggle?.checked);
		menuButton?.setAttribute("aria-expanded", String(isOpen));
		menuButton?.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
	};

	updateMenuState();

	navToggle?.addEventListener("change", updateMenuState);
	menuButton?.addEventListener("keydown", (event) => {
		if (event.key !== "Enter" && event.key !== " ") return;
		event.preventDefault();
		navToggle.checked = !navToggle.checked;
		navToggle.dispatchEvent(new Event("change"));
	});

	document.querySelectorAll("nav a").forEach((link) => {
		link.addEventListener("click", () => {
			if (navToggle) navToggle.checked = false;
			updateMenuState();
		});
	});

	document.addEventListener("keydown", (event) => {
		if (event.key !== "Escape") return;
		if (navToggle?.checked) {
			navToggle.checked = false;
			updateMenuState();
			menuButton?.focus();
		}
	});
})();
