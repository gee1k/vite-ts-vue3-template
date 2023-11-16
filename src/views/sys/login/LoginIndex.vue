<script setup lang="ts">
import { AppLocalePicker, AppLogo } from '@/components/Application'
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'
import ForgetPasswordForm from './ForgetPasswordForm.vue'
import { useI18n } from 'vue-i18n'
import { getAppEnvConfig } from '@/utils/env.ts'
const { t } = useI18n()

const title = getAppEnvConfig().VITE_APP_TITLE
</script>
<template>
  <div class="login-container">
    <div class="flex items-center absolute right-4 top-4">
      <AppLocalePicker class="text-white enter-x xl:text-gray-600" :show-text="false" />
    </div>

    <span class="-enter-x xl:hidden">
      <AppLogo :alwaysShowTitle="true" />
    </span>

    <div class="container relative h-full py-2 mx-auto sm:px-10">
      <div class="flex h-full">
        <div class="hidden min-h-full pl-4 mr-4 xl:flex xl:flex-col xl:w-6/12">
          <AppLogo class="-enter-x" />
          <div class="my-auto">
            <img
              :alt="title"
              src="../../../assets/svg/login-box-bg.svg"
              class="w-1/2 -mt-16 -enter-x"
            />
            <div class="mt-10 font-medium text-white -enter-x">
              <span class="inline-block mt-4 text-3xl"> {{ t('sys.login.signInTitle') }}</span>
            </div>
            <div class="mt-5 font-normal text-white dark:text-gray-500 -enter-x">
              {{ t('sys.login.signInDesc') }}
            </div>
          </div>
        </div>
        <div class="flex w-full h-full py-5 xl:h-auto xl:py-0 xl:my-0 xl:w-6/12">
          <div
            class="login-form relative w-full px-5 py-8 mx-auto my-auto rounded-md shadow-md xl:ml-16 xl:bg-transparent sm:px-8 xl:p-4 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-3/4 enter-x"
          >
            <LoginForm />
            <RegisterForm />
            <ForgetPasswordForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@logo-prefix-cls: ~'app-logo';

.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 0 1rem;

  @media (max-width: theme('screens.xl')) {
    background-color: #293146;

    .login-form {
      background-color: #fff;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    background-image: url('@/assets/svg/login-bg.svg');
    background-repeat: no-repeat;
    background-position: 100%;
    background-size: auto 100%;

    @media (max-width: theme('screens.xl')) {
      display: none;
    }
  }

  :deep(.@{logo-prefix-cls}) {
    position: absolute;
    top: 12px;
    height: 30px;

    &__title {
      color: #fff;
      font-size: 16px;
    }

    img {
      width: 32px;
    }
  }

  .container {
    .@{logo-prefix-cls} {
      display: flex;
      width: 60%;
      height: 80px;

      &__title {
        color: #fff;
        font-size: 24px;
      }

      img {
        width: 48px;
      }
    }
  }
}
</style>
