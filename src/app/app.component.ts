import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from './services/student.service';

interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  course: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  students: Student[] = [];

  student: Student = this.getEmptyStudent();

  showForm = false;
  message = '';

  constructor(private service: StudentService) {}

  ngOnInit(): void {
    this.load();
  }

  // 📥 LOAD
  load(): void {
    this.service.getStudents().subscribe({
      next: (res: Student[]) => {
        this.students = res;
      },
      error: (err) => {
        console.error(err);
        this.showMessage('Error loading students');
      }
    });
  }

  // ➕ NEW
  openNew(): void {
    this.student = this.getEmptyStudent();
    this.showForm = true;
  }

  // ✏️ EDIT
  edit(s: Student): void {
    this.student = { ...s };
    this.showForm = true;
  }

  // ❌ CLOSE FORM
  closeForm(): void {
    this.showForm = false;
    this.student = this.getEmptyStudent();
  }

  // 🧹 CLEAR FORM (safe method)
  clearForm(): void {
    this.student = this.getEmptyStudent();
  }

  // 💾 SAVE / UPDATE
  saveStudent(): void {
    if (this.student.id === 0) {
      this.service.addStudent(this.student).subscribe({
        next: () => {
          this.showMessage('Saved Successfully');
          this.load();
          this.closeForm();
        },
        error: (err) => {
          console.error(err);
          this.showMessage('Save Failed');
        }
      });
    } else {
      this.service.updateStudent(this.student.id, this.student).subscribe({
        next: () => {
          this.showMessage('Updated Successfully');
          this.load();
          this.closeForm();
        },
        error: (err) => {
          console.error(err);
          this.showMessage('Update Failed');
        }
      });
    }
  }

  // 🗑 DELETE
  delete(id: number): void {
    if (confirm('Are you sure you want to delete?')) {
      this.service.deleteStudent(id).subscribe({
        next: () => {
          this.showMessage('Deleted Successfully');
          this.load();
        },
        error: (err) => {
          console.error(err);
          this.showMessage('Delete Failed');
        }
      });
    }
  }

  // 🧾 EMPTY OBJECT
  private getEmptyStudent(): Student {
    return {
      id: 0,
      name: '',
      email: '',
      age: 0,
      course: ''
    };
  }

  // 📢 MESSAGE
  showMessage(msg: string): void {
    this.message = msg;
    setTimeout(() => this.message = '', 2000);
  }
}