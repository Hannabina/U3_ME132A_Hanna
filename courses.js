"use strict";

let courses = DATABASE.courses;
let teachers = DATABASE.teachers;

// Funktionen skapar en div container för varje kurs som finns. Därefter skriver vi hur vår HTML 
// ska i containern ska vara uppbyggt och vilken information som ska finnas med.
function renderCourse(id) {
    let div = document.createElement("div");
    let courses = DATABASE.courses[id];
    div.classList = "container";
    div.innerHTML = `
    <header class="course-title"> ${courses.title} (total credits: ${courses.totalCredits})</header>
    <div>
        <div class="box">
            <div class=resp-box><h3>Course responsible: </h3>
            <div class="responsible"> 
                ${findResponsible(courses)}
            </div>
            <h3>Teachers: </h3>
            <div class="teachers"> 
                ${findTeachers(courses)}
            </div></div>
            <div class=student-box"><h3>Students: </h3>
            <div class="students">
                ${findStudents(courses)}
            </div></div>
        </div>`

    return div;
}

// Funktionen tar ut alla responsible teachers för varje kurs genom att matcha ihop teacher id med courseResponsible.
function findResponsible(courses){
    let responsibleTeacher = [];
    for (let i = 0; i < DATABASE.teachers.length; i++){
       let div = document.createElement("div");
       if (DATABASE.teachers[i].teacherId == courses.courseResponsible) {
           let text = div.innerHTML = 
           `<div><h4>${DATABASE.teachers[i].firstName} ${DATABASE.teachers[i].lastName} (${teachers[i].post})</h4></div>`
           responsibleTeacher.push(text);
       } 
   }
   return responsibleTeacher.toString().split(",").join("");
}

// Funktionen tar ut alla lärarna som undervisar i kursen genom att matcha teacherId med kursernas teachers.
// Detta gör vi genom en loop som går igenom alla lärarna och sedan en loop innuti denna för att gå igenom alla kursernas lärare.
function findTeachers(courses) {
    let teacherBox = [];
    for (let i = 0; i < DATABASE.teachers.length; i++) {
        let div = document.createElement("div")
        for (let x = 0; x < courses.teachers.length; x++){
            if (DATABASE.teachers[i].teacherId == courses.teachers[x]) {
                let text = div.innerHTML = `
                <div><h4>${DATABASE.teachers[i].firstName} ${DATABASE.teachers[i].lastName} (${DATABASE.teachers[i].post})</h4></div>`
                teacherBox.push(text);
            }
        } 
    }
    return teacherBox.toString().split(",").join("");
}

// Funktionen tar ut alla studenterna som går eller har gått kursen. 
// Detta gör vi genom att först gå igenom alla studenterna i en loop och sedan en loop innuti denna
// som går igenom alla kurserna som varge student har gått/går.
// Genom if och else if kan vi skapa divvar med en class för de studenter som har klarat kursen och 
// divvar med en annan class för att få ut de som inte är klara med kursen.
function findStudents(courses){
    let studentBox = [];
    for (let i = 0; i < DATABASE.students.length; i++){
        let div = document.createElement("div");
        for (let x = 0; x < DATABASE.students[i].courses.length; x++){
            if (DATABASE.students[i].courses[x].courseId == courses.courseId && DATABASE.students[i].courses[x].passedCredits == courses.totalCredits){
                let text = div.innerHTML = `
                <div class="done"><h4>${DATABASE.students[i].firstName} ${DATABASE.students[i].lastName} (${DATABASE.students[i].courses[x].passedCredits} Credits)</h4>
                <p>${DATABASE.students[i].courses[x].started.semester} ${DATABASE.students[i].courses[x].started.year}</p></div>`
                studentBox.push(text);
            } else if (DATABASE.students[i].courses[x].courseId == courses.courseId && DATABASE.students[i].courses[x].passedCredits < courses.totalCredits){
                let text = div.innerHTML = `
                <div class="not-done"><h4>${DATABASE.students[i].firstName} ${DATABASE.students[i].lastName} (${DATABASE.students[i].courses[x].passedCredits} Credits)</h4>
                <p>${DATABASE.students[i].courses[x].started.semester} ${DATABASE.students[i].courses[x].started.year}</p></div>`
                studentBox.push(text);
            }
        }
    }
    return studentBox.toString().split(",").join("");
}

// Funktionen visar vart vi vill sätta in vår container med all information.
function renderCourses(courses){
    let coursesElement = document.getElementById("result");
    for (let course of courses){
        let courseElement = renderCourse(course.courseId);
        coursesElement.appendChild(courseElement);
    }
}


// Skapar en event listnener i vårt sökfält så vi sen kan söka på kurserna.
let input = document.getElementById("course-search");
input.addEventListener("keyup", courseTitle);

// Funktionen gör att vi kan söka med både små och stora bokstäver 
function searchCourseTitle() {
    return input.value.toLowerCase();
}

// Funktionen gör att vi får upp kurserna som stämmer in på vad vi skrivit i sökfältet som resultat.
function courseTitle (){
    let courseArray = [];
    for ( let i = 0; i < courses.length; i++){
        document.getElementById("result").innerHTML = "";
        if ("" == searchCourseTitle()){
            document.getElementById("result").innerHTML = "";
        } else if (courses[i].title.toLowerCase().includes(searchCourseTitle())) {
            courseArray.push(courses[i]);
        } 

    }

    renderCourses(courseArray)
}

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

// Kollar om darkmode är true eller false varje gång sidan laddas om.
window.onload = () => {
    checkDarkMode();
};

// Skapar en klick funktion på knappen Dark/Light.
let btn = document.querySelector("#dark-mode");
btn.addEventListener("click", darkMode);

renderCourses(DATABASE.courses);