import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { useContext } from 'react'
import { CycleContext } from '../../contexts/CyclesContext'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(5, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de pelo menos 5 minutos')
    .max(60, 'O ciclo precisa ser no máximo de 60 minutos'),
})
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { createNewCycle, interruptCurrentCycle, activeCycle } =
    useContext(CycleContext)
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task')
  const isSubmitDisabled = !task

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown></Countdown>
        {activeCycle ? (
          <StopCountDownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm size={24}></HandPalm>
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24}></Play>
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
