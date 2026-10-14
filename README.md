# IHMAAA - Institute of Hotel Management Ahmedabad Alumni Association

Modern production-ready web portal for the **Institute of Hotel Management Ahmedabad Alumni Association (IHMAAA)**, migrated from legacy Joomla 3.9 to Next.js 14 App Router with TypeScript and Tailwind CSS.

---

## 🌟 Key Features

- **Next.js 14 App Router & TypeScript**: Fully typed schemas with static generation for blazingly fast load times.
- **Responsive Theme**: Clean corporate header, sticky main navigation with accessible dropdowns, mobile drawer, and refined typography.
- **Photo Albums & Lightbox**: Interactive albums with fullscreen lightbox modals and deep-linking support (`?album=slug`).
- **Alumni Leadership & Sponsors**: Office bearers showcase, sponsor sliders, and bank welfare contribution details.
- **Career & Opportunities**: Full alumni CVs directory and hospitality vacancy listings.
- **Historical URL Preservation**: 100% route integrity with permanent redirects (307/301) for legacy SEF URLs and document downloads.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18.17.0 or higher
- `npm` or `yarn`

### Installation

```bash
# Clone the repository
git clone https://github.com/Antriksh27/ihmaaa.git
cd ihmaaa

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Build & Production

```bash
# Type check and build production bundle
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
ihmaaa-nextjs/
├── public/                 # Authentic media, downloads, images, sliders, documents
├── src/
│   ├── app/                # Next.js App Router pages and dynamic routes
│   │   ├── curriculum-vitae/
│   │   ├── ihmaaa/
│   │   ├── news-events/
│   │   ├── social-views/
│   │   └── vacancies/
│   ├── components/         # Reusable UI components
│   │   ├── articles/
│   │   ├── forms/
│   │   ├── gallery/
│   │   ├── home/
│   │   └── layout/
│   ├── content/            # Verified structured data (articles, albums, sponsors, bearers)
│   ├── lib/                # Utilities and content validation
│   ├── styles/             # Global CSS and component design systems
│   └── types/              # TypeScript definitions
├── scripts/                # Verification, crawler and audit tools
└── package.json
```
