# 🔮 PRISM Q | Multi-Agent Content Intelligence Platform

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Stream-8a4bf3?style=for-the-badge&logo=google-chrome&logoColor=white)](https://novariyaz.github.io/Prism-Q/)
[![Tech Stack](https://img.shields.io/badge/Stack-ES6%20%7C%20CSS3%20%7C%20WebGL-blue?style=for-the-badge&logo=javascript&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](https://opensource.org/licenses/MIT)

**PRISM Q** is a premium, obsidian-glassmorphic content intelligence platform that audits and refines text drafts using a parallel, orchestrated multi-agent AI architecture powered by the Google Gemini API. It is designed to replace generic, single-prompt AI audits with specialized cognitive evaluations.

---

## 🏗️ Orchestration & Architecture

PRISM Q distributes raw draft content across four specialized analysis agents that run concurrently in the browser, aggregating their telemetry into a unified, high-fidelity content scorecard.

<p align="center">
  <svg width="100%" height="240" viewBox="0 0 800 240" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width: 800px; display: block; margin: 0 auto;">
    <!-- Container background -->
    <rect width="100%" height="100%" rx="12" fill="#030307" stroke="#161622" stroke-width="1.5" />
    
    <style>
      .glow-node {
        filter: drop-shadow(0px 0px 4px var(--glow-color));
      }
      .flow-line {
        stroke-dasharray: 6 6;
        animation: flow 4s linear infinite;
      }
      @keyframes flow {
        to {
          stroke-dashoffset: -40;
        }
      }
      .agent-card {
        rx: 8px;
        fill: #09090f;
        stroke: #1e1e2f;
        stroke-width: 1.2;
        transition: all 0.3s ease;
      }
      .agent-card:hover {
        fill: #10101c;
        stroke: var(--glow-color);
        filter: drop-shadow(0px 0px 6px var(--glow-color));
      }
      .text-title {
        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-weight: 700;
        fill: #ffffff;
        font-size: 13px;
      }
      .text-subtitle {
        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-weight: 500;
        fill: #7c7c94;
        font-size: 9.5px;
      }
      .text-badge {
        font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-weight: 600;
        font-size: 9px;
      }
    </style>

    <defs>
      <!-- Left to Right Flow Gradients -->
      <linearGradient id="grad-line-1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#3b82f6" />
        <stop offset="100%" stop-color="#8a4bf3" />
      </linearGradient>
      <linearGradient id="grad-line-2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#3b82f6" />
        <stop offset="100%" stop-color="#06b6d4" />
      </linearGradient>
      <linearGradient id="grad-line-3" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#3b82f6" />
        <stop offset="100%" stop-color="#ec4899" />
      </linearGradient>
      <linearGradient id="grad-line-4" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#3b82f6" />
        <stop offset="100%" stop-color="#10b981" />
      </linearGradient>

      <!-- Agent to Synthesizer Gradients -->
      <linearGradient id="grad-line-5" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#8a4bf3" />
        <stop offset="100%" stop-color="#f59e0b" />
      </linearGradient>
      <linearGradient id="grad-line-6" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#06b6d4" />
        <stop offset="100%" stop-color="#f59e0b" />
      </linearGradient>
      <linearGradient id="grad-line-7" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ec4899" />
        <stop offset="100%" stop-color="#f59e0b" />
      </linearGradient>
      <linearGradient id="grad-line-8" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#10b981" />
        <stop offset="100%" stop-color="#f59e0b" />
      </linearGradient>
    </defs>

    <!-- Paths from Input to Agents -->
    <path d="M 150 120 C 210 120, 230 32.5, 290 32.5" stroke="url(#grad-line-1)" stroke-width="1.2" fill="none" class="flow-line" />
    <path d="M 150 120 C 210 120, 230 87.5, 290 87.5" stroke="url(#grad-line-2)" stroke-width="1.2" fill="none" class="flow-line" />
    <path d="M 150 120 C 210 120, 230 142.5, 290 142.5" stroke="url(#grad-line-3)" stroke-width="1.2" fill="none" class="flow-line" />
    <path d="M 150 120 C 210 120, 230 197.5, 290 197.5" stroke="url(#grad-line-4)" stroke-width="1.2" fill="none" class="flow-line" />

    <!-- Paths from Agents to Synthesizer -->
    <path d="M 510 32.5 C 570 32.5, 590 120, 650 120" stroke="url(#grad-line-5)" stroke-width="1.2" fill="none" class="flow-line" />
    <path d="M 510 87.5 C 570 87.5, 590 120, 650 120" stroke="url(#grad-line-6)" stroke-width="1.2" fill="none" class="flow-line" />
    <path d="M 510 142.5 C 570 142.5, 590 120, 650 120" stroke="url(#grad-line-7)" stroke-width="1.2" fill="none" class="flow-line" />
    <path d="M 510 197.5 C 570 197.5, 590 120, 650 120" stroke="url(#grad-line-8)" stroke-width="1.2" fill="none" class="flow-line" />

    <!-- Input Node -->
    <g class="glow-node" style="--glow-color: #3b82f6;">
      <rect class="agent-card" x="20" y="90" width="130" height="60" style="stroke: #3b82f6; stroke-opacity: 0.4;" />
      <text x="85" y="118" text-anchor="middle" class="text-title">Draft Input</text>
      <text x="85" y="135" text-anchor="middle" class="text-subtitle">Raw Draft Text</text>
    </g>

    <!-- Synthesizer Node -->
    <g class="glow-node" style="--glow-color: #f59e0b;">
      <rect class="agent-card" x="650" y="90" width="130" height="60" style="stroke: #f59e0b; stroke-opacity: 0.4;" />
      <text x="715" y="118" text-anchor="middle" class="text-title">Synthesizer</text>
      <text x="715" y="135" text-anchor="middle" class="text-subtitle">Scorecard Report</text>
    </g>

    <!-- Agent Cards -->
    <!-- Agent 1: Readability -->
    <g style="--glow-color: #8a4bf3;">
      <rect class="agent-card" x="290" y="10" width="220" height="45" />
      <text x="305" y="27" class="text-title">Readability Agent</text>
      <text x="305" y="39" class="text-subtitle">Sentence structures, syntax flow & clarity</text>
      <rect x="455" y="15" width="45" height="15" rx="3.5" fill="#8a4bf3" fill-opacity="0.1" stroke="#8a4bf3" stroke-opacity="0.3"/>
      <text x="477.5" y="25" text-anchor="middle" fill="#a78bfa" class="text-badge" style="font-size: 8px;">20% WT</text>
    </g>

    <!-- Agent 2: Specificity -->
    <g style="--glow-color: #06b6d4;">
      <rect class="agent-card" x="290" y="65" width="220" height="45" />
      <text x="305" y="82" class="text-title">Specificity Agent</text>
      <text x="305" y="94" class="text-subtitle">Concrete facts, examples & evidence</text>
      <rect x="455" y="70" width="45" height="15" rx="3.5" fill="#06b6d4" fill-opacity="0.1" stroke="#06b6d4" stroke-opacity="0.3"/>
      <text x="477.5" y="80" text-anchor="middle" fill="#22d3ee" class="text-badge" style="font-size: 8px;">25% WT</text>
    </g>

    <!-- Agent 3: Argument Quality -->
    <g style="--glow-color: #ec4899;">
      <rect class="agent-card" x="290" y="120" width="220" height="45" />
      <text x="305" y="137" class="text-title">Argument Quality Agent</text>
      <text x="305" y="149" class="text-subtitle">Logical claims & structural validity</text>
      <rect x="455" y="125" width="45" height="15" rx="3.5" fill="#ec4899" fill-opacity="0.1" stroke="#ec4899" stroke-opacity="0.3"/>
      <text x="477.5" y="135" text-anchor="middle" fill="#f472b6" class="text-badge" style="font-size: 8px;">30% WT</text>
    </g>

    <!-- Agent 4: Content Value -->
    <g style="--glow-color: #10b981;">
      <rect class="agent-card" x="290" y="175" width="220" height="45" />
      <text x="305" y="192" class="text-title">Content Value Agent</text>
      <text x="305" y="204" class="text-subtitle">Repetitions, buzzwords & low-value slop</text>
      <rect x="455" y="180" width="45" height="15" rx="3.5" fill="#10b981" fill-opacity="0.1" stroke="#10b981" stroke-opacity="0.3"/>
      <text x="477.5" y="190" text-anchor="middle" fill="#34d399" class="text-badge" style="font-size: 8px;">25% WT</text>
    </g>
  </svg>
</p>

---

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

## 📝 Resume Integration Copy-Paste

Add this high-impact entry to your resume under your Projects section:

```markdown
**PRISM Q | Multi-Agent Content Intelligence Platform**
*Stack: Vanilla JS (ES6), HTML5, CSS3, WebGL (OGL), Google Gemini LLM API, Git*
- Engineered a serverless web app that audits and refines draft text using parallel API orchestration.
- Built a multi-agent pipeline executing 4 specialized agents (Readability, Specificity, Logic, Slop Value) concurrently, reducing audit bottlenecks.
- Designed a premium obsidian glassmorphic dashboard inspired by Apple Vision Pro/Linear, featuring dynamic WebGL shader orbits and stateful CSS glows.
- Integrated telemetry tracing to monitor agent completion status, milliseconds-accurate execution timers, and responsive radar charts.
```

---
*Developed with 💜 by [novariyaz](https://github.com/novariyaz).*
