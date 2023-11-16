import { App } from 'ant-design-vue'
import type { MessageInstance } from 'ant-design-vue/es/message/interface'
import type { ModalStaticFunctions } from 'ant-design-vue/es/modal/confirm'
import type { NotificationInstance } from 'ant-design-vue/es/notification/interface'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGlobalStore = defineStore('global', () => {
  const message = ref<MessageInstance>()
  const notification = ref<NotificationInstance>()
  const modal = ref<Omit<ModalStaticFunctions, 'warn'>>()
  ;(() => {
    const staticFunction = App.useApp()
    message.value = staticFunction.message
    modal.value = staticFunction.modal
    notification.value = staticFunction.notification
  })()

  return { message, notification, modal }
})
