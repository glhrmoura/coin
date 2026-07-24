type SelectOption = {
  title: string
  value: string
}

type SelectFormProps = {
  value: string
  options?: SelectOption[]
  onChange: (value: string) => void
}

const SelectForm = ({
  value,
  options = [],
  onChange,
}: SelectFormProps) => {
  return (
    <div className="relative after:content-[''] after:absolute after:border-[5px] after:border-transparent after:border-t-grey-light after:top-[18px] after:right-[12px] after:pointer-events-none">
      <select
        value={value}
        className="appearance-none relative bg-grey-dark border-[1px] border-grey-light rounded py-3 pl-3 pr-5 w-[200px] cursor-pointer text-white"
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectForm
