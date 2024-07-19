#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.magenta("\n\t WELCOME TO THE STUDENT MANAGEMENT SYSTEM by AMJAD ALI"));


interface Student {
    name: string;
    rollNumber: number;
    grade: string;
  }
  
  class StudentManagementSystem {
    private students: Student[] = [];
  
    async addStudent() {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: chalk.yellow('Enter student name:'),
        },
        {
          type: 'number',
          name: 'rollNumber',
          message: chalk.yellow('Enter student roll number:'),
        },
        {
          type: 'input',
          name: 'grade',
          message: chalk.yellow('Enter student grade:'),
        },
      ]);
  
      const student: Student = {
         name: answers.name,
         rollNumber: answers.rollNumber,
         grade: answers.grade,
       };
  
       this.students.push(student);
       console.log(chalk.green(`\nStudent added successfully!`));
     }
  
    async viewStudents() {
       if (this.students.length === 0) {
         console.log(chalk.red('\nNo students found!'));
         return;
       }
  
       console.log('\nStudents:');
       this.students.forEach((student, index) => {
         console.log(chalk.greenBright(`${index + 1}. Name: ${student.name}, Roll Number: ${student.rollNumber}, Grade: ${student.grade}`));
       });
     }
  
     async deleteStudent() {
       const answers = await inquirer.prompt([
         {
           type: 'number',
           name: 'rollNumber',
           message: 'Enter student roll number to delete:',
         },
       ]);
  
       const foundIndex = this.students.findIndex((student) => student.rollNumber === answers.rollNumber);
  
       if (foundIndex !== -1) {
         this.students.splice(foundIndex, 1);
         console.log(chalk.green('\nStudent deleted successfully!'));
               } else {
        console.log(chalk.red('\nStudent not found!'));
       }
     }
  
     async start() {
       while (true) {
         const answers = await inquirer.prompt([
           {
             type: 'list',
             name: 'action',
             message: '\nSelect an option:',
             choices: ['Add Student', 'View Students','Delete Student', 'Quit'],
           },
         ]);
  
         switch (answers.action) {
           case 'Add Student':
             await this.addStudent();
             break;
           case 'View Students':
             await this.viewStudents();
             break;
           case 'Delete Student':
             await this.deleteStudent();
             break;
         case 'Quit':
             return;
         }
      }
     }
  }

  const studentSystem = new StudentManagementSystem

studentSystem.start()