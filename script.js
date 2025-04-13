k// 🚀 script.js - AI Prompt Manager 2030 Ultra Enhanced

// 🌙 Theme Toggle with memory
const toggleThemeBtn = document.getElementById('toggleTheme');
toggleThemeBtn?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
});

// 📦 Prompt Storage
const promptForm = document.getElementById('promptForm');
const promptList = document.getElementById('promptList');
const toast = document.getElementById('toast');
const searchInput = document.getElementById('search');

function showToast(message = 'Saved!') {
  if (!toast) return alert(message);
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function savePrompt(e) {
  e.preventDefault();
  const title = document.getElementById('title')?.value.trim();
  const category = document.getElementById('category')?.value.trim();
  const prompt = document.getElementById('prompt')?.value.trim();

  if (!title || !category || !prompt) return showToast('⚠️ Please fill out all fields.');

  const saved = getPrompts();
  saved.push({ id: Date.now(), title, category, prompt });
  localStorage.setItem('prompts', JSON.stringify(saved));
  promptForm.reset();
  renderPrompts();
  showToast('✅ Prompt saved!');
}

function getPrompts() {
  return JSON.parse(localStorage.getItem('prompts')) || [];
}

function setPrompts(data) {
  localStorage.setItem('prompts', JSON.stringify(data));
}

function renderPrompts() {
  const saved = getPrompts();
  const query = searchInput?.value.toLowerCase() || '';

  if (!promptList) return;
  promptList.innerHTML = '';

  saved.reverse().forEach(({ id, title, category, prompt }) => {
    if (
      title.toLowerCase().includes(query) ||
      category.toLowerCase().includes(query) ||
      prompt.toLowerCase().includes(query)
    ) {
      const card = document.createElement('div');
      card.classList.add('prompt-card');
      card.setAttribute('data-id', id);

      card.innerHTML = `
        <div class="card-header">
          <h3>${title}</h3>
          <span class="badge">${category}</span>
        </div>
        <p class="prompt-preview">${prompt}</p>
        <div class="card-actions">
          <button onclick="copyPrompt('${encodeURIComponent(prompt)}')">📋 Copy</button>
          <button onclick="deletePrompt(${id})">🗑 Delete</button>
        </div>
      `;

      promptList.appendChild(card);
    }
  });
}

function deletePrompt(id) {
  const saved = getPrompts();
  const updated = saved.filter(p => p.id !== id);
  setPrompts(updated);
  renderPrompts();
  showToast('🗑 Prompt deleted.');
}

function copyPrompt(rawText) {
  const text = decodeURIComponent(rawText);
  navigator.clipboard.writeText(text)
    .then(() => showToast('📋 Prompt copied!'))
    .catch(() => showToast('❌ Copy failed'));
}

// 🧠 Load sample prompts (optional)
function loadSamplePrompts(sampleData) {
  const current = getPrompts();
  const newData = sampleData.filter(p => !current.find(c => c.title === p.title));
  setPrompts([...current, ...newData]);
  renderPrompts();
  showToast('🧠 Sample prompts loaded!');
}

// 🔍 Search binding
searchInput?.addEventListener('input', renderPrompts);
promptForm?.addEventListener('submit', savePrompt);

// 🌀 Init render
renderPrompts();

