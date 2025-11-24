# Design Guidelines - Flight Tracker Application

## Overview

The Flight Tracker application follows a **system-based approach** using modern dashboard patterns with aviation industry conventions. Drawing inspiration from Flightradar24, FlightAware, and professional aviation displays, the design prioritizes information density, clarity, scanability, and real-time updates.

### Buttons

#### Primary Button
```css
/* Default */
background: #2563eb;
color: #ffffff;
padding: 0.5rem 1rem;
border-radius: 0.5rem;
font-weight: 600;

/* Hover */
background: #1d4ed8;

/* Active */
background: #1e40af;

/* Disabled */
background: #9ca3af;
cursor: not-allowed;
```

#### Secondary Button
```css
/* Default */
background: transparent;
color: #2563eb;
border: 1px solid #2563eb;
padding: 0.5rem 1rem;
border-radius: 0.5rem;

/* Hover */
background: #eff6ff;
```

---

## Images & Media

### Hero Section Alternative

Instead of traditional hero image:
- **Full-width live map** showing tracked flights immediately
- **Floating search bar overlay** (centered, with backdrop blur, max-w-xl)
- **Quick stats ribbon** above or below map showing key metrics

### Supporting Imagery

- **Airline logos**: Small icons (h-6 to h-8 / 24-32px) next to flight numbers
- **Aircraft type illustrations**: In flight detail cards (optional)
- **Airport terminal photos**: Optional in airport detail views
- All images via external sources or icon libraries - no custom generation

### Image Optimization

- Use appropriate formats: SVG for icons/logos, WebP for photos
- Lazy load images below the fold
- Provide appropriate alt text for all images
- Use responsive images with srcset for different screen sizes

---

## Design Philosophy

### Core Principles

1. **Information Clarity Over Visual Flair** - Every element serves the core function of tracking and understanding flight status
2. **Data Hierarchy** - Important information should stand out through size, color, and positioning
3. **Scanability** - Information should be immediately scannable and understandable
4. **Real-Time Updates** - Design supports live data with minimal, purposeful animations
5. **Consistency** - UI patterns should be predictable and repeated throughout the app
6. **Accessibility** - Design should be inclusive and work for all users
7. **Responsive** - Interface should adapt seamlessly to all screen sizes
8. **Performance** - Visual elements should not compromise loading speed

---

## Color System

### Primary Colors

```css
/* Blue Palette - Primary Actions & Information */
--blue-50:  #eff6ff;
--blue-100: #dbeafe;
--blue-600: #2563eb;
--blue-700: #1d4ed8;
--blue-800: #1e40af;
```

**Usage:**
- Primary buttons and CTAs
- Links and interactive elements
- Information badges
- Brand elements

### Status Colors

```css
/* Scheduled - Blue */
--scheduled-bg: #dbeafe;    /* bg-blue-100 */
--scheduled-text: #1e40af;  /* text-blue-800 */

/* Boarding - Yellow */
--boarding-bg: #fef3c7;     /* bg-yellow-100 */
--boarding-text: #92400e;   /* text-yellow-800 */

/* Departed/In-Flight - Green */
--departed-bg: #dcfce7;     /* bg-green-100 */
--departed-text: #166534;   /* text-green-800 */

/* Arrived - Gray */
--arrived-bg: #f3f4f6;      /* bg-gray-100 */
--arrived-text: #1f2937;    /* text-gray-800 */

/* Delayed - Orange */
--delayed-bg: #ffedd5;      /* bg-orange-100 */
--delayed-text: #9a3412;    /* text-orange-800 */

/* Cancelled - Red */
--cancelled-bg: #fee2e2;    /* bg-red-100 */
--cancelled-text: #991b1b;  /* text-red-800 */
```

**Status Indicator Rules:**
- Always use pill-shaped badges with rounded corners
- Text should be uppercase and bold
- Minimum padding: 0.5rem horizontal, 0.25rem vertical
- Icons optional but encouraged for additional clarity

### Neutral Colors

```css
/* Grays - Text & Backgrounds */
--gray-50:  #f9fafb;  /* Subtle backgrounds */
--gray-100: #f3f4f6;  /* Card backgrounds */
--gray-200: #e5e7eb;  /* Borders */
--gray-400: #9ca3af;  /* Icons, disabled */
--gray-500: #6b7280;  /* Secondary text */
--gray-600: #4b5563;  /* Body text */
--gray-700: #374151;  /* Headings */
--gray-900: #111827;  /* Primary text */
```

### Background Colors

```css
--bg-primary: #ffffff;    /* Cards, modals */
--bg-secondary: #f9fafb;  /* Page background */
--bg-tertiary: #f3f4f6;   /* Section backgrounds */
```

---

## Typography

### Font Family

```css
/* Primary Font: Inter or similar geometric sans-serif */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
             'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 
             'Helvetica Neue', sans-serif;
```

**Rationale:** Inter provides excellent readability for data-heavy interfaces. Falls back to native system fonts for optimal performance and familiar feel on each platform.

### Font Sizes & Weights

```css
/* Headings */
--text-6xl: 3.75rem;   /* 60px - Hero/Feature numbers (flight numbers, times) */
--text-5xl: 3rem;      /* 48px - Feature numbers */
--text-4xl: 2.25rem;   /* 36px - Feature numbers */
--text-3xl: 1.875rem;  /* 30px - Main page titles, section headers */
--text-2xl: 1.5rem;    /* 24px - Section headings */
--text-xl: 1.25rem;    /* 20px - Card titles */
--text-lg: 1.125rem;   /* 18px - Subheadings */

/* Body */
--text-base: 1rem;     /* 16px - Default body text, stats */
--text-sm: 0.875rem;   /* 14px - Secondary info, data labels (often uppercase with tracking) */
--text-xs: 0.75rem;    /* 12px - Labels, captions, metadata */

/* Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Typography Scale Usage

| Element | Size | Weight | Color | Notes |
|---------|------|--------|-------|-------|
| Hero/Feature Numbers | 4xl-6xl (36-60px) | Bold (700) | Gray-900 | Flight numbers, times |
| Page Title | 3xl (30px) | Bold (700) | Gray-900 | Main headings |
| Section Heading | 2xl-3xl (24-30px) | Semibold (600) | Gray-900 | Section headers |
| Card Title | xl (20px) | Bold (700) | Gray-900 | Card headers |
| Flight Number | xl (20px) | Bold (700) | Gray-900 | Large, prominent |
| Airline Name | base (16px) | Regular (400) | Gray-600 | Supporting info |
| Location Names | base (16px) | Semibold (600) | Gray-900 | Origins/destinations |
| Stats/Body | base (16px) | Normal (400) | Gray-700 | Data points |
| Times | base (16px) | Semibold (600) | Gray-900 | Departure/arrival |
| Data Labels | sm (14px) | Medium (500) | Gray-600 | Often uppercase with tracking-wide |
| Dates | xs (12px) | Regular (400) | Gray-500 | Timestamps |
| Metadata | xs-sm (12-14px) | Normal (400) | Gray-500 | Additional info |
| Status Badge | xs (12px) | Semibold (600) | Status Color | Uppercase with letter-spacing |

---

## Spacing System

### Spacing Scale (based on 4px grid)

```css
--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-3: 0.75rem;  /* 12px */
--spacing-4: 1rem;     /* 16px */
--spacing-6: 1.5rem;   /* 24px */
--spacing-8: 2rem;     /* 32px */
--spacing-12: 3rem;    /* 48px */
--spacing-16: 4rem;    /* 64px */
```

**Tailwind Primitives:** Use units of 2, 4, 6, and 8 primarily for consistency.

### Common Spacing Patterns

```css
/* Component Padding */
padding: 1rem to 1.5rem; /* 16-24px (p-4 to p-6) */

/* Section Spacing */
gap: 1.5rem to 2rem; /* 24-32px (space-y-6 to space-y-8) */

/* Card Gaps */
gap: 1rem to 1.5rem; /* 16-24px (gap-4 to gap-6) */

/* Container Max Width */
max-width: 80rem; /* 1280px (max-w-7xl) */

/* Header Padding */
padding: 1.5rem 1rem; /* 24px vertical, 16px horizontal */

/* Button Padding */
padding: 0.5rem 1rem; /* 8px vertical, 16px horizontal */
```

---

## Component Patterns

### Navigation Header

**Structure:**
- Fixed top position with backdrop blur (`fixed top-0 backdrop-blur`)
- Height: `h-16` (64px)
- Logo left, search bar center (max-w-xl), user actions right
- Search with autocomplete for flight numbers, routes, airports

**Specifications:**
- Background: White with backdrop blur or semi-transparent
- Z-index: 50 (stays above content)
- Border Bottom: 1px solid #e5e7eb
- Shadow: Subtle `shadow-sm`

**Elements:**
- **Logo**: Left-aligned, h-8 to h-10
- **Search Bar**: Center, max-w-xl, rounded-lg, with search icon
- **Actions**: Right-aligned, icon buttons or user menu

---

### Interactive Map Section (Future Enhancement)

**Specifications:**
- Full-width container
- Minimum height: `min-h-[600px]`
- Leaflet.js for map rendering with aviation tile layers
- Custom flight markers with aircraft icons
- Flight path polylines with directional indicators
- Zoom controls, layer toggles (airlines, airports, airspace)
- Real-time position updates with smooth transitions

**Hero Alternative:**
Instead of traditional hero, lead with:
- Full-width live map showing tracked flights immediately
- Floating search bar overlay (centered, with backdrop blur)
- Quick stats ribbon above or below map

---

### Flight Card (Compact Design)

**Structure:**
```
┌─────────────────────────────────────────────────────────┐
│  FLIGHT-123  [STATUS]                      10:30 AM     │
│  American Airlines                         Nov 24, 2024 │
│                                                          │
│  New York (JFK)  ──→  Los Angeles (LAX)    1:30 PM     │
│                                            Nov 24, 2024  │
│  ─────────────────────────────────────────────────────  │
│  Gate: A12  •  Terminal: 4  •  Aircraft: Boeing 737    │
└─────────────────────────────────────────────────────────┘
```

**Specifications:**
- Background: White (#ffffff)
- Border: 1px solid #e5e7eb or use `rounded-lg` with shadow
- Shadow: `shadow-sm` (0 1px 3px 0 rgba(0, 0, 0, 0.1))
- Hover Shadow: `shadow-md` (0 4px 6px -1px rgba(0, 0, 0, 0.1))
- Border Radius: `rounded-lg` (0.5rem / 8px)
- Padding: `p-4` to `p-6` (1rem to 1.5rem / 16-24px)
- Minimum Height: 160px

**Layout:**
- **Header**: Flight number (large, bold) + airline logo + status badge
- **Timeline**: Departure → Current Position → Arrival visualization
- **Grid Details**: 2 columns on mobile, 3-4 on desktop
- **Key Data**: Altitude, Speed, Aircraft type, Route, Gates

**Interactive States:**
- Default: White background, subtle shadow
- Hover: Elevated shadow, slight scale (transform scale-[1.01])
- Active: Pressed appearance with reduced shadow
- Focus: Blue outline for keyboard navigation (ring-2 ring-blue-600)

---

### Airport Departure/Arrival Boards

**Structure:**
- Table layout with alternating row treatments
- Sticky header: `sticky top-0 z-10`
- Sortable columns with clear active sort indicators
- Live updates with subtle fade-in animations
- Compact row height: `py-3`

**Columns:**
- Time (Scheduled/Actual)
- Flight Number
- Destination/Origin
- Status
- Gate
- Terminal

**Features:**
- Color-coded status indicators
- Real-time updates
- Search/filter capability
- Responsive: Converts to cards on mobile

---

### Search & Filters Panel

**Structure:**
- Collapsible sidebar or dropdown on mobile
- Filter groups: Airlines, Status, Aircraft Type, Time Range
- Checkbox lists with search within filters
- Clear all / Apply filter actions
- Active filter chips display

**Specifications:**
- Sidebar width: `w-64` to `w-80` (256-320px) on desktop
- Mobile: Full-screen drawer or bottom sheet
- Background: Light gray (`bg-gray-50`)
- Padding: `p-4` to `p-6`

---

### Flight Details Modal/Drawer

**Structure:**
- Slide-in panel from right on desktop (`w-96` to `w-[32rem]`)
- Full screen on mobile
- Close button (X icon) top-right
- Tabs for different sections

**Sections:**
- Flight path map (mini view)
- Timeline visualization
- Aircraft details
- Route information
- Flight history
- Weather (optional)
- Delays/Alternatives (optional)

**Specifications:**
- Background: White
- Backdrop: Semi-transparent dark (`bg-black/50`)
- Animation: Slide-in with fade
- Max width: 32rem (512px) on desktop

---

### Stats Dashboard

**Structure:**
- 4-column grid of key metrics (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`)
- Each metric card contains:
  - Large number (text-3xl to text-4xl)
  - Label (text-sm)
  - Trend indicator (optional)
  - Icon

**Metrics Examples:**
- Flights Tracked
- Active Now
- Delayed Today
- Airports Monitored

**Icons:** Heroicons (paper-airplane, clock, map-pin, globe-alt)

---

### Data Visualization Components

**Timeline:**
- Horizontal progress bar with key milestones
- Shows: Scheduled departure → Gates → Takeoff → Landing → Arrival
- Current position highlighted

**Altitude Chart:**
- Line graph showing flight profile
- X-axis: Time, Y-axis: Altitude
- Shows climb, cruise, descent phases

**Speed Indicator:**
- Circular gauge or large numeric display with unit
- Shows current speed in knots or km/h

**Route Map:**
- Simplified departure-to-arrival visualization
- Shows origin airport, destination airport, flight path
- Current position marker (if in-flight)

---

### Status Badge

#### Primary Button
```css
/* Default */
background: #2563eb;
color: #ffffff;
padding: 0.5rem 1rem;
border-radius: 0.5rem;
font-weight: 600;

/* Hover */
background: #1d4ed8;

/* Active */
background: #1e40af;

/* Disabled */
background: #9ca3af;
cursor: not-allowed;
```

#### Secondary Button
```css
/* Default */
background: transparent;
color: #2563eb;
border: 1px solid #2563eb;
padding: 0.5rem 1rem;
border-radius: 0.5rem;

/* Hover */
background: #eff6ff;
```

### Status Badge

```css
/* Structure */
display: inline-flex;
align-items: center;
padding: 0.25rem 0.75rem;
border-radius: 9999px; /* Full rounded */
font-size: 0.75rem;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.05em;
```

### Header

**Specifications:**
- Background: White (#ffffff) with backdrop blur (optional)
- Border Bottom: 1px solid #e5e7eb
- Shadow: `shadow-sm` (0 1px 3px 0 rgba(0, 0, 0, 0.1))
- Padding: `py-4 px-4` to `py-6 px-6` (1rem to 1.5rem / 16-24px)
- Position: `sticky top-0` or `fixed top-0`
- Z-index: 10 or higher

**Elements:**
- Title: text-3xl, font-bold, text-gray-900
- Subtitle: text-base, font-regular, text-gray-600
- Actions: Aligned to the right (flex justify-between)
- Search bar: Center-aligned on large screens (max-w-xl)

### Loading States

```css
/* Spinner */
.spinner {
  width: 3rem;
  height: 3rem;
  border: 2px solid #e5e7eb;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Skeleton */
.skeleton {
  background: linear-gradient(
    90deg,
    #f3f4f6 25%,
    #e5e7eb 50%,
    #f3f4f6 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

### Error States

```css
/* Error Container */
background: #fef2f2;
border: 1px solid #fecaca;
color: #991b1b;
padding: 1rem 1.5rem;
border-radius: 0.5rem;

/* Error Icon */
color: #dc2626;
size: 1.5rem;
```

### Empty States

```css
/* Empty State Container */
text-align: center;
padding: 3rem 1rem;
color: #6b7280;

/* Icon */
size: 3rem;
color: #9ca3af;
margin-bottom: 1rem;
```

---

## Icons

### Icon System

Use **SVG icons** from a consistent icon set. Primary choice: **Heroicons** (outline and solid variants).

**Size Scale:**
- Small: `h-4 w-4` (1rem / 16px)
- Medium: `h-5 w-5` (1.25rem / 20px)
- Large: `h-6 w-6` (1.5rem / 24px)
- Extra Large: `h-8 w-8` (2rem / 32px)

**Common Icons:**
- **Navigation**: magnifying-glass (search), funnel (filter), globe-alt (map view)
- **Flight**: paper-airplane (flights), arrow-up (takeoff), arrow-down (landing)
- **Status**: check-circle (success), clock (scheduled/delayed), x-circle (cancelled), exclamation-triangle (warning)
- **Info**: information-circle (details), map-pin (location), calendar (dates)
- **Actions**: refresh (reload), arrow-right (direction), cog-6-tooth (settings)

### Icon Colors

```css
/* Default */
color: #6b7280; /* gray-500 */

/* Interactive */
color: #2563eb; /* blue-600 */

/* Destructive */
color: #dc2626; /* red-600 */

/* Success */
color: #16a34a; /* green-600 */

/* Warning */
color: #ea580c; /* orange-600 */
```

---

## Layout

### Container

```css
/* Desktop - 12-column grid on desktop (lg:grid-cols-12) */
max-width: 80rem; /* 1280px (max-w-7xl) */
margin: 0 auto;
padding: 0 1rem;

/* Tablet */
@media (max-width: 768px) {
  padding: 0 1rem;
}

/* Mobile */
@media (max-width: 640px) {
  padding: 0 0.75rem;
}
```

### Grid System

```css
/* Flight List Grid */
display: grid;
grid-template-columns: 1fr; /* Mobile: Single column */
gap: 1rem;

/* Tablet - 2 columns */
@media (min-width: 768px) {
  grid-template-columns: repeat(2, 1fr); /* md:grid-cols-2 */
}

/* Desktop - 3 columns for flight cards */
@media (min-width: 1024px) {
  grid-template-columns: repeat(3, 1fr); /* lg:grid-cols-3 */
}

/* Main Dashboard Layout */
@media (min-width: 1024px) {
  /* Map section: 8 columns, Sidebar: 4 columns */
  grid-template-columns: 2fr 1fr; /* lg:grid-cols-[2fr_1fr] */
}
```

**Grid Strategy:**
- Flight cards: 3-column grid on desktop (lg:grid-cols-3), 2 on tablet (md:grid-cols-2), single on mobile
- Stats dashboard: 4 columns on desktop (lg:grid-cols-4), 2 on tablet (md:grid-cols-2), 1 on mobile
- Main layout: 12-column grid on desktop (lg:grid-cols-12)
- Map + Sidebar: 8 columns for map, 4 columns for sidebar on large screens
- Airport boards: Full-width tables with sticky headers

---

## Responsive Breakpoints

```css
/* Mobile First Approach */

/* Small devices (phones) */
@media (min-width: 640px) { /* sm */ }

/* Medium devices (tablets) */
@media (min-width: 768px) { /* md */ }

/* Large devices (laptops) */
@media (min-width: 1024px) { /* lg */ }

/* Extra large devices (desktops) */
@media (min-width: 1280px) { /* xl */ }

/* 2X large devices (large desktops) */
@media (min-width: 1536px) { /* 2xl */ }
```

### Mobile Adaptations

**Flight Card on Mobile:**
- Stack time information vertically
- Reduce padding to `p-4` (1rem)
- Font sizes reduced by 1 step (e.g., text-xl → text-lg)
- Hide optional information (aircraft details, notes) or show in collapsed state
- Full-width cards (w-full)
- Simplified layout with essential info only

**Header on Mobile:**
- Stack title and actions vertically or reduce spacing
- Reduce title font size to text-2xl
- Full-width or simplified refresh button
- Hamburger menu for navigation (if applicable)
- Search bar: Full-width when active

**Navigation on Mobile:**
- Bottom tab bar or hamburger menu
- Sticky navigation
- Icon-only with labels on active state

**Tables on Mobile:**
- Convert to card-based layout
- Show essential columns only
- Expandable rows for additional details

**Map on Mobile:**
- Full-width: w-full
- Reduced height: min-h-[400px]
- Touch-friendly controls
- Simplified controls and overlays

---

## Animation & Transitions

**Key Principle:** Minimal & Purposeful. NO decorative animations, scroll effects, or unnecessary motion.

### Timing Functions

```css
/* Standard Easing */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Common Transitions

```css
/* Hover Effects */
transition: all 0.2s ease-in-out;

/* Color Changes */
transition: background-color 0.15s ease;

/* Transform */
transition: transform 0.2s ease-out;

/* Shadow */
transition: box-shadow 0.2s ease;

/* Live Data Updates */
transition: opacity 0.3s ease; /* Subtle fade (transition-opacity duration-300) */
```

### Animations

```css
/* Fade In - For live updates */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Spin (Loading) */
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Shimmer (Skeleton) */
@keyframes shimmer {
  to { background-position: -200% 0; }
}
```

**Usage Guidelines:**
- Keep animations under 300ms for interactions
- Use 600ms-1000ms for page transitions
- **Flight marker movement**: Smooth position transitions with ease-in-out
- **Modal/drawer entry**: Slide with backdrop fade
- **Live data updates**: Subtle fade effect only
- Respect `prefers-reduced-motion` media query
- Avoid animations on critical path

---

## Accessibility

**Key Principle:** Design should be inclusive and work for all users.

### Color Contrast

All text must meet WCAG AA standards:
- Normal text (< 18px): 4.5:1 contrast ratio minimum
- Large text (≥ 18px): 3:1 contrast ratio minimum
- Interactive elements: 3:1 contrast ratio minimum
- Status indicators: Must have sufficient contrast against their backgrounds

### Focus Indicators

```css
/* Keyboard Focus */
*:focus {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

/* Focus Visible (for keyboard only) */
*:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

*:focus:not(:focus-visible) {
  outline: none;
}
```

### Screen Reader Support

- Use semantic HTML elements (nav, main, header, footer, article, section)
- Include ARIA labels for interactive elements and icons
  - `aria-label="Refresh flights"` for icon-only buttons
  - `aria-live="polite"` for real-time updates
  - `aria-expanded` for collapsible sections
- Provide alt text for images and airline logos
- Use `aria-live` regions for dynamic updates (flight status changes)
- Maintain logical heading hierarchy (h1 → h2 → h3, no skipping levels)
- Label form inputs with `<label>` or `aria-label`
- Provide status announcements for screen readers

### Keyboard Navigation

- All interactive elements must be keyboard accessible (tab, enter, space, arrow keys)
- Logical tab order (top to bottom, left to right)
- **Escape key** closes modals/dropdowns
- **Arrow keys** for list navigation and table sorting
- **Enter/Space** activates buttons and links
- **Tab** moves focus forward, **Shift+Tab** moves backward
- Focus trap in modals (focus stays within modal until closed)
- Skip to main content link for keyboard users

### ARIA Labels for Map Elements

When implementing interactive map:
- `aria-label` for flight markers
- `aria-label` for zoom controls
- `role="application"` for map container with keyboard instructions
- Announce flight position updates via `aria-live`

---

## Dark Mode (Future Enhancement)

### Color System for Dark Mode

```css
@media (prefers-color-scheme: dark) {
  --bg-primary: #1f2937;
  --bg-secondary: #111827;
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
  
  /* Adjust status colors for dark background */
  --scheduled-bg: #1e40af;
  --scheduled-text: #dbeafe;
  /* ... etc */
}
```

---

## Design Checklist

When implementing new features, ensure:

- [ ] Colors follow the established palette
- [ ] Typography uses the defined scale
- [ ] Spacing follows the 4px grid system
- [ ] Components match existing patterns
- [ ] Interactive states are defined (hover, active, focus)
- [ ] Loading and error states are designed
- [ ] Layout is responsive across breakpoints
- [ ] Contrast ratios meet WCAG AA standards
- [ ] Keyboard navigation works properly
- [ ] Screen readers can access all content
- [ ] Animations respect reduced-motion preferences
- [ ] Design is tested on mobile devices

---

## Resources

### Tools
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Components](https://www.radix-ui.com)
- [Heroicons](https://heroicons.com)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker)

### Inspiration
- [Flightradar24](https://www.flightradar24.com)
- [FlightAware](https://www.flightaware.com)
- Airport departure/arrival boards
- Modern SaaS dashboards

---

## Version History

- **v1.0.0** (2025-11-24) - Initial design system documentation
