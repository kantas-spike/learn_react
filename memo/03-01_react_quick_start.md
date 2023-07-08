# Reactチュートリアル / GET STARTED / Quick Start を学ぶ

[Quick Start – React](https://react.dev/learn)に沿ってReactを学んでいきます。

学んだ内容は本メモに記載し、コードは[03-01_react_quick_start](../exercises/03-01_react_quick_start)プロジェクトに記載します。

## 環境構築

今回はオプションを明示的に指定してプロジェクトを作成しています。

[Next.jsのインストール - 02_installation](./02_installation.md#nextjsのインストール)では、`✔ Would you like to customize the default import alias?`を`NO`にしていますが、今回は`YES`にしています。

~~~shell
npx create-next-app@latest exercises/03-01_react_quick_start --js --eslint --tailwind --app --import-alias --use-npm --no-src-dir
~~~

動作確認

~~~shell
npm run dev
~~~

## 学んだこと

### aliasの設定 ([f90739c](/kantas-spike/learn_react/commit/f90739c4e07a686b32fdbe26750614af4a58e0a8))

`create-next-app`実行時の`--import-alias`オプションの指定方法を間違っていました。

以下のように、`--import-alias`を引数なしで指定していたため、`--use-npm`がエイリアスとして登録されてしまいました。

~~~shell
npx create-next-app@latest exercises/03-01_react_quick_start --js --eslint --tailwind --app --import-alias --use-npm --no-src-dir
~~~

`--import-alias`オプション未指定時は、`--import-alias "@/*"`と同じ意味になります。 [^1]

今回は、`jsconfig.json`に以下の設定をしたので、`--import-alias "@/components/*"`を指定するべきでした。

~~~json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["app/components/*"]
    }
  }
}
~~~

ただし、今思うと`components`に限定する必要があったのか疑問です。デフォルトの`"@/*"`ままで良かったように思います。

### `</>`も利用可能 ([b921f3d](/kantas-spike/learn_react/commit/b921f3d83b103ee552ca6fbccae942773d471fc3))

JSXを利用する関数が返却できるのは1つのルート要素のみです。 [^2]

そのため、複雑な構造のタグを返却する場合は、`<div/>`で囲ってルート要素を1つにする必要があります。

~~~jsx
function Sample() {
    return (
        <div>
            <h1>title</h1>
            <img src="...">
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
        </div>
    )
}
~~~

部品がいつも`<div/>`で囲わることが嫌な場合は、`<></>`で囲うことで、ルート要素なしの部品を返却できます。

~~~jsx
// app/about/pages.js
export default function AboutPage() {
    return (
        <>
        <h1>About</h1>
        <p>Hello there.<br/>How do you do?</p>
        </>
    )
}
~~~

`npm run dev`で実行して、`http://localhost:3000/about`を表示し、ブラウザの開発ツールのインスペクタで確認してみましょう。
ルート要素なしで、`<h1/><p/>`が表示されます。

### style属性にオブジェクトを指定できる ([1236d66](/kantas-spike/learn_react/commit/1236d66353ffce879d78b8b055c194ec1166ae41))

JSXでstyle属性を設定する場合は、スタイル情報を定義したオブジェクトを指定します。 [^3]

ただし、Reactのstyle属性のプロパティーは、`camelCase`で記載する必要があります。 [^4]
通常のCSSのプロパティーは`border-radius: "50%";`のように`kebab-case`です。 [^5]

そのため、`border-radius: "50%";`をReactのstyle属性に指定する場合は、`{ borderRadius: "50%" }`のように指定する必要があります。

~~~jsx
// ...略..
<img
    style={{
        width: user.imageSize,
        height: user.imageSize,
        borderRadius: "50%";
        }}
/>
// ...略..
~~~

### JSX内ではif文は使えない ([2f58fd9](/kantas-spike/learn_react/commit/2f58fd926d6beebb0353434d0aaa4cb95ebaaf40))

JSXの`{}`(Curly Braces)内にはJavaScriptの式を実行できますが、if文のような**文**を実行できません。

そのため、JSXの外側でJavaScriptでif文を利用するか、JSX内で、論理積や条件 (三項) 演算子を使って式として条件判定を行う必要があります。 [^6] [^7]

### 繰り返されるリスト項目には`key`が必要 ([4436888](/kantas-spike/learn_react/commit/44368883277725d2921d6dff9c3fd198f5106ab5))

リスト内に表示する各`<li/>`に`key`がないと、以下の警告が表示されます。 [^8]

~~~shell
Warning: Each child in a list should have a unique “key” prop.
~~~

Reactでは、リストの各要素には`key`属性にユニークなIDを設定する必要があります。

~~~jsx
// 例
<li key={product.id}>{product.name}</li>
~~~

### データに`key`となる情報がないため`map()`関数でindexを取得する ([bc7f1b7](/kantas-spike/learn_react/commit/bc7f1b7832296e8ec17ab4991a6eb6cba184ca70))

データにユニークIDが存在しない場合は、`map()`関数のインデックスを使用しました。 [^9]

~~~jsx
// 例
const listItems = pages.map( (page, idx) => <li key={idx}>{page.title}</li>)
~~~

### html要素のイベントハンドラを利用する場合や、ReactのHookを利用する場合、Next.jsでは'use client'を宣言する必要がある ([7b074c6](/kantas-spike/learn_react/commit/7b074c69c755b1ec5913bf012c5265710e5de1a0))

`onClick`などのイベントハンドラや`useState`などのフックを利用する部品(関数)は、`"use client"`ディレクティブを宣言しないとエラーになります。[^10]

`"use client"`ディレクティブのついた部品はブラウザ上でレンダリングされます。(例外として、Next.jsでは初期表示時に性能向上のために、サーバー上で事前レンダリングした結果をブラウザに表示します)
これをクライアントコンポーネントと呼びます。

一方、`"use client"`ディレクティブのついていない部品は、サーバー内専用となりブラウザ上ではレンダリングされません。これをサーバーコンポーネントと呼びます。

部品をクライアントコンポーネントにするか、サーバーコンポーネントにするかの判断は、用途や利用する機能、セキュリティなどの観点で判断するようです。 [^11]

### Reactで部品に状態を持たせる場合、部品で`useState` を呼び出し使用する ([ea7f12e](/kantas-spike/learn_react/commit/ea7f12eead277e4d185748f8f172a5ac9efd3891))

`useState`を使うと部品内で状態を管理できます。

`const [count, setCount] = useState(0);`で初期状態(この例では`0`)を設定し、
以下の道具を返します。

- `count` 現在の状態
- `setCount(newValue)` 状態を新しい値に変更するための関数

この2つの道具を使って、状態の表示、更新を行います。

~~~jsx
import { useState } from 'react';

function MyButton() {
  const [count, setCount] = useState(0);
  // countが現在の状態
  // setCountは状態を変更するための関数

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
~~~

### ページで1つの状態を持たせる場合、ページで`useState` を呼び出し、部品に属性(引数)として引き渡す ([67c1b4e](/kantas-spike/learn_react/commit/67c1b4e92f76952be75c8b0177179db6346abdf9))

ページに状態を持たせて、部品に`現在の状態`と`状態変更関数`を属性として渡すことで、各部品で状態を共有できます。

~~~jsx
'use client'

import { useState } from "react"
import MyButton from "@/components/button"
import MyLink from "@/components/link"

export default function Home() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count + 1)
  }

  return (
    <div className="m-6">
      <div className="my-6 flex flex-col max-w-sm gap-4">
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
      </div>
    </div>
  )
}
~~~

`<MyButton count={count} onClick={handleClick} />`のようにJSXの属性として渡された情報は、部品(関数)の引数(`function MyButton({count, onClick})`)として取得できます。

~~~jsx
'use client'

export default function MyButton({count, onClick}) {
    return (
        <button onClick={onClick} className="border rounded-md px-2 py-1">Clicked {count} times!</button>
    )
}
~~~

また、JavaScriptの`function MyButton({count, onClick})`という引数の取得方法は、分割代入を利用しています。
関数の引数として渡されたオブジェクトを分割代入により変数に展開しています。[^12]

### 各ページで共通の表示する場合、`app/layout.js`で定義する ([78d408d](/kantas-spike/learn_react/commit/78d408db98282bbc0e6429c0512c298644938fab))

ページで共通のレイアウトは`app/layout.js`で定義できます。 [^13]

全ページで共通のフッタを追加する場合は、`app/layout.js`に以下を定義します。

~~~jsx
// app/layout.js
import MyFooter from '@/components/footer'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <MyFooter></MyFooter>
      </body>
    </html>
  )
}
~~~

### 表示中のページのパスを取得するためには`usePathname()`を使用する ([78d408d](/kantas-spike/learn_react/commit/78d408db98282bbc0e6429c0512c298644938fab))

表示中のページによってフッタの表示内容を変更した場合、`usePathname()`を使ってページのパスを取得し判定します。 [^21]

~~~jsx
// components/footer.js
'use client'

import MyLink from "@/components/link"
import { usePathname } from "next/navigation"

export default function MyFooter() {
    const pathName = usePathname()

    let content
    if (pathName === "/") {
        // ホームページ表示は何も表示しない
        content = null
    } else {
        // ホームページ以外の場合は、戻るリンクを表示する
        content = <div>
            <hr className='my-4'/>
            <MyLink href="/">Homeへ戻る</MyLink>
        </div>
    }

    return (
        content
    )
}
~~~

### 部品が`return null`すると、該当部品は表示されない ([78d408d](/kantas-spike/learn_react/commit/78d408db98282bbc0e6429c0512c298644938fab))

条件により、部品を表示したくない場合は`null`を返すといいようです。 [^14]

~~~jsx
if (isPacked) {
  return null;
}
return <li className="item">{name}</li>;
~~~

### Linkをラップした専用部品を作成する場合、`分割代入`を利用して関数の引数から必要な属性と残りの属性を取得すると便利 ([0c64645](/kantas-spike/learn_react/commit/0c64645889631ce0ecd3cecbf264bcb7f3e75073))

Next.js標準の`Link`をラップした`MyLink`を作る場合、カスタマイズしたい属性のみ、`分割代入`で関数の引数で取得し、関数内で`<Link/>`に属性を渡してやればいいようです。

~~~jsx
// `components/link.js`
import Link from "next/link"

export default function MyLink({ children, className, ...others}) {
    return <Link className={"underline underline-offset-4 text-blue-400 " + className} {...others}>{children}</Link>
}
~~~

関数では`function MyLink({ children, className, ...others})`のように、`分割代入`により必要な属性名(`children`,`className`)を明示的に取得し、
残りの属性は`...others`として、残った属性をオブジェクトして格納させます。 [^15]

`<Link/>`どのような属性が指定されるか不明なので`...others`として纏めることができるので便利です。

さらに、取得した`others`オブジェクトは、以下のように`...others`(JavaScriptのスプレッド構文)をつかって、`<Link />`の属性として展開します。 [^16]

~~~jsx
<Link className={"underline underline-offset-4 text-blue-400 " + className} {...others}>{children}</Link>
~~~

関数の引数で取得するときの`分割代入の残余のプロパティー`と、
`<Link/>`の属性として展開するときの`スプレッド構文`がどちらも同じ`...others`なのでわかりにくいですね。

### 部品の子要素は、引数 `children` で取得できる ([0c64645](/kantas-spike/learn_react/commit/0c64645889631ce0ecd3cecbf264bcb7f3e75073))

JSXで部品に子要素を表示させる場合、部品側では、`children`という属性として子要素を取得します。 [^17]

~~~jsx
<Card>
  <Avatar />
</Card>
~~~

`function Card({ children })`の`children`に`<Avatar/>`が設定されています。

~~~jsx
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}
~~~

### サブプロジェクトもeslintできるようにvscodeを設定 ([528e7ff](/kantas-spike/learn_react/commit/528e7fffdd2a64baa118bce4338703cb1be2be68))

本プロジェクトは`exercises`内に複数プロジェクトがあります。
このような複数のサブプロジェクトがある場合、`eslint.workingDirectories`に対象プロジェクトを追加すると良いようです。 [^18]

### Push前の過去のコミットメッセージを修正する

いろいろコミットした後で、コミットとIssueの関連付け忘れていることに気付きました。 [^20]

既に複数のコミットがあり、あとからコミットメッセージを変更して、キーワード`fix: #xxx`を追加したい場合、
インタラクティブなリベース(`git rebase -i HEAD~n`)を利用するといいようです。 [^19]

[^1]: [API Reference: create-next-app | Next.js](https://nextjs.org/docs/app/api-reference/create-next-app#non-interactive)
[^2]: [Writing Markup with JSX – React](https://react.dev/learn/writing-markup-with-jsx#the-rules-of-jsx)
[^3]: [JavaScript in JSX with Curly Braces – React](https://react.dev/learn/javascript-in-jsx-with-curly-braces#using-double-curlies-css-and-other-objects-in-jsx)
[^4]: [キャメルケース - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%AD%E3%83%A3%E3%83%A1%E3%83%AB%E3%82%B1%E3%83%BC%E3%82%B9)
[^5]: [Letter case - Wikipedia](https://en.wikipedia.org/wiki/Letter_case#Kebab_case)
[^6]: [論理積 \(&&\) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Logical_AND)
[^7]: [条件 \(三項\) 演算子 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Conditional_operator)
[^8]: [Rendering Lists – React](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)
[^9]: [Array.prototype.map\(\) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
[^10]: [Getting Started: React Essentials - Client Components | Next.js](https://nextjs.org/docs/getting-started/react-essentials#client-components)
[^11]: [Getting Started: React Essentials - When to use Server and Client Components? | Next.js](https://nextjs.org/docs/getting-started/react-essentials#when-to-use-server-and-client-components)
[^12]: [分割代入 関数の引数として渡されたオブジェクトからのプロパティの展開 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#%E9%96%A2%E6%95%B0%E3%81%AE%E5%BC%95%E6%95%B0%E3%81%A8%E3%81%97%E3%81%A6%E6%B8%A1%E3%81%95%E3%82%8C%E3%81%9F%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%8B%E3%82%89%E3%81%AE%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3%E3%81%AE%E5%B1%95%E9%96%8B)
[^13]: [Building Your Application: Routing - Layouts | Next.js](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#layouts)
[^14]: [Conditional Rendering - Conditionally returning nothing with null | React](https://react.dev/learn/conditional-rendering#conditionally-returning-nothing-with-null)
[^15]: [分割代入 残余プロパティ - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#%E6%AE%8B%E4%BD%99%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3)
[^16]: [スプレッド構文 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
[^17]: [Passing Props to a Component - Passing JSX as children | React](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)
[^18]: [サブディレクトリにプロジェクトがあるときにVSCodeのESLintを有効にする](https://zukucode.com/2020/10/eslint-vscode-subdirectory.html)
[^19]: [コミットメッセージの変更 - 古いまたは複数のコミットメッセージの修正 | GitHub Docs](https://docs.github.com/ja/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/changing-a-commit-message#amending-older-or-multiple-commit-messages)
[^20]: [Pull RequestをIssueにリンクする - GitHub Docs](https://docs.github.com/ja/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword)
[^21]: [Functions: usePathname | Next.js](https://nextjs.org/docs/app/api-reference/functions/use-pathname)
