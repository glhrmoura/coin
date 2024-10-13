<template>
  <header class="flex items-center p-2 bg-grey-darker">
    <LogoIcon :size="24" />
    
    <h1 class="text-base ml-2 text-grey-light font-semibold">
      Coin
    </h1>
  </header>

  <main class="p-3">
    <p class="text-sm font-light text-grey-light">
      Choose which currencies you want to monitor
    </p>

    <div class="flex items-center gap-x-3.5 mt-4">
      <div>
        <LabelForm title="From" class="mb-1" />

        <SelectForm
          :options="options"
          v-model:value="fromValue"
          @change="onSelectFromChange"
        />
      </div>

      <Button
        class="mt-6"
        type="ghost"
        @click="onSwitchCurrencies"
      >
        <ReloadIcon />
      </Button>

      <div>
        <LabelForm title="To" class="mb-1" />

        <SelectForm
          :options="options"
          v-model:value="toValue"
          @change="onSelectToChange"
        />
      </div>
    </div>

    <div class="flex justify-end mt-6">
      <Button
        title="Save"
        type="primary"
        :disabled="loading"
        @click="onSaveQuotation"
      />
    </div>
  </main>
</template>

<script>
import { CURRENCIES } from '@/constants';

import LogoIcon from '@/extension/popup/components/icons/Logo.vue';
import ReloadIcon from '@/extension/popup/components/icons/Reload.vue';

import SelectForm from '@/extension/popup/components/form/Select.vue';
import LabelForm from '@/extension/popup/components/form/Label.vue';

import Button from '@/extension/popup/components/Button.vue';

export default {
  components: {
    Button,
    LogoIcon,
    LabelForm,
    ReloadIcon,
    SelectForm,
  },

  data: () => ({
    fromValue: '',
    fromOldValue: '',
    toValue: '',
    toOldValue: '',
    loading: false,
    currencies: CURRENCIES,
  }),

  computed: {
    options() {
      return this.currencies
        .map(({ title, code }) => ({ title, value: code }));
    },
  },

  async mounted() {
    const {
      quotation,
    } = await chrome.storage.local.get(['quotation']);

    this.fromValue = quotation?.from || CURRENCIES[0].code;
    this.toValue = quotation?.to || CURRENCIES[1].code;

    this.fromOldValue = this.fromValue;
    this.toOldValue = this.toValue;
  },

  methods: {
    onSelectFromChange() {
      if (this.fromValue !== this.toValue) {
        return this.fromOldValue = this.fromValue;
      };

      this.toValue = this.fromOldValue;
      this.fromOldValue = this.fromValue;
    },

    onSelectToChange() {
      if (this.toValue !== this.fromValue) {
        return this.toOldValue = this.toValue;
      };

      this.fromValue = this.toOldValue;
      this.toOldValue = this.toValue;
    },

    onSwitchCurrencies() {
      const toValue = this.toValue;

      this.toValue = this.fromValue;
      this.fromValue = toValue;
    },

    async onSaveQuotation() {
      const quotation = {
        from: this.fromValue,
        to: this.toValue,
      };

      try {
        this.loading = true;

        await chrome.storage.local.set({ quotation });
      } catch (error) {
        console.log('[Error: saveButton.addEventListener]', error);
      } finally {
        setInterval(() => this.loading = false, 1000);
      }
    },
  },
};
</script>
