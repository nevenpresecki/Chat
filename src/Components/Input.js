import { useState } from "react";
import '../App.css';

function Input (props){

    const [Text, setText] = useState("");      

    var handleInput = event => {
        setText(event.target.value);
      }

      var handleKeypress = (e) => {
          if(e.charCode === 13){
            props.Input(Text);
            setText("");
          }}        
     

     var handleSend = (e) => {        
         props.Input(Text);
         setText("");                       
      } 


    return(
        <div className="SendSection">
            <input className="Text" 
            type="text" 
            placeholder="Enter your message and press ENTER" 
            autoFocus
            value={Text}         
            onChange={handleInput} 
            onKeyPress={handleKeypress}>                
            </input>
            <button className="Send" type="button" onClick={handleSend}>Send</button>
        </div>
        );
    
}

export default Input;