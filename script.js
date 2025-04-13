import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHhU3junKL3S107vSvWcpZowH4XdTDaK0",
  authDomain: "skill-sharing-project.firebaseapp.com",
  projectId: "skill-sharing-project",
  storageBucket: "skill-sharing-project.appspot.com",
  messagingSenderId: "350809781962",
  appId: "1:350809781962:web:72bfa4e1e3f1e56751a633",
  measurementId: "G-L2ZBDPGH2X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

let tips = [];

// DOM Elements
const tipsContainer = document.getElementById('tipsContainer');
const form = document.getElementById('tipForm');
const searchBar = document.getElementById('searchBar');

// ------------------- Auth Logic ------------------- //

// Login
document.getElementById('signin')?.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail')?.value;
  const password = document.getElementById('loginPassword')?.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      alert("Login successful!");
      closeModal('loginModal');
    })
    .catch(err => alert(err.message));
});

// Signup
document.getElementById('signup')?.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById('signupEmail')?.value;
  const password = document.getElementById('signupPassword')?.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      alert("Signup successful!");
      closeModal('signupModal');
    })
    .catch(err => alert(err.message));
});

// ------------------- Modal Logic ------------------- //

document.getElementById("open-login")?.addEventListener("click", () => {
  document.getElementById("loginModal").style.display = "block";
});

document.getElementById("open-signup")?.addEventListener("click", () => {
  document.getElementById("signupModal").style.display = "block";
});

window.closeModal = (id) => {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = "none";
};

window.onclick = function (e) {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
};

// ------------------- Tips Logic ------------------- //

// Search
searchBar?.addEventListener('input', function () {
  const query = searchBar.value.toLowerCase();
  const filteredTips = tips.filter(tip =>
    tip.title.toLowerCase().includes(query) ||
    tip.description.toLowerCase().includes(query) ||
    tip.category.toLowerCase().includes(query)
  );
  displayTips(filteredTips);
});

// Display Tips
function displayTips(tipsArray) {
  tipsContainer.innerHTML = ''; 
  tipsArray.forEach(tip => {
    const card = document.createElement('div');
    card.className = 'tip-card';
    card.innerHTML = `
      <h3 class="font-bold">${tip.title}</h3>
      <p class="text-gray-500 mb-2">${tip.category} • ${tip.dateTime}</p>
      <p>${tip.description}</p>
      ${tip.link ? `<a href="${tip.link}" target="_blank">Visit Link</a>` : ""}
      ${tip.image ? `<img src="${tip.image}" alt="Tip image">` : ""}
    `;
    tipsContainer.prepend(card);
  });
}

function getCurrentDateTime() {
  const now = new Date();
  return now.toLocaleString();
}

form?.addEventListener('submit', function (e) {
  e.preventDefault();
  const title = document.getElementById('title')?.value;
  const description = document.getElementById('description')?.value;
  const category = document.getElementById('category')?.value;
  const link = document.getElementById('link')?.value || '';
  const image = document.getElementById('image')?.value || '';
  const dateTime = getCurrentDateTime();

  const newTip = { title, description, category, link, image, dateTime };
  tips.push(newTip);
  displayTips(tips);
  form.reset();
});
