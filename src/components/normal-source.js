export default class Highlighter extends Component {

 constructor(props) {
    super(props);
    this.state = {
        type : "",
    };
  }

  render(){
    if(this.state.type === ""){
        this.state.type = this.state.source;
      }

      switch(type){
        case "classic":
          this.state.type = this.state.source;
          changeValue = [this.state.source,'classic'];
          break;
        case "modan":
          this.state.type = modan;
          changeValue = [modan,'modan'];
          break;
      }




      return (
        <div>
          <pre>
          <select onChange={(e) => handleChange(e)} value={changeValue}>
            <option value={[this.state.source,"classic"]} >クラシック</option>
            <option value={[modan,"modan"]} >モダン</option>
          </select>
          <code className='html hljs xml'>{this.state.type}</code>
          {<code className='html' ref={(code) => { this.code = code; }} style={{opacity: 0,height: 0,width: 0}}></code>}
         </pre>
        </div>
      );
  }

    
  


















}