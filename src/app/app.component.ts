


import { Component , OnInit, ViewEncapsulation, ViewChild }  from '@angular/core';
import { CoEditorComponent } from './co-editor/co-editor.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class AppComponent implements OnInit {
  title = 'app';
 // items: MenuItem[];
 @ViewChild(CoEditorComponent)
 private editorComponent: CoEditorComponent;	
  constructor() {
  }

  // genCssClass(itemNo,subitemNo){
  //   return subitemNo != null ? '.cls_'+ itemNo + '_' + subitemNo : '.cls_'+ itemNo;
  // }
  // addBar(e){
  //  let idx =  +e.currentTarget.className.split('_')[1];
  //  let barCount = this.contentItems[idx].bars.length;
  //   //1. add datamodel
  //  this.contentItems[idx].bars.push({header:'หัวข้อ',htmlContent:''});
  //  //2. add bar
  //  var kPanelBar = $(this.genCssClass(idx, null)).data('kendoPanelBar');
  //  kPanelBar.append(
  //         { text: "<span class='k-icon k-i-edit'></span><span> หัวข้อ</span>",encoded:false,
  //          content:"<div><textarea class='cls_" + idx + "_" + barCount + "'></textarea></div>" }); 
  // //3. create editor
  //      this.setEditorValue(".cls_" + idx + "_" + barCount,"");
  // }
  // removeBar(e){
  //   var idx =  +e.currentTarget.className.split('_')[1];
  //   let barCount = this.contentItems[idx].bars.length - 1;
  //   //1. destroy editor
  //   var editor = $(".cls_" + idx + "_" + barCount).data("kendoEditor");
  //   if (editor){
  //     editor.destroy();
  //   }

  //   //2. remove bar
  //   var getPanelBarItemByIndex = function (panelBar, target) {
  //         var itemIndexes = [target],
  //             rootItem = panelBar.element.children("li").eq(itemIndexes[0]);

  //         return itemIndexes.length > 1 ?
  //             rootItem.find(".k-group > .k-item").eq(itemIndexes[1]) :
  //             rootItem;
  //   };
  //   var kPanelBar = $(".cls_"+ idx).data('kendoPanelBar');
  //   var selected = getPanelBarItemByIndex(kPanelBar, this.contentItems[idx].bars.length -1);
  //   kPanelBar.remove(selected);
  
  //   //3. pop data model
  //   this.contentItems[idx].bars.pop();
  // }
  
  // addTab(e){
  //   let idx =  +e.currentTarget.className.split('_')[1];
  //   let tabCount = this.contentItems[idx].tabs.length;
  
  //   //1. addf datamodel
  //  this.contentItems[idx].tabs.push({header:'หัวข้อ',htmlContent:''});

  //  //2. add bar
  //  var tabstrip = $(".cls_"+ idx).data('kendoTabStrip');
  //   tabstrip.append({
  //     text:"<span class='k-icon k-i-edit'></span><span>หัวข้อ</span>",
  //     encoded: false,
  //     content: "<div><textarea class='cls_" + idx + "_" + tabCount + "'></textarea></div>"
  //   });
  
  //   //3. create editor
  //   this.setEditorValue(".cls_" + idx + "_" + tabCount,"");
  // }
  
  // removeTab(e){
  //   let idx =  +e.currentTarget.className.split('_')[1];
  //   let tabCount = this.contentItems[idx].tabs.length - 1;
  
  //   //1. destroy editor
  //   var editor = $(".cls_" + idx + "_" + tabCount).data("kendoEditor");
  //   if (editor){
  //     editor.destroy();
  //   }

  //   //2. remove bar
  //   var tabstrip = $(".cls_"+ idx).data('kendoTabStrip');
  //   tabstrip.remove("li:last");
  //   //tabstrip.select(0); //to check if remove current tab, will go to 0

  //   //3. pop data model
  //   this.contentItems[idx].tabs.pop();

  // }
  // onTabActivate(e){
  //   debugger;
  //   if (e.contentElement.children[0].children[0].tagName === 'TEXTAREA'){
  //     let arrToken = e.contentElement.children[0].children[0].className.split('_');
  //     this.setEditorValue(".cls_" + arrToken[1] + "_" + arrToken[2], this.contentItems[arrToken[1]].tabs[arrToken[2]].htmlContent);
  //   }
  // }
  
  saveScreen(){
    localStorage.setItem("demo_editor", JSON.stringify(this.editorComponent.getEditorContents()));
    console.log(JSON.stringify(this.editorComponent.getEditorContents()));
  }
  clearStorage(){
    localStorage.removeItem("demo_editor");
  }
  changeMode(){
    //this.isEditMode = !this.isEditMode;
    //localStorage.setItem("demo_isEditMode", this.isEditMode? 'Y': 'N');
    //location.reload();
  }

  ngOnInit() {
    this.editorComponent.populateEditor([]);
  //   var d = localStorage.getItem("demo_editor")  
  //   if (d){
  //     this.contentItems = JSON.parse(d);
  //   }
  //   var m = localStorage.getItem("demo_isEditMode");
  // if (m){
  //   if (m == 'Y'){
  //     this.isEditMode = true;
  //   }else{
  //     this.isEditMode = false;
  //   }
  }


    // setTimeout(()=>{
    //   $("#menu").kendoMenu({
    //     select: function(e) {  
    //     var itemText = $(e.item).children(".k-link").text().trim();
    //     if( itemText=== "Add content"){
    //     }
    //     if( itemText=== "Add tab content"){
    //     }
    //     if( itemText=== "Add bar content"){
    //     }
    //     if (itemText=== "Remove"){
    //       //should destroy first
    //       this.contentItems.pop();
    //     }
    //     //debugger;
    //   }.bind(this)
    //   });
    // });
    
//  }
}