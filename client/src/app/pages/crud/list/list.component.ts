import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

const ELEMENT_DATA = environment.dataList;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'action'];
  dataSource = ELEMENT_DATA;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
  }

  editData(element) {
    console.log('--------edit element', element);
    this.router.navigate(['/data/edit'], { queryParams: { id: element.id } });
  }

  deleteData(element) {
    console.log('--------delete element', element);
    this.dataSource = this.dataSource.filter(data => data.id !== element.id);
  }

}
