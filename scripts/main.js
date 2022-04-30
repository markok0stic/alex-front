import { Slucaj } from "../classes/Slucaj.js";

let mainContainer = document.createElement('div');
mainContainer.className="mainContainer";
document.body.appendChild(mainContainer);

let lblNaslov = document.createElement('label');
lblNaslov.className="lblNaslov";
lblNaslov.innerHTML="DA ZAPOČNES EXPERIMENT PRITISNI DUGME: Započni experiment"
mainContainer.appendChild(lblNaslov);

let btnStart = document.createElement('button');
btnStart.className="btnStart";
btnStart.innerHTML="Započni experiment"
btnStart.onclick = (ev) => startExperiment(mainContainer);
mainContainer.appendChild(btnStart);

let smallContainer = document.createElement('div');
smallContainer.className="smallContainer";
mainContainer.appendChild(smallContainer);

let lblOdg = document.createElement('label');
lblOdg.className="lblOdg";
mainContainer.appendChild(lblOdg);
//ukoliko se radi u phpu potrebno je da samo ova tri niza nadju nekako taj izlazni fajl opet kazem ne znam php ali mogu da naucim
let listaOdgovora =[]; // ovde se nalaze odgovori klijenta
let listaVremenaReakcije=[];//  ovde se nalaze vremena reakcije klijenta
let listaResenja =[];// ovde je lista resenja testova

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }
  var sessionStart;
      var sessionKey;
  
      var thisParam1;
  
      var ID;
    
      if (thisParam1 = getUrlParameter('ID')) {
        ID = thisParam1;
      } else {
        sessionStart = pad(Date.now(),16);
        sessionKey = Math.floor(Math.random() * 1000);
        sessionKey = pad(sessionKey,4);
        ID = sessionStart + "_" + sessionKey;
      }

function openFullscreen() 
{
	if (document.documentElement.requestFullscreen) 
		document.documentElement.requestFullscreen();
	else if (document.documentElement.webkitRequestFullscreen) 
		document.documentElement.webkitRequestFullscreen();
	else if (document.documentElement.msRequestFullscreen) 
		document.documentElement.msRequestFullscreen();
}   
let brojIteracija = 2;

async function startExperiment()
{
    btnStart.style="display:none";
    listaOdgovora =[];
    listaResenja=[];
    listaVremenaReakcije=[];

    await openFullscreen();
    
    let j =[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1]; 

    await shuffle(j);
    for ( let i =0;i<brojIteracija;i++)
    await crtaj(6,j[i]);

    await shuffle(j);
    for ( let i =0;i<brojIteracija;i++)
    await crtaj(8,j[i]);
    
    await shuffle(j);
    for ( let i =0;i<brojIteracija;i++)
    await crtaj(10,j[i]); 

    await shuffle(j);
    for ( let i =0;i<brojIteracija;i++)
    await crtaj2(8,j[i]);

    await popuniBazu();
}

function crtaj(broj,pom)
{
    return new Promise (async (resolve)=>
    {
        let s = new Slucaj(broj);
        await s.crtajKrugStandard();
        await s.crtajKrugTest(pom).then(()=>
        {
            listaOdgovora.push(Slucaj.Odgovor);
            listaResenja.push(s.resenje);
            listaVremenaReakcije.push(Slucaj.vremeReakcije);
        });
        resolve();
    });
}

function crtaj2(broj,pom)
{
    return new Promise (async (resolve)=>
    {
        let s = new Slucaj(broj);
        await s.crtajLinijuStandard();
        await s.crtajLinijuTest(pom).then(()=>
        {
            listaOdgovora.push(Slucaj.Odgovor);
            listaResenja.push(s.resenje);
            listaVremenaReakcije.push(Slucaj.vremeReakcije);
        });
        resolve();
    });
}

function shuffle(array) {
    return new Promise ( (resolve) => {
        for (let i = array.length - 1; i > 0; i--) 
        {
             let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
             [array[i], array[j]] = [array[j], array[i]];
         } 
             resolve();  
     });
}

function popuniBazu()
{
    document.querySelector(".mainContainer").innerHTML="<center><h1>Experiment se završava, molimo sačekajte!</h1></center>";
    console.log(listaOdgovora);
    console.log(listaResenja);
    console.log(listaVremenaReakcije);
    //da bih mogao kroz HTTP reqest da prosledim nizove morao sam da ih konkatenisem u string i onda prolsedjujem sam niz
   let odgovori ="";

   for (let i=0;i<listaOdgovora.length;i++)
   {
       odgovori = odgovori.concat(listaOdgovora[i],"-x-");
   }

   let resenja ="";

   for (let i=0;i<listaResenja.length;i++)
   {
    resenja = resenja.concat(listaResenja[i],"-x-");
   }

   let vremeReakcije ="";

   for (let i=0;i<listaVremenaReakcije.length;i++)
   {
    vremeReakcije = vremeReakcije.concat(listaVremenaReakcije[i],"-x-");
   }

   fetch("https://istrazivanje.azurewebsites.net/Korisnik/DodajRezultat/"+ID +'/'+resenja +'/' + odgovori+'/'+vremeReakcije,
   {
    method:"PUT",
    headers: {'Content-Type': 'application/json'},
   }).then(async s=>
    {
        if (s.ok)
        {
            console.log("uspesno");
            document.querySelector(".mainContainer").innerHTML="<center><h1>Eksperiment je završen, hvala na učestvovanju!</h1></center>"; 
           await document.exitFullscreen();
        }
    })
}
