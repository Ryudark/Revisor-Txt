import './App.css';
import { useState } from 'react';

function App() {

  const fileReader = new FileReader()
  const [info, setInfo] = useState()

  const [Line1, setLine1] = useState([])
  const [Line2, setLine2] = useState()
  const [Line3, setLine3] = useState()
  let line1 = []
  let line2 = []
  let line3 = []

  const [totalCost, setTotalCost] = useState()

  // const [constant, setConstant] = useState(0)

  const readFile = async (e) =>{
    // console.log(e)
    const file = e.target.files[0]

    // if(!file) return;
    // let constant = 0
    let constant = 0 
    fileReader.readAsText(file)
    
    fileReader.onload = () => {
      setInfo(fileReader.result)
      let result = fileReader.result
      let lines = result.split("\r\n")

      for(var line of lines){
        if(constant===0){
          // setLine1(line)
          line1=line.split(' ')
          setLine1(line.split(' '))
        }
        if(constant===1){
          // setLine2(line)
          line2=line.split(' ')
        }
        if(constant===2){
          // setLine3(line)
          line3=line.split(' ')
        }
        // setConstant(constant+1)
        constant++
        // console.log('[line]', line)
        // console.log(constant)
        console.log(line1)
        console.log(line2)
        console.log(line3)

        const productsDontEat = line1.reduce(
          (anterior, actual) => Number(anterior) + Number(actual), 
          0
        );
        const Cost = line2.reduce(
          (anterior, actual) => Number(anterior) + Number(actual), 
          0
        );
        setTotalCost(Cost)

        // setLine1(line1)
        setLine2(line2)
        setLine3(line3)
        console.log(Line1)
        console.log(productsDontEat)
      }
    }
    
    console.log(Line3)
    
    fileReader.onerror = () => {
      console.log(fileReader.error)
    }
  }
  console.log(Line2)
  console.log(totalCost)

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h2>{info}</h2>
          <input 
            type="file"
            multiple={false}
            onChange={readFile}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
