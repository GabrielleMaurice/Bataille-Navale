// Classe navire

class Navire {
  nomNavire: string;
  longeurNavire: number;

  constructor(nN: string, lg: number) {
    this.nomNavire = nN;
    this.longeurNavire = lg;
  }
}

// Classe jeu

class Jeu {
  nbCoupJoueur: number;
  nbCoupBateau: number;
  etatJeu: boolean;

  constructor(cj: number, cb: number, ej: boolean) {
    this.nbCoupJoueur = cj;
    this.nbCoupBateau = cb;
    this.etatJeu = ej;
  }

  // Génération de la matrice

  positionnement(navire: Navire) {
    let validationPostition: boolean = false;
    const longueur = navire.longeurNavire;

    while (!validationPostition) {
      const position = Math.floor(100 * Math.random());
      const direction = Math.floor(4 * Math.random());
      let positionLong = 0;

      // Pour la direction : 0 = haut, 1 = bas, 2 = gauche, 3 = droite

      if (position > 9) {
        let positionLongSTG = position.toString().split("")[1];
        positionLong = parseInt(positionLongSTG);
      } else {
        positionLong = position;
      }

      // Haut

      if (direction == 0) {
        if (position - (longueur - 1) * 10 > 0) {
          let confirmation = true;

          for (let i = 0; i < longueur; i++) {
            let positionSelec = position - i * 10;

            if (!jeu1.positionValide(positionSelec)) {
              confirmation = false;

              break;
            }
          }

          if (confirmation) {
            for (let i = 0; i < longueur; i++) {
              let positionSelec = position - i * 10;
              this.ajouterPosition(longueur, positionSelec);

              validationPostition = true;
            }
          }
        }
      }

      // Bas

      if (direction == 1) {
        if (position + (longueur - 1) * 10 < 99) {
          let confirmation = true;

          for (let i = 0; i < longueur; i++) {
            let positionSelec = position + i * 10;

            if (!jeu1.positionValide(positionSelec)) {
              confirmation = false;

              break;
            }
          }

          if (confirmation) {
            for (let i = 0; i < longueur; i++) {
              let positionSelec = position + i * 10;
              this.ajouterPosition(longueur, positionSelec);

              validationPostition = true;
            }
          }
        }
      }

      // Gauche

      if (direction == 2) {
        if (positionLong - (longueur - 1) > 0) {
          let confirmation = true;

          for (let i = 0; i < longueur; i++) {
            let positionSelec = position - i;

            if (!jeu1.positionValide(positionSelec)) {
              confirmation = false;

              break;
            }
          }

          if (confirmation) {
            for (let i = 0; i < longueur; i++) {
              let positionSelec = position - i;
              this.ajouterPosition(longueur, positionSelec);

              validationPostition = true;
            }
          }
        }
      }

      // Droite

      if (direction == 3) {
        if (positionLong + (longueur - 1) < 9) {
          let confirmation = true;

          for (let i = 0; i < longueur; i++) {
            let positionSelec = position + i;

            if (!jeu1.positionValide(positionSelec)) {
              confirmation = false;

              break;
            }
          }

          if (confirmation) {
            for (let i = 0; i < longueur; i++) {
              let positionSelec = position + i;
              this.ajouterPosition(longueur, positionSelec);

              validationPostition = true;
            }
          }
        }
      }
    }
  }

  // Retourner faux, si la position en paramètre est la même que celle d'un bateau

  positionValide(position: number) {
    if (
      positionPA.has(position) ||
      positionC.has(position) ||
      positionD.has(position) ||
      positionSM.has(position) ||
      positionP.has(position)
    ) {
      return false;
    } else {
      return true;
    }
  }

  // Ajouter les position dans le Set respectif

  ajouterPosition(longueur: number, position: number) {
    if (longueur == 6) {
      positionPA.add(position);
    }
    if (longueur == 5) {
      positionC.add(position);
    }
    if (longueur == 4) {
      positionD.add(position);
    }
    if (longueur == 3) {
      positionSM.add(position);
    }
    if (longueur == 2) {
      positionP.add(position);
    }
  }

  // Contrôler l'action du joueur

  coupJoueur(id: number, idCase: string) {
    let message = document.getElementById("message") as HTMLElement;
    let info = document.getElementById("info") as HTMLElement;
    let caseClic = document.getElementById(idCase) as HTMLElement;

    if (this.positionValide(id)) {
      caseClic.style.color = "red";
      message.textContent = "Manqué !";
      caseClic.innerText = "X";
    } else {
      this.nbCoupBateau--;

      if (positionPA.has(id)) {
        porteAvion.longeurNavire--;
      }
      if (positionC.has(id)) {
        croiseur.longeurNavire--;
      }
      if (positionD.has(id)) {
        destroyer.longeurNavire--;
      }
      if (positionSM.has(id)) {
        sousMarin.longeurNavire--;
      }
      if (positionP.has(id)) {
        patrouilleur.longeurNavire--;
      }

      message.textContent = "Touché !";
      caseClic.innerText = "T";
    }

    this.coulerNavire(porteAvion);
    this.coulerNavire(croiseur);
    this.coulerNavire(destroyer);
    this.coulerNavire(sousMarin);
    this.coulerNavire(patrouilleur);

    this.nbCoupJoueur--;

    info.textContent = "Il vous reste " + this.nbCoupJoueur + " coup(s).";
    this.finDePartie();
  }

  // Gérer les bateaux coulés

  coulerNavire(navire: Navire) {
    let message = document.getElementById("message") as HTMLElement;

    if (navire.longeurNavire == 0) {
      navire.longeurNavire--;
      message.textContent = navire.nomNavire + " est coulé !";
    }
  }

  // Détecter la fin de la partie et arrêter l'interactivité

  finDePartie() {
    let message = document.getElementById("message") as HTMLElement;

    if (jeu1.nbCoupBateau == 0) {
      message.textContent = "Vous avez gagné !";
      this.etatJeu = false;

      return;
    }

    if (jeu1.nbCoupJoueur == 0) {
      message.textContent = "Vous avez perdu !";
      this.etatJeu = false;

      return;
    }
  }
}

// Classe opérateur

class operateur {
  static compte: number;
  private action: HTMLElement;
  private numID: number;
  private positionID;
  private fonction = this.print.bind(this);

  constructor(num: number, ID: string) {
    this.numID = num;
    this.positionID = ID;
    this.action = document.getElementById(ID) as HTMLElement;
    this.action.addEventListener("click", this.fonction);
    operateur.compte = 0;
  }

  // Interactivité

  public print() {
    if (jeu1.etatJeu) {
      jeu1.coupJoueur(this.numID, this.positionID);
    }

    if ((operateur.compte = 3)) {
      this.cleanUp();
    }
    operateur.compte++;
  }

  // Enlever le Event listener

  public cleanUp() {
    const action = document.getElementById(this.positionID) as HTMLElement;
    action.removeEventListener("click", this.fonction);
  }
}

// Créer les cases cliquables

for (let i = 0; i <= 99; i++) {
  if (i < 10) {
    const caseJeu = new operateur(i, "0" + i.toString());
  } else {
    const caseJeu = new operateur(i, i.toString());
  }
}

// Créer les navires, retenir dans des Set et créer leurs positions

let porteAvion = new Navire("Porte-avion", 6);
let croiseur = new Navire("Croiseur", 5);
let destroyer = new Navire("Destroyer", 4);
let sousMarin = new Navire("Sous marin", 3);
let patrouilleur = new Navire("Patrouilleur", 2);
let jeu1 = new Jeu(40, 20, true);

let positionPA = new Set<number>([]);
let positionC = new Set<number>([]);
let positionD = new Set<number>([]);
let positionSM = new Set<number>([]);
let positionP = new Set<number>([]);

jeu1.positionnement(porteAvion);
jeu1.positionnement(croiseur);
jeu1.positionnement(destroyer);
jeu1.positionnement(sousMarin);
jeu1.positionnement(patrouilleur);

// Tricher

// console.log(positionPA);
// console.log(positionC);
// console.log(positionD);
// console.log(positionSM);
// console.log(positionP);

// tsc --strict --target es2022 GM2446781.ts
