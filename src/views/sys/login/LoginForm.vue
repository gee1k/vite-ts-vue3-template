<script setup lang="ts">
import { computed, reactive, ref, unref } from 'vue'
import {
  Form,
  FormItem,
  Input,
  InputPassword,
  Checkbox,
  Col,
  Row,
  Button,
  notification,
} from 'ant-design-vue'
import LoginFormTitle from './LoginFormTitle.vue'
import { useI18n } from 'vue-i18n'
import { LoginParams } from '@/api/model/user.model.ts'
import { useUserStore } from '@/store/modules/user.ts'
import { useRouter } from 'vue-router'
import { LoginStateEnum, useFormRules, useLoginState } from './useLogin.ts'
const { t } = useI18n()

const { setLoginState, getLoginState } = useLoginState()
const { getFormRules } = useFormRules()

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)

const router = useRouter()
const userStore = useUserStore()

const formRef = ref()
const loading = ref(false)
const rememberMe = ref(false)

const formData = reactive<LoginParams>({
  identifier: '',
  password: '',
})

async function handleLogin(values: LoginParams) {
  loading.value = true
  try {
    const token = await userStore.login(values, { rememberMe: unref(rememberMe) })
    if (token) {
      notification.success({
        message: t('sys.login.loginSuccessTitle'),
        description: `${t('sys.login.loginSuccessDesc')}`,
        duration: 3,
      })

      if (router.currentRoute.value.query.redirect) {
        await router.push(router.currentRoute.value.query.redirect as string)
      } else {
        await router.push('/')
      }
    }
  } catch (error) {
    notification.error({
      message: t('sys.login.loginErrorTitle'),
      description: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
      duration: 3,
    })
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form
    v-show="getShow"
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    @finish="handleLogin"
  >
    <FormItem name="identifier" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.identifier"
        :placeholder="t('sys.login.userName')"
        class="fix-auto-fill"
      />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        :placeholder="t('sys.login.password')"
      />
    </FormItem>

    <Row class="enter-x">
      <Col :span="12">
        <FormItem>
          <!-- No logic, you need to deal with it yourself -->
          <Checkbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </Checkbox>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem :style="{ 'text-align': 'right' }">
          <!-- No logic, you need to deal with it yourself -->
          <Button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
            {{ t('sys.login.forgetPassword') }}
          </Button>
        </FormItem>
      </Col>
    </Row>

    <FormItem class="enter-x">
      <Button type="primary" html-type="submit" size="large" block :loading="loading">
        {{ t('sys.login.loginButton') }}
      </Button>
      <Button
        size="large"
        class="mt-4 enter-x"
        block
        @click="setLoginState(LoginStateEnum.REGISTER)"
      >
        {{ t('sys.login.registerButton') }}
      </Button>
    </FormItem>
  </Form>
</template>
<style lang="less" scoped></style>
