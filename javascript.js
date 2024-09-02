console.log("script chargé")
const mots_par_categorie = {
    "objets": ["table", "chaise", "ordinateur", "telephone", "livre", "stylo", "lampe", "horloge", "miroir"],
    "sentiments": ["joie", "tristesse", "colere", "peur", "amour", "haine", "jalousie", "envie", "fierte"],
    "couleurs": ["rouge", "bleu", "vert", "jaune", "violet", "orange", "rose", "marron", "gris"],
    "animaux": ["chien", "chat", "elephant", "lion", "tigre", "girafe", "singe", "ours", "loup"],
    "professions": ["medecin", "enseignant", "ingenieur", "avocat", "cuisinier", "policier", "pompier", "architecte"]
};

let mot, categorie, lettres_trouvees, erreurs, score;

function initialiserJeu() {
    categorie = choisirCategorie();
    mot = choisirMot(categorie);
    lettres_trouvees = new Set();
    erreurs = 0;
    score = 0;
    updateAffichage();
    creerClavier();
}

function choisirCategorie() {
    const categories = Object.keys(mots_par_categorie);
    return categories[Math.floor(Math.random() * categories.length)];
}

function choisirMot(categorie) {
    const mots = mots_par_categorie[categorie];
    return mots[Math.floor(Math.random() * mots.length)];
}

function updateAffichage() {
    document.getElementById('category').textContent = `Catégorie : ${categorie}`;
    document.getElementById('word').textContent = mot.split('').map(lettre => 
        lettres_trouvees.has(lettre) ? lettre : '_'
    ).join(' ');
    document.getElementById('hangman').textContent = dessinerPendu();
    document.getElementById('score').textContent = `Score: ${score}`;
}

function dessinerPendu() {
    const etapes = [
        `
  +---+
  |   |
      |
      |
      |
      |
=========`,`
  +---+
  |   |
  O   |
      |
      |
      |
=========`,`
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,`
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,`
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`,`
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`,`
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========`
    ];
    return etapes[erreurs];
}

function creerClavier() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const lettre = String.fromCharCode(i);
        const button = document.createElement('button');
        button.textContent = lettre;
        button.onclick = () => devinerLettre(lettre.toLowerCase());
        keyboard.appendChild(button);
    }
}

function devinerLettre(lettre) {
    if (lettres_trouvees.has(lettre)) return;
    
    lettres_trouvees.add(lettre);
    if (mot.includes(lettre)) {
        score += 10;
    } else {
        erreurs++;
        score -= 5;
    }
    
    updateAffichage();
    verifierFinJeu();
}

function verifierFinJeu() {
    if (mot.split('').every(lettre => lettres_trouvees.has(lettre))) {
        document.getElementById('message').textContent = "Félicitations ! Vous avez gagné !";
        desactiverClavier();
    } else if (erreurs >= 6) {
        document.getElementById('message').textContent = `Perdu ! Le mot était : ${mot}`;
        desactiverClavier();
    }
}

function desactiverClavier() {
    const buttons = document.getElementById('keyboard').getElementsByTagName('button');
    for (let button of buttons) {
        button.disabled = true;
    }
}

document.getElementById('new-game').addEventListener('click', initialiserJeu);

initialiserJeu();
