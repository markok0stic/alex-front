import { Slucaj } from "../models/Slucaj.js";
import {ExperimentResult} from "../models/ExperimentResult.js";
import {appServer} from "./servers.js";

let mainContainer = document.createElement("div");
mainContainer.className = "mainContainer";
document.body.appendChild(mainContainer);

let lblNaslov = document.createElement("label");
lblNaslov.classList.add('lblNaslov')
mainContainer.appendChild(lblNaslov);

let lbldesc = document.createElement("label");
lbldesc.classList.add('lbl-desc')
lbldesc.innerText = `U ovom eksperimentu biće Vam prikazani kružići.

Eksperiment se sastoji iz dva dela:

Prvi deo - gde je potrebno da pažljivo posmatrate pojavljivanje kružića
Drugi deo - gde ćete opet posmatrati pojavljivanje kružića, ali tako da obratite pažnju na to da li postoji ili ne postoji razlika između prvog dela eksperimenta i drugog.

Ukoliko postoji razlika, pritisnite slovo L na tastaturi, ukoliko ne postoji, pritisnite A.

Molim Vas da pozicionirate kažiprste obe ruke iznad tastature, odnosno iznad tastera A i L. Ovo će Vam omogućiti da odgovarate brzo!
`
mainContainer.appendChild(lbldesc);

let divStartExp = document.createElement("div")
divStartExp.classList.add('divStart');
let lblStartExp = document.createElement("label");
lblStartExp.innerHTML = "Da započnes eksperiment pritsni dugme: ";
divStartExp.appendChild(lblStartExp);

let btnStart = document.createElement("button");
btnStart.innerText = "Započni eksperiment";
btnStart.classList.add('div-start-btn')
btnStart.onclick = (ev) => startExperiment(mainContainer);
divStartExp.appendChild(btnStart);
mainContainer.appendChild(divStartExp);

let smallContainer = document.createElement("div");
smallContainer.className = "smallContainer";
mainContainer.appendChild(smallContainer);

let lblOdg = document.createElement("label");
lblOdg.className = "lblOdg";
mainContainer.appendChild(lblOdg);
//ukoliko se radi u phpu potrebno je da samo ova tri niza nadju nekako taj izlazni fajl opet kazem ne znam php ali mogu da naucim
let listaOdgovora = []; // ovde se nalaze odgovori klijenta
let listaVremenaReakcije = []; //  ovde se nalaze vremena reakcije klijenta
let listaResenja = []; // ovde je lista resenja testova

function getUrlParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);
    return results === null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var sessionStart;
var sessionKey;
var thisParam1;
var ID;

if ((thisParam1 = getUrlParameter("ID"))) {
    ID = thisParam1;
} else {
    sessionStart = pad(Date.now(), 16);
    sessionKey = Math.floor(Math.random() * 1000);
    sessionKey = pad(sessionKey, 4);
    ID = sessionStart + "_" + sessionKey;
}

function openFullscreen() {
    if (document.documentElement.requestFullscreen)
        document.documentElement.requestFullscreen();
    else if (document.documentElement.webkitRequestFullscreen)
        document.documentElement.webkitRequestFullscreen();
    else if (document.documentElement.msRequestFullscreen)
        document.documentElement.msRequestFullscreen();
}
let brojIteracija = 1;

async function startExperiment() {
    divStartExp.style = "display:none";
    lbldesc.style = "display:none";

    listaOdgovora = [];
    listaResenja = [];
    listaVremenaReakcije = [];

    await openFullscreen();

    let j = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1];

    await shuffle(j);
    for (let i = 0; i < brojIteracija; i++) await crtaj(6, j[i]);

    await shuffle(j);
    for (let i = 0; i < brojIteracija; i++) await crtaj(8, j[i]);

    await shuffle(j);
    for (let i = 0; i < brojIteracija; i++) await crtaj(10, j[i]);

    await shuffle(j);
    for (let i = 0; i < brojIteracija; i++) await crtaj2(6, j[i]);

    await shuffle(j);
    for (let i = 0; i < brojIteracija; i++) await crtaj2(8, j[i]);

    await shuffle(j);
    for (let i = 0; i < brojIteracija; i++) await crtaj2(10, j[i]);

    await popuniBazu();
}

function crtaj(broj, pom) {
    return new Promise(async (resolve) => {
        let s = new Slucaj(broj);
        await s.crtajKrugStandard();
        await s.crtajKrugTest(pom).then(() => {
            listaOdgovora.push(Slucaj.Odgovor);
            listaResenja.push(s.resenje);
            listaVremenaReakcije.push(Slucaj.vremeReakcije);
        });
        resolve();
    });
}

function crtaj2(broj, pom) {
    return new Promise(async (resolve) => {
        let s = new Slucaj(broj);
        await s.crtajLinijuStandard();
        await s.crtajLinijuTest(pom).then(() => {
            listaOdgovora.push(Slucaj.Odgovor);
            listaResenja.push(s.resenje);
            listaVremenaReakcije.push(Slucaj.vremeReakcije);
        });
        resolve();
    });
}

function shuffle(array) {
    return new Promise((resolve) => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
            [array[i], array[j]] = [array[j], array[i]];
        }
        resolve();
    });
}

function popuniBazu() {

    console.log(listaOdgovora);
    console.log(listaResenja);
    console.log(listaVremenaReakcije);
    //da bih mogao kroz HTTP reqest da prosledim nizove morao sam da ih konkatenisem u string i onda prolsedjujem sam niz


    let listExperimentResults = [];

    for (let i = 0; i < listaOdgovora.length; i++) {
        listExperimentResults.push(new ExperimentResult(listaResenja[i],listaOdgovora[i],listaVremenaReakcije[i]))
    }

    fetch(
        `${appServer}/Users/AddExperimentResult?userId=` + ID, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(listExperimentResults)
        }).then(async (s) => {
        if (s.ok) {
            console.log("uspesno");
            document.querySelector(".mainContainer").innerHTML =
                "<center><h1>Eksperiment je završen, hvala na učestvovanju!</h1></center>";
            await document.exitFullscreen();
        }

        var mainContainer = document.querySelector('.mainContainer');
        mainContainer.innerHTML = ``;
        lbldesc.style="display:initial;"
        lbldesc.innerText =
            `Mnogo Vam hvala što ste učestvovali u ovom eksperimentu i pomogli mi!
        
       Ukoliko Vas zanimaju vaši rezultati u odnosu na ostale ispitanike, molim Vas da mi pošaljete Vaš lični kod (istraživanje je anonimno, tako da bez koda ne znamo ko ste).`
        mainContainer.appendChild(lbldesc);

    }).catch(()=>{
        var mainContainer = document.querySelector('.mainContainer');
        mainContainer.innerHTML = ``;
        lbldesc.style="display:initial;"
        lbldesc.innerText =
            `Doslo je do problema prilikom dodavanja na serveru.`
        mainContainer.appendChild(lbldesc);
    });
}
