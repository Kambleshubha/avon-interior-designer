# Complete UI, UX, and Animation Instructions

## 1. Design System

Define all colors, spacing, radii, shadows, type sizes, container widths, and motion values as CSS custom properties. Use an 8px spacing rhythm. Limit the interface to one serif and one sans-serif family, with system fallbacks. Avoid decorative effects that compete with project photography.

## 2. Layout Rules

- Use semantic landmarks: `header`, `nav`, `main`, `section`, `article`, `footer`.
- Use CSS Grid for page composition and Flexbox for small component alignment.
- Keep paragraph measure near 55–70 characters.
- Preserve intentional whitespace; do not fill every region with content.
- On mobile, preserve the logical DOM order and remove fragile overlaps.

## 3. Component Rules

- Header: transparent over hero, solid background after scroll, visible active state, accessible mobile drawer.
- Buttons: primary filled, secondary outline/text; include hover, focus, active, loading, and disabled states.
- Project cards: image, category, title, location/year; never hide essential information only on hover.
- Forms: persistent labels, inline validation, helpful error copy, success confirmation, spam protection.
- Slider: previous/next controls, status text, touch support, keyboard support; no forced rapid autoplay.

## 4. Animation System

Motion should communicate hierarchy and state, not decorate every element.

### Timing tokens

- Micro interaction: 120–180ms.
- Component transition: 220–320ms.
- Section reveal: 450–700ms.
- Easing: `cubic-bezier(.22, 1, .36, 1)` for entrances; standard ease for controls.
- Stagger: 50–90ms per related item, maximum 5–6 items.

### Approved effects

- Hero content: subtle fade and 16–24px upward movement after initial paint.
- Header: background/height transition when scrolling past hero.
- Images: gentle clip or scale from 1.04 to 1; avoid dramatic zoom.
- Cards: translate up 4–8px with slight shadow on hover; keep text stable.
- Statistics: count once when visible; expose final value immediately to assistive technology.
- Section reveals: use Intersection Observer and animate once.
- Page links: native navigation or short fade; never delay navigation unnecessarily.

### Motion safeguards

- Under `prefers-reduced-motion: reduce`, remove transforms, parallax, smooth scrolling, counters, and autoplay.
- Animate only `transform` and `opacity` where possible.
- Do not attach continuous work directly to scroll; use Intersection Observer or requestAnimationFrame throttling.
- Avoid cursor-following effects, scroll hijacking, and long preloaders.

## 5. Accessibility

- Meet WCAG 2.2 AA contrast and interaction requirements.
- Provide a skip link and visible `:focus-visible` styles.
- Use a real button for menu toggles and expose `aria-expanded`/`aria-controls`.
- Trap focus inside an open modal/drawer and restore it on close.
- Support Escape to close overlays.
- Provide useful alt text for informative images and empty alt text for decorative images.
- Never communicate state using color alone.

## 6. Performance

- Use AVIF/WebP with responsive `srcset` and `sizes`.
- Preload only the hero image and critical font files.
- Self-host and subset fonts; use `font-display: swap`.
- Lazy-load below-the-fold images and defer noncritical JavaScript.
- Reserve image dimensions to prevent layout shift.
- Keep third-party scripts minimal and load analytics after consent where required.

## 7. SEO and Content

- One clear `h1`; hierarchical headings thereafter.
- Unique title, meta description, canonical URL, Open Graph data, and favicon.
- Add Organization/LocalBusiness, Service, Breadcrumb, and Article schema where accurate.
- Use descriptive URLs such as `/projects/modern-villa-pune`.
- Write specific copy; never publish lorem ipsum or unverifiable statistics.

## 8. QA Matrix

Test at 320, 375, 768, 1024, 1280, and 1440px; latest Chrome, Edge, Firefox, and Safari; mouse, keyboard, and touch. Verify menu focus, form errors, reduced motion, slow network, missing image fallback, long text, zoom at 200%, and dark/light system settings if supported.

## 9. Implementation Order

1. Tokens and base styles.
2. Semantic layout and responsive grid.
3. Reusable components and states.
4. Real content and optimized media.
5. Accessibility behaviors.
6. Animation enhancement.
7. Cross-browser, performance, and SEO audit.
