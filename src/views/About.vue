<template>
  <div>
    <v-row justify="center">
    <v-col cols=10 lg=7 md=8 sm=9>
      <div
        v-observe-visibility="{
        callback: visibilityChanged01,
        intersection: {
          threshold: 0.1,
        }}"
        v-bind:class='{active:isVisible01}'
        class="inactive mt-10"
        >
        <v-col cols=12 lg=12 md=12 sm=12 class="mb-12 itemsubject">会社概要</v-col>
          <v-row no-gutters class="itemcontents" v-for="(content) in contents" :key="content.subject">
            <v-col cols=6 lg=6 md=6 sm=6 align="center"><span class="itemcontent">{{content.subject}}</span></v-col>
            <v-col cols=6 lg=6 md=6 sm=6 align="center"><span class="itemcontent">{{content.subjectvalue}}</span></v-col>
          </v-row>
          <br><br>
        <v-col cols=12 lg=12 md=12 sm=12 class="mt-12 mb-12 itemsubject">特定商取引法表記</v-col>
          <v-row no-gutters class="itemcontents" v-for="(privacy) in privacys" :key="privacy.subject">
            <v-col cols=6 lg=6 md=6 sm=6 align="center"><span class="itemcontent">{{privacy.subject}}</span></v-col>
            <v-col cols=6 lg=6 md=6 sm=6 align="center"><span class="itemcontent">{{privacy.subjectvalue}}</span></v-col>
          </v-row>
      </div>
    </v-col>
    </v-row>
    <div class="pretap"><router-link :to="{ name: 'home' }" tag="div"><span></span>Home</router-link></div>
  </div>
</template>

<style scoped>
.itemcontents{
  margin-bottom: 7%;
  border-bottom:solid 2px lightgray;
}

.itemcontent{
  width:100%;
  height:auto;
  font-size: calc(0.75rem + ((0.35vw - 4.8px) * 0.9677));
  word-wrap: break-word;
  font-weight:300;
}

.itemsubject{
  text-align:center;
  width:100%;
  height:auto;
  font-size: calc(0.75rem + ((1.5vw - 4.8px) * 0.9677));
  word-wrap: break-word;
  font-weight:900;
}

.pretap{
  color:#B759C7;
  font-weight:700;
  font-size:16px;
  position: fixed;
  bottom: 40%;
  left: 10%;
  z-index: 2;
  display: inline-block;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
  -webkit-transform: rotate(-45deg);
  transform: rotate(-270deg);
  text-decoration: none;
  padding-top: 40px;
}

.pretap span {
  position: fixed;
  top: 0;
  left: 50%;
  width: 20px;
  height: 20px;
  margin-left: -12px;
  border-left: 1px solid #B759C7;
  border-bottom: 1px solid #B759C7;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-animation: sdb 2s infinite;
  animation: sdb 2s infinite;
  box-sizing: border-box;
}
 


.inactive{
  opacity:0;
  margin-top: 10%;
}
.active{
  animation-name:fade-in;
  animation-duration:1.5s;
  animation-timing-function: ease-out;
  animation-delay:0s;
  animation-iteration-count:1;
  animation-direction:normal;
  animation-fill-mode: forwards;
}
@keyframes fade-in {
  0% {opacity: 0; transform: translate3d(0,-20px,0);}
  100% {opacity: 1; transform: translate3d(0,0,0);}
}

@-webkit-keyframes sdb {
  0% {
    -webkit-transform: rotate(-45deg) translate(0, 0);
  }
  20% {
    -webkit-transform: rotate(-45deg) translate(-10px, 10px);
  }
  40% {
    -webkit-transform: rotate(-45deg) translate(0, 0);
  }
}
@keyframes sdb {
  0% {
    transform: rotate(-45deg) translate(0, 0);
  }
  20% {
    transform: rotate(-45deg) translate(-10px, 10px);
  }
  40% {
    transform: rotate(-45deg) translate(0, 0);
  }
}

</style>

<script>
import { VueTyper } from 'vue-typer'
import { ObserveVisibility }from 'vue-observe-visibility'

export default {
  components:{
    VueTyper,
    ObserveVisibility,
  },
  data(){
    return{
      contents:[
        {subject:'会社名',subjectvalue:'ikuyo'},
        {subject:'設立',subjectvalue:'2020年1月'},
        {subject:'代表',subjectvalue:'平川真衣　西峯優輝'},
        {subject:'事業内容',subjectvalue:'衣料品や雑貨などの製造、販売業務'},
      ],
      privacys:[
        {subject:'販売事業者名',subjectvalue:'ikuyo（イクヨ）'},
        {subject:'ストア運営責任者',subjectvalue:'西峯優輝'},
        {subject:'問い合わせ',subjectvalue:'Email:ikuyoclub@gmail.com　                                                                                                                      Tel:080-2332-8668'},
        {subject:'お支払い方法',subjectvalue:'クレジットカード'},
        {subject:'商品代金以外の料金',subjectvalue:'送料一律500円(沖縄・離島を除く)'},
        {subject:'代金の支払い時期',subjectvalue:'注文時'},
        {subject:'商品の引き渡し時期',subjectvalue:'ご注文確認後3〜4週間以内の発送になります'},
        {subject:'販売価格',subjectvalue:'各商品の販売ページに記載してある価格の通りです。'},
        {subject:'返品・交換',subjectvalue:'万が一の不良品、または明らかに商品説明、写真と異なる商品は良品との交換に対応致しますので、お手数ですが商品到着後、10日以内にご連絡ください。お客様のご都合による返品・交換は原則お受けできません。'},
        {subject:'プライバシーポリシー',subjectvalue:'当サイトはお客様のプライバシーを第一に考え運営しております。お客様の個人情報は厳正な管理の下で安全に蓄積・保管しております。当該個人情報は法律によって要求された場合、あるいは当社の権利や財産を保護する必要が生じた場合のぞき、第３者に提供することはありません。'},
      ],
      isVisible:true,
      isVisible01: false,
    }
  },
   methods: {
      visibilityChanged01(isVisible01, entry) {
        this.isVisible01 = isVisible01
      },
  }
}
</script>