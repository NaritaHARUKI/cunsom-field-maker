import React, { Component } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { XmlEntities } from 'html-entities';
import { html as beautifyHtml } from 'js-beautify';
import hljs from "highlight.js/lib/core";
import 'highlight.js/styles/default.css';
import 'highlight.js/styles/xcode.css';
import xml from 'highlight.js/lib/languages/xml';
import Think from './think';
hljs.registerLanguage('xml', xml);

const entities = new XmlEntities();

export default class Highlighter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      source: ''
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
    //const { children } = this.props;
    let { acmscss, customfield , jsValidator , editMode , mode , groupName , groupTitle , groupitems , direction , customunit , unitGroupTitle , unitGroupName , unitgroupitems , newUnit , value } = this.props;
    let think = <Think acmscss={acmscss} customfield={customfield} jsValidator={jsValidator} editMode={editMode} mode={mode} groupName={groupName} groupTitle={groupTitle} groupitems={groupitems} direction={direction} customunit={customunit} unitGroupTitle={unitGroupTitle} unitGroupName={unitGroupName} unitgroupitems={unitgroupitems} newUnit={newUnit} value={value.value} />

    let html = renderToStaticMarkup(think);
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
        source: this.code.innerText
      });
    }
  }

  removeReactText(html) {
    html = html.replace(/<!-- (\/?)react-text(.*?)-->/g, '');
    return html;
  }

  render() {

    let { acmscss, customfield , jsValidator , editMode , mode , groupName , groupTitle , groupitems , direction , customunit , unitGroupTitle , unitGroupName , unitgroupitems , newUnit , value } = this.props;
    let think = <Think acmscss={acmscss} customfield={customfield} jsValidator={jsValidator} editMode={editMode} mode={mode} groupName={groupName} groupTitle={groupTitle} groupitems={groupitems} direction={direction} customunit={customunit} unitGroupTitle={unitGroupTitle} unitGroupName={unitGroupName} unitgroupitems={unitgroupitems} newUnit={newUnit} value={value.value} />
    let variableValue;
    const handleChange=(e)=>{
      //indexにvalue渡す
      this.props.value.changeValue(e.target.value);
      this.setState({type : e.target.value});
    }

    selectValueSituation(value.value);
    
    return (
      <div>

        <select onChange={(e) => handleChange(e)} value={variableValue}>
          <option value="classic" >クラシック</option>
          <option value="modan" >モダン</option>
          <option value="color">カラー</option>
        </select>

        <pre className="acms-admin-customfield-maker">
          {editMode === "preview" ? this.code = think : ""}
          <code id="code" className="html" ref={(code) => { this.code = code; }} />
          {isPreview(editMode)}
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

  function isPreview(editMode){
    if(editMode === "preview"){
      document.getElementById("code").remove();
    }
  }

  }
}
