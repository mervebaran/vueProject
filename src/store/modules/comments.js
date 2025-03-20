import axios from 'axios'

// State
const state = {
  comments: [],
  loading: false,
  error: null,
  selectedComment: null
}

// Getters
const getters = {
  getComments: state => state.comments,
  isLoading: state => state.loading,
  getError: state => state.error,
  getSelectedComment: state => state.selectedComment
}

// Mutations
const mutations = {
  SET_COMMENTS(state, comments) {
    state.comments = comments
  },
  SET_LOADING(state, status) {
    state.loading = status
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  SET_SELECTED_COMMENT(state, comment) {
    state.selectedComment = comment
  },
  UPDATE_COMMENT(state, updatedComment) {
    const index = state.comments.findIndex(c => c.id === updatedComment.id)
    if (index !== -1) {
      state.comments.splice(index, 1, updatedComment)
    }
  }
}

// Actions
const actions = {
  // Yorumları getir
  async fetchComments({ commit }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/comments')
      commit('SET_COMMENTS', response.data)
    } catch (error) {
      commit('SET_ERROR', 'Error fetching comments: ' + error.message)
      console.error('Error fetching comments:', error)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  // Yorum güncelle
  async updateComment({ commit }, comment) {
    commit('SET_ERROR', null)
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/comments/${comment.id}`,
        comment
      )
      commit('UPDATE_COMMENT', response.data)
      return true
    } catch (error) {
      commit('SET_ERROR', 'Error updating comment: ' + error.message)
      console.error('Error updating comment:', error)
      return false
    }
  },

  // Seçili yorumu güncelle
  setSelectedComment({ commit }, comment) {
    commit('SET_SELECTED_COMMENT', comment)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
} 