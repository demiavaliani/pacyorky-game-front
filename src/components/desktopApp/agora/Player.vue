<template>
<div style="display: none" :id="domId"></div>
</template>

<script>
export default {
  name: "Player",
  props: [
    'stream',
    'domId',
  ],
  mounted () {
    this.$nextTick(function () {
      if (this.stream && !this.stream.isPlaying()) {
        this.stream.play(`${this.domId}`, {fit: 'cover'}, (err) => {
          if (err && err.status !== 'aborted') {
            console.warn('trigger autoplay policy')
          }
        })
      }
    })
  },
  beforeDestroy () {
    if (this.stream) {
      if (this.stream.isPlaying()) {
        this.stream.stop()
      }
      this.stream.close()
    }
  }
}
</script>

<style scoped>

</style>