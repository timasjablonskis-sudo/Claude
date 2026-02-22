# Roofora Component Specifications

> Detailed specs for every UI component identified in the reference designs. Each spec includes structure, variants, states, responsive behavior, and Tailwind class references.

---

## Table of Contents

1. [Navbar](#1-navbar)
2. [Hero Section](#2-hero-section)
3. [Trust Bar](#3-trust-bar)
4. [Service Cards](#4-service-cards)
5. [Stats Section](#5-stats-section)
6. [About / Feature Section](#6-about--feature-section)
7. [Gallery Grid](#7-gallery-grid)
8. [Testimonials](#8-testimonials)
9. [CTA Banner](#9-cta-banner)
10. [Footer](#10-footer)
11. [Buttons](#11-buttons)
12. [Form Elements](#12-form-elements)
13. [Badge / Chip](#13-badge--chip)
14. [Wave Divider](#14-wave-divider)

---

## 1. Navbar

**Purpose:** Primary navigation with brand identity and CTA.

### Structure
```
<header>
  ├── Logo (icon + "Roofora" wordmark)
  ├── Nav Links: Home | About | Services | Gallery | Projects | Contact
  └── CTA Button: "Get Free Quote"
</header>
```

### Specs
| Property         | Value                                              |
|------------------|----------------------------------------------------|
| Height           | 72px (desktop), 64px (mobile)                      |
| Background       | `white` / `rgba(255,255,255,0.8)` with backdrop-blur |
| Backdrop filter   | `blur(12px) saturate(180%)`                       |
| Border bottom    | `1px solid var(--color-gray-200)` (on scroll)      |
| Content max-width| 1280px, centered                                   |
| Padding          | `0 24px`                                           |
| Position         | `sticky top-0 z-fixed`                             |
| Logo size        | 32px icon + 16px text                              |

### Nav Link States
| State   | Style                                          |
|---------|-------------------------------------------------|
| Default | `text-gray-600 font-medium text-sm`            |
| Hover   | `text-gray-900` with underline offset animation |
| Active  | `text-primary font-semibold`                   |

### CTA Button
- Variant: Primary pill button
- Classes: `bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold`
- Hover: `bg-primary-700 shadow-blue`

### Mobile Behavior
- Hamburger icon at `md` breakpoint and below
- Slide-in drawer from right, full-height
- Overlay: `bg-black/50 backdrop-blur-sm`

### Tailwind Reference
```html
<header class="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-transparent transition-colors">
  <nav class="max-w-content mx-auto px-6 h-[72px] flex items-center justify-between">
    <!-- Logo -->
    <!-- Links -->
    <!-- CTA -->
  </nav>
</header>
```

---

## 2. Hero Section

**Purpose:** Primary landing area with headline, description, CTA, and hero image.

### Structure
```
<section>
  ├── Background (gradient + optional pattern)
  ├── Content Column
  │   ├── Trust badge: "✓ Trusted Roofing Experts"
  │   ├── Headline: "Smart Roofing for Modern Homes."
  │   ├── Description paragraph
  │   ├── CTA Group (primary button + secondary)
  │   └── Media type selector (Suggest | Image | Video)
  └── Image Column
      └── Hero image with floating info card overlay
</section>
```

### Specs
| Property         | Value                                              |
|------------------|----------------------------------------------------|
| Min height       | `calc(100vh - 72px)` or `600px` min                |
| Background       | `var(--gradient-hero)`                             |
| Padding          | `96px 24px` (desktop), `64px 16px` (mobile)       |
| Grid             | 2-column `55% / 45%` (desktop), stacked (mobile)  |
| Gap              | `48px`                                             |

### Headline Typography
- Font: `var(--text-display-fluid)`
- Weight: `800`
- Color: `var(--color-gray-900)`
- Letter spacing: `-0.02em`
- Line height: `1.1`

### Hero Image
- Border radius: `var(--radius-2xl)`
- Shadow: `var(--shadow-hero)`
- Aspect ratio: ~16:10
- Object fit: cover

### Floating Info Card
- Position: absolute, bottom-left of image
- Background: `white`
- Padding: `16px`
- Border radius: `var(--radius-lg)`
- Shadow: `var(--shadow-lg)`
- Contains: thumbnail, title, description, action icons

### Responsive
- Mobile: single column, image below text
- Headline scales down via `clamp()`
- Image aspect ratio changes to 16:9 on mobile

---

## 3. Trust Bar

**Purpose:** Display partner/client logos for social proof.

### Structure
```
<section>
  └── Logo strip: Logo1 | Logo2 | Logo3 | Logo4 | Logo5
</section>
```

### Specs
| Property         | Value                                   |
|------------------|-----------------------------------------|
| Background       | `white` or `var(--color-gray-50)`       |
| Padding          | `24px`                                  |
| Logo height      | 24px–32px, grayscale by default         |
| Logo gap         | `48px`                                  |
| Layout           | Flex, center-aligned, wrap on mobile    |
| Logo filter      | `grayscale(100%) opacity(0.5)`          |
| Logo hover       | `grayscale(0%) opacity(1)` transition   |

---

## 4. Service Cards

**Purpose:** Showcase individual roofing services with image, title, description.

### Structure
```
<div class="card">
  ├── Image (top, full-width)
  ├── Content
  │   ├── Title
  │   ├── Description
  │   └── "Learn More →" link
  └── Optional badge/icon
</div>
```

### Specs
| Property         | Value                                           |
|------------------|--------------------------------------------------|
| Layout           | 3-column grid (desktop), 1-column (mobile)      |
| Gap              | `32px`                                           |
| Background       | `white`                                          |
| Border           | `1px solid var(--color-gray-200)`                |
| Border radius    | `var(--radius-xl)`                               |
| Padding          | `0` (image bleeds to edges), `24px` for content  |
| Shadow           | `var(--shadow-sm)` default                       |
| Image height     | `200px`, `object-fit: cover`                     |
| Image radius     | `var(--radius-xl) var(--radius-xl) 0 0`          |

### States
| State   | Changes                                          |
|---------|--------------------------------------------------|
| Default | `shadow-sm, border-gray-200`                     |
| Hover   | `shadow-lg, -translate-y-1, border-primary-200`  |

### Title
- Size: `var(--text-xl)`, weight: `600`
- Color: `var(--color-gray-800)`

### Description
- Size: `var(--text-sm)`, weight: `400`
- Color: `var(--color-gray-500)`
- Max lines: 3 (line-clamp)

### "Learn More" Link
- Color: `var(--color-primary)`
- Font: `var(--text-sm)`, weight: `600`
- Hover: underline, arrow translates right 4px

### Responsive
- `lg`: 3 columns
- `md`: 2 columns
- `sm`: 1 column, full-width cards

---

## 5. Stats Section

**Purpose:** Display key business metrics for credibility.

### Structure
```
<section>
  └── Grid
      ├── Stat: "500+" — "Completed Projects"
      ├── Stat: "23" — "Years of Experience"
      ├── Stat: "92%" — "Customer Satisfaction"
      └── Stat: "98%" — "Project Completion Rate"
</section>
```

### Specs
| Property         | Value                                           |
|------------------|--------------------------------------------------|
| Layout           | 4-column grid (desktop), 2x2 (tablet), stacked  |
| Background       | `white` or `var(--color-primary)` (blue variant) |
| Padding          | `64px 24px`                                      |
| Gap              | `32px`                                           |
| Text alignment   | Center                                           |

### Stat Number
- Font: `var(--text-4xl)` or `var(--text-display)` for emphasis
- Weight: `800`
- Color: `var(--color-gray-900)` (light bg) or `white` (blue bg)
- Font family: `var(--font-mono)` for numbers

### Stat Label
- Font: `var(--text-sm)`
- Weight: `400`
- Color: `var(--color-gray-500)` (light bg) or `white/70` (blue bg)

### Blue Variant (from reference 3)
- Background: `var(--gradient-blue)`
- All text: white
- Dividers between stats: `1px solid rgba(255,255,255,0.2)`

### Animation
- Numbers count up from 0 on viewport entry
- Stagger delay: 100ms per stat

---

## 6. About / Feature Section

**Purpose:** Explain company mission with image + text split layout.

### Structure
```
<section>
  ├── Image Column (left)
  │   └── Large image with rounded corners
  └── Content Column (right)
      ├── Section label (uppercase, small, primary color)
      ├── Heading
      ├── Body text
      ├── Feature list with check icons
      └── CTA Button
</section>
```

### Specs
| Property         | Value                                  |
|------------------|----------------------------------------|
| Layout           | 2-column `50/50` grid                 |
| Gap              | `64px`                                |
| Padding          | `96px 24px`                           |
| Image radius     | `var(--radius-2xl)`                   |
| Image shadow     | `var(--shadow-lg)`                    |

### Section Label
- Text: `"Why Choose Us"` (uppercase)
- Font: `var(--text-xs)`, weight: `700`
- Color: `var(--color-primary)`
- Letter spacing: `0.1em`
- Margin bottom: `16px`

### Feature List Item
- Icon: Lucide `Check` in `primary` circle
- Text: `var(--text-base)`, weight: `500`, `gray-700`
- Gap: `12px` between icon and text
- Vertical gap: `16px` between items

### Responsive
- Mobile: stacked, image above content
- Image: full-width on mobile

---

## 7. Gallery Grid

**Purpose:** Showcase completed roofing projects.

### Structure
```
<section>
  ├── Section header (title + filter tabs)
  └── Image grid
      ├── Image with hover overlay
      ├── Image with hover overlay
      └── ...
</section>
```

### Specs
| Property         | Value                                        |
|------------------|----------------------------------------------|
| Layout           | CSS Grid, auto-fill `minmax(300px, 1fr)`    |
| Gap              | `16px`                                       |
| Image radius     | `var(--radius-lg)`                           |
| Aspect ratio     | `4:3`                                        |

### Filter Tabs
- Style: pill buttons in a row
- Active: `bg-primary text-white`
- Inactive: `bg-gray-100 text-gray-600`
- Categories: All | Residential | Commercial | Repairs

### Image Hover Overlay
- Overlay: `bg-black/40` fade-in
- Content: project name + "View Project" link
- Transition: `var(--duration-normal)`

---

## 8. Testimonials

**Purpose:** Client reviews for social proof.

### Structure
```
<div class="testimonial-card">
  ├── Star rating (★★★★★)
  ├── Quote text
  ├── Author info
  │   ├── Avatar
  │   ├── Name
  │   └── Role / Location
  └── Optional company logo
</div>
```

### Specs
| Property         | Value                                  |
|------------------|----------------------------------------|
| Layout           | 3-column grid or horizontal carousel   |
| Background       | `white`                                |
| Border           | `1px solid var(--color-gray-200)`      |
| Border radius    | `var(--radius-xl)`                     |
| Padding          | `32px`                                 |
| Shadow           | `var(--shadow-md)`                     |

### Star Rating
- Size: 16px
- Color: `#F59E0B` (warning/gold)
- Gap: 2px

### Quote Text
- Font: `var(--text-base)`, weight: `400`
- Color: `var(--color-gray-600)`
- Font style: normal (not italic)
- Line clamp: 4 lines

### Author
- Avatar: 40px circle
- Name: `var(--text-sm)`, weight: `600`, `gray-800`
- Role: `var(--text-xs)`, weight: `400`, `gray-400`

### Carousel Variant
- Auto-scrolling with pause on hover
- Navigation: left/right arrow buttons
- Dots indicator below

---

## 9. CTA Banner

**Purpose:** Full-width call-to-action for quote requests.

### Structure
```
<section>
  ├── Background (image with dark overlay OR solid blue)
  ├── Headline: "With Experience & Commitment For Your Roof"
  ├── Description
  └── CTA Button
</section>
```

### Specs
| Property         | Value                                      |
|------------------|--------------------------------------------|
| Background       | Image with `var(--gradient-warm-overlay)` or `var(--gradient-blue)` |
| Padding          | `96px 24px`                                |
| Text align       | Center                                     |
| Max text width   | `640px`, centered                          |

### Headline
- Font: `var(--text-3xl-fluid)`, weight: `700`
- Color: `white`

### CTA Button
- Variant: white on blue, or primary on dark
- Size: large (`px-8 py-4 text-lg`)
- Radius: `var(--radius-full)`

---

## 10. Footer

**Purpose:** Site-wide footer with links, contact info, and legal.

### Structure
```
<footer>
  ├── Top section (4-column grid)
  │   ├── Brand (logo + description + social links)
  │   ├── Quick Links
  │   ├── Services
  │   └── Contact Info (address, phone, email)
  └── Bottom bar (copyright + legal links)
</footer>
```

### Specs
| Property         | Value                                  |
|------------------|----------------------------------------|
| Background       | `var(--color-gray-900)` or `var(--gradient-dark)` |
| Padding top      | `64px`                                 |
| Padding bottom   | `24px`                                 |
| Text color       | `var(--color-gray-400)` default        |
| Link hover       | `white`                                |
| Divider          | `1px solid rgba(255,255,255,0.1)`      |

### Social Icons
- Size: 20px
- Color: `gray-400`, hover: `white`
- Icons: Facebook, Instagram, LinkedIn, Twitter/X

### Bottom Bar
- Font: `var(--text-xs)`
- Layout: space-between (copyright left, links right)

---

## 11. Buttons

### Variants

| Variant    | Classes                                                      |
|------------|--------------------------------------------------------------|
| Primary    | `bg-primary text-white hover:bg-primary-700 shadow-blue`    |
| Secondary  | `bg-white text-gray-800 border border-gray-200 hover:bg-gray-50` |
| Accent     | `bg-accent text-white hover:bg-accent-700`                  |
| Ghost      | `bg-transparent text-gray-600 hover:bg-gray-100`            |
| Link       | `text-primary hover:underline p-0`                           |

### Sizes

| Size   | Padding          | Font Size      | Radius              |
|--------|------------------|----------------|----------------------|
| sm     | `px-4 py-2`      | `text-sm`      | `rounded-lg`        |
| md     | `px-6 py-2.5`    | `text-sm`      | `rounded-lg`        |
| lg     | `px-8 py-3.5`    | `text-base`    | `rounded-xl`        |
| pill   | `px-6 py-2.5`    | `text-sm`      | `rounded-full`      |

### States
| State    | Effect                                         |
|----------|-------------------------------------------------|
| Default  | Base styles                                    |
| Hover    | Darker bg, elevated shadow                     |
| Focus    | `ring-2 ring-primary ring-offset-2`            |
| Active   | `scale-[0.98]` transform                      |
| Disabled | `opacity-50 cursor-not-allowed pointer-events-none` |
| Loading  | Spinner icon replaces text, disabled state     |

---

## 12. Form Elements

### Text Input
| Property    | Value                                         |
|-------------|-----------------------------------------------|
| Height      | 44px                                          |
| Padding     | `12px 16px`                                   |
| Border      | `1px solid var(--color-gray-300)`             |
| Radius      | `var(--radius-md)`                            |
| Font        | `var(--text-base)`                            |
| Focus       | `border-primary ring-2 ring-primary-100`      |
| Error       | `border-error ring-2 ring-accent-100`         |
| Placeholder | `var(--color-gray-400)`                       |

### Textarea
- Same as input, height: 120px min, resizable vertically

### Select
- Same as input with chevron-down icon right

### Label
- Font: `var(--text-sm)`, weight: `500`
- Color: `var(--color-gray-700)`
- Margin bottom: `6px`

### Error Message
- Font: `var(--text-xs)`, weight: `400`
- Color: `var(--color-error)`
- Margin top: `4px`
- Icon: `AlertCircle` 14px inline

---

## 13. Badge / Chip

### Variants
| Variant  | Classes                                         |
|----------|-------------------------------------------------|
| Default  | `bg-gray-100 text-gray-600`                    |
| Primary  | `bg-primary-50 text-primary-700`               |
| Success  | `bg-green-50 text-green-700`                   |
| Warning  | `bg-amber-50 text-amber-700`                   |
| Error    | `bg-red-50 text-red-700`                        |

### Specs
| Property | Value                            |
|----------|----------------------------------|
| Padding  | `4px 12px`                       |
| Font     | `var(--text-xs)`, weight: `500`  |
| Radius   | `var(--radius-full)`             |
| Border   | none                             |

---

## 14. Wave Divider

**Purpose:** Decorative section separator (from reference 2, red wave motif).

### Structure
```html
<div class="wave-divider">
  <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
    <path d="M0,50 C360,100 720,0 1440,50 L1440,100 L0,100 Z" />
  </svg>
</div>
```

### Specs
| Property   | Value                                     |
|------------|-------------------------------------------|
| Width      | `100%`                                    |
| Height     | `80px–120px`                              |
| Fill       | Matches next section background color     |
| Position   | Absolute bottom of preceding section      |
| Variants   | Wave, Curve, Slant                        |

### Color Options
- `fill: var(--color-white)` — transitioning to white section
- `fill: var(--color-gray-50)` — transitioning to gray section
- `fill: var(--color-accent)` — decorative red wave accent
- `fill: var(--color-gray-900)` — transitioning to dark section

---

## Component Composition: Page Layout

### Homepage Composition Order
```
1. Navbar (sticky)
2. Hero Section (gradient bg)
3. Trust Bar (logos)
4. Services Section (3 cards)
5. About / Feature Section (split layout)
6. Wave Divider
7. Stats Section (blue variant)
8. Gallery Grid
9. Testimonials
10. CTA Banner (image bg)
11. Footer
```

### Content Widths by Component
| Component    | Width Behavior                              |
|--------------|---------------------------------------------|
| Navbar       | Full-width bg, `max-w-content` inner        |
| Hero         | Full-width bg, `max-w-content` inner        |
| Trust Bar    | `max-w-content` centered                    |
| Services     | `max-w-content` centered                    |
| Stats        | Full-width bg, `max-w-content` inner        |
| Gallery      | `max-w-content` centered                    |
| CTA Banner   | Full-width bg, `max-w-sm` text              |
| Footer       | Full-width bg, `max-w-content` inner        |
