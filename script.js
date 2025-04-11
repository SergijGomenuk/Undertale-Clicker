let audio = document.querySelector('.main-theme');
let soundBtn = document.querySelector('.sound-btn');
let soundImg = document.querySelector('.sound-img');

// Функція для оновлення іконки звуку
function updateSoundIcon(isPlaying) {
  if (soundImg) {
    soundImg.src = isPlaying ? 'images/sound.png' : 'images/sound-off.png';
  }
}

// При завантаженні сторінки — читаємо стан з localStorage
window.addEventListener('load', () => {
  let savedState = localStorage.getItem('soundState');

  if (audio) {
    if (savedState === 'on') {
      audio.play().then(() => {
        updateSoundIcon(true);
      }).catch(() => {
        updateSoundIcon(false);
      });
    } else {
      updateSoundIcon(false);
    }
  }
});

// Обробка кліку по кнопці звуку
if (soundBtn && audio) {
  soundBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      updateSoundIcon(true);
      localStorage.setItem('soundState', 'on');
    } else {
      audio.pause();
      updateSoundIcon(false);
      localStorage.setItem('soundState', 'off');
    }
  });
}

///Swiper///
let swiperContainer = document.querySelector('.swiper');
if (swiperContainer) {
  let swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
}

// Модальні вікна (налаштування / про гру)
document.addEventListener('DOMContentLoaded', function () {
  let settingsBtn = document.querySelector('.settings-btn');
  let aboutBtn = document.querySelector('.about-btn');
  let settingsModal = document.getElementById('settings-modal');
  let aboutModal = document.getElementById('about-modal');
  let closeBtns = document.querySelectorAll('.close');

  function showModal(modal) {
    if (modal) modal.style.display = 'block';
  }

  function closeModal(modal) {
    if (modal) modal.style.display = 'none';
  }

  if (settingsBtn && settingsModal) {
    settingsBtn.addEventListener('click', () => {
      showModal(settingsModal);
    });
  }

  if (aboutBtn && aboutModal) {
    aboutBtn.addEventListener('click', () => {
      showModal(aboutModal);
    });
  }

  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      closeModal(modal);
    });
  });

  window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
      closeModal(event.target);
    }
  });
});