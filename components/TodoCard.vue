<template>
  <li v-bind:class="{ 'opacity-40': done }" class="md:w-52">
    <div
      class="md:p-1 md:px-3 pt-3 md:py-0 max-w-sm md:max-w-none md:flex flex-row text-center md:text-left"
    >
      <p
        @click="changeStatus(id, done)"
        v-bind:class="{ 'line-through': done }"
        class="text-base flex-grow mr-4 dark:text-white font-semibold cursor-pointer"
      >
        {{ title }}
      </p>
      <div class="mr-4 py-3 md:py-0">
        {{ new Date(date).toLocaleTimeString() }}
      </div>
      <div
        @click.stop="deleteTodo(id)"
        class="text-xs md:leading-7 md:mx-3 pb-3 md:py-0 text-gray-400 cursor-pointer"
      >
        &#10008;
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    id: String,
    title: String,
    date: String,
    done: Boolean
  },
  methods: {
    async changeStatus (id, done) {
      const data = {
        id, done
      }
      await this.$store.dispatch('CHANGE_TODO_STATUS', data)
    },
    async deleteTodo (id) {
      try {
        const wantDelete = confirm('Delete todo?')
        if (wantDelete) {
          await this.$store.dispatch('REMOVE_TODO', id)
        }
      } catch (e) {
      }
    }
  }
}
</script>


