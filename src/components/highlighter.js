import React, { Component , useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { XmlEntities } from 'html-entities';
import { html as beautifyHtml } from 'js-beautify';
import hljs from 'highlight.js/lib/highlight';
import 'highlight.js/styles/default.css';
import 'highlight.js/styles/xcode.css';
import xml from 'highlight.js/lib/languages/xml';
import FieldSource from './field-source';
import FieldSourceModan from '../components/field-source-modan';
import FieldConfirmSourceModan from './field-confirm-source-modan';
import FieldGroupSource from './field-group-source';
import FieldGroupSourceModan from './field-group-source-modan';
import FieldGroupConfirmSourceModan from './field-group-confirm-source-modan';
import UnitSource from './unit-source';
import UnitSourceModan from './unit-source-modan';
import UnitConfirmSourceMoadan from './unit-confirm-source-modan';
import UnitGroupSource from './unit-group-source';
import UnitGroupConfirmSourceModan from './unit-group-confirm-source-modan'
import UnitGroupSourceModan from './unit-group-source-modan';
import PropTypes from 'prop-types';
import { name } from 'file-loader';
import { idText } from 'typescript';



hljs.registerLanguage('xml', xml);

const entities = new XmlEntities();


export default class Highlighter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      source: '',
      type: '',
      value: '',
      situation: ''
    };
  }
  

  componentDidUpdate() {
    this.buildSource();
  }

  componentDidMount() {
    this.buildSource();
  }

  buildSource() {
    const { source } = this.state;
    const { children } = this.props;
    let html = renderToStaticMarkup(children);
    html = html.replace(/&quot;/g, '"');
    html = html.replace(/data-tmp="(.*?)"/g, '$1');
    html = html.replace(/&lt;/g, '<');
    html = html.replace(/&gt;/g, '>');
    this.code.innerHTML = entities.encode(beautifyHtml(html, {
      unformatted: ['code', 'pre'],
      indent_inner_html: true,
      indent_char: ' ',
      indent_size: 2,
      sep: '\n'
    }));
    hljs.highlightBlock(this.code);
    if (source !== this.code.innerText && this.props.onSourceGenerated) {
      this.props.onSourceGenerated(this.code.innerText);
      this.setState({
        source: this.code.innerText,
        type: ""
      });
    }
  }

  removeReactText(html) {
    html = html.replace(/<!-- (\/?)react-text(.*?)-->/g, '');
    return html;
  }

  handleChange(e){
    this.setState({type : e.target.value});
    return this.props.dataSituation();
  }

  normalPreview(classic,modan,customfield,acmscss,jsValidator){
    if(classic === "classic"){this.state.type = <FieldSource customfield={customfield} acmscss={acmscss} preview/>}
    if(modan === "modan"){this.state.type = <FieldSourceModan customfield={customfield} acmscss={acmscss}  jsValidator={jsValidator}/>}
  }


  render() {

      let { acmscss, customfield , jsValidator , editMode , mode , groupName , groupTitle , groupitems , direction , customunit , unitGroupTitle , unitGroupName , unitgroupitems , newUnit , value , copy} = this.props;

      let source = <FieldSource customfield={customfield} acmscss={acmscss} preview/>

      let modanElement = <FieldSourceModan customfield={customfield} acmscss={acmscss}  jsValidator={jsValidator}/>;
      let modanPreview = <FieldSourceModan customfield={customfield} acmscss={acmscss} preview/>;
      let modanElementConfirm = <FieldConfirmSourceModan customfield={customfield} acmscss={acmscss} jsValidator={jsValidator} preview/>
      let modan = arrangeElement(modanElement);
      let modanConfirm = arrangeElement(modanElementConfirm);

      let groupSource = <FieldGroupSource groupitems={groupitems} acmscss={acmscss} jsValidator={jsValidator} groupTitle={groupTitle} groupName={groupName} direction={direction} />;
      let groupModanElement = <FieldGroupSourceModan groupitems={groupitems} acmscss={acmscss} jsValidator={jsValidator} groupTitle={groupTitle} groupName={groupName} direction={direction}/>
      let groupModanElementConfirm = <FieldGroupConfirmSourceModan groupitems={groupitems} acmscss={acmscss} groupTitle={groupTitle} groupName={groupName} direction={direction}/>
      let group = arrangeElement(groupModanElement);
      let groupModanConfirm = arrangeElement(groupModanElementConfirm);
      
      let unitSource = <UnitSource customunit={customunit} acmscss={acmscss} />;
      let unitModanElement = <UnitSourceModan customunit={customunit} acmscss={acmscss} />;
      let unitModanElementConfirm = <UnitConfirmSourceMoadan customunit={customunit} acmscss={acmscss} />;
      let unit = arrangeElement(unitModanElement);
      let unitModanConfirm = arrangeElement(unitModanElementConfirm);

      let unitGroupSource = <UnitGroupSource unitgroupitems={unitgroupitems} acmscss={acmscss} unitGroupTitle={unitGroupTitle} unitGroupName={unitGroupName} preview direction={direction}/>
      let unitGroupModanElement = <UnitGroupSourceModan unitgroupitems={unitgroupitems} acmscss={acmscss} unitGroupTitle={unitGroupTitle} unitGroupName={unitGroupName} preview direction={direction}/>
      let unitGroupModanElementConfirm = <UnitGroupConfirmSourceModan unitgroupitems={unitgroupitems} acmscss={acmscss} unitGroupTitle={unitGroupTitle} unitGroupName={unitGroupName} direction={direction}/>
      let unitGroup = arrangeElement(unitGroupModanElement);
      let unitGroupModanConfirm = arrangeElement(unitGroupModanElementConfirm);

      var type = newUnit;
      var changeValue = value.value;
      var changeValuePreview = value.value;
      var changeValueConfirm = value.value;

      var changeValueGroup = value.value;
      var changeValuePreviewGroup = value.value;
      var changeValueConfirmGroup = value.value;
 
      var changeValueUnit = value.value;
      var changeValuePreviewUnit = value.value;
      var changeValueConfirmUnit = value.value;

      var changeValueUnitGroup = value.value;
      var changeValuePreviewUnitGroup = value.value;
      var changeValueConfirmUnitGroup = value.value;

      var stateSource;
      var variableValue;
      var classicValue;
      var modanValue;


      const handleChange=(e)=>{
          this.props.value.changeValue(e.target.value);
          var targetValue =  e.target.value.split(",");
          this.setState({type : targetValue[0]});
          this.props.copy.changeSource(targetValue[0]);
          this.props.data.changeUnit(targetValue[1]);
          this.normalPreview(classic,modan,customfield,acmscss,jsValidator);
      }


      if(mode === "normal"){
        
        if(this.state.type === ""){
          this.state.type = this.state.source;
        }

        stateSource = this.state.source;
        normalVarsion(editMode);

        
        
        return (
          <div>
            <pre>
            <select onChange={(e) => handleChange(e)} value={variableValue}>
              <option value={classicValue} >クラシック</option>
              <option value={modanValue} >モダン</option>
            </select>
            <code className='html hljs xml'>{this.state.type}</code>
            {<code className='html' ref={(code) => { this.code = code; }} style={{opacity: 0,height: 0,width: 0}}></code>}
           </pre>
          </div>
        );

      }

      if(mode === "group"){

        if(editMode === "source"){

          if(this.state.type === ""){
            this.state.type = this.state.source;
          }

          switch(type){
            case "classic":
              this.state.type = this.state.source;
              changeValueGroup = [this.state.source,'classic'];
              break;
            case "modan":
              this.state.type = group;
              changeValueGroup = [group,'modan'];
              break;
          }

          return (

            <div>
              <pre>
              <select onChange={(e) => handleChange(e)} value={changeValueGroup}>
                <option value={[this.state.source,"classic"]}>クラシック</option>
                <option value={[group,"modan"]}>モダン</option>
              </select>
              <code className='html hljs xml'>{this.state.type}</code>
              {<code className='html' ref={(code) => { this.code = code; }} style={{opacity: 0,height: 0,width: 0}}></code>}
             </pre>
            </div>

          );
        }else if(editMode === "confirm"){

          if(this.state.type === ""){
            this.state.type = this.state.source;
          }

          switch(type){
            case "classic":
              this.state.type = this.state.source;
              changeValueConfirmGroup = [this.state.source,'classic'];
              break;
            case "modan":
              this.state.type = groupModanConfirm;
              changeValueConfirmGroup = [groupModanConfirm,'modan'];
              break;
          }

          return (
            <div>
              <pre>
              <select onChange={(e) => handleChange(e)} value={changeValueConfirmGroup}>
                <option value={[this.state.source,"classic"]} >クラシック</option>
                <option value={[groupModanConfirm,"modan"]} >モダン</option>
              </select>
              <code className='html hljs xml'>{this.state.type}</code>
              {<code className='html' ref={(code) => { this.code = code; }} style={{opacity: 0,height: 0,width: 0}}></code>}
             </pre>
            </div>
          );


        }else if(editMode === "preview"){
  
          switch(type){
            case "classic":
              this.state.type = groupSource;
              changeValuePreviewGroup = ['classic','classic'];
              break;
            case "modan":
              this.state.type = groupModanElement;
              changeValuePreviewGroup = ['modan','modan'];
              break;
          }

  
          return (
  
            <div>
              <pre>
            <select onChange={(e) => handleChange(e)} value={changeValuePreviewGroup}>
                <option value={['classic',"classic"]}>クラシック</option>
                <option value={['modan','modan']}>モダン</option>
            </select>
           <div className="customFieldPreview">
              {this.state.type}
              {<code className='html' ref={(code) => { this.code = code; }} style={{opacity: 0,height: 0,width: 0}}></code>}
           </div>
             </pre>
  
           </div>
            
          ); 

        }
      }

      if(mode === "unit"){

        if(editMode === "source"){

          if(this.state.type === ""){
            this.state.type = this.state.source;
          }

          switch(type){
            case "classic":
              this.state.type = this.state.source;
              changeValueUnit = [this.state.source,'classic'];
              break;
            case "modan":
              this.state.type = unit;
              changeValueUnit = [unit,'modan'];
              break;
          }

          return(
            <div>
                <pre>
                <select onChange={(e) => handleChange(e)} value={changeValueUnit}>
                  <option value={[this.state.source,"classic"]}>クラシック</option>
                  <option value={[unit,"modan"]}>モダン</option>
                </select>
                <code className='html hljs xml'>{this.state.type}</code>
                {<code className='html' ref={(code) => { this.code = code; }} style={{opacity: 0,height: 0,width: 0}}></code>}
               </pre>
            </div>
          )
        }else if(editMode === "confirm"){

          if(this.state.type === ""){
            this.state.type = this.state.source;
          }

          switch(type){
            case "classic":
              this.state.type = this.state.source;
              changeValueConfirmUnit = [this.state.source,'classic'];
              break;
            case "modan":
              this.state.type = unitModanConfirm;
              changeValueConfirmUnit = [unitModanConfirm,'modan'];
              break;
          }

          return (
            <div>
              <pre>
              <select onChange={(e) => handleChange(e)} value={changeValueConfirmUnit}>
                <option value={[this.state.source,"classic"]} >クラシック</option>
                <option value={[unitModanConfirm,"modan"]} >モダン</option>
              </select>
              <code className='html hljs xml'>{this.state.type}</code>
              {<code className='html' ref={(code) => { this.code = code; }} style={{opacity: 0,height: 0,width: 0}}></code>}
             </pre>
            </div>
          );
        } else if(editMode === "preview"){

          switch(type){
            case "classic":
              this.state.type = unitSource;
              changeValuePreviewUnit = ['classic','classic'];
              break;
            case "modan":
              this.state.type = unitModanElement;
              changeValuePreviewUnit = ['modan','modan'];
              break;
          }

          return(

            <div>
              <pre>
            <select onChange={(e) => handleChange(e)} value={changeValuePreviewUnit}>
                <option value={['classic',"classic"]}>クラシック</option>
                <option value={['modan',"modan"]}>モダン</option>
            </select>
           <div className="customFieldPreview">
              {this.state.type}
              {<code className='html' ref={(code) => { this.code = code; }} style={{opacity: 0,height: 0,width: 0}}></code>}
           </div>
             </pre>
  
           </div>
          )
        }
      }

      if(mode === "unit-group"){
        if(editMode === "source"){

          if(this.state.type === ""){
            this.state.type = this.state.source;
          }

          switch(type){
            case "classic":
              this.state.type = this.state.source;
              changeValueUnitGroup = [this.state.source,'classic'];
              break;
            case "modan":
              this.state.type = unitGroup;
              changeValueUnitGroup = [unitGroup,'modan'];
              break;
          }

          return(
            <div>
                <pre>
                <select onChange={(e) => handleChange(e)} value={changeValueUnitGroup}>
                  <option value={[this.state.source,"classic"]}>クラシック</option>
                  <option value={[unitGroup,"modan"]}>モダン</option>
                </select>
                <code className='html hljs xml'>{this.state.type}</code>
                {<code className='html' ref={(code) => { this.code = code; }} style={{opacity: 0,height: 0,width: 0}}></code>}
               </pre>
            </div>
          )
        }else if(editMode === "confirm"){

          if(this.state.type === ""){
            this.state.type = this.state.source;
          }

          switch(type){
            case "classic":
              this.state.type = this.state.source;
              changeValueConfirmUnitGroup = [this.state.source,'classic'];
              break;
            case "modan":
              this.state.type = unitGroupModanConfirm;
              changeValueConfirmUnitGroup = [unitGroupModanConfirm,'modan'];
              break;
          }

          return (
            <div>
              <pre>
              <select onChange={(e) => handleChange(e)} value={changeValueConfirmUnitGroup}>
                <option value={[this.state.source,"classic"]} >クラシック</option>
                <option value={[unitGroupModanConfirm,"modan"]} >モダン</option>
              </select>
              <code className='html hljs xml'>{this.state.type}</code>
              {<code className='html' ref={(code) => { this.code = code; }} style={{opacity: 0,height: 0,width: 0}}></code>}
             </pre>
            </div>
          );




        } else if(editMode === "preview"){


          switch(type){
            case "classic":
              this.state.type = unitGroupSource;
              changeValuePreviewUnitGroup = ['classic',"classic"];
              break;
            case "modan":
              this.state.type = unitGroupModanElement;
              changeValuePreviewUnitGroup = ['modan','modan'];
              break;
          }

          return(

            <div>
              <pre>
            <select onChange={(e) => handleChange(e)} value={changeValuePreviewUnitGroup}>
                <option value={['classic',"classic"]}>クラシック</option>
                <option value={['modan',"modan"]}>モダン</option>
            </select>
           <div className="customFieldPreview">
              {this.state.type}
              {<code className='html' ref={(code) => { this.code = code; }} style={{opacity: 0,height: 0,width: 0}}></code>}
           </div>
             </pre>
  
           </div>
          )
        }
      }
      


      function arrangeElement(element){
        let newElement = renderToStaticMarkup(element);
        newElement = replace(newElement);
        newElement = entities.encode(beautifyHtml(newElement, {
          unformatted: ['code', 'pre'],
          indent_inner_html: true,
          indent_char: ' ',
          indent_size: 2,
          sep: '\n'
        }));
        newElement = replace(newElement);
        return newElement;
      }

      function replace(element){
        element = element.replace(/&quot;/g, '"');
        element = element.replace(/data-tmp="(.*?)"/g, '$1');
        element = element.replace(/&lt;/g, '<');
        element = element.replace(/&gt;/g, '>');
        return element;
      }

      function judgeMode(mode,editMode){

        var judgeMode;

        if(editMode === ""){
          editMode = "source";
        }

        switch(mode){
          
          case "normal":
            judgeMode = ["normal",editMode];
            return judgeMode;

          case "group":
            judgeMode = ["group",editMode];
            return judgeMode;

          case "unit":
            judgeMode = ["unit",editMode];
            return judgeMode;

          case "unit-group":
            judgeMode = ["unit-group",editMode];
            return judgeMode;
        }
        
      }

      function normalVarsion(editMode) {
        switch(editMode){
          case "source":
            variableValue = changeValue;
            classicValue =  [stateSource,"classic"];
            modanValue = [modan,"modan"];
            break;
          case "confirm":
            variableValue = changeValueConfirm;
            classicValue = [stateSource,"classic"];
            modanValue = [modanConfirm,"modan"];
            break;
          case "preview":
            variableValue = changeValuePreview;
            classicValue = ["classic","classic"];
            modanValue = ["modan","modan"];
            break;
        }

      }




  }

  
}






