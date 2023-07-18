# Reactチュートリアル / LEARN REACT / 避難用ハッチ を学ぶ

[Escape Hatches – React](https://react.dev/learn/escape-hatches)に沿って学んでいきます。

## 環境構築

以下のコマンドにより環境を構築します。

~~~shell
npx create-next-app@latest exercises/04-04_react_escape-hatches --js --eslint --tailwind --app --import-alias "@/*" --use-npm --no-src-dir
~~~

作成した環境に以下の変更を加えます。

- `jsconfig.json`を手動で修正し、`--import-alias`の設定を`"@/components/*": ["./components/*"]`にします。[^1]

    ~~~json
    {
        "compilerOptions": {
            "paths": {
            "@/components/*": ["./components/*"]
            }
        }
    }
    ~~~

- `public/`内の不要なSVGファイルを削除します。
- `vscode`の`eslint.workingDirectories`に`exercises/04-04_react_escape-hatches`

以下を実行後に、ブラウザで[http://localhost:3000/](http://localhost:3000/)にアクセスし、**NEXT.JS**の画面が表示されることを確認します。

~~~shell
npm run dev
~~~

## 共通部品、共通スタイルを追加

`components/footer.js`を追加

~~~js
// components/footer.js
'use client'

import { usePathname } from "next/navigation"
import Link from "next/link";

export default function MyFooter() {
    const pathName = usePathname()
    let content = null
    if (pathName !== "/") {
        content = (<div>
            <hr className="my-4"/>
            <Link href="/">Homeへ戻る</Link>
        </div>)
    }
    return (content)
}
~~~

`layout.js`に`footer`を追加

~~~js
// layout.js

~~~

## 学んだこと

