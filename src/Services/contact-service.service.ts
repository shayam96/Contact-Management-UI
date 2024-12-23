import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from 'src/Models/model';
 
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'https://localhost:7252/api/Contact';


  constructor(private http: HttpClient) {}


  getAllContacts(term?: string): Observable<Contact[]> {
    let params = new HttpParams();
    if (term) {
      params = params.set('search', term);
    }
    return this.http.get<Contact[]>(this.apiUrl, { params });
  }
  

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  updateContact(id: number, contact: Contact): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, contact);
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
