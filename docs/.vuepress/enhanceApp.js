import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// self components
import LyCom from 'ly-com'
import 'ly-com/lib/theme-chalk/search-table.css'

export default (({ Vue }) => {
    Vue.use(ElementUI);
    Vue.use(LyCom)
})
