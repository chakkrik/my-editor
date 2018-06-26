//todo
//4. change header save to model
//1. view mode
//2. bars imp
//3. ui finish

import "../../3rdparties/js/kendo.all.min.js";
import { Component, OnInit } from '@angular/core';
declare var $:any;
declare var kendo : any;
@Component({
  selector: 'app-co-editor',
  templateUrl: './co-editor.component.html',
  styleUrls: ['./co-editor.component.css']
})
export class CoEditorComponent implements OnInit {
  modelContentItems : any[] = [];
  isEditMode : boolean = true;
  contentHolderTypeList : any[] = [];
  barDataSource : any[] = [];
  constructor() { }



renderControlsByModel(){
  for(let i=0;i<this.modelContentItems.length;i++){
    this.createControlsByModel(i,this.modelContentItems[i]);
  }
}

onClickCreateContent(e){
  this.modelContentItems.push({contentType:'plain',htmlContent:''});
  this.contentHolderTypeList.push('plain'); //placeholder
  this.createControlsByModel(this.modelContentItems.length-1,this.modelContentItems[this.modelContentItems.length-1]);

}
onClickCreateTab(e){
  this.modelContentItems.push({contentType:'tab', tabs:[{header:'หัวข้อ',htmlContent:''}]});
  this.contentHolderTypeList.push('tab'); //placeholder
  this.createControlsByModel(this.modelContentItems.length-1,this.modelContentItems[this.modelContentItems.length-1]);

}
onClickCreateBar(e){
  this.modelContentItems.push({contentType:'bar', bars:[{header:'หัวข้อ',htmlContent:''}]});
  this.contentHolderTypeList.push('bar'); //placeholder
  this.createControlsByModel(this.modelContentItems.length-1,this.modelContentItems[this.modelContentItems.length-1]);
}


  ngOnInit() {
  }
  populateEditor(contents : any){
    // this.modelContentItems.push({contentType:'plain',htmlContent:'<span>jade</span>'});
    // this.modelContentItems.push({contentType:'tab', tabs:[{header:'Tab Header',htmlContent:'<span class="k-icon k-i-gear colored-icon">Header</span>'},{header:'head2',htmlContent:'<span>hi2</span>'}]});
    // this.modelContentItems.push({contentType:'bar', bars:[{header:'Bar Header', htmlContent:'<span>hi1</span>'},{header:'head2', htmlContent:'<span>hi2</span>'}]});
     setTimeout(()=>{
       this.modelContentItems = [];
       this.contentHolderTypeList = [];
       if (contents){
         for(let i=0;i<contents.length;i++){
           this.modelContentItems.push(contents[i]);
           this.contentHolderTypeList.push(contents[i].contentType);
         }
         this.renderControlsByModel();
       }
     });
   }
   getEditorContents() : any{
     let arrResult = [];
     for(let i=0;i<this.modelContentItems.length;i++){
       arrResult.push(this.modelContentItems[i]);
     }
     return arrResult;
   }
   addBarClassName(className){
    let i =  className.split('_')[1];
    let b = this.modelContentItems[i].tabs.length;
   //1. add datamodel
   this.modelContentItems[i].bars.push({header:'หัวข้อ',htmlContent:''});

   //2. add bar
    var kPanelBar = $(".bars_" + i).data('kendoPanelBar');
    kPanelBar.append(
          {text:"<span><input class='text_" + i + "_" + b + "' type=text value='"+ this.modelContentItems[i].bars[b].header + "' </input></span><span class='k-icon k-i-close close_" + i + "_" + b + "''></span>"  , encoded:false, content:"<div><textarea class='textarea_" + i + "_" + b + "'></textarea></div>"});
   
   
          //register click event , input
   
            //3. create editor
        this.setEditorValue(".text_" + i + "_" + b,"");
   }


   addTabClassName(className, refItem){
    let i =  className.split('_')[1];
    let t = this.modelContentItems[i].tabs.length;
  
    //1. add datamodel
   this.modelContentItems[i].tabs.push({header:'หัวข้อ',htmlContent:''});

   //2. add bar !!!!! every change on header should go back to model !!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111
   var tabstrip = $(".tabs_"+ i).data('kendoTabStrip');
    tabstrip.insertBefore({
      text:"<span><input class='text_" + i + "_" + t + "' type=text value='หัวข้อ'></input></span><span class='k-icon k-i-close close_" + i + "_" + t + "'></span>",
      encoded: false,
      content: "<div><textarea class='textarea_" + i + "_" + t + "'></textarea></div>"
    }, refItem);
  
    //3. register onclick event
    $(".co-editor .k-tabstrip .k-item").off('click');  
    this.rebindTabClick(tabstrip);

    $("INPUT.text_"+ i + "_" + t).on('input', (e) => {
      let arrToken = e.target.className.split('_');
      this.modelContentItems[arrToken[1]].tabs[arrToken[2]].header = e.target.value;  
    });

    //4. render editor/ and set init value
    this.setEditorValue(".textarea_" + i + "_" + t,"");
  }
  rebindBarClick(){
    $(".co-editor .k-panelbar .k-item").off('click');
    setTimeout(()=>{
      $(".co-editor .k-panelbar .k-item").on('click', (e) => {
        debugger;
        if (e.target.tagName === 'INPUT'){
          //click on INPUT
          e.preventDefault();
          e.stopPropagation();
        }
        if (e.target.className.indexOf('k-i-close') > -1){
          e.preventDefault();
          e.stopPropagation();
          var item = $(e.target).closest(".k-item");
          this.removeBarByBarIndex(e.target.className,item.index());
          //tabstrip.select(0);
          
          //var item = $(e.target).closest(".k-item");
          //setTimeout(()=>{
            //this.removeTabByTabIndex(e.target.className,item.index());
            //tabstrip.select(0);
          //});
          
        }

      });
    });

  }
  rebindTabClick(tabstrip){
    setTimeout(()=>{
      $(".co-editor .k-tabstrip .k-item").on('click', (e) => {
        if (e.target.tagName === 'INPUT'){
          //click on INPUT
          e.preventDefault();
          e.stopPropagation();
        }
        if (e.target.className.indexOf('k-i-close') > -1){
          e.preventDefault();
          e.stopPropagation();
          var item = $(e.target).closest(".k-item");
          this.removeTabByTabIndex(e.target.className,item.index());
          tabstrip.select(0); 
        }
        if (e.target.className.indexOf("new-tab_") > -1 || (e.target.childNodes.length > 0 && e.target.childNodes[0].className && e.target.childNodes[0].className.indexOf("new-tab_") > -1)){
          e.preventDefault();
          e.stopPropagation();
          var item = $(e.target).closest(".k-item");
          var elem;
          if (e.target.className.indexOf("new-tab_") > -1){
            elem = e.target;
          }else{
            elem = e.target.childNodes[0];
          }
          this.addTabClassName(elem.className, item);
          tabstrip.select(item.index()-1);
        }
      });
    });
  }
  removeBarByBarIndex(className , barIndex){

    //!!!!!!!!!!!!!!!!!!11 totodo
    let arr = className.split('_');
    let idx = arr[1];
    
      //1. destroy editor
      var editor = $(".textarea_" + idx + "_" + barIndex).data("kendoEditor");
      if (editor){
        editor.destroy();
      }
      
      //2. unregister bar event onclick    and textbox event !!!!!!!!
      $(".co-editor .k-panelbar .k-item").off('click');  

    //3. remove bar
    var getPanelBarItemByIndex = function (panelBar, target) {
      var itemIndexes = [target],
          rootItem = panelBar.element.children("li").eq(itemIndexes[0]);

      return itemIndexes.length > 1 ?
          rootItem.find(".k-group > .k-item").eq(itemIndexes[1]) :
          rootItem;
    };
    var kPanelBar = $(".bars_"+ idx).data('kendoPanelBar');
    var selected = getPanelBarItemByIndex(kPanelBar, barIndex);
    kPanelBar.remove(selected);
      
      //4. pop data model
     this.modelContentItems[idx].bars.splice(barIndex,1);

     //5. register
     this.rebindBarClick();

  }

  removeTabByTabIndex(className , tabIndex){
    let idx =  className.split('_')[1];
    
      //1. destroy editor
      var editor = $(".textarea_" + idx + "_" + tabIndex).data("kendoEditor");
      if (editor){
        editor.destroy();
      }

      var tabstrip = $(".tabs_"+ idx).data('kendoTabStrip');
      
      //2. unregister bar event onclick       //3. remove bar
        $(".co-editor .k-tabstrip .k-item").off('click');  
        tabstrip.remove(tabIndex);
        this.rebindTabClick(tabstrip);


      
      
      //4. pop data model
     this.modelContentItems[idx].tabs.splice(tabIndex,1);

  }
  setEditorValue(cssClass, htmlContent){
    if (this.isEditMode){
    var that = this;
    $(cssClass).kendoEditor({ resizable: {
      content: true,
      toolbar: true,
      encoded: false
        },
        change: function(e) {
          let arrToken = cssClass.split('_');
          if (arrToken.length === 3){
            if (that.modelContentItems[arrToken[1]].contentType == 'tab'){
              that.modelContentItems[arrToken[1]].tabs[arrToken[2]].htmlContent = this.value();
            }
            if (that.modelContentItems[arrToken[1]].contentType == 'bar'){
              that.modelContentItems[arrToken[1]].bars[arrToken[2]].htmlContent = this.value();
            }
          }
          if (arrToken.length === 2){
            that.modelContentItems[arrToken[1]].htmlContent = this.value();
          }
        }
      });          
      var editor = $(cssClass).data("kendoEditor");
      editor.value(htmlContent);
    }else{
      $(cssClass).parent().html(htmlContent);
    }
  }
  createControlsByModel(i, contentItem){
    if (contentItem.contentType == 'plain'){
      setTimeout(() => {
          this.setEditorValue(".textarea_" + i, contentItem.htmlContent);  
        });
    }
    if (contentItem.contentType == 'tab'){
      setTimeout(() => {
        //create /add /remove can be done through 1. dataSource (which not support html as header), [$("#tabstrip").data("kendoTabStrip").setDataSource(dataSource);] 
        //but init by HTML is support, API to add/remove is support
        $(".tabs_"+ i).kendoTabStrip({ 
          animation:  {
              open: {
                  effects: "fadeIn"
              }
          }//,
          //activate: this.onTabActivate.bind(this)
      });

            var tabstrip = $(".tabs_"+ i).data("kendoTabStrip");
            for(var t=0;t<contentItem.tabs.length;t++){
              tabstrip.append({
                text:"<span><input class='text_" + i + "_" + t + "' type=text value='" + contentItem.tabs[t].header + "'></input></span><span class='k-icon k-i-close close_" + i + "_" + t + "'></span>",
                encoded: false,
                content: "<div><textarea class='textarea_" + i + "_" + t + "'></textarea></div>"
              });
              
              $("INPUT.text_"+ i + "_" + t).on('input', (e) => {
                let arrToken = e.target.className.split('_');
                this.modelContentItems[arrToken[1]].tabs[arrToken[2]].header = e.target.value;
              });

              this.setEditorValue(".textarea_" + i + "_" + t,contentItem.tabs[t].htmlContent);
            }
            tabstrip.append({
              text:"<span class='new-tab_" + i + "'>+ new tab</span>",
              encoded: false,
              content: "<div></div>"
            });


            tabstrip.remove("li:first"); //dont need this remove , if we init by code (not html mark-up)
            tabstrip.select(0);

            this.rebindTabClick(tabstrip);

            
     
        }); 
    }
    if (contentItem.contentType == 'bar'){
    setTimeout(() => {
        this.barDataSource = [];
        for(let b=0;b<contentItem.bars.length;b++){
          this.barDataSource.push({text:"<span><input class='text_" + i + "_" + b + "' type=text value='"+ contentItem.bars[b].header + "' </input></span><span class='k-icon k-i-close close_" + i + "_" + b + "''></span>"  , encoded:false, content:"<div><textarea class='textarea_" + i + "_" + b + "'></textarea></div>"});
        }

        $(".bars_"+ i).kendoPanelBar({ //init by JSON or HTML (we choose JSON), add/remove by API
          expandMode: "multiple",
          dataSource: this.barDataSource
        });

        for(var b=0;b<this.barDataSource.length;b++){
          $("INPUT.text_"+ i + "_" + b).on('input', (e) => {
            let arrToken = e.target.className.split('_');
            this.modelContentItems[arrToken[1]].bars[arrToken[2]].header = e.target.value;
          });

          this.setEditorValue(".textarea_" + i + "_" + b,contentItem.bars[b].htmlContent);
        }

        this.rebindBarClick();

    });
    }
  }
}
