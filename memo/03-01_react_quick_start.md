# Reactチュートリアル / GET STARTED / Quick Start を学ぶ

[Quick Start – React](https://react.dev/learn)に沿ってReactを学んでいきます。

学んだ内容は、このメモに記載し、[03-01_react_quick_start](../exercises/03-01_react_quick_start)プロジェクトに、コードを記載します。

## 03-01_react_quick_startの作成

今回はオプションを明示的に指定してプロジェクトを作成しています。

[Next.jsのインストール - 02_installation](./02_installation.md#nextjsのインストール)では、`✔ Would you like to customize the default import alias?`を`NO`にしていますが、今回は`YES`にしています。

~~~shell
npx create-next-app@latest exercises/03-01_react_quick_start --js --eslint --tailwind --app --import-alias --use-npm --no-src-dir
~~~

動作確認

~~~shell
npm run dev
~~~
