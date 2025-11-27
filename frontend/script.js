const BASE_URL = "http://localhost:8080/api/users";

// ===== LOGIN PAGE HANDLING =====
const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = loginForm.elements["username"].value;
    const password = loginForm.elements["password"].value;

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.text();

      if (result === "Login successful") {
        alert("✅ Login successful! Redirecting...");
        window.location.href = "index.html";
      } else {
        alert("❌ " + result);
      }
    } catch (error) {
      alert("⚠️ Error logging in. Backend might be offline.");
      console.error(error);
    }
  });
}

// ===== REGISTRATION PAGE HANDLING =====
const registerForm = document.querySelector("form[action='login.html']");
if (registerForm) {
  registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = registerForm.elements["name"].value;
    const email = registerForm.elements["email"].value;
    const phone = registerForm.elements["phone"].value;
    const password = registerForm.elements["password"].value;

    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const result = await response.text();

      if (result === "Registration successful") {
        alert("✅ Registered successfully! Redirecting to login...");
        window.location.href = "login.html";
      } else {
        alert("❌ " + result);
      }
    } catch (error) {
      alert("⚠️ Error registering. Backend might be offline.");
      console.error(error);
    }
  });
}

// ===== NEWS DASHBOARD HANDLING =====
const container = document.getElementById("news-container");
if (container) {
  async function fetchNews() {
    const apiKey = "YOUR_NEWS_API_KEY"; // Replace with your actual key
    const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=9&apiKey=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      displayNews(data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
      container.innerHTML = "<p>Unable to load news at this time.</p>";
    }
  }

  function displayNews(articles) {
    container.innerHTML = "";
    articles.forEach(article => {
      const card = document.createElement("div");
      card.className = "news-card";
      card.innerHTML = `
        <img src="${article.urlToImage || ''}" alt="News Image" />
        <h2>${article.title}</h2>
        <p>${article.description || 'No description available.'}</p>
        <a href="${article.url}" target="_blank">Read more →</a>
      `;
      container.appendChild(card);
    });
  }

  fetchNews();
}

// ===== CATEGORY-BASED NEWS & VOICE =====
window.addEventListener('DOMContentLoaded', () => {
  const newsData = {
    technology: [
      {
        title: "AI Revolutionizing Industries",
        content: "AI is reshaping industries from healthcare to transport.",
        image: "https://source.unsplash.com/400x200/?technology"
      }
    ],
    sports: [
      {
        title: "Olympics 2024 Highlights",
        content: "Records shattered and new champions emerge!",
        image: "https://source.unsplash.com/400x200/?sports"
      }
    ]
  };

  window.loadCategory = function (category) {
    const container = document.getElementById('news-container');
    const articles = newsData[category] || [];
    container.innerHTML = articles.map(article => `
      <div class="article-card" onclick="showArticle('${article.title}', '${article.content}', '${article.image}')">
        <img src="${article.image}" alt="${article.title}">
        <h4>${article.title}</h4>
      </div>
    `).join('');
  };

  window.showArticle = function(title, content, image) {
    document.getElementById('article-details').classList.remove('hidden');
    document.getElementById('article-title').innerText = title;
    document.getElementById('article-content').innerText = content;
    document.getElementById('article-image').src = image;
  };

  const voiceBtn = document.getElementById('voice-btn');
  if (voiceBtn) {
    voiceBtn.addEventListener('click', () => {
      const content = document.getElementById('article-content').innerText;
      const utterance = new SpeechSynthesisUtterance(content);
      speechSynthesis.speak(utterance);
    });
  }
});
