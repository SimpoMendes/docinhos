document.addEventListener('DOMContentLoaded', () => {

  // ===== SLIDER =====
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let currentSlide = 0;
  const AUTO_DELAY = 5000;
  let intervalId = null;

  function showSlide(index) {
    index = ((index % slides.length) + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  function startAuto() {
    stopAuto();
    intervalId = setInterval(nextSlide, AUTO_DELAY);
  }

  function stopAuto() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAuto(); });

  const sliderEl = document.querySelector('.slider');
  if (sliderEl) {
    sliderEl.addEventListener('mouseenter', stopAuto);
    sliderEl.addEventListener('mouseleave', startAuto);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { nextSlide(); startAuto(); }
    if (e.key === 'ArrowLeft')  { prevSlide(); startAuto(); }
  });

  showSlide(currentSlide);
  startAuto();


  // ===== FORMULÁRIO AJAX PARA FORMCARRY =====
  const form = document.querySelector('.form-contato');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // impede envio normal

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          alert('Mensagem enviada com sucesso! 🎉');
          form.reset();
        } else {
          alert('Erro ao enviar. Tente novamente.');
        }
      } catch (error) {
        alert('Erro de conexão. Tente novamente.');
        console.error(error);
      }
    });
  }

});
