# インストール

[新しい React プロジェクトを開始する – React](https://react.dev/learn/start-a-new-react-project)によると、
React単体を利用するのではなく、Reactベースのフレームワークを利用するように奨めています。

そういうことなんですね。ちょっと方針を変更します。
Reactベースのフレームワークの1つである[Next.js by Vercel - The React Framework](https://nextjs.org/)をインストールすることにします。

また、当初のReact学習方針を変更し、
[Introduction | Learn Next.js](https://nextjs.org/learn/foundations/about-nextjs?utm_source=next-site&utm_medium=navbar&utm_campaign=docs_getting-started_installation)を学びながら、
[Reactのチュートリアル](https://react.dev/learn)も学びたいと思います。

## node.jsのインストール

Next.jsは、`Node.js 16.8`以降のバージョンを必要とします。

今回は`Node.js 20.3.1`を導入しました。

~~~shell
$ node --version
v20.3.1
~~~

## Next.jsのインストール

今回は、[Automatic Installation](https://nextjs.org/docs/getting-started/installation#automatic-installation)という方法を採用して`Next.js`をインストールします。

この方法は`create-next-app`というコマンドを使用して、対話をしながら`Next.js`プロジェクトに必要なモジュールとプロジェクトフォルダを作成します。[^1]

~~~shell
$ npx create-next-app@latest
✔ What is your project named? … devenv-validation
✔ Would you like to use TypeScript? … No
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like to use `src/` directory? … No
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to customize the default import alias? … No
Creating a new Next.js app in /Users/kanta/spike/75_learn_react/devenv-validation.

Using npm.

Initializing project with template: app-tw


Installing dependencies:
- react
- react-dom
- next
- tailwindcss
- postcss
- autoprefixer
- eslint
- eslint-config-next

(⠂⠂⠂⠂⠂⠂⠂⠂⠂⠂⠂⠂⠂⠂⠂⠂⠂⠂) ⠏ idealTree:devenv-validation: sill idealTree buildDeps

added 338 packages, and audited 339 packages in 44s

127 packages are looking for funding
  run `npm fund` for details

5 moderate severity vulnerabilities

To address all issues, run:
  npm audit fix

Run `npm audit` for details.
Success! Created devenv-validation at /Users/kanta/spike/75_learn_react/devenv-validation
~~~

これにより、`devenv-validation`フォルダが作成され、その配下に必要なファイルやパッケージがインストールされます。

## 動作確認

作成したプロジェクトの動作確認をしてみましょう。

~~~shell
$ cd devenv-validation
$ npm run dev

> devenv-validation@0.1.0 dev
> next dev

- ready started server on 0.0.0.0:3000, url: http://localhost:3000
Attention: Next.js now collects completely anonymous telemetry regarding usage.
This information is used to shape Next.js' roadmap and prioritize features.
You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
https://nextjs.org/telemetry
~~~

開発用サーバーが起動します。`http://localhost:3000`にブラウザでアクセスするとページが表示されます。

### ページの表示

`app/page.js`を変更するとページ内容を変更できます。

では試しに、`app/page.js`を以下に変更します。

~~~jsx
export default function Home() {
  return (
    <div class="mt-8 mx-4 text-6xl">はじめてのNext.js</div>
  )
}
~~~

ブラウザの表示も変更されますね。

### ルーティング

`Next.js`には2種類のルーティング方法があるようです。

- [App Router](https://nextjs.org/docs/app/building-your-application/routing)
- [Pages Router](https://nextjs.org/docs/pages/building-your-application/routing)

`create-next-app` でプロジェクト作成時に、 `✔ Would you like to use App Router? (recommended)` を`YES`に設定したので、本プロジェクトでは `App Router` を利用します。 [^2]

既に作成済みの`app/page.js`は、アプリケーションのルートページになります。
現在、アプリケーションが`http://localhost:3000`となっているので、ルートページのURLは`http://localhost:3000`になります。

`http://localhost:3000/test01`という新たなページを追加する場合は、`app/test01/page.js`というファイルを作成し、以下を記載します。

~~~jsx
export default function Test01() {
  return (
    <div class="mt-8 mx-4 text-6xl">1つめのテストページです。</div>
  )
}
~~~

`http://localhost:3000/test01`にブラウザでアクセスすると、該当ページが表示されます。

### リンク

ページ間を行き来する方法は2つあるようです。

- [<Link>Component](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#link-component)を使う
- [useRouter() Hook](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#userouter-hook)を使う

Reactの学習からはじめたいので、まずは、`<Link>`を使用したいと思います。 [^3]

では、`app/page.js`に、`app/test01/page.js`へのリンクを追加します。

`app/pages.js`を以下のように変更してください。

~~~jsx
import Link from 'next/link'

export default function Home() {
  return (
  <div>
    <div class="mt-8 mx-4 text-6xl">はじめてのNext.js</div>
    <div class="my-6 mx-8">
      <ul>
        <li><Link href="/test01" className="underline underline-offset-4 text-blue-500">Test01を表示します</Link></li>
      </ul>
    </div>
  </div>
  )
}
~~~

ブラウザに表示されるリンクをクリックすると`http://localhost:3000/test01`を表示できます。

[^1]: 私は`TypeScript`がわからないので`No`にしています。
[^2]: `App Router` は `Next.js v13`から導入された新しいRouting方法のようです。今後はこちらが推奨されるようです。
[^3]: `useRouter()`については`Next.js`の学習の中で学んでいく予定です。