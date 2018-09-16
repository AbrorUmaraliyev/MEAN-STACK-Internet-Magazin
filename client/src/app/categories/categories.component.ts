import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: any;
  btnDisabled = false;
  newCategory: any;

  constructor(
    private data: DataService,
    private rest: RestApiService
  ) { }

  async  ngOnInit() {
    try {
      const data = await this.rest.get(
        'http://localhost:8080/api/categories'
      );
      data['success']
        ? (this.categories = data['categories'])
        : this.data.error(data['message']);
    } catch (error) {
      this.data.error(error['message']);
    }

  }

  async addCategory() {
    this.btnDisabled = true;
    try {
      const data = await this.rest.post(
        'http://localhost:8080/api/categories',
        { category: this.newCategory }
      );
      data['success']
        ? this.data.success(data['message'])
        : this.data.error(data['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }

}
