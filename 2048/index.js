var ground;
var score = 0;
var rows = 4;
var columns = 4
var GameOver = 0;
var generateArray = [2];
var initmaxNumber = 2;
function GameEngine() {
    ground = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let item = document.createElement('div');
            item.id = i.toString() + "-" + j.toString();
            let num = ground[i][j];
            updateitem(item, num);
            document.getElementById("ground").append(item);
        }
    }
    // setFirstTwo();
}

function emptyitem() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (ground[i][j] == 0) {
                return true;
            }
        }
    }
    return false;
}

function setFirstTwo() {

    if (!emptyitem()) {
        return;
    }
    let r1 = Math.round(Math.random() * 3);
    let c1 = Math.round(Math.random() * 3);

    let r2 = Math.round(Math.random() * 3);
    let c2 = Math.round(Math.random() * 3);

    ground[r1][c1] = 2;
    ground[r2][c2] = 2;
    while (r1 == r2 && c1 == c2) {
        c2 = Math.round(Math.random() * 3);
    }
    let item1 = document.getElementById(r1.toString() + "-" + c1.toString());
    let item2 = document.getElementById(r2.toString() + "-" + c2.toString());
    item1.innerText = "2";
    item1.classList.add("x2");
    item2.innerText = "2";
    item2.classList.add("x2");
}

function setTwo() {

    if (!emptyitem()) {
        return;
    }
    var maxNumber = 0;
    for (let row of ground) {
        for (let num of row) {
            if (num > maxNumber) {
                maxNumber = num;
            }
        }
    }
    if (maxNumber > initmaxNumber && maxNumber == 16) {
        generateArray.push(4);
    }
    if (maxNumber > initmaxNumber && maxNumber == 64) {
        generateArray.push(8);
    }
    if (maxNumber > initmaxNumber && maxNumber == 256) {
        generateArray.push(16);
    }
    if (maxNumber > initmaxNumber && maxNumber == 1024) {
        generateArray.push(32);
    }
    initmaxNumber = maxNumber;
    let found = false;
    while (!found) {
        let r = Math.round(Math.random() * 3);
        let c = Math.round(Math.random() * 3);
        if (ground[r][c] == 0) {
            ground[r][c] = 2;
            let item = document.getElementById(r.toString() + "-" + c.toString());
            let newgenerate = Math.round(Math.random() * (generateArray.length - 1));
            item.innerText = generateArray[newgenerate];
            item.classList.add("x" + generateArray[newgenerate]);

            found = true;
        }
    }
}

function updateitem(item, num) {
    item.innerText = "";
    item.classList.value = "";
    item.classList.add("item");
    if (num > 0) {
        item.innerText = num;
        if (num <= 2048) {
            item.classList.add("x" + num.toString());
        }
        else {
            item.classList.add("x2048");
        }
    }
}

function filterzero(row) {
    return row.filter(num => num != 0);
}

function slide(row) {
    row = filterzero(row);

    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }

    row = filterzero(row);

    while (row.length < columns) {
        row.push(0);
    }

    return row;
}

function slideLeft() {
    for (let i = 0; i < rows; i++) {
        let row = ground[i];
        row = slide(row);
        ground[i] = row;

        for (let j = 0; j < columns; j++) {
            let item = document.getElementById(i.toString() + "-" + j.toString());
            let num = ground[i][j];
            updateitem(item, num);
        }
    }
}

function slideRight() {
    for (let i = 0; i < rows; i++) {
        let row = ground[i];
        row.reverse();
        row = slide(row);
        row.reverse();
        ground[i] = row;

        for (let j = 0; j < columns; j++) {
            let item = document.getElementById(i.toString() + "-" + j.toString());
            let num = ground[i][j];
            updateitem(item, num);
        }
    }
}

function slideDown() {
    for (let i = columns - 1; i >= 0; i--) {
        let row = [ground[3][i], ground[2][i], ground[1][i], ground[0][i]];
        row = slide(row);
        row.reverse();
        for (let j = 0; j < rows; j++) {
            ground[j][i] = row[j];
            let item = document.getElementById(j.toString() + "-" + i.toString());
            let num = ground[j][i];
            updateitem(item, num);
        }
    }
}

function slideUp() {
    for (let i = 0; i < columns; i++) {
        let row = [ground[0][i], ground[1][i], ground[2][i], ground[3][i]];
        row = slide(row);

        for (let j = 0; j < rows; j++) {
            ground[j][i] = row[j];
            let item = document.getElementById(j.toString() + "-" + i.toString());
            let num = ground[j][i];
            updateitem(item, num);
        }
    }
}

window.onload = function () {
    GameEngine();
}

window.addEventListener("keydown", (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
        setTwo();
    }
    else if (e.code == "ArrowRight") {
        slideRight();
        setTwo();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        setTwo();
    }
    else if (e.code == "ArrowDown") {
        slideDown();
        setTwo();
    }
    document.getElementById('score').innerText = score;
})