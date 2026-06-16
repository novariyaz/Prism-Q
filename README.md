# 🔮 PRISM Q | Multi-Agent Content Intelligence Platform

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Stream-8a4bf3?style=for-the-badge&logo=google-chrome&logoColor=white)](https://novariyaz.github.io/Prism-Q/)
[![Tech Stack](https://img.shields.io/badge/Stack-ES6%20%7C%20CSS3%20%7C%20WebGL-blue?style=for-the-badge&logo=javascript&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](https://opensource.org/licenses/MIT)

**PRISM Q** is a premium, obsidian-glassmorphic content intelligence platform that audits and refines text drafts using a parallel, orchestrated multi-agent AI architecture powered by the Google Gemini API. It is designed to replace generic, single-prompt AI audits with specialized cognitive evaluations.

---

## 🏗️ Orchestration & Architecture

PRISM Q distributes raw draft content across four specialized analysis agents that run concurrently in the browser, aggregating their telemetry into a unified, high-fidelity content scorecard.

## ✨ Key Features

### 🌌 Elite Obsidian Design System
- **Transparent Glassmorphism:** Deep translucent slate cards built with subtle white margins (`rgba(255, 255, 255, 0.05)`) and micro-level background blurs.
- **WebGL Fluid Shader Orb:** Responsive landing orb using `ogl.umd.js` which distorts dynamically in WebGL coordinate spaces upon cursor movement.
- **Dynamic Prism Reflections:** Micro-animations that reveal animated violet, blue, and white light travelling around card edges on mouse hover.
- **State Glow Indicators:** Instantly monitors execution states via soft card border glows (Vibrant pulse for running, cyan/emerald for success, red for failures).

### ⚙️ Parallel AI Pipeline
- **Concurrent Dispatch:** Drafts are delivered in parallel via asynchronous fetch operations using the Google Gemini model endpoints, bypassing sequential queue blocks.
- **Multi-Dimensional Metrics:**
  - **Readability Agent:** Sentence length analysis, structural flow, and accessibility ratings.
  - **Specificity Agent:** Counts data citations, counts examples, and checks detail density.
  - **Argument Quality Agent:** Flags unsupported assertions, checks logic coherence, and flags weak claims.
  - **Content Value Agent:** Scans for standard AI boilerplate, overused buzzwords, and repetitive ideas.
- **Report Synthesizer:** Aggregates findings and outputs a comprehensive executive scorecard containing strengths, weaknesses, and a final Actionability score.
- **Refinement Engine:** Rewrites content using agent recommendations to remove slop and strengthen arguments.

### 📊 Real-Time Operations Telemetry
- **Interactive Agent Status:** Tracks detailed execution states, showing pulsing nodes and live completion checkmarks.
- **Timer Diagnostics:** Displays the real-time execution duration of each agent (down to milliseconds) to profile model speeds.
- **Audit History Logs:** Stores previous scorecards in local storage for side-by-side performance comparisons.
- **Smart Counter Alert:** Enhances basic word counters with threshold coloring (Red: below length limits, Yellow: acceptable, Green: recommended density).

---

## 🛠️ Technology Stack

| Component | Technology | Description |
|---|---|---|
| **Core Architecture** | HTML5, JavaScript (Vanilla ES6) | Client-side engine orchestrating API configurations and state. |
| **Styling** | Vanilla CSS3 | Modular custom stylesheets with CSS keyframes, variables, and flex grids. |
| **Graphics** | WebGL, OGL Library (`ogl.umd.js`) | Fast screen-space rendering of responsive fragment shaders. |
| **LLM Engine** | Google Gemini API (2.5 Flash / Pro) | Generates parallel assessments and synthesized rewrite revisions. |
| **Icons** | Lucide Icons | Premium vector-based system iconography. |
| **Data Viz** | CSS-based Charts / SVG | Multi-dimensional radar charts mapping agent outputs. |

---

## 🚀 Getting Started

### Prerequisites
To run Prism Q, you do not need any compilation tools or server databases. All calculations are executed completely inside the browser. However, a local web server is required to bypass CORS policies for WebGL shader dependencies.

### Local Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/novariyaz/Prism-Q.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Prism-Q
   ```
3. Boot up a local static server:
   - **Using Python:**
     ```bash
     python -m http.server 8000
     ```
   - **Using Node.js (`http-server`):**
     ```bash
     npx http-server -p 8000
     ```
   - **Using VS Code:** Right-click `index.html` and click **Open with Live Server**.

4. Open the app in your browser:
   ```url
   http://localhost:8000
   ```

### Running Your First Audit
1. Open the app and click **Enter Prism Q**.
2. Click the **Gear Icon** (`Settings`) in the top right header navigation.
3. Paste a valid **Gemini API Key** and choose your model (`Gemini 2.5 Flash` or `Gemini 2.5 Pro`). Click **Save Settings**.
4. Click **Try Demo Content** to populate the auditor with a typical low-quality AI-slop draft.
5. Click **Audit Text** to launch the parallel agents and watch the telemetry console evaluate the draft.

---
*Developed with 💜 by [novariyaz](https://github.com/novariyaz).*
