/*
===============================================
DevHub - Scripts principaux
Auteur: [Votre Nom]
Date: 2025
Description: Scripts pour navigation responsive et interactions
===============================================
*/

// Attendre que le DOM soit chargé
document.addEventListener("DOMContentLoaded", function () {
	// ===== NAVIGATION RESPONSIVE =====
	initMobileNavigation();

	// ===== ÉTATS ACTIFS DE NAVIGATION =====
	updateActiveNavigation();

	// ===== SMOOTH SCROLL POUR LES ANCRES =====
	initSmoothScroll();

	console.log("✅ DevHub scripts initialisés");
});

/**
 * Initialise la navigation mobile avec menu hamburger
 */
function initMobileNavigation() {
	const menuToggle = document.querySelector(".menu-toggle");
	const navigation = document.querySelector(".main-navigation");
	const menuOverlay = document.querySelector(".menu-overlay");
	const body = document.body;

	if (!menuToggle || !navigation || !menuOverlay) {
	console.warn("⚠️ Éléments de navigation mobile non trouvés");
	return;
	}

	// Fonction pour ouvrir le menu
	function openMenu() {
	menuToggle.classList.add("active");
	navigation.classList.add("active");
	menuOverlay.style.display = "block";
	menuOverlay.classList.add("active");
	body.classList.add("menu-open");

	// Accessibilité
	menuToggle.setAttribute("aria-expanded", "true");
	menuToggle.setAttribute("aria-label", "Fermer le menu de navigation");

	// Focus sur le premier lien de navigation
	const firstNavLink = navigation.querySelector(".nav-link");
	if (firstNavLink) {
		setTimeout(() => firstNavLink.focus(), 300);
	}
	}

	// Fonction pour fermer le menu
	function closeMenu() {
	menuToggle.classList.remove("active");
	navigation.classList.remove("active");
	menuOverlay.classList.remove("active");
	body.classList.remove("menu-open");

	// Masquer l'overlay après l'animation
	setTimeout(() => {
		menuOverlay.style.display = "none";
	}, 300);

	// Accessibilité
	menuToggle.setAttribute("aria-expanded", "false");
	menuToggle.setAttribute("aria-label", "Ouvrir le menu de navigation");
	}

	// Toggle du menu au clic sur le bouton hamburger
	menuToggle.addEventListener("click", function () {
	const isOpen = navigation.classList.contains("active");
	if (isOpen) {
		closeMenu();
	} else {
		openMenu();
	}
	});

	// Fermer le menu au clic sur l'overlay
	menuOverlay.addEventListener("click", closeMenu);

	// Fermer le menu au clic sur un lien de navigation
	const navLinks = navigation.querySelectorAll(".nav-link");
	navLinks.forEach((link) => {
	link.addEventListener("click", function () {
		// Fermer le menu après un petit délai pour voir l'effet
		setTimeout(closeMenu, 150);
	});
	});

	// Fermer le menu avec la touche Échap
	document.addEventListener("keydown", function (e) {
	if (e.key === "Escape" && navigation.classList.contains("active")) {
		closeMenu();
		menuToggle.focus(); // Remettre le focus sur le bouton
	}
	});

	// Fermer le menu si on redimensionne vers desktop
	window.addEventListener("resize", function () {
	if (window.innerWidth > 768 && navigation.classList.contains("active")) {
		closeMenu();
	}
	});

	console.log("✅ Navigation mobile initialisée");
}

/**
 * Met à jour les états actifs de navigation selon la page actuelle
 */
function updateActiveNavigation() {
	const navLinks = document.querySelectorAll(".nav-link");
	const currentPath = window.location.pathname;
	const currentHash = window.location.hash;

	navLinks.forEach((link) => {
	link.classList.remove("active");

	const href = link.getAttribute("href");

	// Page d'accueil
	if (
		(currentPath.endsWith("/") || currentPath.endsWith("/index.html")) &&
		href === "#accueil"
	) {
		link.classList.add("active");
	}
	// Page portfolio
	else if (
		currentPath.includes("portfolio.html") &&
		href.includes("portfolio.html")
	) {
		link.classList.add("active");
	}
	// Sections avec ancres
	else if (href.startsWith("#") && currentHash === href) {
		link.classList.add("active");
	}
	});

	// Observer pour les sections visibles (scroll spy)
	if ("IntersectionObserver" in window) {
	initScrollSpy();
	}

	console.log("✅ États actifs de navigation mis à jour");
}

/**
 * Initialise le scroll spy pour mettre à jour la navigation selon la section visible
 */
function initScrollSpy() {
	const sections = document.querySelectorAll("section[id]");
	const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

	if (sections.length === 0) return;

	const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
		if (entry.isIntersecting) {
			const currentSection = entry.target.id;

			// Mettre à jour les liens de navigation
			navLinks.forEach((link) => {
			link.classList.remove("active");
			if (link.getAttribute("href") === `#${currentSection}`) {
				link.classList.add("active");
			}
			});
		}
		});
	},
	{
		threshold: 0.6,
		rootMargin: "-20% 0px -20% 0px",
	}
	);

	sections.forEach((section) => observer.observe(section));

	console.log("✅ Scroll spy initialisé");
}

/**
 * Initialise le smooth scroll pour les liens d'ancrage
 */
function initSmoothScroll() {
	const anchorLinks = document.querySelectorAll('a[href^="#"]');

	anchorLinks.forEach((link) => {
	link.addEventListener("click", function (e) {
		const href = this.getAttribute("href");

		// Ignorer les liens vides ou "#"
		if (!href || href === "#") return;

		const targetSection = document.querySelector(href);

		if (targetSection) {
		e.preventDefault();

		// Calculer la position avec offset du header
		const headerHeight =
			document.querySelector(".site-header").offsetHeight;
		const targetPosition = targetSection.offsetTop - headerHeight - 20;

		// Smooth scroll
		window.scrollTo({
			top: targetPosition,
			behavior: "smooth",
		});

		// Mettre à jour l'URL sans recharger
		if (history.pushState) {
			history.pushState(null, null, href);
		}
		}
	});
	});

	console.log("✅ Smooth scroll initialisé");
}

/**
 * Utilitaire pour débugger la navigation
 */
function debugNavigation() {
	console.log("🔍 Debug Navigation:");
	console.log("- Current path:", window.location.pathname);
	console.log("- Current hash:", window.location.hash);
	console.log("- Active links:", document.querySelectorAll(".nav-link.active"));
}

// Fonction globale pour débugger (accessible depuis la console)
window.debugNavigation = debugNavigation;
