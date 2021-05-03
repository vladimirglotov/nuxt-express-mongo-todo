<template>
  <header
    class="dark:bg-black bg-gray-200 min-w-full shadow-lg flex flex-col items-center"
  >
    <form
      class="flex md:max-w-lg flex-row justify-between flex-nowrap py-10"
      @submit.prevent="sayhello"
    >
      <input
        v-model="title"
        placeholder="Enter a new task"
        class="w-56 md:w-80 p-1 px-2 dark:text-gray-200 rounded-md focus:outline-none focus:ring-1 ring-1 ring-gray-800 focus:ring-red-600 focus:border-transparent dark:bg-gray-800"
        type="search"
        autofocus
      >
      <button
        :disabled="!title"
        class="mx-2 md:ml-8 dark:bg-gray-800 py-1 px-3 dark:text-gray-200 ring-1 ring-red-600 hover:bg-white rounded-md focus:outline-none"
        type="submit"
      >
        Create
      </button>
    </form>
  </header>
</template>

<script>
export default {
  data: () => ({
    title: ''
  }),
  methods: {
    async sayhello ({ $store }) {
      try {
        const title = this.title
        await this.$store.dispatch('CREATE_TODO', title)
        this.title = ''
      } catch (error) {
        this.title = ''
      }
    }
  }
}
</script>
