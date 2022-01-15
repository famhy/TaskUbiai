import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { range } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'task-ubiai';

  lableList = [
    {
      lable: 'Skill',
      isSelected: true,
      color: "#eab676"
    },
    {
      lable: 'Organization',
      isSelected: false,
      color:"#52c0db"
    },
    {
      lable: 'Email',
      isSelected: false,
      color:"#154c79"
    },
    {
      lable: 'Person',
      isSelected: false,
      color:"#0aa85b"
    },
    {
      lable: 'Address',
      isSelected: false,
      color:"#ff5733"
    },
    {
      lable: 'Diploma',
      isSelected: false,
      color:"#0d47a1"
    },
    {
      lable: 'Diploma_MAJOR',
      isSelected: false,
      color:"#900c3e"
    },
    {
      lable: 'Experience',
      isSelected: false,
      color:"#c70039"
    },
  ];

  annotation = [
    {
      start : "",
      end : "",
      lable:"",
      text:"",
    }
  ];
  description =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel ';

    descriptionTable=this.description.split(' ')
  innerDescription =this.description;  
  onClick(i: any) {
    this.lableList.forEach((element) => {
      element.isSelected = false;
    });
    this.lableList[i].isSelected = true;
  }

  whosSelected(){
    let i=0;
    while(i<this.lableList.length&&!this.lableList[i].isSelected){
          i++;
    }
    return i
  }

  hundel(e: any) {
    let startOffset = window.getSelection()?.getRangeAt(0).startOffset;
    let endOffset = window.getSelection()?.getRangeAt(0).endOffset;
    let selct = window.getSelection()?.toString();
    console.log(selct);
    console.log(window.getSelection()?.focusNode);                                     
    console.log(window.getSelection()?.getRangeAt(0).startOffset);
    console.log(window.getSelection()?.getRangeAt(0).endOffset);
    const newparent=document.createElement('span')
    newparent.style.cssText='background-color:'+this.lableList[this.whosSelected()].color+'; padding:5px 7px 5px 7px; margin-left:5px ; border-radius:5px;'
    const lableSpan=document.createElement("span")
    lableSpan.style.cssText="background-color: white; padding:2px ; margin-left:5px"
    // newparent.insertBefore()
    var range= window.getSelection()?.getRangeAt(0).cloneRange();
    console.log(window.getSelection()?.getRangeAt(0).cloneRange())
    if(range)
    range.surroundContents(newparent);
    console.log(lableSpan.appendChild(document.createTextNode(this.lableList[this.whosSelected()].lable)))
    newparent.insertAdjacentHTML("beforeend","<span  style=\'background-color: white; padding:2px ; margin-left:5px \'>" + this.lableList[this.whosSelected()].lable+"</span>")
    // parent.appendChild(lableSpan.appendChild(document.createTextNode(this.lableList[this.whosSelected()].lable)))
      // this.description.slice(0, startOffset) +
      // '<span class="selected" style=\'background-color: red; padding:5px 7px 5px 7px; margin-left:5px ; border-reduis:3px;\'>' +
      // this.description.slice(startOffset, endOffset).trim() + "<span  style=\'background-color: white; padding:2px ; margin-left:5px \'>" + this.lableList[this.whosSelected()].lable+"</span>"+
      // '</span>' +
      // this.description.slice(endOffset, this.description.length);
    let start = this.description.indexOf(selct||"")
    let end=0
    if(selct?.length!=undefined){
       end = start + selct?.length; 
    }
  

    this.annotation.push({
      start : start.toString(),
      end : end.toString(),
      lable: this.lableList[this.whosSelected()].lable,
      text : selct?.toString()||"",
    })
    console.log(selct,start,end)
    console.log(this.annotation)

  }

  constructor(private s: DomSanitizer) {}

  ngOnInit(): void {}
}
