# 🚀 AI Prompt Manager 2030

An advanced, offline-ready, beautifully designed app for saving, editing, exporting, and syncing your best AI prompts.

![screenshot](preview.png)

---

## ✨ Features

- 🌗 **Dark & Light Mode** with persistent theme
- 💾 **Local Storage** saving with full CRUD
- ☁️ **Cloud Sync** via Firebase (with Google Auth)
- 🧠 **Editor Mode** for fullscreen prompt creation
- 📤 **Export Prompts** to `.json`, `.txt`, `.csv`
- 📦 **Offline-First** (PWA with Service Worker)
- 📱 **Installable** on any device (via manifest + icons)
- 📋 **Copy, Search, Delete** prompts seamlessly
- 🔍 **Responsive** for mobile and desktop
- 🌈 **Animated UI** with gradients, shadows, and glass effects

---

## 📂 File Structure

```bash
├── index.html            # Main app UI
├── editor.html           # Fullscreen editor
├── style.css             # 2030-inspired global styles
├── animations.css        # Custom animations and transitions
├── script.js             # App logic: save/search/delete/copy
├── export.js             # Export logic for JSON, TXT, CSV
├── firebase-config.js    # Firebase Auth + Firestore
├── sw.js                 # PWA service worker
├── manifest.json         # PWA config
├── icon.png / icon-512.png
├── utils.js              # Format date, debounce, capitalize
├── data.js               # Sample prompt dataset
```

---

## 🧠 Demo Prompts

```json
{
  "title": "Blog Post Writer",
  "category": "ChatGPT",
  "prompt": "Write a blog post about the future of AI in 2030..."
}
```

---

## 📲 Installation & Usage

1. **Clone the project**
```bash
git clone https://github.com/YOUR_USERNAME/AI-Prompt-Manager.git
cd AI-Prompt-Manager
```

2. **Enable GitHub Pages**
- Go to `Settings > Pages > Source: main` + `/root`

3. **Visit Live Site**
```bash
https://YOUR_USERNAME.github.io/AI-Prompt-Manager/
```

4. **Install PWA**
- On mobile or desktop, click **Install** prompt
- App works **offline** and looks like native

---

## 🔐 Firebase Setup (Optional)
- Create a Firebase Project
- Enable **Authentication > Google**
- Enable **Firestore Database**
- Replace credentials in `firebase-config.js`

---

## 🧪 Dev Tips

- Use `editor.html` for distraction-free writing
- Enable cloud sync to back up across devices
- Use `loadSamplePrompts()` in `script.js` to preload ideas

---

## 🤝 Contributing
PRs welcome! Fork the repo and go wild 🚀

---

## 🧑‍💻 Author

Made with 💻 by **Ibrahim**  
📍 GitHub: [@Ibrahim-Technical](https://github.com/Ibrahim-Technical)

---

## 📄 License

MIT — Free to use, modify, distribute.
