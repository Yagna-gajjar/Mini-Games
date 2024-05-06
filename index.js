games = [
    { nameofgame: "2048", imageofgame: "img/2048.png", link: "2048/index.html", primary: "#674295", secondary: "#d3c0eb" },
    { nameofgame: "Sudoku", imageofgame: "img/sudoku.png", primary: "#a55d2a4d", secondary: "#a55d2a" },
    { nameofgame: "TicTac", imageofgame: "img/tic-tac-toc.png", primary: "#b6ffff", secondary: "#297676" },
    { nameofgame: "MYSnake", imageofgame: "img/Mysnake.png", primary: "#3a046d", secondary: "#a44cf5" },
    { nameofgame: "Match Cards", imageofgame: "img/card-match.png", primary: "#dda0dd", secondary: "#000000" },
    { nameofgame: "Slide Puzzle", imageofgame: "img/slide-puzzle.png", primary: "#84cdc1", secondary: "#4D392E" },
    { nameofgame: "Block Sortng", imageofgame: "img/Block-Sortng.png", primary: "#663300", secondary: "#ffffff" },
]

let currentgame = 2048;
let gamelist = document.getElementById("gamelist");

for (let i = 0; i < games.length; i++) {
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

function changebackground(backimage) {
    document.getElementsByClassName("currentgame")[0].style.backgroundImage = "url('./" + backimage + "')";
}

function start_current_game(game_name) {
    let button = document.getElementsByClassName("playbutton")[0];
    button.href = game_name + "/index.html"
    console.log(game_name);
}