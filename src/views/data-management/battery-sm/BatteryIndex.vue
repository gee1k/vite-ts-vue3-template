<script setup lang="ts">
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue'
import { Table, Button, Space } from 'ant-design-vue'
import { h } from 'vue'

const columns = [
  {
    title: '电池编号',
    dataIndex: 'batterySn',
    key: 'batterySn',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '操作',
    key: 'action',
  },
]

const data = [
  {
    key: '1',
    batterySn: 'BT32132131232131',
    status: '正常',
    createTime: '2021-08-12 12:12:12',
  },
]
</script>
<template>
  <div class="app-container">
    <div class="form-container"></div>
    <div class="content-container">
      <Table :dataSource="data" :columns="columns">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="default" size="small" :icon="h(EditOutlined)">编辑</Button>
              <Button type="default" danger size="small" :icon="h(DeleteOutlined)">删除</Button>
            </Space>
          </template>
        </template>
      </Table>
    </div>
  </div>
</template>
<style lang="less" scoped></style>
