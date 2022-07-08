import React, { Component , useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { XmlEntities } from 'html-entities';
import { html as beautifyHtml } from 'js-beautify';
import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
import 'highlight.js/styles/default.css';
import 'highlight.js/styles/xcode.css';
import Think from './think';


hljs.registerLanguage("xml", xml);
const entities = new XmlEntities();
export default class Highlighter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      source: '',
      modanSouece: '',
      type: '',
      value: '',
      situation: '',
      normalPreview : '',
      highlight: '',
      selectedValue: ''
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
      });
    }
  }

  removeReactText(html) {
    html = html.replace(/<!-- (\/?)react-text(.*?)-->/g, '');
    return html;
  }





  render() {

    let { acmscss, customfield , jsValidator , editMode , mode , groupName , groupTitle , groupitems , direction , customunit , unitGroupTitle , unitGroupName , unitgroupitems , newUnit , value } = this.props;

    var variableValue;
    var unitGroupSlect = true;

    const handleChange=(e)=>{
        //indexにvalue渡す
        this.props.value.changeValue(e.target.value);
        this.setState({type : e.target.value});
    }
   
    if(mode === "unit-group"){
        unitGroupSlect = false;
    }

    selectValueSituation(value.value);
        
    let selectBox = <select onChange={(e) => handleChange(e)} value={variableValue}>
                         <option value="classic" >クラシック</option>
                         <option value="modan" >モダン</option>
                         <option value="color">カラー</option>
                    </select>
      

    return (
      <div>
        <pre>
         {unitGroupSlect ? selectBox : ""}
         <code className='html xml hljs'><Think acmscss={acmscss} customfield={customfield} jsValidator={jsValidator} editMode={editMode} mode={mode} groupName={groupName} groupTitle={groupTitle} groupitems={groupitems} direction={direction} customunit={customunit} unitGroupTitle={unitGroupTitle} unitGroupName={unitGroupName} unitgroupitems={unitgroupitems} newUnit={newUnit} value={value.value} source={this.state.source} type={this.state.type}/></code>
         {<code className='html' ref={(code) => { this.code = code }} style={{opacity: 0,height: 0,width: 0}}></code>}
        </pre>
      </div>
    );



    function selectValueSituation(value){
        //バリューを変えて選択された状態を保持する
        switch(value){
          case "classic":
           variableValue = "classic";
           break;
          case "modan":
            variableValue = "modan";
            break;
          case "color":
            variableValue = "color";
            break;
        }
    }

  }

  

  
}






