import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  baseUrl = "http://localhost:5231/api/students";

  constructor(private http: HttpClient) { }

  getStudents() {
    return this.http.get(this.baseUrl);
  }

  addStudent(student: any, token: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.baseUrl, student, { headers });
  }
}