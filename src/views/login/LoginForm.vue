<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Form, FormItem, Input, InputPassword, Checkbox, Col, Row, Button } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import { LoginParams } from '@/api/model/user.model'
import { useUserStore } from '@/store/modules/user'
import { useRouter } from 'vue-router'
const { t } = useI18n()

const router = useRouter()
const userStore = useUserStore()

const formRef = ref()
const loading = ref(false)
const rememberMe = ref(false)

const formData = reactive<LoginParams>({
  username: 'svend',
  password: '123456',
})

async function handleLogin(values: LoginParams) {
  await userStore.login(values)
  if (router.currentRoute.value.query.redirect) {
    router.push(router.currentRoute.value.query.redirect as string)
  } else {
    router.push('/')
  }
}
</script>
<template>
  <h2 class="mb-3 text-2xl font-bold text-center xl:text-3xl enter-x xl:text-left">
    {{ t('sys.login.signInFormTitle') }}
  </h2>
  <Form class="p-4 enter-x" :model="formData" ref="formRef" @finish="handleLogin">
    <FormItem name="username" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.username"
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
          <Button type="link" size="small">
            {{ t('sys.login.forgetPassword') }}
          </Button>
        </FormItem>
      </Col>
    </Row>

    <FormItem class="enter-x">
      <Button type="primary" html-type="submit" size="large" block :loading="loading">
        {{ t('sys.login.loginButton') }}
      </Button>
      <!-- <Button size="large" class="mt-4 enter-x" block @click="handleRegister">
        {{ t('sys.login.registerButton') }}
      </Button> -->
    </FormItem>
  </Form>
</template>
<style lang="less" scoped></style>
