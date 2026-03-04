// animation for inspiration
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target;
        if (image.classList.contains("image-slide-right")) {
          image.classList.add("image-slide-right");
        } else if (image.classList.contains("image-slide-left")) {
          image.classList.add("image-slide-left");
        }
        observer.unobserve(image);
      }
    });
  },
  { threshold: 0.5 }
);

const images = document.querySelectorAll(".image");
images.forEach((image) => {
  observer.observe(image);
});

// services animation
const serviceItems = document.querySelectorAll(".service-item");
let delay = 0;

const serviceObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        entry.target.style.animationDelay = `${delay}s`;
        delay += 1;
        serviceObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

serviceItems.forEach((item) => serviceObserver.observe(item));

// scroll animation for inspiration images
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function checkAnimations() {
  const images = document.querySelectorAll(".content-row .image");
  images.forEach((image) => {
    if (isElementInViewport(image) && !image.classList.contains("animated")) {
      if (image.parentElement.classList.contains("row-reverse")) {
        image.classList.add("image-slide-left");
      } else {
        image.classList.add("image-slide-right");
      }
      image.classList.add("animated");
    }
  });
}

window.addEventListener("scroll", checkAnimations);
window.addEventListener("load", checkAnimations);

// map
var map = L.map("map").setView([20, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([38.7169, -9.1399]).addTo(map).bindPopup("Portugal (Lisboa)");
L.marker([46.8182, 8.2275]).addTo(map).bindPopup("Switzerland (Suiza)");
L.marker([40.4637, -3.7492]).addTo(map).bindPopup("Spain (España)");
L.marker([51.5074, -0.1278]).addTo(map).bindPopup("United Kingdom (UK)");
L.marker([46.6034, 1.8883]).addTo(map).bindPopup("France (Francia)");
L.marker([-16.2902, -63.5887]).addTo(map).bindPopup("Bolivia");
L.marker([-38.4161, -63.6167]).addTo(map).bindPopup("Argentina");

// back to top
const backToTopButton = document.querySelector(".totop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", function () {

    fetch("reviews.json")
        .then(response => response.json())
        .then(data => {

            const container = document.getElementById("reviewsContainer");

            if (!container) return;

            data.forEach(review => {

                // Only show approved reviews (4+ stars)
                if (review.rating >= 4) {

                    let stars = "";
                    for (let i = 0; i < review.rating; i++) {
                        stars += "★";
                    }

                    const reviewCard = document.createElement("div");
                    reviewCard.classList.add("review-card");

                    reviewCard.innerHTML = `
                        <div class="review-stars">${stars}</div>
                        <div class="review-text">"${review.text}"</div>
                        <div class="review-author">${review.name}</div>
                        <div class="review-date">${review.date}</div>
                    `;

                    container.appendChild(reviewCard);
                }
            });

        })
        .catch(error => {
            console.error("Error loading reviews:", error);
        });

});