// 🚀 script.js - AI Prompt Manager 2030 Interactive Logic

// 🌙 Toggle between dark and light themes
const toggleThemeBtn = document.getElementById('toggleTheme');
toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// 🌗 Load theme preference on startup
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
});

// 📦 Save prompts to localStorage
const promptForm = document.getElementById('promptForm');
const promptList = document.getElementById('promptList');
const toast = document.getElementById('toast');

function showToast(message = 'Saved!') {
  toast.textContent = `✅ ${message}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

function savePrompt(e) {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const category = document.getElementById('category').value.trim();
  const prompt = document.getElementById('prompt').value.trim();

  if (!title || !category || !prompt) return;

  const newPrompt = {
    id: Date.now(),
    title,
    category,
    prompt
  };

  const saved = JSON.parse(localStorage.getItem('prompts')) || [];
  saved.push(newPrompt);
  localStorage.setItem('prompts', JSON.stringify(saved));

  renderPrompts();
  promptForm.reset();
  showToast('Prompt saved successfully!');
}

promptForm.addEventListener('submit', savePrompt);

// 📄 Render prompt cards from storage
function renderPrompts() {
  const saved = JSON.parse(localStorage.getItem('prompts')) || [];
  const query = document.getElementById('search').value.toLowerCase();

  promptList.innerHTML = '';
  saved.reverse().forEach(({ id, title, category, prompt }) => {
    if (
      title.toLowerCase().includes(query) ||
      category.toLowerCase().includes(query) ||
      prompt.toLowerCase().includes(query)
    ) {
      const card = document.createElement('div');
      card.classList.add('prompt-card');
      card.innerHTML = `
        <h3>${title}</h3>
        <small><strong>Category:</strong> ${category}</small>
        <p>${prompt}</p>
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
  const saved = JSON.parse(localStorage.getItem('prompts')) || [];
  const updated = saved.filter(p => p.id !== id);
  localStorage.setItem('prompts', JSON.stringify(updated));
  renderPrompts();
  showToast('Prompt deleted!');
}

function copyPrompt(rawText) {
  const text = decodeURIComponent(rawText);
  navigator.clipboard.writeText(text)
    .then(() => showToast('Prompt copied to clipboard!'))
    .catch(err => console.error('Copy failed:', err));
}

// 🔍 Search functionality
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', renderPrompts);

// 🔁 Initial render
renderPrompts();
