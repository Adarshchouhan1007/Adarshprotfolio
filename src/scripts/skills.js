// Skills & Technology Stack Data & Interactions

export const skillsData = [
  {
    name: 'C++ & Data Structures',
    category: 'cs',
    icon: 'fa-solid fa-code',
    desc: 'Advanced problem solving, STL, memory management, & complexity optimization.',
    level: 95
  },
  {
    name: 'Java / OOPs',
    category: 'languages',
    icon: 'fa-brands fa-java',
    desc: 'Object-oriented architecture, collections framework, multi-threading basics.',
    level: 88
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'languages',
    icon: 'fa-brands fa-js',
    desc: 'Async programming, DOM manipulation, functional programming patterns.',
    level: 90
  },
  {
    name: 'HTML5 & CSS3',
    category: 'frontend',
    icon: 'fa-brands fa-html5',
    desc: 'Responsive web design, Flexbox, Grid, CSS animations, Glassmorphism.',
    level: 92
  },
  {
    name: 'React.js',
    category: 'frontend',
    icon: 'fa-brands fa-react',
    desc: 'Component architecture, hooks, state management, SPA routing.',
    level: 85
  },
  {
    name: 'Node.js & Express',
    category: 'backend',
    icon: 'fa-brands fa-node-js',
    desc: 'RESTful API development, server middleware, authentication.',
    level: 82
  },
  {
    name: 'SQL & Database Design',
    category: 'backend',
    icon: 'fa-solid fa-database',
    desc: 'Relational database schema modeling, queries, index optimizations.',
    level: 85
  },
  {
    name: 'Algorithms & Dynamic Programming',
    category: 'cs',
    icon: 'fa-solid fa-diagram-project',
    desc: 'Graphs, Trees, DP optimization, Greedy algorithms, Greedy strategy.',
    level: 92
  },
  {
    name: 'Git & GitHub',
    category: 'tools',
    icon: 'fa-brands fa-github',
    desc: 'Version control, branching workflows, pull requests, collaborative dev.',
    level: 90
  },
  {
    name: 'VS Code & DevTools',
    category: 'tools',
    icon: 'fa-solid fa-terminal',
    desc: 'Advanced debugging, extensions workspace setup, browser profiling.',
    level: 95
  }
];

export function renderSkills(filterCategory = 'all') {
  const container = document.getElementById('skills-grid');
  if (!container) return;

  const filtered = filterCategory === 'all' 
    ? skillsData 
    : skillsData.filter(s => s.category === filterCategory);

  container.innerHTML = filtered.map(skill => `
    <div class="glass-card skill-card" data-category="${skill.category}">
      <div class="skill-icon-box">
        <i class="${skill.icon}"></i>
      </div>
      <div class="skill-info">
        <h4 class="skill-name">${skill.name}</h4>
        <p class="skill-desc">${skill.desc}</p>
        <div class="skill-level-bar">
          <div class="skill-level-fill" style="width: ${skill.level}%"></div>
        </div>
      </div>
    </div>
  `).join('');
}

export function initSkillsFilter() {
  renderSkills('all');

  const filterBtns = document.querySelectorAll('.skills-filter-nav .filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      renderSkills(cat);
    });
  });
}
