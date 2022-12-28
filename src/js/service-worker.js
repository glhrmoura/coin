import { COLORS } from '../constants/index.js';

import StorageService from '../services/storage.js';
import QuotationService from '../services/quotation.js';

import StorageUtil from '../utils/storage.js';
import CurrencyUtil from '../utils/currency.js';

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
  chrome.action.setBadgeBackgroundColor({ color: COLORS.BADGE_BACKGROUND_COLOR });

  await StorageService.initStorage();
  await fetchQuotation();
});

chrome.runtime.onStartup.addListener(async () => {
  chrome.action.setBadgeBackgroundColor({ color: COLORS.BADGE_BACKGROUND_COLOR });

  await fetchQuotation();
});

chrome.storage.onChanged.addListener(StorageUtil.getChangedStorageListener({
  quotation: fetchQuotation,
}));

setInterval(fetchQuotation, 30000);
