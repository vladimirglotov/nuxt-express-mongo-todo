<template>
  <main class="flex card p-3 items-center flex-col w-10/12 lg:w-3/4 xl:w-7/12">
    <ul
      class="md:p-1 dark:text-white w-full max-w-sm md:max-w-none text-center md:text-left cursor-default"
    >
      <TodoCard
        v-for="todo in todos"
        :id="todo._id"
        :key="todo._id"
        :title="todo.title"
        :date="todo.date"
        :done="todo.done"
        class="md:flex shadow-lg bg-white dark:bg-gray-800 flex-col rounded-xl my-4 md:min-w-full"
      />
    </ul>
    <div v-if="!todos.length">You have no taks yet.</div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import TodoCard from '../components/TodoCard'
export default {
  async asyncData ({ $axios, store }) {
    try {
      const data = await $axios.$get('/api/todos')
      await store.dispatch('ADD_TO_STATE', data)
    } catch (error) {
      store.dispatch('SHOW_ERROR', error)
    }
  },
  head () {
    return {
      title: 'Users'
    }
  },
  components: {
    TodoCard
  },
  computed: {
    ...mapState(['todos'])
  }
}
</script>
