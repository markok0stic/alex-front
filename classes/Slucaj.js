import { Circle } from "./Circle.js";

export class Slucaj{
    constructor(brojKrugova)
    {
        this.brojKrugova = brojKrugova;
        this.listaIntervala = [100,150,200,250,300];
        this.listaRandomIntervala = [];
        this.timeout=0;
        this.klasa="";
        this.resenje="*";
        Slucaj.Odgovor="*";
        Slucaj.vremeReakcije=-1;
    }

    getRandomInt(min, max) 
    {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    crtajStandard()
    {
        return new Promise ((resolve) =>{
        document.removeEventListener('keyup',this.onkeyPressed); 
        let lblodg = document.querySelector(".lblOdg");
        lblodg.innerHTML="";
        if (this.brojKrugova==6)
        this.klasa="circle";
        if (this.brojKrugova==8)
        this.klasa="circle2";
        if (this.brojKrugova==10)
        this.klasa="circle3";
        let i=0;
        while (i<this.brojKrugova)
        {
            let p= this.getRandomInt(0,5);
            this.listaRandomIntervala.push(this.listaIntervala[p]);
            i++;
        }
        let lbl = document.querySelector('.lblNaslov');
        lbl.innerHTML="STANDARD";
        this.timeout=1000;
        this.listaRandomIntervala.forEach(el=>
            {
                this.timeout+=el;
                let dom=document.querySelector(".smallContainer");
                dom.innerHTML="";
                let c = new Circle(this.klasa);
                setTimeout(() =>{c.crtajKrug(dom);},this.timeout); 
            })
        setTimeout(()=>{document.removeEventListener('keyup',Slucaj.onkeyPressed); resolve();},this.timeout+500);
    });
    }

    crtajTest(istislucaj)
    {
        return new Promise ((resolve) =>{
        let lbl = document.querySelector('.lblNaslov');
        lbl.innerHTML="TEST";
        let lblodg = document.querySelector(".lblOdg");
        lblodg.innerHTML="STISNI <b>A</b> UKOLIKO RAZLIKA POSTOJI ILI <b>L</b> UKOLIKO RAZLIKA NE POSTOJI";
        if (istislucaj)
        {
            this.resenje="RAZLIKA-NE-POSTOJI";
            this.timeout=1000;
            setTimeout(()=>this.waitingKeypress(),this.timeout+this.listaRandomIntervala[0]);
            this.listaRandomIntervala.forEach(el=>
                {               
                    this.timeout+=el;
                    let dom=document.querySelector(".smallContainer");
                    dom.innerHTML="";
                    let c = new Circle(this.klasa);
                    setTimeout(() =>{c.crtajKrug(dom);},this.timeout); 
                })
        }
        else
        {
            let dom=document.querySelector(".smallContainer");
            dom.innerHTML="";
            this.resenje="POSTOJI-RAZLIKA";
            this.timeout=1000;
            let randomNumofPairTestCircles = this.getRandomInt(4, 1);// num of diff timeout circles
            let t=1;
            let temp= [];// indexes of pairs that have diff timeout than standards
            while (t <= randomNumofPairTestCircles)
            {
                let randomPair= this.getRandomInt(1,this.brojKrugova);
                t++;
                temp.push(randomPair);
            }
            temp.sort(function(a, b){return a - b}); //sort

            setTimeout(()=>this.waitingKeypress(),this.timeout+this.listaRandomIntervala[0]);
            t=0;
            for (let i=0;i<this.listaRandomIntervala.length;i++)
                if ( i == temp[t] )
                {
                    let s=0;
                    let p=this.getRandomInt(0, 5);
                    this.listaRandomIntervala[i] = this.listaIntervala[p];
                    this.timeout+=this.listaRandomIntervala[i];
                    let c = new Circle(this.klasa);
                    setTimeout(() =>{c.crtajKrug(dom);},this.timeout);
                    t++;
                }
                else
                {
                    this.timeout+=this.listaRandomIntervala[i];
                    let c = new Circle(this.klasa);
                    setTimeout(() =>{c.crtajKrug(dom);},this.timeout);
                }
        }
        setTimeout(()=>{document.removeEventListener('keyup',Slucaj.onkeyPressed); resolve();},this.timeout+2500);
    });
    }
    
    async waitingKeypress() 
    {
                     console.log('waiting keypress..');
                     Slucaj.startTime = performance.now();
                     document.addEventListener("keyup", Slucaj.onkeyPressed);
    }
   static onkeyPressed (e)
    {
        console.log('key pressed');
        document.removeEventListener('keyup', Slucaj.onkeyPressed);
        if (e.key == 'a' || e.key == 'A') 
                        {    
                            Slucaj.Odgovor="POSTOJI-RAZLIKA";
                            Slucaj.endTime = performance.now();
                            Slucaj.vremeReakcije=0;
                            Slucaj.vremeReakcije=Math.floor( Slucaj.endTime - Slucaj.startTime);
                            let lblodg = document.querySelector(".lblOdg");
                            lblodg.innerHTML="OVO JE TRAJALO: <b>"+Slucaj.vremeReakcije  + "ms</b>"; 
                        }
        else
        if (e.key == 'l' || e.key == 'L') 
                        {  
                            Slucaj.Odgovor="RAZLIKA-NE-POSTOJI";
                            Slucaj.endTime = performance.now();
                            Slucaj.vremeReakcije=0;
                            Slucaj.vremeReakcije=Math.floor( Slucaj.endTime - Slucaj.startTime);
                            let lblodg = document.querySelector(".lblOdg");
                            lblodg.innerHTML="OVO JE TRAJALO: <b>"+Slucaj.vremeReakcije  + "ms</b>"; 
                        }
        else
        {
            document.addEventListener("keyup", Slucaj.onkeyPressed);
        }
    }		 
}