<template>
  <div>
    <!-- ローディング画面 -->
    <loading v-show="screenloading"/>
    <!-- 本画面 -->    
    <div v-show="!screenloading">
      <v-form ref="form" v-model="valid" class="ml-3 mr-3 mt-12" style="font-family: 'Courier New', Courier, monospace">
        <v-container>
          <v-col cols=12 lg=12 md=12 sm=12 v-show="totalPrice!=0" class="pb-0 bigsize" style="border-bottom:solid">お支払い金額　{{totalPrice + 500}}円(税込)</v-col>
          <v-col v-show="totalPrice!=0" class="mt-0 pt-0b basesize">※送料は一律500円頂いております</v-col>
          <v-col v-show="totalPrice==0">Cart　is　empty</v-col> 
          <v-col cols=12 lg=12 md=12 sm=12 style="border-bottom:solid" class="pb-0 bigsize">購入商品</v-col>
          <v-row  align="center" justify="center" v-for="(item,index) in items" :key="index" class="basesize">
            <v-col cols=7 lg=7 md=7 sm=7><v-img :src="getCartItem(item,item[0].itemid).image" width="50%" style="margin:0 auto"></v-img></v-col>
            <v-col cols=5 lg=5 md=5 sm=5 class="mt-2">
              <v-col>{{item[0].name}}</v-col>
              <v-col>{{item[0].price}} yen</v-col>
              <v-col>{{getCartItem(item,item[0].itemid).listItem}}</v-col>
            </v-col>
          </v-row>
        
          <v-col cols=12 lg=12 md=12 sm=12 style="border-bottom:solid" class="mt-12 mb-0 pb-0 bigsize">
            お届け先情報入力
          </v-col>
          <v-col cols=12 lg=12 md=12 sm=12 class="mt-0 mb-3 basesize">
            ※お届け先情報の入力、利用規約への同意が必須です。
          </v-col>
          
          <v-col cols=4 lg=4 md=4 sm=4>
            <v-text-field
            v-model="familyname"
            :rules="familynameRules"
            label="姓"
            required
            >
            </v-text-field>
          </v-col>
          
          <v-col cols=4 lg=4 md=4 sm=4>
            <v-text-field
            v-model="firstname"
            :rules="firstnameRules"
            label="名"
            required
            >
            </v-text-field>
          </v-col>
        
          <v-col cols=10 lg=10 md=10 sm=10>
            <v-text-field
            v-model="options.address_line2"
            :rules="emailRules"
            label="メールアドレス"
            required
            >
            </v-text-field>
          </v-col>
          <v-col cols=10 lg=10 md=10 sm=10>
            <v-text-field
            v-model="options.address_city"
            :rules="phonenumberRules"
            label="電話番号"
            required
            >
            </v-text-field>
          </v-col>
          <v-col cols=10 lg=10 md=10 sm=10>
          　<v-text-field
            v-model="options.address_line1"
            :rules="addressRules"
            label="住所"
            required
          　>
          　</v-text-field>
          </v-col>

          <v-col cols=12 lg=12 md=12 sm=12>
            <Privacy
            @Agree="Agree"
            ></Privacy>
          </v-col>
        
          <v-col cols=12 lg=12 md=12 sm=12 style="border-bottom:solid" class="pb-0 bigsize">決済情報（クレジットカードのみ可）</v-col>
          <v-col cols=12 lg=12 md=12 sm=12>    
            <div>
              <label for="card-element">クレジットカード番号</label>
              <div id="card-element">
                <!-- Stripe Element がここに入ります。 -->
              </div>
              <div id="card-errors" role="alert">
                <!-- Element のエラーを入れます。 -->          
              </div>
            </div>
          </v-col>
        
          <v-col cols=12 lg=12 md=12 sm=12 class="mb-12">
            <v-btn
            :disabled="!valid || !privacyagree"
            color="primary"
            class="mt-2"
            @click="validate"
            @click.prevent="onPay"
            :loading="payloading"
            block
            >
            <div style="color:white">pay</div>
            </v-btn>
          </v-col>
        </v-container>
      </v-form>
      
      <div style="text-align:center;">
        <p class="smallsize">Stripe社の決済処理サービスを活用し、安全な決済処理を実現しております。</p>
        <v-img src="img/stripe.png" width="100" class="mb-6" style="margin:0 auto;"></v-img>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Cart from './Cart.vue'
import firebase from 'firebase'
import loading from './loading.vue'
import Privacy from '../components/Privacy.vue'

export default {
  components:{
    loading,
    Privacy,
  },
    data() {
      return {
        privacyagree:false,
        cartItems: null,
        items:[],
        dbconnection:null,
        metadata:{},
        predescription:{},
        screenloading:true,
        payloading:false,
        stripe: null,
        elements: null,
        card: null,
        firstname:'',
        familyname:'',
        options:{
          address_line1:'',
          address_line2:'',
          address_city:'',
        },
        valid: true,
        checkbox: false,
        firstnameRules: [
          v => !!v || '名前は必須です',
        ],
        familynameRules: [
          v => !!v || '姓名は必須です',
        ],
        emailRules: [
          v => !!v || 'メールアドレスは必須です',
          v => /.+@.+\..+/.test(v) || 'E-mailが有効ではありません',
        ],
        phonenumberRules:[
          v => !!v || '電話番号は必須です',
        ],
        addressRules:[
          v => !!v || '住所は必須です',
        ]
      }
    },
    created() {
      //cart.vueと同じ
        this.cartItems = this.$store.getters['cart/userCart'];
        this.cartItems.forEach(async item => {
        const detail = await this.getItemDetail(item.groupID);
        detail[0].itemid = item.id;
        this.items.push(detail);
        const self = this;
        setTimeout(function() {self.screenloading = false},2000);
      })
      this.stripe = Stripe('pk_live_67PcXTbwQFtRhbI45VM9cPnH00uGnld1Y2');
      this.elements = this.stripe.elements();
      this.dbconnection = firebase.firestore();
    },
    mounted() {
        // Element作成時に options から スタイルを調整できます.
        //以下2行はcreatedに書いてもOK
        var style = { base: { fontSize: '16px', color: "black" } };
        this.card = this.elements.create('card', {style: style, hidePostalCode: true});
        // stripeに用意されているマウントメソッド（vueに似てるね）
        //　ここはmountedに書く必要がある。DOM描画あとでないと#card-elementが存在しない
        this.card.mount('#card-element');
        this.card.addEventListener('change', function(event) {
            var displayError = document.getElementById('card-errors');
            if (event.error) {
                displayError.textContent = event.error.message;
            } else {
                displayError.textContent = '';
            }
        });
    },
    computed: {
      query() {
        let groupIDarray = [];
        this.items.forEach(item => {
          groupIDarray.push(item[0].groupID);
        });
        return groupIDarray;
      },
      stripeKeys() {
          //this.stripeに値が荒ればObject.keys(this.stripe)。なければ[]
          //Object.keys()指定したオブジェクトの直接所有で列挙可能なプロパティの名前をすべて含む配列を返す
         return this.stripe ? Object.keys(this.stripe) : []; 
      },
      totalPrice() {
      　　let total = 0;
      　　if(this.cartItems.length == 0){
        　　return total;
     　 　}else{
      　　this.items.forEach(item => {
           total += Number(item[0].price);
          });
         return total;
         }
      },
    },
    methods: {
        Agree(){
          this.privacyagree = true;
        },
        getCartItem(item,itemid) {
          return item[0].items.find(array => array.id === itemid); 
        },
        async getItemDetail(groupID) {
          return await this.$store.dispatch('item/getItemsFromGroup',groupID)
        },
        validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
        },
        async onPay() {
          this.options.name = this.familyname + this.firstname;
          this.stripe.createToken(this.card,this.options)
          .then(result => {
            if (result.error) {
            // エラー表示.
              var errorElement = document.getElementById('card-errors');
              errorElement.textContent = result.error.message;
              } else {
                // トークンをサーバに送信
                result.amount = this.totalPrice + 500;
                //商品idデータをstirpeへ渡し、何が買われたか判断できるように
                this.items.forEach((item,index) => {
                  this.predescription[index] = this.getCartItem(item,item[0].itemid).id
                })
                result.description = this.predescription;
                this.payloading = true;
                axios.post('https://us-central1-ikuyoproject-9e009.cloudfunctions.net/app',result)
                .then(res => {
                //サーバからの応答結果
                  if(res.data.statusCode === 200){
                    this.stockChange();
                    this.$router.push({ name: 'success' })//成功へページ遷移
                  }else{
                    this.$router.push({ name: 'failure' })//失敗へページ遷移
                  }
                });
              }
          });
    　　 },
        stockChange(){
          this.query.forEach(que => {
            if(que != "01" && que != "02"){
              const stockjudge = this.dbconnection.collection('items').doc(que);
              stockjudge.update({
                stock: false
              })
            }
          })
        },
      },
  }
</script>

<style scoped>
.smallsize{
  font-size: calc(0.55rem + ((1.2vw - 4.8px) * 0.9677));
}
.basesize{
  font-size: calc(0.75rem + ((1.2vw - 4.8px) * 0.9677));
}
.bigsize{
  font-size: calc(0.75rem + ((2.0vw - 4.8px) * 0.9677));
}

/* アニメーション */
.spinner {
  margin: 80% auto;
  width: 50px;
  height: 40px;
  text-align: center;
  font-size: 10px;
}

.spinner > div {
  background-color: #B759C7;
  height: 100%;
  width: 6px;
  display: inline-block;
  
  -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
  animation: sk-stretchdelay 1.2s infinite ease-in-out;
}

.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.spinner .rect3 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

.spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

@-webkit-keyframes sk-stretchdelay {
  0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  
  20% { -webkit-transform: scaleY(1.0) }
}

@keyframes sk-stretchdelay {
  0%, 40%, 100% { 
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% { 
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
}

</style>
