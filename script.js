
//animation for inspiration

// Intersection Observer to trigger the animation when images come into view
document.addEventListener("DOMContentLoaded", function () {
    // Create the observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation classes when the element is in view
                const image = entry.target;
                if (image.classList.contains('image-slide-right')) {
                    image.classList.add('image-slide-right');
                } else if (image.classList.contains('image-slide-left')) {
                    image.classList.add('image-slide-left');
                }
                observer.unobserve(image); // Stop observing after the animation has triggered
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the element is visible

    // Observe the images
    const images = document.querySelectorAll('.image');
    images.forEach(image => {
        observer.observe(image);
    });
});




//services
document.addEventListener("DOMContentLoaded", () => {
    const serviceItems = document.querySelectorAll(".service-item");
    let delay = 0; // Delay for the first service item (0 seconds)

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Add the 'visible' class to start the animation
                    entry.target.classList.add("visible");
                    // Apply the sequential delay based on the order
                    entry.target.style.animationDelay = `${delay}s`;
                    // Increase the delay for the next item
                    delay += 1; // Adjust this value for slower/faster sequential appearance
                    observer.unobserve(entry.target); // Stop observing once visible
                }
            });
        },
        {
            threshold: 0.2, // Trigger when 20% of the item is visible
        }
    );

    serviceItems.forEach((item) => observer.observe(item)); // Start observing each service item
});





//animation for inspiration


    // Function to check if an element is in view
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to add animation classes when the element is in view
    function checkAnimations() {
        const images = document.querySelectorAll('.content-row .image');
        
        images.forEach(image => {
            if (isElementInViewport(image) && !image.classList.contains('animated')) {
                // Add the class that triggers animation when the element is in view
                if (image.parentElement.classList.contains('row-reverse')) {
                    image.classList.add('image-slide-left');
                } else {
                    image.classList.add('image-slide-right');
                }

                // Mark this image as animated to avoid running the animation again
                image.classList.add('animated');
            }
        });
    }

    // Listen for scroll events
    window.addEventListener('scroll', checkAnimations);

    // Run on page load to check if images are already in view
    window.addEventListener('load', checkAnimations);





    //maps


// Initialize the map and set its view to a specific location (latitude, longitude) and zoom level
var map = L.map('map').setView([20, 0], 2);  // Centered on global view with zoom level 2

// Add OpenStreetMap tile layer (free, open-source tiles)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add markers for the countries you've worked in
L.marker([39.3999, -8.2245]).addTo(map)  // Portugal
    .bindPopup('Portugal')
    .openPopup();

L.marker([40.4637, -3.7492]).addTo(map)  // Spain
    .bindPopup('Spain')
    .openPopup();

L.marker([-16.2902, -63.5887]).addTo(map)  // Bolivia
    .bindPopup('Bolivia')
    .openPopup();

L.marker([-38.4161, -63.6167]).addTo(map)  // Argentina
    .bindPopup('Argentina')
    .openPopup();

L.marker([37.0902, -95.7129]).addTo(map)  // United States
    .bindPopup('United States')
    .openPopup();

L.marker([-14.2350, -51.9253]).addTo(map)  // Brazil
    .bindPopup('Brazil')
    .openPopup();

L.marker([46.6034, 1.8883]).addTo(map)  // France
    .bindPopup('France')
    .openPopup();

L.marker([41.8719, 12.5674]).addTo(map)  // Italy
    .bindPopup('Italy')
    .openPopup();
    
L.marker([51.5074, -0.1278]).addTo(map)  // United Kingdom
    .bindPopup('United Kingdom')
    .openPopup();
