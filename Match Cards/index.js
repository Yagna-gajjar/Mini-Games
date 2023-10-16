let j = 0;

let a = [
    ["cat1", "rabbit1", "fish1", "turtle1", "cow1", "panda1"],
    ["cow2", "octopus1", "fish2", "elephant1", "panda2", "cat2"],
    ["elephant2", "octopus2", "dog1", "turtle2", "rabbit2", "dog2"]
]

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 6; j++) {
        let card = document.createElement('div');
        card.classList.add("col");
        card.classList.add("m-3");
        card.classList.add("pt-5")
        card.innerHTML = '<button id = "bt' + a[i][j] + '" onclick = "photoappear(\'' + a[i][j] + '\')" ><img class="img-fluid" id=' + a[i][j] + ' src = "CardBackground.jpg" > </button>';
        document.getElementsByClassName("row")[i].append(card);
    }
}
let previousphoto = "";
let click_count = 1;
let score = 0;
function photoappear(a) {
    document.getElementById(a).src = a + ".jpg"
    document.getElementById("bt" + a).disabled = true;
    console.log(click_count);
    if (click_count == 2) {
        matchphoto(previousphoto, a);
        click_count = 1;
        return;
    }
    previousphoto = a;
    click_count++;
}

function matchphoto(previousphoto, currentphoto) {
    if (previousphoto.slice(0, -1) == currentphoto.slice(0, -1)) {
        document.getElementById(previousphoto).removeAttribute("onclick");
        document.getElementById(currentphoto).removeAttribute("onclick");
        currentphoto = "";
        score++;
    }
    else if (previousphoto != "" && previousphoto.slice(0, -1) != currentphoto.slice(0, -1)) {
        setTimeout(() => {
            document.getElementById(previousphoto).src = "CardBackground.jpg";
            document.getElementById(currentphoto).src = "CardBackground.jpg";
        }, 500);
        document.getElementById("bt" + previousphoto).disabled = false;
        document.getElementById("bt" + currentphoto).disabled = false;
    }
    if (score == 9) {
        setTimeout(() => {
            alert("you win");
            if (confirm("do you want to play again ?")) {
                location.reload();
            }
        }, 700);
    }
}
