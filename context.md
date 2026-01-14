# Torus Studio Project Ecosystem Context

## 1. Studio Identity: Torus Studio
- **Location:** Japan 🇯🇵
- **Philosophy:** "Japanese Zen Minimalism." Focus on creating sleek, distraction-free, and high-utility digital tools that unify the mind and productivity.
- **Branding Keywords:** Zen, Mindful, Privacy-first, Zero-friction, Studio-quality.
- **Primary Domain:** `torus-studio.tech`
- **Development Policy:** AI-Native development (Co-creation with Google Gemini). Lightweight Vanilla HTML/CSS/JS (No heavy frameworks).

---

## 2. Project Alpha: ZenDvorak (Live)
**Status:** Approved on Orynth.dev | **URL:** https://zen.torus-studio.tech

### Core Concept:
A meditative typing trainer specifically for the US Dvorak layout. It transforms typing practice into a form of "Zen meditation."

### Key Features:
- **Zen UI:** Wordle-inspired minimalist interface.
- **Local Processing:** No data leaves the browser.
- **Custom Content:** Allows users to upload `.txt` files for personalized "training."
- **Export Utility:** High-quality Dvorak layout map (PDF) download.
- **Metrics:** WPM and Time tracking with instant feedback.

### Metadata for Orynth/SEO:
- **Title:** ZenDvorak — Master with Zen Minimalism
- **Tagline:** Unify your spirit. A meditative path to Dvorak mastery.
- **Description:** A sophisticated Dvorak typing trainer rooted in the spirit of Japanese Zen. Designed to eliminate distraction and noise, this tool provides a "Zen garden" for your fingers to find their flow. Crafted for developers who value speed, focus, and ergonomics.

---

## 3. Project Beta: ZenID (In Development)
**Status:** Pre-launch | **Planned URL:** https://id.torus-studio.tech

### Core Concept:
A privacy-first ID photo generator for administrative requirements in Japan. Born from a real-world need (TOEIC exam preparation).

### Origin Story:
The creator developed this tool to solve the hassle and privacy concerns of preparing an ID photo for the TOEIC exam in Japan.

### Key Features:
- **Administrative Precision:** Covers all standard Japanese sizes (Residence Card, Visa, My Number Card, Resume, TOEIC).
- **Privacy-First (Crucial):** 100% Client-side processing (Front-end). Photos are never uploaded to any server.
- **Multilingual Support:** English, Japanese, and Chinese (Traditional/Simplified).
- **Zero-Friction:** No login, no registration, no tracking.

### Metadata for Orynth/SEO:
- **Title:** ZenID — Studio-Quality ID Photos
- **Tagline:** Perfect ID photos for Japan. Privacy-first & local.
- **Description:** Born from real necessity. ZenID covers all official Japanese requirements including Visas and My Number cards. All image processing occurs locally within your browser—your face never leaves your device. Studio-quality results in seconds.

---

## 4. Technical Constraints & Requirements (Common)
- **Language:** English (Primary for global audience), Japanese (Secondary/Fallback).
- **Architecture:** 
  - Vanilla HTML5, CSS3, ES6 JavaScript.
  - Deployment on ConoHa WING (Static hosting via subdomains).
  - Public GitHub repository: `torusk/Dvorak-Typing` (ZenDvorak).
- **Security:** Must support HTTPS/SSL (Standard on torus-studio.tech).
- **Refactoring Goal:**
  - Maintain the robust logic (Canvas-based pixel measurement, local storage usage).
  - Modernize and clean up variable naming and structure.
  - Enhance OGP (Open Graph Protocol) and SEO tags for Web3/Orynth compatibility.
- **AI Respect:** Include a "Built with AI" acknowledgement in the README to honor the human-AI co-creation process.