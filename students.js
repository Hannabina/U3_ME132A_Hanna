"use strict";

let students = DATABASE.students
let student = [DATABASE.students[0], DATABASE.students[1]];

function renderStudent (id){
    let div = document.createElement("div");
    let student = DATABASE.students[id];
    div.id = "container";
    div.innerHTML = `
    <header> ${student.firstName} ${student.lastName} (total credits: ${totalCredits(student)})</header>
    <div>
        <div id="course">
            <h3>Courses: </h3>
            <div id="courses">
                ${renderCourses(student)}
            </div> 
        </div>
    </div>`
    return div;
}

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

function renderStudents (students){
    let studentsElement = document.getElementById("result");
    for ( let student of students ) {
        let studentElement = renderStudent(student.studentID);
        studentsElement.appendChild(studentElement);
    }
}

function renderCourses(student){
    let courseData = DATABASE.courses;
    let courses = [];
    for (let course of student.courses) {
        if (course.courseID == courseData.courseID){
            courses.push(courseData);
        }
    }
}


renderStudents(DATABASE.students);