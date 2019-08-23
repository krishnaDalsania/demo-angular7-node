import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudUserService } from '../../../services/crud-user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  addForm: FormGroup;
  submitForm = false;

  constructor(
    private formBuilder: FormBuilder,
    private crudUserService: CrudUserService
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
    });
  }

  get form() { return this.addForm.controls; }

  allowNumeric(event, control) {
    this.addForm.controls[control].setValue(
      event.value.replace(/[^0-9]/g, '')
    );
  }

  submitAdd() {
    this.submitForm = true;
    console.log('====add data', this.addForm);
    if (this.addForm.valid) {
      this.crudUserService.add(this.addForm.value);
    }
  }

}
