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
    <div className="relative cursor-pointer rounded-2xl border border-white/10 bg-grey-dark transition focus-within:border-yellow-medium/50">
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-2.5 left-3.5 z-10 text-[10px] font-medium tracking-[0.16em] text-grey-light uppercase"
      >
        {label}
      </label>

      <select
        id={id}
        value={value}
        className="h-[58px] w-full cursor-pointer appearance-none rounded-2xl border-none bg-transparent pt-5 pr-10 pb-2.5 pl-3.5 text-[13px] font-semibold text-white outline-none"
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
        className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-grey-light"
      />
    </div>
  )
}

export default SelectForm
