let searchVal = document.getElementById("search");
let button = document.getElementById("searchBtn");
let showData = document.querySelector(".showData");
let showMore = document.querySelector("#showMore");
let loader = document.getElementById("loader");
let themeToggle = document.getElementById("themeToggle");

let page = 1;

const Access_Key = "H3s0Ay26iI-x_wZp9C2ly-Y91pIs_pENS1eN1YbKN2g";

const getData = async (searchValue, pageNo) => {
  if (!searchValue.trim()) {
    showData.innerHTML = `<h1 style="text-align:center;">Please Search</h1>`;
    document.querySelector(".moreBtn").style.display = "none";
    return;
  }

  loader.style.display = "block"; // Show loader

  let fetching = await fetch(
    `https://api.unsplash.com/search/photos?query=${searchValue}&per_page=20&page=${pageNo}&client_id=${Access_Key}`
  );
  let jsonData = await fetching.json();

  loader.style.display = "none"; // Hide loader

  let results = jsonData.results;

  if (pageNo === 1) {
    showData.innerHTML = "";
  }

  if (results.length > 0) {
    document.querySelector(".moreBtn").style.display = "block";
  }

  results.forEach((data) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${data.urls.small}" alt="">
      <a href="${data.links.html}" target="_blank">
        ${data.alt_description || "View Image"}
      </a>
    `;
    showData.appendChild(card);
  });
};

// Search on button click
button.addEventListener("click", function () {
  page = 1;
  getData(searchVal.value, page);
});

// Search on Enter key
searchVal.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    page = 1;
    getData(searchVal.value, page);
  }
});

// Show More button
showMore.addEventListener("click", function () {
  getData(searchVal.value, ++page);
});

// Dark/Light mode toggle
themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  // Icon change
  if (document.body.classList.contains("dark")) {
    themeToggle.innerHTML = `<i class="fas fa-sun"></i>`;
  } else {
    themeToggle.innerHTML = `<i class="fas fa-moon"></i>`;
  }
});
