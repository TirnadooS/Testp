document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка по клику на ссылки
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Обработка формы через AJAX
    const form = document.getElementById('contact-form');
    const messageDiv = document.getElementById('form-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);

        fetch('process.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            messageDiv.textContent = data.message;
            messageDiv.style.color = data.success ? 'green' : 'red';
            if (data.success) {
                form.reset();
            }
        })
        .catch(error => {
            messageDiv.textContent = 'Произошла ошибка.';
            messageDiv.style.color = 'red';
        });
    });

    // Добавление видео (замените URL на свой)
    const gallery = document.querySelector('.gallery-grid');
    const video = document.createElement('video');
    video.controls = true;
    video.src = 'your-video.mp4'; // Замените на путь к вашему видео
    video.style.width = '100%';
    video.style.borderRadius = '10px';
    gallery.appendChild(video);
});
