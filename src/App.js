import './App.css';
import { useState } from 'react';
import swal from 'sweetalert';

function App() {

  const fileReader = new FileReader()
  const [chargeAnna, setchargeAnna] = useState(0)

  let line1 = []
  let line2 = []
  let line3 = []

  // let chargeAnna = 0

  const [totalCost, setTotalCost] = useState()

  // const [constant, setConstant] = useState(0)

  const readFile = async (e) =>{
    const file = e.target.files[0]

    let constant = 0 
    fileReader.readAsText(file)
    
    fileReader.onload = () => {
      let result = fileReader.result
      let lines = result.split("\r\n")

      //Guardado de cada línea en un arreglo diferente
      for(var line of lines){
        if(constant===0){
          line1=line.split(' ')
        }
        if(constant===1){
          line2=line.split(' ')
        }
        if(constant===2){
          line3=Number(line.split(' '))
        }
        constant++
      }

      let cost =0 
      const quantityProducts = Number(line1[0])
      const productDontEat = Number(line1[1])
      if(quantityProducts>productDontEat){
        for (let index = 0; index < line2.length; index++) {
          if(index!==productDontEat){
            cost+=Number(line2[index])
          }
        }
      }
      else return swal('No existe ese producto')
      let annaPayment = cost/2

      if(annaPayment===line3){
        return swal('Bon Appetit')
      }
      else {
        // chargeAnna = Number(line2[productDontEat])/2
        setchargeAnna(Number(line2[productDontEat])/2)
        return swal(`${chargeAnna}, Anna didn't eat item`)
      }
    }
    
    fileReader.onerror = () => {
      console.log(fileReader.error)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <input 

            type="file"
            multiple={false}
            onChange={readFile}
          />
          <div>
            <p>Anna didn't eat item , but she shared the cost of the rest of the items with Brian. The total cost of the shared items was ${chargeAnna} , and when split in half, the cost per person was . Brian charged Anna , which means she was overcharged by .</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
