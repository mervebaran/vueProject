import { createStore } from 'vuex'
import comments from './modules/comments'

const store = createStore({
  modules: {
    comments
  },
  // Root state
  state: {
    version: '1.0.0'
  },
  // Root getters
  getters: {
    getVersion: state => state.version
  }
})

export default store 