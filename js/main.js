        // Фиксированная навигация при скролле
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Плавная прокрутка для якорных ссылок
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });


 //скрипт кнопки
  function domReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
      setTimeout(fn, 1);
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

 domReady(function () {
    const mainBtn = document.getElementById('contactMainBtn');
    const hiddenBtns = document.getElementById('contactHiddenBtns');
    const jivoBtn = document.getElementById('jivoChatButton');
    const callbackBtn = document.getElementById('callbackButton');
    const modal = document.getElementById('callbackModal');
    const closeBtn = document.querySelector('.close-modal');
    const callbackForm = document.getElementById('callbackForm');
    let jivoWidgetVisible = false;

    // Показ/скрытие скрытых кнопок
    mainBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        hiddenBtns.classList.toggle('show');
    });

    document.addEventListener('click', () => {
        hiddenBtns.classList.remove('show');
    });

    // Функция для управления JivoChat
    function toggleJivoChat() {
        if (typeof jivo_api !== 'undefined') {
            if (jivoWidgetVisible) {
                jivo_api.close();
            } else {
                jivo_api.open();
            }
            jivoWidgetVisible = !jivoWidgetVisible;
        } else {
            loadJivoChat();
        }
    }

    // Функция загрузки JivoChat
    function loadJivoChat() {
        const script = document.createElement('script');
        script.src = "//code.jivosite.com/widget/Hswl9k6ISZ";
        script.async = true;
        script.onload = () => {
            if (typeof jivo_api !== 'undefined') {
                jivo_api.open();
                jivoWidgetVisible = true;
                
                // Добавляем обработчик для стандартной кнопки Jivo
                const jivoWidgetBtn = document.querySelector('.jivo-widget-btn');
                if (jivoWidgetBtn) {
                    jivoWidgetBtn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        toggleJivoChat();
                    });
                }
            } else {
                console.warn('JivoChat загружен, но API пока не доступен');
            }
        };
        document.body.appendChild(script);
    }

    // Обработчик клика по кнопке JivoChat
    jivoBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleJivoChat();
        hiddenBtns.classList.remove('show');
    });

    // Открытие окна обратного звонка
    callbackBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        hiddenBtns.classList.remove('show');
    });

    // Закрытие модалки по крестику
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Закрытие модалки по фону
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Обработка формы обратного звонка
    callbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Спасибо! Мы скоро вам перезвоним.');
        modal.style.display = 'none';
    });
});


  