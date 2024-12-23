import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/Models/model';
import { ContactService } from 'src/Services/contact-service.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-all-contact',
  templateUrl: './all-contact.component.html',
  styleUrls: ['./all-contact.component.scss']
})
export class AllContactComponent implements OnInit {


  selectedContact: Contact | null = null;
  isEditing = false;
  
  searchTerm: any= null;
  modelChanged = new Subject<string>();
  ConstactList :Contact[] =[];
  isFormVisible: boolean = false;
  
  constructor(private contactService: ContactService) {
  }

  ngOnInit(): void {
    this.modelChanged
      .pipe(
        debounceTime(300), 
        switchMap((term: string) => this.contactService.getAllContacts(term))
      )
      .subscribe((contacts) => {
        this.ConstactList = contacts;
      });

      this.loadAllContacts();
    }

  loadAllContacts(): void {
    this.contactService.getAllContacts().subscribe((contacts) => {
      this.ConstactList = contacts;
    });
  }
  
  onSearchChange(keyword: any) {
    this.modelChanged.next(keyword);
  }


  onNewContact(): void {
    this.selectedContact = null; // Clear selection for new contact
    this.isFormVisible = true; // Show the form
  }
 
 

  editContact(contact: Contact): void {
    this.selectedContact = contact;
    this.isEditing = true;
    this.isFormVisible = true;

  }

  deleteContact(id: number): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(id).subscribe(() => {
        this.loadAllContacts();
      });
    }
  }

  handleFormSubmit(contact: Contact): void {
    if (this.isEditing) {
      this.isFormVisible = false
      this.contactService.updateContact(contact.id, contact).subscribe(() => {
        this.loadAllContacts();
        
      });
    } else {
      this.isFormVisible = false
      this.contactService.addContact(contact).subscribe(() => {
        this.loadAllContacts();
        
      });
    }
  
  }

 


}