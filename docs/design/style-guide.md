# Roofora Design System — Style Guide

> Design system for the Roofora roofing company website, derived from reference mockups and tailored for a modern Next.js + Tailwind CSS implementation.

---

## 1. Brand Identity

**Brand Name:** Roofora
**Tagline:** "Smart Roofing for Modern Homes"
**Voice:** Professional, trustworthy, modern, approachable
**Positioning:** Premium residential & commercial roofing — technology-forward, quality-driven

### Brand Personality
| Trait        | Expression                                      |
|--------------|--------------------------------------------------|
| Trustworthy  | Clean layouts, real photography, stats/metrics   |
| Modern       | Rounded corners, gradients, generous whitespace  |
| Professional | Structured grid, consistent spacing, clear CTAs  |
| Approachable | Warm hero imagery, friendly copy, soft shadows   |

---

## 2. Color Palette

### Primary Colors
| Token                | Hex       | Usage                              |
|----------------------|-----------|------------------------------------|
| `--color-primary`    | `#2563EB` | Buttons, links, active states      |
| `--color-primary-light` | `#3B82F6` | Hover states, highlights        |
| `--color-primary-dark`  | `#1D4ED8` | Pressed states, dark accents    |

### Accent Colors
| Token                | Hex       | Usage                              |
|----------------------|-----------|------------------------------------|
| `--color-accent`     | `#DC2626` | Urgent CTAs, badges, alerts        |
| `--color-accent-light` | `#EF4444` | Hover on accent elements        |
| `--color-accent-dark`  | `#B91C1C` | Pressed accent states           |

### Neutrals
| Token                  | Hex       | Usage                            |
|------------------------|-----------|----------------------------------|
| `--color-white`        | `#FFFFFF` | Backgrounds, cards               |
| `--color-gray-50`      | `#F9FAFB` | Page background, subtle fills    |
| `--color-gray-100`     | `#F3F4F6` | Card backgrounds, dividers       |
| `--color-gray-200`     | `#E5E7EB` | Borders, separators              |
| `--color-gray-300`     | `#D1D5DB` | Disabled states                  |
| `--color-gray-400`     | `#9CA3AF` | Placeholder text                 |
| `--color-gray-500`     | `#6B7280` | Secondary text                   |
| `--color-gray-600`     | `#4B5563` | Body text                        |
| `--color-gray-700`     | `#374151` | Headings secondary               |
| `--color-gray-800`     | `#1F2937` | Headings primary                 |
| `--color-gray-900`     | `#111827` | Darkest text, footer background  |
| `--color-black`        | `#030712` | Pure black, overlays             |

### Semantic Colors
| Token                | Hex       | Usage                              |
|----------------------|-----------|------------------------------------|
| `--color-success`    | `#16A34A` | Success messages, check icons      |
| `--color-warning`    | `#F59E0B` | Warnings, attention badges         |
| `--color-error`      | `#DC2626` | Error states, validation           |
| `--color-info`       | `#2563EB` | Info banners, tooltips             |

### Gradients
| Name               | Value                                              | Usage               |
|--------------------|----------------------------------------------------|----------------------|
| Hero Gradient      | `linear-gradient(135deg, #F9FAFB 0%, #DBEAFE 100%)` | Hero background     |
| Blue Fade          | `linear-gradient(180deg, #2563EB 0%, #1D4ED8 100%)` | Blue section bg     |
| Warm Overlay       | `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)` | Image overlays |

---

## 3. Typography

### Font Stack
- **Headings:** `Inter, system-ui, -apple-system, sans-serif`
- **Body:** `Inter, system-ui, -apple-system, sans-serif`
- **Mono (stats):** `'JetBrains Mono', 'Fira Code', monospace`

### Type Scale
| Level   | Size     | Weight   | Line Height | Letter Spacing | Usage                |
|---------|----------|----------|-------------|----------------|----------------------|
| Display | 64px/4rem | 800     | 1.1         | -0.02em        | Hero headline        |
| H1      | 48px/3rem | 700     | 1.15        | -0.02em        | Page titles          |
| H2      | 36px/2.25rem | 700  | 1.2         | -0.01em        | Section headings     |
| H3      | 24px/1.5rem | 600   | 1.3         | 0              | Card titles          |
| H4      | 20px/1.25rem | 600  | 1.4         | 0              | Sub-section heads    |
| Body LG | 18px/1.125rem | 400 | 1.6         | 0              | Lead paragraphs      |
| Body    | 16px/1rem | 400     | 1.6         | 0              | Default body text    |
| Body SM | 14px/0.875rem | 400 | 1.5         | 0              | Captions, metadata   |
| Caption | 12px/0.75rem | 500  | 1.4         | 0.02em         | Labels, badges       |

### Responsive Typography
- Display: `clamp(2.5rem, 5vw, 4rem)`
- H1: `clamp(2rem, 4vw, 3rem)`
- H2: `clamp(1.5rem, 3vw, 2.25rem)`

---

## 4. Spacing System

Base unit: **4px**

| Token   | Value | Tailwind | Usage                          |
|---------|-------|----------|--------------------------------|
| `--sp-1`  | 4px   | `p-1`  | Tight inner padding            |
| `--sp-2`  | 8px   | `p-2`  | Icon gaps, badge padding       |
| `--sp-3`  | 12px  | `p-3`  | Small card padding             |
| `--sp-4`  | 16px  | `p-4`  | Default element spacing        |
| `--sp-5`  | 20px  | `p-5`  | Card inner padding             |
| `--sp-6`  | 24px  | `p-6`  | Section inner padding          |
| `--sp-8`  | 32px  | `p-8`  | Component gaps                 |
| `--sp-10` | 40px  | `p-10` | Section vertical padding       |
| `--sp-12` | 48px  | `p-12` | Large section padding          |
| `--sp-16` | 64px  | `p-16` | Section separators             |
| `--sp-20` | 80px  | `p-20` | Hero vertical padding          |
| `--sp-24` | 96px  | `p-24` | Page section vertical spacing  |

### Layout Widths
| Token            | Value   | Usage                    |
|------------------|---------|--------------------------|
| `--width-xs`     | 480px   | Small modals             |
| `--width-sm`     | 640px   | Medium modals, forms     |
| `--width-md`     | 768px   | Tablet breakpoint        |
| `--width-lg`     | 1024px  | Desktop breakpoint       |
| `--width-xl`     | 1280px  | Max content width        |
| `--width-2xl`    | 1440px  | Wide layouts             |

---

## 5. Border & Radius

| Token                   | Value | Usage                           |
|-------------------------|-------|---------------------------------|
| `--radius-sm`           | 6px   | Badges, small chips             |
| `--radius-md`           | 8px   | Inputs, small cards             |
| `--radius-lg`           | 12px  | Cards, modals                   |
| `--radius-xl`           | 16px  | Hero cards, image containers    |
| `--radius-2xl`          | 24px  | Large feature cards             |
| `--radius-full`         | 9999px| Pills, avatars, round buttons   |
| `--border-width`        | 1px   | Default borders                 |
| `--border-color`        | `var(--color-gray-200)` | Default border color |

---

## 6. Shadows & Elevation

| Token              | Value                                           | Usage              |
|--------------------|--------------------------------------------------|-------------------|
| `--shadow-sm`      | `0 1px 2px rgba(0,0,0,0.05)`                    | Subtle lift        |
| `--shadow-md`      | `0 4px 6px -1px rgba(0,0,0,0.1)`                | Cards default      |
| `--shadow-lg`      | `0 10px 15px -3px rgba(0,0,0,0.1)`              | Cards hover        |
| `--shadow-xl`      | `0 20px 25px -5px rgba(0,0,0,0.1)`              | Modals, dropdowns  |
| `--shadow-hero`    | `0 25px 50px -12px rgba(0,0,0,0.15)`            | Hero floating card |
| `--shadow-blue`    | `0 4px 14px rgba(37,99,235,0.3)`                | Blue CTA glow      |

---

## 7. Motion & Animation

| Token                   | Value                  | Usage                     |
|-------------------------|------------------------|---------------------------|
| `--duration-fast`       | 150ms                  | Micro-interactions        |
| `--duration-normal`     | 250ms                  | Hovers, toggles           |
| `--duration-slow`       | 400ms                  | Panels, modals            |
| `--easing-default`      | `cubic-bezier(0.4, 0, 0.2, 1)` | Default transitions |
| `--easing-in`           | `cubic-bezier(0.4, 0, 1, 1)` | Enter animations    |
| `--easing-out`          | `cubic-bezier(0, 0, 0.2, 1)` | Exit animations     |
| `--easing-bounce`       | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful emphasis |

### Animation Principles
- Card hover: translate Y -4px + shadow elevation increase
- Buttons: background color transition on hover, scale(0.98) on press
- Page sections: fade-in-up on scroll (intersection observer)
- Stats counters: count-up animation on viewport entry
- Navigation: smooth background blur on scroll

---

## 8. Imagery & Iconography

### Photography Style
- High-quality residential/commercial roofing photography
- Warm lighting, modern homes, clean compositions
- Hero images: wide-angle exterior shots with visible rooflines
- Service images: close-up detail work, workers in action
- Consistent warm color grading

### Image Treatments
- Hero images: full-bleed with gradient overlay
- Service cards: 16:10 aspect ratio, `object-fit: cover`
- Gallery: masonry or grid layout, rounded corners
- Thumbnails: 1:1 aspect ratio, `border-radius: var(--radius-lg)`

### Icons
- Style: Outlined, 1.5px stroke, rounded caps
- Library recommendation: **Lucide React** (consistent with modern aesthetic)
- Sizes: 16px (inline), 20px (buttons), 24px (standalone), 32px (features)
- Color: inherits text color by default

---

## 9. Recommended Tech Stack

| Layer         | Technology                   | Rationale                        |
|---------------|------------------------------|----------------------------------|
| Framework     | Next.js 14+ (App Router)     | SSR, SEO, performance            |
| Styling       | Tailwind CSS 3.4+            | Utility-first, design tokens     |
| Components    | Custom + Radix UI primitives | Accessible, unstyled bases       |
| Animation     | Framer Motion                | Scroll animations, transitions   |
| Icons         | Lucide React                 | Clean outlined icon set          |
| Fonts         | `next/font` (Inter)          | Zero-layout-shift font loading   |
| Images        | `next/image`                 | Optimized responsive images      |
| Forms         | React Hook Form + Zod        | Validation for quote request     |

---

## 10. Accessibility Requirements

- WCAG 2.1 AA compliance minimum
- All color combinations must meet 4.5:1 contrast ratio for body text
- Large text (18px+ bold, 24px+ regular): 3:1 minimum
- Focus indicators: 2px solid `var(--color-primary)` with 2px offset
- All interactive elements keyboard-navigable
- Images require meaningful alt text
- Skip-to-content link on every page
- Reduced motion: respect `prefers-reduced-motion` media query
