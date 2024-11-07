document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');

    const options = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Para não observar novamente
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});

function renderProjects() {
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.innerHTML = ''; // Clear existing items

    projects.forEach((project, index) => {
        const item = document.createElement('div');
        item.classList.add('carousel-item');
        if (index === currentIndex) {
            item.classList.add('active'); // Adiciona classe active ao item atual
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