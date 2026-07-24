import { useEffect, useState } from 'react'
import { CURRENCIES } from '../shared/constants'
import Button from './components/Button'
import LabelForm from './components/form/Label'
import SelectForm from './components/form/Select'
import LogoIcon from './components/icons/Logo'
import ReloadIcon from './components/icons/Reload'

const options = CURRENCIES.map(({ title, code }) => ({ title, value: code }))

const App = () => {
  const [fromValue, setFromValue] = useState('')
  const [fromOldValue, setFromOldValue] = useState('')
  const [toValue, setToValue] = useState('')
  const [toOldValue, setToOldValue] = useState('')
  const [loading, setLoading] = useState(false)

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
    setFromValue(value)

    if (value !== toValue) {
      setFromOldValue(value)
      return
    }

    setToValue(fromOldValue)
    setFromOldValue(value)
  }

  const onSelectToChange = (value: string) => {
    setToValue(value)

    if (value !== fromValue) {
      setToOldValue(value)
      return
    }

    setFromValue(toOldValue)
    setToOldValue(value)
  }

  const onSwitchCurrencies = () => {
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
      await chrome.storage.local.set({ quotation })
    } catch (error) {
      console.log('[Error: saveButton.addEventListener]', error)
    } finally {
      setTimeout(() => setLoading(false), 1000)
    }
  }

  return (
    <>
      <header className="flex items-center p-2 bg-grey-darker">
        <LogoIcon size={24} />

        <h1 className="text-base ml-2 text-grey-light font-semibold">Coin</h1>
      </header>

      <main className="p-3">
        <p className="text-sm font-light text-grey-light">
          Choose which currencies you want to monitor
        </p>

        <div className="flex items-center gap-x-3.5 mt-4">
          <div>
            <LabelForm title="From" className="mb-1" />

            <SelectForm
              options={options}
              value={fromValue}
              onChange={onSelectFromChange}
            />
          </div>

          <Button className="mt-6" type="ghost" onClick={onSwitchCurrencies}>
            <ReloadIcon />
          </Button>

          <div>
            <LabelForm title="To" className="mb-1" />

            <SelectForm
              options={options}
              value={toValue}
              onChange={onSelectToChange}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button
            title="Save"
            type="primary"
            disabled={loading}
            onClick={onSaveQuotation}
          />
        </div>
      </main>
    </>
  )
}

export default App
