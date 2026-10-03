/* ===== SKYVISTA — HELICOPTER TOUR & SCENIC FLIGHT — SHARED COMPONENTS ===== */
'use strict';

/* ─── THEME & DIRECTION INIT ─────────────────────────── */
(function initTheme() {
    const html = document.documentElement;
    const saved = localStorage.getItem('sv_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) html.classList.add('dark');
    if (localStorage.getItem('sv_dir') === 'rtl') html.setAttribute('dir', 'rtl');
})();

function toggleTheme() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    localStorage.setItem('sv_theme', html.classList.contains('dark') ? 'dark' : 'light');
    document.querySelectorAll('.theme-icon').forEach(updateThemeIcon);
}

function updateThemeIcon(el) {
    if (!el) return;
    el.className = document.documentElement.classList.contains('dark')
        ? 'fas fa-sun theme-icon'
        : 'fas fa-moon theme-icon';
}

function toggleDir() {
    const html = document.documentElement;
    const isRTL = html.getAttribute('dir') === 'rtl';
    html.setAttribute('dir', isRTL ? 'ltr' : 'rtl');
    localStorage.setItem('sv_dir', isRTL ? 'ltr' : 'rtl');
    document.querySelectorAll('.dir-label').forEach(el => {
        el.textContent = isRTL ? 'LTR' : 'RTL';
    });
}

/* ─── SVG LOGO ───────────────────────────────────────── */
function getLogoSVG(size = 40) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="${size}" height="${size}" style="width:${size}px;height:${size}px;object-fit:contain;display:block;flex-shrink:0;">
      <!-- Outer ring -->
      <circle cx="80" cy="80" r="74" stroke="var(--secondary)" stroke-width="3" fill="none" opacity="0.3"/>
      <!-- Helicopter body -->
      <ellipse cx="80" cy="96" rx="32" ry="14" fill="var(--primary)" rx="4"/>
      <rect x="48" y="84" width="64" height="24" rx="8" fill="var(--primary)"/>
      <!-- Cockpit bubble -->
      <ellipse cx="70" cy="88" rx="16" ry="12" fill="var(--secondary)" opacity="0.9"/>
      <ellipse cx="70" cy="87" rx="11" ry="8" fill="rgba(255,255,255,0.25)"/>
      <!-- Tail boom -->
      <rect x="110" y="91" width="32" height="8" rx="4" fill="var(--primary)"/>
      <!-- Tail rotor -->
      <ellipse cx="144" cy="95" rx="4" ry="12" fill="var(--secondary)" opacity="0.8"/>
      <!-- Main rotor hub -->
      <circle cx="80" cy="78" r="5" fill="var(--secondary)"/>
      <!-- Main rotor blades -->
      <rect x="20" y="75" width="120" height="6" rx="3" fill="var(--secondary)" opacity="0.85"/>
      <rect x="77" y="36" width="6" height="48" rx="3" fill="var(--secondary)" opacity="0.7"/>
      <!-- Landing skids -->
      <rect x="52" y="108" width="22" height="4" rx="2" fill="var(--primary)" opacity="0.7"/>
      <rect x="86" y="108" width="22" height="4" rx="2" fill="var(--primary)" opacity="0.7"/>
      <rect x="56" y="106" width="4" height="6" rx="1" fill="var(--primary)"/>
      <rect x="70" y="106" width="4" height="6" rx="1" fill="var(--primary)"/>
      <rect x="90" y="106" width="4" height="6" rx="1" fill="var(--primary)"/>
      <rect x="104" y="106" width="4" height="6" rx="1" fill="var(--primary)"/>
    </svg>`;
}

function getLogoImgHTML(size = 40) {
    return `<img src="assets/images/logo.jpg" alt="SkyVista Logo" width="${size}" height="${size}" class="nav-logo-img" style="width:${size}px;height:${size}px;object-fit:contain;display:block;border-radius:50%;background:#ffffff;padding:2px;box-shadow:0 2px 8px rgba(0,0,0,0.15);">`;
}

/* ─── NAVBAR ──────────────────────────────────────────── */
function injectNav() {
    const el = document.getElementById('main-nav');
    if (!el) return;
    const page = location.pathname.split('/').pop() || 'index.html';
    const links = [
        { href: 'index.html',    label: 'Home' },
        { href: 'home2.html',    label: 'Home 2' },
        { href: 'tours.html',    label: 'Tours & Packages' },
        { href: 'safety.html',   label: 'Safety & Pilots' },
        { href: 'gallery.html',  label: 'Gallery' },
        { href: 'contact.html',  label: 'Contact' },
    ];

    const isDark = document.documentElement.classList.contains('dark');
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';

    const navLinksHTML = links.map(l => {
        const isActive = page === l.href || (page === '' && l.href === 'index.html');
        return `<a href="${l.href}" class="nav-link${isActive ? ' active' : ''}">${l.label}</a>`;
    }).join('');

    const mobileLinksHTML = links.map(l => {
        const isActive = page === l.href || (page === '' && l.href === 'index.html');
        return `<a href="${l.href}" class="mob-link${isActive ? ' active' : ''}" onclick="toggleMobileMenu()">${l.label}</a>`;
    }).join('');

    el.innerHTML = `
    <nav class="navbar" id="navbar">
        <div class="nav-inner">
            <!-- Logo -->
            <a href="index.html" class="nav-logo" aria-label="SkyVista Home">
                ${getLogoImgHTML(40)}
                <div class="nav-logo-text">
                    <span class="brand-name">SkyVista</span>
                    <span class="brand-tagline">Helicopter Tours</span>
                </div>
            </a>

            <!-- Desktop Nav -->
            <div class="nav-links">${navLinksHTML}</div>

            <!-- Actions -->
            <div class="nav-actions">
                <button onclick="toggleDir()" class="nav-icon-btn" title="Toggle Direction" aria-label="Toggle RTL/LTR">
                    <span class="dir-label" style="font-size:0.6rem;font-weight:600;letter-spacing:0.04em;">${isRTL ? 'RTL' : 'LTR'}</span>
                </button>
                <button onclick="toggleTheme()" class="nav-icon-btn" title="Toggle Theme" aria-label="Toggle dark mode">
                    <span class="theme-icon-wrap"><i class="${isDark ? 'fas fa-sun theme-icon' : 'fas fa-moon theme-icon'}"></i></span>
                </button>
                <a href="dashboard.html" class="btn btn-outline btn-sm nav-cta-outline">Dashboard</a>
                <a href="login.html" class="btn btn-primary btn-sm nav-cta-primary">Sign In</a>
                <!-- Mobile Hamburger Button -->
                <button class="mobile-menu-btn" onclick="toggleMobileMenu(event)" aria-label="Toggle navigation menu">
                    <span class="mobile-menu-icon"><i class="fas fa-bars"></i></span>
                </button>
            </div>
        </div>

        <!-- Mobile Backdrop -->
        <div class="mobile-backdrop" id="mobile-backdrop" onclick="toggleMobileMenu(event)"></div>

        <!-- Mobile Menu Dropdown -->
        <div class="mobile-menu" id="mobile-menu">
            ${mobileLinksHTML}
            <div class="mob-actions">
                <a href="login.html" class="btn btn-primary w-full" onclick="toggleMobileMenu()"><i class="fas fa-right-to-bracket"></i> Sign In</a>
                <a href="dashboard.html" class="btn btn-outline-gold w-full" onclick="toggleMobileMenu()"><i class="fas fa-gauge"></i> Dashboard</a>
            </div>
            <div class="mob-toggles">
                <button onclick="toggleDir()" class="nav-icon-btn" title="Toggle Direction">
                    <span class="dir-label" style="font-size:0.6rem;font-weight:600;">${isRTL ? 'RTL' : 'LTR'}</span>
                </button>
                <button onclick="toggleTheme()" class="nav-icon-btn" title="Toggle Theme" aria-label="Toggle dark mode">
                    <span class="theme-icon-wrap"><i class="${isDark ? 'fas fa-sun theme-icon' : 'fas fa-moon theme-icon'}"></i></span>
                </button>
            </div>
        </div>
    </nav>
    <div class="navbar-spacer"></div>`;
}

function toggleMobileMenu(e) {
    if (e && e.stopPropagation) {
        e.stopPropagation();
    }
    const nav = document.getElementById('navbar');
    const menu = document.getElementById('mobile-menu');
    const backdrop = document.getElementById('mobile-backdrop');
    const iconEl = document.querySelector('.mobile-menu-icon');
    if (!menu) return;

    const isOpen = menu.classList.contains('open');
    if (isOpen) {
        menu.classList.remove('open');
        if (backdrop) backdrop.classList.remove('open');
        if (nav) nav.classList.remove('menu-open');
        if (iconEl) iconEl.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
    } else {
        menu.classList.add('open');
        if (backdrop) backdrop.classList.add('open');
        if (nav) nav.classList.add('menu-open');
        if (iconEl) iconEl.innerHTML = '<i class="fas fa-xmark"></i>';
        document.body.style.overflow = 'hidden';
    }
}

// Close mobile menu on outside click
document.addEventListener('click', function(e) {
    const menu = document.getElementById('mobile-menu');
    const backdrop = document.getElementById('mobile-backdrop');
    const btn = document.querySelector('.mobile-menu-btn');
    const nav = document.getElementById('navbar');
    if (!menu || !menu.classList.contains('open')) return;

    if (btn && (btn === e.target || btn.contains(e.target))) return;
    if (menu.contains(e.target)) return;

    menu.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    if (nav) nav.classList.remove('menu-open');
    const iconEl = document.querySelector('.mobile-menu-icon');
    if (iconEl) iconEl.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = '';
});

// Close mobile menu on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const menu = document.getElementById('mobile-menu');
        const backdrop = document.getElementById('mobile-backdrop');
        const nav = document.getElementById('navbar');
        if (menu && menu.classList.contains('open')) {
            menu.classList.remove('open');
            if (backdrop) backdrop.classList.remove('open');
            if (nav) nav.classList.remove('menu-open');
            const iconEl = document.querySelector('.mobile-menu-icon');
            if (iconEl) iconEl.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }
        const lightbox = document.getElementById('lightbox-backdrop');
        if (lightbox && lightbox.classList.contains('open')) closeLightbox();
    }
});

/* ─── NAVBAR SCROLL ───────────────────────────────────── */
function updateNavScroll() {
    const nav = document.getElementById('navbar');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
}
window.addEventListener('scroll', updateNavScroll, { passive: true });

/* ─── FOOTER ──────────────────────────────────────────── */
function injectFooter() {
    const el = document.getElementById('main-footer');
    if (!el) return;
    el.innerHTML = `
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <!-- Column 1: Brand & Socials -->
                <div class="footer-brand">
                    <a href="index.html" class="nav-logo footer-logo" aria-label="SkyVista Home">
                        ${getLogoImgHTML(40)}
                        <div class="nav-logo-text">
                            <span class="brand-top" style="color:#fff;">SkyVista</span>
                            <span class="brand-bottom">Helicopter Tours</span>
                        </div>
                    </a>
                    <p>Experience the world from above with our premium helicopter tours and scenic flights. Unforgettable aerial adventures await you.</p>
                    <div class="footer-socials">
                        <a href="#" class="footer-social-link" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="footer-social-link" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="footer-social-link" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                        <a href="#" class="footer-social-link" aria-label="X (Twitter)"><i class="fab fa-x-twitter"></i></a>
                    </div>
                </div>

                <!-- Column 2: Quick Links -->
                <div class="footer-col">
                    <h4 class="footer-col-title">QUICK LINKS</h4>
                    <ul class="footer-links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="home2.html">Home 2 — Premium</a></li>
                        <li><a href="tours.html">Tours & Packages</a></li>
                        <li><a href="safety.html">Safety & Pilots</a></li>
                        <li><a href="gallery.html">Gallery</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                    </ul>
                </div>

                <!-- Column 3: Resources -->
                <div class="footer-col">
                    <h4 class="footer-col-title">RESOURCES</h4>
                    <ul class="footer-links">
                        <li><a href="login.html">Sign In</a></li>
                        <li><a href="signup.html">Sign Up</a></li>
                        <li><a href="dashboard.html">Dashboard</a></li>
                        <li><a href="coming-soon.html">Blog & News</a></li>
                        <li><a href="coming-soon.html">Careers</a></li>
                        <li><a href="404.html">404 Error Page</a></li>
                        <li><a href="coming-soon.html">Coming Soon</a></li>
                    </ul>
                </div>

                <!-- Column 4: Stay Updated Card -->
                <div class="footer-col footer-col-newsletter">
                    <div class="footer-newsletter-card">
                        <h4 class="footer-newsletter-title">Flight Updates</h4>
                        <p class="footer-newsletter-desc">Subscribe for new route launches, seasonal flight offers, and aerial photography tips.</p>
                        <form onsubmit="event.preventDefault(); alert('Subscribed! Welcome aboard.'); this.reset();" class="footer-newsletter-form">
                            <input type="email" placeholder="your@email.com" class="footer-newsletter-input" required>
                            <button type="submit" class="footer-newsletter-btn">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div class="footer-bottom">
                <p class="footer-copyright">&copy; ${new Date().getFullYear()} SkyVista Helicopter Tours. All rights reserved.</p>
                <div class="footer-bottom-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Safety Policy</a>
                    <a href="#">Cookies</a>
                </div>
            </div>
        </div>
    </footer>`;
}

/* ─── SCROLL TO TOP ────────────────────────────────────── */
function injectScrollToTop() {
    if (document.body.classList.contains('auth-page') || document.body.classList.contains('fullscreen-page')) return;
    if (document.getElementById('scroll-to-top')) return;
    const btn = document.createElement('button');
    btn.id = 'scroll-to-top';
    btn.className = 'scroll-to-top-btn';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.appendChild(btn);
    window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 300), { passive: true });
}

/* ─── AUTH PAGE INIT ────────────────────────────────────── */
function initAuthPage() {
    const html = document.documentElement;
    const saved = localStorage.getItem('sv_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) html.classList.add('dark');
    if (localStorage.getItem('sv_dir') === 'rtl') html.setAttribute('dir', 'rtl');
    document.querySelectorAll('.theme-icon').forEach(updateThemeIcon);
    document.querySelectorAll('.dir-label').forEach(el => {
        el.textContent = html.getAttribute('dir') === 'rtl' ? 'RTL' : 'LTR';
    });
}

/* ─── PASSWORD VISIBILITY ───────────────────────────────── */
function togglePasswordVisibility(inputId, el) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const isPw = input.type === 'password';
    input.type = isPw ? 'text' : 'password';
    if (!el) return;
    const icon = el.tagName === 'I' ? el : el.querySelector('i');
    if (icon) {
        icon.className = isPw ? 'fas fa-eye-slash' : 'fas fa-eye';
    }
}

/* ─── FAQ TOGGLE ─────────────────────────────────────────── */
function toggleFAQ(el) {
    const item = el.closest('.faq-item');
    const wasActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item.active').forEach(f => f.classList.remove('active'));
    if (!wasActive) item.classList.add('active');
}

/* ─── FILTER TABS ────────────────────────────────────────── */
function switchFilter(filterValue, groupSelector) {
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-filter') === filterValue);
    });
    const cards = document.querySelectorAll(groupSelector || '.filterable-card');
    cards.forEach(card => {
        card.style.display = (filterValue === 'all' || card.getAttribute('data-category') === filterValue) ? '' : 'none';
    });
}

/* ─── SCROLL ANIMATIONS ─────────────────────────────────── */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

/* ─── COUNTER ANIMATION ─────────────────────────────────── */
function animateCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'));
                const suffix = el.getAttribute('data-suffix') || '';
                const prefix = el.getAttribute('data-prefix') || '';
                let current = 0;
                const step = Math.max(1, Math.ceil(target / 70));
                const timer = setInterval(() => {
                    current = Math.min(current + step, target);
                    el.textContent = prefix + current.toLocaleString() + suffix;
                    if (current >= target) clearInterval(timer);
                }, 20);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.3 });
    document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
}

/* ─── LIGHTBOX ───────────────────────────────────────────── */
function openLightbox(imgSrc, caption) {
    let lb = document.getElementById('lightbox-backdrop');
    if (!lb) {
        lb = document.createElement('div');
        lb.id = 'lightbox-backdrop';
        lb.className = 'lightbox-backdrop';
        lb.innerHTML = `
            <button class="lightbox-close" onclick="closeLightbox()" aria-label="Close"><i class="fas fa-xmark"></i></button>
            <img src="" alt="" class="lightbox-img" id="lightbox-img">
        `;
        lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
        document.body.appendChild(lb);
    }
    document.getElementById('lightbox-img').src = imgSrc;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lb = document.getElementById('lightbox-backdrop');
    if (lb) { lb.classList.remove('open'); document.body.style.overflow = ''; }
}

/* ─── MAIN INIT ──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
    injectNav();
    injectFooter();
    injectScrollToTop();
    initScrollAnimations();
    animateCounters();

    // Restore dir & icon labels
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    document.querySelectorAll('.dir-label').forEach(el => {
        el.textContent = isRTL ? 'RTL' : 'LTR';
    });
    document.querySelectorAll('.theme-icon').forEach(updateThemeIcon);

    // Initial navbar state
    updateNavScroll();
});
