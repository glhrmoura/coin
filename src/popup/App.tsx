import { useEffect, useState } from 'react'
import { ArrowUpDown, Check, LoaderCircle } from 'lucide-react'
import { CURRENCIES } from '../shared/constants'
import Button from './components/Button'
import SelectForm from './components/form/Select'
import LogoIcon from './components/icons/Logo'

const options = CURRENCIES.map(({ title, code }) => ({ title, value: code }))

const App = () => {
  const [fromValue, setFromValue] = useState('')
  const [fromOldValue, setFromOldValue] = useState('')
  const [toValue, setToValue] = useState('')
  const [toOldValue, setToOldValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const loadQuotation = async () => {
      const { quotation } = (await chrome.storage.local.get([
        'quotation',
      ])) as {
        quotation?: { from?: string; to?: string }
      }

      const nextFrom = quotation?.from || CURRENCIES[0].code
      const nextTo = quotation?.to || CURRENCIES[1].code

      setFromValue(nextFrom)
      setToValue(nextTo)
      setFromOldValue(nextFrom)
      setToOldValue(nextTo)
    }

    void loadQuotation()
  }, [])

  const onSelectFromChange = (value: string) => {
    setSaved(false)
    setFromValue(value)

    if (value !== toValue) {
      setFromOldValue(value)
      return
    }

    setToValue(fromOldValue)
    setFromOldValue(value)
  }

  const onSelectToChange = (value: string) => {
    setSaved(false)
    setToValue(value)

    if (value !== fromValue) {
      setToOldValue(value)
      return
    }

    setFromValue(toOldValue)
    setToOldValue(value)
  }

  const onSwitchCurrencies = () => {
    setSaved(false)
    setFromValue(toValue)
    setToValue(fromValue)
  }

  const onSaveQuotation = async () => {
    const quotation = {
      from: fromValue,
      to: toValue,
    }

    try {
      setLoading(true)
      setSaved(false)
      await chrome.storage.local.set({ quotation })
      setSaved(true)
    } catch (error) {
      console.log('[Error: saveButton.addEventListener]', error)
    } finally {
      setTimeout(() => setLoading(false), 600)
    }
  }

  return (
    <div className="w-[340px] overflow-hidden bg-grey-darker text-white">
      <header className="flex items-center gap-2.5 border-b border-white/10 px-4 py-3.5">
        <LogoIcon size={28} />
        <div className="min-w-0">
          <h1 className="text-[15px] leading-tight font-semibold tracking-tight text-white">
            Coin
          </h1>
          <p className="text-[11px] leading-tight font-medium text-grey-light">
            Currency monitor
          </p>
        </div>
      </header>

      <main className="flex flex-col gap-5 p-4">
        <p className="text-[13px] leading-snug font-medium text-white/80">
          Choose which currencies you want to monitor
        </p>

        <div className="flex items-stretch">
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <SelectForm
              id="currency-from"
              label="From"
              options={options}
              value={fromValue}
              onChange={onSelectFromChange}
            />

            <SelectForm
              id="currency-to"
              label="To"
              options={options}
              value={toValue}
              onChange={onSelectToChange}
            />
          </div>

          <div className="relative flex w-9 shrink-0 cursor-pointer items-center justify-end">
            <div
              aria-hidden
              className="absolute top-[29px] bottom-[calc(50%+18px)] left-0 right-1/2 rounded-tr-lg border-t border-r border-white/15"
            />
            <div
              aria-hidden
              className="absolute top-[calc(50%+18px)] bottom-[29px] left-0 right-1/2 rounded-br-lg border-r border-b border-white/15"
            />

            <button
              type="button"
              aria-label="Switch currencies"
              className="relative z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-grey-darker text-grey-light outline-none transition hover:border-yellow-medium/40 hover:text-yellow-medium [&_svg]:pointer-events-none"
              onClick={onSwitchCurrencies}
            >
              <ArrowUpDown size={16} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        <Button disabled={loading} onClick={onSaveQuotation}>
          {loading ? (
            <LoaderCircle size={16} strokeWidth={2.25} className="animate-spin" />
          ) : saved ? (
            <Check size={16} strokeWidth={2.25} />
          ) : null}
          <span>{loading ? 'Saving' : saved ? 'Saved' : 'Save'}</span>
        </Button>
      </main>
    </div>
  )
}

export default App
