import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component {
render(){
return <h1>Header</h1>	
}
}

class Hello extends React.Component {
	constructor(props){
		super(props);
    this.state = {String: "ll",Increment:0};
	this.down = this.down.bind(this);
	}
	down(){
		 let letter=this.state.String==="l"?"ll":"l";
		 
		 this.setState({String: letter,Increment:this.state.Increment+1});
		 
		
};
		
	
render(){
return <div className="Hello">
<h2><Clock/></h2>
<h1>{this.props.String}</h1>
<h1>{this.state.Increment}</h1>
<button onClick={this.down}>{this.state.String}{this.state.Increment}</button></div>
}
}
Hello.defaultProps = {String: "Tom"};


class Clock extends React.Component {
            constructor(props) {
              super(props);
              this.state = {date: new Date(), name: "Tom",Increment:0};
            }
    
            componentDidMount() {
              this.timerId = setInterval(
                ()=> this.tick(),
                1000
              );
            }
    
            componentWillUnmount() {
              clearInterval(this.timerId);
            }
    
            tick() {
              this.setState({
                date: new Date(),
				Increment:this.state.Increment+1
              });
            }
    
            render() {
              return (
                <div>
                  <h1>Привет, {this.state.name},{this.state.Increment}</h1>
                  <h2>Текущее время {this.state.date.toLocaleTimeString()}.</h2>
                </div>
              );
            }
          }













 
ReactDOM.render(
  <Hello />,
  document.getElementById('content')
);