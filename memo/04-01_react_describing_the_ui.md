# Reactチュートリアル / LEARN REACT / UIを描画する を学ぶ

[Describing the UI – React](https://react.dev/learn/describing-the-ui)に沿って学んでいきます。

## 環境構築

以下のコマンドにより環境を構築します。

~~~shell
npx create-next-app@latest exercises/04-01_react_describing_the_ui --js --eslint --tailwind --app --import-alias "@/*" --use-npm --no-src-dir
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
- `vscode`の`eslint.workingDirectories`に`exercises/04-01_react_describing_the_ui`

以下を実行後に、ブラウザで[http://localhost:3000/](http://localhost:3000/)にアクセスし、**NEXT.JS**の画面が表示されることを確認します。

~~~shell
npm run dev
~~~

## 学んだこと

### Makedownでのエスケープ方法 ([faf938d](https://github.com/kantas-spike/learn_react/commit/faf938d4ef533fd056b37a29c8b264f34f21f52c))

以下のように、マークダウンのリンクの`[]`内にHTMLタグを書くと、
エラーメッセージ `MD033/no-inline-html: Inline HTML [Element: input]`が表示されました。

~~~markdown
[<input> – React](https://react.dev/reference/react-dom/components/input#my-text-input-doesnt-update-when-i-type-into-it)
~~~

HTMLタグの`<`を`\<`のようにエスケープすると正しく表示されるようになります。

~~~markdown
[\<input> – React](https://react.dev/reference/react-dom/components/input#my-text-input-doesnt-update-when-i-type-into-it)
~~~

- 参考
  - [Basic Syntax - Characters You Can Escape | Markdown Guide](https://www.markdownguide.org/basic-syntax/#characters-you-can-escape)

### コンポーネントの名前 ([2c07c75](https://github.com/kantas-spike/learn_react/commit/2c07c756b766cd6afb9fae0d633389a36f671761))

作成した共通コンポーネントに`My`のプレフィックスを付けています。
プレフィックスなしで良いような気がします。

ただし、`Link`など、`next.js`標準と名前がかぶるので、誤用が発生しそうです。

当面は、使い捨てのコンポーネントについては`My`を付けておきます。

コンポーネントを別パッケージとして配布する場合は専用のプレフィックスを付けたいと思いあす。

- 参考
  - [Part 1: Naming Conventions - The Foundation of Clean Code - DEV Community](https://dev.to/sathishskdev/part-1-naming-conventions-the-foundation-of-clean-code-51ng)

### 画像共有サービス imgur.com ([49e00bf](https://github.com/kantas-spike/learn_react/commit/49e00bf93feec235f7c4ab0315abd73d056fe199))

[Imgur: The magic of the Internet](https://imgur.com/)は、画像共有サービスのようです。いろいろな掲示板などで利用されているようです。
(自分のブログ用に利用しても良いかもしれません。)

以下のように、`https://i.imgur.com/`のあとに、`画像のID`と`ファイル形式の拡張子`を記載すれば画像を表示できます。

~~~markdown
![normal](https://i.imgur.com/MK3eW3A.jpg)
~~~

![normal](https://i.imgur.com/MK3eW3A.jpg)

`画像ID`のあとに以下のサフィックスを付けることで、手軽に画像サイズを変更できるようです。

- `s`: Small Square (90x90)
- `b`: Big Square (160x160)
- `t`: Small Thumbnail (160x160)
- `m`: Medium Thumbnail (320x320)
- `l`: Large Thumbnail (640x640)
- `h`: Huge Thumbnail (1024x1024)

先程の画像を`b`(Big Square(160x160))で表示してみましょう。
正方形になりましたね。

~~~markdown
![Big Square](https://i.imgur.com/MK3eW3Ab.jpg)
~~~

![Big Square](https://i.imgur.com/MK3eW3Ab.jpg)

今度は、`t`(Small Thumbnail (160x160))で表示してみましょう。
今度は、元の画像の縦横の比率は保ったままで、画像の高さが160pxになりました。

どうやら元画像の縦横の内、長い方の辺をThumnailのpx値(今回は160px)にするようです。

~~~markdown
![Small Thumbnail](https://i.imgur.com/MK3eW3At.jpg)
~~~

![Small Thumbnail](https://i.imgur.com/MK3eW3At.jpg)

- 参考
  - [ブログ画像保存先をimgurで - Way2Go](https://way2go.netlify.app/image-management/)
  - [Get the smaller version of an image on Imgur | Thomas' Miniblog](https://thomas.vanhoutte.be/miniblog/imgur-thumbnail-trick/)
  - [画像共有サービスとしてお馴染みの「imgur.com」、正式な読みは「イムガ―」だったことが判明 - ネタとぴ](https://netatopi.jp/article/1002285.html)
  - [最強の画像アップロードサイト「Imgur.com」のAPIを利用する（匿名画像アップロード編) - Qiita](https://qiita.com/AKB428/items/a5f68a3288cc596975ae)

### JSONデータもインポートできる ([45cf7d5](https://github.com/kantas-spike/learn_react/commit/45cf7d594ce45de70707b337da52978cf79aec00))

JSONデータも以下のように`export`してやれば、`import { people } from "@/lib/data"`のようにインポートできる。

~~~js
// lib/data.js
export const people = [{
    id: 0,
    name: 'Creola Katherine Johnson',
    profession: 'mathematician',
    accomplishment: 'spaceflight calculations',
    imageId: 'MK3eW3A'
  }, {
    id: 1,
    name: 'Mario José Molina-Pasquel Henríquez',
    profession: 'chemist',
    accomplishment: 'discovery of Arctic ozone hole',
    imageId: 'mynHUSa'
  }, {
    id: 2,
    name: 'Mohammad Abdus Salam',
    profession: 'physicist',
    accomplishment: 'electromagnetism theory',
    imageId: 'bE7W1ji'
  }, {
    id: 3,
    name: 'Percy Lavon Julian',
    profession: 'chemist',
    accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
    imageId: 'IOjWm71'
  }, {
    id: 4,
    name: 'Subrahmanyan Chandrasekhar',
    profession: 'astrophysicist',
    accomplishment: 'white dwarf star mass calculations',
    imageId: 'lrWQx8l'
  }];
~~~
