const form = document.getElementById("promptForm");
const title = document.getElementById("title");
const category = document.getElementById("category");
const promptText = document.getElementById("prompt");
const promptList = document.getElementById("promptList");
const search = document.getElementById("search");

let prompts = JSON.parse(localStorage.getItem("prompts")) || [];
let editingIndex = null;

function displayPrompts(filtered = prompts) {
  promptList.innerHTML = "";
  filtered.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "prompt-card";
    div.innerHTML = `
      <h3>${item.title}</h3>
      <p><strong>${item.category}</strong></p>
      <p>${item.prompt}</p>
      <button onclick="copyPrompt(${index})">Copy</button>
      <button onclick="editPrompt(${index})">Edit</button>
      <button onclick="deletePrompt(${index})">Delete</button>
    `;
    promptList.appendChild(div);
  });
}

function savePrompt(e) {
  e.preventDefault();
  const newPrompt = {
    title: title.value,
    category: category.value,
    prompt: promptText.value,
  };

  if (editingIndex !== null) {
    prompts[editingIndex] = newPrompt;
    editingIndex = null;
  } else {
    prompts.push(newPrompt);
  }
showToast("Prompt saved!");

  localStorage.setItem("prompts", JSON.stringify(prompts));
  displayPrompts();
  form.reset();
}

function deletePrompt(index) {
  prompts.splice(index, 1);
  localStorage.setItem("prompts", JSON.stringify(prompts));
  displayPrompts();
}
showToast("Prompt deleted!");
function copyPrompt(index) {
  navigator.clipboard.writeText(prompts[index].prompt);
  showToast("Prompt copied!");
}

function editPrompt(index) {
  const prompt = prompts[index];
  title.value = prompt.title;
  category.value = prompt.category;
  promptText.value = prompt.prompt;
  editingIndex = index;
  window.scrollTo(0, 0);
}

search.addEventListener("input", () => {
  const keyword = search.value.toLowerCase();
  const filtered = prompts.filter(p =>
    p.title.toLowerCase().includes(keyword) ||
    p.category.toLowerCase().includes(keyword) ||
    p.prompt.toLowerCase().includes(keyword)
  );
  displayPrompts(filtered);
});

form.addEventListener("submit", savePrompt);
displayPrompts();
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}
