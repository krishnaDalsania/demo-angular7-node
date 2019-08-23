import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudUserService } from '../../../services/crud-user.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  editForm: FormGroup;
  submitForm = false;

  constructor(
    private formBuilder: FormBuilder,
    private crudUserService: CrudUserService,
    private route: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        if (params.id) {
          const editData = environment.dataList.find(data => data.id == params.id);
          this.editForm.patchValue({
            name: [editData.name],
            email: [editData.email],
            phone: [editData.phone]
          });
        }
      });
  }

  createForm() {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
    });
  }

  get form() { return this.editForm.controls; }

  allowNumeric(event, control) {
    this.editForm.controls[control].setValue(
      event.value.replace(/[^0-9]/g, '')
    );
  }

  submitEdit() {
    this.submitForm = true;
    console.log('====edit data', this.editForm);
    if (this.editForm.valid) {
      this.crudUserService.edit(this.editForm.value);
    }
  }

}
