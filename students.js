"use strict";

let students = DATABASE.students

// Funktionen skapar en div container för varje student som finns. Därefter skriver vi hur vår HTML 
// ska i containern ska vara uppbyggt och vilken information som ska finnas med.
function renderStudent(id){
    let div = document.createElement("div");
    let student = DATABASE.students[id];
    div.classList = "container";
    div.innerHTML = `
    <header> ${student.firstName} ${student.lastName} (total credits: ${totalCredits(student)})</header>
    <div>
        <div class="course">
            <h3>Courses: </h3>
            <div class="courses">
                ${renderCourses(student)}
            </div> 
        </div>
    </div>`
    return div;
}

// Funktionen räknar ut varje students totala poäng 
function totalCredits(student){
    let credits = [];
    for (let course of student.courses){
        credits.push(course.passedCredits)
    }
    let creditsSum = 0;
    for (let i = 0; i < credits.length; i++){
        creditsSum += credits[i];
    }
    return creditsSum;
}

// Funktionen visar vart vi vill att våra containers för studenterna ska finnas 
function renderStudents(students){
    let studentsElement = document.getElementById("result");
    for ( let student of students ) {
        let studentElement = renderStudent(student.studentID);
        studentsElement.appendChild(studentElement);
    }
}

// Funktionen tar ut alla kurserna verje student har gått och vilken information som ska finnas med.
function renderCourses(student){
    let courseDatabase = DATABASE.courses;
    let courses = [];
    for (let i = 0; i < student.courses.length; i++){
        let id = student.courses[i].courseId 
        courses.push(courseDatabase[id]);
    }

   let courseInfo = [];
   for (let i = 0; i < courses.length; i++) {
       let div = document.createElement("div");

       if (student.courses[i].passedCredits == courseDatabase[courses[i].courseId].totalCredits) {
           let text = div.innerHTML = 
           `<div class="done"><h4>${courses[i].title}</h4>
           <p>${student.courses[i].started.semester} ${student.courses[i].started.year} (${student.courses[i].passedCredits} of ${courseDatabase[courses[i].courseId].totalCredits} credits)</p></div>`
           courseInfo.push(text)
       } else {
           let text = div.innerHTML = 
           `<div class="not-done"><h4>${courses[i].title}</h4>
           <p>${student.courses[i].started.semester} ${student.courses[i].started.year} (${student.courses[i].passedCredits} of ${courseDatabase[courses[i].courseId].totalCredits} credits)</p></div>`
           courseInfo.push(text)
       }
   }
   return courseInfo.toString().split(",").join("");
}

// Funktionen gör så vi kan söka på studenterna genom deras efternamn i sökfältet.
function searchLastName() {
    return input.value.toLowerCase();
}

// Funktionen gör så vi får upp resultatet baserat på vad som skrivs in i sökfältet.
function studentsLastName (){
    let studentsArray = [];
    for ( let i = 0; i < students.length; i++){
        document.getElementById("result").innerHTML = "";
        if ("" == searchLastName()){
            document.getElementById("result").innerHTML = "";
        } else if (students[i].lastName.toLowerCase().includes(searchLastName())) {
            studentsArray.push(students[i]);
        } 

    }

    renderStudents(studentsArray)
}

// Skapar en event listener på student-search baserat på vårt html dokument. 
let input = document.getElementById("student-search");
input.addEventListener("keyup", studentsLastName);

//Funktionen sparar ett boolean value till local-storage
function darkMode() {
    let element = document.body;
    let darkMode = localStorage.getItem("darkMode")
    element.classList.toggle("darkMode");

    if (JSON.parse(darkMode) == true) {
        element.classList.remove("darkMode");
        localStorage.setItem("darkMode", JSON.stringify(false));
    } 
    else if (JSON.parse(darkMode) == false) {
        element.classList.add("darkMode");
        localStorage.setItem("darkMode", JSON.stringify(true));
    }
}  

// Funktionen kollar om vi har något boolean value att hämta ifrån Local Storage
function checkDarkMode () {
    let darkMode = localStorage.getItem("darkMode");
    if (darkMode == null) {
    localStorage.setItem("darkMode", JSON.stringify(false));
    }
    let element = document.body;

    if (JSON.parse(darkMode) == true) {
        element.classList.add("darkMode")
    } else {
        element.classList.remove("darkMode");
    }
}

// Kollar om darkMode är true eller false varge gång man laddar om sidan.
window.onload = () => {
    checkDarkMode();
};

// Skapar en klick funktion på knappen DARK/LIGHT
let btn = document.querySelector("#dark-mode");
btn.addEventListener("click", darkMode);

renderStudents(DATABASE.students);
