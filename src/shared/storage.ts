import FunctionUtil from './function'

type StorageChangeHandlers = Record<
  string,
  (change: chrome.storage.StorageChange) => void
>

const StorageUtil = {
  getChangedStorageListener(handlers: StorageChangeHandlers) {
    const handlersKeys = Object.keys(handlers)

    return (changes: { [key: string]: chrome.storage.StorageChange }) => {
      const changesKeys = Object.keys(changes)
      const changedKeys = handlersKeys.filter((listenerKey) =>
        changesKeys.includes(listenerKey),
      )

      changedKeys.forEach((changedKey) => {
        const change = changes[changedKey]
        const handler = handlers[changedKey]

        if (FunctionUtil.isNotFunction(handler)) return

        handler(change)
      })
    }
  },
}

export default StorageUtil
