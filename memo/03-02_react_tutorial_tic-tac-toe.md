# Reactチュートリアル / GET STARTED / Tutorial: Tic-Tac-Toe を学ぶ

[Tutorial: Tic-Tac-Toe – React](https://react.dev/learn/tutorial-tic-tac-toe)に沿って学んでいきます。

学んだ内容は本メモに記載し、コードは[03-02_react_tutorial_tic-tac-toe](../exercises/03-02_react_tutorial_tic-tac-toe)プロジェクトに記載します。

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

## 参考

[^1]: デフォルトの`"@/*": ["./*"]`で良い気がします。部品のインポートを`@/app/components/button.js`と`@/components/button.js`のどちらでするかだけの話
