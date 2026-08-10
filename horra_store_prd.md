# HORRA STORE — PRODUCT REQUIREMENTS DOCUMENT (PRD)

**Owner:** HORRA ESPORTS  
**Location:** Kathmandu, Nepal  
**Document Version:** 1.1 (Updated)  
**Primary Visual Theme:** Esports Dark / Electric Purple (`#7B2CBF`)  
**Payment Gateways:** eSewa, Khalti, ConnectIPS, Cash on Delivery (COD)  

---

## 1. Executive Summary & Vision

**Horra Store** is the official retail and e-commerce flagship arm of **HORRA ESPORTS**, based in Kathmandu, Nepal. The primary objective of this project is to construct a modern, high-performance, mobile-first e-commerce web platform catering to Nepalese gamers, creators, and esports enthusiasts.

The platform bridges high-end gaming hardware (Custom PC Builds, GPUs, CPUs) and essential accessories (cables, splitters, mechanical keyboards, audiophile-grade headsets) while offering local payment integration (eSewa, Khalti, ConnectIPS), instant local delivery estimates across Kathmandu Valley, and an interactive Custom PC Builder tool.

---

## 2. Brand Identity & Design System

The visual identity draws directly from the official Horra Store logo—featuring the geometric "HS" monogram in clean white against a vibrant purple backdrop, set over a high-contrast dark theme suitable for esports branding.

### Color Palette
* **Electric Purple (Primary Accent):** `#7B2CBF`
* **Neon Purple (Hover / Active Highlights):** `#9D4EDD`
* **Obsidian Black (Page Background):** `#0D0A1A`
* **Dark Surface (Cards & Modals):** `#161129`
* **Text / Typography:** Pure White (`#FFFFFF`) for headers, Light Lavender (`#E2DFF0`) for body text.

### Typography & UI Styling
* **Headings:** `Rajdhani` or `Orbitron` (Futuristic / Gaming aesthetic).
* **Body Font:** `Inter` or `Roboto` (Crisp readability).
* **UI Style:** Subtle neon-glow borders, glassmorphic card overlays, high contrast, clean white iconography.

---

## 3. Target Audience & Core Personas

| Persona | Profile & Needs | Key Product Requirement |
| :--- | :--- | :--- |
| **Esports Athlete / Competitive Gamer** | Demands ultra-low latency gear, high-refresh-rate monitors, custom audio splitters, and cables. | Detailed specification filtering (sensor DPI, polling rate, switch type, cable shielding). |
| **Custom PC Enthusiast** | Wants to build custom PCs in Kathmandu with compatibility checks and component-level warranty details. | Interactive **Rig Builder** with real-time wattage checks, NPR pricing, and component compatibility validation. |
| **Casual Buyer / Student** | Looks for budget-friendly accessories, audio adapters, cables, splitters, and quick local delivery. | Mobile-friendly UI, seamless eSewa/Khalti digital wallet payments, Cash on Delivery (COD). |

---

## 4. Core Technical Architecture & Phased Development Approach

Given the scale of building a full e-commerce ecosystem with a custom PC builder, a **gradual, phased approach** will be taken to ensure stability, quality, and thorough testing at each layer.

### Step 1: Frontend First (Design System & Static Interfaces)
* **Tech Stack:** Next.js 14+ (App Router, Tailwind CSS, TypeScript).
* **Focus:** Build UI components, responsive layout, product catalog view, product detail pages (PDPs), cart drawers, and mock Custom PC Builder UI before hooking into real APIs.

### Step 2: Backend Architecture & Database Design
* **Tech Stack:** Node.js / Express or Headless Commerce (Payload CMS / Strapi) with PostgreSQL (via Prisma ORM).
* **Focus:** Schema design for complex nested products (e.g., PC hardware specs, socket compatibility matrices, cable connector variants), authentication, and REST/GraphQL endpoint development.

### Step 3: Integrations & Specialized Services
* **Focus:** Connecting local Nepali payment gateways (eSewa, Khalti, ConnectIPS), SMS gateways for OTP verification, and automated shipping calculators for Kathmandu Valley.

---

## 5. Strategic Importance of Automation in Gaming E-Commerce

For a high-volume, tech-savvy audience in esports and gaming, **automation is critical to operating smoothly, reducing human error, and maintaining brand trust.**

### 1. Real-Time Compatibility & Wattage Calculation
* **Automated Rule Validation:** Gamers who build custom PCs shouldn't have to manually verify if an Intel LGA1700 CPU fits an AM5 motherboard or if a 650W PSU can power an RTX 4090. The system automatically enforces compatibility rules and calculates total system draw in real time.

### 2. Multi-Component Inventory Synchronization
* **Automated Stock Deduction:** Purchasing a pre-built or custom PC automatically deducts individual hardware components (1x CPU, 1x GPU, 2x RAM sticks) from stock in real-time, preventing double-selling or stock mismatches with the physical Kathmandu store.

### 3. Payment Verification & Order Status Transitions
* **Instant Payment Webhooks:** Automated callbacks from eSewa and Khalti instantly flag orders as "Paid" and notify warehouse staff without manual bank transfer verification.
* **Automated Customer Alerts:** Instant SMS/WhatsApp updates for order milestones (`Order Confirmed` → `PC Assembly in Progress` → `Out for Delivery in Kathmandu`).

### 4. Automated Testing & Continuous Deployment (CI/CD)
* **Zero-Downtime Releases:** Automated GitHub Actions test front-end layouts, checkout calculations, and API routes on every code push before deploying automatically to production.

---

## 6. Detailed Functional Requirements

### 6.1 Storefront & Core Features

| ID | Feature | Description | Priority |
| :--- | :--- | :--- | :--- |
| **FR-01** | **Interactive Custom PC Builder** | Pick CPU, Motherboard, GPU, RAM, Storage, PSU, Cooler, Case. Auto-filters non-compatible sockets/wattages. Bundles total price in NPR. | **P0 (Critical)** |
| **FR-02** | **Catalog & Advanced Filtering** | Categories: *Custom PCs, Laptops, Keyboards, Audio/Headphones, Cables & Adapters/Splitters, Streaming Gear, Merch*. Filter by Brand, Price, Cable Length, Switch Type. | **P0 (Critical)** |
| **FR-03** | **Local Payment Engine** | Seamless integration with eSewa payment gateway, Khalti SDK, ConnectIPS, and Cash on Delivery with SMS OTP verification. | **P0 (Critical)** |
| **FR-04** | **Kathmandu Shipping Calculator** | Differentiates shipping rates/timelines for Inside Ring Road, Outside Ring Road (Kathmandu/Lalitpur/Bhaktapur), and Outer Districts. | **P1 (High)** |
| **FR-05** | **Horra Esports Hub & Merch** | Dedicated page highlighting Horra Esports tournament rosters, team announcements, and official team jerseys/apparel. | **P2 (Medium)** |

### 6.2 Product Detail Page (PDP)
* **Specification Matrix:** Clear breakdown of connector types (3.5mm TRRS, USB-C to Dual Jack, HDMI 2.1, DisplayPort 1.4), cable shielding (braided vs rubber), and cable length.
* **Stock & Physical Pickup:** Real-time online stock availability + Physical Store Pickup option in Kathmandu.
* **Warranty Badges:** Explicit differentiation between Store Warranty and Official Manufacturer Warranty.

---

## 7. Admin Dashboard & Operations

* **Inventory Tracking:** Automated stock deduction across individual hardware components when a custom PC build is purchased.
* **Order Lifecycle:** `Pending` → `Verified (OTP)` → `Assembling (for PCs)` → `Dispatched` → `Delivered`.
* **Sales Analytics:** Revenue reports separating high-margin PC builds from high-volume accessories (cables, splitters, adapters).
* **Customer CRM:** History of customer orders, saved custom PC configurations, and RMA/warranty claim tickets.

---

## 8. Non-Functional Requirements (NFRs)

* **Performance:** Page load time under 1.8 seconds on 4G networks in Kathmandu. Google Lighthouse Performance Score > 90.
* **Mobile Responsiveness:** 100% optimized for mobile viewports (over 75% of e-commerce traffic in Nepal originates from mobile devices).
* **Security:** SSL/TLS encryption, secure API endpoints, protection against SQL injection/XSS, secure webhooks for eSewa/Khalti payment verification.
* **SEO & Metadata:** Schema.org markup for products, rich snippets for NPR prices, optimized search keywords (*"gaming PC Kathmandu"*, *"buy audio splitter Nepal"*, *"Horra Esports store"*).
