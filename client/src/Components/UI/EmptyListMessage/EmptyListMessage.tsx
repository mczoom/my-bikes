interface EmptyListMessageProps {
  text: string
}


export default function EmptyListMessage({text}: EmptyListMessageProps) {
    
  return(
    <p className='empty-list-msg'>{text}</p>
  )
}