import { Component, OnInit } from '@angular/core';
import { Rate } from '../rate';
import { Link } from '../links';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css']
})
export class RatesComponent implements OnInit {

  //rate = 'rate initial';
  rate: Rate = {
    currency: 'Mexican Peso',
    rate: 100.00,
  }
 
  linksArray: Link[];
  ratesArray: Rate[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo.watchQuery({
      query: gql`
      query links{
        allLinks{
          url
          description
        }
      }
      `,
    }).valueChanges.subscribe(result =>{
      //this.ratesArray = result.data.rates;
      this.linksArray = result.data.links;
      this.loading = result.loading;
      //this.error = result.error;

    });
  }

}
