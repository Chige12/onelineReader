<template>
  <v-app id="stopWatch">
    <div>
      <div class="timer" v-if="timerDisplay">
        <div>{{ timer }}</div>
        <button @click="start()">start</button>
        <button @click="stop()">stop</button>
        <button @click="reset()">reset</button>
      </div>
      <div class="endform" v-if="endform">
        <div class="endform_wrapper">
          <h2>お疲れさまでした。</h2>
          <form>
            <h3>名前を入力してください</h3>
            <v-row align="center">
              <v-col cols="12" sm="6">
                <v-select
                  :items="nameList"
                  v-model="select_name"
                  label="過去の名前リストから選択"
                  @change="updateSubjectNameSelect()"
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  type="text"
                  v-model="name"
                  label="名前入力"
                  @change="updateSubjectName()"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <div v-if="questionData">
              <h3>以下の質問に答えてください</h3>
              <div
                v-for="(question, question_id) in questionData"
                :key="`question-${question_id}`"
              >
                <div class="question_box">
                  <p class="question_text">
                    {{ question.Q }}
                  </p>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      type="text"
                      v-model="questionAnswer[question_id]"
                      placeholder="答え"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </div>
              </div>
            </div>
          </form>
          <v-btn color="#64DD17" @click="fileParse">決定</v-btn>
          <v-btn @click="reset">キャンセル</v-btn>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import colors from "vuetify/lib/util/colors";

export default {
  data() {
    return {
      timer: "00:00:000",
      startTime: null,
      elapsedTime: 0,
      timerId: null,
      timeToadd: 0,
      data: [],
      once: 0,
      row: "",
      name: "",
      select_name: "",
      endform: false,
      timerRun: false,
      questionAnswer: []
    };
  },
  computed: {
    nameList() {
      const unique_users = this.$store.getters["listup/unique_users"];
      return unique_users;
    },
    timerDisplay() {
      return this.$store.state.timerDisplay;
    },
    questionData() {
      return this.$store.state.questionData;
    }
  },
  mounted() {
    const unwatch = this.$store.watch(
      state => state.lessdata,
      lessdata => {
        let nowtime = this.timer;
        let nowrow = document.getElementById(`pg_${lessdata.row}`);
        let word;
        if (nowrow) {
          word = nowrow.innerText.length;
        } else {
          word = null;
        }
        this.data.push({ ...lessdata, time: nowtime, word: word });
        if (lessdata.key === "Enter") {
          if (this.timerRun) {
            this.stop();
            this.endTest();
          } else {
            this.start();
          }
        } else {
          if (this.once == 0) {
            this.start();
          } else if (this.row !== null && this.row == lessdata.row) {
            this.stop();
            this.endTest();
          }
          this.once++;
          this.row = lessdata.row;
          console.log(
            "Key : " +
              lessdata.key +
              "\nRow : " +
              lessdata.row +
              "\nHeight : " +
              lessdata.height +
              "\nTime : " +
              nowtime +
              "\nWord : " +
              word
          );
        }
      }
    );
  },
  methods: {
    endTest() {
      this.endform = true;
      this.name = this.$store.state.listup.subject_name;
    },
    judgment() {
      var judgment = [];
      for (let i = 0; i < this.questionData.length; i++) {
        judgment[i] = {
          Answer: this.questionAnswer[i],
          Model: this.questionData[i].A
        };
      }
      return judgment;
    },
    updateSubjectNameSelect() {
      this.name = this.select_name;
      this.$store.commit("listup/updateSubjectName", this.name);
    },
    updateSubjectName() {
      this.$store.commit("listup/updateSubjectName", this.name);
    },
    yyyymmddhhmi() {
      let date = new Date();
      let yyyy = date.getFullYear();
      let mm = ("0" + date.getMonth()).slice(-2);
      let dd = ("0" + date.getDate()).slice(-2);
      let hh = ("0" + date.getHours()).slice(-2);
      let mi = ("0" + date.getMinutes()).slice(-2);
      return `${yyyy}-${mm}-${dd}_${hh}-${mi}`;
    },
    fileParse() {
      let whiteoutData = this.$store.state.whiteout;
      let crack_pxData = this.$store.state.crack_px;
      let storyData = this.$store.state.storyData;
      let judgmentData = this.judgment();
      let testFileData = {
        name: this.name,
        data: this.data,
        whiteout: whiteoutData,
        crack_px: crack_pxData,
        judgment: judgmentData,
        story: storyData
      };
      let todayText = this.yyyymmddhhmi();
      let filename = `${todayText}_${storyData.id}_${this.name}.json`;
      var resultJson = JSON.stringify(testFileData);
      // this.fileUpload(resultJson, filename)
      this.fileDownload(resultJson, filename);
      this.reset();
    },
    fileDownload(file, filename) {
      var downLoadLink = document.createElement("a");
      downLoadLink.download = filename;
      downLoadLink.href = URL.createObjectURL(
        new Blob([file], { type: "text.plain" })
      );
      downLoadLink.dataset.downloadurl = [
        "text/plain",
        downLoadLink.download,
        downLoadLink.href
      ].join(":");
      downLoadLink.click();
    },
    doWriteFile() {
      client.authenticate(function(error, client) {
        if (error) {
          alert("Error: " + error);
        } else {
          client.writeFile("hello.txt", "Hello, World!", function(error) {
            if (error) {
              alert("Error: " + error);
            } else {
              alert("File written successfully!");
            }
          });
        }
      });
    },
    updateTimerText() {
      //m(分) = 135200 / 60000ミリ秒で割った数の商　-> 2分
      var m = Math.floor(this.elapsedTime / 60000);

      //s(秒) = 135200 % 60000ミリ秒で / 1000 (ミリ秒なので1000で割ってやる) -> 15秒
      var s = Math.floor((this.elapsedTime % 60000) / 1000);

      //ms(ミリ秒) = 135200ミリ秒を % 1000ミリ秒で割った数の余り
      var ms = this.elapsedTime % 1000;

      //HTML 上で表示の際の桁数を固定する　例）3 => 03　、 12 -> 012
      //javascriptでは文字列数列を連結すると文字列になる
      //文字列の末尾2桁を表示したいのでsliceで負の値(-2)引数で渡してやる。
      m = ("0" + m).slice(-2);
      s = ("0" + s).slice(-2);
      ms = ("0" + ms).slice(-3);

      //HTMLのid　timer部分に表示させる
      this.timer = m + ":" + s + ":" + ms;
    },
    countUp() {
      //timerId変数はsetTimeoutの返り値になるので代入する
      this.timerId = setTimeout(() => {
        //経過時刻は現在時刻をミリ秒で示すDate.now()からstartを押した時の時刻(startTime)を引く
        this.elapsedTime = Date.now() - this.startTime + this.timeToadd;
        this.updateTimerText();
        //countUp関数自身を呼ぶことで10ミリ秒毎に以下の計算を始める
        this.countUp();
        //1秒以下の時間を表示するために10ミリ秒後に始めるよう宣言
      }, 10);
    },
    start() {
      //在時刻を示すDate.nowを代入
      this.startTime = Date.now();
      //再帰的に使えるように関数を作る
      this.countUp();
      this.timerRun = true;
    },
    stop() {
      //タイマーを止めるにはclearTimeoutを使う必要があり、そのためにはclearTimeoutの引数に渡すためのタイマーのidが必要
      clearTimeout(this.timerId);
      //タイマーに表示される時間elapsedTimeが現在時刻かたスタートボタンを押した時刻を引いたものなので、
      //タイマーを再開させたら0になってしまう。elapsedTime = Date.now - startTime
      //それを回避するためには過去のスタート時間からストップ時間までの経過時間を足してあげなければならない。elapsedTime = Date.now - startTime + timeToadd (timeToadd = ストップを押した時刻(Date.now)から直近のスタート時刻(startTime)を引く)
      this.timeToadd += Date.now() - this.startTime;
      this.timerRun = false;
    },
    reset() {
      //経過時刻を更新するための変数elapsedTimeを0にしてあげつつ、updateTimetTextで0になったタイムを表示。
      this.elapsedTime = 0;

      //リセット時に0に初期化したいのでリセットを押した際に0を代入してあげる
      this.timeToadd = 0;

      //updateTimerTextで0になったタイムを表示
      this.updateTimerText();
      this.once = 0;
      this.row = "";
      this.endform = false;
      this.$emit("reset");
    }
  }
};
</script>

<style lang="scss">
.timer {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10000;
}
.endform {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20000;
  width: 100vw;
  height: 100vh;
  background: rgba(#000, 0.7);
}
.endform_wrapper {
  position: fixed;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20000;
  width: 980px;
  height: 700px;
  background: #fff;
  overflow-y: overlay;
  padding: 60px;
}
.question_box {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  .v-text-field__details {
    display: none;
  }
}
.question_text {
  line-height: 2;
  margin: 12px 0;
}
.success_btn {
  color: white;
}
</style>
