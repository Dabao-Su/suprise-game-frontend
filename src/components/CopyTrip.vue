<template>
  <div>
    <el-select v-model="journeys" placeholder="请选择">
      <el-option
        v-for="journey in journeys"
        :key="journey.id"
        :label="journey.creatorName"
        :value="journey.id">
      </el-option>
    </el-select>
    <el-table
      :data = "journeys"
      highlight-current-row
      :height=fullHeight
      :width=fullWidth
      :row-style="{height: '0'}"
      :cell-style="{padding: '0'}">
      <el-table-column
        label="旅程创建人"
        prop="creatorName">
      </el-table-column>
      <el-table-column label="场景">
        <template slot-scope="props">
          <el-collapse>
            <el-collapse-item v-for="(scene, index) in props.row.scenes" :key="scene.id"
                              :title="'场景'+scene.id+'：'+scene.location" :name=index>
              <div>
                <span>行为：{{ scene.behavior }}</span><br>
                <span>困难：{{ scene.problem }}</span><br>
                <span>目的：{{ scene.purpose }}</span><br>
                <div>
                  <span>问题：{{ scene.question.name }}，正确答案：A</span><br>
                  <ul>
                    <li>
                      A：{{scene.question.trueAnswer}}<br>
                    </li>
                    <li>
                      B：{{scene.question.wrongAnswer1}}<br>
                    </li>
                    <li>
                      C：{{scene.question.wrongAnswer2}}<br>
                    </li>
                  </ul>
                </div>
                <div>
                  <span>线索：{{ scene.clue.name }}，正确答案：A</span>
                  <ul>
                    <li>
                      A：{{scene.clue.trueAnswer}}<br>
                    </li>
                    <li>
                      B：{{scene.clue.wrongAnswer1}}<br>
                    </li>
                    <li>
                      C：{{scene.clue.wrongAnswer2}}<br>
                    </li>
                  </ul>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>

          <!--<el-carousel >
            <el-carousel-item v-for="(scene, index) in props.row.scenes" :key="scene.id">
            </el-carousel-item>
          </el-carousel>
          -->

          <!--         <el-form label-position="left" inline class="demo-table-expand" >
                     <el-form-item v-for = "(scene, index) in props.row.scenes"
                       :label="'场景' + index"
                       :key="id"
                       :prop="'scene.' + index"
                     >
                       <span>地点：{{scene.location}}</span>
                       <span>行为：{{scene.behavior}}</span>
                       <span>困难：{{scene.problem}}</span>
                       <span>目的：{{scene.purpose}}</span>
                       <span>问题：{{scene.question.name}}{{scene.question.trueAnswer}}</span>
                       <span>线索：{{scene.clue.name}}{{scene.clue.trueAnswer}}</span>
                     </el-form-item>
                   </el-form>-->

          <!--          <el-table :data="props.row.scenes" >
                      <el-table-column
                        label="地点"
                        prop="location">
                      </el-table-column>
                      <el-table-column
                        label="行为"
                        prop="behavior">
                      </el-table-column>
                      <el-table-column
                        label="困难"
                        prop="problem">
                      </el-table-column>
                      <el-table-column
                        label="目的"
                        prop="purpose">
                      </el-table-column>
                      <el-table-column
                        label="问题"
                        prop="question.name">
                      </el-table-column>
                    </el-table>-->
        </template>

      </el-table-column>
      <el-table-column label="惩罚">
        <template slot-scope="props">
          <div v-if="props.row.punishmentFrequency != 0">
            <span>每隔失败 {{props.row.punishmentFrequency}} 个场景将出现惩罚</span>
            <ul>
              <li v-for="(punishment, index) in props.row.punishments" :key="punishment.id">
                {{punishment.name}}<br>
              </li>
            </ul>
          </div>

          <!-- <span v-for="(punishment, index) in props.row.punishments" :key="punishment.id">
            惩罚{{index}}{{punishment.name}}<br>
          </span>-->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {httpUtil} from "../util"
export default {
  name: "",
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
      },
      fullHeight: document.documentElement.clientHeight,
      fullWidth: document.documentElement.clientWidth
    }
  },
  mounted() {
    this.getBodyHeightAndWidth()
    this.getPublicJourney()
  },
  created() {
    this.getPublicJourney()
  },
  methods:{
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
    getPublicJourney(){
      httpUtil('/api/journey/getAllPublicJourneys', 'POST', {}, 0).then((data) => {
        this.journeys = data
        // console.log(this.journeys)
      })
      // this.journeys = [{"id":1,"creatorName":"智商超群风趣幽默的大宝","playerName":null,"scenes":[{"id":1,"location":"撒哈拉大沙漠","behavior":"跋山涉水了好多天","problem":"水喝光了但至今未找到水源","purpose":null,"prize":"大美女的香吻一个","question":{"id":1,"type":0,"name":"以下哪个关于撒哈拉的传说不是真的","trueAnswer":"西瓜来自撒哈拉,由骑着撒哈拉双峰骆驼的商人经丝绸之路传入新疆","wrongAnswer1":"三毛说过:每想你一次,天上飘落一粒沙,从此形成了撒哈拉","wrongAnswer2":"撒哈拉沙漠每年给亚马逊热带雨林输送了大量的矿物质沙尘,滋润了亚马逊盆地"},"clue":{"id":2,"type":1,"name":"这都能答错？","trueAnswer":"看下大鱼缸底部的桌布下面有什么吧","wrongAnswer1":"行吧第一个问题就当送分题好了","wrongAnswer2":"看你这么可怜的份上"}},{"id":2,"location":"冰岛蓝湖温泉","behavior":"舒舒服服的泡了半天澡","problem":"正要离开的时候发现衣服不见了","purpose":null,"prize":"去鱼缸底下你会看到一张纸打开它","question":{"id":3,"type":0,"name":"以下哪个关于冰岛的传说是真的","trueAnswer":"是世界上温泉最多的国家，所以还被成为\"冰与火之国\"","wrongAnswer1":"冰岛的绿灯都是小心心形状的","wrongAnswer2":"为保证马血统的纯正,出了冰岛国门的马每次回国都需要通过严格的全身检测,检测不通过将终身不能再进入冰岛"},"clue":{"id":4,"type":1,"name":"","trueAnswer":"","wrongAnswer1":"","wrongAnswer2":""}}],"punishments":[{"id":1,"name":"穿女装且旅程结束前不能脱下","keyword":"你好帅","canSkip":false},{"id":2,"name":"跳一段舞并用手机录下来","keyword":"卡哇伊","canSkip":false},{"id":3,"name":"将之前录下来的跳舞视频发到朋友圈","keyword":"你好帅","canSkip":true}],"punishmentFrequency":1,"public":true}]
      // console.log(this.journeys)
    }
  }
}
</script>

<style scoped>

</style>
