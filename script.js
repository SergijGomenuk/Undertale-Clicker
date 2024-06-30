let sound_btn = document.querySelector(".sound-btn");
let main_ost = document.querySelector('.main-theme');
let sound_img = document.querySelector('.sound-img');
let play_btn = document.querySelector('.play-btn');


///Swiper///

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


///Music///

document.querySelector('.sound-btn').onclick = function () {
  if (main_ost.paused == true) {
    main_ost.play()
    sound_img.src = "images/sound.png"
  }
  else {
    main_ost.pause()
    sound_img.src = "images/sound-off.png"
  }
}


