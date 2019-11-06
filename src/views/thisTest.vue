<template>
  <div>
    <form>
      <div class="form-row">
        <label for="card-element">クレジットカード番号・郵便番号</label>
        <div id="card-element">
          <!-- Stripe Element がここに入ります。 -->
        </div>
        <div id="card-errors" role="alert">
           <!-- Element のエラーを入れます。 -->          
        </div>
      </div>
      
      <!-- type属性が設定されていないbuttonタグは、type=submitを付与しているときと同じ動作をします。
      　　　=>リロードされるhttps://qiita.com/haruraruru/items/53614e739437bf7e5b1c -->
      <button @click.prevent="onPay">お支払い</button>
    </form>
  </div>
</template>

<style scoped>
.form-row{
  margin-top: 100px;
}

</style>



<script>
import axios from 'axios'
export default {
    data() {
        return {
            stripe: null,
            elements: null,
            card: null,
            options:{
              name: 'nishi',
              address_line1:'koenji',
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
        var style = { base: { fontSize: '16px', color: "#32325d" } };
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
  },
  　methods: {//casheない　引数とれる
  　　　async onPay(options) {
    　　　this.stripe.createToken(this.card,this.options)
            .then(result => {
				        console.log(result)
                if (result.error) {
                    // エラー表示.
                    console.log('create error');
                    var errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error.message;
                } else {
                    // トークンをサーバに送信
                    axios.post('https://us-central1-ikuyoproject-9e009.cloudfunctions.net/app',result)
                    .then(res => {
                      console.log(res.data)//サーバからの応答結果
                    });
                    console.log('create ok');
                }
            });
    },
  }
};
</script>

<style scoped>
</style>
