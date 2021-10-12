import '../App.css';


function Output({data, member}){    
    const meMember = member.id;    

    var messagesMap = (message, index) => {
        const {data, member} = message;     
        const className = meMember === member.id ? "myText" : "othersText";
        const style = {
            backgroundColor: member.clientData.color, 
            display: "inline", 
            borderRadius: "5px"
        }
        return(
          <div key={index} className={className}>                    
              <p>{member.clientData.name}</p>                     
              <p style={style}>{data}</p>                                       
          </div>
          )                
        }        
        
    return(
        <div className="ChatSection">
            {data.map((m, index) => messagesMap(m, index))}        
        </div>        
        );          
}

export default Output;