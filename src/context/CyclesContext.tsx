/* eslint-disable prettier/prettier */
import { differenceInSeconds } from 'date-fns'
import { createContext, ReactNode, useEffect, useReducer, useState } from 'react'
import { ActionTypes, addNewCycleAction, interruptCurrentCycleAction ,markCurrentCycleAsFinishedAction} from '../reducers/cycles/actions'
import { Cycle, cyclesReducer} from '../reducers/cycles/reducer'


interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void // recebe um numero e nao retorno
  CreateNewCycle: (data: CreateCycleData) => void
  InterruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps{
  children: ReactNode
}


export function CyclesContextProvider({children}:CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer,
     {
    cycles: [],
    activeCycleId: null
  }
 ,() => {
     const storedStateAsJson = localStorage.getItem(
       '@ignite-timer:cycles-state=1.0.0',
     )

     if(storedStateAsJson){
       return JSON.parse(storedStateAsJson)
     }
   },
  )

  
  const {cycles, activeCycleId} = cyclesState || {}
  const activeCycle = cycles?.find((cycle) => cycle.id === activeCycleId)
  console.log(cycles)
  
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if(activeCycle){
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })
  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state=1.0.0', stateJSON)
  },[cyclesState])


  function CreateNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    /* Lista todos os ciclos e adiciona o novo no final
       sempre que uma alteração de estado depender dos valores anteriores nós
       utilizamos o formato de arrow function
     */
    dispatch(addNewCycleAction(newCycle))
    // setCycles((state) => [...cycles, newCycle])
    setAmountSecondsPassed(0)
    // reset()
  }

  function InterruptCurrentCycle() {
      dispatch(interruptCurrentCycleAction())
    }
    /** Percorrer todos os ciclos e para ciclo percorrido, se o ciclo for o ciclo
     *  ativo, retornar todos os dados do ciclo acrescentando o interruptedDate
     *  com valor da data atual senão retorna o ciclo sem alterações
     *  REGRAS PARA UM BOM CÓDIGO
     *  Sempre alterar uma informação seguindo os princípios da imutabilidade
     */
    // setCycles((state) =>
      // state.map((cycle) => {
      //   /** activeCycle com base no ID do ciclo ativo percorre todos os ciclos e retorna
      //    * o ciclo com mesmo ID do ciclo ativo
      //    */
      //   if (cycle.id === activeCycleId) {
      //     return { ...cycle, interruptedDate: new Date() }
      //   } else {
      //     return cycle
      //   }
      // }),
    // )
  

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        CreateNewCycle,
        InterruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
