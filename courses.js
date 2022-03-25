"use strict";

let courses = DATABASE.courses;
let teachers = DATABASE.teachers;

function renderCourse(id) {
    let div = document.createElement("div");
    let courses = DATABASE.courses[id];
    div.classList = "container";
    div.innerHTML = `
    <header> ${courses.title} (total credits: ${courses.totalCredits}</header>
    <div>
        <div class="box">
            <h3>Course responsible: </h3>
            <div class="responsible"> 
                ${findResponsible(courses)}
            </div>
            <h3>Teachers: </h3>
            <div class="teachers"> 
                ${courses.teachers}
            </div>
            <h3>Students: </h3>
            <div class="students">
            
            </div>
        </div>`

        return div;
}

function findResponsible(courses){
    let responsibleTeacher = [];
    for (let i = 0; i < DATABASE.teachers.length; i++){
       let div = document.createElement("div");
       if (DATABASE.teachers[i].teacherId == courses.courseResponsible) {
           let text = div.innerHTML = 
           `<div class="responsibleteachers"><h4>${DATABASE.teachers[i].firstName} ${DATABASE.teachers[i].lastName} (${teachers[i].post})</h4>`
           responsibleTeacher.push(text);
       } 
   }
   return responsibleTeacher.toString().split(",").join("");
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

function submit () {
    let courseArray = []
    for ( let i = 0; i < courses.length; i++){
        if (courses[i].title.toLocaleLowerCase().includes(searchCourseTitle())) {
            courseArray.push(courses[i]);
        } 
    }

    renderCourses(courseArray)
}

input.addEventListener("submit", submit);


renderCourses(DATABASE.courses);