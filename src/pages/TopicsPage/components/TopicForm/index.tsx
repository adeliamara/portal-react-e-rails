import React from "react"
import { useRef } from "react"

interface TopicFormProps {
  onAdd: (text: string) => void
}

export function TopicForm({ onAdd }: TopicFormProps) {

  const descriptionInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    const text = descriptionInputRef.current!.value

    event.target.reset()
    descriptionInputRef.current!.focus()

    onAdd(text)
  }


  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={descriptionInputRef} placeholder="Descrição da Topic" />
      <input type="submit" value="Adicionar Tarefa" />
    </form>
  )
}