import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nts-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {

  batman = {
    name: 'Batman',
    age: 43,
    email: 'bruce.w@heroes.com',
    url: 'https://i.pinimg.com/originals/1c/be/c4/1cbec4f304cf609d2346d3c5f2ff8b22.jpg'
  };

  ngOnInit() {
  }

}
