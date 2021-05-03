<template>
  <div
    class="items-center min-h-screen pb-2 flex-col flex bg-gray-300 dark:bg-gray-600"
  >
    <div
      v-if="error"
      class="fixed"
    >
      {{ error }}
    </div>
    <InputForm />
    <Nuxt />
  </div>
</template>

<script>
import InputForm from '../components/InputForm'
export default {
  components: { InputForm },
  computed: {
    error () {
      return this.$store.getters.ERROR
    }
  }
}
</script>

<style>
</style>
