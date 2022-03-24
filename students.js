"use strict";

let students = DATABASE.students
// let student = [DATABASE.students[0], DATABASE.students[1]];

function renderStudent (id){
    let div = document.createElement("div");
    let student = DATABASE.students[id];
    div.classList = "container";
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

function renderCourses (student){
    let courseData = DATABASE.courses;
    let courses = [];
    for (let i = 0; i < student.courses.length; i++){
        let id = student.courses[i].courseId 
        courses.push(courseData[id]);
    }

   let courseDiv = []
   for (let i = 0; i < courses.length; i++) {
       let div = document.createElement("div");

       if (student.courses[i].passedCredits == courseData[courses[i].courseId].totalCredits) {
           let text = div.innerHTML = 
           `<div class="done"><h4>${courses[i].title}</h4>
           <p>${student.courses[i].started.semester} ${student.courses[i].started.year} (${student.courses[i].passedCredits} of ${courseData[courses[i].courseId].totalCredits} credits)</p></div>`
           courseDiv.push(text)
       } else {
           let text = div.innerHTML = 
           `<div><h4>${courses[i].title}</h4>
           <p>${student.courses[i].started.semester} ${student.courses[i].started.year} (${student.courses[i].passedCredits} of ${courseData[courses[i].courseId].totalCredits} credits)</p></div>`
           courseDiv.push(text)
       }
   }
   return courseDiv.toString().split(",").join("");
}


renderStudents(DATABASE.students);