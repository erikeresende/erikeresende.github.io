document.addEventListener('DOMContentLoaded', () => {

    // --- Funções de UI/UX ---

    // Adiciona a classe "visible" quando a seção entra na viewport
    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Parar de observar a seção após a animação
            }
        });
    }

    // Inicia a animação de digitação
    function startTypingEffect(elementId, text, typingSpeed = 100, restartDelay = 2000) {
        const textElement = document.getElementById(elementId);
        if (!textElement) return;  // Verifica se o elemento existe
        let index = 0;

        function type() {
            if (index < text.length) {
                textElement.textContent += text.charAt(index);
                index++;
                setTimeout(type, typingSpeed);
            } else {
                setTimeout(() => {
                    index = 0;
                    textElement.textContent = "";
                    type();
                }, restartDelay);
            }
        }
        type();
    }

    // --- Funções do Carrossel ---

    let currentIndex = 0;
    const projects = [
        { title: "Controle de Estoque - ESTOQUEI", videoSrc: "estoquei_video.mp4", description: "Sistema de gestão de estoque em Python e SQLite." },
        { title: "Controle de Clínica - MEDIQUEI", videoSrc: "mediquei_video.mp4", description: "Gestão de clínicas médicas em Python e PostgreSQL." }
    ];

    function renderProjectCarousel(currentIndex) {
        const carouselContainer = document.querySelector('.carousel-container');
        if (!carouselContainer) return;  // Verifica se o container existe
        carouselContainer.innerHTML = ''; // Limpa o conteúdo existente

        // Cria os itens do carrossel
        projects.forEach((project, index) => {
            const item = document.createElement('div');
            item.classList.add('carousel-item');
            if (index === currentIndex) {
                item.classList.add('active');
            }
            item.innerHTML = `
                <h3>${project.title}</h3>
                <video controls>
                    <source src="${project.videoSrc}" type="video/mp4">
                    Seu navegador não suporta a tag de vídeo.
                </video>
                <p>${project.description}</p>
            `;
            carouselContainer.appendChild(item);
        });
    }

    function changeCarouselIndex(direction) {
        currentIndex = (currentIndex + direction + projects.length) % projects.length;
        renderProjectCarousel(currentIndex);
    }

    // --- Funções de Observação ---

    function observeSections(sections) {
        const options = {
            root: null,
            threshold: 0.1,
            rootMargin: "0px"
        };

        const observer = new IntersectionObserver(handleIntersection, options);
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // --- Início do Código ---

    // Inicia o efeito de digitação
    startTypingEffect("typing-text", "Analista de suporte | Python | JS | HTML | CSS | Dev Full Stack");

    // Inicia a observação das seções
    const sections = document.querySelectorAll('.section');
    if (sections.length > 0) {
        observeSections(sections);
    }

    // Renderiza o carrossel inicial
    renderProjectCarousel(currentIndex);

    // Funções para controle do carrossel
    const nextButton = document.querySelector(".carousel-button-next");
    const prevButton = document.querySelector(".carousel-button-prev");

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            changeCarouselIndex(1);
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            changeCarouselIndex(-1);
        });
    }

});
