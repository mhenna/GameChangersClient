import { Component, OnInit } from '@angular/core';
import { AdminService} from '../../Services/admin.service';

@Component({
  selector: 'app-admin-top-ideas',
  templateUrl: './admin-top-ideas.component.html',
  styleUrls: ['./admin-top-ideas.component.css']
})
export class AdminTopIdeasComponent implements OnInit {


  alertFlag: boolean;
  alertMsg: string;
  topIdeas: any [];
  loading: boolean; 
  newData: any[]=[];
  public length:number = 0;
  public columns:Array<any> = [
    {title: 'idea Title', name: 'title'},
    {title: 'Score', name: 'score'},
    {title: 'Team', name: 'teamName'},
  
  ];
  constructor(private adminService: AdminService) { }
 
  ngOnInit() {

    this.toggleLoading();
    this.adminService.getTopIdea().subscribe(res => {
      this.topIdeas = res.data;
      this.parseResponse(res.data);
      this.toggleLoading();
    }, e=>{
      this.alertFlag=true;
      this.alertMsg= "Couldn't connect to server";

    })
  }

  toggleLoading() {
    this.loading = !this.loading;
  }
  public parseResponse(data){
    let returnedData = [];
    

    for (let key in data) {
      this.newData.push(data[key]);
      }  
     
     

    }
    
  }


 


