let sound_btn = document.querySelector(".sound-btn");
let main_ost = document.querySelector('.main-theme');
let sound_img = document.querySelector('.sound-img');
let play_btn = document.querySelector('.play-btn');
let clone1 = document.querySelector('#sdClone1')
clone1.disabled = true
let clone2 = document.querySelector('#sdClone2')
clone2.disabled = true

let boss_fight = document.querySelector('.boss-fight')
let currDmgCount = document.querySelector('.currDmgCount')
let snowdrake = document.querySelector('.snowdrake')
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


///Fight buttons///


// Масив з ворогами //
let enemies = [
    { element: snowdrake, health: 100, enemyDmg: 3, attackSpd: 4000 },
];

let attackSpeed = enemies[0].attackSpd
let currEnemyDmg = enemies[0].enemyDmg

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
        defeatClone1()
        defeatClone2()
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

//Clones//
function spawnClone1() {
    clone1.style.display = "flex";
    clone1.disabled = false;
}

function spawnClone2() {
    clone2.style.display = "flex";
    clone2.disabled = false;
}

function WrongClone1() {
    clone1.style.display = "none";
    clone1.disabled = true;
    alert("Wrong, -20")
    currEnemyDmg = 8;
    counter -= 20;
    anime({
        targets: '.snowdrake',
        keyframes: [
            { translateX: 250 },
            { opacity: 0 },
            { translateX: 0 },
            { opacity: 100 }
        ],
    });
}

function WrongClone2() {
    clone2.style.display = "none";
    clone2.disabled = true;
    alert("Wrong, -40")
    currEnemyDmg = 8;
    counter -= 40;
    anime({
        targets: '.snowdrake',
        keyframes: [
            { translateX: -250 },
            { opacity: 0 },
            { translateX: 0 },
            { opacity: 100 }
        ],
    });
}

function defeatClone1() {
    clone1.style.display = "none";
    clone1.disabled = true;

}

function defeatClone2() {
    clone2.style.display = "none";
    clone2.disabled = true;
}

clone1.addEventListener('click', WrongClone1)
clone2.addEventListener('click', WrongClone2)

//Upgrade//
let upgrade1 = false;
let upgrade2 = false;

function upgrade() {
    enemies.forEach(enemy => {
        if (!upgrade1 && enemy.health <= 80) {
            knife_btn.disabled = false;
            bandage_btn.disabled = false;
            currEnemyDmg = 4;

            anime({
                targets: '.snowdrake',
                keyframes: [
                    { translateX: 10 },
                    { opacity: 0 },
                    { translateX: 260 },
                    { opacity: 100 },
                ],
                update: function (anim) {
                    if (anim.progress >= 74) {
                        spawnClone1();
                    }
                },
                complete: function (anim) {
                    boss_fight.style.opacity = '1';
                    main.disabled = false;
                    boss_fight.disabled = false;
                    snowdrake.style.opacity = '1'
                }
            });

            upgrade1 = true;
        }

        if (!upgrade2 && enemy.health <= 40) {
            potion_btn.disabled = false;
            spawnClone2();

            anime({
                targets: '.snowdrake',
                keyframes: [
                    { translateX: -10 },
                    { opacity: 0 },
                    { translateX: -260 },
                    { opacity: 100 },
                ],
                update: function (anim) {
                    if (anim.progress >= 74) {

                    }
                },
                complete: function (anim) {
                    boss_fight.style.opacity = '1';
                    main.disabled = false;
                    boss_fight.disabled = false;
                }
            });
            upgrade2 = true;
        }
    });
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

})


potion_btn.addEventListener('click', function () {
    potion_btn.disabled = true; // Вимикаємо кнопку "Potion"

    setTimeout(function () {
        potion_btn.disabled = false; // Після 10 секунд активуємо кнопку "Potion" знову
        potion_timer.innerHTML = ''; // Очищаємо вміст таймера
    }, 10000); // Таймер на 10 секунд

    let counter = parseInt(player_hp.style.width); // Отримуємо поточне значення ширини HP смуги
    if (counter <= 100) {
        counter += 20; // Збільшуємо HP на 20 одиниць
        player_hp.style.width = `${counter}%`; // Оновлюємо ширину HP смуги у відсотках
        hp.innerHTML = 'HP ' + counter; // Оновлюємо текст HP
    }
    if (counter > 100) {
        counter = 100; // Обмежуємо максимальне значення HP до 100
        player_hp.style.width = `${counter}%`; // Оновлюємо ширину HP смуги у відсотках
        hp.innerHTML = 'HP ' + counter; // Оновлюємо текст HP
    }

    let potion_countdown = 20; // Початкове значення таймера на кнопці "Potion"
    potion_timer.innerHTML = potion_countdown; // Встановлюємо відображення таймера

    let potionInterval = setInterval(function () {
        potion_countdown--; // Зменшуємо таймер на 1 секунду
        potion_timer.innerHTML = potion_countdown; // Оновлюємо відображення таймера

        if (potion_countdown <= 0) {
            clearInterval(potionInterval); // Зупиняємо інтервал, коли таймер досягає 0
            potion_timer.innerHTML = ''; // Очищаємо відображення таймера
            potion_btn.disabled = false; // Активуємо кнопку "Potion"
        }
    }, 1000); // Інтервал оновлення таймера кожну секунду
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
