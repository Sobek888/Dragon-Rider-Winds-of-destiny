import { RPS } from './RPS.js';
import { TTT } from './TTT.js';
import { puzzle } from './puzzle.js';

// header element
const header = document.querySelector("#header");

let currentHeader = 0;

const headerLocations = [
  { title: "South-east of Indus Vallis" },
  { title: "Grandma's Backyard" },
  { title: "Grandma's Kitchen" },
  { title: "Departure" },
  { title: "The road" },
  { title: "The shortcut" },
  { title: "The main road" },
  { title: "The Storm" },
  { title: "The cave" },
  { title: "Cave's Entrance hallway" },
  { title: "Incubation shaft" },
  { title: "Main Chamber" },
  { title: "The Egg" },
  { title: "Antigravity AI Assistant" }
];



// player

let xp;
let health;
let maxHealth;
// inventory 

let noDust;
let cDust;
let rDust;
let lDust;
let healCardrige;
let pdaInstal = false;

// combat

let combat = false;
let totalDmg = 0;

// event

let sEggs = 0;


// weapons
let currentWeapon = 0;

const weapons = [
  {
    name: '"Hardwood Staff"',
    powerMin: 5,
    powerMax: 7,
    crit: 11,
    text: "With a simple motion you deliver accurate attack on the enemy.",
    critText: " You spin the staff around your body giving it extra speed. It wooshes through the air and lands on the head of the opponent. You deal Critical damage. "
  },
  {
    name: '"Spear" ',
    powerMin: 17,
    powerMax: 21,
    crit: 28,
    text: "You spin the spear at your side, culminating in a swift slice towards the enemy, the razor-sharp edge cutting through everything that is on it's path.",
    crittext: " Arching your entire body backward and balancing on one foot, you focus the weight like a taut string, primed for release. With an explosive, fluid motion, you unleash the accumulated tension, driving your arms forward. The spear's tip, cutting through the air at incredible speed, pierces the enemy's body dealing Critical damage."
  },
];

// monsters 

let fighting = 0;
let monsterHealth;
let isMonsterDead = false;

const monsters = [
  {
    name: "Practice Dummy",
    level: 3,
    damageMin: 0,
    damageMax: 0,
    crit: 5,
    health: 45,
    critText: "You tripped over a little stone and bumped your head into the bucket. Ouch!",
    deathText: "Bucket falls from dummy and rolls down to your feet. You place your foot on top of it and scream in victory 'UUUAAAAA!!'"
  },
  {
    name: "Young Bandit",
    level: 8,
    damageMin: 7,
    damageMax: 10,
    crit: 14,
    health: 88,
    text: " young bandit reach you and land a punch",
    critText: " young bandit hard kicks knocks you of balance for a moment",
    deathText: "With the last strike, Young bandit's eyes seem to lost focus, he wobbles on his feet and almost hits the ground, but manage to prop himself with his hand. He then turns around swiftly and heads away from you, runing, still trying to maintain his balance.",
    playerDeath: "Young Bandint knocks you out uncountios. He takes your cart and runs away with all it's load. 3P-A immidietly flies towards you home to get help, but you never found out what happened ... Terrific sand storm covered your body and you were never found. Harsh reality forgives no one. "
  },
  {
    name: "Baby Spiderling",
    level: 10,
    damageMin: 7,
    damageMax: 10,
    crit: 14,
    health: 60,
    text: " Baby spiderling bites your leg",
    critText: "Baby spiderling jumps and reach your shoulder biting it on the side causing bleedin",
    deathText: "After last hit baby spiderling stiffens its legs and rolls on its back. Starts twitching. It seems to be dead.",
    playerDeath: "Young spiderling bites your neck and injects venom, they have no control over dose. Your feel its effects immidietly and fell down on th ground, loosing countionsness. Your body was never found. Gramma moarns her loss and move to live with your uncle. Tragedy strucked her again."
  },
  {
    name: " Spiderling",
    level: 14,
    damageMin: 7,
    damageMax: 10,
    crit: 14,
    health: 120,
    text: " Spiderling extend it's front legs and delivers a pounding hit on your chest",
    critText: " Spiderling reach you with its fangs and bite you causing bleeding.",
    deathText: "Spiderling stiffens up and rolls on it's back. Starts twitching. It seems to be dead.",
    playerDeath: "Spiderling bites you in your chest, striking the heart. You feel pain for a moment, but it's over. You know it's over. You see faces of your parents and your grandma, hoping for the last time that she will be okay."
  },
  {
    name: "Arakh Queen",
    level: 33,
    damageMin: 7,
    damageMax: 10,
    crit: 14,
    health: 350,
    text: " Queen spits hardened ball of web that hits you.",
    critText: " Queen swoops its long legs and gets you of your feet.",
    deathText: "Queen jumps towards you, but you were ready, you proped the other end of the stick firmly on the ground at angle towards the Queen, you aimed between the jaws. She then falls straigth on it and puncture her head dying instantly. Momentum of her body pushes you away and you fall on a rock hitting your head. Your ears are ringing, but you dont panic. You know its over.the queen is dead.",
    playerDeath: "Queens jumps on you and holds you with her many legs, rolling you like a cotton candy in it's web, then injects venom. You are terrified, but just for a moment, you fait away like falling asleep, but never wake up. She takes you to incubation shaft for spiderling to feed on you while you are still alive."
  },
  {
    name: "Backyard Monster",
    level: 4,
    damageMin: 4,
    damageMax: 7,
    crit: 8,
    health: 45,
    text: "Monster dashes your way and reaches you with its sharp claw. You take some damage.",
    deathText: "With your last strike enemy falls down and stop moving. You place your foot on top of its body and scream in victory 'UUUAAAAA!!'"
  },
];

// game locations

let currentLocation = 0;

const locations = [
  {
    name: "arena0",
    "button text": ["Fight!", "Snap out of it!"],
    "button functions": [goFight0, snapOut],
    text: "As you stare into the cold, motionless eyes of a monster, it's red pupils seems to be fixated on you, looking for weakness. A sense of dread fills your whole body. It's head, like an armor, shines in the light of a rising sun. Time seems to stop, your palms start to sweat. You need to make a decision, to take on this battle or leave to fight another day?"
  },
  {
    name: "training1",
    "button text": ["Attack!", "Parry"],
    "button functions": [pressAttack, pressParry],
    text: "You decided to fight. What's next?!"
  },
  {
    name: "broken dummy2",
    "button text": ["Scratch head", "Shout in victory!"],
    "button functions": [empty, empty],
    text: "Metal bucked fall down on the ground and rolled towards You, you placed your foot on the head of the enemy claiming victory over imaginanated monster."
  },
  {
    name: "road3",
    "button text": ["shortcut", "main road"],
    "button functions": [shortcut, main],
    text: "After a day and a half traveling, you see the little path going out east from the main road to the valley. 3P-A is howering next to you making a low humming noise, it displays that you will reach the city in less than 3 days following the roadcut in the mountain, a common path for travelers."
  },
  {
    name: "shortcut4",
    "button text": ["fight", "runaway"],
    "button functions": [goFight2, runaway],
    text: "The shortcut winds down to a valley filled with big, loose rocks. The mostly flat surface suggests that long ago, it was once an old river bed. All goes smoothly until suddenly, a person jumps out from behind a massive rock. He threatens you holding a rock in his hand, demanding that you give him all your possessions."
  },
  {
    name: "main road5",
    "button text": ["whistle", "chant"],
    "button functions": [calm, calm],
    text: "Misha continue this expedition with no hiccups, cart works fine, sight of tripple a being like a little puppy, curious and excited about everything makes you smile. Its a good day."
  },
  {
    name: "bandits6",
    "button text": ["Attack!", "Parry"],
    "button functions": [pressAttack, pressParry],
    text: "The young bandit stands before you, dressed in rugged clothing. His face is rough and weathered and he smirks in confidence. You can tell it's not his first time and you don't know what he's capable of, but neither does he."
  },
  //cutscene
  {
    name: "exploration7",
    "button text": ["Left", "right"],
    "button functions": [mainHall, corridor],
    text: "The wind was defening, you woudlnt dare to go outside. It was time to explore the cave. The storm might take a while, might as well see the other options. There is a crossroad. You can go lef or right."
  },
  // right
  {
    name: "corridor8",
    "button text": ["Touch", "go further"],
    "button functions": [goFight3, further],
    text: "The corridor is getting smaller but still big enough to follow. Spiderwebs and slime is everywhere. You see wet eggs the size of a big wattermelon bunched together. You getting a closer look."
  },
  {
    name: "eggs9",
    "button text": ["Attack!", "Parry"],
    "button functions": [pressAttack, pressParry],
    text: "You curiousity took over and you touched the wet egg. 'You never touch the wet egg' as you remember your father always told you when exploring caves when you where little. It started to wobble and bursted. Small spiderling jump out and directly lock onto you. It got fangs and posture with front legs up. Dont let it get you."
  },
  {
    name: "further10",
    "button text": ["search", "leave it"],
    "button functions": [cocoon, goFight4],
    text: "You see a cacoon in shape of a human body, it doesnt move. Whoever is inside is long gone. You wonder if you should look inside."
  },
  {
    name: "search11",
    "button text": ["Look inside the jacket", "Search pants pockets"],
    "button functions": [takePda, takeDust],
    text: "You command 3P-A to cut opening with its laser. Inside you see a soldier in Gurdian faction uniform. You hasitate to search the body."
  },
  {
    name: "young spider12",
    "button text": ["Attack!", "Parry"],
    "button functions": [pressAttack, pressParry],
    text: "Suddenly, a dog size spider jumps out from the shadows and tries to attack you without any warning."
  },
  {
    name: "Main chamber13",
    "button text": ["Go in", "Go back"],
    "button functions": [finalBoss, explore],
    text: "You checked all the other corners of the cave. Storm doesnt seems to be stopping. Its sounds are deffenign when you approach the entrence. You decide to face whatever lukrs inside the main chamber."
  },
  {
    name: "final boss14",
    "button text": ["Fight", "Fight"],
    "button functions": [goFight5, goFight5],
    text: "You see a gian spider Queen clikcing its jaws in terrifing way, you can feel it in your bones, sends a wave of terror through out your body, but you cant back up now. You need to face it"
  },
  {
    name: "Queen fight15",
    "button text": ["Attack!", "Parry"],
    "button functions": [pressAttack, pressParry],
    text: "Giant spider noticed your presence and skreeeks in high pitch sending a wave of piercing sound through out the cave. It throwing it's leg in the air towards you but seems to be protecting soemthing shining under her body and dont want to leave it's side."
  },
  {
    name: "shortcut4 -> Runaway16",
    "button text": ["fight", "fight"],
    "button functions": [goFight2, goFight2],
    text: "You turned you back to the bandit and put yourself in disadvantage position. Young bandit doesnt hasitate to use it against you and throws a rock in your head. Now, you have no choice. You need to fight."
  },
  {
    name: "took pda first17",
    "button text": ["empty", "search pants pockets"],
    "button functions": [empty, takeDust2],
    text: "You lift the side of the jacket and find a device that appears to be military grade PDA. You take it in your hand and stare at it as it reminds you of the one that your father had."
  },
  {
    name: "took dust first18",
    "button text": ["look inside the jacket", "empty"],
    "button functions": [takePda2, empty],
    text: "You reach the bulky object in the pocket. You take it out and to your surprise, you see a rare dust vial, quite a find in these times. Its worth some credits."
  },
  {
    name: "empty cocoon19",
    "button text": ["empty", "empty"],
    "button functions": [empty, empty],
    text: "There is nothing left, but the dried out corps of a soldier. You take the dogtag. It says Benjamin Ronalds. Behind every death there is a family that moarns. Maybe they would want to know. Then on the back of it there is some kind of poem engraved, you wonder what that could be. Maybe has to do something with the locket."
  },
  {
    name: "take pda2 20",
    "button text": ["look for more", "look for more"],
    "button functions": [emptyCocoon, emptyCocoon],
    text: "You lift the side of the jacket and it appears to be some kind of locket. It appear to have some symbols in front of it. You remember your father had one just like this one with symbols you had to set in right configuration in order to open it."
  },
  {
    name: "take dust2 21",
    "button text": ["look for more", "look for more"],
    "button functions": [emptyCocoon, emptyCocoon],
    text: "You reach the bulky object in the pocket. You take it out and to your surprise, you see a rare dust vial, quite a find in these times. Its worth some credits."
  },
  {
    name: "looping tunnel 22",
    "button text": ["left", "right"],
    "button functions": [mainHall, corridor],
    text: "You again standing before the big hole leading to a cave main chamber and tunnel leading to the right side. Where do you want to go?"
  },
  {
    name: "no more looping tunnel 23",
    "button text": ["left", "left"],
    "button functions": [mainHall, mainHall],
    text: "You explered this section of a cave enough, there is nothing left there to see. You feel stronger and ready to face the deep darkness of a main chamber. Whatever lurkes there, you are ready!"
  },
  {
    name: "to weak to enter 24",
    "button text": ["go back!", "DANGER!"],
    "button functions": [loopingCave, loopingCave],
    text: "Endless darkness penetrate your senses. 3P's ligh is not reaching far on emergency mode, but it displays 'DANGER'. Clicking noises and sounds you are not familiar with paralize you. You shouldn't go there."
  },
  {
    name: "trigger event Cocoon 25",
    "button text": ["empty", "empty"],
    "button functions": [empty, empty],
    text: "There is nothing left to see. "
  },
  {
    name: "snap out of it 26",
    "button text": ["Fight!", "run to Grandma"],
    "button functions": [goFight, seeGrandma],
    text: "The vail has dropped and reality came back to normal. A sticks bounded with a rope dressed in a dirty burlup sack standing on a pole. A iron backet hangs loose on top with painted red angry eyes. Its for practice, i guess."
  },
  {
    name: "training0 27",
    "button text": ["Attack!", "Parry"],
    "button functions": [pressAttack, pressParry],
    text: "You took a deep breath. You feel adrenaline pumping through your veins. You know its now or never. There is only one goal. Defeat the monster. "
  },
  {
    name: "minigames 28",
    "button text": ["Meteor, force field, saber", "WhackArach - A"],
    "button functions": [rps, ttt],
    text: "You thinking to pass some time and open the 3P-A game menu."
  }
];

// cutscenes

const cutscene = [
  {
    text: "<p>High-pitched tones from a robot and loud knocks echoed from the garden through the kitchen window. The enthusiastic taunts of young men ceased when an old lady shout.</p> <p> - MISHA! ... MIIIISHAAAA! ... - she yelled.</p><p> - Yes, grandma!? - Misha responded.</p><p> - Come here, I need to talk to you! </p> <p> - I'm coming, Grandma! Just few more ... strikes! - he replied, delivering another loud knock.</p> <p> - When will he finally stop playing around? ... - the old lady muttered as she wrapped up the last meteor dust vial.</p>"
  },
  {
    text: "<p> - I'm here, Grandma, - said Misha, entering the kitchen with vigor.</p> <p> - Come here honey ... You know, you remind me of your father - said Grandma.</p> <p> - You mean brave and adventurous? - Misha asked.</p> <p> - No! Living in a fantasy world and reckless! - Grandma replied arroused, she then soften her voice and continue - You need to start helping around the house. It's hard for me alone and we need to think about how we'll survive if things get worse. The Arach attack and wars between factions are bad enough for all of us. We need to be serious about preparing for the worst.</p> <p>Grandma handed Misha a vial of dust packed in paper. </p> <p> - Put it in the crate and load everything into the cart.</p> <p>Misha took the vial without saying anything and put it in the crate. Lifting up the crate, he looked at Grandma. She pointed to the cart, and he left the house through the kitchen doors.</p>"
  },
  {
    text: "After a moment has passed, Misha and Grandma finished wrapping the cart with the tarp and made sure everything was attached tightly.<p> - Misha, I want you to take this cart to your uncle in the city, - said Grandma. - I packed your father's armor, your mother's jewelry, and other things that we need to get rid of to be able to survive. There is a chest that I don't want you to mess around with. Your uncle knows about it. It's locked, and it should stay that way. The crates of dust vials are at the back, so it will be easier to unload when you get there. I made you food for the road. It's all in the front. Try to be smart with it. The gyro of the cart is fixed. Giovanni, our neighbor, helped me out with it. He is a very kind man and skillful mechanic, but try to be careful. You know how often those carts break. Please Misha, take the safe path and pay attention on the road. If anything seems to be out of the ordinary, send the 'triple A' to your uncle for help. I have PDA for your robot with preinstalled medical functions. If you get injured, just use it. I will load cartridges for three uses, just in case, but I'd rather you didn't use any of them. </p>"
  },
  {
    text: "<p>Grandma noticed he was losing focus.</p><p> - Misha! Are you listening? This is very important. You need to stay focused. It can be dangerous out there. I don't want anything to happen to you, do you understand?</p><p> - I know grandma, I'm sorry. I just...I really miss them, you know?</p><p>She took him close to herself and calmed his head, trying to soothe his pain.</p><p> - I know sweetheart, I missed them too. A lot of people do. They were great figures in our land, but it's time to move on. They would want that for us. We need to live and try to always keep them in our hearts. - she kissed his forehead and said, - It's time for you to go. The weather feels calm now, but it might change anytime. Just remember to stick to the main road.</p><p> - I will grandma, don't worry. I will be back sooner than you think.</p><p> He gave Grandma last hug and mounted the cart, meanwhile, grandma installed PDA in the robot. Misha was ready, and giving her a smile, he departed. She watched him leaving until she lost him of her sight.</p>"
  },
  {
    text: " There was strange calmness for a moment, that felt out of ordinery. Like the world stop for a second, then all of a sudden the wind has picked up, the sky darkened. Behind the rocks of the valley big red wall of fine marsian sand was appearing from nowhere. Misha needs to find a shelter otherwise he wont't survive. "
  },
  {
    text: " At the last moment he saw a cave in the distans and run straight towrds it. A wall of red dust close the entrence behind Misha. He is trapped, but safe. Darkness was overhelming, it was a shock that made other senses sharpened. Misha wasn't sure the noices coming from the cave were real or he was just imagining? Quickly he manage to pull himself together and order 3P-A to light up the place. Due to lack of sun energy the machine set up is the low consumption mode and turned on the yellow light. It wasnt reaching far, but was enough to make sense of the area. Misha decided to set a camp. Who knows how long this will last."
  },
  {
    text: "here a player won with the Arakh Queen"
  },
  {
    text: "here you noticed the egg."
  },
  {
    text: "you take the egg, the adventure is finished, but its just the beggining."
  },
  {
    text: "Misha took the locket and went to the cart to sit down and tinker with it. He turn around the dogtag and reads the poem' One rules the ground, one rules the skies.Both wear a crown, One never dies. eternal embraceTheir power entwine At the centre of space Energy  aligns. Like a clock, cycles go round No man can make it stopNo one can shut it down'"
  }
];

// 3P-A "TripleA" as Antigravity AI Asssitant

let pdaType = 0;

const asistant = [
  [{
    mode: "standard unit",
    name: "home screen",
    "button text": ["empty", "empty", "esc"],
    "button functions": [emptySlot, emptySlot, esc]
  }
  ],
  [{
    mode: "medical unit",
    name: "home screen",
    "button text": ["empty", "Health", "esc"],
    "button functions": [empty, healing, esc]
  },
  {
    name: "health",
    "button text": ["empty", "Heal", "Home"],
    "button functions": [empty, heal, home],
    text: "You feel sour from the fight, you want to regroup and take care of your inventory."
  }
  ],
  [{
    mode: "military unit",
    name: "home screen",
    "button text": ["Craft", "Health", "esc"],
    "button functions": [crafting, healing, esc]
  },
  {
    name: "health",
    "button text": ["Health Cardrige", "Heal", "Home"],
    "button functions": [makeHealth, heal, home],
    text: "You feel sour from the fight, you want to regroup and take care of your inventory."
  },
  {
    name: "craft",
    "button text": ["Upgrade Weapon", "empty", "Home"],
    "button functions": [upgradeWeapon, emptySlot, home],
    text: "You feel sour from the fight, you want to regroup and take care of your inventory."
  }]
];

// initialize story

header.innerText = headerLocations[0].title;
index.addEventListener("click", start);
document.getElementById("hcText").textContent = healCardrige;

// html elements

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const hcText = document.querySelector("#hcText");
const dustText = document.querySelector("#dustText");
const cDustText = document.querySelector("#cDustText");
const rDustText = document.querySelector("#rDustText");
const lDustText = document.querySelector("#lDustText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const rpsMini = document.querySelector("#rps");
const headerText = document.querySelector("#header");
const arrowRight = document.querySelector("#arrowRight");
const puzzleContainer = document.getElementById("puzzle-container");
const closePuzzleButton = document.getElementById("close-puzzle-button");
const puzzleBoxElement = document.getElementById('puzzleBox');
button3.innerText = "3P-A assist.";
button3.onclick = assist;

// location update functions

// asistant

function assist() {

  if (combat == true) {
    text.innerText = "You have no time to access 3P-A, you need to stay focus on a fight. Use Defensive movements to gain a moment to use basic function of Tripple A";
  } else if (health < (0.2 * maxHealth)) {
    button1.classList.remove("blinking-border");
    button2.classList.add("blinking-border");
    button3.classList.remove("blinking-border");
    pdaUpdate(pdaType, 0);
    header.innerText = headerLocations[13].title;
    getHomeScreenText();
  } else {
    button1.classList.remove("blinking-border");
    button2.classList.remove("blinking-border");
    button3.classList.remove("blinking-border");
    pdaUpdate(pdaType, 0);
    header.innerText = headerLocations[13].title;
    getHomeScreenText();
  }
}

function esc() {

  if (isMonsterDead) {
    text.innerText = "Adrenaline still circulates in your body, you are trying to calm your breath. You stand still and try to think what's next.";
    button1.innerText = "3P-A assist.";
    button1.onclick = assist;
    button2.innerText = "3P-A assist.";
    button2.onclick = assist;
    button3.innerText = "3P-A assist.";
    button3.onclick = assist;
    if (health < (0.2 * maxHealth)) {
      button1.classList.add("blinking-border");
      button2.classList.add("blinking-border");
      button3.classList.add("blinking-border");
    }
  } else {
    updateLocation(locations[currentLocation]);
    if (health > (0.2 * maxHealth)) {
      button1.classList.remove("blinking-border");
      button2.classList.remove("blinking-border");
    }
    button3.innerText = "3P-A assist.";
    button3.onclick = assist;
    header.innerText = headerLocations[currentHeader].title;
  }
}

function home() {
  pdaUpdate(pdaType, 0);
  getHomeScreenText();
}

function pdaUpdate(pdaType, index) {
  button1.innerText = asistant[pdaType][index]["button text"][0];
  button2.innerText = asistant[pdaType][index]["button text"][1];
  button3.innerText = asistant[pdaType][index]["button text"][2];
  button1.onclick = asistant[pdaType][index]["button functions"][0];
  button2.onclick = asistant[pdaType][index]["button functions"][1];
  button3.onclick = asistant[pdaType][index]["button functions"][2];
  text.innerHTML = asistant[pdaType][index].text;
}

// location

function updateLocation(locations) {
  button1.innerText = locations["button text"][0];
  button2.innerText = locations["button text"][1];
  button1.onclick = locations["button functions"][0];
  button2.onclick = locations["button functions"][1];
  text.innerText = locations.text;
  locations = currentLocation;
}

function emptySlot() {
  text.innerText = "This slot is empty. Need a system upgrade.";
}

function crafting() {
  pdaUpdate(pdaType, 2);
}

function upgradeWeapon() {
  if (combat == true) {
    text.innerText = "You are in combat. There is big risk of damage while printing the item you selected. This option is locked."
  } else if (rDust == 0) {
    text.innerText = "You dont have resources to make this upgrade"
  } else {
    currentWeapon++;
    text.innerText = " A beam lines of light blue laser going out of uder the triple a's bottom, started to make a shape of some sort. It appears to be a " + weapons[currentWeapon].name;
    rDust--;
    rDustText.innerText = rDust;
  }
  updateDust();
}

function healing() {
  button3.classList.remove("blinking-border");
  if (health < (0.2 * maxHealth)) {
    button2.classList.add("blinking-border");
  }

  pdaUpdate(pdaType, 1);
}

function makeHealth() {
  if (cDust == 0) {
    text.innerText = "You dont have resources to make this cardridge. Its an emergency situation, so you grab few from the cart."
    cDust += 3;
  } else if (healCardrige == 5) {
    text.innerText = "You shouldnt spend all what you and Grandma have to survive. You have enough to midigate great amount of damage."
  } else {
    healCardrige++;
    hcText.innerText = healCardrige;
    cDust--;
    cDustText.innerText = cDust;
  }
  updateDust();
}

function updateDust() {
  cDustText.innerText = cDust;
  rDustText.innerText = rDust;
  lDustText.innerText = lDust;
  dustText.innerText = noDust;

  if (cDust === 0 && rDust === 0 && lDust === 0) {
    dustText.style.display = "inline-block";
  } else {
    dustText.style.display = "none";
  }

  if (cDust == 0) {
    cDustText.style.display = "none";
  } else {
    cDustText.style.display = "inline-block";
    cDustText.style.color = "blue";
  }

  if (rDust == 0) {
    rDustText.style.display = "none";
  } else {
    rDustText.style.display = "inline-block";
    rDustText.style.color = "red";
  }

  if (lDust == 0) {
    lDustText.style.display = "none";
  } else {
    lDustText.style.display = "inline-block";
    lDustText.style.color = "green";
  }
}

function empty() {

}

function snapOut() {
  currentLocation = 26;
  updateLocation(locations[currentLocation]);
}

function goFight0() {
  combat = true;
  fighting = 5;
  currentLocation = 27;
  updateLocation(locations[currentLocation]);
  monsterOn(fighting);
}

function getHomeScreenText() {
  return text.innerText = "Bipp! Boop! ... You see a " + weapons[currentWeapon].name + " displayed in your inventory. Your max health is " + maxHealth + "." + '\n\n' + afterMatch();
}

// UI managing functions

function rightOn() {
  arrowRight.style.display = "flex";
}

function rightOff() {
  arrowRight.style.display = "none";
}

function gameOn() {
  buttons.style.display = "inline-block";
  stats.style.display = "flex";
  healthText.innerText = health;
  xpText.innerText = xp;
  hcText.innerText = healCardrige;
  cDustText.innerText = cDust;
  rDustText.innerText = rDust;
  lDustText.innerText = lDust;
}


function gameOff() {
  buttons.style.display = "none";
  stats.style.display = "none";
}

function monsterOn(fighting) {
  monsterStats.style.display = "flex";
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealth = monsters[fighting].health;
  monsterHealthText.innerText = monsterHealth;
}

function monsterOff() {
  monsterStats.style.display = "none";
}

function storyMode() {
  monsterOff();
  gameOff();
  img.style.display = "none";
  text.style.display = "inline-block";
}


function storyOff() {
  text.style.display = "none";
}

function combatOn() {
  combat = true;
  totalDmg = 0;
}

// Story functions

// Chapter 1.

function start() {
  index.style.display = "none";
  storyMode();
  text.innerHTML = cutscene[0].text;
  rightOn();
  arrowRight.onclick = training;
  xp = 0;
  health = 100;
  maxHealth = 100;
  cDust = 0;
  rDust = 0;
  lDust = 0;
  healCardrige = 0;
  noDust = 0;
}


function training() {
  button2.classList.remove("blinking-border");
  currentHeader = 1;
  headerText.innerText = headerLocations[currentHeader].title;
  updateLocation(locations[currentLocation]);
  gameOn();
  rightOff();
  updateDust();
}

function goFight() {
  combat = true;
  fighting = 0;
  currentLocation = 1;
  updateLocation(locations[currentLocation]);
  monsterOn(fighting);
}

function seeGrandma() {
  rightOn();
  arrowRight.onclick = kitchen;
}

function kitchen() {
  button2.classList.remove("blinking-border");
  button3.innerText = "3P-A assist.";
  button3.onclick = assist;
  isMonsterDead = false;
  storyMode();
  currentHeader = 2;
  headerText.innerText = headerLocations[currentHeader].title;
  text.innerHTML = cutscene[1].text;
  arrowRight.onclick = preperation;
}

function preperation() {
  button2.classList.remove("blinking-border");
  currentHeader = 3;
  headerText.innerText = headerLocations[currentHeader].title;
  text.innerHTML = cutscene[2].text;
  arrowRight.onclick = departure;
}

function departure() {
  button2.classList.remove("blinking-border");
  text.innerHTML = cutscene[3].text;
  arrowRight.onclick = theRoad;
  pdaType = 1;
  healCardrige = 3;
  hcText.innerText = healCardrige;
  health = maxHealth;
  updateHealth();
}

// Chapter 2

function theRoad() {

  currentHeader = 4;
  header.innerText = headerLocations[currentHeader].title;
  rightOff();
  storyOff();
  img.style.display = "flex";
  road.style.display = "flex";
  road.onclick = theCrossroad;
}

function theCrossroad() {
  img.style.display = "none";
  road.style.display = "none";
  text.style.display = "inline-block";
  gameOn();
  text.innerHTML = locations[3].text;
  currentLocation = 3;
  updateLocation(locations[currentLocation]);
}

// the shortcut
function shortcut() {
  currentLocation = 4;
  currentHeader = 5;
  headerText.innerText = headerLocations[currentHeader].title;
  updateLocation(locations[currentLocation]);
}

function runaway() {
  health = health - 12;
  healthText.innerText = health;
  currentLocation = 16;
  updateLocation(locations[currentLocation]);
  updateHealth(-12);
}

function goFight2() {
  combatOn();
  fighting = 1;
  currentLocation = 6;
  updateLocation(locations[currentLocation]);
  monsterOn(fighting);
}

function stormComing() {
  button3.innerText = "3P-A assist.";
  button3.onclick = assist;
  isMonsterDead = false;
  storyMode();
  rightOn();
  text.innerHTML = cutscene[4].text;
  arrowRight.onclick = theStorm2;
}

function theStorm2() {
  storyMode();
  currentHeader = 7;
  headerText.innerText = headerLocations[currentHeader].title;
  text.innerHTML = cutscene[5].text;
  arrowRight.onclick = theCave;
}

// main road


function main() {
  currentLocation = 5;
  currentHeader = 6;
  headerText.innerText = headerLocations[currentHeader].title;
  updateLocation(locations[currentLocation]);
}

function calm() {
  currentLocation = 28;
  rightOn();
  arrowRight.onclick = theStorm1;
  updateLocation(locations[currentLocation]);
}

function theStorm1() {
  rpsMini.style.display = "none";
  grid.style.display = "none";
  storyMode();
  currentHeader = 7;
  headerText.innerText = headerLocations[currentHeader].title;
  text.innerHTML = cutscene[4].text;
  arrowRight.onclick = theCave;
}

// the cave

function theCave() {
  currentHeader = 8;
  header.innerText = headerLocations[currentHeader].title;
  rightOff();
  storyOff();
  img.style.display = "flex";
  cave.style.display = "flex";
  cave.onclick = caveEntrence;
}

// Chapter 3 Final

function caveEntrence() {
  storyMode();
  text.innerHTML = cutscene[5].text;
  rightOn();
  arrowRight.onclick = explore;
}

function explore() {
  button2.classList.remove("blinking-border");
  text.style.display = "flex";
  game.style.display = "flex";
  rightOff();
  gameOn();
  currentLocation = 7;
  updateLocation(locations[currentLocation]);
  currentHeader = 9;
  header.innerText = headerLocations[currentHeader].title;
}

function corridor() {
  currentHeader = 10;
  header.innerText = headerLocations[currentHeader].title;
  if (xp > 45 && pdaInstal == false) {
    text.innerText = "3P-A found something you might be interested in the cocoon, you should check it out.";
    rightOn();
    arrowRight.onclick = further;
    button1.innerText = "right";
    button1.onclick = corridor;
  } else if (xp > 45) {
    currentLocation = 23;
    updateLocation(locations[currentLocation]);
  } else {
    currentLocation = 8;
    updateLocation(locations[currentLocation]);
  }
}

function goFight3() {
  if (sEggs == 0) {
    combatOn();
    fighting = 2;
    currentLocation = 9;
    updateLocation(locations[currentLocation]);
    monsterOn(fighting);
  } else if (sEggs == 1) {
    combatOn();
    fighting = 2;
    currentLocation = 9;
    updateLocation(locations[currentLocation]);
    monsterOn(fighting);
    text.innerText = "You didnt learn the last time.";
  } else if (sEggs == 2) {
    empty();
    text.innerText = "Lucky you, No more eggs that was ready to hatch. Ouff";
    goFurther();
  }

  sEggs++;
}

function goFurther() {
  arrowRight.onclick = further;
}

function further() {
  button2.classList.remove("blinking-border");
  button3.innerText = "3P-A assist.";
  button3.onclick = assist;
  isMonsterDead = false;
  rightOff();
  currentLocation = 10;
  updateLocation(locations[currentLocation]);
}

function cocoon() {
  if (rDust == 1 || currentWeapon == 1) {
    triggerEvent4();
  } else {
    currentLocation = 11;
    updateLocation(locations[currentLocation]);
  }
}

function triggerEvent4() {
  rightOn();
  arrowRight.onclick = goFight4;
  currentLocation = 25;
  updateLocation(locations[currentLocation]);
}

function takePda() {
  currentLocation = 17;
  updateLocation(locations[currentLocation]);
  puzzleBoxElement.style.display = "flex";
}

function takePda2() {
  currentLocation = 20;
  updateLocation(locations[currentLocation]);
  puzzleBoxElement.style.display = "flex";
}

function takeDust() {
  currentLocation = 18;
  updateLocation(locations[currentLocation]);
  rDust++;
  updateDust();
}
// dust
function takeDust2() {
  currentLocation = 21;
  updateLocation(locations[currentLocation]);
  rDust++;
  updateDust();
}

function emptyCocoon() {
  popupButton.style.display = "flex";
  currentLocation = 19;
  updateLocation(locations[currentLocation]);
  rightOn();
  arrowRight.onclick = goFight4;
}

// this should be called when the puzzle is solved. 
function instalPda() {
  storyMode();
  text.innerHTML = cutscene[9].text;
  arrowRight.onclick = loopingCave;
  pdaType = 2;
  pdaInstal = true;
}

function goFight4() {
  rightOff();
  combatOn();
  fighting = 3;
  currentLocation = 12;
  updateLocation(locations[currentLocation]);
  monsterOn(fighting);
}

function loopingCave() {
  button2.classList.remove("blinking-border");
  isMonsterDead = false;
  button3.innerText = "3P-A assist.";
  button3.onclick = assist;
  currentHeader = 9;
  headerText.innerText = headerLocations[currentHeader].title;
  rightOff();
  gameOn();
  currentLocation = 22;
  updateLocation(locations[currentLocation]);
}

function mainHall() {
  currentHeader = 11
  headerText.innerText = headerLocations[currentHeader].title;
  if (xp < 44) {
    currentLocation = 24;
    updateLocation(locations[currentLocation]);
  } else if (pdaInstal == false) {
    text.innerText = "3P-A found something interesting in the nearby location, you should try to locate it, before you venture further.";
    rightOn();
    arrowRight.onclick = further;
    button1.innerText = "right";
    button1.onclick = corridor;
  } else {
    currentLocation = 13;
    updateLocation(locations[currentLocation]);
    rightOff();
  }
}

function finalBoss() {
  currentHeader = 10
  headerText.innerText = headerLocations[currentHeader].title;
  currentLocation = 14;
  updateLocation(locations[currentLocation]);
}

function goFight5() {
  rightOff();
  combatOn();
  currentLocation = 15;
  updateLocation(locations[currentLocation]);
  fighting = 4;
  monsterOn(fighting);
}

function deadQueen() {
  isMonsterDead = false;
  storyMode();
  text.innerHTML = cutscene[6].text;
  arrowRight.onclick = theEgg;
  rightOn();
}

function theEgg() {
  button2.classList.remove("blinking-border");
  currentHeader = 12;
  headerText.innerText = headerLocations[currentHeader].title;
  text.innerHTML = cutscene[7].text;
  arrowRight.onclick = theEnd;
}

function theEnd() {
  button2.classList.remove("blinking-border");
  text.innerHTML = cutscene[8].text;
  rightOff();
}

function rps() {
  text.style.display = "none";
  game.style.display = "none";
  monsterStats.style.display = "none";
  stats.style.display = "none";
  rpsMini.style.display = "flex";
  RPS();
}

function ttt() {
  TTT();
}

function goBack() {
  currentLocation = 28;
  updateLocation(locations[currentLocation]);
  rpsMini.style.display = "none";
  grid.style.display = "none";
}

function afterMatch() {
  if (health <= 0.35 * maxHealth) {
    text.innerText = "Warning! Immediate medical attention is needed. Any delay can cause serious trauma and even death. Use the medical cartridge from your AI Assistant now!";
  } else if (health <= 0.75 * maxHealth) {
    text.innerText = "Caution! Health loss detected. Your health is lower than your maximum health of " + maxHealth + ". Use the medical assistant to prevent further injuries.";
  } else {
    text.innerText = "You seem to be in good health. No status effects affecting you or have been detected at the moment.";
  }

  return text.innerText;
}

function victory() {
  rightOn();

  arrowRight.onclick = function() {
    console.log('Arrow clicked!');
    switch (fighting) {
      case 0:
      case 5:
        kitchen();
        break;
      case 1:
        stormComing();
        break;
      case 2:
        further();
        break;
      case 3:
        loopingCave();
        break;
      case 4:
        deadQueen();
        break;
      default:
        empty();
        break;
    }
  };
}


function monsterDefeat() {

  text.innerText =
    monsters[fighting].deathText + '\n\n';
  text.innerText +=
    "You have defeated the " +
    monsters[fighting].name +
    "!" +
    " Experience gained in combat " +
    "(" +
    "+ " +
    monsters[fighting].level +
    ")" +
    " will make you stronger and more confident." +
    " You lost total of " +
    totalDmg +
    " health points, but your Max Health grew up to " +
    maxHealth +
    " points." +
    '\n\n'
    ;

  if (health <= 0.3 * maxHealth) {
    text.innerText += "Warning! Immediate medical attention is needed. Any delay can cause serious trauma and even death. Use the medical cartridge from your AI Assistant now!";
  } else if (health <= 0.75 * maxHealth) {
    text.innerText += "Caution! Health loss detected. Your health is lower than your maximum health of " + maxHealth + ". Use the medical assistant to prevent further injuries.";
  } else {
    text.innerText += "You seem to be in good health. No status effects affecting you or have been detected at the moment.";
  }
}

function winFight() {
  combat = false;
  xp += monsters[fighting].level;
  xpText.innerText = xp;
  if (xp % 2 === 0) {
    maxHealth += Math.floor((xp / 2) * 5);
  } else {
    maxHealth += Math.floor(((xp / 2) * 5) - 2);
  }
  monsterOff();
}


// whole player and monster attack section

let isAttacking = false;

function pressAttack() {
  if (monsterHealth <= 0 || health <= 0) {
    return;
  }

  if (isAttacking) {
    return;
  }

  isAttacking = true;

  let playerAttackResult = attack();
  updateMonsterHealth(playerAttackResult.monsterDamageTaken);

  if (monsterHealth <= 0) {
    victory();
    winFight();
    monsterDefeat();
    healthWarning();
    isMonsterDead = true;
    isAttacking = false;
    return;
  }

  setTimeout(() => {
    if (monsterHealth > 0) {
      let monsterAttackResult = monsterAttack(isMonsterDead);
      updateHealth(monsterAttackResult.playerDamageTaken);
      totalDmg += monsterAttackResult.playerDamageTaken;

      if (health <= 0) {
        lose();
      }
    }
    isAttacking = false;
  }, 650);
}

function attack() {
  // player attack damage calculation

  let weaponDamage = getRandomDamage(
    weapons[currentWeapon].powerMin,
    weapons[currentWeapon].powerMax,
    weapons[currentWeapon].crit
  );

  let monsterDamageTaken = weaponDamage + (Math.floor(0.2 * xp));
  monsterHealth -= monsterDamageTaken;

  // text comment

  if (monsterHealth <= 0) {
    empty();
  } else {
    if (weaponDamage >= weapons[currentWeapon].crit) {
      text.innerText = weapons[currentWeapon].critText;
    } else {
      text.innerText = weapons[currentWeapon].text;
    }
  }

  // last hit triggers


  return { monsterDamageTaken: -monsterDamageTaken };
}

function monsterAttack() {

  if (isMonsterDead) {
    playerDamageTaken = 0;
    return { playerDamageTaken: -playerDamageTaken };
  }

  // player damage recieve calculation

  let monsterDamage = getMonsterDamage(
    monsters[fighting].damageMin,
    monsters[fighting].damageMax,
    monsters[fighting].crit
  );

  let playerDamageTaken = monsterDamage - (Math.floor(0.1 * xp));
  health -= playerDamageTaken;

  if (fighting == 4) {
    monsterHeal();
  }

  // text comment

  if (monsterDamage >= monsters[fighting].crit) {
    text.innerText += " Then " + monsters[fighting].critText;
  } else {
    if (fighting == 0) {
      return { playerDamageTaken: -playerDamageTaken };
    } else {
      text.innerText += " Then " + monsters[fighting].text;
    }
  }

  return { playerDamageTaken: -playerDamageTaken };
}

// damage generating functions

function getRandomDamage(min, max, crit) {
  const baseDamage = Math.floor(Math.random() * (max - min + 1)) + min;
  const criticalChance = Math.random();

  if (criticalChance < 0.29) {
    return crit;
  } else {
    return baseDamage;
  }
}

function getMonsterDamage(min, max, crit) {
  const baseDamage = Math.floor(Math.random() * (max - min + 1)) + min;
  const criticalChance = Math.random();

  if (criticalChance < 0.2) {
    return crit;
  } else {
    return baseDamage;
  }
}

// visual updates

function updateHealth(healthChange) {

  let change = healthChange;

  if (change === 0) {
    return;
  }

  healthText.innerText = health;

  if (health < (0.2 * maxHealth)) {
    healthText.style.color = "red";
    healthWarning();
  } else {
    button1.classList.remove("blinking-border");
    button2.classList.remove("blinking-border");
    button3.classList.remove("blinking-border");
    healthText.style.color = health == maxHealth ? "green" : "black";
  }

  const animationSpan = document.createElement("span");
  animationSpan.innerText = change > 0 ? "+" + change : change;
  animationSpan.classList.add("health-animation");
  animationSpan.style.color = change > 0 ? "green" : "red";
  animationSpan.style.top = `${Math.floor(Math.random() * 21) - 10}px`;
  animationSpan.style.left = `${Math.floor(Math.random() * 21) - 10}px`;
  document.querySelector("#healthText").appendChild(animationSpan);
  animationSpan.classList.add("animate");

  animationSpan.addEventListener("animationend", () => {
    animationSpan.remove();
  });
}


function heal() {
  if (health == maxHealth) {
    text.innerText = "Your health is full.";
  } else if (healCardrige == 0) {
    text.innerText = "Your cardrige slot is empty.";
  } else {
    // Calculate the actual amount of health restored
    let healing = Math.min(80, maxHealth - health);

    health += healing;

    healCardrige--;
    healthText.innerText = health;
    hcText.innerText = healCardrige;

    // Pass the actual amount of health restored to the updateHealth function
    updateHealth(healing);
  }
}

function updateMonsterHealth(monsterHealthChange) {

  let change = monsterHealthChange;

  if (change === 0) {
    return;
  }

  monsterHealthText.innerText = monsterHealth;

  const animationSpan = document.createElement("span");
  animationSpan.innerText = change > 0 ? "+" + change : "" + change;
  animationSpan.classList.add("monsterHealth-animation");
  animationSpan.style.color = "white";

  const monsterHealthRect = monsterHealthText.getBoundingClientRect();

  animationSpan.style.top = `${monsterHealthRect.top + Math.floor(Math.random() * 21) - 10}px`;
  animationSpan.style.left = `${monsterHealthRect.left + Math.floor(Math.random() * 21) - 10}px`;

  document.body.appendChild(animationSpan);

  animationSpan.classList.add("animate");

  animationSpan.addEventListener("animationend", () => {
    animationSpan.remove();
  });
}

function monsterHeal() {
  let healing = Math.floor(Math.random() * 5);
  monsterHealth += healing;

  updateMonsterHealth(healing);
}

function pressParry() {

  button3.classList.remove("blinking-border");

  button3.innerText = "Back"
  button3.onclick = backDefence;
  button2.innerText = "Heal";
  button2.onclick = healDefence;
  button1.innerText = "---";
  button1.onclick = emptySlot;
}

function parry() {

  if (monsterHealth <= 0 || health <= 0) {
    return;
  }

  let monsterAttackResult = monsterAttack();

  let parryMonsterAttack = Math.ceil(0.8 * (-monsterAttackResult.playerDamageTaken));
  updateHealth(-parryMonsterAttack);
  totalDmg += parryMonsterAttack;

  if (health <= 0) {
    healthText.innerText = 0;
    lose();
  } else if (monsterHealth <= 0) {
    monsterHealthText.innerText = 0;
    winFight();
    monsterDefeat();
    victory();
  }
}

function backDefence() {

  if (health < (0.2 * maxHealth)) {
    button3.classList.add("blinking-border");
  }

  button1.innerText = "Attack";
  button1.onclick = pressAttack;
  button2.innerText = "Parry";
  button2.onclick = pressParry;
  button3.innerText = "3P-A assist"
  button3.onclick = assist;
}

function healDefence() {
  if (health == maxHealth) {
    text.innerText = "Your health is full.";
  } else if (healCardrige == 0) {
    text.innerText = "Your cardrige slot is empty.";
  } else {
    // Calculate the actual amount of health restored
    let healing = Math.min(80, maxHealth - health);

    health += healing;

    healCardrige--;
    healthText.innerText = health;
    hcText.innerText = healCardrige;
    text.innerText = " You heal " + healing + " points. "

    // Pass the actual amount of health restored to the updateHealth function
    updateHealth(healing);
    setTimeout(() => {
      parry();
    }, 650);
  }
}

function lose() {
  monsterOff();
  gameOff();
  text.innerText = monsters[fighting].playerDeath;
}

function healthWarning() {

  if (health < (0.2 * maxHealth)) {
    button3.classList.add("blinking-border");
    healthText.style.color = "red";
  }
}

// dogtag popup button

const popupButton = document.getElementById("popup-button");
const popupContainer = document.getElementById("popup-container");
const closeButton = document.getElementById("close-button");
const popupImage1 = document.getElementById("popup-image1");
const popupImage2 = document.getElementById("popup-image2");

let activeImage = popupImage1; // Currently displayed image

popupButton.addEventListener("click", () => {
  popupContainer.classList.toggle("active");
});

closeButton.addEventListener("click", () => {
  popupContainer.classList.remove("active");
});

popupImage1.addEventListener("click", () => {
  activeImage.style.display = "none"; // Hide the current image
  popupImage2.style.display = "block"; // Show the other image
  activeImage = popupImage2; // Update the active image reference
});

popupImage2.addEventListener("click", () => {
  activeImage.style.display = "none"; // Hide the current image
  popupImage1.style.display = "block"; // Show the other image
  activeImage = popupImage1; // Update the active image reference
});

// extra buttons arrangment

window.addEventListener('load', function() {
  const windowElement = document.getElementById('window');
  const extraButtonsElement = document.getElementById('extraButtons');

  function updateTargetSize() {
    const windowRect = windowElement.getBoundingClientRect();
    extraButtonsElement.style.width = `${windowRect.width}px`;
  }

  updateTargetSize();
  window.addEventListener('resize', updateTargetSize);

  // Create a Mutation Observer to watch for changes
  const observer = new MutationObserver(updateTargetSize);

  // Start observing the target element for configured mutations
  observer.observe(windowElement, { attributes: true, childList: true, subtree: true });
});

// puzzle box toggle

puzzleBoxElement.addEventListener("click", () => {
  puzzleContainer.classList.toggle("active");
  puzzle();
});

closePuzzleButton.addEventListener("click", () => {
  puzzleContainer.classList.remove("active");
});

