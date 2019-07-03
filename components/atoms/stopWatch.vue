<template>
    <div class="timer" v-if="timerDisplay">
        <div>{{timer}}</div>
        <button @click="start()">start</button>
        <button @click="stop()">stop</button>
        <button @click="reset()">reset</button>
        <div class="endform" v-if="endform">
            <input type="text" v-model="name" placeholder="名前">
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            timer:"00:00:000",
            startTime:null,
            elapsedTime:0,
            timerId:null,
            timeToadd:0,
            data:[],
            once:0,
            row:"",
            name:"",
            endform:false
        }
    },
    computed: {
        timerDisplay () {
            return this.$store.state.timerDisplay
        }
    },
    mounted() {
        const unwatch = this.$store.watch(
            state => state.lessdata,
            lessdata => {
                let nowtime = this.timer
                this.data.push({...lessdata, time:nowtime})
                if(this.once==0){
                    this.start()
                }else if(this.row !== null && this.row == lessdata.row ){
                    this.stop()
                    this.endTest()
                }
                this.once++
                this.row = lessdata.row
                console.log("Key : "+lessdata.key+"\nRow : "+lessdata.row+"\nHeight : "+lessdata.height+"\nTime : "+nowtime)
            }
        )
    },
    methods:{
        endTest(){
            this.endform == true
        },
        updateTimerText(){
            //m(分) = 135200 / 60000ミリ秒で割った数の商　-> 2分
            var m = Math.floor(this.elapsedTime / 60000);

            //s(秒) = 135200 % 60000ミリ秒で / 1000 (ミリ秒なので1000で割ってやる) -> 15秒
            var s = Math.floor(this.elapsedTime % 60000 / 1000);

            //ms(ミリ秒) = 135200ミリ秒を % 1000ミリ秒で割った数の余り
            var ms = this.elapsedTime % 1000;

            //HTML 上で表示の際の桁数を固定する　例）3 => 03　、 12 -> 012
            //javascriptでは文字列数列を連結すると文字列になる
            //文字列の末尾2桁を表示したいのでsliceで負の値(-2)引数で渡してやる。
            m = ('0' + m).slice(-2); 
            s = ('0' + s).slice(-2);
            ms = ('0' + ms).slice(-3);

            //HTMLのid　timer部分に表示させる　
            this.timer = m + ':' + s + ':' + ms;
        },
        countUp(){
            //timerId変数はsetTimeoutの返り値になるので代入する
            this.timerId = setTimeout(()=>{
                //経過時刻は現在時刻をミリ秒で示すDate.now()からstartを押した時の時刻(startTime)を引く
                this.elapsedTime = Date.now() - this.startTime + this.timeToadd;
                this.updateTimerText()
                //countUp関数自身を呼ぶことで10ミリ秒毎に以下の計算を始める
                this.countUp();
            //1秒以下の時間を表示するために10ミリ秒後に始めるよう宣言
            },10);
        },
        start(){
            //在時刻を示すDate.nowを代入
            this.startTime = Date.now();
            //再帰的に使えるように関数を作る
            this.countUp();
        },
        stop(){
            //タイマーを止めるにはclearTimeoutを使う必要があり、そのためにはclearTimeoutの引数に渡すためのタイマーのidが必要
            clearTimeout(this.timerId);
            //タイマーに表示される時間elapsedTimeが現在時刻かたスタートボタンを押した時刻を引いたものなので、
            //タイマーを再開させたら0になってしまう。elapsedTime = Date.now - startTime
            //それを回避するためには過去のスタート時間からストップ時間までの経過時間を足してあげなければならない。elapsedTime = Date.now - startTime + timeToadd (timeToadd = ストップを押した時刻(Date.now)から直近のスタート時刻(startTime)を引く)
            this.timeToadd += Date.now() - this.startTime;
        },
        reset(){
            //経過時刻を更新するための変数elapsedTimeを0にしてあげつつ、updateTimetTextで0になったタイムを表示。
            this.elapsedTime = 0;

            //リセット時に0に初期化したいのでリセットを押した際に0を代入してあげる
            this.timeToadd = 0;

            //updateTimerTextで0になったタイムを表示
            this.updateTimerText();
            this.once = 0
            this.row=""
            this.$emit('reset');
        }
    }
}
</script>

<style>
.timer{
    position: fixed;
    top: 0;
    right: 0;
    z-index: 10000;
}
</style>

