// Mobile navigation + accessibility enhancements
(() => {
	const toggle = document.querySelector('.menu-toggle');
	const nav = document.getElementById('primaryNav');
	const overlay = document.querySelector('.nav-overlay');
	if(!toggle || !nav || !overlay) return;

	const icons = {
		open: '<i class="fa-solid fa-bars"></i>',
		close: '<i class="fa-solid fa-xmark"></i>'
	};

	const focusableSelectors = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

	function updateToggle(open){
		toggle.innerHTML = open ? icons.close : icons.open;
		toggle.setAttribute('aria-expanded', String(open));
		toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
	}

	function setState(open){
		nav.classList.toggle('open', open);
		overlay.classList.toggle('active', open);
		overlay.hidden = !open;
		document.body.classList.toggle('menu-open', open);
		updateToggle(open);
		if(open){
			const first = nav.querySelector(focusableSelectors);
			first?.focus({ preventScroll: true });
		} else {
			toggle.focus({ preventScroll: true });
		}
	}

	updateToggle(false);

	toggle.addEventListener('click', () => setState(!nav.classList.contains('open')));
	overlay.addEventListener('click', () => setState(false));

	// Close with ESC
	document.addEventListener('keydown', (e) => {
		if(e.key === 'Escape' && nav.classList.contains('open')) setState(false);
	});

	// Trap focus inside nav when open (simple approach)
	document.addEventListener('focus', (e) => {
		if(!nav.classList.contains('open')) return;
		if(!nav.contains(e.target) && e.target !== toggle) {
			const first = nav.querySelector(focusableSelectors);
			first?.focus({ preventScroll: true });
		}
	}, true);

	// Adapt to resize (if user rotates device)
	let lastWidth = window.innerWidth;
	window.addEventListener('resize', () => {
		const w = window.innerWidth;
		if(w > 900 && lastWidth <= 900){
			setState(false);
			nav.classList.remove('open');
			overlay.hidden = true;
			document.body.classList.remove('menu-open');
		}
		lastWidth = w;
	});
})();

// Optional: Smooth scroll placeholder (can be expanded later)
// document.querySelectorAll('.nav-buttons button').forEach(btn => {
//   btn.addEventListener('click', () => {
//     // Implement section scroll mapping here
//   });
// });
