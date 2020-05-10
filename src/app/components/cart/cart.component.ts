import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {pizzaForm} from "../../models/pizzaform";
import {orderForm} from "../../models/orderform";
import  * as $  from 'jquery';
import {DOCUMENT} from "@angular/common";
import {pizza} from "../../models/pizza";
import {topping} from "../../models/topping";
import {CheckoutService} from "../../services/checkout.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems : orderForm = {username: localStorage.getItem('user_key'),
    pizzaForms: [{type : '', toppingNames: [''], size: '', cost: 0, quantity:1}],
    note: '' };

  cartWithToppings : orderForm = {username: localStorage.getItem('user_key'),
    pizzaForms: [{type : '', toppingNames: [''], size: '', cost: 0, quantity:1}],
    note: "null" };

  img : string = '../assets/alfredo.png';
  totalCost: number;
  quantity: any = [];
  costPerPizza = [];
  pizzaData: any;
  order : any;
  note : string = 'none';

  constructor(private dataservice:DataService, private checkoutservice: CheckoutService) { }

  ngOnInit(): void {
    this.dataservice.sharedPizzaObj.subscribe(pizzaData => this.pizzaData = pizzaData);
    this.dataservice.sharedOrderForm.subscribe(cartItems => this.cartItems = cartItems);
    this.dataservice.sharedOrder2Form.subscribe(cartWithToppings => this.cartWithToppings = cartWithToppings);

    if (this.cartItems.pizzaForms[0].type == null){
      this.cartItems.pizzaForms.shift();
    }
    if (this.cartWithToppings.pizzaForms[0].type == null){
      this.cartWithToppings.pizzaForms.shift();
    }

    console.log('In the Cart:');
    console.log(this.cartItems);
    console.log(this.cartItems.pizzaForms)
    this.populateQuantity();
    this.totalCost = this.calcCost();
    console.log(this.totalCost);
    console.log(this.quantity);
    console.log(this.cartItems.pizzaForms.length);


    console.log('cart with toppings')
    console.log(this.cartWithToppings)


  }


  populateQuantity() {

    for (let i = 0; i < this.cartItems.pizzaForms.length; i++){
      this.quantity.push(this.cartItems.pizzaForms[i].quantity);
      this.costPerPizza.push(this.cartItems.pizzaForms[i].cost)
    }

  }


  calcCost() {

    let total : number = 0;

    for (let pizzas of this.cartItems.pizzaForms){
      total += pizzas.cost * pizzas.quantity;
    }
    return total;

  }


  removeFromCart(index) {
    console.log(index);
    this.totalCost = this.totalCost - this.cartItems.pizzaForms[index].cost * this.quantity[index];
    this.cartItems.pizzaForms.splice(index, 1);
    this.cartWithToppings.pizzaForms.splice(index, 1);
  }

  updateQuantity(){

    let tempCost : number = 0;
    for (let i = 0; i < this.cartItems.pizzaForms.length; i++) {
      this.cartItems.pizzaForms[i].quantity = this.quantity[i];
      tempCost += this.costPerPizza[i] * this.quantity[i];
    }
    this.totalCost = tempCost;
    console.log(this.cartItems)
  }

  async checkout(): Promise<any>{
    this.cartItems.note = this.note;

    this.order = await this.checkoutservice.checkout(this.cartItems);
    console.log(this.cartItems);
  }


}
