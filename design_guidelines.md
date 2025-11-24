# Flight Tracking Application - Design Guidelines

## Design Approach
**System-Based Approach** using modern dashboard patterns with aviation industry conventions. Drawing from Flightradar24, FlightAware, and professional aviation displays for information density and clarity. Focus on data hierarchy, scanability, and real-time updates.

## Core Design Elements

### Typography Hierarchy
**Primary Font:** Inter or similar geometric sans-serif for readability
- Hero/Feature Numbers: text-4xl to text-6xl, font-bold (flight numbers, times)
- Section Headers: text-2xl to text-3xl, font-semibold
- Data Labels: text-sm, font-medium, uppercase tracking-wide
- Body/Stats: text-base, font-normal
- Metadata: text-xs to text-sm, font-normal

### Layout System
**Spacing Primitives:** Tailwind units of 2, 4, 6, and 8
- Component padding: p-4 to p-6
- Section spacing: space-y-6 to space-y-8
- Card gaps: gap-4 to gap-6
- Container max-width: max-w-7xl

**Grid Strategy:**
- Main layout: 12-column grid on desktop (lg:grid-cols-12)
- Map section: 8 columns, sidebar: 4 columns on large screens
- Flight cards: 3-column grid on desktop (lg:grid-cols-3), 2 on tablet (md:grid-cols-2), single on mobile
- Airport boards: Full-width tables with sticky headers

### Component Library

**Navigation Header**
- Fixed top position with backdrop blur
- Logo left, search bar center (max-w-xl), user actions right
- Height: h-16
- Search with autocomplete for flight numbers, routes, airports

**Interactive Map Section**
- Full-width container, min-height: min-h-[600px]
- Leaflet.js for map rendering with aviation tile layers
- Custom flight markers with aircraft icons
- Flight path polylines with directional indicators
- Zoom controls, layer toggles (airlines, airports, airspace)
- Real-time position updates with smooth transitions

**Flight Information Cards**
- Compact card design: rounded-lg with border
- Header: Flight number (large, bold) + airline logo + status badge
- Timeline visualization: Departure → Current Position → Arrival
- Grid layout for details: 2 columns on mobile, 3-4 on desktop
- Key data points: Altitude, Speed, Aircraft type, Route, Gates
- Status indicators: On-time (success), Delayed (warning), Cancelled (error)

**Airport Departure/Arrival Boards**
- Table layout with alternating row treatments
- Columns: Time, Flight, Destination/Origin, Status, Gate, Terminal
- Sticky header: position-sticky top-0
- Sortable columns with clear active sort indicators
- Live updates with subtle fade-in animations
- Compact row height: py-3

**Search & Filters Panel**
- Collapsible sidebar or dropdown on mobile
- Filter groups: Airlines, Status, Aircraft Type, Time Range
- Checkbox lists with search within filters
- Clear all / Apply filter actions
- Active filter chips display

**Flight Details Modal/Drawer**
- Slide-in panel from right on desktop (w-96 to w-[32rem])
- Full screen on mobile
- Sections: Flight path map (mini), Timeline, Aircraft details, Route info, History
- Tabs for additional data: Weather, Delays, Alternatives

**Stats Dashboard (Optional Hero Alternative)**
- 4-column grid of key metrics (grid-cols-4)
- Metrics: Flights Tracked, Active Now, Delayed Today, Airports Monitored
- Large numbers with trend indicators
- Icons from Heroicons (plane, clock, map-pin)

**Data Visualization Components**
- Timeline: Horizontal progress bar with key milestones
- Altitude chart: Line graph showing flight profile
- Speed indicator: Circular gauge or numeric with unit
- Route map: Simplified departure-to-arrival visualization

### Accessibility
- ARIA labels for all interactive map elements
- Keyboard navigation for flight cards and tables
- Screen reader announcements for real-time updates
- Focus indicators on all interactive elements
- Sufficient contrast for status indicators

### Animations
**Minimal & Purposeful:**
- Live data updates: Subtle fade (transition-opacity duration-300)
- Flight marker movement: Smooth position transitions (ease-in-out)
- Modal/drawer entry: Slide with backdrop fade
- NO decorative animations, scroll effects, or unnecessary motion

### Images
**Hero Section Alternative:**
Instead of traditional hero, lead with:
- Full-width live map showing tracked flights immediately
- Floating search bar overlay (centered, with backdrop blur)
- Quick stats ribbon above or below map

**Supporting Imagery:**
- Airline logos: Small icons (h-6 to h-8) next to flight numbers
- Aircraft type illustrations: In flight detail cards
- Airport terminal photos: Optional in airport detail views
All images via external sources or icon libraries - no custom generation.

### Responsive Breakpoints
- Mobile (base): Single column, stacked layout, full-width map
- Tablet (md: 768px): 2-column grids, side-by-side comparisons
- Desktop (lg: 1024px): Multi-column dashboards, sidebar + map layout
- Wide (xl: 1280px): Maximum data density, 3-4 column grids

### Icon Library
**Heroicons** (outline and solid variants)
- Navigation: magnifying-glass, funnel, globe-alt
- Flight: paper-airplane, arrow-up, arrow-down
- Status: check-circle, clock, x-circle, exclamation-triangle
- Info: information-circle, map-pin, calendar

**Key Principle:** Information clarity over visual flair. Every element serves the core function of tracking and understanding flight status.