export class Circle{

    constructor(klasa)
    {
        this.klasa=klasa;
    }
    crtajKrug(host)
    {
        let dom=document.querySelector(".smallContainer");
        let circle = document.createElement('div');
        circle.className=this.klasa;
        dom.appendChild(circle);
    }
    crtajKrugNaLiniji(randomTop)
    {
        let dom=document.querySelector(".smallContainer");
        dom.classList.add("smallContainer2");
        let newDiv = document.createElement('div');
        newDiv.className="newdiv";
        dom.appendChild(newDiv);
        let circle = document.createElement('div');
        circle.className=this.klasa;

        //+ 113.3858267717;
        let randomLeft = this.getRandomInt(0, 150);

        circle.style.top=randomTop +"px";
        //circle.style.left=randomLeft +"px";

        newDiv.appendChild(circle);
    }

    getRandomInt(min, max) 
    {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

}