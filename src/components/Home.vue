<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div>
      <h1>创建属于你和你小伙伴专属的奇幻之旅吧</h1>
      <router-link to="/newTrip">自己动手丰衣足食</router-link>
      <router-link to="/copyTrip">复制别人的奇思妙想</router-link>
<!--      <button @click="getPublicJourney()">复制别人的奇思妙想</button>-->
<!--      <button @click="@/compoents/CopyTrip">复制别人的奇思妙想</button>-->


<!--    <el-select v-model="journey" placeholder="请选择已有的旅程" @focus="getPublicJourney()">-->
<!--        <el-option-->
<!--          v-for="journey in journeys"-->
<!--          :key="journey.id"-->
<!--          :label="journey.creatorName"-->
<!--          :value="journey.id">-->
<!--        </el-option>-->
<!--    </el-select>-->


  </div>
</template>
<script>
import lottie from 'lottie-web'
import {httpUtil} from "../util"

export default {
  name: 'Home',
  data () {
    return {
      journeys: [
        {
        id: 0,
        isPublic: true,
        creatorName: '',
        playerName: '',
        punishmentFrequency: 0,
        scenes: [],
        punishments: []
        }
      ],
      scenes: [],
      punishments: [],
      journey: {
        id: 0,
        isPublic: true,
        creatorName: '',
        playerName: '',
        punishmentFrequency: 0,
        scenes: [],
        punishments: []
      },
      scene: {
        id: 0,
        location: '',
        behavior: '',
        problem: '',
        purpose: '',
        prize: '',
        question: {
          id: 0
        },
        question: {
          id: 0
        }
      },
      punishment: {
        id: 0,
        name: '',
        keyword: '',
        isCanSkip: false
      }
    }
  },
  methods: {
    getAllPublicScenes(pageNum, pageSize){
      var param = {
        pageNum: pageNum,
        pageSize: pageSize
      }
      this.axios({
        method: 'post',
        url: '/api/journey/getAllPublicScenes',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: this.$qs.stringify(param)
      });
    }
  },
  mounted(){

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
