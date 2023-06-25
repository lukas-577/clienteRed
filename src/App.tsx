import React, { useState } from 'react';
import './App.css';
import { ListBus } from './components/ListBus';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import Container from '@mui/material/Container';
import { IBusData } from './interfaces/busData.interface';
import { Error, IProps } from './components/Error';
import { Loading } from './components/Loading';
import { createTheme, ThemeProvider } from '@mui/material/styles';





function App() {


  const [busList, setBusList] = useState<IBusData[]>([]);
  const [input, setImput] = useState('');
  const [error, setError] = useState({ isError: false, message: '' });
  const [loading, setLoading] = useState(false);
  const [paraderoError, setParaderoError]= useState({error:false, message: ''});



  const validarParadero=(paradero: string)=>{
    const expresionRegular = /(^[A-Za-z]{2}\d+$)/
    return expresionRegular.test(paradero)
  };

  const handleSubmint = (e:any)=>{
    e.preventDefault();
    if(!validarParadero(input)){
      setParaderoError({
        error: true,
        message: 'Mal ingresado el paradero'
      })
    }else{
      setParaderoError({
        error: false,
        message: ''
      })
      console.log('paradero correcto');
      getBusInterface2();
    }
  }

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


// creacion de thema 

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Color primario
    },
    secondary: {
      main: '#f50057', // Color secundario
    },
  },
});

  return (
    <div className="App">
      <Container>
        <ThemeProvider theme={theme}>
          <header className="App-header">
            <Box component={"form"} onSubmit={handleSubmint}>
              <TextField required helperText={paraderoError.message} error={paraderoError.error} color='primary' variant="outlined" value={input} onChange={(x) => handlerChange(x.target.value)} placeholder="Ingrese paradero" />
              <p>
                <Button type='submit' color='primary'>busca recorridos</Button>
              </p>
            </Box>
            <div>
              {loading && (<Loading></Loading>)}
              {!loading && error.isError && (<Error message={error.message} />)}
              {!loading && !error.isError && (
                ListBus(busList)
              )}
            </div>
          </header>
        </ThemeProvider>
      </Container>
    </div>
  );
}

export default App;
