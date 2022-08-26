import './App.css';
import {useEffect, useState} from 'react'

function App() {
  const [x,setX] = useState([...Array(9)])
  const [clicked,setClicked] = useState([...Array(9)].fill(false))
  const [turnx,setTurnx] = useState(true)
  const [board,setBoardx] = useState(['012','345','678','036','147','258','048','246'])
  const [win,setWin] = useState(false)
  const playerClick=(n)=>{
    const X = x.slice()
    const Clicked = clicked.slice()
    let newboard
    if(turnx){
      X[n] = 'x'
      newboard = board.map(i=>{
        if (i.includes(String(n))){
          return i.replace(String(n),'x')
        }
        else{return i}
      })
    }
    else{
      X[n] = 'o'
      newboard = board.map(i=>{
        if (i.includes(String(n))){
          return i.replace(String(n),'o')
        }
        else{return i}
      })
    }
    Clicked[n] = true
    setX(X)
    setClicked(Clicked)
    setBoardx(newboard)
    setTurnx(!turnx)
  }
  const checker=arr=>arr.every(v=>v===true)
  useEffect(()=>{
    board.forEach(i=>{
      if(i==='xxx'||i==='ooo'){
        setWin(true)
        setClicked([...Array(9)].fill(true))
      }
    })
  },[board])

  return (
   <div>
      <div>
        <h1 style={{textAlign:"center"}}>Name : Peerayu</h1>
      </div>
      <div className="App">
        {[...Array(3).keys()].map(i=>
          {return(
            <div>
              {[...Array(3).keys()].map(j=>{
                  const r = Math.floor(Math.random()*256)
                  const g = Math.floor(Math.random()*256)
                  const b = Math.floor(Math.random()*256)
                  const randomColor = "#"+r.toString(16)+g.toString(16)+b.toString(16)
                  return(
                    <input 
                    className='button' 
                    style={{backgroundColor:randomColor}}
                    onClick={()=>playerClick(j+i*3)} 
                    value={x[j+i*3]}
                    disabled={clicked[j+i*3]}
                    readOnly/>
                  )
                })
              }
            </div>
          )}
        )}
        <div style={{textAlign:'center'}}>
          <p>Just a 2 players tic tac toe game</p>
          {win?
            <div>
              <h1>{turnx?'O win':'X win'}</h1>
            </div>:
            checker(clicked)?
              <div>
                <h1>draw</h1>
              </div>:
              <h1>{turnx?'Turn X':'Turn O'}</h1>
          }
          <button className='restart' onClick={()=>(window.location.reload())}>restart</button>
        </div>
      </div>
   </div>
  );
}

export default App;
