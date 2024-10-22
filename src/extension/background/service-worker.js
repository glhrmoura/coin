import { COLORS } from '@/core/constants';

import QuotationService from '@/core/services/quotation.js';

import StorageUtil from '@/core/utils/storage.js';
import CurrencyUtil from '@/core/utils/currency.js';

const fetchQuotation = async () => {
  const { quotation } = await chrome.storage.local.get(['quotation']);

  try {
    const { bid } = await QuotationService.fetchLastQuotation(quotation);

    chrome.action.setBadgeText({ text: CurrencyUtil.toCurrency(bid) });
  } catch (error) {
    console.log('[Error: runtime.onInstalled]', error);
  }
};

chrome.runtime.onInstalled.addListener(async () => {
  const storageData = await chrome.storage.local.get();
  const initalStorageData = {
    quotation: { from: 'USD', to: 'BRL' },
  };

  await chrome.action.setBadgeBackgroundColor({ color: COLORS.BADGE_BACKGROUND_COLOR });
  await chrome.storage.local.set({ ...initalStorageData, ...storageData });
  
  await fetchQuotation();
});

chrome.runtime.onStartup.addListener(async () => {
  chrome.action.setBadgeBackgroundColor({ color: COLORS.BADGE_BACKGROUND_COLOR });

  await fetchQuotation();
});

chrome.storage.onChanged.addListener(StorageUtil.getChangedStorageListener({
  quotation: fetchQuotation,
}));

setInterval(fetchQuotation, 20000);