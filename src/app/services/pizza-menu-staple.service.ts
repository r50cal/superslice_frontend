import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PizzaMenuStapleService {

  private _meal_url = "http://localhost:9000/getMeatToppings";
  private _veg_url = "http://localhost:9000/getVeggieToppings";

  constructor(private http:HttpClient) {}



  getMealToppingPizza():Observable<any>{
    let meal = this.http.get<any>(this._meal_url);
    return meal;
  }

  getVegToppingPizza(){
    let veg = this.http.get(this._veg_url);
    console.log(veg);
    return veg;
  }

  
  
}
