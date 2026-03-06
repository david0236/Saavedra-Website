/* ============================================================
   INTERSECTION OBSERVER — inspiration section images
   ============================================================ */
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
images.forEach((image) => observer.observe(image));

/* ============================================================
   SERVICES ANIMATION
   ============================================================ */
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

/* ============================================================
   SCROLL ANIMATION — inspiration images
   ============================================================ */
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

/* ============================================================
   LEAFLET MAP
   ============================================================ */
var map = L.map("map").setView([20, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([38.7169, -9.1399]).addTo(map).bindPopup("Portugal (Lisboa)");
L.marker([46.8182, 8.2275]).addTo(map).bindPopup("Switzerland (Suiza)");
L.marker([40.4637, -3.7492]).addTo(map).bindPopup("Spain (España)");
L.marker([51.5074, -0.1278]).addTo(map).bindPopup("United Kingdom (UK)");
L.marker([46.6034, 1.8883]).addTo(map).bindPopup("France (Francia)");
L.marker([-16.2902, -63.5887]).addTo(map).bindPopup("Bolivia");
L.marker([-38.4161, -63.6167]).addTo(map).bindPopup("Argentina");

/* ============================================================
   BACK TO TOP BUTTON
   ============================================================ */
const backToTopButton = document.querySelector(".totop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
});

/* ============================================================
   REVIEWS — load from JSON
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {
    fetch("reviews.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("reviewsContainer");
            if (!container) return;

            data.forEach(review => {
                if (review.rating >= 4) {
                    let stars = "";
                    for (let i = 0; i < review.rating; i++) stars += "★";

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
        .catch(error => console.error("Error loading reviews:", error));
});

/* ============================================================
   TRANSLATIONS
   ============================================================ */
const translations = {
    en: {
        /* nav */
        nav_home:            "Home",
        nav_about:           "About",
        nav_services:        "Services",
        nav_contact:         "Contact Us",

        /* hero */
        hero_title:          "Crafting Excellence, One Piece at a Time",
        hero_text:           "With more than 50 years of expertise in carpentry and construction, we transform your visions into reality. From custom furniture to complete renovations, we deliver unparalleled craftsmanship and dedication to every project.",

        /* about */
        about_title1:        "SINCE 1962, CRAFTING HOMES WITH PASSION AND PRECISION",
        about_text1:         "At Saavedra, we believe your home should be as unique as you are. That's why our expert design and construction teams collaborate closely with you to create a space that perfectly reflects your vision—not just for today, but for the future. From our very first meeting to the moment you step into your completed home, we are with you every step of the way. We listen to your ideas, understand your goals, and ensure every detail meets the highest standards of quality. With Saavedra, you're not just building a house—you're creating a place to call home for years to come.",
        about_title2:        "LET US HELP YOU BUILD YOUR DREAM HOME",
        about_text2:         "Your dream is our mission. Whether it's a new home, a remodel, or a restoration project, Saavedra's dedication to craftsmanship and excellence turns every project into a masterpiece. Together, we'll build a home that exceeds your expectations and stands as a testament to your unique style and aspirations.",

        /* services */
        services_title:      "Our Services",
        service1_title:      "New Home Construction",
        service1_text:       "At Saavedra, we specialize in building custom homes that are a perfect reflection of your vision and lifestyle. From the initial design to the final touches, we ensure every step is tailored to your needs, delivering a home you'll cherish for years to come. With our commitment to quality and detail, your dream home is within reach.",
        service2_title:      "Remodeling",
        service2_text:       "Transform your current space into something extraordinary. Whether it's modernizing your kitchen, reimagining your living room, or adding functional spaces, Saavedra takes pride in creating designs that enhance your home while maintaining its unique charm.",
        service3_title:      "Restoration",
        service3_text:       "Preserve the beauty and character of your home with our expert restoration services. From historical properties to modern structures, Saavedra brings spaces back to life with precision and care, blending craftsmanship with innovative techniques.",
        service4_title:      "Painting",
        service4_text:       "Elevate your home's look with our professional painting services. Whether it's interior, exterior, or specialty finishes, we use premium materials and techniques to achieve stunning, long-lasting results tailored to your preferences.",

        /* gallery */
        gallery_title:       "Our Work",
        gallery_subtitle:    "Take a look at some of our recent remodeling projects.",
        see_more:            "See More",

        /* clients */
        clients_title:       "Our Clients",
        clients_subtitle:    "From family homes to international developments, these are the brands and organisations that trust Saavedra.",

        /* reviews */
        reviews_title:       "What Our Clients Say",
        reviews_subtitle:    "Real feedback from satisfied clients who trust our quality and professionalism.",

        /* products */
        products_title:      "What Types of Products Do We Use?",
        products_subtitle:   "We use high-quality products for our services.",

        /* countries */
        countries_title:     "Countries We've Worked In",
        countries_subtitle:  "We are an international company",
        countries_text:      "Our expertise has reached across borders, delivering exceptional service worldwide.",

        /* contact */
        contact_title:       "Contact Us",
        contact_subtitle:    "We're here to help! Reach out for a free consultation today.",
        consultation_title:  "Free Consultation",
        consultation_text:   "We offer a free consultation to understand your needs and help you get started with our services.",
        languages_title:     "We Speak English and Spanish",
        languages_text:      "Our team is fluent in both English and Spanish, so feel free to contact us in whichever language you prefer!",
        getintouch_title:    "Get In Touch",
        hours_label:         "Office Hours:",
        hours_value:         "Mon – Fri, 9 AM – 6 PM",
        follow_us:           "Follow Us",
        footer_rights:       "All rights reserved.",
    },

    es: {
        /* nav */
        nav_home:            "Inicio",
        nav_about:           "Nosotros",
        nav_services:        "Servicios",
        nav_contact:         "Contacto",

        /* hero */
        hero_title:          "Creando Excelencia, Pieza por Pieza",
        hero_text:           "Con más de 50 años de experiencia en carpintería y construcción, convertimos tu visión en realidad. Desde muebles a medida hasta renovaciones completas, ofrecemos una artesanía y dedicación incomparables en cada proyecto.",

        /* about */
        about_title1:        "DESDE 1962, CONSTRUYENDO HOGARES CON PASIÓN Y PRECISIÓN",
        about_text1:         "En Saavedra creemos que tu hogar debe ser tan único como tú. Por eso nuestros equipos de diseño y construcción trabajan contigo para crear un espacio que refleje perfectamente tu visión, no solo para hoy sino para el futuro. Desde la primera reunión hasta el momento en que entras en tu hogar terminado, estamos contigo en cada paso del camino. Escuchamos tus ideas, entendemos tus objetivos y nos aseguramos de que cada detalle cumpla los más altos estándares de calidad.",
        about_title2:        "DÉJANOS AYUDARTE A CONSTRUIR TU HOGAR SOÑADO",
        about_text2:         "Tu sueño es nuestra misión. Ya sea una vivienda nueva, una reforma o un proyecto de restauración, la dedicación de Saavedra a la artesanía y la excelencia convierte cada proyecto en una obra maestra. Juntos construiremos un hogar que supere tus expectativas.",

        /* services */
        services_title:      "Nuestros Servicios",
        service1_title:      "Construcción de Vivienda Nueva",
        service1_text:       "En Saavedra nos especializamos en construir casas a medida que reflejen perfectamente tu visión y estilo de vida. Desde el diseño inicial hasta los últimos detalles, garantizamos que cada paso esté adaptado a tus necesidades, entregando un hogar que atesorarás por muchos años.",
        service2_title:      "Reformas",
        service2_text:       "Transforma tu espacio actual en algo extraordinario. Ya sea modernizar tu cocina, reimaginar tu salón o añadir espacios funcionales, Saavedra se enorgullece de crear diseños que mejoran tu hogar manteniendo su encanto único.",
        service3_title:      "Restauración",
        service3_text:       "Preserva la belleza y el carácter de tu hogar con nuestros servicios expertos de restauración. Desde propiedades históricas hasta estructuras modernas, Saavedra devuelve vida a los espacios con precisión y cuidado, combinando artesanía con técnicas innovadoras.",
        service4_title:      "Pintura",
        service4_text:       "Eleva el aspecto de tu hogar con nuestros servicios profesionales de pintura. Ya sea interior, exterior o acabados especiales, utilizamos materiales y técnicas premium para lograr resultados impresionantes y duraderos adaptados a tus preferencias.",

        /* gallery */
        gallery_title:       "Nuestro Trabajo",
        gallery_subtitle:    "Echa un vistazo a algunos de nuestros proyectos de reforma más recientes.",
        see_more:            "Ver Más",

        /* clients */
        clients_title:       "Nuestros Clientes",
        clients_subtitle:    "Desde viviendas familiares hasta desarrollos internacionales, estas son las marcas y organizaciones que confían en Saavedra.",

        /* reviews */
        reviews_title:       "Lo Que Dicen Nuestros Clientes",
        reviews_subtitle:    "Opiniones reales de clientes satisfechos que confían en nuestra calidad y profesionalidad.",

        /* products */
        products_title:      "¿Qué Tipo de Productos Utilizamos?",
        products_subtitle:   "Utilizamos productos de alta calidad en todos nuestros servicios.",

        /* countries */
        countries_title:     "Países en los que Hemos Trabajado",
        countries_subtitle:  "Somos una empresa internacional",
        countries_text:      "Nuestra experiencia ha cruzado fronteras, ofreciendo un servicio excepcional en todo el mundo.",

        /* contact */
        contact_title:       "Contáctanos",
        contact_subtitle:    "¡Estamos aquí para ayudarte! Solicita una consulta gratuita hoy mismo.",
        consultation_title:  "Consulta Gratuita",
        consultation_text:   "Ofrecemos una consulta gratuita para entender tus necesidades y ayudarte a empezar con nuestros servicios.",
        languages_title:     "Hablamos Inglés y Español",
        languages_text:      "Nuestro equipo domina ambos idiomas, así que no dudes en contactarnos en el que prefieras.",
        getintouch_title:    "Ponte en Contacto",
        hours_label:         "Horario de oficina:",
        hours_value:         "Lun – Vie, 9:00 – 18:00",
        follow_us:           "Síguenos",
        footer_rights:       "Todos los derechos reservados.",
    },
};

/* ============================================================
   LANGUAGE SWITCHER LOGIC
   ============================================================ */
let currentLang = localStorage.getItem("saavedra_lang") || "en";

function setLanguage(lang) {
    currentLang = lang;

    /* update every element that has a data-key attribute */
    document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.getAttribute("data-key");
        if (translations[lang] && translations[lang][key] !== undefined) {
            el.textContent = translations[lang][key];
        }
    });

    /* update <html lang=""> for accessibility */
    document.documentElement.lang = lang;

    /* toggle active class on the buttons */
    document.getElementById("lang-en").classList.toggle("active", lang === "en");
    document.getElementById("lang-es").classList.toggle("active", lang === "es");

    /* persist choice across page refreshes */
    localStorage.setItem("saavedra_lang", lang);
}

/* attach click listeners */
document.getElementById("lang-en").addEventListener("click", () => setLanguage("en"));
document.getElementById("lang-es").addEventListener("click", () => setLanguage("es"));

/* apply saved / default language on first load */
document.addEventListener("DOMContentLoaded", () => setLanguage(currentLang));