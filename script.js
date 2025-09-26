// Mobile navigation + accessibility enhancements
(() => {
	const toggle = document.querySelector('.menu-toggle');
	const nav = document.getElementById('primaryNav');
	const overlay = document.querySelector('.nav-overlay');
	if(!toggle || !nav || !overlay) return;

	function setState(open){
		toggle.setAttribute('aria-expanded', String(open));
		nav.classList.toggle('open', open);
		overlay.classList.toggle('active', open);
		overlay.hidden = !open;
		document.body.classList.toggle('menu-open', open);
		if(!open){
			// Return focus to toggle for accessibility
			toggle.focus({ preventScroll: true });
		}
	}


	

	// Close with ESC
	document.addEventListener('keydown', (e) => {
		if(e.key === 'Escape' && nav.classList.contains('open')) setState(false);
	});

	// Trap focus inside nav when open (simple approach)
	document.addEventListener('focus', (e) => {
		if(!nav.classList.contains('open')) return;
		if(!nav.contains(e.target) && e.target !== toggle) {
			// Redirect focus back into nav
			const firstBtn = nav.querySelector('button, a');
			firstBtn && firstBtn.focus({ preventScroll: true });
		}
	}, true);

	// Adapt to resize (if user rotates device)
	let lastWidth = window.innerWidth;
	window.addEventListener('resize', () => {
		const w = window.innerWidth;
		// If switching to desktop width, ensure nav visible and state reset
		if(w > 900 && lastWidth <= 900){
			setState(false); // remove overlays
			nav.classList.remove('open');
			document.body.classList.remove('menu-open');
			overlay.hidden = true;
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
