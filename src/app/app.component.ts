import "../3rdparties/js/kendo.all.min.js";
import { Component , OnInit, ViewEncapsulation }  from '@angular/core';
declare var $:any;
declare var kendo : any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class AppComponent implements OnInit {
  title = 'app';
 // items: MenuItem[];
  contentItems : any[] = [];
  isEditMode : boolean = true;
  constructor() {
   // this.contentItems.push({contentType:'plain',htmlContent:'<span>jade</span>'});
   // this.contentItems.push({contentType:'tab', tabs:[{header:'Tab Header',htmlContent:'<span class="k-icon k-i-gear colored-icon">Header</span>'},{header:'head2',htmlContent:'<span>hi2</span>'}]});
   // this.contentItems.push({contentType:'bar', bars:[{header:'Bar Header', htmlContent:'<span>hi1</span>'},{header:'head2', htmlContent:'<span>hi2</span>'}]});
  }
  genCssClass(itemNo,subitemNo){
    return subitemNo != null ? '.cls_'+ itemNo + '_' + subitemNo : '.cls_'+ itemNo;
  }
  addBar(e){
   let idx =  +e.currentTarget.className.split('_')[1];
   let barCount = this.contentItems[idx].bars.length;
    //1. add datamodel
   this.contentItems[idx].bars.push({header:'หัวข้อ',htmlContent:''});
   //2. add bar
   var kPanelBar = $(this.genCssClass(idx, null)).data('kendoPanelBar');
   kPanelBar.append(
          { text: "<span class='k-icon k-i-edit'></span><span> หัวข้อ</span>",encoded:false,
           content:"<div><textarea class='cls_" + idx + "_" + barCount + "'></textarea></div>" }); 
  //3. create editor
       this.setEditorValue(".cls_" + idx + "_" + barCount,"");
  }
  removeBar(e){
    var idx =  +e.currentTarget.className.split('_')[1];
    let barCount = this.contentItems[idx].bars.length - 1;
    //1. destroy editor
    var editor = $(".cls_" + idx + "_" + barCount).data("kendoEditor");
    if (editor){
      editor.destroy();
    }

    //2. remove bar
    var getPanelBarItemByIndex = function (panelBar, target) {
          var itemIndexes = [target],
              rootItem = panelBar.element.children("li").eq(itemIndexes[0]);

          return itemIndexes.length > 1 ?
              rootItem.find(".k-group > .k-item").eq(itemIndexes[1]) :
              rootItem;
    };
    var kPanelBar = $(".cls_"+ idx).data('kendoPanelBar');
    var selected = getPanelBarItemByIndex(kPanelBar, this.contentItems[idx].bars.length -1);
    kPanelBar.remove(selected);
  
    //3. pop data model
    this.contentItems[idx].bars.pop();
  }
  addTabClassName(className, refItem){
    let i =  className.split('_')[1];
    let t = this.contentItems[i].tabs.length;
  
    //1. add datamodel
   this.contentItems[i].tabs.push({header:'default header',htmlContent:''});

   //2. add bar !!!!! every change on header should go back to model !!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111
   var tabstrip = $(".tabs_"+ i).data('kendoTabStrip');
    tabstrip.insertBefore({
      text:"<span><input class='text_" + i + "_" + t + "' type=text value='default header'></input></span><span class='k-icon k-i-close close_" + i + "_" + t + "'></span>",
      encoded: false,
      content: "<div><textarea class='textarea_" + i + "_" + t + "'></textarea></div>"
    }, refItem);
  
    //3. register onclick event
    $(".co-editor .k-tabstrip .k-item").off('click');  
    this.rebindTabClick(tabstrip);

    //4. render editor/ and set init value
    this.setEditorValue(".textarea_" + i + "_" + t,"");
  }
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
  rebindBarClick(){
    $(".co-editor .k-panelbar .k-item").off('click');
    setTimeout(()=>{
      $(".co-editor .k-panelbar .k-item").on('click', (e) => {
        if (e.target.tagName === 'INPUT'){
          //click on INPUT
          e.preventDefault();
          e.stopPropagation();
        }
        if (e.target.className.indexOf('k-i-close') > -1){
          e.preventDefault();
          e.stopPropagation();
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
        if (e.target.className.indexOf("new-tab_") > -1 || (e.target.childNodes[0].className && e.target.childNodes[0].className.indexOf("new-tab_") > -1)){
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
     this.contentItems[idx].tabs.splice(tabIndex,1);

  }
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
            if (that.contentItems[arrToken[1]].contentType == 'tab'){
              that.contentItems[arrToken[1]].tabs[arrToken[2]].htmlContent = this.value();
            }
            if (that.contentItems[arrToken[1]].contentType == 'bar'){
              that.contentItems[arrToken[1]].bars[arrToken[2]].htmlContent = this.value();
            }
          }
          if (arrToken.length === 2){
            that.contentItems[arrToken[1]].htmlContent = this.value();
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
        let barDataSource = [];
        for(let b=0;b<contentItem.bars.length;b++){
          barDataSource.push({text:"<span><input type=text value='"+ contentItem.bars[b].header + "' </input></span><span class='k-icon k-i-close'></span>"  , encoded:false, content:"<div><textarea class='textarea_" + i + "_" + b + "'></textarea></div>"});
        }

        $(".bars_"+ i).kendoPanelBar({ //init by JSON or HTML (we choose JSON), add/remove by API
          expandMode: "multiple",
          dataSource: barDataSource
        });

        for(var b=0;b<barDataSource.length;b++){
          this.setEditorValue(".textarea_" + i + "_" + b,contentItem.bars[b].htmlContent);
        }

        this.rebindBarClick();

    });
    }
  }
  saveScreen(){
    localStorage.setItem("demo_editor", JSON.stringify(this.contentItems));
    console.log(JSON.stringify(this.contentItems));
  }
  clearStorage(){
    localStorage.removeItem("demo_editor");
  }
  changeMode(){
    this.isEditMode = !this.isEditMode;
    localStorage.setItem("demo_isEditMode", this.isEditMode? 'Y': 'N');
    location.reload();
  }
  createContent(e){
    this.contentItems.push({contentType:'plain',htmlContent:''});
    this.createControlsByModel(this.contentItems.length-1,this.contentItems[this.contentItems.length-1]);

  }
  createTab(e){
    this.contentItems.push({contentType:'tab', tabs:[{header:'หัวข้อ',htmlContent:''}]});
    this.createControlsByModel(this.contentItems.length-1,this.contentItems[this.contentItems.length-1]);

  }
  createBar(e){
    this.contentItems.push({contentType:'bar', bars:[{header:'หัวข้อ',htmlContent:''}]});
    this.createControlsByModel(this.contentItems.length-1,this.contentItems[this.contentItems.length-1]);
  }
  ngOnInit() {
    var d = localStorage.getItem("demo_editor")  
    if (d){
      this.contentItems = JSON.parse(d);
    }
    var m = localStorage.getItem("demo_isEditMode");
  if (m){
    if (m == 'Y'){
      this.isEditMode = true;
    }else{
      this.isEditMode = false;
    }
  }


    for(let i=0;i<this.contentItems.length;i++){
      this.createControlsByModel(i,this.contentItems[i]);
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
    
  }
}