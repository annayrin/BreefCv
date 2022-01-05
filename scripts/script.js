    /*
    let person1 = {
    id:1,
    firstName: "Anna",
    lastName: "Hayriyan",
    phone:"+374-98-14-44-50",
    email: "annhayriyan@gmail.com",
    image:"cv.png",
    profession: "Undefined",
    education:[
        {
            place: "ASUE",
            years:"2012-2015"
        },
        {
        place: "UBA",
        years:"2016-2018"
            },
    ],
    workplace: [
        {
            place: "Some place",
            years: "2015-2017",
        },
        {
            place: "Another place",
            years: "2019-2021",
        }

    ],
    skills: [ // or languages?
        {
            skill: "Photoshop",
            level: "Advanced",
        },
        {
            skill: "English",
            level: "Intermedium",
        }

    ],
};
let person2 = {
    id:2,
    firstName: "Hasmik",
    lastName: "Gevorgyan",
    phone:"+374-99-46-36-23",
    email: "gevorgyan.icml@gmail.com",
    image:"icon/hasmik.jpeg",
    profession: "Accountant",
    education:[
        {
            place: "ASUE",
            years:"2012-2015"
        },
        {
            place: "UBA",
            years:"2016-2018"
        },
    ],
    workplace: [
        {
            place: "SOme place",
            years: "2015-2017",
        },
        {
            place: "Another place",
            years: "2019-2021",
        }

    ],
    skills: [ // or languages?
        {
            skill: "Photoshop",
            level: "Advanced",
        },
        {
            skill: "English",
            level: "Intermedium",
        }

    ],
};
let person3 = {
    id:3,
    firstName: "Anahit",
    lastName: "Khechumyan",
    phone:"+374-44-14-80-00",
    email: "Khechumyan63@gmail.com",
    profession: "Headmaster",
    education:[
        {
            place: "ASUE",
            years:"2012-2015"
        },
        {
            place: "UBA",
            years:"2016-2018"
        },
    ],
    workplace: [
        {
            place: "SOme place",
            years: "2015-2017",
        },
        {
            place: "Another place",
            years: "2019-2021",
        }

    ],
    skills: [ // or languages?
        {
            skill: "Photoshop",
            level: "Advanced",
        },
        {
            skill: "English",
            level: "Intermedium",
        }

    ],
};
let person4 = {
    id:4,
    firstName: "Narek",
    lastName: "Tovmasyan",
    phone:"+374-94-27-67-00",
    email: "narektom333@gmail.com",
    profession: "Executive Director of 'Google'",
    education:[
        {
            place: "ASUE",
            years:"2012-2015"
        },
        {
            place: "UBA",
            years:"2016-2018"
        },
    ],
    workplace: [
        {
            place: "SOme place",
            years: "2015-2017",
        },
        {
            place: "Another place",
            years: "2019-2021",
        }

    ],
    skills: [ // or languages?
        {
            skill: "Photoshop",
            level: "Advanced",
        },
        {
            skill: "English",
            level: "Intermedium",
        }

    ],
};
let person5 = {
    id:5,
    firstName: "Aleksandr",
    lastName: "Hambarcumyan",
    phone:"+374-97-70-50-90",
    email: "alexanhambarcumyan@gmail.com",
    profession: "UI/UX designer",
    education:[
        {
            place: "ASUE",
            years:"2012-2015"
        },
        {
            place: "UBA",
            years:"2016-2018"
        },
    ],
    workplace: [
        {
            place: "SOme place",
            years: "2015-2017",
        },
        {
            place: "Another place",
            years: "2019-2021",
        }

    ],
    skills: [ // or languages?
        {
            skill: "Photoshop",
            level: "Advanced",
        },
        {
            skill: "English",
            level: "Intermedium",
        }

    ],
};
*/
    import {
        members as personsFromStorage
} from "./data.js"

let persons = getFromStorage("users") || saveToStorage(personsFromStorage); //porque no usar directamente members? y porque users?
    console.log(persons);
    console.log(personsFromStorage);

    function initList() {
    let cvPage = document.querySelector("#page");
    persons.forEach(function (person) {
        let blockImg = person.imagePath ? person.imagePath:"icon/cv.png";
        cvPage.innerHTML += `<div class="block"><img class="cvImg" src="${blockImg}" alt="smt">
        <a href="#cvPage?id=${person.id}">${person.firstName} ${person.lastName}</a> </div>`;
    });
}
   document.getElementById("allMembers").addEventListener("click", initList);
function showNewMember() {
    let cvPage = document.querySelector("#page");
    let cvHiddenPage = document.querySelector(".cv");
    let newMemberHidden = document.querySelector(".newMember");
    newMemberHidden.classList.remove("hidden");
    cvPage.classList.add("hidden");
    cvHiddenPage.classList.add("hidden");
        }

    document.getElementById("addNewMember").addEventListener("click", showNewMember);

    document.querySelector(".submitButton").addEventListener("click", function(event){
        event.preventDefault();

        let inputData = document.getElementById("newMember").elements;
        console.log(inputData);
        let newPerson = {
            imagePath: "Img/cv.png",
            id: new Date().valueOf()
        }

        for (let element of inputData){
          newPerson[element.name] = element.value;
          }

        persons.push(newPerson);
        saveToStorage(persons);
        window.location.replace("./main.html")
    });

    document.getElementById("deleteMember").addEventListener("click",deleteMember);

    function deleteMember(){
        let hash = window.location.hash.split("=");
        let id = hash[1];
        console.log(id);
        for (let person of persons) {
            if (person.id == id) {
                let text = "Are you sure?";
                if (confirm(text) === true) {
                    persons = persons.filter(x => x !== person);
                }
                saveToStorage(persons);

            }

        }
        window.location.replace("./main.html");
    }

window.addEventListener("hashchange", function (event) {
    event.preventDefault();
    console.log("The URL has changed");
    console.log(window.location.hash);

    let block = document.querySelector("#page");
    let cv = document.querySelector(".cv");
    let newMember = document.querySelector(".newMember");

    if (window.location.hash.includes("cvPage")) {
        block.classList.add("hidden");
        cv.classList.remove("hidden");//saca el class hidden de cv
        newMember.classList.add("hidden");
        let hash = window.location.hash.split("=");
        let id = hash[1];
        for (let person of persons) {
            if (person.id== id) { // cambie de toString
                addUserData(person);
            }
        }
    } else {
        block.classList.remove("hidden");
        cv.classList.add("hidden");
        newMember.classList.add("hidden");
    }
});


function addUserData(person) {
    document.querySelector(".first-name").innerHTML = person.firstName;
    document.querySelector(".last-name").innerHTML = person.lastName;
    document.querySelector(".cvImage").src = person.imagePath;
    document.querySelector(".emailInput").innerHTML = person.email;
    document.querySelector(".emailInput").href = "mailto:person.email";
    document.querySelector(".phoneInput").innerHTML = person.phone;
    document.querySelector(".phoneInput").href = "tel:person.phone";
    document.querySelector(".addr").innerHTML = person.education;
    document.querySelector(".expPlace").innerHTML = person.experience;
    document.querySelector(".unordered").innerHTML = person.trainings;

}

function saveToStorage(data){
    let stringifiedData = JSON.stringify(data);
    window.localStorage.setItem("users", stringifiedData);
    return data;
}
function getFromStorage(data){
    let dataFromStorage = window.localStorage.getItem(data);
    if(dataFromStorage){
        return JSON.parse(dataFromStorage);
    }
    return false;

}



