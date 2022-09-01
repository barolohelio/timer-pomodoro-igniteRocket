import { createContext, useContext, useState } from 'react'
/** Quando eu crio um Contexto e compartilho a informaçao inicial do contexto
 * com varios componentes, eu nao posso alterar essas informaçoes
 * Sempre que temos uma variavel no react que tera seu valor alterado com tempo
 * principalmente com açoes do usuario, nos utilizamos os estados.
 */

const CyclesContext = createContext({} as any)

function NewCycleForm() {
  const { activeCycle, setActiveCycle } = useContext(CyclesContext)
  return (
    <h1>
      NewCycleForm: {activeCycle}
      <button
        onClick={() => {
          setActiveCycle(2)
        }}
      >
        Alterar ciclo ativo
      </button>
    </h1>
  )
}

function Countdown() {
  const { activeCycle } = useContext(CyclesContext)

  return <h1>Contdown: {activeCycle}</h1>
}

// Utilizando por volta dos outros componentes
export function AprendendoContext() {
  const [activeCycle, setActiveCycle] = useState(0)

  return (
    <CyclesContext.Provider value={{ activeCycle, setActiveCycle }}>
      <NewCycleForm />
      <Countdown />
    </CyclesContext.Provider>
  )
}
