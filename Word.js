const helpButton1 = document.querySelector('.help-button'); // Измененный селектор
const popup1 = document.getElementById('popup');
const closeButton1 = document.getElementById('closeButton');

helpButton.addEventListener('click', () => {
  popup.style.display = 'block';
});

closeButton.addEventListener('click', () => {
  popup.style.display = 'none';
});





document.addEventListener('DOMContentLoaded', function() {
  const helpButton = document.getElementById('help-button');
  const modal = document.getElementById('help-modal');
  const closeButton = document.querySelector('.close-button');

  helpButton.addEventListener('click', function() {
      modal.style.display = 'block'; // Показать модальное окно
  });

  closeButton.addEventListener('click', function() {
      modal.style.display = 'none'; // Скрыть модальное окно
  });

  window.addEventListener('click', function(event) {
      if (event.target === modal) {
          modal.style.display = 'none'; // Скрыть модальное окно при клике вне его
      }
  });
});
