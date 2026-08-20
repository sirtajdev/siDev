(() => {
	const storageKey = "sidev-accessibility";
	let settings = {};
	try {
		settings = JSON.parse(localStorage.getItem(storageKey) || "{}");
	} catch {
		localStorage.removeItem(storageKey);
	}
	const navToggle = document.getElementById("nav-toggle");
	const menuButton = document.querySelector(".menu-button");
	const accessibilityMenu = document.querySelector(".accessibility-menu");
	const largeText = document.getElementById("large-text");
	const highContrast = document.getElementById("high-contrast");
	const lightTheme = document.getElementById("light-theme");
	const themeColor = document.querySelector('meta[name="theme-color"]');

	const saveSettings = () => {
		localStorage.setItem(storageKey, JSON.stringify({
			largeText: largeText?.checked || false,
			highContrast: highContrast?.checked || false,
			lightTheme: lightTheme?.checked || false
		}));
	};

	const applySettings = () => {
		if (largeText) largeText.checked = Boolean(settings.largeText);
		if (highContrast) highContrast.checked = Boolean(settings.highContrast);
		if (lightTheme) lightTheme.checked = Boolean(settings.lightTheme);
		document.body.classList.toggle("light-theme", Boolean(settings.lightTheme));
		themeColor?.setAttribute("content", settings.lightTheme ? "#eef4f7" : "#000000");
	};

	const updateMenuState = () => {
		const isOpen = Boolean(navToggle?.checked);
		menuButton?.setAttribute("aria-expanded", String(isOpen));
		menuButton?.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
	};

	applySettings();
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

	[largeText, highContrast, lightTheme].forEach((control) => {
		control?.addEventListener("change", () => {
			settings.largeText = Boolean(largeText?.checked);
			settings.highContrast = Boolean(highContrast?.checked);
			settings.lightTheme = Boolean(lightTheme?.checked);
			document.body.classList.toggle("light-theme", settings.lightTheme);
			themeColor?.setAttribute("content", settings.lightTheme ? "#eef4f7" : "#000000");
			saveSettings();
		});
	});

	document.addEventListener("keydown", (event) => {
		if (event.key !== "Escape") return;
		if (navToggle?.checked) {
			navToggle.checked = false;
			updateMenuState();
			menuButton?.focus();
		}
		if (accessibilityMenu?.open) accessibilityMenu.open = false;
	});
})();
