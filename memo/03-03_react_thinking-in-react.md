# Reactチュートリアル / GET STARTED / Thinking in React を学ぶ

## 環境構築

以下のコマンドにより環境を構築します。

~~~shell
npx create-next-app@latest exercises/03-03_react_thinking-in-react --js --eslint --tailwind --app --import-alias "@/*" --use-npm --no-src-dir
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
