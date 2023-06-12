import React, { useState } from 'react';
import './App.css';
import { ListBus } from './components/ListBus';
import { Button, TextField } from '@mui/material';
import Container from '@mui/material/Container';
import { IBusData } from './interfaces/busData.interface';
import { Error, IProps } from './components/Error';
import { Loading } from './components/Loading';






function App() {


  const [busList, setBusList] = useState<IBusData[]>([]);
  const [input, setImput] = useState('');
  const [error, setError] = useState({ isError: false, message: '' });
  const [loading, setLoading] = useState(false);


  const getBusInterface2 = async () => {
    setLoading(true);
    await fetch(`https://datosreddocker.onrender.com/datos/${input}`)
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          const errorMessage = errorData || errorData.message === "Error desconocido";
          throw errorMessage
        }
        return res.json();
      })
      .then((datos) => {
        console.log(datos);
        const bus = datos as IBusData[];
        setBusList(bus.length > 0 ? bus : []);
        console.log(bus);
      }).catch((error: IProps) => {
        console.log(error);
        setError({
          isError: true,
          message: error.message
        });
      }).finally(() => {
        setLoading(false);
      })
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
            <Button color="success" onClick={() => { getBusInterface2() }}>busca recorridos</Button>
          </p>
          <div>
            {loading && (<Loading></Loading>)}
            {!loading && error.isError && (<Error message={error.message} />)}
            {!loading && !error.isError && (
              ListBus(busList)
            )}
          </div>
        </header>
      </Container>
    </div>
  );
}

export default App;
