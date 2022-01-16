import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { AnnotationService } from './service/annotation.service';
import { Annotation } from '../Annotation';
import { Document } from '../Document';
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
      color: '#eab676',
    },
    {
      lable: 'Organization',
      isSelected: false,
      color: '#52c0db',
    },
    {
      lable: 'Email',
      isSelected: false,
      color: '#154c79',
    },
    {
      lable: 'Person',
      isSelected: false,
      color: '#0aa85b',
    },
    {
      lable: 'Address',
      isSelected: false,
      color: '#ff5733',
    },
    {
      lable: 'Diploma',
      isSelected: false,
      color: '#0d47a1',
    },
    {
      lable: 'Diploma_MAJOR',
      isSelected: false,
      color: '#900c3e',
    },
    {
      lable: 'Experience',
      isSelected: false,
      color: '#c70039',
    },
  ];

  annotation: Annotation = {
    start: 0,
    end: 0,
    lable: '',
    text: '',
  };

  spanId = 0;
  desc: Document[] = [];

  description =
    '3+ years Swift & Objective-C and experience with IOS internals Experience building an entire app from scratch and ideally a portfolio of apps featured in the app Store Someone who knows every trick in the book on UI transition , network communication and memory / battery efficiency Strong UI / design skill experience is a plus';

  descriptionTable = this.description.split(' ');
  innerDescription = this.description;
  onClick(i: any) {
    this.lableList.forEach((element) => {
      element.isSelected = false;
    });
    this.lableList[i].isSelected = true;
  }

  whosSelected() {
    let i = 0;
    while (i < this.lableList.length && !this.lableList[i].isSelected) {
      i++;
    }
    return i;
  }

  hundel(e: any) {
    let startOffset = window.getSelection()?.getRangeAt(0).startOffset;
    let endOffset = window.getSelection()?.getRangeAt(0).endOffset;
    let selct = window.getSelection()?.toString();
    // console.log(selct);
    // console.log(window.getSelection()?.focusNode);
    // console.log(window.getSelection()?.getRangeAt(0).startOffset);
    // console.log(window.getSelection()?.getRangeAt(0).endOffset);
    if (startOffset != endOffset) {
      const newparent = document.createElement('span');
      newparent.style.cssText =
        'background-color:' +
        this.lableList[this.whosSelected()].color +
        '; padding:5px 7px 5px 7px; margin-left:5px ; border-radius:5px;';
      newparent.setAttribute('id', this.spanId.toString());
      newparent.className="annotation" 
      this.spanId++;
      const lableSpan = document.createElement('span');
      lableSpan.style.cssText =
        'background-color: white; padding:2px ; margin-left:5px';
      let deleteBtn = document.createElement('img');
      deleteBtn.src =
        'https://cdn0.iconfinder.com/data/icons/octicons/1024/x-512.png';
      deleteBtn.style.cssText = "position:absolute;width:20px;border:2px dashed green;color:white;border-radius:50%;cursor:pointer;visibility:hidden";
      // deleteBtn.appendChild(deleteBtn)
      deleteBtn.onclick = function () {
        console.log('gi');
        // this.parentElement.removeChild(this);
      };
      // newparent.insertBefore()
      var range = window.getSelection()?.getRangeAt(0).cloneRange();
      console.log(window.getSelection()?.getRangeAt(0).cloneRange());
      if (range) range.surroundContents(newparent);

      console.log(deleteBtn);
      newparent.insertAdjacentHTML(
        'beforeend',
        "<span  style='background-color: white; padding:2px ; margin-left:5px '>" +
          this.lableList[this.whosSelected()].lable +
          '</span>'
      );
      // newparent.insertAdjacentHTML("beforeend","<span onClick=\"OnDelete()\"  style=\'background-color: white; padding:2px ; margin-left:5px;cursor:pointer; \'> x </span>")
      newparent.insertAdjacentHTML('beforeend', deleteBtn.textContent || '');
      newparent.appendChild(deleteBtn);

      let start = this.description.indexOf(selct || '');
      let end = 0;
      if (selct?.length != undefined) {
        end = start + selct?.length;
      }

      // this.annotation.push({
      //   start : start.toString(),
      //   end : end.toString(),
      //   lable: this.lableList[this.whosSelected()].lable,
      //   text : selct?.toString()||"",
      // })

      this.annotation.start = start;
      this.annotation.end = end;
      this.annotation.lable = this.lableList[this.whosSelected()].lable;
      this.annotation.text = selct?.toString() || '';
      console.log(selct, start, end);
      console.log(this.annotation);
      this.annotationService
        .addAnnotation(this.annotation)
        .subscribe((annotation) => console.log(annotation));
    }
  }

  OnDelete() {
    console.log('hi');
  }
  constructor(
    private s: DomSanitizer,
    private annotationService: AnnotationService
  ) {}

  ngOnInit() {
    this.annotationService
      .getDocement()
      .subscribe((description) => (this.desc = description));
    console.log(this.desc);
  }
}
