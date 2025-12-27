// =======================
// UTILITY FUNCTIONS
// =======================

// Toggle modals
function toggleModal(id) {
  const el = document.getElementById(id);
  el.classList.toggle("hidden");
  el.classList.toggle("flex");
}

// Switch between modals
function switchModal(current, target) {
  toggleModal(current);
  toggleModal(target);
}

// =======================
// GEOLOCATION
// =======================
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation not supported");
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  document.getElementById("location").value = `${lat}, ${lon}`;
}

// =======================
// ROLE SELECTION
// =======================
function selectRole(role, element) {
  document.getElementById("userRole").value = role;

  document.querySelectorAll(".role-card").forEach(card => {
    card.classList.remove("border-primary", "bg-primary/10");
  });

  element.classList.add("border-primary", "bg-primary/10");
}

// =======================
// SIGNUP
// =======================
function signupUser() {
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const phone = document.getElementById("signupPhone").value.trim();
  const country = document.getElementById("signupCountry").value.trim();
  const dob = document.getElementById("signupDOB").value.trim();
  const role = document.getElementById("userRole").value;

  if (!name || !email || !password || !phone || !country || !dob) {
    return alert("Please fill out all fields.");
  }

  if (!role) {
    return alert("Please select a role.");
  }

  const userData = { name, email, password, phone, country, dob, role };
  localStorage.setItem(`plothive_user_${email}`, JSON.stringify(userData));
  localStorage.setItem("plothive_loggedIn", email);

  alert("Signup successful!");
  toggleModal("signupModal");

  window.location.href = role === "seeker" ? "PlotSeekers.html" : "PlotVendors.html";
}

// =======================
// LOGIN
// =======================
function loginUser() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const userData = localStorage.getItem(`plothive_user_${email}`);

  if (!userData) return alert("Account not found!");

  const user = JSON.parse(userData);
  if (user.password !== password) return alert("Wrong password!");

  localStorage.setItem("plothive_loggedIn", email);
  alert("Login successful!");
  toggleModal("loginModal");

  window.location.href = user.role === "seeker" ? "PlotSeekers.html" : "PlotVendors.html";
}

// =======================
// LOGOUT
// =======================
function logoutUser() {
  localStorage.removeItem("plothive_loggedIn");
  alert("You have been logged out.");
  location.reload();
}

function showLogoutModal() {
  toggleModal("logoutConfirmModal");
}

function confirmLogout() {
  logoutUser();
}

// =======================
// PERSONALIZE HERO & PROFILE LINKS
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const email = localStorage.getItem("plothive_loggedIn");
  const logoutBtn = document.getElementById("logoutBtn");
  const heroHeader = document.querySelector(".hero-section h1");
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const userProfileLink = document.getElementById("userProfileLink");

  if (email) {
    const user = JSON.parse(localStorage.getItem(`plothive_user_${email}`));

    if (logoutBtn) logoutBtn.classList.remove("hidden");
    if (loginBtn) loginBtn.classList.add("hidden");
    if (signupBtn) signupBtn.classList.add("hidden");
    if (heroHeader) heroHeader.textContent = `Welcome, ${user.name}!`;
    if (userProfileLink) userProfileLink.href = user.role === "seeker" ? "PlotSeekers.html" : "PlotVendors.html";
  }
});

// =======================
// SCROLL ANIMATIONS
// =======================
function animateOnScroll() {
  const elements = document.querySelectorAll(".animate__animated");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const animation = entry.target.dataset.animation;
        entry.target.classList.add(animation);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(element => observer.observe(element));
}

document.addEventListener("DOMContentLoaded", animateOnScroll);

// =======================
// TYPEWRITER EFFECT
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const staticText = "Bridging the Gap between";
  const animatedWords = ["the People.", "the Property."];
  const staticEl = document.getElementById("typewriter-static");
  const animatedEl = document.getElementById("typewriter-animated");

  if (staticEl) staticEl.textContent = staticText;

  let wordIndex = 0, charIndex = 0, deleting = false;

  function type() {
    const word = animatedWords[wordIndex];

    animatedEl.textContent = deleting ? word.substring(0, charIndex--) : word.substring(0, charIndex++);

    if (!deleting && charIndex === word.length) {
      setTimeout(() => deleting = true, 1000);
    } else if (deleting && charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % animatedWords.length;
    }

    setTimeout(type, deleting ? 60 : 100);
  }

  if (animatedEl) type();
});
