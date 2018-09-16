import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  query:string;
  page :boolean = false ;
  content : any;

  constructor(
    private data: DataService,
    private rest: RestApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res=>{
      this.query = res['query']; 
      this.getProducts();
    })
  }
/*get lower(){
  return 1 + this.content.hitsPerPage * this.content.page;
}

get upper(){
  return Math.min(
    this.content.hitsPerPage * (this.content.page * 1),
    this.content.nbHits
  )
}
*/
  async getProducts(){
    this.content = null;
    try {
      const data = await this.rest.get(
        `http://localhost:8080/api/search?query=${this.query}`
      );
      data['success']
      ? (this.content = data['content'],this.page = true)
      : this.data.error(data['message']);
      console.log(data['content'])
    } catch (error) {
      this.data.error(error['message']);
    }
  }

}
