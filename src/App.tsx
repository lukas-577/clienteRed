import React, { useState } from 'react';
import './App.css';
import { ListBus } from './components/ListBus';
import { Button, TextField } from '@mui/material';
import Container from '@mui/material/Container';



export interface IBusData {
  bus: string,
  seDirige: string,
  DesvioPlanificado: string,
  tiempoEstimado: string
}


function App() {


  const [busList, setBusList] = useState<IBusData[]>([]);
  const [input, setImput] = useState('');






  const getBus = async () => {
    try {
      const respuesta = await fetch(`http://localhost:5000/datos/pa1`);
      const datosJson = await respuesta.json();
      const datos = datosJson.map((x: any) => x.bus);
      console.log(datos);
    } catch (error) {
      console.log(error);
    }
  }

  const getBusThen = async () => {
    try {
      await fetch(`http://localhost:5000/datos/pa1`)
        .then((res) => res.json())
        .then((datos) => datos.map((x: any) => console.log(x.bus)));
    } catch (error) {
      console.log(error);
    }
  }


  // const getBusInterface = async () => {
  //   try {
  //     await fetch(`http://localhost:5000/datos/pa1`)
  //       .then((res) => res.json())
  //       .then((datos) => {
  //         console.log(datos);
  //         datos.forEach((res: IBusData[]) => { //recorro todos los datos bus y cambio el estado
  //           const bus = res as IBusData[];
  //           setBusList(bus);
  //           console.log(setBusList(bus));
  //           console.log(bus);
  //         })

  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


  const getBusInterface2 = async () => {
    try {
      await fetch(`http://localhost:5000/datos/${input}`)
        .then((res) => res.json())
        .then((datos) => {
          console.log(datos);
          const bus = datos as IBusData[];
          setBusList(bus);
          console.log(bus);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const handlerChange = (value: string) => {
    setImput(value);
  }


  return (
    <div className="App">
      <Container>

        <header className="App-header">
          <TextField variant="standard" color="success" value={input} onChange={(x) => handlerChange(x.target.value)} placeholder="Ingresa paradero" />
          <p>
            {/* <button onClick={() => { getBus() }}>boton1</button>
            <button onClick={() => { getBusThen() }}>botonThen</button> */}
            {/* <button onClick={() => { getBusInterface() }}>botonInterface</button> */}
            <Button color="success" onClick={() => { getBusInterface2() }}>busca recorridos</Button>
          </p>
          <div>
            {ListBus(busList)}
          </div>
        </header>
      </Container>
    </div>
  );
}

export default App;
