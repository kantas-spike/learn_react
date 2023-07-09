# Reactチュートリアル / GET STARTED / Tutorial: Tic-Tac-Toe を学ぶ

[Tutorial: Tic-Tac-Toe – React](https://react.dev/learn/tutorial-tic-tac-toe)に沿って学んでいきます。

学んだ内容は本メモに記載し、コードは[03-02_react_tutorial_tic-tac-toe](../exercises/03-02_react_tutorial_tic-tac-toe)プロジェクトに記載します。

**Tic-Tac-Toe**とは三目並べのことです。三目並べゲームを作成するチュートリアルになります。

## 環境構築

以下のコマンドにより環境を構築します。

~~~shell
npx create-next-app@latest exercises/03-02_react_tutorial_tic-tac-toe --js --eslint --tailwind --app --import-alias "@/*" --use-npm --no-src-dir
~~~

`jsconfig.json`を手動で修正し、`--import-alias`の設定を`"@/components/*": ["app/components/*"]`にします。[^1]

~~~json
{
  "compilerOptions": {
    "paths": {
      "@/components/*": ["./app/components/*"]
    }
  }
}

~~~

以下を実行後に、ブラウザで[http://localhost:3000/](http://localhost:3000/)にアクセスし、**NEXT.JS**の画面が表示されることを確認します。

~~~shell
npm run dev
~~~

## 学んだこと

### GitHubでコミットのハッシュが自動でリンクに変換されるのは会話部分のみ ([e9987e3](https://github.com/kantas-spike/learn_react/commit/e9987e326112161212a18cedc5f29a418f94662a))

[自動リンクされた参照と URL - GitHub Docs](https://docs.github.com/ja/get-started/writing-on-github/working-with-advanced-formatting/autolinked-references-and-urls#issues-and-pull-requests)に以下の記載があります。

~~~text
GitHub 上の会話の中では、Issue やプルリクエストへの参照は自動的に短縮リンクに変換されます。

メモ: 自動リンクされた参照は、ウィキやリポジトリ中のファイルでは作成されません。
~~~

### `create-next-app`で作成される不要な画像ファイル(`public/*.svg`)の削除を忘れがち  ([1baf4e5](https://github.com/kantas-spike/learn_react/commit/1baf4e545cde43b5ca54a13e3628df883c972e36))

以下が不要です。

- public/next.svg
- public/vercel.svg

### `Parsing error: Cannot find module 'next/babel'`が発生した ([05c9fd2](https://github.com/kantas-spike/learn_react/commit/05c9fd2beb6014d3c3d084265fa4c23c3545c5ed))

前回の[Itr02: Reactチュートリアル / GET STARTED / Tutorial: Tic-Tac-Toe を学ぶ (fix: #2) by kantas-spike · Pull Request #11 · kantas-spike/learn_react](https://github.com/kantas-spike/learn_react/pull/11)の時には、以下のようなエラーは発生しなかった。`package.json`や`package-lock.json`を比較すると微妙にいくつかバージョンが上っていました。その影響なのか...

~~~shell
Parsing error: Cannot find module 'next/babel'
~~~

訂正： `vscode`の`eslint.workingDirectories`に`excercises/03-02_react_tutorial_tic-tac-toe`を設定し忘れていたことが原因のようです。
そのため、`eslint.workingDirectories`を修正し、誤って修正した`.eslintrc.json`を元に戻しました。

- 参考
  - [next.js - Parsing error : Cannot find module 'next/babel' - Stack Overflow](https://stackoverflow.com/questions/68163385/parsing-error-cannot-find-module-next-babel/68838570#68838570)

### ReactとNext.jsの違い [7c8853d](https://github.com/kantas-spike/learn_react/commit/7c8853d7f895a006dbda30b140ce7d849b6bcde6)

Reactでは、部品を表示するためには、

- 表示するHTMLページ(例: `index.html`)と
- そのHTMLページの特定要素に部品を表示させるためのJavaScriptファイル(例: `index.js`)

を用意して、HTMLとReactの間をつなぐ必要があります。([Tutorial: Tic-Tac-Toe - index.js| React](https://react.dev/learn/tutorial-tic-tac-toe#stylescss))

しかし、Next.jsを使うと簡単です。`npm run dev`で開発している間は、各ルートの`page.js`を表示できるので、HTMLとReactのつなぎの部分は考える必要がありません。

今回は`app/page.js`に三目並べゲームの部品を配置していきたいと思います。

### JavaScriptで配列を初期化する ([29ccca5](https://github.com/kantas-spike/learn_react/commit/29ccca545ae2e44591cc64b9daea0547d747b972))

以下のコードが出てきました。わざわざ`.fill(null)`する必要があるのかと思いました。

~~~javascript
Array(9).fill(null)
~~~

`Array(9)`は`length`が`9`で配列の内容が`[]`と同じになるそうです。

~~~javascript
const array1 = Array(9)

const array2 = []
array2.length = 9
~~~

そのため、明示的に`fill()`で明示的に各要素に`null`を設定しているようです。

- 参考
  - [Array() コンストラクター - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/Array)
    - [インデックス付きコレクション - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Indexed_collections#%E9%85%8D%E5%88%97%E3%81%AE%E7%94%9F%E6%88%90)
  - [Array.prototype.fill() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)

### JavaScriptで配列をコピーする ([29ccca5](https://github.com/kantas-spike/learn_react/commit/29ccca545ae2e44591cc64b9daea0547d747b972))

配列をコピーするには`arr.slice()`を利用するようです。

~~~javascript
const ar1 = [0, 1, 2, 3]
const ar2 = ar1.slice()  // ar2は[0, 1, 2, 3]
~~~

また、`arr.slice(1, 3)`のようにコピーするインデックスの範囲を指定すれば、配列の一部のみをコピーできます。

~~~javascript
const ar3 = ar1.slice(1, 3)  # ar2は[1, 2]
~~~

これはPythonのスライスと同じ考え方のようです。

~~~python
ar1 = [0, 1, 2, 3]
ar2 = ar1[:]  # ar2は[0, 1, 2, 3]
ar3 = ar1[1:3] # ar3は[1, 2]
~~~

- 参考
  - [Array.prototype.slice() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
  - [Pythonのスライスによるリストや文字列の部分選択・代入 | note.nkmk.me](https://note.nkmk.me/python-slice-usage/)

### 共通の関数を定義する場所([94e3090](https://github.com/kantas-spike/learn_react/commit/94e3090e6536a7a83121af3e0aebc5ed28c2b4e2))

Next.jsのプロジェクト構成に正解はないそうですが、今回は以下を参考に、`app/lib/game_logic.js`を作成し、
そちらに共通関数を定義しました。

あわせて、`jsconfig.json`も以下のよう修正しました。

~~~json
{
  "compilerOptions": {
    "paths": {
      "@/components/*": ["./app/components/*"],
      "@/lib/*": ["./app/lib/*"],
    }
  }
}
~~~

- 参考
  - [Routing: Project Organization - Store project files in top-level folders inside of app | Next.js](https://nextjs.org/docs/app/building-your-application/routing/colocation#store-project-files-in-top-level-folders-inside-of-app)

### 元の配列に1つ要素を追加した、新しい配列を作る ([9ebc018](https://github.com/kantas-spike/learn_react/commit/9ebc018cbe5f91d9ffc47700de3d539a004750db))

以下の式により(`スプレッド構文`と`slice()`を利用)、元の`history`に新しい要素(`nextSquares`)を追加した、新しい`nextHistory`を作成しています。

~~~javascript
const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
~~~

やってることを簡単な例で書き直すと、以下のようになります。

~~~javascript
const history = [0, 1, 2, 3, 4, 5]
const newValue = 6
const nextHistory = [...history.slice(), newValue]  // newHistoryは [0, 1, 2, 3, 4, 5, 6]
// もし、historyの[0:3]までのスライスにnewValueを加えた新しい配列を作る場合
const nextHistory2 = [...history.slice(0, 3), newValue]  // newHistory2は [0, 1, 2, 6]
~~~

- 参考
  - [スプレッド構文 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

### Reactの情報の持たせ方 ([9ebc018](https://github.com/kantas-spike/learn_react/commit/9ebc018cbe5f91d9ffc47700de3d539a004750db))

Reactでは、情報を下位の部品に管理させるのではなく、親の部品で管理する方が良いそうです。

- 参考
  - [Tutorial: Tic-Tac-Toe – Lifting state up| React](https://react.dev/learn/tutorial-tic-tac-toe#lifting-state-up)
  - [Tutorial: Tic-Tac-Toe - Lifting state up, again | React](https://react.dev/learn/tutorial-tic-tac-toe#lifting-state-up-again)

### Static Export した Tic-Tac-Toeを Hugoで公開したい

`next.config.js`に`output: 'export'`を追加し、

~~~js
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export'
}

module.exports = nextConfig
~~~

以下を実行すると、`out/`ディレクトリ内に、ルートごとにHTMLを生成し、静的サイトとして利用できるようになります。 [^2]

~~~shell
npm run build
~~~

試しに、以下のように`python`で`out/`をドキュメントディレクトリに指定して、簡易的なHTTPサーバーを立ち上げて動作確認してみましょう。

`http://localhost:8000/`にアクセスすると三目並べが表示されるはずです。

~~~shell
$ python3 -m http -d out/ 8000
Serving HTTP on :: port 8000 (http://[::]:8000/) ...
~~~

`out`ディレクトリを、そのままHugoの[Static Files](https://gohugo.io/content-management/static-files/)にコピーしたいのですが、
`npm run build`で生成されたリソースのパスは全て`/`固定になっています。

そこで、`next.config.js`に`basePath`を設定して、リソースのパスを変更しましょう。

私のサイトは`/portfolio/`配下になるので、今回は`basePath`に`/portfolio/tictactoe`を設定することにします。

~~~js
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/portfolio/tictactoe',
}

module.exports = nextConfig
~~~

あとは、以下のように`out`ディレクトリを、Hugoのサイトの`static/tictactoe`という名前でコピーしてやれば良さそうです。

私のサイトは`~/blog`で管理していますので、コピー方法は以下になります。

~~~shell
cp -r out ~/blog/static/tictactoe
~~~

あとは、`~/blog`に移動し、Hugoを起動して確認してみましょう。

~~~shell
$ cd ~/blog
$ hogo server
Web Server is available at http://localhost:1313/portfolio/ (bind address 127.0.0.1)
Press Ctrl+C to stop
~~~

ブラウザで`http://localhost:1313/portfolio/tictactoe/`にアクセスすると三目並べが表示されるはずです。

Runtimeサーバーを利用しないためいくつか制限はありますが、この方法でNext.jsで作成したアプリケーションをHogoのサイトに公開したいと思います。 [^3]

- 参考
  - [Deploying: Static Exports | Next.js](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
  - [next.config.js Options: basePath | Next.js](https://nextjs.org/docs/app/api-reference/next-config-js/basePath)
  - [Deploying: Static Exports - Unsupported Features | Next.js](https://nextjs.org/docs/app/building-your-application/deploying/static-exports#unsupported-features)

[^1]: デフォルトの`"@/*": ["./*"]`で良い気がします。部品のインポートを`@/app/components/button.js`と`@/components/button.js`のどちらでするかだけの話
[^2]: JavaScriptを実行するRuntimeサーバーは不要になります。
[^3]: Hugoで利用する場合はNext.jsの`server functions`が使えないので歪なアプリになりそうですが...
