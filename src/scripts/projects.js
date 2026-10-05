// Projects Data & Modal Interactive Module

export const projectsData = [
  {
    id: 'algo-visualizer',
    title: 'Interactive Algorithm & Data Structure Visualizer',
    summary: 'A high-performance visualizer for sorting, graph traversals (Dijkstra, A*), and dynamic programming algorithms with speed controls.',
    image: '/assets/images/project-algo.png',
    tags: ['C++', 'JavaScript', 'HTML5 Canvas', 'Data Structures'],
    github: 'https://github.com/adarsh-chouhan/algo-visualizer',
    demo: '#',
    details: 'Built to demonstrate algorithmic complexity (Time & Space) through real-time step-by-step canvas animations. Features interactive node creation, custom graph weight assignment, and instant execution comparison.'
  },
  {
    id: 'ai-code-assistant',
    title: 'AI Code Assistant & Complexity Analyzer',
    summary: 'Developer platform that leverages AI models to review code syntax, suggest asymptotic complexity (Big-O) optimizations, and generate unit tests.',
    image: '/assets/images/project-ai.png',
    tags: ['React', 'Node.js', 'REST API', 'AI Integration'],
    github: 'https://github.com/adarsh-chouhan/ai-code-assistant',
    demo: '#',
    details: 'Integrates syntax parsing with AI prompt pipelines to analyze code snippets submitted by developers. Provides instant insights into time/space efficiency improvements, edge cases, and automated test suite generation.'
  },
  {
    id: 'analytics-dashboard',
    title: 'Full-Stack Real-Time Analytics & Store Platform',
    summary: 'A full-featured web dashboard providing live sales metrics, customer analytics, product management, and responsive data charts.',
    image: '/assets/images/project-analytics.png',
    tags: ['JavaScript', 'Express.js', 'SQL', 'Chart.js', 'CSS Glassmorphism'],
    github: 'https://github.com/adarsh-chouhan/analytics-dashboard',
    demo: '#',
    details: 'Designed with a sleek dark-mode glassmorphic interface, secure RESTful API backend, relational database schema, and live client side data updates for business decision making.'
  }
];

export function renderProjects() {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  container.innerHTML = projectsData.map(project => `
    <div class="glass-card project-card">
      <div class="project-img-wrap">
        <img src="${project.image}" alt="${project.title}" loading="lazy" />
        <div class="project-overlay">
          <button class="btn btn-primary btn-sm open-modal-btn" data-id="${project.id}">
            <i class="fa-solid fa-eye"></i> View Details
          </button>
          <a href="${project.github}" target="_blank" class="social-icon-btn" title="View Source Code">
            <i class="fa-brands fa-github"></i>
          </a>
        </div>
      </div>
      <div class="project-body">
        <div class="project-tags">
          ${project.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
        </div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-summary">${project.summary}</p>
        <button class="btn btn-outline open-modal-btn" data-id="${project.id}">
          Learn More <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  `).join('');

  attachModalListeners();
}

function attachModalListeners() {
  const openBtns = document.querySelectorAll('.open-modal-btn');
  const modalOverlay = document.getElementById('project-modal');
  const modalBox = document.querySelector('#project-modal .modal-content-area');
  const closeBtn = document.getElementById('close-modal-btn');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const project = projectsData.find(p => p.id === id);
      if (project && modalOverlay && modalBox) {
        modalBox.innerHTML = `
          <h2 class="project-title" style="font-size: 1.8rem; margin-bottom: 0.5rem;">${project.title}</h2>
          <div class="project-tags" style="margin-bottom: 1.2rem;">
            ${project.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}
          </div>
          <div style="width:100%; max-height:260px; overflow:hidden; border-radius:12px; margin-bottom:1.2rem;">
            <img src="${project.image}" alt="${project.title}" style="width:100%; height:100%; object-fit:cover;" />
          </div>
          <p style="color: var(--text-secondary); font-size: 1.05rem; line-height: 1.6; margin-bottom: 1.5rem;">
            ${project.details}
          </p>
          <div style="display:flex; gap:1rem;">
            <a href="${project.github}" target="_blank" class="btn btn-primary">
              <i class="fa-brands fa-github"></i> GitHub Code
            </a>
            <button class="btn btn-outline" onclick="document.getElementById('project-modal').classList.remove('active')">
              Close
            </button>
          </div>
        `;
        modalOverlay.classList.add('active');
      }
    });
  });

  if (closeBtn && modalOverlay) {
    closeBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }
}
