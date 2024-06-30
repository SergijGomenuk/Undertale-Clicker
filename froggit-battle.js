let sound_btn = document.querySelector(".sound-btn");
let main_ost = document.querySelector('.main-theme');
let sound_img = document.querySelector('.sound-img');
let play_btn = document.querySelector('.play-btn');

let currDmgCount = document.querySelector('.currDmgCount')
let froggit = document.querySelector('.froggit')
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
    { element: froggit, health: 20, enemyDmg: 2, enemySPD: 1500 },
];



// Додавання обробника подій для кожного ворога //
enemies.forEach(enemy => {
    enemy.element.addEventListener('click', function () {
        attackEnemy(enemy);

    });
});



/// Життя гравця ///
let counter = 100;
let hp = document.querySelector('#player-hp');
let player_hp = document.querySelector('.player-hp-bar');

/// Віднімання здоров'я гравця ///
function attackPlayer() {
    if (counter > 0) {
        counter -= 2;
        player_hp.style.width = `${counter}%`;
        hp.innerHTML = 'HP ' + counter;

        if (counter <= 0) {
            window.location.href = "boss-choose.html";
            alert('You lose');
        }
    }
}

let currDmg = 1


// Функція атаки ворога //
let clickDone = false; 

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

        if (!clickDone && enemy.health <= 10) {
            knife_btn.disabled = false;
            bandage_btn.disabled = false;
            clickDone = true;
        }
    }
}

// Iнтервал для швидкості атаки ворогів
let enemyIntervalId = setInterval(attackPlayer, 1500);

/// Ліміт життя гравця ///
if (counter > 100) {
    counter = 100;
    counterWidth = 100;
    player_hp.style.width = counterWidth + 'px';
}


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



//Attack btn//
attack_btn.addEventListener('click', function () {
    weapons.style.display = 'flex'
    attack_btn.style.display = "none"
})

//Item btn//
item_btn.addEventListener('click', function () {
    items.style.display = 'flex'
    item_btn.style.display = 'none'
})





// Додавання обробників подій для кожної зброї //
//knife//
knife_wpn.addEventListener('click', function () {
    currDmgCount.innerHTML = "DMG: " + currDmg
    currDmg = 5
    if (currDmg = 5) {
        knife_wpn.style.border = "4px solid yellow"
        gun_wpn.style.border = "1px solid orange"
        grenade_wpn.style.border = "1px solid orange"
    }
});

//gun//
gun_wpn.addEventListener('click', function () {
    currDmgCount.innerHTML = "DMG: " + currDmg
    currDmg = 10
    if (currDmg = 10) {
        gun_wpn.style.border = "4px solid yellow"
        knife_wpn.style.border = "1px solid orange"
        grenade_wpn.style.border = "1px solid orange"
    }
});
//grenade//
grenade_wpn.addEventListener('click', function () {
    currDmgCount.innerHTML = "DMG: " + currDmg
    if (currDmg = 20) {
        grenade_wpn.style.border = "4px solid yellow"
        gun_wpn.style.border = "1px solid orange"
        knife_wpn.style.border = "1px solid orange"
    }
});


//Масив описів//
let item_descr = [
    "5 Dmg",
    "10 Dmg",
    "20 Dmg",
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