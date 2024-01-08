const audio = new Audio("buzzer.wav");

const solvedSudoku = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

let selectednum = null;
let selectedbox = null;

var mistakes = 0;

const unsolvedSudoku = [
    [0, 0, 4, 6, 0, 0, 9, 1, 0],
    [0, 0, 2, 0, 9, 5, 0, 4, 0],
    [1, 0, 0, 3, 0, 0, 0, 0, 7],
    [8, 5, 0, 0, 6, 0, 4, 2, 0],
    [0, 0, 6, 0, 0, 3, 0, 9, 1],
    [0, 0, 3, 0, 2, 4, 0, 0, 6],
    [9, 0, 0, 5, 0, 0, 2, 8, 0],
    [0, 8, 0, 4, 0, 0, 6, 3, 5],
    [3, 0, 5, 0, 0, 6, 0, 7, 0]
];

window.onload = function () {
    Gamestart();
}

function Gamestart() {
    for (let i = 0; i < 9; i++) {
        let number = document.createElement('div');
        number.id = (i + 1);
        number.innerText = (i + 1);
        number.classList.add('number');
        document.getElementById('digits').appendChild(number);
        number.addEventListener("click", selectnumber);
    }

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let box = document.createElement("div");
            box.classList.add("box");
            box.id = "box_" + (i + 1) + "_" + (j + 1);
            if (unsolvedSudoku[i][j] > 0) {
                box.innerText = unsolvedSudoku[i][j];
                box.classList.add("showedbox");
            }
            if (i == 2 || i == 5) {
                box.classList.add("horizontallie");
            }
            if (j == 2 || j == 5) {
                box.classList.add("varticallie");
            }
            document.getElementById("board").append(box);
            box.addEventListener("click", selectbox);
        }
    }
}

function selectnumber(n) {
    if (selectedbox) {
        if (selectedbox.innerText != "") {
            return;
        }
        else {
            let r = selectedbox.id.slice(4, 5);
            let c = selectedbox.id.slice(-1);
            if (solvedSudoku[r - 1][c - 1] == n) {
                selectedbox.innerText = n;
                unsolvedSudoku[r - 1][c - 1] = selectedbox.innerText;

                for (let i = 0; i < 9; i++) {
                    for (let j = 0; j < 9; j++) {

                        if (selectedbox.innerText != "") {
                            if (unsolvedSudoku[i][j] == selectedbox.innerText) {
                                document.getElementById("box_" + (i + 1) + "_" + (j + 1)).classList.add("selectedbox");
                            }
                        }
                    }
                }
            }
            else if (solvedSudoku[r - 1][c - 1] == this.innerText) {
                selectedbox.innerText = this.innerText;
                unsolvedSudoku[r - 1][c - 1] = selectedbox.innerText;

                for (let i = 0; i < 9; i++) {
                    for (let j = 0; j < 9; j++) {

                        if (selectedbox.innerText != "") {
                            if (unsolvedSudoku[i][j] == selectedbox.innerText) {
                                document.getElementById("box_" + (i + 1) + "_" + (j + 1)).classList.add("selectedbox");
                            }
                        }
                    }
                }
            }
            else {
                audio.play();
                mistakes++;
                document.getElementById("mistakes").innerText = mistakes;
            }
        }
    }

    if (mistakes >= 5) {
        alert("you lost the game:");
        location.reload();
    }
}

function selectbox() {
    if (selectedbox != null) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if ((selectedbox.id.slice(4, 5) == (i + 1) && selectedbox.id.slice(-1) == (j + 1))) {
                    document.getElementById("box_" + (i + 1) + "_" + (j + 1)).classList.remove("onlyoneselectedbox");
                }
                if ((selectedbox.id.slice(4, 5) == (i + 1) || selectedbox.id.slice(-1) == (j + 1))) {
                    document.getElementById("box_" + (i + 1) + "_" + (j + 1)).classList.remove("selectedbox");
                }
                if (selectedbox.innerText != "") {
                    if (unsolvedSudoku[i][j] == selectedbox.innerText) {
                        document.getElementById("box_" + (i + 1) + "_" + (j + 1)).classList.remove("selectedbox");
                    }
                }
            }
        }
    }
    selectedbox = this;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if ((selectedbox.id.slice(4, 5) == (i + 1) && selectedbox.id.slice(-1) == (j + 1))) {
                document.getElementById("box_" + (i + 1) + "_" + (j + 1)).classList.add("onlyoneselectedbox");
            }
            if ((selectedbox.id.slice(4, 5) == (i + 1) || selectedbox.id.slice(-1) == (j + 1))) {

                document.getElementById("box_" + (i + 1) + "_" + (j + 1)).classList.add("selectedbox");
            }
            if (selectedbox.innerText != "") {
                if (unsolvedSudoku[i][j] == selectedbox.innerText) {
                    document.getElementById("box_" + (i + 1) + "_" + (j + 1)).classList.add("selectedbox");
                }
            }
        }
    }
}


window.addEventListener('keypress', e => {
    switch (e.code) {
        case "Digit1":
            selectnumber(1);
            break;
        case "Digit2":
            selectnumber(2);
            break;
        case "Digit3":
            selectnumber(3);
            break;
        case "Digit4":
            selectnumber(4);
            break;
        case "Digit5":
            selectnumber(5);
            break;
        case "Digit6":
            selectnumber(6);
            break;
        case "Digit7":
            selectnumber(7);
            break;
        case "Digit8":
            selectnumber(8);
            break;
        case "Digit9":
            selectnumber(9);
            break;
        default:
            break;

    }
});

let startTime;
let running = false;
let elapsedTime = 0;

function displaytimer() {
    const seconds = Math.floor(elapsedTime / 1000) % 60;
    const minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));

    document.getElementById("timerDisplay").innerText = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function starttimer() {
    if (!running) {
        running = true;
        startTime = Date.now() - elapsedTime;

        setInterval(() => {
            elapsedTime = Date.now() - startTime;
            displaytimer();
        }, 1000);
    }
}

starttimer();


