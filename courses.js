"use strict";

let courses = DATABASE.courses;
let teachers = DATABASE.teachers;

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

function renderCourses(courses){
    let coursesElement = document.getElementById("result");
    for (let course of courses){
        let courseElement = renderCourse(course.courseId);
        coursesElement.appendChild(courseElement);
    }
}



function searchCourseTitle() {
    return input.value.toLowerCase();
}

let input = document.getElementById("course-search");
input.addEventListener("keyup", courseTitle);

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

function checkDarkMode () {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode == null) {
    localStorage.setItem("darkMode", JSON.stringify(false));
 }
    var element = document.body;

    if (JSON.parse(darkMode)== true) {
        element.classList.add("darkMode")
    } else {
        element.classList.remove("darkMode");
    }
}

function darkMode() {
    let element = document.body;
    const darkMode = localStorage.getItem("darkMode")
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

const btn = document.querySelector("#dark-mode");
btn.addEventListener("click", darkMode);

// function submit () {
//     let courseArray = []
//     for ( let i = 0; i < courses.length; i++){
//         if (courses[i].title.toLocaleLowerCase().includes(searchCourseTitle())) {
//             courseArray.push(courses[i]);
//         } 
//     }

//     renderCourses(courseArray)
// }

// input.addEventListener("submit", submit);


renderCourses(DATABASE.courses);