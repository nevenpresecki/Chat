import './App.css';
import React from 'react';
import Input from './Components/Input';
import Output from './Components/Output';

function radnomName(){
  var name = ["Neven", "Ivo", "Jana", "Lucija", "Marija", "Matija", "Marko", "Ivana", "Denis", "Petar", "Vinko"];
  return name[Math.floor(Math.random() * name.length)];

}    
function radnomColor(){     
var color = ["#5f3e31", "#FA7676", "#83FFE7", "#C0C0C0", "#CCFFE5", "#FFE5CC", "#7DFA92", "#FFFF00", "#3399FF", "#FF66FF", "#FFB266"];
  return color[Math.floor(Math.random() * color.length)];
}        

class App extends React.Component{   
  constructor(){
    super()     
    this.state = {
      messages: [],
      member: {
        name: radnomName(),
        color: radnomColor(),
        id: ""
      }     
  }  
}

  componentDidMount(){    
      this.drone = new window.ScaleDrone('9ePKLqcsBWlIHr1B', {
        data: this.state.member
      });      

      this.drone.on('open', error => {
        if (error) {
        return console.error(error);
        }
        return console.log("Connected to room");                               
        });         
        
      const room = this.drone.subscribe('observable-room'); 
        room.on('message', message => {
        const {data, member} = message;        
        this.setState({messages: this.state.messages.concat({member, data})});        
        });        
        
        room.on('members', members => {
            var me = members.find(member => {
            return member.id === this.drone.clientId;                                            
          });      
          this.setState(prevState => ({
            member: {
              ...prevState.member,
              id: me.id
            }            
          }));                           
        });     
    }    
          
      Send = (Text) =>  {
        this.drone.publish({
        room: 'observable-room',
        message: Text
        });
        }        
       
  render(){ 
    //console.log("Member:", this.state.messages ) 
  return (
    <div className="Chat">                
      <Output data={this.state.messages} member={this.state.member}/>
      <Input Input={this.Send}/>        
    </div>
  )
}
}

export default App;