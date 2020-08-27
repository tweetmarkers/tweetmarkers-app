<template>
  <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" @click="handleToggle">
    <path :d="start" stroke="none" fill="#1fa0f2">
      <animate
          attributeName="d"
          :from="start"
          :to="end"
          begin="2s"
          dur="2s"
          fill="freeze"
          ref="animation"
          @endEvent="handleAnimateEnd" />
    </path>
  </svg>
</template>

<script>
export default {
  data() {
    return {
      start: 'M10 10 V190 L100 110 L190 190 L190 10 L10 10',
      end: 'M10 10 V190 L190 170 L110 100 L190 30 L10 10',
      reverse: false,
      ready: false
    }
  },
  methods: {
    handleToggle() {
      if (this.ready) {
        this.ready = false
        const start = this.start

        this.start = this.end
        this.end = start

        this.$refs.animation.beginElement()
      }
    },
    handleAnimateEnd() {
      this.ready = true
    }
  }
}
</script>
