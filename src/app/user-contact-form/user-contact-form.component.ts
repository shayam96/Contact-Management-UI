import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/Models/model';

@Component({
  selector: 'app-user-contact-form',
  templateUrl: './user-contact-form.component.html',
  styleUrls: ['./user-contact-form.component.scss']
})
export class UserContactFormComponent implements OnInit {
  @Input() contact: Contact | null = null;
  @Output() formSubmit = new EventEmitter<Contact>();

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contact'] && changes['contact'].currentValue) {
      this.contactForm.patchValue({
        firstName : changes['contact'].currentValue.firstName,
        lastName: changes['contact'].currentValue.lastName,
        email : changes['contact'].currentValue.email
      }) 
    }
    else if(changes['contact'].currentValue==null){
      this.contactForm.reset();
      this.resetForm();
    }
  }

   resetForm(): void {
    this.contactForm.reset({
      firstName: '',
      lastName: '',
      email: '',
    });
    this.contactForm.markAsUntouched()
  
   
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const formValue = this.contactForm.value;
      if (this.contact) formValue.id = this.contact.id;
      this.formSubmit.emit(formValue);
    }
  }

}
