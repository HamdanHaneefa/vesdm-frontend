# VESDM Website

Educational platform for skill development, diplomas, certifications, and industry-aligned courses.

## Features

- **Public Website**: Home, About, Programs, Admissions, Franchise, Gallery, Contact
- **Student Portal**: Profile, Certificates, Marks, Resources
- **Franchise Portal**: Student Registration, Exam Management, Results Upload
- **Certificate Verification**: Public verification system

## Tech Stack

- React 19 with Vite
- TailwindCSS 4.x
- Framer Motion & GSAP for animations
- React Router for navigation
- Axios for API calls

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── pages/          # Page components
│   ├── public/     # Public-facing pages
│   ├── auth/       # Authentication pages
│   └── portal/     # Student & Franchise portals
├── components/     # Reusable UI components
├── data/           # Static data & content
├── api/            # API client configuration
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
└── assets/         # Images, fonts, etc.
```

## Development

The project follows a modular architecture with role-based page organization, inspired by modern SaaS dashboards while tailored for educational needs.
