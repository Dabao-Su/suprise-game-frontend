<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div id="lottie" :style="'height:' + fullHeight +'px; width: '+ fullWidth + 'px;'"></div>
</template>
<script>
//import lottie from 'lottie-web'
import * as animationData from '@/assets/lottie/openDoor.json'

export default {
  name: 'Trip',
  data () {
    return {
      lottie: this.$lottie,
      journeyId: this.$route.params.id,
      playName: this.$route.params.playName,
      lottie: {},
      fullHeight: document.documentElement.clientHeight,
      fullWidth: document.documentElement.clientWidth
    }
  },
  methods: {
    getBodyHeightAndWidth() {
      const that = this
      window.onresize = () => {
        return (
          () => {
            that.$router.go(0)
          }
        )()
      }
    },
    reloadAnimation() {
      var params = {
        container: document.getElementById('lottie'),
        renderer: 'html',
        loop: false,
        autoplay: true,
        animationData: animationData
      }
      this.lottie = this.$lottie.loadAnimation(params)
      this.lottie.addEventListener('complete',() => {this.lottie.goToAndStop(this.lottie.totalFrames -10,1)})
    }
  },
  mounted(){
    console.log(this.playName+" "+this.journeyId)
    this.getBodyHeightAndWidth()
    this.reloadAnimation()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body{
  background-color:#ffffff;
  margin: 0px;
  overflow: hidden;
}

#lottie{
  background-color:#ffffff;
  margin-left:0px;
  display:block;
  overflow: hidden;
  transform: translate3d(0,0,0);
  text-align: center;
  opacity: 1;
}
</style>
