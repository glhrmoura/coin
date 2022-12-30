<template>
  <div class="app">
    <header class="header__container">
      <LogoIcon :size="24" />
      
      <Heading tag="h1" class="header__title">
        Coins
      </Heading>
    </header>

    <main class="main__container">
      <Heading tag="h2" class="main__title">
        Choose which currencies you want to monitor
      </Heading>

      <div class="form__container">
        <div class="form__group">
          <LabelForm title="From" />

          <SelectForm
            :options="options"
            v-model:value="fromValue"
            @change="onSelectFromChange"
          />
        </div>

        <div class="switch__container">
          <Button type="ghost" @click="onSwitchCurrencies">
            <ReloadIcon />
          </Button>
        </div>

        <div class="form__group">
          <LabelForm title="To" />

          <SelectForm
            :options="options"
            v-model:value="toValue"
            @change="onSelectToChange"
          />
        </div>
      </div>

      <div class="button__container">
        <Button
          title="Save"
          type="primary"
          :disabled="loading"
          @click="onSaveQuotation"
        />
      </div>
    </main>
  </div>
</template>

<script>
import { CURRENCIES } from '@/constants';

import Button from '@/extension/popup/components/Button.vue';
import Heading from '@/extension/popup/components/Heading.vue';
import LogoIcon from '@/extension/popup/components/icons/Logo.vue';
import LabelForm from '@/extension/popup/components/form/Label.vue';
import SelectForm from '@/extension/popup/components/form/Select.vue';
import ReloadIcon from '@/extension/popup/components/icons/Reload.vue';

export default {
  components: {
    Button,
    Heading,
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

<style scoped>
.app {
  border-radius: 14px;
}

.main__container {
  padding: 12px;
}

.main__title {
  font-size: 14px;
  font-weight: 300;
}

.header__container {
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: #2E2E2E;
}

.header__title {
  font-size: 14px;
  font-weight: 500;
  margin-left: 6px;
}

.form__container {
  display: flex;
  align-items: center;
  column-gap: 12px;
  margin-top: 16px;
}

.button__container {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
}

.switch__container {
  margin-top: 22px;
}
</style>