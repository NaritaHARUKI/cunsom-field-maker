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

import FieldColorSource from './field-source-color';
import FieldConfirmSourceColor from './field-confirm-source-color';
import FieldGroupSourceColor from './field-group-source-color';
import FieldGroupConfirmSourceColor from './field-group-confirm-source-color';
import UnitSourceColor from './unit-source-color';
import UnitConfirmSourceColor from './unit-confirm-source-color';
import UnitGroupSourceColor from './unit-group-source-color';
import UnitGroupConfirmSourceColor from './unit-group-confirm-source-color';



import { create } from 'react-test-renderer';




hljs.registerLanguage('xml', xml);

const entities = new XmlEntities();


export default class Highlighter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      source: '',
      modanSouece: '',
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
    const { modanSouece } = this.state;
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



  render() {

      let { acmscss, customfield , jsValidator , editMode , mode , groupName , groupTitle , groupitems , direction , customunit , unitGroupTitle , unitGroupName , unitgroupitems , newUnit , value , copy} = this.props;

      let source = <FieldSource customfield={customfield} acmscss={acmscss} preview/>

      //normal
      let modanElement = <FieldSourceModan customfield={customfield} acmscss={acmscss}  jsValidator={jsValidator}/>;
      let modanElementConfirm = <FieldConfirmSourceModan customfield={customfield} acmscss={acmscss} jsValidator={jsValidator} preview/>
      let modan = arrangeElement(modanElement);
      let modanConfirm = arrangeElement(modanElementConfirm);

      let colorElement = <FieldColorSource customfield={customfield} acmscss={acmscss}  jsValidator={jsValidator}/>
      let colorElementConfirm = <FieldConfirmSourceColor customfield={customfield} acmscss={acmscss} jsValidator={jsValidator} preview/>
      let color = arrangeElement(colorElement);
      let colorConfirm = arrangeElement(colorElementConfirm);

      //group
      let groupSource = <FieldGroupSource groupitems={groupitems} acmscss={acmscss} jsValidator={jsValidator} groupTitle={groupTitle} groupName={groupName} direction={direction} />;

      let groupModanElement = <FieldGroupSourceModan groupitems={groupitems} acmscss={acmscss} jsValidator={jsValidator} groupTitle={groupTitle} groupName={groupName} direction={direction}/>
      let groupModanElementConfirm = <FieldGroupConfirmSourceModan groupitems={groupitems} acmscss={acmscss} groupTitle={groupTitle} groupName={groupName} direction={direction}/>
      let group = arrangeElement(groupModanElement);
      let groupModanConfirm = arrangeElement(groupModanElementConfirm);

      let groupColorElement = <FieldGroupSourceColor groupitems={groupitems} acmscss={acmscss} jsValidator={jsValidator} groupTitle={groupTitle} groupName={groupName} direction={direction}/>
      let groupColorElementConfirm = <FieldGroupConfirmSourceColor groupitems={groupitems} acmscss={acmscss} groupTitle={groupTitle} groupName={groupName} direction={direction}/>
      let groupColor = arrangeElement(groupColorElement);
      let groupColorConfirm = arrangeElement(groupColorElementConfirm);
      
      //unit
      let unitSource = <UnitSource customunit={customunit} acmscss={acmscss} />;

      let unitModanElement = <UnitSourceModan customunit={customunit} acmscss={acmscss} />;
      let unitModanElementConfirm = <UnitConfirmSourceMoadan customunit={customunit} acmscss={acmscss} />;
      let unit = arrangeElement(unitModanElement);
      let unitModanConfirm = arrangeElement(unitModanElementConfirm);

      let unitColorElement = <UnitSourceColor customunit={customunit} acmscss={acmscss}/>
      let unitColorElementConfirm = <UnitConfirmSourceColor customunit={customunit} acmscss={acmscss}/>
      let unitColor = arrangeElement(unitColorElement);
      let unitColorConfirm = arrangeElement(unitColorElementConfirm);

      //unit-group
      let unitGroupSource = <UnitGroupSource unitgroupitems={unitgroupitems} acmscss={acmscss} unitGroupTitle={unitGroupTitle} unitGroupName={unitGroupName} preview direction={direction}/>

      let unitGroupModanElement = <UnitGroupSourceModan unitgroupitems={unitgroupitems} acmscss={acmscss} unitGroupTitle={unitGroupTitle} unitGroupName={unitGroupName} preview direction={direction}/>
      let unitGroupModanElementConfirm = <UnitGroupConfirmSourceModan unitgroupitems={unitgroupitems} acmscss={acmscss} unitGroupTitle={unitGroupTitle} unitGroupName={unitGroupName} direction={direction}/>
      let unitGroup = arrangeElement(unitGroupModanElement);
      let unitGroupModanConfirm = arrangeElement(unitGroupModanElementConfirm);

      let unitGroupColorElement = <UnitGroupSourceColor unitgroupitems={unitgroupitems} acmscss={acmscss} unitGroupTitle={unitGroupTitle} unitGroupName={unitGroupName} preview direction={direction}/>
      let unitGroupColorElementConfirm = <UnitGroupConfirmSourceColor unitgroupitems={unitgroupitems} acmscss={acmscss} unitGroupTitle={unitGroupTitle} unitGroupName={unitGroupName} direction={direction}/>
      let unitGroupColor = arrangeElement(unitGroupColorElement);
      let unitGroupColorConfirm = arrangeElement(unitGroupColorElementConfirm);

      

      var type = newUnit;
      var changeValue = value.value;
      var changeValuePreview = value.value;
      var changeValueConfirm = value.value;

      var stateSource;
      var variableValue;
      var classicValue;
      var modanValue;
      var colorValue;


      const handleChange=(e)=>{
          this.props.value.changeValue(e.target.value);
          var targetValue =  e.target.value.split(",");
          this.setState({type : targetValue[0]});
          this.props.copy.changeSource(targetValue[0]);
          this.props.data.changeUnit(targetValue[1]);
      }




      if(mode === "normal"){

        stateSource = this.state.source;
        normalVarsion(editMode);
        selectValueSituation(type);

        if(editMode === "preview"){
          switch(type){
            case "classic":
              this.state.type = source;
              break;
            case "modan":
              this.state.type = modanElement;
              break;
            case "color":
              this.state.type = colorElement;
              break;
          }
        }


        return (
          <div>
            <pre>
            <select onChange={(e) => handleChange(e)} value={variableValue}>
              <option value={classicValue} >クラシック</option>
              <option value={modanValue} >モダン</option>
              <option value={colorValue}>カラー</option>
            </select>
            <code className='html hljs xml'>{((this.state.type === "") ? this.state.source: this.state.type)}</code>
            {<code className='html' ref={(code) => { this.code = code; }} style={{opacity: 0,height: 0,width: 0}}></code>}
           </pre>
          </div>
        );

      }

      if(mode === "group"){       

        stateSource = this.state.source;
        groupVarsion(editMode);
        selectValueSituation(type);

        if(editMode === "preview"){
          switch(type){
            case "classic":
              this.state.type = groupSource;
              break;
            case "modan":
              this.state.type = groupModanElement;
              break;
              case "color":
                this.state.type = groupColorElement;
                break;
          }
        }

        return (
          <div>
            <pre>
            <select onChange={(e) => handleChange(e)} value={variableValue}>
              <option value={classicValue} >クラシック</option>
              <option value={modanValue} >モダン</option>
              <option value={colorValue}>カラー</option>
            </select>
            <code className='html hljs xml'>{((this.state.type === "") ? this.state.source : this.state.type)}</code>
            {<code className='html' ref={(code) => { this.code = code; }} style={{opacity: 0,height: 0,width: 0}}></code>}
           </pre>
          </div>
        );
      }

      if(mode === "unit"){

        stateSource = this.state.source;
        unitVarsion(editMode);
        selectValueSituation(type);

        if(editMode === "preview"){
          switch(type){
            case "classic":
              this.state.type = unitSource;
              break;
            case "modan":
              this.state.type = unitModanElement;
              break;
            case "color":
              this.state.type = unitColorElement;
              break;
          }
        }
        
        return (
          <div>
            <pre>
            <select onChange={(e) => handleChange(e)} value={variableValue}>
              <option value={classicValue} >クラシック</option>
              <option value={modanValue} >モダン</option>
              <option value={colorValue}>カラー</option>
            </select>
            <code className='html hljs xml'>{((this.state.type === "") ? this.state.source : this.state.type)}</code>
            {<code className='html' ref={(code) => { this.code = code; }} style={{opacity: 0,height: 0,width: 0}}></code>}
           </pre>
          </div>
        );
        
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
     

      function normalVarsion(editMode) {
        switch(editMode){
          case "source":
            variableValue = changeValue;
            classicValue =  [stateSource,"classic"];
            modanValue = [modan,"modan"];
            colorValue = [color,"color"];
            break;
          case "confirm":
            variableValue = changeValueConfirm;
            classicValue = [stateSource,"classic"];
            modanValue = [modanConfirm,"modan"];
            colorValue = [colorConfirm,"color"];
            break;
          case "preview":
            variableValue = changeValuePreview;
            classicValue = ["classic","classic"];
            modanValue = ["modan","modan"];
            colorValue = ["color","color"];
            break;
        }

      }

      function groupVarsion(editMode){
        switch(editMode){
          case "source":
            variableValue = changeValue;
            classicValue =  [stateSource,"classic"];
            modanValue = [group,"modan"];
            colorValue = [groupColor,"color"];
            break;
          case "confirm":
            variableValue = changeValueConfirm;
            classicValue = [stateSource,"classic"];
            modanValue = [groupModanConfirm,"modan"];
            colorValue = [groupColorConfirm,"color"];
            break;
          case "preview":
            variableValue = changeValuePreview;
            classicValue = ["classic","classic"];
            modanValue = ["modan","modan"];
            colorValue = ["color","color"];
            break;
        }
      }

      function unitVarsion(editMode){
        switch(editMode){
          case "source":
            variableValue = changeValue;
            classicValue =  [stateSource,"classic"];
            modanValue = [unit,"modan"];
            colorValue = [unitColor,"color"];
            break;
          case "confirm":
            variableValue = changeValueConfirm;
            classicValue = [stateSource,"classic"];
            modanValue = [unitModanConfirm,"modan"];
            colorValue = [unitColorConfirm,"color"];
            break;
          case "preview":
            variableValue = changeValuePreview;
            classicValue = ["classic","classic"];
            modanValue = ["modan","modan"];
            colorValue = ["color","color"];
            break;
        }
      }

      function selectValueSituation(type){
        switch(type){
          case "classic":
            variableValue = classicValue;
            break;
          case "modan":
            variableValue = modanValue;
            break;
          case "color":
            variableValue = colorValue;
        }
      }

      





  }

  
}






