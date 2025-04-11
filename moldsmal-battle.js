let audio = document.querySelector('.main-theme');
let soundBtn = document.querySelector('.sound-btn');
let soundImg = document.querySelector('.sound-img');
let play_btn = document.querySelector('.play-btn');

let currDmgCount = document.querySelector('.currDmgCount')
let moldsmal = document.querySelector('.moldsmal')
let enemy_hp = document.querySelector('.enemy-hp-bar')
let enemy_hp_container = document.querySelector('.enemy-hp-container')
let attack_btn = document.querySelector('.attack-btn')
let item_btn = document.querySelector('.item-btn')
let items = document.querySelector('.items')
let weapons = document.querySelector('.weapons')
let knife_wpn = document.querySelector('.knife')
let gun_wpn = document.querySelector('.gun')
let grenade_wpn = document.querySelector('.grenade')
let bandage_itm = document.querySelector('.bandage')
let potion_itm = document.querySelector('.potion')

let knife_btn = document.querySelector('#knife-btn');
knife_btn.disabled = true;

let gun_btn = document.querySelector('#gun-btn');
gun_btn.disabled = true;

let grenade_btn = document.querySelector('#grenade-btn');
grenade_btn.disabled = true;

let bandage_btn = document.querySelector('#bandage-btn');
bandage_btn.disabled = true;

let potion_btn = document.querySelector('#potion-btn');
potion_btn.disabled = true;

let ehp = document.querySelector('#enemy-hp')

///Music///

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


///Fight buttons///


// Масив з ворогами //
let enemies = [
    { element: moldsmal, health: 50, enemyDmg: 4, attackSpd: 3000 },
];

let currEnemyDmg = enemies[0].enemyDmg
let attackSpeed = enemies[0].attackSpd
/// Віднімання здоров'я гравця ///
let counter = 100
function attackPlayer() {


    if (counter > 0) {
        setTimeout(function () {
            counter -= currEnemyDmg;

            player_hp.style.width = `${counter}px`;
            hp.innerHTML = 'HP ' + counter;

            if (counter <= 0) {
                window.location.href = "boss-choose.html";
                alert('You lose');
            }
        }, 1000);
    }
}

// Додавання обробника подій для кожного ворога //
enemies.forEach(enemy => {
    enemy.element.addEventListener('click', function () {
        attackEnemy(enemy);

    });
});


/// Життя гравця ///
let hp = document.querySelector('#player-hp');
let player_hp = document.querySelector('.player-hp-bar');



let currDmg = 1

// Функція атаки ворога //
function attackEnemy(enemy) {
    enemy_hp_container.style.opacity = '100';
    currDmgCount.innerHTML = "DMG: " + currDmg
    if (enemy.health > 0) {

        enemy.health -= currDmg;
        enemy_hp.style.width = `${enemy.health}%`;
        ehp.innerHTML = 'HP ' + enemy.health;
        if (enemy.health <= 0) {
            window.location.href = "boss-choose.html";
            alert("You win");
        }
    }
}


//Upgrade//
let upgrade1 = false;


function upgrade() {
    enemies.forEach(enemy => {
        if (!upgrade1 && enemy.health <= 25) {
            bandage_btn.disabled = false;
            knife_btn.disabled = false;
            currEnemyDmg = 10;
            anime({
                targets: moldsmal,
                opacity: 0, 
                duration: 500,
                complete: function () {
                    moldsmal.src = "images/Moldbygg.webp"; 
                    moldsmal.style.width = '10%';
                    anime({
                        targets: moldsmal,
                        opacity: 1, 
                        duration: 500,
                        easing: 'linear' 
                    });
                }
            });
            upgrade1 = true;
        }
    })
}


setInterval(upgrade, 100);


// Iнтервал для швидкості атаки ворогів
let enemyIntervalId = setInterval(attackPlayer, attackSpeed);



/// Ліміт життя гравця ///
if (counter > 100) {
    counter = 100;
    counterWidth = 100;
    player_hp.style.width = counterWidth + 'px';
}

/// Предмети ///



// Bandage //
let bandage_timer = document.querySelector('#bandage')

bandage_btn.addEventListener('click', function () {
    bandage_btn.disabled = true;

    setTimeout(function () {
        bandage_btn.disabled = false;
        bandage_timer.innerHTML = '';
    }, 10000);

    if (counter <= 100) {
        counter += 20;
        player_hp.style.width = `${counter}px`;
        hp.innerHTML = 'HP ' + counter;
    }
    if (counter > 100) {
        counter = 100
        player_hp.style.width = `${counter}px`;
        hp.innerHTML = 'HP ' + counter;
    }

    //Кд//
    let bandage_countdown = 10;
    bandage_timer.innerHTML = bandage_countdown;

    let bandageInterval = setInterval(function () {
        bandage_countdown--;
        bandage_timer.innerHTML = bandage_countdown;
        if (bandage_countdown <= 0) {
            clearInterval(bandageInterval);
            bandage_timer.innerHTML = '';
            bandage_btn.disabled = false;
        }
    }, 1000);

})

// Potion //
let potion_timer = document.querySelector('#potion')

potion_btn.addEventListener('click', function () {
    potion_btn.disabled = true;

    setTimeout(function () {
        potion_btn.disabled = false;
        potion_timer.innerHTML = '';
    }, 20000);

    if (counter <= 100) {
        counter += 40;
        player_hp.style.width = `${counter}px`;
        hp.innerHTML = 'HP ' + counter;
    }
    if (counter > 100) {
        counter = 100
        player_hp.style.width = `${counter}px`;
        hp.innerHTML = 'HP ' + counter;
    }

    //Кд//
    let potion_countdown = 20;
    potion_timer.innerHTML = potion_countdown;

    let potionInterval = setInterval(function () {
        potion_countdown--;
        potion_timer.innerHTML = potion_countdown;
        if (potion_countdown <= 0) {
            clearInterval(potionInterval);
            potion_timer.innerHTML = '';
            potion_btn.disabled = false;
        }
    }, 1000);
});

//Кнопка атаки//
attack_btn.addEventListener('click', function () {
    weapons.style.display = 'flex'
    attack_btn.style.display = "none"
    attack_btn.style.position = "absolute"
})

//Кнопка предметів//
item_btn.addEventListener('click', function () {
    items.style.display = 'flex'
    item_btn.style.display = 'none'
    item_btn.style.position = "absolute"
})




// Дмг зброї //
knife_btn.addEventListener('click', function () {
    currDmg = 5;
    if (currDmg = 5) {
        knife_wpn.style.border = "4px solid yellow"
        gun_wpn.style.border = "1px solid orange"
        grenade_wpn.style.border = "1px solid orange"
        currDmgCount.innerHTML = "DMG: " + currDmg
    }
});

gun_btn.addEventListener('click', function () {
    currDmg = 10
    if (currDmg = 10) {
        gun_wpn.style.border = "4px solid yellow"
        knife_wpn.style.border = "1px solid orange"
        grenade_wpn.style.border = "1px solid orange"
        currDmgCount.innerHTML = "DMG: " + currDmg
    }
});

grenade_btn.addEventListener('click', function () {
    if (currDmg = 20) {
        grenade_wpn.style.border = "4px solid yellow"
        gun_wpn.style.border = "1px solid orange"
        knife_wpn.style.border = "1px solid orange"
        currDmgCount.innerHTML = "DMG: " + currDmg
    }
});


let item_descr = [
    "5 dmg",
    "10 dmg",
    "20 dmg",
    "Heal 20 HP",
    "Heal 40 HP"
];

//Опис предметів//
let descr = document.querySelector('#descr');

function showDescr(index) {
    descr.textContent = item_descr[index];
    descr.style.height = 'auto';
}

function hideDescr() {
    descr.textContent = '';
}
