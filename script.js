document.addEventListener('DOMContentLoaded', () => {
    // --- Funções de UI/UX ---
    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Parar de observar a seção após a animação
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
            link: "https://www.figma.com/proto/tlLZkDkfo5rk3NEl2eYKGG/CorreAqui?node-id=2016-590&node-type=frame&t=ybGxXsxmfUeAt3Q6-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2&show-proto-sidebar=1"
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

        // Atualiza o conteúdo do carrossel para exibir apenas um projeto
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
});
