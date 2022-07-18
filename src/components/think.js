import React, { Component , useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { XmlEntities } from 'html-entities';
import { html as beautifyHtml } from 'js-beautify';
import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
import 'highlight.js/styles/default.css';
import 'highlight.js/styles/xcode.css';

import FieldSource from './normal/field-source'
import FieldConfirmSource from './normal/field-confirm-source';
import FieldGroupSource from './group/field-group-source';
import FieldGroupConfirmSource from './group/field-group-confirm-source';
import UnitSource from './unit/unit-source';
import UnitConfirmSource from './unit/unit-confirm-source';
import UnitGroupSource from './unit-group/unit-group-source';
import UnitGroupConfirmSource from './unit-group/unit-group-confirm-source';




hljs.registerLanguage("xml", xml);
const entities = new XmlEntities();


export default class Think extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: 'あ',
        };
      }

      selectByEditMode(mode,editMode,value){
        //どのプレビューにするか

        if(editMode === "source"){
          this.isSource(mode);
        }

        if(editMode === "preview"){
          this.isPreview(mode);
        }

        if(editMode === "confirm"){
          this.isConfirm(mode);
        }
      }

      isSource(mode){
        let{ customfield , acmscss , newUnit , groupitems, jsValidator , groupTitle , groupName , direction ,value ,customunit ,unitgroupitems, unitGroupTitle, unitGroupName } = this.props;
        switch(mode){
          case "normal":
            this.state.type = this.arrangeElement(<FieldSource customfield={customfield} acmscss={acmscss}  type={newUnit} value={value}/>);  
            break;
          case "group":
            this.state.type = this.arrangeElement(<FieldGroupSource groupitems={groupitems} acmscss={acmscss} jsValidator={jsValidator} groupTitle={groupTitle} groupName={groupName} direction={direction} value={value}/>);
            break;
          case "unit":
            this.state.type = this.arrangeElement(<UnitSource customunit={customunit} acmscss={acmscss} value={value}/>);
            break;
          case "unit-group":
            this.state.type = this.arrangeElement(<UnitGroupSource unitgroupitems={unitgroupitems} acmscss={acmscss} unitGroupTitle={unitGroupTitle} unitGroupName={unitGroupName} preview direction={direction} value={value}/>);
            break;
        }
      }
    
      isPreview(mode){
        let{ customfield , acmscss , newUnit , value , groupitems , groupTitle , groupName , direction , jsValidator , customunit ,unitgroupitems, unitGroupTitle, unitGroupName} = this.props;
        switch(mode){
          case "normal":
            this.state.type = <FieldSource customfield={customfield} acmscss={acmscss}  type={newUnit} preview value={value}/>;   
            break;
          case "group":
            this.state.type = <FieldGroupSource groupitems={groupitems} acmscss={acmscss} jsValidator={jsValidator} groupTitle={groupTitle} groupName={groupName} direction={direction} preview value={value}/>
            break;
          case "unit":
            this.state.type = <UnitSource customunit={customunit} acmscss={acmscss} value={value}/>
            break;
          case "unit-group":
            this.state.type = <UnitGroupSource unitgroupitems={unitgroupitems} acmscss={acmscss} unitGroupTitle={unitGroupTitle} unitGroupName={unitGroupName} preview direction={direction} value={value}/>;
            break;
        }
      }

      isConfirm(mode){
        let{ customfield ,acmscss , value , groupitems , groupTitle , groupName , direction , customunit ,unitgroupitems, unitGroupTitle, unitGroupName} = this.props;
        switch(mode){
          case "normal":
            this.state.type = this.arrangeElement(<FieldConfirmSource customfield={customfield} acmscss={acmscss} value={value}/>);
            break;
          case "group":
            this.state.type = this.arrangeElement(<FieldGroupConfirmSource groupitems={groupitems} acmscss={acmscss} groupTitle={groupTitle} groupName={groupName} direction={direction} value={value}/>);
            break;
          case "unit":
            this.state.type = this.arrangeElement(<UnitConfirmSource customunit={customunit} acmscss={acmscss} value={value}/>);
            break;
          case "unit-group":
            this.state.type = this.arrangeElement(<UnitGroupConfirmSource unitgroupitems={unitgroupitems} acmscss={acmscss} unitGroupTitle={unitGroupTitle} unitGroupName={unitGroupName} direction={direction} value={value}/>);
            break;
       }
      }

      arrangeElement(element){
        let newElement = renderToStaticMarkup(element);
        newElement = this.replace(newElement);
        newElement = entities.encode(beautifyHtml(newElement, {
          unformatted: ['code', 'pre'],
          indent_inner_html: true,
          indent_char: ' ',
          indent_size: 2,
          sep: '\n'
        }));
        newElement = this.replace(newElement);
        return newElement;
      }

      replace(element){
        element = element.replace(/&quot;/g, '"');
        element = element.replace(/data-tmp="(.*?)"/g, '$1');
        element = element.replace(/&lt;/g, '<');
        element = element.replace(/&gt;/g, '>');
        return element;
      }


  render(){

    let{ customfield , acmscss , newUnit , groupitems, jsValidator , groupTitle , groupName , direction ,value ,customunit ,unitgroupitems, unitGroupTitle, unitGroupName ,mode,editMode} = this.props;
 
      this.selectByEditMode(mode,editMode,value);

      return(
         <div>
            {((this.state.type === "") ? source: this.state.type)}
         </div>
      );

      

  }

  

















}
