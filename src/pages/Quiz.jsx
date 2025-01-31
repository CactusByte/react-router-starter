import preguntas from "./preguntas";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { mintToken } from './Claim'

function Quiz() {

  let address
  let auth = false
  const { state } = useLocation();

  if (state) {
    address = state;
    auth = true;
  }

  const [minted, setMinted] = useState(false);
  const mint = () => {
    mintToken().then(tx => {
      setTx(tx);
      setMinted(true);
    }).catch(err => {
      console.log(err);
    });
  }
    const [tx, setTx] = useState();
    const [preguntaActual, setPreguntaActual] = useState(0);
    const [chainID, setChainID] = useState('p')
    const [puntuación, setPuntuación] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [tiempoRestante, setTiempoRestante] = useState(10);
    const [areDisabled, setAreDisabled] = useState(false);
    const [answersShown, setAnswersShown] = useState(false);

    function handleAnswerSubmit(isCorrect, e) {
      // añadir puntuación
      if (isCorrect) setPuntuación(puntuación + 1);
      // añadir estilos de pregunta
      e.target.classList.add(isCorrect ? "correct" : "incorrect");
      // cambiar a la siguiente pregunta

      setTimeout(() => {
        if (preguntaActual === preguntas.length - 1) {
          setIsFinished(true);
        } else {
          setPreguntaActual(preguntaActual + 1);
          setTiempoRestante(10);
        }
      }, 1500);
    }

    useEffect(() => {
      const intervalo = setInterval(() => {
        if (tiempoRestante > 0) setTiempoRestante((prev) => prev - 1);
        if (tiempoRestante === 0) setAreDisabled(true);
      }, 1000);

      return () => clearInterval(intervalo);
    }, [tiempoRestante]);



    if (isFinished) {
      return (
        <>
        {!minted ? <button onClick={ ()=> mint() }>GetTokens</button>: <h1>Check your wallet to see tokens </h1>}
        </>
      );
    }


    if (answersShown)
      return (
        <main className="app">
          <div className="lado-izquierdo">
            <div className="numero-pregunta">
              <span> Pregunta {preguntaActual + 1} de</span> {preguntas.length}
            </div>
            <div className="titulo-pregunta">
              {preguntas[preguntaActual].titulo}
            </div>
            <div>
              {
                preguntas[preguntaActual].opciones.filter(
                  (opcion) => opcion.isCorrect
                )[0].textoRespuesta
              }
            </div>
            <button
              onClick={() => {
                if (preguntaActual === preguntas.length - 1) {
                  window.location.href = "/claim";
                } else {
                  setPreguntaActual(preguntaActual + 1);
                }
              }}
            >
              {preguntaActual === preguntas.length - 1
                ? "Volver a jugar"
                : "Siguiente"}
            </button>
          </div>
        </main>
      );

    return (
      <main className="app">
        <div className="lado-izquierdo">
          <div className="numero-pregunta">
            <span> Pregunta {preguntaActual + 1} de</span> {preguntas.length}
          </div>
          <div className="titulo-pregunta">
            {preguntas[preguntaActual].titulo}
          </div>
          <div>
            {!areDisabled ? (
              <span className="tiempo-restante">
                Tiempo restante: {tiempoRestante}{" "}
              </span>
            ) : (
              <button
                onClick={() => {
                  setTiempoRestante(10);
                  setAreDisabled(false);
                  if (preguntaActual === preguntas.length - 1) {
                    setIsFinished(true);
                  } else {
                    setPreguntaActual(preguntaActual + 1);
                  }
                }}
              >
                Continuar
              </button>
            )}
          </div>
        </div>
        <div className="lado-derecho">
          {preguntas[preguntaActual].opciones.map((respuesta) => (
            <button
              disabled={areDisabled}
              key={respuesta.textoRespuesta}
              onClick={(e) => handleAnswerSubmit(respuesta.isCorrect, e)}
            >
              {respuesta.textoRespuesta}
            </button>
          ))}
        </div>
      </main>
    );
  }

  export default Quiz;