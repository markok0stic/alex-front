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

}