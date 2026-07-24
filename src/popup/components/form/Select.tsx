import { ChevronDown } from 'lucide-react'

type SelectOption = {
  title: string
  value: string
}

type SelectFormProps = {
  id?: string
  label: string
  value: string
  options?: SelectOption[]
  onChange: (value: string) => void
}

const SelectForm = ({
  id,
  label,
  value,
  options = [],
  onChange,
}: SelectFormProps) => {
  return (
    <div className="relative rounded-xl border border-grey-border bg-grey-dark transition focus-within:border-yellow-medium/60">
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-2 left-3 z-10 text-[10px] font-medium tracking-[0.14em] text-grey-light uppercase"
      >
        {label}
      </label>

      <select
        id={id}
        value={value}
        className="h-14 w-full cursor-pointer appearance-none rounded-xl border-none bg-transparent pt-5 pr-10 pb-2 pl-3 text-sm font-medium text-white outline-none"
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>

      <ChevronDown
        size={16}
        strokeWidth={2}
        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-grey-light"
      />
    </div>
  )
}

export default SelectForm
