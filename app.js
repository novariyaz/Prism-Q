/**
 * PRISM Q - Multi-Agent Content Intelligence Platform
 * Front-end Logic & Orchestration Engine (app.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- UI Elements ---
  const elSplash = document.getElementById('splash-screen');
  const elLandingPage = document.getElementById('landing-page');
  const elDashboardPage = document.getElementById('dashboard-page');
  const elSettingsDrawer = document.getElementById('settings-drawer');
  const elBtnSettingsToggle = document.getElementById('btn-settings-toggle');
  const elBtnSettingsClose = document.getElementById('btn-settings-close');
  
  const elBtnGetStarted = document.getElementById('btn-get-started');
  const elBtnLaunchApp = document.getElementById('btn-launch-app');
  const elToggleDemoContent = document.getElementById('toggle-demo-content');
  const elEditorGutter = document.getElementById('editor-gutter');

  // --- Media Attachment UI Elements ---
  const elBtnAttachmentTrigger = document.getElementById('btn-attachment-trigger');
  const elAttachmentModal = document.getElementById('attachment-modal');
  const elBtnModalClose = document.getElementById('btn-modal-close');
  const elOptionUploadImage = document.getElementById('option-upload-image');
  const elFileInputImage = document.getElementById('file-input-image');
  const elOptionUploadDoc = document.getElementById('option-upload-doc');
  const elFileInputDoc = document.getElementById('file-input-doc');
  const elOptionInputUrl = document.getElementById('option-input-url');
  const elUrlInputContainer = document.getElementById('url-input-container');
  const elAttachmentUrlField = document.getElementById('attachment-url-field');
  const elBtnImportUrl = document.getElementById('btn-import-url');
  const elExtractionLoaderPanel = document.getElementById('extraction-loader-panel');
  const elLoaderMessage = document.getElementById('loader-message');
  const elAttachmentStatusContainer = document.getElementById('attachment-status-container');
  const elAttachmentStatusText = document.getElementById('attachment-status-text');

  const elApiKey = document.getElementById('api-key');
  const elToggleApiKey = document.getElementById('toggle-api-key');
  const elEyeIcon = document.getElementById('eye-icon');
  const elModelSelect = document.getElementById('model-select');
  const elBtnSaveKey = document.getElementById('btn-save-key');
  
  const elContentInput = document.getElementById('content-input');
  const elCharCount = document.getElementById('char-count');
  const elWordCount = document.getElementById('word-count');
  const elReadTime = document.getElementById('read-time');
  const elBtnDemo = document.getElementById('btn-demo');
  
  const elBtnAudit = document.getElementById('btn-audit');
  const elBtnImprove = document.getElementById('btn-improve');
  
  // Navigation tabs
  const elNavDashboard = document.getElementById('nav-dashboard');
  const elNavHistory = document.getElementById('nav-history');
  const elNavReportsTab = document.getElementById('nav-reports-tab');
  const elNavInsightsTab = document.getElementById('nav-insights-tab');
  const elNavSettingsTab = document.getElementById('nav-settings-tab');
  
  // Views
  const elMainView = document.getElementById('main-view');
  const elHistoryView = document.getElementById('history-view');
  const elHistoryListMain = document.getElementById('history-list-main');
  const elBtnClearHistoryMain = document.getElementById('btn-clear-history-main');
  
  // Welcome and Loading structures
  const elWelcomePanel = document.getElementById('welcome-panel');
  const elLoadingBanner = document.getElementById('dashboard-loading-banner');
  const elConsoleTimer = document.getElementById('console-timer');
  const elConsoleProgressBar = document.getElementById('console-progress-bar');
  const elConsoleStatusText = document.getElementById('console-status-text');
  const elDashboardPanel = document.getElementById('dashboard-panel');
  const elLoadingPanel = document.getElementById('loading-panel'); // simulated
  
  // Recent Reports / Output Card
  const elRecentReportsCard = document.getElementById('recent-reports-card');
  const elReportsEmptyState = document.getElementById('reports-empty-state');
  const elReportDetailsContainer = document.getElementById('report-details-container');
  
  const elReportTitle = document.getElementById('report-title');
  const elReportTime = document.getElementById('report-time');
  const elBadgeDocType = document.getElementById('badge-doc-type');
  
  const elBtnCopyReport = document.getElementById('btn-copy-report');
  const elBtnDownloadJson = document.getElementById('btn-download-json');
  
  // Radar Labels Score Display
  const elRadarReadability = document.getElementById('radar-val-readability');
  const elRadarSpecificity = document.getElementById('radar-val-specificity');
  const elRadarArgument = document.getElementById('radar-val-argument');
  const elRadarValue = document.getElementById('radar-val-value');
  
  // Metrics values (Scores)
  const vals = {
    overall: document.getElementById('val-overall'),
    value: document.getElementById('val-value'),
    readability: document.getElementById('val-readability'),
    specificity: document.getElementById('val-specificity'),
    argument: document.getElementById('val-argument')
  };
  
  const elDetectionsContainer = document.getElementById('detections-container');
  const elReportSummary = document.getElementById('report-summary');
  const elReportStrengths = document.getElementById('report-strengths');
  const elReportWeaknesses = document.getElementById('report-weaknesses');
  const elReportSuggestions = document.getElementById('report-suggestions');
  
  const elTabImprovedBtn = document.getElementById('tab-improved-btn');
  const elImprovedContentDisplay = document.getElementById('improved-content-display');
  const elImprovedChangesList = document.getElementById('improved-changes-list');
  const elBtnCopyImproved = document.getElementById('btn-copy-improved');
  
  // Debug explorer fields
  const elDebugReadability = document.getElementById('debug-readability');
  const elDebugSpecificity = document.getElementById('debug-specificity');
  const elDebugArgument = document.getElementById('debug-argument');
  const elDebugContentValue = document.getElementById('debug-content-value');
  const elDebugAggregated = document.getElementById('debug-aggregated');
  const elDebugSynthesizer = document.getElementById('debug-synthesizer');
  
  const elToastContainer = document.getElementById('toast-container');
  
  // --- App State ---
  let appState = {
    apiKey: '',
    selectedModel: 'gemini-2.5-flash',
    history: [],
    currentAuditId: null,
    attachedFile: null,
    attachedType: null,
    attachedName: ''
  };

  // --- Constants ---
  const MAX_HISTORY = 10;

  // Low-quality demo content that contains severe slop, repetitions, buzzwords, and generic assertions
  const DEMO_CONTENT = `In today's fast-paced digital era, it is absolutely essential to leverage next-generation methodologies in order to maximize synergistic optimization. Many people say that technology is changing our lives, which is a very key thing to remember. We must optimize our capabilities to achieve a paradigm shift in our productivity metrics.

It is important to note that success is key, and we should optimize success. Technology makes things better. To succeed, one must work hard and optimize processes. We must leverage our potential. This is a very critical factor that cannot be ignored in the modern world.

In conclusion, we need to utilize key solutions to revolutionize our operations. By optimizing our synergy, we can create win-win scenarios that drive dynamic execution.`;

  // --- Multi-Agent Configuration Registry ---
  const AGENT_REGISTRY = [
    {
      id: 'readability',
      name: 'Readability Agent',
      icon: 'book-open',
      purpose: 'Evaluates sentence syntax flow, rhythm, and structural complexity.',
      weight: 0.20,
      prompt: (text) => `You are the Readability Agent for a content audit system. Evaluate the sentence structures, syntax flow, vocabulary complexity, reading rhythm, and overall clarity of the content.
Return a valid JSON response matching this schema:
{
  "score": number, // 0-100 readability rating
  "issues": string[], // list of readability issues found (empty array if clean)
  "details": string // 1-2 sentence summary of findings
}
Do not include any Markdown wrappers. Return only the raw JSON.
TEXT TO ANALYZE:
${text}`,
      validate: (data) => typeof data.score === 'number' && Array.isArray(data.issues) && typeof data.details === 'string'
    },
    {
      id: 'specificity',
      name: 'Specificity Agent',
      icon: 'compass',
      purpose: 'Scans text for concrete facts, evidence, data points, and examples.',
      weight: 0.25,
      prompt: (text) => `You are the Specificity Agent for a content audit system. Evaluate the presence of concrete details, evidence, statistics, data points, facts, and examples.
Return a valid JSON response matching this schema:
{
  "score": number, // 0-100 specificity rating
  "examplesCount": number, // estimated count of examples
  "evidenceCount": number, // estimated count of data/evidence citations
  "statisticsCount": number, // estimated count of stats/metrics used
  "issues": string[], // list of issues related to specificity/evidence gaps
  "details": string
}
Do not include any Markdown wrappers. Return only the raw JSON.
TEXT TO ANALYZE:
${text}`,
      validate: (data) => typeof data.score === 'number' && typeof data.examplesCount === 'number' && Array.isArray(data.issues) && typeof data.details === 'string'
    },
    {
      id: 'argument',
      name: 'Argument Quality Agent',
      icon: 'git-branch',
      purpose: 'Audits logical reasoning, structural claims, and unsupported assertions.',
      weight: 0.30,
      prompt: (text) => `You are the Argument Quality Agent for a content audit system. Evaluate logical consistency, reasoning strength, unsupported assertions, weak claims, and structural flow.
Return a valid JSON response matching this schema:
{
  "score": number, // 0-100 argument quality rating
  "weakClaimsCount": number, // count of weak or unproven claims
  "unsupportedStatementsCount": number, // count of assertions lacking reasoning
  "issues": string[], // list of logical/argumentation issues found
  "details": string
}
Do not include any Markdown wrappers. Return only the raw JSON.
TEXT TO ANALYZE:
${text}`,
      validate: (data) => typeof data.score === 'number' && typeof data.weakClaimsCount === 'number' && Array.isArray(data.issues) && typeof data.details === 'string'
    },
    {
      id: 'content_value',
      name: 'Content Value Agent',
      icon: 'target',
      purpose: 'Detects repetitive phrases, buzzwords, boilerplate, and slop.',
      weight: 0.25,
      prompt: (text) => `You are the Content Value Agent for a content audit system. Analyze the text for generic templates, boilerplate text, repetitive ideas, buzzword overuse, and low-value content (slop).
Return a valid JSON response matching this schema:
{
  "score": number, // 0-100 content value score (100 = rich human value, 0 = typical low-effort AI slop)
  "repetitionCount": number,
  "buzzwordCount": number,
  "genericCount": number,
  "lowValueDetected": boolean,
  "issues": string[], // list of slop/low-value issues
  "details": string,
  "buzzwords": string[], // list of overused buzzwords found (max 5)
  "repetitions": string[], // list of repetitive statements found (max 3)
  "genericStatements": string[] // list of generic statements found (max 3)
}
Do not include any Markdown wrappers. Return only the raw JSON.
TEXT TO ANALYZE:
${text}`,
      validate: (data) => typeof data.score === 'number' && typeof data.buzzwordCount === 'number' && Array.isArray(data.issues) && typeof data.details === 'string'
    }
  ];

  const SYNTHESIS_AGENT = {
    id: 'report_generator',
    name: 'Report Generator',
    icon: 'award',
    purpose: 'Aggregates multi-agent telemetry into a unified quality scorecard.',
    prompt: (text, agentResults) => `You are the Report Generator Agent for a content audit system. Your job is to aggregate the analyses from all active analysis agents and synthesize a unified, executive content quality audit report.
    
TEXT BEING AUDITED:
${text}

INDIVIDUAL AGENT ANALYSES RECEIVED:
${JSON.stringify(agentResults, null, 2)}

Review the findings, calculate the overall actionability score (0-100), and write the executive summary, key strengths, key weaknesses, and improvement suggestions.

Return a valid JSON response matching this schema:
{
  "actionabilityScore": number, // 0-100 score indicating how practical/actionable the suggestions or text content is
  "summary": string, // 2-3 sentence executive quality summary
  "strengths": string[], // 2-4 key strengths
  "weaknesses": string[], // 2-4 key weaknesses
  "suggestions": string[] // 2-4 actionable improvement suggestions
}
Do not include any Markdown wrappers. Return only the raw JSON.`,
    validate: (data) => typeof data.actionabilityScore === 'number' && typeof data.summary === 'string' && Array.isArray(data.strengths) && Array.isArray(data.weaknesses) && Array.isArray(data.suggestions)
  };

  // --- WebGL Orb Initialization (OGL) ---
  function initWebGLOrb() {
    const container = document.getElementById('orb-canvas-container');
    const OGL = window.OGL || window.ogl;
    if (!container || !OGL) {
      console.warn('WebGL container or OGL library missing.');
      return;
    }

    try {
      const { Renderer, Program, Mesh, Plane, Vec3 } = OGL;

      const hue = 0;
      const hoverIntensity = 0.5;
      const rotateOnHover = true;
      const forceHoverState = false;
      const backgroundColor = '#030307';

      const vert = `
        precision highp float;
        attribute vec2 position;
        attribute vec2 uv;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `;

      const frag = `
        precision highp float;

        uniform float iTime;
        uniform vec3 iResolution;
        uniform float hue;
        uniform float hover;
        uniform float rot;
        uniform float hoverIntensity;
        uniform vec3 backgroundColor;
        varying vec2 vUv;

        vec3 rgb2yiq(vec3 c) {
          float y = dot(c, vec3(0.299, 0.587, 0.114));
          float i = dot(c, vec3(0.596, -0.274, -0.322));
          float q = dot(c, vec3(0.211, -0.523, 0.312));
          return vec3(y, i, q);
        }
        
        vec3 yiq2rgb(vec3 c) {
          float r = c.x + 0.956 * c.y + 0.621 * c.z;
          float g = c.x - 0.272 * c.y - 0.647 * c.z;
          float b = c.x - 1.106 * c.y + 1.703 * c.z;
          return vec3(r, g, b);
        }
        
        vec3 adjustHue(vec3 color, float hueDeg) {
          float hueRad = hueDeg * 3.14159265 / 180.0;
          vec3 yiq = rgb2yiq(color);
          float cosA = cos(hueRad);
          float sinA = sin(hueRad);
          float i = yiq.y * cosA - yiq.z * sinA;
          float q = yiq.y * sinA + yiq.z * cosA;
          yiq.y = i;
          yiq.z = q;
          return yiq2rgb(yiq);
        }

        vec3 hash33(vec3 p3) {
          p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));
          p3 += dot(p3, p3.yxz + 19.19);
          return -1.0 + 2.0 * fract(vec3(
            p3.x + p3.y,
            p3.x + p3.z,
            p3.y + p3.z
          ) * p3.zyx);
        }

        float snoise3(vec3 p) {
          const float K1 = 0.333333333;
          const float K2 = 0.166666667;
          vec3 i = floor(p + (p.x + p.y + p.z) * K1);
          vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
          vec3 e = step(vec3(0.0), d0 - d0.yzx);
          vec3 i1 = e * (1.0 - e.zxy);
          vec3 i2 = 1.0 - e.zxy * (1.0 - e);
          vec3 d1 = d0 - (i1 - K2);
          vec3 d2 = d0 - (i2 - K1);
          vec3 d3 = d0 - 0.5;
          vec4 h = max(0.6 - vec4(
            dot(d0, d0),
            dot(d1, d1),
            dot(d2, d2),
            dot(d3, d3)
          ), 0.0);
          vec4 n = h * h * h * h * vec4(
            dot(d0, hash33(i)),
            dot(d1, hash33(i + i1)),
            dot(d2, hash33(i + i2)),
            dot(d3, hash33(i + 1.0))
          );
          return dot(vec4(31.316), n);
        }

        vec4 extractAlpha(vec3 colorIn) {
          float a = max(max(colorIn.r, colorIn.g), colorIn.b);
          return vec4(colorIn.rgb / (a + 1e-5), a);
        }

        const vec3 baseColor1 = vec3(0.611765, 0.262745, 0.996078);
        const vec3 baseColor2 = vec3(0.298039, 0.760784, 0.913725);
        const vec3 baseColor3 = vec3(0.062745, 0.078431, 0.600000);
        const float innerRadius = 0.6;
        const float noiseScale = 0.65;

        float light1(float intensity, float attenuation, float dist) {
          return intensity / (1.0 + dist * attenuation);
        }
        float light2(float intensity, float attenuation, float dist) {
          return intensity / (1.0 + dist * dist * attenuation);
        }

        vec4 draw(vec2 uv) {
          vec3 color1 = adjustHue(baseColor1, hue);
          vec3 color2 = adjustHue(baseColor2, hue);
          vec3 color3 = adjustHue(baseColor3, hue);
          
          float ang = atan(uv.y, uv.x);
          float len = length(uv);
          float invLen = len > 0.0 ? 1.0 / len : 0.0;

          float bgLuminance = dot(backgroundColor, vec3(0.299, 0.587, 0.114));
          
          float n0 = snoise3(vec3(uv * noiseScale, iTime * 0.5)) * 0.5 + 0.5;
          float r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), n0);
          float d0 = distance(uv, (r0 * invLen) * uv);
          float v0 = light1(1.0, 10.0, d0);

          v0 *= smoothstep(r0 * 1.05, r0, len);
          float innerFade = smoothstep(r0 * 0.8, r0 * 0.95, len);
          v0 *= mix(innerFade, 1.0, bgLuminance * 0.7);
          float cl = cos(ang + iTime * 2.0) * 0.5 + 0.5;
          
          float a = iTime * -1.0;
          vec2 pos = vec2(cos(a), sin(a)) * r0;
          float d = distance(uv, pos);
          float v1 = light2(1.5, 5.0, d);
          v1 *= light1(1.0, 50.0, d0);
          
          float v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);
          float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);
          
          vec3 colBase = mix(color1, color2, cl);
          float fadeAmount = mix(1.0, 0.1, bgLuminance);
          
          vec3 darkCol = mix(color3, colBase, v0);
          darkCol = (darkCol + v1) * v2 * v3;
          darkCol = clamp(darkCol, 0.0, 1.0);
          
          vec3 lightCol = (colBase + v1) * mix(1.0, v2 * v3, fadeAmount);
          lightCol = mix(backgroundColor, lightCol, v0);
          lightCol = clamp(lightCol, 0.0, 1.0);
          
          vec3 finalCol = mix(darkCol, lightCol, bgLuminance);
          
          return extractAlpha(finalCol);
        }

        vec4 mainImage(vec2 fragCoord) {
          vec2 center = iResolution.xy * 0.5;
          float size = min(iResolution.x, iResolution.y);
          vec2 uv = (fragCoord - center) / size * 2.0;
          
          float angle = rot;
          float s = sin(angle);
          float c = cos(angle);
          uv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);
          
          uv.x += hover * hoverIntensity * 0.1 * sin(uv.y * 10.0 + iTime);
          uv.y += hover * hoverIntensity * 0.1 * sin(uv.x * 10.0 + iTime);
          
          return draw(uv);
        }

        void main() {
          vec2 fragCoord = vUv * iResolution.xy;
          vec4 col = mainImage(fragCoord);
          gl_FragColor = vec4(col.rgb * col.a, col.a);
        }
      `;

      const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      container.appendChild(gl.canvas);

      const geometry = new Plane(gl, { width: 2, height: 2 });
      
      const hexToVec3Helper = (colorStr) => {
        if (colorStr.startsWith('#')) {
          const r = parseInt(colorStr.slice(1, 3), 16) / 255;
          const g = parseInt(colorStr.slice(3, 5), 16) / 255;
          const b = parseInt(colorStr.slice(5, 7), 16) / 255;
          return new Vec3(r, g, b);
        }
        return new Vec3(0, 0, 0);
      };

      const program = new Program(gl, {
        vertex: vert,
        fragment: frag,
        uniforms: {
          iTime: { value: 0 },
          iResolution: {
            value: new Vec3(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
          },
          hue: { value: hue },
          hover: { value: 0 },
          rot: { value: 0 },
          hoverIntensity: { value: hoverIntensity },
          backgroundColor: { value: hexToVec3Helper(backgroundColor) }
        }
      });

      const mesh = new Mesh(gl, { geometry, program });

      function resize() {
        if (!container) return;
        // Cap WebGL devicePixelRatio at 1.5 to optimize shader compilation and render speeds on mobile/low-end GPUs
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width * dpr, height * dpr);
        gl.canvas.style.width = width + 'px';
        gl.canvas.style.height = height + 'px';
        program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height);
      }
      window.addEventListener('resize', resize);
      resize();

      let targetHover = 0;
      let lastTime = 0;
      let currentRot = 0;
      const rotationSpeed = 0.3;

      const handleMouseMove = e => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const width = rect.width;
        const height = rect.height;
        const size = Math.min(width, height);
        const centerX = width / 2;
        const centerY = height / 2;
        const uvX = ((x - centerX) / size) * 2.0;
        const uvY = ((y - centerY) / size) * 2.0;

        if (Math.sqrt(uvX * uvX + uvY * uvY) < 0.8) {
          targetHover = 1;
        } else {
          targetHover = 0;
        }
      };

      const handleMouseLeave = () => {
        targetHover = 0;
      };

      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);

      let rafId;
      const update = t => {
        rafId = requestAnimationFrame(update);
        const dt = (t - lastTime) * 0.001;
        lastTime = t;
        program.uniforms.iTime.value = t * 0.001;
        program.uniforms.hue.value = hue;
        program.uniforms.hoverIntensity.value = hoverIntensity;

        const effectiveHover = forceHoverState ? 1 : targetHover;
        program.uniforms.hover.value += (effectiveHover - program.uniforms.hover.value) * 0.1;

        if (rotateOnHover && effectiveHover > 0.5) {
          currentRot += dt * rotationSpeed;
        }
        program.uniforms.rot.value = currentRot;

        renderer.render({ scene: mesh });
      };
      rafId = requestAnimationFrame(update);
    } catch (e) {
      console.error('Failed to run WebGL shader Orb', e);
    }
  }

  // --- Line Numbers Gutter Generator ---
  function updateLineNumbers() {
    if (!elContentInput || !elEditorGutter) return;
    const lines = elContentInput.value.split('\n');
    const lineCount = Math.max(1, lines.length);
    
    elEditorGutter.innerHTML = '';
    for (let i = 1; i <= lineCount; i++) {
      const numDiv = document.createElement('div');
      numDiv.textContent = i;
      elEditorGutter.appendChild(numDiv);
    }
  }
  
  function updateOverallGauge(score) {
    const ring = document.getElementById('ring-overall');
    if (ring) {
      const radius = ring.r.baseVal.value;
      const circumference = 2 * Math.PI * radius; // ~238.76
      const offset = circumference - (score / 100) * circumference;
      ring.style.strokeDashoffset = offset;
    }
  }

  // --- Initialization ---
  function init() {
    loadSettings();
    loadHistory();
    setupEventListeners();
    updateTextStats();
    updateLineNumbers();
    
    // Initialize WebGL Orb
    initWebGLOrb();

    // Start splash screen fade out timer
    setTimeout(() => {
      if (elSplash) {
        elSplash.classList.add('fade-out');
        setTimeout(() => {
          elSplash.classList.add('hidden');
        }, 600); // matches transition duration
      }
    }, 1800);
    
    // Initialize lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // --- Helper: Local Storage & Settings ---
  function loadSettings() {
    appState.apiKey = localStorage.getItem('aura_audit_key') || '';
    appState.selectedModel = localStorage.getItem('aura_audit_model') || 'gemini-2.5-flash';
    
    if (appState.apiKey) {
      elApiKey.value = appState.apiKey;
    }
    elModelSelect.value = appState.selectedModel;
  }

  function saveSettings() {
    const key = elApiKey.value.trim();
    const model = elModelSelect.value;
    
    appState.apiKey = key;
    appState.selectedModel = model;
    
    localStorage.setItem('aura_audit_key', key);
    localStorage.setItem('aura_audit_model', model);
    
    showToast('Settings saved successfully', 'success');
  }

  function loadHistory() {
    const stored = localStorage.getItem('aura_audit_history');
    if (stored) {
      try {
        appState.history = JSON.parse(stored);
        renderHistoryList();
      } catch (e) {
        console.error('Failed to parse history', e);
        appState.history = [];
      }
    }
  }

  function saveHistory() {
    localStorage.setItem('aura_audit_history', JSON.stringify(appState.history));
    renderHistoryList();
  }

  // --- Media Attachment Logic ---
  function openAttachmentModal() {
    if (elAttachmentModal) {
      elAttachmentModal.classList.remove('hidden');
      document.body.classList.add('modal-open');
    }
    if (elUrlInputContainer) elUrlInputContainer.classList.add('hidden');
    if (elExtractionLoaderPanel) elExtractionLoaderPanel.classList.add('hidden');
    if (elAttachmentUrlField) elAttachmentUrlField.value = '';
  }

  function closeAttachmentModal() {
    if (elAttachmentModal) {
      elAttachmentModal.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  }

  function showExtractionLoader(message) {
    if (elLoaderMessage) elLoaderMessage.textContent = message;
    if (elExtractionLoaderPanel) elExtractionLoaderPanel.classList.remove('hidden');
  }

  function hideExtractionLoader() {
    if (elExtractionLoaderPanel) elExtractionLoaderPanel.classList.add('hidden');
  }

  function updateAttachmentBadge(name, type) {
    if (!elAttachmentStatusContainer) return;
    
    if (!name) {
      elAttachmentStatusContainer.innerHTML = '<span class="attachment-status-text" id="attachment-status-text">No files attached</span>';
      appState.attachedFile = null;
      appState.attachedType = null;
      appState.attachedName = '';
      return;
    }

    appState.attachedName = name;
    appState.attachedType = type;

    let icon = 'file-text';
    if (type === 'image') icon = 'image';
    if (type === 'url') icon = 'link';

    elAttachmentStatusContainer.innerHTML = `
      <div class="attachment-badge type-${type}" title="${escapeHtml(name)}">
        <i data-lucide="${icon}" style="width: 12px; height: 12px;"></i>
        <span>${escapeHtml(name)}</span>
        <button type="button" class="btn-remove-attachment" id="btn-remove-attachment" title="Remove attachment">
          <i data-lucide="x"></i>
        </button>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }

    const btnRemove = document.getElementById('btn-remove-attachment');
    if (btnRemove) {
      btnRemove.addEventListener('click', (e) => {
        e.stopPropagation();
        updateAttachmentBadge(null, null);
        showToast('Attachment removed', 'info');
      });
    }
  }

  async function handleTextFile(file) {
    showExtractionLoader('Reading text document...');
    try {
      const reader = new FileReader();
      reader.onload = function(e) {
        const text = e.target.result;
        if (elContentInput) {
          elContentInput.value = text;
          elContentInput.dispatchEvent(new Event('input'));
        }
        
        hideExtractionLoader();
        closeAttachmentModal();
        updateAttachmentBadge(file.name, 'doc');
        showToast(`Imported ${file.name} successfully!`, 'success');
      };
      reader.onerror = function() {
        throw new Error('Error reading text file.');
      };
      reader.readAsText(file);
    } catch (error) {
      console.error(error);
      hideExtractionLoader();
      showToast(`Document import failed: ${error.message}`, 'error');
    }
  }

  async function handlePDFFile(file) {
    showExtractionLoader('Loading PDF structure...');
    try {
      if (!window.pdfjsLib) {
        throw new Error('PDF.js library is not loaded. Check your internet connection.');
      }
      
      const arrayBuffer = await file.arrayBuffer();
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
      
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        showExtractionLoader(`Extracting page ${i} of ${pdf.numPages}...`);
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + '\n';
      }

      if (!fullText.trim()) {
        throw new Error('No readable text found in PDF. It might be a scanned image PDF.');
      }

      if (elContentInput) {
        elContentInput.value = fullText;
        elContentInput.dispatchEvent(new Event('input'));
      }

      hideExtractionLoader();
      closeAttachmentModal();
      updateAttachmentBadge(file.name, 'doc');
      showToast(`Imported ${pdf.numPages} pages from ${file.name}!`, 'success');
    } catch (error) {
      console.error(error);
      hideExtractionLoader();
      showToast(`PDF import failed: ${error.message}`, 'error');
    }
  }

  async function handleUrlImport(url) {
    if (!url) {
      showToast('Please enter a valid URL.', 'error');
      return;
    }
    
    showExtractionLoader('Fetching website contents...');
    try {
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch URL. HTTP status ${response.status}`);
      }
      
      const html = await response.text();
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      const tagsToRemove = ['script', 'style', 'nav', 'header', 'footer', 'noscript', 'iframe'];
      tagsToRemove.forEach(tag => {
        doc.querySelectorAll(tag).forEach(el => el.remove());
      });
      
      let bodyText = '';
      const paragraphs = doc.querySelectorAll('p, h1, h2, h3, article');
      if (paragraphs.length > 0) {
        bodyText = Array.from(paragraphs)
          .map(p => p.textContent.trim())
          .filter(txt => txt.length > 20)
          .join('\n\n');
      } else {
        bodyText = doc.body.textContent;
      }
      
      bodyText = bodyText.replace(/\s+/g, ' ').replace(/\n\s*\n/g, '\n\n').trim();
      
      if (!bodyText || bodyText.length < 50) {
        throw new Error('Extracted text is too short or empty. Website might block scrapers.');
      }
      
      if (bodyText.length > 15000) {
        bodyText = bodyText.substring(0, 15000) + '\n\n[Content truncated due to length limits]';
      }
      
      if (elContentInput) {
        elContentInput.value = bodyText;
        elContentInput.dispatchEvent(new Event('input'));
      }
      
      hideExtractionLoader();
      closeAttachmentModal();
      
      let hostname = 'URL';
      try {
        hostname = new URL(url).hostname;
      } catch (_) {}
      
      updateAttachmentBadge(hostname, 'url');
      showToast('Website content imported successfully!', 'success');
    } catch (error) {
      console.error(error);
      hideExtractionLoader();
      showToast(`Web import failed (CORS restriction or dynamic page). Try copying the text manually.`, 'error');
    }
  }

  async function handleImageOCR(file) {
    if (!appState.apiKey) {
      showToast('Gemini API Key is missing. Add your API Key in Settings (Gear Icon) to extract text.', 'error');
      closeAttachmentModal();
      return;
    }
    
    showExtractionLoader('Transcribing text from screenshot...');
    
    try {
      const base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
      });
      
      const cleanBase64 = base64Data.split(';base64,')[1];
      
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${appState.selectedModel}:generateContent?key=${appState.apiKey}`;
      const payload = {
        contents: [
          {
            parts: [
              { text: "OCR Task: Extract and transcribe all visible text, articles, or paragraphs from this image verbatim. Do not write any descriptions, introduction, or headers. Return ONLY the transcribed text content found in the image. If there is no text, return an empty string." },
              {
                inlineData: {
                  mimeType: file.type,
                  data: cleanBase64
                }
              }
            ]
          }
        ]
      };
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        let errMessage = 'OCR failed';
        try {
          const errData = await response.json();
          if (errData && errData.error) {
            errMessage = `${errData.error.status} (${errData.error.code}): ${errData.error.message}`;
          }
        } catch (_) {
          errMessage = `Server status code ${response.status}`;
        }
        throw new Error(errMessage);
      }
      
      const data = await response.json();
      if (!data.candidates || data.candidates.length === 0 || !data.candidates[0].content || !data.candidates[0].content.parts || data.candidates[0].content.parts.length === 0) {
        throw new Error('No candidates returned from OCR engine.');
      }
      
      const extractedText = data.candidates[0].content.parts[0].text.trim();
      
      if (!extractedText) {
        throw new Error('No readable text found in image.');
      }
      
      if (elContentInput) {
        elContentInput.value = extractedText;
        elContentInput.dispatchEvent(new Event('input'));
      }
      
      hideExtractionLoader();
      closeAttachmentModal();
      updateAttachmentBadge(file.name, 'image');
      showToast('Text successfully transcribed from image!', 'success');
    } catch (error) {
      console.error(error);
      hideExtractionLoader();
      showToast(`Image transcription failed: ${error.message}`, 'error');
    }
  }

  // --- Toast System ---
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconName = 'info';
    if (type === 'success') iconName = 'check-circle';
    if (type === 'error') iconName = 'x-circle';
    
    toast.innerHTML = `
      <i data-lucide="${iconName}"></i>
      <span>${message}</span>
    `;
    
    elToastContainer.appendChild(toast);
    if (window.lucide) {
      window.lucide.createIcons({ attrs: { class: 'toast-icon' } });
    }
    
    setTimeout(() => {
      toast.classList.add('toast-fade-out');
      toast.addEventListener('animationend', () => {
        toast.remove();
      });
    }, 4000);
  }

  // --- Smart Input Evaluation ---
  function updateTextStats() {
    const text = elContentInput.value;
    const chars = text.length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    
    const readTimeMin = words === 0 ? 0 : Math.max(1, Math.ceil(words / 200));
    
    elCharCount.textContent = `${chars.toLocaleString()} chars`;
    elWordCount.textContent = `${words.toLocaleString()} words`;
    elReadTime.textContent = `${readTimeMin} min read`;

    // Color code counters
    const badges = [elCharCount, elWordCount, elReadTime];
    badges.forEach(b => {
      b.className = ''; // Reset
      if (chars > 0) {
        if (chars < 150) {
          b.classList.add('below-min');
        } else if (chars < 600) {
          b.classList.add('acceptable');
        } else {
          b.classList.add('recommended');
        }
      }
    });
  }

  // --- History UI Render ---
  function renderHistoryList() {
    elHistoryListMain.innerHTML = '';
    
    if (appState.history.length === 0) {
      elHistoryListMain.innerHTML = `
        <div class="empty-state">
          <i data-lucide="folder-open" class="icon-lg icon-muted"></i>
          <p>No historical audits stored yet.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }
    
    appState.history.forEach(item => {
      const card = document.createElement('div');
      card.className = 'history-grid-card glass';
      
      const overallScore = item.report.metrics.overallQuality;
      let scoreClass = 'medium';
      if (overallScore >= 80) scoreClass = 'good';
      if (overallScore < 50) scoreClass = 'bad';
      
      card.innerHTML = `
        <div class="history-grid-card-body">
          <div class="h-card-header">
            <span class="h-card-title" title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</span>
            <span class="history-badge ${scoreClass}">${overallScore} Q</span>
          </div>
          <p class="h-card-preview">${escapeHtml(item.text.substring(0, 120))}...</p>
          <div class="h-card-footer">
            <span class="h-card-time"><i data-lucide="calendar"></i> ${item.time}</span>
            <div class="h-card-actions">
              <button class="btn btn-secondary btn-sm btn-load" data-id="${item.id}">Load Report</button>
              <button class="btn-icon btn-delete" data-id="${item.id}" title="Delete record"><i data-lucide="trash-2"></i></button>
            </div>
          </div>
        </div>
      `;
      
      // Load event
      card.querySelector('.btn-load').addEventListener('click', () => {
        loadAuditFromHistory(item.id);
        // Switch back to Dashboard view
        switchToDashboardView();
      });
      
      // Delete event
      card.querySelector('.btn-delete').addEventListener('click', (e) => {
        e.stopPropagation();
        deleteHistoryItem(item.id);
      });
      
      elHistoryListMain.appendChild(card);
    });
    
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function loadAuditFromHistory(id) {
    const audit = appState.history.find(x => x.id === id);
    if (!audit) return;
    
    appState.currentAuditId = id;
    elContentInput.value = audit.text;
    updateTextStats();
    
    renderReportDashboard(audit.report, audit.time, audit.improved);
    elBtnImprove.disabled = false;
    
    renderDebugVisualizer(audit.telemetryData || {});
    showToast('Loaded audit from history', 'success');
  }

  function deleteHistoryItem(id) {
    appState.history = appState.history.filter(x => x.id !== id);
    if (appState.currentAuditId === id) {
      appState.currentAuditId = null;
      resetDashboard();
    }
    saveHistory();
    renderHistoryList();
    showToast('Audit removed', 'info');
  }

  function clearAllHistory() {
    if (confirm('Are you sure you want to clear all audit history?')) {
      appState.history = [];
      appState.currentAuditId = null;
      resetDashboard();
      saveHistory();
      renderHistoryList();
      showToast('All history cleared', 'success');
    }
  }

  function resetDashboard() {
    if (elWelcomePanel) elWelcomePanel.classList.remove('hidden');
    if (elDashboardPanel) elDashboardPanel.classList.add('hidden');
    elBtnImprove.disabled = true;
    elContentInput.value = '';
    updateTextStats();
    
    // Reset radar values
    elRadarReadability.innerHTML = 'Clarity & Flow';
    elRadarSpecificity.innerHTML = 'Depth & Evidence';
    elRadarArgument.innerHTML = 'Logic & Strength';
    elRadarValue.innerHTML = 'Uniqueness & Worth';
    
    // Reset Metrics
    vals.overall.textContent = '--';
    updateOverallGauge(0);
    vals.value.textContent = '--';
    vals.readability.textContent = '--';
    vals.specificity.textContent = '--';
    vals.argument.textContent = '--';
    
    // Reset agents list on sidebar
    AGENT_REGISTRY.forEach(agent => {
      updateAgentUI(agent.id, 'pending', { time: 0, tokens: 0 });
    });
    updateAgentUI(SYNTHESIS_AGENT.id, 'pending', { time: 0, tokens: 0 });
  }

  // --- Animate Score Metrics ---
  function animateScore(element, target) {
    if (!element) return;
    let current = 0;
    const duration = 800; // ms
    const stepTime = 15; // ms
    const increment = target / (duration / stepTime);
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = Math.round(target);
        if (element.id === 'val-overall') {
          updateOverallGauge(target);
        }
        clearInterval(timer);
      } else {
        element.textContent = Math.round(current);
        if (element.id === 'val-overall') {
          updateOverallGauge(current);
        }
      }
    }, stepTime);
  }

  // --- Render Detections Grid ---
  function renderDetections(detections) {
    elDetectionsContainer.innerHTML = '';
    
    const defs = [
      { key: 'genericStatements', label: 'Generic Statements', icon: 'file-warning' },
      { key: 'repetitiveIdeas', label: 'Repetitive Ideas', icon: 'repeat' },
      { key: 'buzzwordOveruse', label: 'Buzzword Overuse', icon: 'trending-up' },
      { key: 'lackOfExamples', label: 'Lack of Examples', icon: 'help-circle' },
      { key: 'lackOfEvidence', label: 'Lack of Evidence', icon: 'database' },
      { key: 'weakArguments', label: 'Weak Arguments', icon: 'git-branch' },
      { key: 'lowValueContent', label: 'Low-Value Content', icon: 'trash-2' }
    ];

    defs.forEach(def => {
      const data = detections[def.key];
      if (!data) return;

      const card = document.createElement('div');
      card.className = `detection-item ${data.detected ? 'flagged' : 'clean'}`;
      
      const tagText = data.detected ? (data.count !== undefined ? `${data.count} found` : 'Detected') : 'Clean';
      const tagClass = data.detected ? (def.key === 'lowValueContent' || def.key === 'weakArguments' ? 'tag-flagged' : 'tag-warning') : 'tag-clean';
      
      let examplesHtml = '';
      if (data.detected && data.examples && data.examples.length > 0) {
        const borderClass = def.key === 'lowValueContent' || def.key === 'weakArguments' ? '' : 'warning-border';
        examplesHtml = `
          <div class="detection-examples ${borderClass}">
            <span>Examples:</span>
            <p>${data.examples.map(ex => `"${escapeHtml(ex)}"`).join('<br><br>')}</p>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="detection-meta">
          <div class="card-title-group">
            <i data-lucide="${def.icon}" class="${data.detected ? 'text-orange' : 'text-teal'}"></i>
            <span class="detection-title">${def.label}</span>
          </div>
          <span class="detection-tag ${tagClass}">${tagText}</span>
        </div>
        <p class="detection-desc">${escapeHtml(data.details)}</p>
        ${examplesHtml}
      `;
      
      elDetectionsContainer.appendChild(card);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // --- Render Report Dashboard ---
  function renderReportDashboard(report, timestamp, improved = null) {
    if (elWelcomePanel) elWelcomePanel.classList.add('hidden');
    elLoadingBanner.classList.add('hidden');
    if (elDashboardPanel) elDashboardPanel.classList.remove('hidden');
    
    // Toggle Recent Reports panel to show details
    elReportsEmptyState.classList.add('hidden');
    elReportDetailsContainer.classList.remove('hidden');
    
    if (elReportTime) elReportTime.textContent = `Audited at ${timestamp}`;
    const wordCount = elContentInput.value.trim().split(/\s+/).length;
    if (elBadgeDocType) elBadgeDocType.textContent = wordCount > 800 ? 'Deep Article' : (wordCount > 300 ? 'Standard Draft' : 'Short Snippet');
    
    const cleanText = elContentInput.value.trim();
    const titleEnd = cleanText.indexOf('\n') > 0 ? cleanText.indexOf('\n') : 35;
    if (elReportTitle) elReportTitle.textContent = `Audit: ${cleanText.substring(0, titleEnd).trim()}...`;
    
    // Set score numbers
    animateScore(vals.overall, report.metrics.overallQuality);
    animateScore(vals.value, report.metrics.contentValue);
    animateScore(vals.readability, report.metrics.readability);
    animateScore(vals.specificity, report.metrics.specificity);
    animateScore(vals.argument, report.metrics.overallQuality); // Use overall score as fallback for argument score visual mapping

    // Update labels inside the circular Radar Constellation
    elRadarReadability.innerHTML = `Score: <strong>${report.metrics.readability}%</strong>`;
    elRadarSpecificity.innerHTML = `Score: <strong>${report.metrics.specificity}%</strong>`;
    elRadarArgument.innerHTML = `Score: <strong>${report.metrics.overallQuality}%</strong>`;
    elRadarValue.innerHTML = `Score: <strong>${report.metrics.contentValue}%</strong>`;

    // Set Detections Grid
    renderDetections(report.detections);
    
    // Set Summary Text
    elReportSummary.textContent = report.summary;
    
    // Set lists
    populateList(elReportStrengths, report.strengths);
    populateList(elReportWeaknesses, report.weaknesses);
    populateList(elReportSuggestions, report.suggestions);
    
    // Handle Improved Version tab
    if (improved) {
      elTabImprovedBtn.classList.remove('hidden');
      elImprovedContentDisplay.textContent = improved.improvedContent;
      populateList(elImprovedChangesList, improved.changesMade);
    } else {
      elTabImprovedBtn.classList.add('hidden');
      elImprovedContentDisplay.textContent = '';
      elImprovedChangesList.innerHTML = '';
      if (document.querySelector('.tab-btn[data-tab="tab-improved"]').classList.contains('active')) {
        switchTab('tab-summary');
      }
    }
  }

  function populateList(container, items) {
    container.innerHTML = '';
    if (!items || items.length === 0) {
      container.innerHTML = '<li class="text-muted">None identified</li>';
      return;
    }
    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      container.appendChild(li);
    });
  }

  // --- Orchestrator: Sidebar Row Indicators controller ---
  function initConsoleView() {
    // Reset sidebar agents states
    AGENT_REGISTRY.forEach(agent => {
      updateAgentUI(agent.id, 'pending', { time: 0, tokens: 0 });
    });
    updateAgentUI(SYNTHESIS_AGENT.id, 'pending', { time: 0, tokens: 0 });
    
    // Reset timer banner at the top of right panel
    elConsoleTimer.textContent = 'Elapsed: 0.0s';
    elConsoleProgressBar.style.width = '0%';
    elConsoleStatusText.textContent = 'Orchestrating analysis pipeline...';
  }

  function updateAgentUI(id, state, telemetry = {}) {
    const card = document.getElementById(`agent-card-${id}`);
    const iconContainer = document.getElementById(`agent-icon-${id}`);
    const statusLabel = document.getElementById(`agent-status-${id}`);
    const tokensLabel = document.getElementById(`agent-tokens-${id}`);
    const timeLabel = document.getElementById(`agent-time-${id}`);
    
    if (!card) return;
    
    // Reset edge classes
    card.className = 'sidebar-agent-row';
    statusLabel.className = 'hidden';
    
    if (state === 'pending') {
      iconContainer.innerHTML = '<div class="status-ring"></div>';
      statusLabel.textContent = 'Idle';
    } else if (state === 'running') {
      card.classList.add('running');
      iconContainer.innerHTML = '<div class="spinner-mini"></div>';
      statusLabel.textContent = 'Running';
    } else if (state === 'completed') {
      card.classList.add('completed');
      iconContainer.innerHTML = '<i data-lucide="check-circle" class="icon-emerald"></i>';
      statusLabel.textContent = 'Completed';
    } else if (state === 'failed') {
      card.classList.add('failed');
      iconContainer.innerHTML = '<i data-lucide="x-circle" class="icon-crimson"></i>';
      statusLabel.textContent = 'Failed';
    }
    
    // Telemetry updates
    if (telemetry.time !== undefined && telemetry.time > 0) {
      timeLabel.textContent = `${telemetry.time.toFixed(1)}s`;
      timeLabel.classList.add('visible');
    } else {
      timeLabel.textContent = '';
      timeLabel.classList.remove('visible');
    }
    
    if (telemetry.tokens !== undefined && telemetry.tokens > 0) {
      tokensLabel.textContent = `${telemetry.tokens} tkn`;
      tokensLabel.classList.add('visible');
    } else if (telemetry.tokensEst !== undefined && telemetry.tokensEst > 0) {
      tokensLabel.textContent = `${telemetry.tokensEst} tkn`;
      tokensLabel.classList.add('visible');
    } else {
      tokensLabel.textContent = '';
      tokensLabel.classList.remove('visible');
    }
    
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // --- API request wrapper to Gemini API ---
  async function callGeminiAPI(promptText) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${appState.selectedModel}:generateContent?key=${appState.apiKey}`;
    
    const payload = {
      contents: [
        {
          parts: [{ text: promptText }]
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json'
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      let errMessage = 'Network connection failure';
      try {
        const errData = await response.json();
        if (errData && errData.error) {
          errMessage = `${errData.error.status} (${errData.error.code}): ${errData.error.message}`;
        }
      } catch (_) {
        errMessage = `Server returned status code ${response.status}`;
      }
      throw new Error(errMessage);
    }

    const data = await response.json();
    if (!data.candidates || data.candidates.length === 0 || !data.candidates[0].content || !data.candidates[0].content.parts || data.candidates[0].content.parts.length === 0) {
      throw new Error('API returned an empty candidate list.');
    }
    
    return {
      text: data.candidates[0].content.parts[0].text,
      usageMetadata: data.usageMetadata || null
    };
  }

  function parseJSONResponse(rawText) {
    let cleanText = rawText.trim();
    if (cleanText.startsWith('```')) {
      const firstNewline = cleanText.indexOf('\n');
      const lastFence = cleanText.lastIndexOf('```');
      if (firstNewline !== -1 && lastFence !== -1 && lastFence > firstNewline) {
        cleanText = cleanText.substring(firstNewline + 1, lastFence).trim();
      }
    }
    
    try {
      return JSON.parse(cleanText);
    } catch (e) {
      const jsonRegex = /\{[\s\S]*\}/;
      const match = cleanText.match(jsonRegex);
      if (match) {
        try {
          return JSON.parse(match[0]);
        } catch (innerErr) {
          throw new Error('JSON syntax parse failure.');
        }
      }
      throw new Error('JSON syntax parse failure.');
    }
  }

  // --- Extensible Orchestrator Core ---
  async function performAudit() {
    const text = elContentInput.value.trim();
    if (text.length < 50) {
      showToast('Draft is too short (min 50 characters) to perform audit.', 'error');
      return;
    }
    
    if (!appState.apiKey) {
      showToast('API Key is missing. Please enter and save your Gemini API key.', 'error');
      return;
    }
    
    // Switch to dashboard panel, show loading banner
    if (elWelcomePanel) elWelcomePanel.classList.add('hidden');
    if (elDashboardPanel) elDashboardPanel.classList.remove('hidden');
    if (elLoadingPanel) elLoadingPanel.classList.add('hidden'); // Ensure fullscreen loader is bypassed
    elLoadingBanner.classList.remove('hidden');
    
    initConsoleView();
    
    let startTime = Date.now();
    const timerInterval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      elConsoleTimer.textContent = `Elapsed: ${elapsed.toFixed(1)}s`;
    }, 100);
    
    const telemetryData = {};
    const agentResults = {};
    
    elConsoleStatusText.textContent = 'Triggering analysis agents in parallel...';
    elConsoleProgressBar.style.width = '15%';
    
    const runAnalysisAgent = async (agent) => {
      updateAgentUI(agent.id, 'running');
      const agentStartTime = Date.now();
      let attempt = 1;
      let success = false;
      let responseData = null;
      let parsedData = null;
      let tokensUsed = null;
      let tokensEst = null;
      
      while (attempt <= 2 && !success) {
        try {
          const res = await callGeminiAPI(agent.prompt(text));
          responseData = res.text;
          parsedData = parseJSONResponse(responseData);
          
          if (agent.validate(parsedData)) {
            success = true;
            if (res.usageMetadata) {
              tokensUsed = res.usageMetadata.totalTokenCount;
            } else {
              tokensEst = Math.round((agent.prompt(text).length + responseData.length) / 4);
            }
          } else {
            throw new Error('Schema validation failed.');
          }
        } catch (error) {
          console.warn(`[${agent.name}] Attempt ${attempt} failed: ${error.message}`);
          attempt++;
          if (attempt <= 2) {
            await new Promise(r => setTimeout(r, 500));
          }
        }
      }
      
      const elapsedTime = (Date.now() - agentStartTime) / 1000;
      
      if (success) {
        agentResults[agent.id] = parsedData;
        telemetryData[agent.id] = parsedData;
        updateAgentUI(agent.id, 'completed', {
          time: elapsedTime,
          tokens: tokensUsed,
          tokensEst: tokensEst
        });
      } else {
        console.error(`[${agent.name}] Failed both attempts. Injecting default safe values.`);
        agentResults[agent.id] = {
          failed: true,
          score: 50,
          issues: ['Agent failed analysis due to network or schema validation issues.'],
          details: `${agent.name} was unable to process this request.`
        };
        telemetryData[agent.id] = { failed: true, raw: responseData };
        updateAgentUI(agent.id, 'failed', { time: elapsedTime });
      }
    };

    try {
      await Promise.all(AGENT_REGISTRY.map(agent => runAnalysisAgent(agent)));
      
      elConsoleProgressBar.style.width = '60%';
      elConsoleStatusText.textContent = 'Merging telemetry and computing weighted scoring...';
      
      let weightedSum = 0;
      let weightTotal = 0;
      
      const readabilityScore = agentResults.readability ? agentResults.readability.score : 50;
      const specificityScore = agentResults.specificity ? agentResults.specificity.score : 50;
      const argumentScore = agentResults.argument ? agentResults.argument.score : 50;
      const contentValueScore = agentResults.content_value ? agentResults.content_value.score : 50;

      AGENT_REGISTRY.forEach(agent => {
        const result = agentResults[agent.id];
        if (result && !result.failed) {
          weightedSum += result.score * agent.weight;
          weightTotal += agent.weight;
        }
      });

      const overallQuality = weightTotal > 0 ? Math.round(weightedSum / weightTotal) : 50;
      const successfulCount = AGENT_REGISTRY.filter(a => !agentResults[a.id].failed).length;
      const confidenceScore = Math.round((successfulCount / AGENT_REGISTRY.length) * 100);
      
      if (successfulCount === 0) {
        throw new Error('All analysis agents failed execution. Cannot synthesize report.');
      }
      
      const aggregatedPayload = {
        readability: agentResults.readability,
        specificity: agentResults.specificity,
        argumentQuality: agentResults.argument,
        contentValue: agentResults.content_value,
        weightedOverall: overallQuality,
        telemetrySummary: {
          successfulAgents: successfulCount,
          totalAgents: AGENT_REGISTRY.length,
          normalizedWeightSum: weightTotal,
          orchestratorConfidence: confidenceScore
        }
      };
      
      telemetryData.aggregated = aggregatedPayload;
      
      // ----------------------------------------------------
      // Phase 3: Run Synthesizer Agent (Report Generator)
      // ----------------------------------------------------
      elConsoleProgressBar.style.width = '75%';
      elConsoleStatusText.textContent = 'Running synthesis engine (Report Generator)...';
      updateAgentUI(SYNTHESIS_AGENT.id, 'running');
      
      const synthStartTime = Date.now();
      let synthSuccess = false;
      let synthResponse = null;
      let synthParsed = null;
      let synthTokens = null;
      let synthTokensEst = null;
      
      try {
        const res = await callGeminiAPI(SYNTHESIS_AGENT.prompt(text, aggregatedPayload));
        synthResponse = res.text;
        synthParsed = parseJSONResponse(synthResponse);
        
        if (SYNTHESIS_AGENT.validate(synthParsed)) {
          synthSuccess = true;
          if (res.usageMetadata) {
            synthTokens = res.usageMetadata.totalTokenCount;
          } else {
            synthTokensEst = Math.round((SYNTHESIS_AGENT.prompt(text, aggregatedPayload).length + synthResponse.length) / 4);
          }
        } else {
          throw new Error('Synthesis validation failed.');
        }
      } catch (synthErr) {
        console.warn('Synthesis failed. Running rule-based aggregate fallback.', synthErr);
        synthParsed = {
          actionabilityScore: Math.round((specificityScore + argumentScore) / 2),
          summary: 'Aggregate synthesis fallback. Content has been audited by core analysis agents.',
          strengths: ['Analysed readability criteria.', 'Audited content structure values.'],
          weaknesses: ['Synthesizer agent encountered processing constraints.'],
          suggestions: ['Review individual metric cards below for details.']
        };
        synthSuccess = false;
      }
      
      const synthElapsedTime = (Date.now() - synthStartTime) / 1000;
      telemetryData.synthesizer = synthParsed;
      
      if (synthSuccess) {
        updateAgentUI(SYNTHESIS_AGENT.id, 'completed', {
          time: synthElapsedTime,
          tokens: synthTokens,
          tokensEst: synthTokensEst
        });
      } else {
        updateAgentUI(SYNTHESIS_AGENT.id, 'failed', { time: synthElapsedTime });
      }
      
      elConsoleProgressBar.style.width = '100%';
      elConsoleStatusText.textContent = 'Rendering audit report dashboard...';
      
      // ----------------------------------------------------
      // Phase 4: Consolidate Output & Render Dashboard
      // ----------------------------------------------------
      const cv = agentResults.content_value || {};
      const sp = agentResults.specificity || {};
      const ar = agentResults.argument || {};
      
      const finalDetections = {
        genericStatements: {
          detected: !!cv.genericCount && cv.genericCount > 0,
          count: cv.genericCount || 0,
          examples: cv.genericStatements || [],
          details: cv.genericCount > 0 ? `${cv.genericCount} generic statement(s) detected.` : 'Clean content structure.'
        },
        repetitiveIdeas: {
          detected: !!cv.repetitionCount && cv.repetitionCount > 0,
          count: cv.repetitionCount || 0,
          examples: cv.repetitions || [],
          details: cv.repetitionCount > 0 ? `${cv.repetitionCount} repetitive idea(s) detected.` : 'Unique idea flow.'
        },
        buzzwordOveruse: {
          detected: !!cv.buzzwordCount && cv.buzzwordCount > 0,
          count: cv.buzzwordCount || 0,
          examples: cv.buzzwords || [],
          details: cv.buzzwordCount > 0 ? `${cv.buzzwordCount} buzzwords(s) flagged.` : 'Standard vocabulary.'
        },
        lackOfExamples: {
          detected: sp.examplesCount === 0 || specificityScore < 50,
          details: sp.examplesCount > 0 ? `Detected ${sp.examplesCount} concrete examples.` : 'Content is highly abstract; no examples identified.'
        },
        lackOfEvidence: {
          detected: sp.evidenceCount === 0 || specificityScore < 45,
          details: sp.evidenceCount > 0 ? `Found ${sp.evidenceCount} citation/evidence references.` : 'Gaps in logical backing; missing references.'
        },
        weakArguments: {
          detected: !!ar.weakClaimsCount && ar.weakClaimsCount > 0,
          count: ar.weakClaimsCount || 0,
          examples: ar.issues || [],
          details: ar.weakClaimsCount > 0 ? `Flagged ${ar.weakClaimsCount} logical claims.` : 'Logical consistency matches standards.'
        },
        lowValueContent: {
          detected: !!cv.lowValueDetected,
          details: cv.lowValueDetected ? 'High density of filler sentences and fluff.' : 'High value densities verified.'
        }
      };

      const consolidatedReport = {
        metrics: {
          overallQuality: overallQuality,
          contentValue: contentValueScore,
          readability: readabilityScore,
          specificity: specificityScore,
          actionability: synthParsed.actionabilityScore,
          confidence: confidenceScore
        },
        detections: finalDetections,
        summary: synthParsed.summary,
        strengths: synthParsed.strengths,
        weaknesses: synthParsed.weaknesses,
        suggestions: synthParsed.suggestions
      };

      const finalAudit = {
        id: 'audit_' + Date.now(),
        timestamp: new Date().toISOString(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        title: text.substring(0, text.indexOf('\n') > 0 ? text.indexOf('\n') : 35).trim() + '...',
        text: text,
        report: consolidatedReport,
        improved: null,
        telemetryData: telemetryData
      };

      // Add to history
      appState.history.unshift(finalAudit);
      if (appState.history.length > MAX_HISTORY) {
        appState.history.pop();
      }
      appState.currentAuditId = finalAudit.id;
      
      saveHistory();
      renderReportDashboard(consolidatedReport, finalAudit.time);
      renderDebugVisualizer(telemetryData);
      elBtnImprove.disabled = false;
      
      clearInterval(timerInterval);
      showToast('Audit complete!', 'success');
    } catch (error) {
      clearInterval(timerInterval);
      console.error('Audit orchestrator failed', error);
      elLoadingBanner.classList.add('hidden');
      if (appState.currentAuditId) {
        if (elDashboardPanel) elDashboardPanel.classList.remove('hidden');
      } else {
        if (elWelcomePanel) elWelcomePanel.classList.remove('hidden');
      }
      showToast(`Audit failed: ${error.message}`, 'error');
    }
  }

  // --- Real-time Draft Rewriter using suggestions ---
  async function performImprovement() {
    if (!appState.currentAuditId) return;
    const currentAudit = appState.history.find(x => x.id === appState.currentAuditId);
    if (!currentAudit) return;

    if (!appState.apiKey) {
      showToast('API Key is missing. Please save your API key.', 'error');
      return;
    }

    if (elWelcomePanel) elWelcomePanel.classList.add('hidden');
    if (elDashboardPanel) elDashboardPanel.classList.remove('hidden');
    elLoadingBanner.classList.remove('hidden');
    
    elConsoleStatusText.textContent = 'Rewriting draft content to resolve weaknesses...';
    elConsoleProgressBar.style.width = '50%';
    elConsoleTimer.textContent = 'Elapsed: --s';

    const suggestionsList = currentAudit.report.suggestions.map(s => `- ${s}`).join('\n');
    const weaknessesList = currentAudit.report.weaknesses.map(w => `- ${w}`).join('\n');

    const improvePrompt = `You are a world-class copywriter and editor. Rewrite this content to resolve the following weaknesses and suggestions while preserving the core message:
    
WEAKNESSES IN DRAFT:
${weaknessesList}

IMPROVEMENT SUGGESTIONS:
${suggestionsList}

Guidelines:
1. Preserve original facts, core meaning, and intent.
2. Remove slop: clear fluff, generic expressions, and buzzwords.
3. specific: add illustrative references or logical examples.
4. actionability: structure take-aways using bullet points or bold labels.

Return ONLY a valid JSON response:
{
  "improvedContent": string, // full rewritten draft text
  "changesMade": string[] // list of 3-5 changes made
}
Do not include any Markdown wrappers. Return only the raw JSON.

ORIGINAL DRAFT:
${currentAudit.text}`;

    try {
      const res = await callGeminiAPI(improvePrompt);
      const result = parseJSONResponse(res.text);

      currentAudit.improved = result;
      saveHistory();

      renderReportDashboard(currentAudit.report, currentAudit.time, result);
      renderDebugVisualizer(currentAudit.telemetryData || {});
      elLoadingBanner.classList.add('hidden');
      
      switchTab('tab-improved');
      showToast('Content successfully improved!', 'success');
    } catch (error) {
      console.error('Improvement failed', error);
      elLoadingBanner.classList.add('hidden');
      showToast(`Improvement failed: ${error.message}`, 'error');
    }
  }

  // --- Navigation and tab switcher helpers ---
  function switchToDashboardView() {
    elNavDashboard.classList.add('active');
    elNavHistory.classList.remove('active');
    elHistoryView.classList.add('hidden');
    
    // Switch main view
    elMainView.classList.remove('hidden');
    if (appState.currentAuditId) {
      if (elWelcomePanel) elWelcomePanel.classList.add('hidden');
      if (elDashboardPanel) elDashboardPanel.classList.remove('hidden');
    } else {
      if (elWelcomePanel) elWelcomePanel.classList.remove('hidden');
      if (elDashboardPanel) elDashboardPanel.classList.add('hidden');
    }
  }

  function switchToHistoryView() {
    elNavHistory.classList.add('active');
    elNavDashboard.classList.remove('active');
    elMainView.classList.add('hidden');
    elHistoryView.classList.remove('hidden');
    renderHistoryList();
  }

  // --- Export Actions ---
  function copyReportToClipboard() {
    if (!appState.currentAuditId) return;
    const audit = appState.history.find(x => x.id === appState.currentAuditId);
    if (!audit) return;
    
    const r = audit.report;
    const text = `
PRISM Q Quality Report
=============================================
Overall Quality: ${r.metrics.overallQuality}/100
Content Value Score: ${r.metrics.contentValue}/100
Readability: ${r.metrics.readability}/100
Specificity: ${r.metrics.specificity}/100
Argument Quality: ${r.metrics.overallQuality}/100
=============================================

EXECUTIVE SUMMARY
---------------------------------------------
${r.summary}

KEY STRENGTHS
---------------------------------------------
${r.strengths.map(s => `- ${s}`).join('\n')}

KEY WEAKNESSES
---------------------------------------------
${r.weaknesses.map(w => `- ${w}`).join('\n')}

IMPROVEMENT SUGGESTIONS
---------------------------------------------
${r.suggestions.map(s => `- ${s}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text).then(() => {
      showToast('Report copied to clipboard', 'success');
    }).catch(err => {
      showToast('Failed to copy text', 'error');
    });
  }

  function downloadJSONReport() {
    if (!appState.currentAuditId) return;
    const audit = appState.history.find(x => x.id === appState.currentAuditId);
    if (!audit) return;

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(audit, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `prism_q_report_${audit.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('JSON report download started', 'success');
  }

  function copyImprovedDraft() {
    if (!appState.currentAuditId) return;
    const audit = appState.history.find(x => x.id === appState.currentAuditId);
    if (!audit || !audit.improved) return;

    navigator.clipboard.writeText(audit.improved.improvedContent).then(() => {
      showToast('Improved draft copied to clipboard', 'success');
    }).catch(err => {
      showToast('Failed to copy text', 'error');
    });
  }

  // --- Utility Helpers ---
  function escapeHtml(unsafe) {
    if (typeof unsafe !== 'string') return '';
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
  }

  function switchTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    document.querySelectorAll('.tab-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === tabId);
    });
  }

  // --- Event Listeners ---
  function setupEventListeners() {
    // Landing Page Transitions
    const transitionToApp = () => {
      const isDemoChecked = elToggleDemoContent && elToggleDemoContent.checked;
      if (isDemoChecked) {
        if (elContentInput) elContentInput.value = DEMO_CONTENT;
        updateTextStats();
        updateLineNumbers();
        showToast('Demo content loaded into draft input', 'success');
      }
      if (elLandingPage) elLandingPage.classList.add('hidden');
      if (elDashboardPage) elDashboardPage.classList.remove('hidden');
    };

    if (elBtnGetStarted) elBtnGetStarted.addEventListener('click', transitionToApp);
    if (elBtnLaunchApp) elBtnLaunchApp.addEventListener('click', transitionToApp);

    const elBtnNavFeatures = document.getElementById('btn-nav-features');
    if (elBtnNavFeatures) {
      elBtnNavFeatures.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Prism Q leverages 4 independent AI agents to score readability, specificity, arguments, and slop.', 'info');
      });
    }
    
    const elBtnNavAbout = document.getElementById('btn-nav-about');
    if (elBtnNavAbout) {
      elBtnNavAbout.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Multi-agent content verification system powered by Gemini 2.5.', 'info');
      });
    }

    // Settings Drawer Toggles
    elBtnSettingsToggle.addEventListener('click', () => {
      elSettingsDrawer.classList.toggle('hidden');
    });
    elBtnSettingsClose.addEventListener('click', () => {
      elSettingsDrawer.classList.add('hidden');
    });

    // Top nav switching
    elNavDashboard.addEventListener('click', (e) => {
      e.preventDefault();
      switchToDashboardView();
    });

    elNavHistory.addEventListener('click', (e) => {
      e.preventDefault();
      switchToHistoryView();
    });
    
    // Placeholder links alerts
    const placeholderTabs = [elNavReportsTab, elNavInsightsTab, elNavSettingsTab];
    placeholderTabs.forEach(tab => {
      if (tab) {
        tab.addEventListener('click', (e) => {
          e.preventDefault();
          showToast(`${tab.textContent} panel will be available in future releases.`, 'info');
        });
      }
    });

    elToggleApiKey.addEventListener('click', () => {
      const isPassword = elApiKey.type === 'password';
      elApiKey.type = isPassword ? 'text' : 'password';
      elEyeIcon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
      if (window.lucide) window.lucide.createIcons();
    });

    elBtnSaveKey.addEventListener('click', () => {
      saveSettings();
      elSettingsDrawer.classList.add('hidden');
    });
    
    // Main history view clear
    elBtnClearHistoryMain.addEventListener('click', clearAllHistory);
    
    // Smart character/word counter and Line numbers update
    elContentInput.addEventListener('input', () => {
      updateTextStats();
      updateLineNumbers();
    });

    elContentInput.addEventListener('scroll', () => {
      if (elEditorGutter) {
        elEditorGutter.scrollTop = elContentInput.scrollTop;
      }
    });
    
    // Try Sample Content trigger
    elBtnDemo.addEventListener('click', () => {
      elContentInput.value = DEMO_CONTENT;
      updateTextStats();
      updateLineNumbers();
      showToast('Low-quality sample loaded', 'success');
    });
    
    // Action Buttons
    elBtnAudit.addEventListener('click', performAudit);
    elBtnImprove.addEventListener('click', performImprovement);
    
    // Exports
    elBtnCopyReport.addEventListener('click', copyReportToClipboard);
    elBtnDownloadJson.addEventListener('click', downloadJSONReport);
    elBtnCopyImproved.addEventListener('click', copyImprovedDraft);
    
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        switchTab(btn.dataset.tab);
      });
    });

    // --- Media Attachment Event Listeners ---
    if (elBtnAttachmentTrigger) {
      elBtnAttachmentTrigger.addEventListener('click', openAttachmentModal);
    }
    if (elBtnModalClose) {
      elBtnModalClose.addEventListener('click', closeAttachmentModal);
    }

    if (elOptionUploadImage) {
      elOptionUploadImage.addEventListener('click', () => {
        if (elFileInputImage) elFileInputImage.click();
      });
    }
    if (elFileInputImage) {
      elFileInputImage.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        if (file.size > 5 * 1024 * 1024) {
          showToast('Image size exceeds 5MB limit.', 'error');
          elFileInputImage.value = '';
          return;
        }

        handleImageOCR(file);
        elFileInputImage.value = '';
      });
    }

    if (elOptionUploadDoc) {
      elOptionUploadDoc.addEventListener('click', () => {
        if (elFileInputDoc) elFileInputDoc.click();
      });
    }
    if (elFileInputDoc) {
      elFileInputDoc.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) {
          showToast('File size exceeds 10MB limit.', 'error');
          elFileInputDoc.value = '';
          return;
        }

        if (file.name.endsWith('.pdf')) {
          handlePDFFile(file);
        } else {
          handleTextFile(file);
        }
        elFileInputDoc.value = '';
      });
    }

    if (elOptionInputUrl) {
      elOptionInputUrl.addEventListener('click', (e) => {
        e.stopPropagation();
        if (elUrlInputContainer) {
          elUrlInputContainer.classList.toggle('hidden');
          if (!elUrlInputContainer.classList.contains('hidden') && elAttachmentUrlField) {
            elAttachmentUrlField.focus();
          }
        }
      });
    }

    if (elBtnImportUrl) {
      elBtnImportUrl.addEventListener('click', () => {
        if (elAttachmentUrlField) {
          const url = elAttachmentUrlField.value.trim();
          if (url) {
            handleUrlImport(url);
          } else {
            showToast('Please enter a valid URL', 'error');
          }
        }
      });
    }
    
    if (elAttachmentUrlField) {
      elAttachmentUrlField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const url = elAttachmentUrlField.value.trim();
          if (url) {
            handleUrlImport(url);
          } else {
            showToast('Please enter a valid URL', 'error');
          }
        }
      });
    }

    if (elAttachmentModal) {
      elAttachmentModal.addEventListener('click', (e) => {
        if (e.target === elAttachmentModal) {
          closeAttachmentModal();
        }
      });
    }
  }

  // Run initial configuration
  init();
});
