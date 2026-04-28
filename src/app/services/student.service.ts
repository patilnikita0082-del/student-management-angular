import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  course: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  baseUrl = "https://localhost:7215/api/students";

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem("token");

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (token) {
      return {
        headers: headers.set('Authorization', `Bearer ${token}`)
      };
    }

    return { headers };
  }

  // ✅ FIX IS HERE (IMPORTANT)
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl, this.getAuthHeaders());
  }

  addStudent(data: Student): Observable<any> {
    return this.http.post(this.baseUrl, data, this.getAuthHeaders());
  }

  updateStudent(id: number, data: Student): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data, this.getAuthHeaders());
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, this.getAuthHeaders());
  }
}