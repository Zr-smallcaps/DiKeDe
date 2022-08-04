import TableItem from './table/index.vue'
import NewButton from './NewButton/index.vue'
export default {
  install(Vue) {
    Vue.component('TableItem', TableItem)
    Vue.component('NewButton', NewButton)
  }
}