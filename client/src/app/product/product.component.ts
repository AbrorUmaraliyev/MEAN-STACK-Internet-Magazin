import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: any;

  myReview = {
    title: '',
    description: '',
    rating: 0
  };
  btnDisabled:boolean = false;

  constructor(private data: DataService,
    private rest: RestApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      this.rest.get(`http://localhost:8080/api/product/${res['id']}`)
        .then(data => {
          data['success']
            ? (this.product = data['product'])
            : this.router.navigate(['/']);
        }).catch(error => this.data.error(error['message']));
      console.log(this.rest.get(`http://localhost:8080/api/product/${res['id']}`));
    })
  }

  async postReviewews() {
    this.btnDisabled = true;
    try {
      const data = await this.rest.post(
        'http://localhost:8080/api/review',
        {
          productId: this.product._id,
          title: this.myReview.title,
          description: this.myReview.description,
          rating: this.myReview.rating
        }
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
