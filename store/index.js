export const state = () => ({
  todos: [],
  error: null
})

export const mutations = {
  SET_TODOS (state, todos) {
    state.todos = todos
  },
  ADD_TODO (state, todo) {
    state.todos.unshift(todo)
  },
  EDIT_TODO_STATUS (state, newTodo) {
    state.todos = state.todos.map((todo) => {
      if (todo._id === newTodo._id) {
        todo = newTodo
      }
      return todo
    })
  },
  DELETE_TODO (state, id) {
    state.todos = state.todos.filter(todo => todo._id !== id)
  },
  SET_ERROR (state, error) {
    state.error = error
  },
  CLEAR_ERROR (state) {
    state.error = null
  }
}

export const actions = {
  async CREATE_TODO ({ commit, dispatch }, title) {
    try {
      const formData = { title }
      const todo = await this.$axios.$post('/api/todos/create', formData)
      commit('ADD_TODO', todo)
    } catch (error) {
      dispatch('SHOW_ERROR', error)
      throw error
    }
  },
  ADD_TO_STATE ({ commit }, todos) {
    commit('SET_TODOS', todos)
  },
  async REMOVE_TODO ({ commit, dispatch }, id) {
    try {
      await this.$axios.$delete(`api/todos/delete/${id}`)
      commit('DELETE_TODO', id)
    } catch (error) {
      dispatch('SHOW_ERROR', error)
      throw error
    }
  },
  async CHANGE_TODO_STATUS ({ commit, dispatch }, data) {
    try {
      const todoWithNewStatus = await this.$axios.$put(`api/todos/update/${data.id}`, data)
      commit('EDIT_TODO_STATUS', todoWithNewStatus)
    } catch (error) {
      dispatch('SHOW_ERROR', error)
      throw error
    }
  },
  SHOW_ERROR ({ commit }, error) {
    commit('SET_ERROR', error.message)
    setTimeout(() => {
      commit('CLEAR_ERROR')
    }, 3000)
  }
}

export const getters = {
  ERROR (state) {
    return state.error
  }
}
