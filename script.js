'use strict';

// element toggle function
const elementToggleFunc = function (elem) { if (elem) elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  const normalized = selectedValue.toLowerCase().trim();
  for (let i = 0; i < filterItems.length; i++) {
    const itemCategory = (filterItems[i].dataset.category || "").toLowerCase().trim();
    if (normalized === "all") {
      filterItems[i].classList.add("active");
    } else if (normalized === itemCategory) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    if (lastClickedBtn) {
      lastClickedBtn.classList.remove("active");
    }
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector(".form");
const formInputs = document.querySelectorAll(".form-input");
const formBtn = document.querySelector(".form-btn");
const msgElement = document.getElementById("msg");

// add event to all form input field
if (form && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      // check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }

  // Handle form submission via AJAX
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    formBtn.setAttribute("disabled", "");
    const btnSpan = formBtn.querySelector("span");
    if (btnSpan) btnSpan.innerText = "Sending...";
    
    const formData = new FormData(form);
    
    fetch(form.action, {
      method: "POST",
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        if (msgElement) {
          msgElement.innerText = "Message sent successfully!";
          msgElement.style.color = "var(--orange-yellow-crayola)";
          msgElement.style.marginTop = "10px";
          msgElement.style.display = "block";
        }
        form.reset();
      } else {
        if (msgElement) {
          msgElement.innerText = "Error sending message.";
          msgElement.style.color = "red";
          msgElement.style.marginTop = "10px";
          msgElement.style.display = "block";
        }
      }
    })
    .catch(error => {
      if (msgElement) {
        msgElement.innerText = "Something went wrong.";
        msgElement.style.color = "red";
        msgElement.style.marginTop = "10px";
        msgElement.style.display = "block";
      }
    })
    .finally(() => {
      formBtn.removeAttribute("disabled");
      if (btnSpan) btnSpan.innerText = "Send Message";
      setTimeout(() => { if (msgElement) msgElement.style.display = "none"; }, 5000);
    });
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    
    let targetPage = this.dataset.page;
    if (!targetPage) {
      targetPage = this.textContent.toLowerCase().trim();
    }

    // Remove active class from all pages and links
    pages.forEach(page => page.classList.remove("active"));
    navigationLinks.forEach(link => link.classList.remove("active"));
    
    // Add active class only to the targeted elements
    const activePage = document.querySelector(`article[data-page="${targetPage}"]`);
    if (activePage) {
      activePage.classList.add("active");
      this.classList.add("active");
      window.scrollTo(0, 0);
    }
  });
}

// scroll-to-top button
const scrollTopBtn = document.querySelector(".scroll-to-top");

if (scrollTopBtn) {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("active");
    } else {
      scrollTopBtn.classList.remove("active");
    }
  });

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// coding profiles data
const codingProfiles = [
  {
    name: "Codolio",
    url: "https://codolio.com/profile/siddhantshukla108",
    icon: "stats-chart-outline",
    desc: "Unified coding profile & analytics"
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/siddhantshukla108/",
    icon: "code-slash-outline",
    desc: "Practice DSA problems & contests"
  },
  {
    name: "CodeChef",
    url: "https://www.codechef.com/users/siddhantshu108",
    icon: "trophy-outline",
    desc: "Competitive programming contests"
  },
  {
    name: "Codeforces",
    url: "https://codeforces.com/profile/siddhantshukla108",
    icon: "flash-outline",
    desc: "Competitive programming & rated contests"
  },
  {
    name: "HackerRank",
    url: "https://www.hackerrank.com/profile/shuklasiddhant31",
    icon: "terminal-outline",
    desc: "Skill certifications & challenges"
  },
  {
    name: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/user/siddhantshukla108",
    icon: "school-outline",
    desc: "DSA tutorials & practice problems"
  },
  {
    name: "Coding Ninjas",
    url: "https://www.naukri.com/code360/profile/deVyne",
    icon: "rocket-outline",
    desc: "Guided learning paths & problems"
  }
];

// render coding profiles
const profilesContainer = document.getElementById("coding-profiles-container");
if (profilesContainer) {
  codingProfiles.forEach(profile => {
    const profileHTML = `
      <a href="${profile.url}" target="_blank" rel="noopener noreferrer" class="profile-card">
        <div class="profile-card-icon">
          <ion-icon name="${profile.icon}"></ion-icon>
        </div>
        <h3 class="h4 profile-card-title">${profile.name}</h3>
        <p class="profile-card-text">${profile.desc}</p>
      </a>
    `;
    profilesContainer.innerHTML += profileHTML;
  });
}

// Skills section toggle functionality..

const toggle = document.getElementById("skillsToggle");
const chip = document.getElementById("chipSkills");
const bar = document.getElementById("barSkills");

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    chip.style.display = "none";
    bar.style.display = "block";
  } else {
    chip.style.display = "flex";
    bar.style.display = "none";
  }
});