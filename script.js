document.addEventListener('DOMContentLoaded', () => {
    // --- Funções de UI/UX ---
    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Parar de observar após a animação
            }
        });
    }

    function startTypingEffect(elementId, text, typingSpeed = 100) {
        const textElement = document.getElementById(elementId);
        if (!textElement) return; // Verifica se o elemento existe
        let index = 0;

        function type() {
            if (index < text.length) {
                textElement.textContent += text.charAt(index);
                index++;
                setTimeout(type, typingSpeed);
            }
        }
        type();
    }

    // --- Funções do Carrossel ---
    let currentIndex = 0;
    const projects = [
        {
            title: "Controle de Estoque - ESTOQUEI",
            videoSrc: "estoquei_video.mp4",
            description: "Sistema de gestão de estoque em Python e SQLite.",
            link: "https://github.com/erikeresende/estoquei"
        },
        {
            title: "Controle de Clínica - MEDIQUEI",
            videoSrc: "mediquei_video.mp4",
            description: "Gestão de clínicas médicas em Python e PostgreSQL.",
            link: "https://github.com/erikeresende/mediquei"
        },
        {
            title: "Aplicativo de Entregas - CorreAqui",
            imageSrc: "correaqui.png",
            description: "Design Figma para aplicativo de entregas.",
            link: "https://www.figma.com/proto/tlLZkDkfo5rk3NEl2eYKGG/CorreAqui"
        },
        {
            title: "Aplicativo de Treino - TreineiPro",
            imageSrc: "treinei.png",
            description: "Design Figma para aplicativo de treinos.",
            link: "https://www.figma.com/proto/v9ngoVjcMphlIDFJjsHKI4/Treinei-Pro"
        }
    ];

    function renderProjectCarousel() {
        const carouselContainer = document.querySelector('.carousel-container');
        if (!carouselContainer) return;

        const project = projects[currentIndex];
        const mediaContent = project.videoSrc
            ? `<video controls>
                    <source src="${project.videoSrc}" type="video/mp4">
                    Seu navegador não suporta a tag de vídeo.
               </video>`
            : `<img src="${project.imageSrc}" alt="${project.title}" class="carousel-image">`;

        carouselContainer.innerHTML = `
            <div class="carousel-item active">
                <h3>${project.title}</h3>
                ${mediaContent}
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank" class="project-link">Acessar Projeto</a>
            </div>
        `;
    }

    function changeCarouselIndex(direction) {
        currentIndex = (currentIndex + direction + projects.length) % projects.length;
        renderProjectCarousel();
    }

    // --- Funções de Observação ---
    function observeSections(sections) {
        const options = {
            root: null,
            threshold: 0.1,
            rootMargin: "0px"
        };

        const observer = new IntersectionObserver(handleIntersection, options);
        sections.forEach(section => observer.observe(section));
    }

    // --- Início do Código ---
    startTypingEffect("typing-text", "Analista de suporte | Python | JS | HTML | CSS | Dev Full Stack");

    const sections = document.querySelectorAll('.section');
    if (sections.length > 0) {
        observeSections(sections);
    }

    renderProjectCarousel();

    const nextButton = document.querySelector(".carousel-button-next");
    const prevButton = document.querySelector(".carousel-button-prev");

    if (nextButton) {
        nextButton.addEventListener('click', () => changeCarouselIndex(1));
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => changeCarouselIndex(-1));
    }

    // --- Funções de Navegação ---
    const hamburger = document.getElementById('hamburger');
    const navList = document.getElementById('nav-list');

    if (hamburger && navList) {
        hamburger.addEventListener('click', () => {
            navList.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Evita observar novamente
            }
        });
    }, {
        threshold: 0.1 // Ativa quando 10% do elemento está visível
    });

    elements.forEach(element => observer.observe(element));
});
