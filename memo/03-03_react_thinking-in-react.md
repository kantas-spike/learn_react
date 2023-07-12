# Reactチュートリアル / GET STARTED / Thinking in React を学ぶ

[Thinking in React – React](https://react.dev/learn/thinking-in-react)に沿って学んでいきます。

## 環境構築

以下のコマンドにより環境を構築します。

~~~shell
npx create-next-app@latest exercises/03-03_react_thinking-in-react --js --eslint --tailwind --app --import-alias "@/*" --use-npm --no-src-dir
~~~

作成した環境に以下の変更を加えます。

- `jsconfig.json`を手動で修正し、`--import-alias`の設定を`"@/components/*": ["app/components/*"]`にします。[^1]

    ~~~json
    {
    "compilerOptions": {
        "paths": {
        "@/components/*": ["./app/components/*"]
        }
    }
    }

    ~~~

- `public/`内の不要なSVGファイルを削除します。
- `vscode`の`eslint.workingDirectories`に`exercises/03-03_react_thinking-in-react`

以下を実行後に、ブラウザで[http://localhost:3000/](http://localhost:3000/)にアクセスし、**NEXT.JS**の画面が表示されることを確認します。

~~~shell
npm run dev
~~~

## 学んだこと

### Reactで考える ([Thinking in React – React](https://react.dev/learn/thinking-in-react))

このチュートリアルでは、Reactによるユーザーインターフェースの作成方法を学びます。

作成方法は以下の手順になります。

1. UIをコンポーネントと呼ばれる部品に分割
2. 各コンポーネントの様々の表示状態について定義
3. 各コンポーネントの間をデータが流れるように、コンポーネントを接続

#### Step 0: モックアップ ([Thinking in React – Start with the mockup | React](https://react.dev/learn/thinking-in-react#start-with-the-mockup))

まずは、作成したいアプリのモックアップのために以下を実施します

- JSON APIが返すJSONデータの形を決定
- UIのスケッチを作成(手書きでもよい)

#### Step 1: UIをコンポーネント階層に分割([Thinking in React – Step 1: Break the UI into a component hierarchy | React](https://react.dev/learn/thinking-in-react#step-1-break-the-ui-into-a-component-hierarchy))

モックアップのコンポーネントやサブコンポーネントを抽出して名前をつけます。

UIのスケッチの部品(親部品および子部品)にあたる部分を四角の枠で囲んでいきます。
枠で囲んだ部分に名前をつけていきます。

部品が洗い出せたら、親子関係を部品を階層化します。

#### Step 2: staticバージョンのReactを作る([Thinking in React – Step 2: Build a static version in React | React](https://react.dev/learn/thinking-in-react#step-2-build-a-static-version-in-react))

データだけ表示するUIを作成します。ただし、ユーザーの操作部分(interactivity)は作成しません。
Stateは時間とともに変化するデータのinteractivityなので、stateもstatic版では利用しません。

~~~text
static version first and interactivity later
~~~

データは`props`経由でコンポーネントに渡します。

コンポーネントの作成は、`top down`でも`bottom up`でもかまいません。

シンプルなプロジェクトでは、通常`top down`で作成する方が簡単です。
より大きなプロジェクトでは、`bottom up`で作成する方が簡単です。

#### Step 3: 必要最小限のUI stateを見付ける ([Thinking in React – Step 3: Find the minimal but complete representation of UI state | React](https://react.dev/learn/thinking-in-react#step-3-find-the-minimal-but-complete-representation-of-ui-state))

`state`の目的は、ユーザーがUIの中にあるデータモデルを変更できるようにすることです。

`state`は必要最小限にする必要があります。`DRY(Don't Repeat Yourself)`を維持しましょう。

以下に`state`を洗い出す方法をまとめます。

1. UIで利用しているデータを全てリストアップします

    今回のUIの場合以下になります。

    1. 元となる`products`のリスト
    2. ユーザーが入力した検索文字列
    3. チェックボックスの値
    4. フィルタリングされた`products`のリスト

2. ルールに従い、上記のデータが`state`であるか判定します

    判定ルールは以下になります。

    - そのデータは時間が経過しても不変ですか? => YESなら、それは`state`ではない
    - そのデータは`props`経由で親コンポーネントから渡されますか? => YESなら、それは`state`ではない
    - コンポーネントに存在する`state`や`props`を元にしてそのデータを生成できますか? => YESなら、間違いなく`state`ではない

    データのリストを上記のルールで判定していきましょう?

    1. 元となる`products`のリストは`props`経由で渡されます。なので、`state`ではなさそうです。
    2. 検索文字列は、時間の経過ととも変化(ユーザー操作により変化)しますし、他の情報から生成できないので、`state`のようです。
    3. チェックボックスの値は、時間の経過ととも変化(ユーザー操作により変化)しますし、他の情報から生成できないので、`state`のようです。
    4. フィルタリングされた`products`のリストは、元の`products`のリストと、検索文字列およびチェックボックスの値から生成できるので、`state`ではありません。

    以上の結果、`state`は以下の2つになります。

    1. ユーザーが入力した検索文字列
    2. チェックボックスの値

#### Step 4: `state`を配置するコンポーネントを決める [Thinking in React – Step 4: Identify where your state should live | react](https://react.dev/learn/thinking-in-react#step-4-identify-where-your-state-should-live)

まず、Reactは`one-way data flow`を使用します。これは、親コンポーネントから子コンポーネントへデータを渡すやり方です。

このやり方に基づいて、`state`の配置場所を決める方法は以下になります。

1. `state`を描画に利用する全てのコンポーネントを洗い出す
2. それらのコンポーネントに最も近い共通の親コンポーネントを見つける
3. そこに`state`を配置するべきか決める
   1. 多くの場合、その共通の親コンポーネントに直接`state`を配置できます。
   2. その共通親コンポーネントのさらに上位のコンポーネントに`state`を配置することもできます。
   3. `state`を所有するべきコンポーネントが見つからない場合は、`state`を保持するためだけに新しいコンポーネントを作成し、それを共通の親コンポーネントの上の階層のどこかに追加します。

では、今回のUIを例に実際に配置場所を決めてみましょう。

1. `state`を描画に利用する全てのコンポーネントを洗い出す

    今回の場合、以下のコンポーネントになります。

    - `ProductTable`: `products`のリストをフィルタリングするために`検索文字列`と`チェックボックスの値`が必要
    - `SearchBar`: コンポーネントを表示するために`検索文字列`と`チェックボックスの値`が必要

2. それらのコンポーネントに最も近い共通の親コンポーネントを見つける

    - `FilterableProductTable`

3. そこに`state`を配置するべきか決める

    `FilterableProductTable`にそのまま`検索文字列`と`チェックボックスの値`を配置できそう

#### Step5: 逆向きのデータフローを追加する ([Thinking in React – Step 5: Add inverse data flow | React](https://react.dev/learn/thinking-in-react#step-5-add-inverse-data-flow))

ここまでで、`one-way data flow`によりUIを表示することができました。
しかし、ユーザー入力により、`state`が変更場合、別の`data flow`が必要になります。

子コンポーネント内の`input`フォームのユーザー入力を、親コンポーネント(`FilterableProductTable`)の持つ`state`に反映するためには、`state`を更新する`setXXX`関数を呼ぶ必要があります。

そこで、親コンポーネント(`FilterableProductTable`)から子コンポーネント(`ProductTable`, `SearchBar`)へ`setXXX`関数(`setFilterText`や`setInStockOnly`)を`props`経由で渡します。

子コンポーネントでは、`input`フォームのユーザー入力による変更イベントのハンドラ内で`setXXX`関数(`setFilterText`や`setInStockOnly`)を呼びだします。

### Array.prototype.reduce()を使ってグルーピング ([bf2fe91](https://github.com/kantas-spike/learn_react/commit/bf2fe91669970dc85a9bdb440c34485fb37df085))

[Array.prototype.reduce() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)を使って、
オブジェクトの配列をカテゴリでグルーピングしました。

~~~js
const grouped_products = products.reduce((group, item) => {
    const category = item.category
    group[category] ||= []
    group[category].push(item)
    return group
}, {})
~~~

### Object.entries()を使ってグルーピングしたオブジェクトを列挙 ([bf2fe91](https://github.com/kantas-spike/learn_react/commit/bf2fe91669970dc85a9bdb440c34485fb37df085))

[Object.entries() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)を使って、グルーピングしたオブジェクトのプロパティーの組みを取得しました。

`for(x in obj)`の場合は、オブジェクトのプロトタイプチェーンの全てのプロパティーが列挙されてしまいます。`Object.entries()`はそのオブジェクトに追加したプロパティーのみ列挙します。

~~~js
for (const [category] of Object.entries(grouped_products)) {
    rows.push(<ProductCategoryRow category={category}></ProductCategoryRow>)
    for (const product of grouped_products[category]) {
        rows.push(<ProductRow product={product}></ProductRow>)
    }
}
~~~

### for ... of を使って配列を列挙 ([bf2fe91](https://github.com/kantas-spike/learn_react/commit/bf2fe91669970dc85a9bdb440c34485fb37df085))

[for...of - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/for...of)を使って、配列の要素を列挙しました。

~~~js
for (const product of grouped_products[category]) {
    rows.push(<ProductRow product={product}></ProductRow>)
}
~~~

ちなみに[for...in - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/for...in)は、プロパティーを列挙します。

配列の場合、`0`,`1``2`などの配列のインデックスがプロパティーとなっており、`for...in`では配列の要素(値)を列挙することはできません。

### 兄弟要素に同じコンポーネントがある場合は`key`が必要 ([c91a20b](https://github.com/kantas-spike/learn_react/commit/c91a20b53706e22b1557a489a3556e38614aabfb))

~~~js
const rows = []
let idx = 0
for (const [category] of Object.entries(grouped_products)) {
    rows.push(<ProductCategoryRow category={category}></ProductCategoryRow>)
    rows.push(<ProductCategoryRow key={category} category={category}></ProductCategoryRow>)
    for (const product of grouped_products[category]) {
        rows.push(<ProductRow product={product}></ProductRow>)
        idx += 1
        rows.push(<ProductRow key={idx} product={product}></ProductRow>)
    }
}
~~~

- 参考
  - [Rendering Lists – Rules of keys | React](https://react.dev/learn/rendering-lists#rules-of-keys)

### `<input>`の`value`属性だけ設定してもエラーが表示される ([c91a20b](https://github.com/kantas-spike/learn_react/commit/c91a20b53706e22b1557a489a3556e38614aabfb))

以下のように設定した場合、

~~~js
<input value={something} />
~~~

コンソールに以下のエラーが表示されます。

~~~shell
You provided a value prop to a form field without an onChange handler. This will render a read-only field.
If the field should be mutable use defaultValue. Otherwise, set either onChange or readOnly.
~~~

正しくは、以下のように`onChange`ハンドラも合せて設定する必要があります。

~~~js
<input value={something} onChange={e => setSomething(e.target.value)} />
~~~

- 参考
  - [<input> – React](https://react.dev/reference/react-dom/components/input#my-text-input-doesnt-update-when-i-type-into-it)
