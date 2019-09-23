import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Item } from "../item/item.component";
import * as moment from "moment";
import "moment/locale/pt-br";
import { ItemsService } from "../items.service";
import { Router } from "@angular/router";
declare var $: any;

@Component({
  selector: "app-add-item",
  templateUrl: "./add-item.component.html",
  styleUrls: ["./add-item.component.scss"]
})
export class AddItemComponent implements OnInit {
  createItemForm: FormGroup;
  item: Item = new Item();
  itemImage: File;

  constructor(
    private formBuilder: FormBuilder,
    private itemsService: ItemsService,
    private router: Router
  ) {
    this.createItemForm = this.formBuilder.group({
      name: "",
      description: "",
      minimumPrice: 0,
      minutes: 0,
      hours: 0,
      days: 0
    });
  }

  ngOnInit() {}

  onImageChange(event) {
    this.itemImage = event.target.files[0];
    console.log(this.itemImage);
  }

  onCreateItem(formValue: any): void {
    this.item.name = formValue.name;
    this.item.description = formValue.description;
    this.item.minimumPrice = formValue.minimumPrice;
    this.item.duration = moment
      .duration({
        seconds: 0,
        minutes: formValue.minutes,
        hours: formValue.hours,
        days: formValue.days
      })
      .toISOString();
    console.log("Item form: ");
    console.log(this.item);
    this.itemsService.createItem(this.item).subscribe(
      data => {
        console.log("Item created");
        console.log(data);
        this.itemsService.uploadItemImage(this.itemImage, data["id"]).subscribe(
          data => {
            console.log("Image uploaded");
            console.log(data);
          },
          error => {
            console.log("Image upload failed");
            console.log(error);
          }
        );
        alert("Item is successfully created!");
        this.router.navigateByUrl("/");
      },
      error => {
        alert("Item is not created!");
      }
    );
  }
}
