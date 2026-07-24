type LabelFormProps = {
  title: string
  className?: string
}

const LabelForm = ({ title, className = '' }: LabelFormProps) => {
  return (
    <label
      className={`block text-grey-light text-[10px] font-light ${className}`}
      htmlFor="selectTo"
    >
      {title}
    </label>
  )
}

export default LabelForm
