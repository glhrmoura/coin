import { CURRENCIES } from '../constants/index.js';

const $selectTo = document.querySelector('#selectTo');
const $selectFrom = document.querySelector('#selectFrom');
const $saveButton = document.querySelector('#saveButton');
const $switchCurrenciesButton = document.querySelector('#switchCurrenciesButton');

const createOptions = (currencies = [], excludeCodes = []) => {
  return currencies
    .map((currency) => (
      `
        <option value="${currency.code}">
          ${currency.title}
        </option>
      `
    ));
};

const storageData = await chrome.storage.local.get();

let fromCurrentValue = storageData?.quotation?.from || CURRENCIES[0].code;
let toCurrentValue = storageData?.quotation?.to || CURRENCIES[1].code;

$selectFrom.innerHTML = createOptions(CURRENCIES);
$selectTo.innerHTML = createOptions(CURRENCIES);

$selectFrom.value = fromCurrentValue;
$selectTo.value = toCurrentValue;

$selectFrom.addEventListener('change', ({ target }) => {
  if (target.value !== $selectTo.value) {
    return fromCurrentValue = target.value;
  }

  $selectTo.value = fromCurrentValue;
  toCurrentValue = fromCurrentValue;

  fromCurrentValue = target.value;
});

$selectTo.addEventListener('change', ({ target }) => {
  if (target.value !== $selectFrom.value) {
    return toCurrentValue = target.value;
  }

  $selectFrom.value = toCurrentValue;
  fromCurrentValue = toCurrentValue;

  toCurrentValue = target.value;
});

$saveButton.addEventListener('click', async () => {
  const quotation = {
    from: $selectFrom.value,
    to: $selectTo.value,
  };

  try {
    $saveButton.disabled = true;

    await chrome.storage.local.set({ quotation });
  } catch (error) {
    console.log('[Error: saveButton.addEventListener]', error);
  } finally {
    setInterval(() => $saveButton.disabled = false, 1000);
  }
});

$switchCurrenciesButton.addEventListener('click', () => {
  const toValue = $selectTo.value;

  $selectTo.value = fromCurrentValue;
  toCurrentValue = fromCurrentValue;

  $selectFrom.value = toValue;
  fromCurrentValue = toValue;
});