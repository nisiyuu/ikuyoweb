<template>
    <v-form ref="form" v-model="valid" class="mt-12 ml-2" style="font-family: 'Courier New', Courier, monospace">
    <v-container>
    <v-col cols=12 lg=12 md=12 sm=12 v-show="totalPrice!=0" class="mb-0 pb-0" style="border-bottom:solid">お支払い金額　{{totalPrice + 1000}}円(税込)</v-col>
    <v-col v-show="totalPrice!=0" class="mt-0 pt-0" style="font-size:60%;">※送料は一律1000円頂いております</v-col>
    <v-col v-show="totalPrice==0">Cart　is　empty</v-col> 
    <v-col cols=12 lg=12 md=12 sm=12 style="border-bottom:solid" class="pb-0">購入商品</v-col>
    <v-row>
    <v-col v-for="(item,index) in cartItems" :key="index" cols=6 lg=6 md=6 sm=6 >
        <v-card outlined
        max-width="400"
        max-height="400"
        elevation="0"
        color="#954399"
        >
    <v-img class="white--text align-end" height="200px" :src="getItemDetails(item).image"></v-img>
    <v-card-text style="color:white">
      <div>{{getItemGroup(item).name}}</div>
      <div>{{getItemGroup(item).price}} yen</div>
      <div>{{getItemDetails(item).listItem}}</div>
    </v-card-text>
  </v-card>
    </v-col>
    </v-row>
    </v-container>

   <v-container>
    <v-col cols=12 lg=12 md=12 sm=12 style="border-bottom:solid" class="pb-0">お届け先情報</v-col>
    <v-col cols=4 lg=4 md=4 sm=4>
    <v-text-field
      v-model="familyname"
      :rules="familynameRules"
      label="姓"
      required
    ></v-text-field>
    </v-col>
    
    <v-col cols=4 lg=4 md=4 sm=4>
    <v-text-field
      v-model="firstname"
      :rules="firstnameRules"
      label="名"
      required
    ></v-text-field>
    </v-col>


    <v-col cols=10 lg=10 md=10 sm=10>
    <v-text-field
      v-model="options.address_line2"
      :rules="emailRules"
      label="メールアドレス"
      required
    ></v-text-field>
    </v-col>
    <v-col cols=10 lg=10 md=10 sm=10>
    <v-text-field
      v-model="options.address_city"
      :rules="phonenumberRules"
      label="電話番号"
      required
    ></v-text-field>
    </v-col>
    <v-col cols=10 lg=10 md=10 sm=10>
    <v-text-field
      v-model="options.address_line1"
      :rules="addressRules"
      label="住所"
      required
    ></v-text-field>
    </v-col>

    <v-col cols=12 lg=12 md=12 sm=12>
    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || '同意するにチェックを入れてください']"
      label="同意する"
      required
      color="#954399"
    ></v-checkbox>
    </v-col>

<v-col cols=12 lg=12 md=12 sm=12 style="border-bottom:solid" class="pb-0">決済情報（クレジットカードのみ可）</v-col>
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
      :disabled="!valid"
      color="#954399"
      class="mt-2"
      @click="validate"
      @click.prevent="onPay"
      :loading="loading"
      block
    >
    <div style="color:white">pay</div>
    </v-btn>
</v-col>
</v-container>
</v-form>
</template>

<script>
import axios from 'axios'
import Cart from './Cart.vue'

export default {
    data() {
        return {
      metadata:{},
      predescription:{},
      loading: false,
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
        this.stripe = Stripe('pk_test_5gyOP7rzmNXPmgwShLtUnGV600YIHFo8fP');
        this.elements = this.stripe.elements();
    },
    mounted() {
        // Element作成時に options から スタイルを調整できます.
        //以下2行はcreatedに書いてもOK
        var style = { base: { fontSize: '16px', color: "#954399" } };
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
      totalPrice() {//cart.vueと同一
      let total = 0;
      this.$store.getters['cart/userCart'].forEach(item => {
        total += Number(this.getItemGroup(item).price);
      });
       console.log(total);
      return total;
      },
      cartItems(){//cart.vueと同一
      return this.$store.getters['cart/userCart'];
      },
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
    methods: {
        getItemGroup({groupID}) {//cart.vueと同一
          return this.$store.getters['item/allItems']({groupID})[0];
        },
        getItemDetails({ groupID, id }){
        //   console.log('args ===>', groupID, id );
          const group = this.getItemGroup({groupID});//なんで{}必要？=>分割代入
        //   console.log('group', group);
        //   console.log('findddd',group.items.find(item => item.id === id));
          return group.items.find(item => item.id === id);
        },
        validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
        },
        getItemGroup({groupID}) {
          return this.$store.getters['item/allItems']({groupID})[0];
        },
        async onPay() {
         this.options.name = this.familyname + this.firstname;
    　　　this.stripe.createToken(this.card,this.options)
            .then(result => {
                console.log(result);
                if (result.error) {
                    // エラー表示.
                    console.log('create error');
                    var errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error.message;
                } else {
                    this.loading = true;
                    // トークンをサーバに送信
                    result.amount = this.totalPrice + 1000;
                    for(let i=0;i<this.cartItems.length;i++){
                     this.predescription[i] = this.getItemDetails(this.cartItems[i]).id
                    }
                    result.description = this.predescription;
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
    },
  }
</script>