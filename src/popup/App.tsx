import { useEffect, useState } from 'react'
import { ArrowLeftRight, Check, LoaderCircle } from 'lucide-react'
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
    <div className="w-[320px] overflow-hidden bg-grey-darker text-white">
      <header className="flex items-center gap-2.5 border-b border-grey-border px-4 py-3">
        <LogoIcon size={28} />
        <div className="min-w-0">
          <h1 className="text-sm font-semibold tracking-tight text-white">
            Coin
          </h1>
          <p className="text-[11px] font-medium text-grey-light">
            Currency monitor
          </p>
        </div>
      </header>

      <main className="flex flex-col gap-4 p-4">
        <p className="text-sm font-medium text-grey-light">
          Choose which currencies you want to monitor
        </p>

        <div className="flex flex-col gap-3">
          <SelectForm
            id="currency-from"
            label="From"
            options={options}
            value={fromValue}
            onChange={onSelectFromChange}
          />

          <div className="flex justify-center">
            <Button
              variant="icon"
              aria-label="Switch currencies"
              onClick={onSwitchCurrencies}
            >
              <ArrowLeftRight size={16} strokeWidth={2} />
            </Button>
          </div>

          <SelectForm
            id="currency-to"
            label="To"
            options={options}
            value={toValue}
            onChange={onSelectToChange}
          />
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
