# Reactチュートリアル / LEARN REACT / Interactivityを追加する

[Adding Interactivity – React](https://react.dev/learn/adding-interactivity)に沿って学んでいきます。

## 環境構築

以下のコマンドにより環境を構築します。

~~~shell
npx create-next-app@latest exercises/04-02_react_adding_interactivity --js --eslint --tailwind --app --import-alias "@/*" --use-npm --no-src-dir
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
- `vscode`の`eslint.workingDirectories`に`exercises/04-02_react_adding_interactivity`

以下を実行後に、ブラウザで[http://localhost:3000/](http://localhost:3000/)にアクセスし、**NEXT.JS**の画面が表示されることを確認します。

~~~shell
npm run dev
~~~

## 学んだこと

### linkの共通スタイル ([45cf7d5](https://github.com/kantas-spike/learn_react/commit/45cf7d594ce45de70707b337da52978cf79aec00))

linkのスタイルを共通化するためだけにコンポーネント(`MyLink`)を作成するのはやりすぎか。

`globals.css`内に定義し、`MyLink`は削除することにします。

~~~css
a {
     @apply underline underline-offset-4 text-blue-600;
}
~~~

### イベントとハンドラの命名規則 ([f12c737](https://github.com/kantas-spike/learn_react/commit/f12c73756276358a91a967d83f5353c48bf5d3a5))

コンポーネントの`props`はイベント名`onXXX`を命名し、`props`に渡す関数に名前がある場合は`handleXXX(...)`と命名するようです。

`<button/>`などのビルトインコンポーネントの標準イベント(`onClick`)に渡す関数名にも具体的なハンドル名(例: `handlePlayMusic()`)をつけるようにします。

### わざわざ`state`を利用する意味 ([f15a6a5](https://github.com/kantas-spike/learn_react/commit/f15a6a589283c263ed8fc3ba95f9b9b62ebbadba))

[Adding Interactivity – State as a snapshot | React](https://react.dev/learn/adding-interactivity#state-as-a-snapshot)のチャットの例のように、`state`はスナップショットとして管理されるため、前回レンダリングした時の`state`を使って処理中に、新しく`state`を変えてレンダリングしても、その処理は前回分の`state`のスナップショットを利用しているため、影響を受けません。

この`state`の仕組みが重要そうです。

### ([25c2359](https://github.com/kantas-spike/learn_react/commit/25c2359978e9838c4c2178eab6797a5e9ea965b7))

`setXXX`により更新した`state`は、次のレンダリングのためにキューイングされます。

特殊なケースで、次のレンダリングのためにキューイングされる前の`state`を`setXXX`で何度も操作したい場合は、
以下のように`setXXX`に`値`ではなく`関数`を渡します。

~~~js
setNumber(n => n + 1)
~~~

使うことあるのかな?

### ネストしたオブジェクトのコピー方法 [b83a9ba](https://github.com/kantas-spike/learn_react/commit/b83a9ba463006914090edac6e1bd7f6e658f9f08))

`setXXX`でオブジェクト型の`state`を更新する場合、現在の`state`のスナップショットを直接更新するのではく、
現在のオブジェクトをコピー後に情報を更新し、そのオブジェクトを`setXXX`で次のレンダリングのためにキューイングします。

`現在のオブジェクトをコピー後に情報を更新`という操作にはスプレッド構文(`...`)を使います。

例えば、以下の形の`art`というオブジェクトがあります。

~~~js
const art = {
    name: 'Niki de Saint Phalle',
}
~~~

次のレンダリングのために`art`の`name`だけ更新したい場合は以下のようにします。

~~~js
const next_art = {
    ...art,   // 一旦、現スナップショットを展開
    name: 'New name', // 変更した属性のみ上書き
}
~~~

また、`art`の形が少し複雑で、ネストしたオブジェクトの場合、

~~~js
const art = {
    name: 'Niki de Saint Phalle',
    artwork: {
        title: 'Blue Nana',
        city: 'Hamburg',
        image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
}
~~~

次のレンダリングのために`artwork`の`city`だけ更新したい場合は以下のようにします。

`artwork`属性にもオブジェクトが設定されています。次のレンダリングのために、
`art`全体だけでなく`art.artwork`もコピーする必要があります。

更新の仕方は先程と同様です。

~~~js
const next_art = {
    ...art,
    artwork: {
        ...art.artwork,
        city: 'New City'
    }
}
~~~

### `...`が複雑と思う時は、`immer`が便利 ([32c481d](https://github.com/kantas-spike/learn_react/commit/32c481dbfae9b71d85e03f5d5c847a1848a15def))

[immerjs/immer](https://github.com/immerjs/immer)は、`Create the next immutable state by mutating the current one`するライブラリです。

まずは、パッケージ `immer`と`use-immer`をインストールします。

~~~shell
npm install immer use-immer
~~~

あとは、`useState()`のかわりに`useImmer`を利用します。

`useState()`を利用する場合は、以下のように、`setPerson`の引数で`...`を使ってオブジェクトをコピーand属性を変更を行う必要がありました。

~~~js
// 略
const [person, setPerson] = useState(art)

// 略
setPerson({
    ...person,
    name: 'new value'
})
~~~

`useImmer()`を利用すれば、関数の引数にコピー済のオブジェクトが渡されるので、以下のように、引数の属性を変更するだけで済みます。

~~~js
// 略
const [person, updatePerson] = useImmer(art)
// 略
updatePerson(draft => {
    draft.name = 'new value'
})
~~~

簡単になりました。ただし、[immerjs/immer](https://github.com/immerjs/immer)と[immerjs/use-immer](https://github.com/immerjs/use-immer)の仕組みについて詳しく学ぶ必要があります。

### 配列を`state`として更新する ([07c6397](https://github.com/kantas-spike/learn_react/commit/07c63978d1ca65785f12d675141f7c55ca28fa47))

配列を`state`として更新する場合は、配列全てをコピーするのではなく、更新が必要な要素のみ`...`でコピーして更新するようです。

~~~js
// 略
const [list, setList] = useState(artList)
// 略
setList(list.map(artwork => {
    if (artwork.id === artworkId) {
        return { ...artwork, seen: nextSeen }
    } else {
        return artwork
    }
}))
~~~

### 配列を`state`として更新する(immer版) ([17c68d5](https://github.com/kantas-spike/learn_react/commit/17c68d5c5707173d307ea8072d83e319741c4f05))

`state`が配列の場合も`immer`、`use-immer`を利用できます。

~~~js
// 略
const [list, updateList] = useImmer(artList)
// 略
updateList(draft => {
    const artwork = draft.find(a => a.id === artworkId)
    artwork.sceen = nextSeen
})
~~~
