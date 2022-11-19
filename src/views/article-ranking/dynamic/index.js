/**
 * 1. 动态列数据
 * 2. 被勾选的动态列数据
 * 3. table 的列数据
 */
import getDynamicData from './DynamicData'
import { ref, watch } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'

// 暴露出动态列数据
export const dynamicData = ref(getDynamicData())

// 监听 语言变化
watchSwitchLang(() => {
  // 重新获取国际化的值
  dynamicData.value = getDynamicData()
  // 重新处理被勾选的列数据
  initSelectDynamicLabel()
})

// 创建被勾选的动态列数据
export const selectDynamicLabel = ref([])
// 默认全部勾选
const initSelectDynamicLabel = () => {
  selectDynamicLabel.value = dynamicData.value.map((item) => item.label)
}
initSelectDynamicLabel()

// 声明 table 的列数据
export const tableColumns = ref([])
// 监听选中项的变化，根据选中项动态改变 table 列数据的值
watch(
  selectDynamicLabel,
  (val) => {
    tableColumns.value = []
    // 遍历列数据,从中判断出当前列是否是被勾选的
    const selectData = dynamicData.value.filter((item) => {
      return val.includes(item.label)
    })
    tableColumns.value.push(...selectData)
  },
  {
    immediate: true
  }
)
