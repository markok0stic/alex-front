import { appServer } from "./servers.js";
import { User } from "../models/User.js"
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
var uniqueID;

if ((thisParam1 = getUrlParameter("ID"))) {
    uniqueID = thisParam1;
} else {
    sessionStart = pad(Date.now(), 16);
    sessionKey = Math.floor(Math.random() * 1000);
    sessionKey = pad(sessionKey, 4);
    uniqueID = sessionStart + "_" + sessionKey;
}

function Instrument() {
    const elm = document.getElementById("instrument1");
    elm.classList.remove('hidden');
    elm.classList.add('proper-format')
}

function Nestani() {
    const elm = document.getElementById("instrument1");
    elm.classList.add('hidden');
    elm.classList.remove('proper-format');
}

function submitDemographics() {
    var thisForm = document.getElementById("demograpghicForm");
    let rbs = thisForm.querySelectorAll("input[type=radio]:checked");
    let tbGod = thisForm.querySelector("input[type=number]");
    let inst = document.getElementById("instrument1");

    if (inst != null && !inst.classList.contains('hidden')) {
        let tbInstrument = document.getElementById("vrstainstrumenta");
        let selVreme = document.getElementById("vreme");
        if (tbGod.value < 23 || tbGod.value > 33) {
            confirm(
                "Žao nam je, ali istraživanje je samo za osobe starosti između 23 i 33 godina. Hvala Vam na želji za učešće u ovom istraživanju!"
            );
        } else {
            if (
                rbs.length != 3 ||
                tbInstrument.value == "" ||
                selVreme.options[selVreme.selectedIndex].value == "" ||
                tbGod.value == 0
            )
                confirm("Pažnja niste uneli neko polje!");
            else {
                document.getElementById("textcont").innerHTML =
                    "Učitavanje...";
                document.getElementById("exp_button").disabled = true;
                let listaVrednsti = [];
                rbs.forEach((el) => {
                    listaVrednsti.push(el.value);
                });
                let user = new User(
                    0,
                    uniqueID,
                    listaVrednsti[0],
                    tbGod.value,
                    tbInstrument.value,
                    selVreme.options[selVreme.selectedIndex].value,
                    listaVrednsti[2],
                    undefined
                );
                console.log(JSON.stringify(user));
                fetch(`${appServer}/Users/AddUser`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user),
                }).then((s) => {
                    if (s.ok) {
                            window.location.href = "exp.html?ID=" + uniqueID;
                    } else {
                        console.log("greska prilikom dodavanja na serveru");
                    }
                });
            }
        }
    } else {
        if (tbGod.value < 23 || tbGod.value > 33) {
            confirm(
                "Žao nam je, ali istraživanje je samo za osobe starosti između 23 i 33 godina. Hvala Vam na želji za učešće u ovom istraživanju!"
            );
        } else {
            if (rbs.length != 3 || tbGod.value == 0)
                confirm("Pažnja niste uneli neko polje!");
            else {
                document.getElementById("textcont").innerHTML =
                    "Učitavanje...";
                document.getElementById("exp_button").disabled = true;
                let listaVrednsti = [];
                rbs.forEach((el) => {
                    listaVrednsti.push(el.value);
                });
                let user = new User(
                    0,
                    uniqueID,
                    listaVrednsti[0],
                    tbGod.value,
                    listaVrednsti[1],
                    undefined,
                    listaVrednsti[2],
                    undefined
                );
                console.log(JSON.stringify(user));
                fetch(`${appServer}/Users/AddUser`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user),
                }).then((s) => {
                    if (s.ok) {
                            window.location.href = "exp.html?ID=" + uniqueID;
                    } else {
                        console.log("greska prilikom dodavanja na serveru");
                    }
                });
            }
        }
    }
}

let rbt2 = document.getElementById("kamernop");
rbt2.onclick = (ev) => {
    Instrument();
};

let rb3 = document.getElementById("ne");
rb3.onclick = (ev) => {
    Nestani();
};

let btn = document.getElementById("exp_button");
btn.onclick = (ev) => {
    submitDemographics();
};
