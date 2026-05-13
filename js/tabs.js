/* =============================================================
   Tabs: switch active section + lazy-load HTML from /sections
   ============================================================= */

// Cache so we only fetch each section once
const loadedSections = new Set();

async function loadSection(sectionEl) {
  if (loadedSections.has(sectionEl.id)) return;
  const src = sectionEl.dataset.src;
  if (!src) return;

  try {
    const res = await fetch(src);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    sectionEl.innerHTML = await res.text();
    loadedSections.add(sectionEl.id);
  } catch (err) {
    sectionEl.innerHTML = `<p style="color:red">Failed to load ${src}: ${err.message}</p>`;
    console.error(err);
  }
}

function showSection(sectionId, clickedTab) {
  // Deactivate all sections + tabs
  document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

  // Activate the chosen ones
  const section = document.getElementById(sectionId);
  section.classList.add('active');
  if (clickedTab) clickedTab.classList.add('active');

  // Load content on first visit
  loadSection(section);
}

// Load the initially-active section on page load
document.addEventListener('DOMContentLoaded', () => {
  const initial = document.querySelector('.content-section.active');
  if (initial) loadSection(initial);
});
