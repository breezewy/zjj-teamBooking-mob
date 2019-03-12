<template>
  <cube-input
    v-model="value"
    :clearable="clearable"
  >
    <span slot="append">afasdfas</span>
  </cube-input>
</template>

<script>
  export default {
    data() {
      return {
        value: '',
        clearable: {
          visible: true,
          blurHidden: true
        }
      }
    },
    methods: {
      submitHandler(e) {
        e.preventDefault()
        console.log('submit', e)
      },
      validateHandler(result) {
        this.validity = result.validity
        this.valid = result.valid
        console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
      },
      resetHandler(e) {
        console.log('reset', e)
      }
    },

  }
</script>

<style scoped>

</style>
