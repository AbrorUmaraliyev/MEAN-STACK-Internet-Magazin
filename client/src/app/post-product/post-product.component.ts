import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.css']
})
export class PostProductComponent implements OnInit {

  product = {
    title: '',
    price: 0,
    categoryId: '',
    description: '',
    images: null
  }

  categories: any;
  btnDisabled = false;

  constructor(
    private data: DataService,
    private rest: RestApiService,
    private router: Router
  ) { }

  async ngOnInit() {
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

  validate(product) {
    if (product.title) {
      if (product.price) {
        if (product.categoryId) {
          if (product.description) {
            if (product.images) {
              return true;
            }
            else {
              this.data.error('Please select file');
            }
          } else {
            this.data.error('Please enter description');
          }
        } else {
          this.data.error('Please select Category');
        }
      } else {
        this.data.error('Please enter a price');
      }
    } else {
      this.data.error('Please enter a Title');
    }
  }

  fileChange(event: any) {
    this.product.images = event.target.files[0];
  }

  async post() {
    this.btnDisabled = true;
    try {
      if (this.validate(this.product)) {
        const form = new FormData();
        for (const key in this.product) {
          console.log(this.product.images);
          if (this.product.hasOwnProperty(key)) {
            if (key === 'images') {
              form.append(
                'images',
                this.product.images,
                this.product.images.name
              );
            } else {
              form.append(key, this.product[key]);
            }
          }
        }
        const data = await this.rest.post(
          'http://localhost:8080/api/seller/products',
          form
        );
        data['success']
          ? this.router.navigate(['/profile/myproducts'])
          .then(()=> this.data.success(data['message']))
          .catch(error => this.data.error(error))
          : this.data.error(data['message']);
      }
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }

}
