/* "Ask about Amit" chatbot.
 * Runs entirely in the browser: questions are matched against the knowledge
 * base below, so there's no API key and nothing to host. To change what the
 * bot says, edit KB. Each entry has keywords (single words or phrases) and an
 * answer (HTML). The entry with the most keyword hits wins.
 */
(function () {
  'use strict';

  var LINKS = {
    linkedin: 'https://www.linkedin.com/in/amitpnk/',
    github: 'https://github.com/Amitpnk',
    medium: 'https://amit-naik.medium.com/',
    x: 'https://x.com/amitpnk',
    strava: 'https://www.strava.com/athletes/114731105',
    topmate: 'https://topmate.io/amitpnk',
    email: 'mailto:amit.naik8103@gmail.com'
  };

  function a(href, text) {
    return '<a href="' + href + '" target="_blank" rel="noopener">' + text + '</a>';
  }

  var KB = [
    {
      id: 'greet',
      keywords: ['hi', 'hello', 'hey', 'hola', 'namaste', 'good morning', 'good evening', 'yo'],
      answer: "Hi! 👋 I can answer questions about Amit: his work, skills, courses, education, hobbies or how to get in touch. What would you like to know?"
    },
    {
      id: 'about',
      keywords: ['who', 'about', 'amit', 'yourself', 'introduce', 'introduction', 'bio', 'summary'],
      answer: "Amit Naik is a <b>Staff Engineer at Commonwealth Bank (CBA)</b> in Bengaluru with 15+ years of experience. He designs scalable, cloud-native systems with .NET, Azure and microservices, and now focuses on <b>Generative and Agentic AI</b>: LLM agents, RAG and Graph RAG pipelines, and the evals and guardrails that get them into production. He also teaches what he builds, through workshops, a YouTube series and courses."
    },
    {
      id: 'current',
      keywords: ['current', 'currently', 'now', 'job', 'role', 'cba', 'commonwealth', 'commbank', 'bank', 'work', 'working', 'company', 'employer', 'staff engineer', 'position', 'designation'],
      answer: "Since <b>January 2026</b> Amit has been a <b>Staff Engineer at Commonwealth Bank (CBA)</b> in Bengaluru. He leads technically across teams (architecture direction, design reviews, engineering standards), drives adoption of Generative AI and AI-assisted development, and mentors engineers and tech leads."
    },
    {
      id: 'experience',
      keywords: ['experience', 'career', 'history', 'previous', 'past', 'companies', 'worked', 'employment', 'years', 'background', 'resume', 'cv'],
      answer: "Amit has 15+ years in the industry:<ul>" +
        "<li><b>Commonwealth Bank</b>: Staff Engineer (Jan 2026 – present)</li>" +
        "<li><b>Honeywell</b>: Software Architect (Jul 2021 – Dec 2025)</li>" +
        "<li><b>Société Générale</b> (May 2017 – Jun 2021)</li>" +
        "<li><b>Infosys</b> (Aug 2014 – May 2017)</li>" +
        "<li><b>Chimera Technologies</b> (Mar 2013 – Jul 2014)</li>" +
        "<li><b>Agni Software</b> (Sep 2011 – Mar 2013)</li>" +
        "<li><b>National Informatics Centre</b> (Nov 2009 – Aug 2011)</li></ul>" +
        "Ask about any one of them for details, or see the <a href=\"#resume\">Resume</a> section."
    },
    {
      id: 'honeywell',
      keywords: ['honeywell', 'architect', 'gate management', 'hboc', 'roi engine', 'forge', 'niagara'],
      answer: "At <b>Honeywell</b> (Jul 2021 – Dec 2025) Amit was a <b>Software Architect</b>, building enterprise solutions on microservices, secure APIs and containers in AKS (.NET 8, React, gRPC, GraphQL, PostgreSQL, Service Bus, RabbitMQ). Projects included a real-time <b>Gate Management System</b> (UVSS, LPR and X-ray integration), the <b>HBOC OS</b> remote services portal, and the <b>ROI Engine</b> APIs for Honeywell Forge."
    },
    {
      id: 'socgen',
      keywords: ['societe', 'société', 'generale', 'générale', 'socgen', 'sg', 'cdm', 'abacus', 'trading'],
      answer: "At <b>Société Générale</b> (May 2017 – Jun 2021) Amit built KPI and analytics tools for the FIC business (<b>CDM-Historical</b>), modular trading dashboards with Preact and Web Components that replaced Tableau (<b>CDM Widget</b>), profitability tools (<b>Abacus</b>) and an Angular broadcast platform. He also mentored developers through code and architecture reviews."
    },
    {
      id: 'infosys',
      keywords: ['infosys', 'recon', 'icas', 'airtel', 'digital tutor'],
      answer: "At <b>Infosys</b> (Aug 2014 – May 2017) Amit designed enterprise finance modules (Recon, ICAS) with C#, ASP.NET MVC, AngularJS and SSIS, provided technical leadership and training, and created Digital Tutor content. He won the <b>Top Contributor (1st rank)</b> award and an <b>Individual Extra Miler Award</b> for the Airtel Africa Money recon solution."
    },
    {
      id: 'early',
      keywords: ['chimera', 'agni', 'nic', 'national informatics', 'first job', 'started', 'fresher', 'early', 'evahan'],
      answer: "Amit started at the <b>National Informatics Centre</b> (2009–2011) on e-Governance systems such as a Student Information System and eVahan (RTO). He then built ERP modules at <b>Agni Software</b> (2011–2013) and telecom reporting dashboards at <b>Chimera Technologies</b> (2013–2014)."
    },
    {
      id: 'skills',
      keywords: ['skill', 'skills', 'tech', 'technology', 'technologies', 'stack', 'languages', 'tools', 'expertise', 'good at', 'know', 'dotnet', '.net', 'c#', 'python', 'react', 'azure', 'aws', 'docker', 'kubernetes', 'fastapi'],
      answer: "Amit's strengths, with AI engineering built on a backend and architecture foundation:<ul>" +
        "<li>.NET / ASP.NET Core and architecture &amp; design patterns</li>" +
        "<li>Generative &amp; Agentic AI, RAG, Graph RAG and MCP</li>" +
        "<li>Azure &amp; AWS, Docker &amp; Kubernetes</li>" +
        "<li>Python &amp; FastAPI, React</li></ul>"
    },
    {
      id: 'ai',
      keywords: ['ai', 'genai', 'generative', 'agentic', 'agent', 'agents', 'llm', 'rag', 'mcp', 'machine learning', 'ml', 'evals', 'guardrails', 'gpt', 'claude'],
      answer: "AI is Amit's main focus now. He builds LLM-powered <b>agents</b>, <b>RAG and Graph RAG</b> pipelines, <b>MCP</b> integrations, and the platforms, evals and guardrails that get them into production. At CBA he drives adoption of GenAI and AI-assisted development. He also teaches it; ask me about his courses."
    },
    {
      id: 'fde',
      keywords: ['forward deployed', 'forward deploy', 'forward deployment', 'fde'],
      answer: "Amit works as a <b>Forward Deployed Engineer</b> too: taking AI systems from prototype to production alongside the teams that use them. He also wrote the " + a('https://github.com/Amitpnk/ai-forward-deployment-engineer-course', 'AI Forward Deployment Engineer course') + ", covering ML, deep learning, transformers, GenAI, agents, cloud and DevOps, organised around the real FDE job."
    },
    {
      id: 'courses',
      keywords: ['course', 'courses', 'teach', 'teaching', 'trainer', 'training', 'workshop', 'workshops', 'tutorial', 'tutorials', 'learn', 'learning', 'youtube', 'video', 'videos', 'roadmap', 'graph rag', 'claude code'],
      answer: "Amit is an AI course author and trainer. Everything is open on GitHub:<ul>" +
        "<li>" + a('https://amitpnk.github.io/Agentic-AI-From-Zero/', 'Agentic AI From Zero') + ": a two-day hands-on workshop</li>" +
        "<li>" + a('https://github.com/Amitpnk/genai-zero-to-production', 'GenAI Engineering: Zero to Production') + ": YouTube series, from first API call to a production agent on AWS</li>" +
        "<li>" + a('https://github.com/Amitpnk/claude-code', 'Learn Claude Code the Right Way') + ": 15 videos on disciplined AI-assisted development</li>" +
        "<li>" + a('https://github.com/Amitpnk/Graph-RAG-Build-Knowledge-Graph-Powered-Retrieval-Systems', 'Graph RAG') + ": knowledge-graph-powered retrieval</li>" +
        "<li>" + a('https://github.com/Amitpnk/ai-forward-deployment-engineer-course', 'AI Forward Deployment Engineer') + "</li>" +
        "<li>" + a('https://github.com/Amitpnk/modern-ai-engineering', 'Modern AI Engineering') + ": a learning roadmap</li></ul>" +
        "There are also tutorials on Design Patterns, Web API and Angular. See the <a href=\"#tutorial\">Courses</a> section."
    },
    {
      id: 'education',
      keywords: ['education', 'study', 'studied', 'degree', 'college', 'university', 'qualification', 'bits', 'pilani', 'mtech', 'masters', 'engineering degree', 'be', 'diploma', 'school'],
      answer: "Amit's education:<ul>" +
        "<li><b>MTech in Software Engineering</b>, BITS Pilani WILP (2024)</li>" +
        "<li><b>BE in Electrical &amp; Electronics</b>, Sir M. Visvesvaraya Institute of Technology, Bengaluru (2008)</li>" +
        "<li><b>Diploma in EEE</b>, RNS Polytechnic, Sirsi (2005)</li></ul>"
    },
    {
      id: 'achievements',
      keywords: ['award', 'awards', 'achievement', 'achievements', 'recognition', 'medal', 'swimming', 'toastmasters', 'proud'],
      answer: "Some highlights:<ul>" +
        "<li>AI course author &amp; trainer (2025 – present)</li>" +
        "<li>Top Contributor (1st rank), Digital Tutor, Infosys</li>" +
        "<li>Individual Extra Miler Award, Infosys</li>" +
        "<li>Workshops on MVC, Web API &amp; AngularJS at Infosys and Chimera</li>" +
        "<li>Toastmasters member at Société Générale</li>" +
        "<li>Bronze medal in state-level swimming, Karnataka</li></ul>"
    },
    {
      id: 'hobbies',
      keywords: ['hobby', 'hobbies', 'free time', 'interests', 'passion', 'passions', 'fun', 'weekend', 'bike', 'biker', 'biking', 'motorcycle', 'motorcycling', 'ride', 'rides', 'cycle', 'cycling', 'cyclist', 'run', 'running', 'runner', 'marathon', 'strava', 'fitness', 'sport', 'sports'],
      answer: "Besides family and friends, Amit's passions are <b>motorcycling, cycling and running</b>, followed closely by software and AI. His activities sync from " + a(LINKS.strava, 'Strava') + ", and you can see them on the <a href=\"cycling.html\">Cycling</a> and <a href=\"running.html\">Running</a> pages."
    },
    {
      id: 'blog',
      keywords: ['blog', 'blogs', 'article', 'articles', 'write', 'writing', 'medium', 'c# corner', 'codeproject', 'post', 'posts'],
      answer: "Amit writes on " + a(LINKS.medium, 'Medium') + " and has articles on C# Corner and CodeProject, on topics like the factory pattern, SOLID principles, AutoMapper in ASP.NET Core and AngularGrid with Web API. See the <a href=\"#blog\">Blog &amp; Projects</a> section."
    },
    {
      id: 'opensource',
      keywords: ['github', 'open source', 'opensource', 'projects', 'project', 'repo', 'repos', 'starter', 'template', 'code', 'system design'],
      answer: "Open-source work on " + a(LINKS.github, 'GitHub') + ":<ul>" +
        "<li>" + a('https://github.com/Amitpnk/agentic-ai-starter-kits', 'Agentic AI starter kits') + ": production-ready agent templates</li>" +
        "<li>" + a('https://github.com/Amitpnk/fastapi-starter-guide', 'FastAPI starter guide') + "</li>" +
        "<li>" + a('https://github.com/Amitpnk/Onion-architecture-ASP.NET-Core', 'Onion architecture with ASP.NET Core') + "</li>" +
        "<li>" + a('https://github.com/Amitpnk/system-design', 'System design') + ": worked interview problems</li></ul>"
    },
    {
      id: 'contact',
      keywords: ['contact', 'email', 'mail', 'reach', 'connect', 'message', 'talk', 'linkedin', 'twitter', 'x', 'social', 'phone', 'call'],
      answer: "You can reach Amit by " + a(LINKS.email, 'email') + " (amit.naik8103@gmail.com) or on " + a(LINKS.linkedin, 'LinkedIn') + ", " + a(LINKS.x, 'X') + " and " + a(LINKS.github, 'GitHub') + ". For a 1:1 session, book on " + a(LINKS.topmate, 'Topmate') + "."
    },
    {
      id: 'mentoring',
      keywords: ['mentor', 'mentoring', 'mentorship', '1:1', 'one on one', 'topmate', 'book', 'session', 'hire', 'hiring', 'consult', 'consulting', 'available', 'freelance', 'guidance', 'advice'],
      answer: "Amit offers mentoring, AI workshops for teams, and architecture conversations. Book a 1:1 on " + a(LINKS.topmate, 'Topmate') + " or " + a(LINKS.email, 'email him') + "."
    },
    {
      id: 'location',
      keywords: ['where', 'location', 'live', 'lives', 'based', 'city', 'bengaluru', 'bangalore', 'india', 'from', 'hometown', 'sirsi'],
      answer: "Amit lives in <b>Bengaluru, India</b>. He did his diploma in Sirsi, Karnataka."
    },
    {
      id: 'motto',
      keywords: ['motto', 'quote', 'philosophy', 'believe', 'tagline'],
      answer: "His motto: <i>“Be deserve before you desire.”</i>"
    },
    {
      id: 'thanks',
      keywords: ['thanks', 'thank', 'thx', 'cool', 'great', 'awesome', 'nice', 'bye', 'goodbye', 'ok', 'okay'],
      answer: "Happy to help! Anything else you'd like to know about Amit?"
    }
  ];

  var SUGGESTIONS = ['Who is Amit?', 'Current role', 'Skills', 'Courses', 'Hobbies', 'Contact'];

  var FALLBACK = "Sorry, I don't have an answer for that. I can tell you about Amit's <b>work</b>, <b>skills</b>, <b>AI focus</b>, <b>courses</b>, <b>education</b>, <b>hobbies</b> or how to <b>contact</b> him. For anything else, " + a(LINKS.email, 'email Amit') + " directly.";

  function normalise(s) {
    return ' ' + s.toLowerCase().replace(/[^a-z0-9#.:éè\s]/g, ' ').replace(/\s+/g, ' ').trim() + ' ';
  }

  function findAnswer(question) {
    var q = normalise(question);
    var best = null, bestScore = 0;
    KB.forEach(function (entry) {
      var score = 0;
      entry.keywords.forEach(function (k) {
        if (q.indexOf(' ' + k + ' ') !== -1) score += k.indexOf(' ') !== -1 ? 3 : (k.length <= 2 ? 0.5 : 1);
      });
      // Greetings and thanks only win when nothing more specific matched.
      if (entry.id === 'greet' || entry.id === 'thanks') score *= 0.5;
      if (score > bestScore) { bestScore = score; best = entry; }
    });
    return best ? best.answer : FALLBACK;
  }

  // ---- UI ----
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Which chat button to show:
  //   'avatar'  = cartoon Amit who waves "Hi!" and puts on a helmet to ride across the button
  //   'biker'   = robot in a motorcycle helmet that rides across the button
  //   'classic' = the plain robot with an antenna
  var ICON_STYLE = 'biker';

  var BIKE =
    '<g class="cb-bike">' +
      '<line x1="-6" y1="44" x2="4" y2="44" class="cb-speed"/><line x1="-10" y1="50" x2="2" y2="50" class="cb-speed"/><line x1="-4" y1="56" x2="6" y2="56" class="cb-speed"/>' +
      '<g class="cb-wheel"><circle cx="16" cy="55" r="7"/><line x1="16" y1="48" x2="16" y2="62"/><line x1="9" y1="55" x2="23" y2="55"/></g>' +
      '<g class="cb-wheel"><circle cx="48" cy="55" r="7"/><line x1="48" y1="48" x2="48" y2="62"/><line x1="41" y1="55" x2="55" y2="55"/></g>' +
      '<path d="M16 55 L26 45 L42 45 L48 55" class="cb-frame"/>' +
      '<path d="M42 45 L45 37 L50 36" class="cb-frame"/>' +
      '<rect x="24" y="39" width="16" height="7" rx="3.5" class="cb-tank"/>' +
    '</g>';

  var ZZZ = '<g class="cb-zzz"><text x="50" y="12">z</text><text x="50" y="12">z</text><text x="50" y="12">Z</text></g>';

  var ROBOT_FACE =
    '<line x1="32" y1="14" x2="32" y2="6" class="cb-antenna"/>' +
    '<circle cx="32" cy="6" r="4" class="cb-bulb"/>' +
    '<rect x="8" y="14" width="48" height="40" rx="14" class="cb-head"/>' +
    '<rect x="3" y="28" width="6" height="12" rx="3" class="cb-ear"/>' +
    '<rect x="55" y="28" width="6" height="12" rx="3" class="cb-ear"/>' +
    '<g class="cb-look"><g class="cb-eyes"><circle cx="23" cy="31" r="5"/><circle cx="41" cy="31" r="5"/></g></g>' +
    '<path d="M18 31 Q23 35 28 31 M36 31 Q41 35 46 31" class="cb-sleep-eyes"/>' +
    '<circle cx="32" cy="44" r="3.5" class="cb-o"/>' + ZZZ +
    '<circle cx="16" cy="41" r="3" class="cb-cheek"/><circle cx="48" cy="41" r="3" class="cb-cheek"/>' +
    '<path d="M24 42 Q32 49 40 42" class="cb-mouth"/>' +
    '<g class="cb-helmet">' +
      '<path d="M5 25 Q5 3 32 3 Q59 3 59 25 Z" class="cb-shell"/>' +
      '<path d="M29 3.2 L35 3.2 L35 22 L29 22 Z" class="cb-stripe"/>' +
      '<rect x="3" y="21" width="58" height="5" rx="2.5" class="cb-visor"/>' +
    '</g>';

  // Cartoon Amit, based on the profile photo: swept-up black hair, light stubble, beige shirt.
  var AVATAR_FACE =
    '<path d="M12 64 Q13 51 32 50 Q51 51 52 64 Z" class="av-shirt"/>' +
    '<path d="M26 50 L32 57 L38 50 Z" class="av-collar"/>' +
    '<rect x="27" y="42" width="10" height="10" rx="3" class="av-skin"/>' +
    '<circle cx="15" cy="32" r="4" class="av-skin"/><circle cx="49" cy="32" r="4" class="av-skin"/>' +
    '<ellipse cx="32" cy="31" rx="16" ry="18" class="av-skin"/>' +
    '<path d="M17 36 Q20 48 32 49 Q44 48 47 36 Q44 44 32 45 Q20 44 17 36 Z" class="av-stubble"/>' +
    '<path d="M15 30 Q12 14 22 9 Q26 2 36 4 Q46 3 49 12 Q52 20 49 30 Q47 20 40 18 Q33 16 26 19 Q19 21 15 30 Z" class="av-hair"/>' +
    '<path d="M22 9 Q30 -1 42 5 Q34 4 28 9 Z" class="av-hair"/>' +
    '<path d="M21 25 Q25 23 29 25 M35 25 Q39 23 43 25" class="av-brow"/>' +
    '<g class="cb-look"><g class="cb-eyes"><circle cx="25" cy="30" r="2.6"/><circle cx="39" cy="30" r="2.6"/></g></g>' +
    '<path d="M22 30 Q25 33 28 30 M36 30 Q39 33 42 30" class="cb-sleep-eyes"/>' +
    '<path d="M32 31 Q30 36 32 37 Q33 37 34 36.5" class="av-nose"/>' +
    '<circle cx="32" cy="42" r="2.5" class="cb-o"/>' +
    '<path d="M26 40 Q32 45 38 40" class="cb-mouth"/>' + ZZZ +
    '<g class="cb-helmet">' +
      '<path d="M11 31 Q10 3 32 3 Q54 3 53 31 L49 31 Q48 17 32 17 Q16 17 15 31 Z" class="cb-shell"/>' +
      '<path d="M29 3.2 L35 3.2 L35 17 L29 17 Z" class="cb-stripe"/>' +
      '<rect x="14" y="15" width="36" height="4" rx="2" class="cb-visor"/>' +
    '</g>' +
    // Waving hand, pivoting at the wrist
    '<g class="av-hand">' +
      '<rect x="56.0" y="44" width="5" height="14" rx="2.5" class="av-skin"/>' +
      '<circle cx="58.5" cy="42" r="5" class="av-skin"/>' +
      '<rect x="53.5" y="33" width="2.6" height="8" rx="1.3" class="av-skin"/>' +
      '<rect x="56.5" y="31" width="2.6" height="9" rx="1.3" class="av-skin"/>' +
      '<rect x="59.5" y="32" width="2.6" height="8" rx="1.3" class="av-skin"/>' +
      '<rect x="62.2" y="35" width="2.4" height="7" rx="1.2" class="av-skin"/>' +
    '</g>';

  function init() {
    var isAvatar = ICON_STYLE === 'avatar';
    var rides = ICON_STYLE === 'biker' || isAvatar;
    var ROBOT =
      '<span class="chatbot-clip"><svg class="chatbot-robot" viewBox="0 0 64 64" aria-hidden="true">' +
        BIKE + '<g class="cb-rider">' + (isAvatar ? AVATAR_FACE : ROBOT_FACE) + '</g>' +
      '</svg></span>';
    var toggle = el('button', 'chatbot-toggle' + (rides ? ' biker' : '') + (isAvatar ? ' avatar' : ''),
      ROBOT + '<i class="bx bx-x chatbot-x"></i>');
    var bubble = el('div', 'chatbot-bubble',
      isAvatar ? "Hi! I'm Amit 👋 Ask me anything" :
      ICON_STYLE === 'biker' ? "Vroom! Ask me about Amit 🏍️" : "Psst… ask me about Amit! 👋");
    bubble.setAttribute('aria-hidden', 'true');
    toggle.type = 'button';
    toggle.setAttribute('aria-label', 'Ask about Amit');
    toggle.setAttribute('aria-expanded', 'false');

    var panel = el('div', 'chatbot-panel');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Ask about Amit');
    panel.innerHTML =
      '<div class="chatbot-header"><div><strong>Ask about Amit</strong><span>Answers come from this site</span></div>' +
      '<button type="button" class="chatbot-close" aria-label="Close chat"><i class="bx bx-x"></i></button></div>' +
      '<div class="chatbot-messages" aria-live="polite"></div>' +
      '<div class="chatbot-suggestions"></div>' +
      '<form class="chatbot-form"><input type="text" placeholder="Ask a question…" aria-label="Your question" maxlength="300" autocomplete="off">' +
      '<button type="submit" aria-label="Send"><i class="bx bx-send"></i></button></form>';

    document.body.appendChild(panel);
    document.body.appendChild(toggle);
    document.body.appendChild(bubble);

    // Pop the speech bubble a few times until the visitor opens the chat.
    var opened = false, pops = 0;
    function popBubble() {
      if (opened || pops >= 3) return;
      if (toggle.classList.contains('sleepy')) { setTimeout(popBubble, 5000); return; }
      pops++;
      bubble.classList.add('show');
      setTimeout(function () { bubble.classList.remove('show'); }, 4500);
      setTimeout(popBubble, 20000);
    }
    setTimeout(popBubble, 3000);
    bubble.addEventListener('click', function () { setOpen(true); });

    // Eyes follow the cursor.
    var look = toggle.querySelector('.cb-look');
    var mouse = null, frame = null;
    function updateEyes() {
      frame = null;
      if (!mouse) return;
      var r = toggle.getBoundingClientRect();
      var dx = mouse.x - (r.left + r.width / 2);
      var dy = mouse.y - (r.top + r.height / 2);
      var dist = Math.sqrt(dx * dx + dy * dy) || 1;
      var reach = Math.min(isAvatar ? 2 : 4, dist / 30); // max 4 SVG units, softer when close
      look.style.transform = 'translate(' + (dx / dist * reach).toFixed(2) + 'px,' + (dy / dist * reach).toFixed(2) + 'px)';
    }

    // Falls asleep after a while with no activity; wakes up surprised.
    var SLEEP_AFTER = 12000, idleTimer = null, surpriseTimer = null;
    function goToSleep() {
      if (panel.classList.contains('open')) return resetIdle();
      look.style.transform = '';
      toggle.classList.add('sleepy');
    }
    function resetIdle() {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(goToSleep, SLEEP_AFTER);
    }
    function wake() {
      if (toggle.classList.contains('sleepy')) {
        toggle.classList.remove('sleepy');
        toggle.classList.add('surprised');
        clearTimeout(surpriseTimer);
        surpriseTimer = setTimeout(function () { toggle.classList.remove('surprised'); }, 1200);
      }
      resetIdle();
    }

    document.addEventListener('mousemove', function (e) {
      mouse = { x: e.clientX, y: e.clientY };
      wake();
      if (!frame) frame = requestAnimationFrame(updateEyes);
    }, { passive: true });
    ['scroll', 'touchstart', 'keydown'].forEach(function (ev) {
      window.addEventListener(ev, wake, { passive: true });
    });
    resetIdle();

    // Biker: hop on the bike and zoom across the button every so often.
    if (rides) {
      var RIDE_MS = 2600;
      var ride = function () {
        var busy = panel.classList.contains('open') || toggle.classList.contains('sleepy') ||
          toggle.classList.contains('riding');
        if (!busy) {
          toggle.classList.add('riding');
          setTimeout(function () { toggle.classList.remove('riding'); }, RIDE_MS);
        }
      };
      setTimeout(ride, 1500);
      setInterval(ride, 22000);
      toggle.addEventListener('dblclick', ride);
    }

    // Avatar: wave "Hi!" every few seconds.
    if (isAvatar) {
      var wave = function () {
        if (panel.classList.contains('open') || toggle.classList.contains('sleepy') ||
          toggle.classList.contains('riding')) return;
        toggle.classList.remove('waving');
        void toggle.offsetWidth; // restart the animation
        toggle.classList.add('waving');
        setTimeout(function () { toggle.classList.remove('waving'); }, 1600);
      };
      setTimeout(wave, 4500);
      setInterval(wave, 9000);
    }

    var messages = panel.querySelector('.chatbot-messages');
    var suggestions = panel.querySelector('.chatbot-suggestions');
    var form = panel.querySelector('.chatbot-form');
    var input = form.querySelector('input');
    var greeted = false;

    function add(html, who) {
      var m = el('div', 'chatbot-msg chatbot-' + who, html);
      messages.appendChild(m);
      messages.scrollTop = messages.scrollHeight;
    }

    function ask(text) {
      text = text.trim();
      if (!text) return;
      add(escapeHtml(text), 'user');
      var typing = el('div', 'chatbot-msg chatbot-bot chatbot-typing', '<span></span><span></span><span></span>');
      messages.appendChild(typing);
      messages.scrollTop = messages.scrollHeight;
      setTimeout(function () {
        typing.remove();
        add(findAnswer(text), 'bot');
      }, 450);
    }

    SUGGESTIONS.forEach(function (s) {
      var b = el('button', null, s);
      b.type = 'button';
      b.addEventListener('click', function () { ask(s); });
      suggestions.appendChild(b);
    });

    function setOpen(open) {
      panel.classList.toggle('open', open);
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      bubble.classList.remove('show');
      if (open) opened = true;
      if (open) {
        if (!greeted) {
          add("Hi! 👋 I'm Amit's assistant. Ask me anything about his work, skills, courses or hobbies.", 'bot');
          greeted = true;
        }
        setTimeout(function () { input.focus(); }, 150);
      }
    }

    toggle.addEventListener('click', function () { setOpen(!panel.classList.contains('open')); });
    panel.querySelector('.chatbot-close').addEventListener('click', function () { setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('open')) setOpen(false);
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      ask(input.value);
      input.value = '';
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
