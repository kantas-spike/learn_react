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

import {usePathname} from 'next/navigation'
import Link from 'next/link'

export default function Footer(){
    const current_path = usePathname()
    return (<>
        {(current_path === "/") ? null :
            <div>
                <hr  className="my-4"/>
                <Link href="/">Homeへ戻る</Link>
            </div>
        }
    </>)
}
~~~

`app/layout.js`に`footer`を追加

~~~js
// layout.js
import Footer from '@/components/footer'
// 略
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Footer></Footer>
      </body>
    </html>
  )
}
~~~

`app/globals.css`に共通スタイルを追加

~~~css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

button {
  @apply border rounded-md px-2 py-1
}

body {
  color: rgb(var(--foreground-rgb));
}

a {
  @apply underline underline-offset-4 text-blue-600;
}

input, textarea, select {
  @apply border px-1
}

:disabled {
  @apply bg-gray-400 text-gray-500;
}

h1 {
  @apply text-3xl;
}

h2 {
  @apply text-2xl;
}

h3 {
  @apply text-xl;
}

h4 {
  @apply text-lg;
}

h5 {
  @apply text-base;
}

h6 {
  @apply text-sm;
}
~~~

## 学んだこと

### useRef ([df38c18](https://github.com/kantas-spike/learn_react/commit/df38c18fb049e7c27a2adf7f9bee984ec67f31cd))

- `useRef`は変更しても再描画のトリガーしたくない値を保持するための仕組みです。

- `useRef(xxx)`が返す値は、以下のように`current`属性を持つプレーンなオブジェクトです。

  ~~~js
  {
    current: xxx
  }
  ~~~

- 予期しない動作になるのでレンダリング中は`ref.current`の値を読み書きしないように
  - `ref`はイベントハンドラやuseEffectなどレンダリング以外の処理内で利用するようです。

### useRefでDOMの参照を取得する ([62c0954](https://github.com/kantas-spike/learn_react/commit/62c09543049aaaea661b11ed3ff8245a2d3ccaa1))

- 以下のように`<input/>`の`ref`属性に`inputRef`を渡すと、`inputRef.current`に`<input/>`のDOMノードを設定できる。

  ~~~js
  import { useRef } from "react"

  export default function From(){
      const inputRef = useRef(null)

      function handleClick() {
          inputRef.current.focus()
      }

      return (
          <>
              <input ref={inputRef} type="text" />
              <button onClick={handleClick}>Focus the input</button>
          </>
      )
  }
  ~~~

- `<input/>`のようなビルトインのHTMLコンポーネントには`ref`属性でDOMノードを取得できるが、自作のコンポーネントでは`forwardRef`を利用する必要がある。

  ~~~js
  import { forwardRef, useRef } from 'react';

  const MyInput = forwardRef((props, ref) => {
    return <input {...props} ref={ref} />;
  });

  export default function Form() {
    const inputRef = useRef(null);

    function handleClick() {
      inputRef.current.focus();
    }

    return (
      <>
        <MyInput ref={inputRef} />
        <button onClick={handleClick}>
          Focus the input
        </button>
      </>
    );
  }
  ~~~

### useEffect ([b5db74e](https://github.com/kantas-spike/learn_react/commit/b5db74e6ce2a72aca29bb754fb92d8eb5b28a2f5), [3cb7082](https://github.com/kantas-spike/learn_react/commit/3cb70829156b17de3173c507d4cdaf143513c83a))

- `useEffect`は、コンポーネントと外部システム(サードパーティAPIやネットワークなど)と連携させるときに利用する
- `useEffect`に渡す関数の処理を`Effect`とよぶ

  ~~~js
  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  });
  ~~~

- `Effect`は毎レンダー後に実行される
- useEffectの第二引数の配列で、`Effect`には依存する情報(複数可)を指定できる。依存情報に変化がある場合のみ`Effect`が実行される

  ~~~js
  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }, [isPlaying]);
  ~~~

- useEffectの第二引数に空の配列(`[]`)を指定した場合は、コンポーネントのマウント時に`Effect`が実行される
- `Effect`はクリーンアップ関数を返却できる。再度`Effect`を実行時には必ずクリーンアップ関数を実行してから`Effect`が実行される

  ~~~js
  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();
    return () => dialog.close();
  }, []);
  ~~~

- クリーンアップ関数の返却漏れによる不具合を見落さないようにするため、Reactには`Strict Mode`が用意されている。
  `Strict Mode`ではコンポーネントは必ず2回マウントされる(mount, unmount, mountの順に実行される)

- `next.js`で`Strict Mode`を有効にするには、`next.config.js`に以下の設定を追加する必要がある([next.config.js Options: reactStrictMode | Next.js](https://nextjs.org/docs/app/api-reference/next-config-js/reactStrictMode))

  ~~~js
  // next.config.js
  module.exports = {
    reactStrictMode: true,
  }
  ~~~

### toastify-js ([5bfa224](https://github.com/kantas-spike/learn_react/commit/5bfa2241dd67d69475e095803bf03359e494b6d8))

`toastify-js`パッケージを導入しました。

以下のコードで簡単にトースト表示できます。

~~~js
import Toastify from "toastify-js"
import 'toastify-js/src/toastify.css'

Toastify({
    text: message,
    duration: 2000,
    gravity: 'top',
    position: 'right',
    style: {
        background: theme === 'dark' ? 'black' : 'white',
        color: theme === 'dark' ? 'white' : 'black',
    },
}).showToast()
~~~

### Effectの依存関係を整理するには`useEffectEvent`が使えるらしい ([5bfa224](https://github.com/kantas-spike/learn_react/commit/5bfa2241dd67d69475e095803bf03359e494b6d8), [e95379f](https://github.com/kantas-spike/learn_react/commit/e95379faea4eab58934726f0fbfdfa89b3b0dbc4), [645e2c0](https://github.com/kantas-spike/learn_react/commit/645e2c0088bad8bdf7444184809debaabee5fb74))

以下の`Effect`は`roomId`と`theme`に依存(`[roomId, theme]`)していますが、
`roomId`が変更された場合のみ`Effect`を実行したいです。

~~~js
useEffect(() => {
    const connection = createConnection(roomId, serverUrl)
    connection.on('connected', () => {
        showNotification('Connected!', theme)
    })
    connection.connect()
    return () => connection.disconnect()
}, [roomId, theme])
~~~

その場合、`React`の`experimental`版を導入し`useEffectEvent`を利用すれば解決できるようです。
しかし、私の`Next.js`環境では上手く導入できませんでした。

そこで、`eslint`の警告が出てしまいますが、`Effect`の依存関係を`roomId`のみ指定(`[roomId]`)することで回避しました。

~~~js
useEffect(() => {
    const connection = createConnection(roomId, serverUrl)
    connection.on('connected', () => {
        showNotification('Connected!', theme)
    })
    connection.connect()
    return () => connection.disconnect()
}, [roomId]) // `theme`を指定していないとeslintに怒られるが無視
~~~

### レンダリング時に毎回生成されるオブジェクトをEffectの依存関係に含めてはいけない ([cb17390](https://github.com/kantas-spike/learn_react/commit/cb17390901a4bb6328991f8eff6c1a0b3b1b2a06), [06dadee](https://github.com/kantas-spike/learn_react/commit/06dadee03d050c7b1f51b971d668debd1c68d714))

依存する情報の作成タイミングに注意が必要です。

以下はレンダリング毎に生成されるオブジェクトに依存した場合の例です。

~~~js
export default function ChatRoom({roomId, theme}){
    const options = {         // optionsはレンダリング毎に作成される
        serverUrl: serverUrl,
        roomId: roomId
    }
    useEffect(() => {
        const connection = createConnection(options)
        connection.connect()
        return () => connection.disconnect()
    }, [options])            // optionに依存しているためレンダリング毎にEffectが実行される
    return (<h1>Welcom to the chat!</h1>)
}
~~~

修正版は以下です。

~~~js
export default function ChatRoom({roomId, theme}){
    useEffect(() => {
        const options = {           // effectの中で作成されるため、`roomId`が変更される度に作成される
            serverUrl: serverUrl,
            roomId: roomId
        }

        const connection = createConnection(options)
        connection.connect()
        return () => connection.disconnect()
     }, [roomId])
    return (<h1>Welcom to the chat!</h1>)
}
~~~

### カスタムフックを作成すると`stateful`なロジックをコンポーネント間で共有できる ([b285fe6](https://github.com/kantas-spike/learn_react/commit/b285fe636aaf9e8d69b7de1844edc95fa853c407))

カスタムフックを使って、更新ロジックをブラックボックスにした`state`を取得し、各コンポーネントで利用できる。

マウスカーソルの位置情報を`state`として返却するカスタムフックの例

~~~js
export default function usePointerPosition(){
    const [position, setPosition] = useState({ x: 0, y: 0 })
    useEffect(() => {
        function handleMove(e) {
            setPosition({ x: e.clientX, y: e.clientY})
        }
        window.addEventListener('pointermove', handleMove)
        return () => window.removeEventListener('pointermove', handleMove)
    }, [])
    return position
}
~~~

このカスタムフックを利用する側は、いつどのようにマウスカーソルの位置情報が変化するか知らないが、
`Dot`コンポーネントで利用できる。

~~~js
export default function Canvas(){
    const pos1 = usePointerPosition()

    return (
        <>
            <Dot position={pos1} opacity={1} />
        </>
    )
}
~~~
