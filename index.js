games = [
    { nameofgame: "2048", imageofgame: "img/2048.png", link: "2048/index.html", primary: "#674295", secondary: "#d3c0eb" },
    { nameofgame: "Sudoku", imageofgame: "img/sudoku.png", primary: "#a55d2a4d", secondary: "#a55d2a" },
    { nameofgame: "TicTac", imageofgame: "img/tic-tac-toc.png", primary: "#b6ffff", secondary: "#297676" },
    { nameofgame: "MYSnake", imageofgame: "img/Mysnake.png", primary: "#3a046d", secondary: "#a44cf5" },
    { nameofgame: "Match Cards", imageofgame: "img/card-match.png", primary: "#dda0dd", secondary: "#000000" },
    { nameofgame: "Slide Puzzle", imageofgame: "img/slide-puzzle.png", primary: "#84cdc1", secondary: "#4D392E" },
]

let currentgame = 2048;

let gamelist = document.getElementById("gamelist");

let j = 0;
let k = 4;

if (j == 0) document.getElementsByClassName("bi-arrow-left-circle-fill")[0].style.display = "none";
if (k == games.length) document.getElementsByClassName("bi-arrow-right-circle-fill")[0].style.display = "none";

for (let i = 0; i < 4; i++) {
    let gamecard = document.createElement("div");
    gamecard.classList = "gamecard col-3";
    gamecard.style.backgroundColor = games[i].primary;
    gamecard.style.color = games[i].secondary;
    gamecard.addEventListener("click", () => {
        currentgame = games[i].nameofgame;
        changebackground(games[i].imageofgame)
    })
    let play_current_game = document.getElementsByClassName("playbutton")[0];
    play_current_game.addEventListener("click", () => {
        start_current_game(currentgame);
    })
    gamecard.innerText = games[i].nameofgame;
    gamelist.appendChild(gamecard)
};

function changelist(j, k) {

    if (j == 0) document.getElementsByClassName("bi-arrow-left-circle-fill")[0].style.display = "none";
    else document.getElementsByClassName("bi-arrow-left-circle-fill")[0].style.display = "block";
    if (k == games.length) document.getElementsByClassName("bi-arrow-right-circle-fill")[0].style.display = "none";
    else document.getElementsByClassName("bi-arrow-right-circle-fill")[0].style.display = "block";

    for (let i = j, p = 0; i < k, p < 4; i++, p++) {
        let gamecard = document.getElementsByClassName("gamecard")[p];
        gamecard.innerText = games[i].nameofgame;
        gamecard.style.backgroundColor = games[i].primary;
        gamecard.style.color = games[i].secondary;
        gamecard.addEventListener("click", () => {
            currentgame = games[i].nameofgame;
            changebackground(games[i].imageofgame)
        })
        let play_current_game = document.getElementsByClassName("playbutton")[0];
        play_current_game.addEventListener("click", () => {
            start_current_game(currentgame);
        })
    }
}

function moveleft() {
    j--;
    k--;
    changelist(j, k);
}

function moveright() {
    j++;
    k++;
    changelist(j, k);
}

function changebackground(backimage) {
    document.getElementsByClassName("currentgame")[0].style.backgroundImage = "url('./" + backimage + "')";
}

function start_current_game(game_name) {
    let button = document.getElementsByClassName("playbutton")[0];
    button.href = game_name + "/index.html"
    console.log(game_name);
}