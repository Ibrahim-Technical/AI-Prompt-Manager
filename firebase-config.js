// 🔥 firebase-config.js - AI Prompt Manager 2030 Cloud Sync

// Firebase CDN Scripts to include in HTML:
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>

// 🛠 Replace these values with your actual Firebase project config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// 🚀 Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// 👤 Sign in with Google
function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      showToast(`✅ Signed in as ${result.user.displayName}`);
      syncPromptsFromCloud();
    })
    .catch(error => {
      console.error("Sign in error", error);
      showToast("❌ Sign in failed");
    });
}

// 🚪 Sign out
function signOut() {
  auth.signOut()
    .then(() => showToast("👋 Signed out"))
    .catch(() => showToast("⚠️ Sign out failed"));
}

// ☁️ Upload local prompts to Firestore
function syncPromptsToCloud() {
  const user = auth.currentUser;
  if (!user) return showToast("Please sign in first.");

  const prompts = JSON.parse(localStorage.getItem("prompts")) || [];
  db.collection("users").doc(user.uid).set({ prompts })
    .then(() => showToast("✅ Synced to cloud"))
    .catch(err => {
      console.error("Sync failed", err);
      showToast("❌ Failed to sync to cloud");
    });
}

// ☁️ Download prompts from Firestore
function syncPromptsFromCloud() {
  const user = auth.currentUser;
  if (!user) return;

  db.collection("users").doc(user.uid).get()
    .then(doc => {
      if (doc.exists && doc.data().prompts) {
        localStorage.setItem("prompts", JSON.stringify(doc.data().prompts));
        showToast("📥 Synced from cloud");
        if (typeof renderPrompts === 'function') renderPrompts();
      } else {
        showToast("ℹ️ No cloud data found.");
      }
    })
    .catch(err => {
      console.error("Load failed", err);
      showToast("❌ Failed to sync from cloud");
    });
}

// 🔔 Show a visual toast message
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return alert(message);
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
