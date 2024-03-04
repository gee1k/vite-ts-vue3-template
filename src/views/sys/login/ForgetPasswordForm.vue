<script lang="ts" setup>
import { reactive, ref, computed, unref } from 'vue'
import LoginFormTitle from './LoginFormTitle.vue'
import { Form, Input, Button } from 'ant-design-vue'
import type { FormProps } from 'ant-design-vue'
import { CountdownInput } from '@/components/Countdown'
import { useLoginState, useFormRules, LoginStateEnum } from './useLogin.ts'
import { useI18n } from 'vue-i18n'
import type { ForgetPasswordParams } from '@/api/model/user.model.ts'

const FormItem = Form.Item
const { t } = useI18n()
const { handleBackLogin, getLoginState } = useLoginState()
const { getFormRules } = useFormRules()

const formRef = ref()
const loading = ref(false)

const formData = reactive<ForgetPasswordParams>({
  identifier: '',
  mobile: '',
  sms: '',
})

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD)

const handleReset: FormProps['onFinish'] = async (values: ForgetPasswordParams) => {
  console.log(values)
  const form = unref(formRef)
  if (!form) return
  await form.resetFields()
}
</script>
<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form
      class="p-4 enter-x"
      :model="formData"
      :rules="getFormRules"
      ref="formRef"
      @finish="handleReset"
    >
      <FormItem name="identifier" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.identifier"
          :placeholder="t('sys.login.userName')"
        />
      </FormItem>

      <FormItem name="mobile" class="enter-x">
        <Input size="large" v-model:value="formData.mobile" :placeholder="t('sys.login.mobile')" />
      </FormItem>
      <FormItem name="sms" class="enter-x">
        <CountdownInput
          size="large"
          v-model:value="formData.sms"
          :placeholder="t('sys.login.smsCode')"
        />
      </FormItem>

      <FormItem class="enter-x">
        <Button type="primary" html-type="submit" size="large" block :loading="loading">
          {{ t('common.resetText') }}
        </Button>
        <Button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </Button>
      </FormItem>
    </Form>
  </template>
</template>
