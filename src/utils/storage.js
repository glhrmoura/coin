import FunctionUtil from './function.js';

export default {
  getChangedStorageListener(handlers) {
    const handlersKeys = Object.keys(handlers);

    return (changes) => {
      const changesKeys = Object.keys(changes);
      const changedKeys = handlersKeys.filter((listenerKey) => changesKeys.includes(listenerKey));
  
      changedKeys.forEach((changedKey) => {
        const change = changes[changedKey];
        const handler = handlers[changedKey];
  
        if (FunctionUtil.isNotFunction(handler)) return;

        handler(change);
      });
    };
  },
};
