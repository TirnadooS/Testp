document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка по клику на ссылки
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            section.scrollIntoView({ behavior: 'smooth' });
            // Скрываем меню после клика на мобильных
            if (window.innerWidth <= 768) {
                document.querySelector('.nav-links').classList.remove('active');
            }
        });
    });

    // Переключение мобильного меню (нужен триггер, например, кнопка гамбургера)
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.createElement('div'); // Добавим кнопку гамбургера
    hamburger.innerHTML = '☰';
    hamburger.style.fontSize = '24px';
    hamburger.style.cursor = 'pointer';
    hamburger.style.display = 'none'; // Показываем только на мобильных
    document.querySelector('.nav').appendChild(hamburger);

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
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

    // Показываем гамбургер на мобильных и скрываем на десктопах
    function handleResize() {
        if (window.innerWidth <= 768) {
            hamburger.style.display = 'block';
            navLinks.style.display = 'none'; // Скрываем по умолчанию
        } else {
            hamburger.style.display = 'none';
            navLinks.style.display = 'flex';
            navLinks.classList.remove('active');
        }
    }
    window.addEventListener('resize', handleResize);
    handleResize(); // Вызываем сразу для начальной проверки
});
