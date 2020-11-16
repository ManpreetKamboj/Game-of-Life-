import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './Grid.js';

import { ButtonToolbar, Dropdown, DropdownButton } from 'react-bootstrap';


class Buttons extends React.Component {

    constructor()
    {
        super()
        this.handleSelect=this.handleSelect.bind(this);
    }
    
	handleSelect = (evt) => {
		this.props.gridSize(evt);
    }
   

	render() {
		return (
			<div className="center">
				<ButtonToolbar>
					<button className="btn btn-default" onClick={this.props.playButton}>
						Play
					</button>
					<button className="btn btn-default" onClick={this.props.pauseButton}>
					  Pause
					</button>
					<button className="btn btn-default" onClick={this.props.clear}>
					  Clear
					</button>
					<button className="btn btn-default" onClick={this.props.slow}>
					  Slow
					</button>
					<button className="btn btn-default" onClick={this.props.fast}>
					  Fast
					</button>
					<button className="btn btn-default" onClick={this.props.seed}>
					  Seed
					</button>
					
				</ButtonToolbar>
			</div>
			)
	}
}


class Main extends React.Component{
   constructor()
   {
       super();
       this.speed=100;
       this.rows=30;
       this.cols=60;
       this.state={
           generation:0,
           gridFull:Array(this.rows).fill().map(() => Array(this.cols).fill(false))
           
       }

   }
   selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
        gridFull: gridCopy
    });
}
seed=()=>{
    let gridCopy = arrayClone(this.state.gridFull);
    for(let i=0;i<this.rows;i++)
    {
        for(let j=0;j<this.cols;j++)
        {
            if(Math.floor(Math.random()*4)===1)
            {
                gridCopy[i][j]=true;
            }

        }
    }
    this.setState({
        gridFull: gridCopy
    });
}
playButton=()=>{
    clearInterval(this.intervalId);
    this.intervalId=setInterval(this.play,this.speed);
}
slow = () => {
    this.speed = 1000;
    this.playButton();
}

fast = () => {
    this.speed = 100;
    this.playButton();
}

clear = () => {
    var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
    this.setState({
        gridFull: grid,
        generation: 0
    });
}


play=()=>{
    let g=this.state.gridFull;
    let g1 = arrayClone(this.state.gridFull);
    for(let i=0;i<this.rows;i++)
    {
        for(let j=0;j<this.cols;j++)
        {
             let cnt1=0;
             if(i-1>=0&&j-1>=0)
             {
                 if(g[i-1][j-1]===true)
                 {
                     cnt1++;
                 }
             }
             if(i-1>=0&&j>=0)
             {
                 if(g[i-1][j]===true)
                 {
                     cnt1++;
                 }
             }
             if(i-1>=0&&j+1<this.cols)
             {
                 if(g[i-1][j+1]===true)
                 {
                     cnt1++;
                 }
             }
             if(i>=0&&j+1<this.cols)
             {
                 if(g[i][j+1]===true)
                 {
                     cnt1++;
                 }
             }
             if(i+1<this.rows&&j+1<this.cols)
             {
                 if(g[i+1][j+1]===true)
                 {
                     cnt1++;
                 }
             }
             if(i+1<this.rows&&j>=0)
             {
                 if(g[i+1][j]===true)
                 {
                     cnt1++;
                 }
             }
             if(i+1<this.rows&&j-1>=0)
             {
                 if(g[i+1][j-1]===true)
                 {
                     cnt1++;
                 }
             }
             if(i>=0&&j-1>=0)
             {
                 if(g[i][j-1]===true)
                 {
                     cnt1++;
                 }
             }
             let val=g[i][j];
             if(val===false)
             { 
                if(cnt1 === 3)
                g1[i][j] = true;
                else
                g1[i][j] = false;

             }
             else{

                if((cnt1<2) || (cnt1>3))
						g1[i][j] = false;
					else
						g1[i][j] = true;

             }



        }
    }
    this.setState({
          gridFull:g1,
         generation:this.state.generation+1
    });

}
pauseButton=()=>{
    clearInterval(this.intervalId);
}
    
componentDidMount(){
    this.seed();
    this.playButton();

}


    


   render()
   { 
         return(
             <div>
                 <h1>GAME OF LIFE</h1>
                 <Buttons
					playButton={this.playButton}
					pauseButton={this.pauseButton}
					slow={this.slow}
					fast={this.fast}
					clear={this.clear}
					seed={this.seed}
					
				/>
                 <Grid
                    gridFull={this.state.gridFull}
                    rows={this.rows}
                    cols={this.cols}
                    selectBox={this.selectBox}
                        
                    />
                 <h2>Generation:{this.state.generation}</h2>
             </div>


         );

   }


}
function arrayClone(arr) {
	return JSON.parse(JSON.stringify(arr));
}

export default Main;