const initalStorageData = {
  quotation: {
    from: 'USD',
    to: 'BRL',
  },
};

export default {
  async initStorage () {
    const storageData = await chrome.storage.local.get();
  
    await chrome.storage.local.set({ ...initalStorageData, ...storageData });
  },
}
