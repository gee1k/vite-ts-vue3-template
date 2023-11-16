import type { RuleObject, Rule as ValidationRule } from 'ant-design-vue/lib/form/interface'
import { ref, computed, unref } from 'vue'
import { useI18n } from 'vue-i18n'

export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
}

const currentState = ref(LoginStateEnum.LOGIN)

export function useLoginState() {
  function setLoginState(state: LoginStateEnum) {
    currentState.value = state
  }

  const getLoginState = computed(() => currentState.value)

  function handleBackLogin() {
    setLoginState(LoginStateEnum.LOGIN)
  }

  return { setLoginState, getLoginState, handleBackLogin }
}

export function useFormRules(formData?: Recordable) {
  const { t } = useI18n()

  const getAccountFormRule = computed(() => createRule(t('sys.login.accountPlaceholder')))
  const getPasswordFormRule = computed(() => createRule(t('sys.login.passwordPlaceholder')))

  const validateConfirmPassword = (password: string) => {
    return async (_: RuleObject, value: string) => {
      if (!value) {
        return Promise.reject(t('sys.login.passwordPlaceholder'))
      }
      if (value !== password) {
        return Promise.reject(t('sys.login.diffPwd'))
      }
      return Promise.resolve()
    }
  }

  const getFormRules = computed((): { [k: string]: ValidationRule | ValidationRule[] } => {
    const accountFormRule = unref(getAccountFormRule)
    const passwordFormRule = unref(getPasswordFormRule)

    switch (unref(currentState)) {
      // register form rules
      case LoginStateEnum.REGISTER:
        return {
          identifier: accountFormRule,
          password: passwordFormRule,
          confirmPassword: [
            { validator: validateConfirmPassword(formData?.password), trigger: 'change' },
          ],
        }

      // reset password form rules
      case LoginStateEnum.RESET_PASSWORD:
        return {
          identifier: accountFormRule,
        }

      // login form rules
      default:
        return {
          identifier: accountFormRule,
          password: passwordFormRule,
        }
    }
  })
  return { getFormRules }
}

function createRule(message: string): ValidationRule[] {
  return [
    {
      required: true,
      message,
      trigger: 'change',
    },
  ]
}
