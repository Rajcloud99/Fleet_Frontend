import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObjToCsvService {
  todayString: string | null;

  constructor(
    private datePipe: DatePipe
  ) { 
    this.todayString = datePipe.transform(Date.now(),'dd/MM/yyyy');
  }

  convertToCsv(ReportTitle: string, Header: any,JSONData: any) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
		var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

		var CSV = '';
		//Set Report title in first row or line

		if(ReportTitle)
			CSV += ReportTitle + '\r\n\n';

		//This condition will generate the Label/Header
		CSV += Header.join(',') + '\r\n';

		//1st loop is to extract each row
		arrData.forEach( (a:any) => {
			CSV += a.join(',') + '\r\n';
		});

		if (CSV == '') {
			return;
		}
    let today = new Date().toString();
		//Generate a file name
		var fileName = ReportTitle && (ReportTitle.replace(/ /g,"_")+"_"+ this.todayString);

		//Initialize file format you want csv or xls
		var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

		// Now the little tricky part.
		// you can use either>> window.open(uri);
		// but this will not work in some browsers
		// or you will not get the correct file extension

		//this trick will generate a temp <a /> tag
		let link = document.createElement("a");
		link.href = uri;

		//set the visibility hidden so it will not effect on your web-layout
		// link.style = "visibility:hidden";
		link.download = fileName + ".csv";

		//this part will append the anchor tag and remove it after automatic click
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
  }
}
