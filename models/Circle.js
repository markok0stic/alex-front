export class Circle {
    constructor(klasa) {
        this.klasa = klasa;
    }
    crtajKrug() {
        let dom = document.querySelector(".smallContainer");
        let circle = document.createElement("div");
        let winheigth = window.innerHeight;
        circle.className = this.klasa;
        if (winheigth <= 800) circle.style = "width:2cm;height:2cm;";

        dom.appendChild(circle);
    }
    crtajKrugNaLiniji(randomTopIndex, randomLeft, plusOrMinus) {
        let dom = document.querySelector(".smallContainer");
        dom.classList.add("smallContainer2");
        let circle = document.createElement("div");
        let randomTop;
        let posplus;
        let winheigth = window.innerHeight;
        circle.className = this.klasa;
        if (winheigth <= 800) {
            randomTop = [0, 80, 160, 240, 320, 400, 480, 560, 640, 720];
            posplus = 60;
            circle.style = "width:2cm;height:2cm;margin-left:0;";
        } else {
            randomTop = [0, 115, 230, 345, 460, 575, 690, 805, 920, 1035];
            posplus = 65;
        }

        circle.style.top = randomTop[randomTopIndex] + posplus + "px";
        circle.style.left = window.innerWidth / 2 + randomLeft * plusOrMinus + "px";

        dom.appendChild(circle);
    }
}
