let names = [
    { color: "firstcolor", count: 0 },
    { color: "secondcolor", count: 0 },
    { color: "thirdcolor", count: 0 },
    { color: "fourthcolor", count: 0 },
    { color: "fifthcolor", count: 0 },
];

let glasses = []
let i = 0;
for (let i = 0; i < 6; i++) {
    let a = [];
    for (let j = 0; j < names.length; j++) {
        let random = Math.floor(Math.random() * (names.length - 1));
        if (names[random].count < 5) {
            names[random].count++;
            a.push(names[random].color)
        }
        else {
            names.splice(random, 1);
        }
    }
    glasses.push(a);
}

let colors_in_glasses = [];

for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
        if ((!colors_in_glasses.includes(glasses[i][j])) && (glasses[i][j] != undefined)) {
            colors_in_glasses.push(glasses[i][j]);
        }
    }
}

let ground = document.getElementsByClassName("ground")[0];
let selected_block = null;
let selected_block_index = null;
let selected_glass_index = null;
let move = -1;

for (let i = 0; i < glasses.length; i++) {
    let create_glass = document.createElement("div");
    create_glass.classList.add("glass");
    for (let j = 4; j >= 0; j--) {
        let create_block = document.createElement("div");
        create_block.classList.add("block");
        create_block.id = i + "-" + j;
        create_glass.appendChild(create_block);
        ground.appendChild(create_glass);
    }
}

function did_you_win(array) {
    let a = [];
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        let c = 0;
        for (let j = 0; j < array[i].length; j++) {
            if (array[i][0] == array[i][j]) {
                c++;
            }
            a.push([array[i][0], array[i][j]])
        }
        if (c == 5) {
            count++;
        }
    }
    if (count != colors_in_glasses.length) {
        return false;
    }
    else {
        return true;
    }
}

let startTime;
let running = false;
let elapsedTime = 0;

function displaytimer() {
    const seconds = Math.floor(elapsedTime / 1000) % 60;
    const minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));

    document.getElementById("timerDisplay").innerText = "Timer: " + `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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

function update_glasses(array_glasses) {
    for (let i = 0; i < array_glasses.length; i++) {
        let glass = document.getElementsByClassName("glass")[i];
        glass.addEventListener("click", fill_block.bind(null, i));
        for (let j = 4; j >= 0; j--) {
            let block = document.getElementById(i + "-" + j);
            block.classList = "block";
            if (j == 0) {
                block.classList.add("bottomblock")
            }
        }
        for (let j = 0; j < array_glasses[i].length; j++) {
            let block = document.getElementById(i + "-" + j);

            if (j == (array_glasses[i].length - 1)) {
                block.addEventListener("click", lift_block.bind(null, i, j));
            }
            block.classList.add(array_glasses[i][j]);
        }
    }
    move++;
    document.getElementById("move").innerText = "move: " + move;
    let didyouwin = did_you_win(array_glasses);

    if (didyouwin) {
        setInterval(() => {
            document.getElementById("you_win").style.display = "flex";
            setInterval(() => {
                let box = document.getElementsByClassName("box")[0];
                box.classList.remove("popup");
            }, 200)
        }, 1500)

        let play_again = document.getElementById("play_again");
        play_again.addEventListener("click", () => {
            window.location.reload();
        })
    }
}

update_glasses(glasses);

function add_class(div, classname) {
    div.classList.add(classname);
}
function remove_class(div, classname) {
    div.classList.remove(classname);
}

function lift_block(i, j) {
    if (glasses[i][j] != undefined && (glasses[i].length - 1) == j) {
        if (selected_block == null) {
            selected_block = document.getElementById(i + "-" + j);
            add_class(selected_block, "go_up_position_" + j);
            selected_block_index = j;
            selected_glass_index = i;
            return;
        }
        else {
            remove_class(selected_block, "go_up_position_" + selected_block_index);
            selected_block = document.getElementById(i + "-" + j);
            add_class(selected_block, "go_up_position_" + j);
            selected_block_index = j;
            selected_glass_index = i;
            return;
        }
    }
}

function fill_block(i) {
    if ((i != selected_glass_index)) {
        if (selected_glass_index == null) {
            return;
        }
        glasses[i].push(glasses[selected_glass_index][selected_block_index]);
        glasses[selected_glass_index].pop();
        selected_block = null;
        selected_block_index = null;
        selected_glass_index = null;
        update_glasses(glasses)
    }
    else {
        return;
    }
}