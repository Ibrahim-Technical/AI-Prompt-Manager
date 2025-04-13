// 🔥 firebase-config.js - AI Prompt Manager 2030 Cloud Sync

// Import these from Firebase CDN or your own bundle
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// 👤 Sign in with Google
function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then(result => {
    alert(`✅ Signed in as ${result.user.displayName}`);
    syncPromptsFromCloud();
  }).catch(error => {
    console.error("Sign in error", error);
  });
}

// 🚪 Sign out
function signOut() {
  auth.signOut().then(() => alert("👋 Signed out"));
}

// ☁️ Upload local prompts to Firestore
function syncPromptsToCloud() {
  const user = auth.currentUser;
  if (!user) return alert("Please sign in first.");

  const prompts = JSON.parse(localStorage.getItem("prompts")) || [];
  db.collection("users").doc(user.uid).set({ prompts })
    .then(() => alert("✅ Synced to cloud"))
    .catch(err => console.error("Sync failed", err));
}

// ☁️ Load prompts from Firestore into localStorage
function syncPromptsFromCloud() {
  const user = auth.currentUser;
  if (!user) return;

  db.collection("users").doc(user.uid).get()
    .then(doc => {
      if (doc.exists && doc.data().prompts) {
        localStorage.setItem("prompts", JSON.stringify(doc.data().prompts));
        alert("✅ Synced from cloud");
        if (typeof renderPrompts === 'function') renderPrompts();
      }
    })
    .catch(err => console.error("Load failed", err));
}
