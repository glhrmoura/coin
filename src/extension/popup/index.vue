<template>
  <div class="extension-container">
    <header class="header-container">
      <img
        alt="Coins icon"
        class="header__image"
        src="@/assets/images/logo.png"
      />

      <h1 class="header__title">
        Coins
      </h1>
    </header>

    <main class="main-content">
      <h2 class="main-content__title">
        Choose which currencies you want to monitor
      </h2>

      <div class="form__container">
        <div class="form__group">
          <LabelForm title="From" />

          <SelectForm
            :options="options"
            v-model:value="fromValue"
            @change="onSelectFromChange"
          />
        </div>

        <div class="switch-currencies__container">
          <Button type="ghost" @click="onSwitchClick">
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

      <div class="save-button__container">
        <Button
          title="Save"
          type="primary"
          :disabled="loading"
          @click="onSaveClick"
        />
      </div>
    </main>
  </div>
</template>

<script>
import { CURRENCIES } from '@/constants';

import Button from '@/extension/popup/components/Button.vue';
import LabelForm from '@/extension/popup/components/form/Label.vue';
import ReloadIcon from '@/extension/popup/components/icons/Reload.vue';
import SelectForm from '@/extension/popup/components/form/Select.vue';

export default {
  components: {
    Button,
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
      return this.currencies.map(({ title, code }) => ({ title, value: code }))
    }
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

    onSwitchClick() {
      const toValue = this.toValue;

      this.toValue = this.fromValue;
      this.fromValue = toValue;
    },

    async onSaveClick() {
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

<style>
* {
  font-family: 'Inter', sans-serif;
}

body {
  margin: 0px;
  background-color: #333333;
}

*:focus:not(:focus-visible) {
  outline: none;
}

*:focus-visible {
  outline: 1.5px solid #FFCC33;
}

.extension-container {
  border-radius: 14px;
}

.main-content {
  padding: 12px;
}

.header-container {
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: #2E2E2E;
}

.header__image {
  height: 25px;
}

.header__title {
  margin: 0px;
  color: #ADADAD;
  font-size: 14px;
  font-weight: 500;
  margin-left: 6px;
}

.form__container {
  display: flex;
  align-items: center;
  column-gap: 12px;
}

.main-content__title {
  margin: 0px;
  color: #ADADAD;
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 16px;
}

.save-button__container {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
}

.switch-currencies__container {
  margin-top: 22px;
}

.switch-currencies__button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: .2s;
}

.switch-currencies__button:active {
  transform: scale(.9);
}

.switch-currencies__image {
  width: 16px;
  height: 16px;
}
</style>