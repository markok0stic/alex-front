export class Circle{

    constructor(klasa)
    {
        this.klasa=klasa;
    }
    crtajKrug()
    {
        let dom=document.querySelector(".smallContainer");
        let circle = document.createElement('div');
        let winheigth = window.innerHeight;
        circle.className=this.klasa;
        if (winheigth <=800)
            circle.style="width:2cm;height:2cm;"
        console.log(winheigth);

        dom.appendChild(circle);
    }
    crtajKrugNaLiniji(randomTopIndex)
    {
        let dom=document.querySelector(".smallContainer");
        dom.classList.add("smallContainer2");
        let circle = document.createElement('div');
        let randomTop;
        let winheigth = window.innerHeight;
        console.log(winheigth);
        circle.className=this.klasa;
        if (winheigth <=800)
            {
                console.log("uslo");
                randomTop=[0,80,160,240,320,400,480,560,640,720];
                circle.style="width:2cm;height:2cm;margin-left:0;"
                console.log(randomTop[randomTopIndex]);
            }
        else
        {
            randomTop =[0,115,230,345,460,575,690,805,920,1035];
        }
        
        let randomLeft = this.getRandomInt(0, 100);

        circle.style.top=randomTop[randomTopIndex] +"px";
        var plusOrMinus = this.getRandomInt(1,6) <= 3 ? -1 : 1;
        console.log(plusOrMinus);
        circle.style.left=window.innerWidth/2 + randomLeft*plusOrMinus +"px";

        dom.appendChild(circle);
    }

    getRandomInt(min, max) 
    {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

}