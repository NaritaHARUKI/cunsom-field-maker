import React, { Component , useState } from 'react';

export default class Page extends Component {


handleChange(e){
    var value =  e.target.value.split(",");
    this.setState({type : value[0]});
    this.props.data.changeUnit(value[1]);
}




    render() {

        var type="";

        if(type === ""){
            type = "classic";
          }

          switch(type){
            case "classic":
              this.state.type = source;
              break;
            case "modan":
              this.state.type = modanPreview;
              break;
          }
  
          return (
  
            <div>
              <pre>
            <select onChange={(e) => handleChange(e)}>
                <option value={['classic','classic']}>クラシック</option>
                <option value={['modan','modan']} >モダン</option>
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