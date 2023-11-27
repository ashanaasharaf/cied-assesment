import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/_services/api.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  buttonValue: string = "won";
  userList:any=[];
  graphList:any=[];
  probList:any={};
  leadStatus:any=[];
  leadDatas:any=[];
  active = 1;

  ngOnInit(): void {
    this.userDetails();
    this.graphDatas();
    this.probabilityDatas();
    this.leadList();

  }

  /* getting value when changeing the tab*/
  onTabChange(event: any) {
    if (event == "active") {
      this.buttonValue = "active";
      // this.graphDatas();
      this.probabilityDatas();
      this.leadData();
      this.leadList();
    } else if (event == "won") {
      this.buttonValue = "won";
      // this.graphDatas();
      this.probabilityDatas();
      this.leadList();
    } else {
      this.buttonValue = "lost";
      // this.graphDatas();
      this.probabilityDatas();
      this.leadList();
    }
  }

  /*api for user details*/
  userDetails() {
    try {
      this.apiService.userData().subscribe((res: any) => {
        if (res.success) {
         this.userList= res.data
        }else{
          this.userList=[];
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  /*api for graph details*/
  graphDatas() {
    try {
      this.apiService.graphData(this.buttonValue).subscribe((res: any) => {
        if (res.success) {
          this.graphList=res?.data?.stage_type_count;
        }else{
          this.graphList=[];
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  /*api for probability data*/
  probabilityDatas() {
    try {
      this.apiService.probabilityData(this.buttonValue).subscribe((res: any) => {
        if (res.success) {
          this.probList=res?.data;
        }else{
          this.probList={}
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

/*api for lead status*/
leadData(){
  try{
    this.apiService.leadStatus().subscribe((res:any)=>{
      if(res.success){
        this.leadStatus=res?.data?.results
      }else{
        this.leadStatus=[];
      }
    })
  }catch(e){
    console.log(e)
  }
}

leadList(){
try{
this.apiService.leadList(this.buttonValue," ").subscribe((res:any)=>{
  if(res.success){
    this.leadDatas=res?.data?.results
    console.log(this.leadDatas,"fff")
  }
})
}catch(e){
  console.log(e)
}
}




}




