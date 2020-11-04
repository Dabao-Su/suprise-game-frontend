<template>
    <div class="wrapper">
      <el-steps :active="active" finish-status="success" class="padding12">
        <el-step title="输入昵称" description=""></el-step>
        <el-step title="选择场景" description=""></el-step>
        <el-step title="选择惩罚" description=""></el-step>
      </el-steps>

      <!--style="margin: 50px 10px; height: 50px; overflow: auto"-->
      <el-form ref="form" :model="journey" label-width="100px" label-position="left" class="form padding12 ">
        <el-form-item label="创建人昵称">
          <el-input v-model="journey.creatorName" autosize placeholder="请输入您的昵称，比如冰雪聪明的大宝"></el-input>
        </el-form-item>

        <el-form-item label="玩家昵称">
          <el-input v-model="journey.playerName" autosize placeholder="请输入玩家的昵称，比如可可爱爱的小哥"></el-input>
        </el-form-item>

        <el-form-item label="场景" v-if="active>=2">
          <el-select v-model="locations" multiple placeholder="请选择场景的地点"
                     :multiple-limit="5"	value-key="location" @change="addScene($event)">
            <el-option
              v-for="(publicScene,index) in publicScenes"
              :key="index"
              :label="publicScene.location"
              :value="publicScene">
            </el-option>
          </el-select>
        </el-form-item>

        <el-container v-for="(scene, index) in journey.scenes" :key="scene.id">
            <el-aside width="50px" :class="(index%2)==0?'even':'odd'"><slot style="color:brown">场景{{(index+1)}}</slot></el-aside>
            <el-main>
              <el-row>
                <el-col :span="5">
                  <el-tag type="success">地点</el-tag>
                </el-col>
                <el-col :span="18">
                  <el-input v-model="scene.location" autosize :disabled="true" placeholder=""></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-tag type="success">行为</el-tag>
                </el-col>
                <el-col :span="18">
                  <el-input v-model="scene.behavior" autosize placeholder=""></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-tag type="success">目的</el-tag>
                </el-col>
                <el-col :span="18">
                  <el-input v-model="scene.purpose" autosize placeholder=""></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-tag type="success">奖品</el-tag>
                </el-col>
                <el-col :span="18">
                  <el-input v-model="scene.prize" autosize placeholder="请输入奖品，例5元现金"></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-tag type="success">问题</el-tag>
                </el-col>
                <el-col :span="18">
                  <el-select v-model="scene.problem" placeholder="请选择">
                    <el-option
                      v-for="publicQuestion in publicQuestions"
                      :key="publicQuestion.id"
                      :label="publicQuestion.name"
                      :value="publicQuestion">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row v-if="scene.problem.trueAnswer != null">
                <el-col :span="1" :offset="4">
                  <i class="el-icon-check"></i>
                </el-col>
                <el-col :span="18">
                  <el-input v-model="scene.problem.trueAnswer" :disabled="true" autosize></el-input>
                </el-col>
              </el-row>
              <el-row v-if="scene.problem.wrongAnswer1 != null">
                <el-col :span="1" :offset="4">
                  <i class="el-icon-close"></i>
                </el-col>
                <el-col :span="18">
                  <el-input v-model="scene.problem.wrongAnswer1" :disabled="true" autosize></el-input>
                </el-col>
              </el-row>
              <el-row v-if="scene.problem.wrongAnswer2 != null">
                <el-col :span="1" :offset="4">
                  <i class="el-icon-close"></i>
                </el-col>
                <el-col :span="18">
                  <el-input v-model="scene.problem.wrongAnswer2" :disabled="true" autosize></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-tag type="success">提示</el-tag>
                </el-col>
                <el-col :span="18">
                  <el-button @click="addClue(scene)">增加</el-button>
                  <el-button @click="removeClue(scene)">删除</el-button>
                </el-col>
              </el-row>
              <el-row v-if="scene.clue != null">
                <el-col :span="18" :offset="5">
                  <el-tooltip class="item" effect="dark" content="对线下奖品的提示" placement="top-start">
                    <el-input v-model="scene.clue.name" type="textarea" autosize placeholder="请输入线索的提示"></el-input>
                  </el-tooltip>
                </el-col>
              </el-row>
            </el-main>
          </el-container>

        <el-form-item label="惩罚" v-if="active>=3">
          <el-select v-model="journey.punishments" multiple placeholder="请选择场景的地点"
                     :multiple-limit="5"	value-key="name" @change="addScene($event)">
            <el-option
              v-for="(publicPunishment,index) in publicPunishments"
              :key="index"
              :label="publicPunishment.name"
              :value="publicPunishment">
              <el-input v-model="publicPunishment.keyword" autosize placeholder="惩罚通过关键字"></el-input>
            </el-option>
          </el-select>
        </el-form-item>

        <!--
              <el-form-item v-for="(scene, index) in journey.scenes" :key="scene.id" :label="'场景'+(index+1)">
                <el-form-item label="地点">
                  <el-input v-model="scene.location" autosize :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="行为">
                  <el-input v-model="scene.behavior" autosize placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="困难">
                  <el-input v-model="scene.problem" autosize placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="目的">
                  <el-input v-model="scene.purpose" autosize placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="奖品">
                  <el-input v-model="scene.prize" autosize placeholder=""></el-input>
                </el-form-item>
              </el-form-item>
        -->

      </el-form>



      <div class="btn padding12">
        <el-button @click="next">下一步</el-button>
      </div>
    </div>
</template>

<script>
import {httpUtil} from "../util"
export default {
  name: "",
  data () {
    return {
      active: 1,
      locations: [],
      publicScenes: [],
      publicQuestions: [],
      publicPunishments: [],
      journey: {
        id: 0,
        isPublic: true,
        creatorName: '',
        playerName: '',
        punishmentFrequency: 0,
        scenes: [

        ],
        punishments: [
          {
            id: 0,
            name: '',
            keyword: '',
            isCanSkip: false
          }
        ]
      },
      sceneOnSelect: {
        id: 0,
        location: '',
        behavior: '',
        problem: '',
        purpose: '',
        prize: '',
        question: {
          id: 0,
          type: 0
        },
        clue: {
          id: 0,
          type: 1,
          name: '例：奖品可能在房间的抽屉里也可能在电视柜后面，快去找找吧',
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
    // this.getBodyHeightAndWidth()
  },
  created() {
    this.getAllPublicScenes()
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
    getAllPublicScenes(){
      httpUtil('/api/journey/getAllPublicScenes', 'POST', {}, 0).then((data) => {
        this.publicScenes = data
      })
      httpUtil('/api/journey/getAllPublicQuestionOrClues', 'POST', {"type":0}, 0).then((data) => {
        this.publicQuestions = data
      })
      httpUtil('/api/journey/getAllPublicPunishments', 'POST', {}, 0).then((data) => {
        this.publicPunishments = data
      })
    },
    addClue(scene){
      scene.clue = {
        id: 0,
        type: 1,
        name: '例：奖品可能在房间的抽屉里也可能在电视柜后面，快去找找吧',
      }
    },
    removeClue(scene){
      scene.clue = null
    },
    addScene(event){
      this.journey.scenes = event
    },
    next(){
      this.active += 1
    }
  }
}
</script>

<style scoped>
  .wrapper {
    height:  100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-sizing: border-box;
    background-color: #f0ffff75;
  }
  .form {
    flex: 1;
    overflow: scroll;
    border-top: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
  }
  .btn {
    display: flex;
    justify-content: flex-end;
  }
  .padding12 {
    padding: 12px;
  }

  .el-form-item {
    margin-bottom: 12px;
  }

  .margin-bottom12 {
    margin-bottom: 12px;
  }
  .odd {
      text-align: center;
      line-height: 330px;
      font-size: 15px;
      color: #407434;
      border-right: 5px solid #bcd07f70;
      display: flex;
      flex-direction: column;
      justify-content: center;
  }
  .even {
      text-align: center;
      line-height: 330px;
      font-size: 15px;
      color: #407434;
      border-right: 5px solid darkolivegreen;
      display: flex;
      flex-direction: column;
      justify-content: center;
  }

  .el-select {
    width: 60vw;
  }

  .el-row{
    margin-bottom: 12px;
    margin-right: 12px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .el-tag {
    height: 40px;
    padding: 5px 10px;
    line-height: 30px;
    border-color: #8cc56f;
  }
</style>
