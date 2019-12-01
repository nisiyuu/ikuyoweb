<template>
    <div class="mt-12">
        <v-card style="background-color:white;" class="mt-10 mb-10">
            <v-container>
                <v-row justify="center">
                    <v-col cols=4 class="mb-12">payment</v-col>
                <v-col cols=8>
                    <div v-show="totalPrice!=0">TOTAL {{totalPrice + 1000}} yen (tax in)</div>
                    <small v-show="totalPrice!=0">※送料は一律1000yen頂いております</small>
                    <div v-show="totalPrice==0">カートに商品がありません</div>
                </v-col>
                <v-col cols=12 class="mb-2" align="center" v-show="totalPrice!=0">お客様情報入力</v-col>
                </v-row>
                <v-form ref="form" v-model="contactFormValidation.valid" lazy-validation v-show="totalPrice!=0">
                    <v-text-field
                            v-model="options.name"
                            :rules="contactFormValidation.nameRules"
                            label="氏名"
                            required
                    ></v-text-field>
                    <v-text-field
                            v-model="options.address_line2"
                            :rules="contactFormValidation.emailRules"
                            label="メールアドレス（確認メールを送付します）"
                            required
                    ></v-text-field>

                    <v-text-field
                            v-model="options.address_line1"
                            :rules="contactFormValidation.address_line1Rules"
                            label="配送先住所"
                            required
                    ></v-text-field>
                   
                        <div>
                            <label for="card-element">クレジットカード番号</label>
                            <div id="card-element">
                                <!-- Stripe Element がここに入ります。 -->
                                </div>
                                <div id="card-errors" role="alert">
                                    <!-- Element のエラーを入れます。 -->          
                                </div>
                        </div>
                        <v-btn
                            :disabled="!contactFormValidation.valid"
                            @click.prevent="onPay"
                            block
                            large
                            color="#954399"
                            class="mt-5"
                            :loading="loading"
                        >pay</v-btn>
                </v-form>
            </v-container>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios'
import Cart from './Cart.vue'

export default {
    data() {
        return {
            loading: false,
            stripe: null,
            elements: null,
            card: null,
            options:{
              name: '',
              address_line1:'',
              address_line2:'',
            },
                contactFormValidation: {//???
                    valid: false,
                    nameRules: [v => !!v || '名前は必須項目です'],
                    emailRules: [v => !!v || 'メールアドレスは必須項目です'],
                    address_line1Rules: [v => !!v || '決済情報は必須です'],
                    },
                };
    },
  //mountedとcreated全てmountedに書いてもいいがどこでその処理を書いてるかわかりやすくすために分けている
  //以下のドキュメントのようにDOM描画前に必要な値を準備するのが、created
  //mountedはDOMが描画された後
  //https://jp.vuejs.org/v2/guide/instance.html
    created() {
        this.stripe = Stripe('pk_test_5gyOP7rzmNXPmgwShLtUnGV600YIHFo8fP');
        this.elements = this.stripe.elements();
    },
    mounted() {
        // Element作成時に options から スタイルを調整できます.
        //以下2行はcreatedに書いてもOK
        var style = { base: { fontSize: '16px', color: "#954399" } };
        this.card = this.elements.create('card', {style: style});
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
// card Element のインスタンスを作成
    computed: {//cashする　引数をとらない
      stripeKeys() {
          //this.stripeに値が荒ればObject.keys(this.stripe)。なければ[]
          //Object.keys()指定したオブジェクトの直接所有で列挙可能なプロパティの名前をすべて含む配列を返す
         return this.stripe ? Object.keys(this.stripe) : []; 
      },
      totalPrice() {
      let total = 0;
      this.$store.getters['cart/userCart'].forEach(item => {
        total += Number(this.getItemGroup(item).price);
      });
      console.log(total);
      return total;
    },
  },
  　methods: {//casheない　引数とれる
      getItemGroup({groupID}) {
      return this.$store.getters['item/allItems']({groupID})[0];
    },
  　　　async onPay() {
         this.loading = true;
    　　　this.stripe.createToken(this.card,this.options)
            .then(result => {
                console.log(result);
                if (result.error) {
                    // エラー表示.
                    console.log('create error');
                    var errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error.message;
                } else {
                    // トークンをサーバに送信
                    result.amount = this.totalPrice + 1000;
                    axios.post('https://us-central1-ikuyoproject-9e009.cloudfunctions.net/app',result)
                    .then(res => {
                      console.log(res.data)//サーバからの応答結果
                      this.loading = false;
                      if(res.data.statusCode === 200){
                          this.$router.push({ name: 'success' })//成功へページ遷移
                      }else{
                          this.$router.push({ name: 'failure' })//失敗へページ遷移
                      }
                    });
                }
            });
    },
  }
};
</script>

<style scoped>
aa{
    font-family: 'Courier New', Courier, monospace
}
</style>
