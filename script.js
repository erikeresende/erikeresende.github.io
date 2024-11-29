// --- Funções do Carrossel ---
let currentIndex = 0;
let isMouseDown = false;
let startX;
let scrollLeft;
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

// Função para renderizar o carrossel
function renderProjectCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    if (!carouselContainer) return;

    const project = projects[currentIndex];
    const mediaContent = project.videoSrc
        ? `<video controls class="video-responsive">
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

// Função para mudar o índice do carrossel
function changeCarouselIndex(direction) {
    currentIndex = (currentIndex + direction + projects.length) % projects.length;
    renderProjectCarousel();
}

// Deslizar automático (intervalo)
let autoSlideInterval = setInterval(() => {
    changeCarouselIndex(1);
}, 5000); // Troca de slide a cada 5 segundos

// Função para começar o arrasto
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    startX = e.pageX - carouselContainer.offsetLeft;
    scrollLeft = carouselContainer.scrollLeft;
    carouselContainer.style.cursor = 'grabbing'; // Cursor de arraste
});

// Função para parar o arrasto
carouselContainer.addEventListener('mouseleave', () => {
    isMouseDown = false;
    carouselContainer.style.cursor = 'grab'; // Cursor normal
});

// Função para realizar o arrasto
carouselContainer.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - carouselContainer.offsetLeft;
    const walk = (x - startX) * 3; // Multiplicador de velocidade de deslize
    carouselContainer.scrollLeft = scrollLeft - walk;
});

// Função para reiniciar o carrossel (se estiver fora da área visível)
carouselContainer.addEventListener('mouseup', () => {
    isMouseDown = false;
    carouselContainer.style.cursor = 'grab'; // Cursor normal
    if (carouselContainer.scrollLeft >= carouselContainer.scrollWidth - carouselContainer.offsetWidth) {
        carouselContainer.scrollLeft = 0; // Reinicia quando chega ao fim
    }
});

document.addEventListener('DOMContentLoaded', () => {
    renderProjectCarousel();
});

