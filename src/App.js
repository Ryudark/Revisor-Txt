import './App.css';
import { useState } from 'react';
import swal from 'sweetalert';

function App() {

  const fileReader = new FileReader()
  
  let line1 = []
  let line2 = []
  let line3 = []
  
  let chargeAnna = 0
  
  const [charge, setcharge] = useState(0)
  const [bonAppetit, setBonAppetit] = useState(false)
  const [totalCost, setTotalCost] = useState(0)
  const [costPerson, setCostPerson] =useState(0)

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
      let totalCost = line2.reduce((anterior, actual)=>Number(anterior)+Number(actual))

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
        setTotalCost(cost)
        setCostPerson(cost/2)
        setBonAppetit(true)
        return swal('Bon Appetit')
      }
      else {
        chargeAnna = Number(line2[productDontEat])/2
        setTotalCost(totalCost)
        setCostPerson(totalCost/2)
        setcharge(Number(line2[productDontEat])/2)
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
            {charge>0? (<p>Anna didn't eat item , but she shared the cost of the rest of the items with Brian. The total cost of the shared items was ${totalCost}, and when split in half, the cost per person was ${costPerson}. Brian charged Anna , which means she was overcharged by ${charge}.</p>): 
              bonAppetit?(<p>Anna didn't eat item , but she shared the rest of the items with Brian. The total cost of the shared items was ${totalCost}, and when split in half, the cost per person was  ${costPerson}. Since , the bill was split fairly</p>) :<></>}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
