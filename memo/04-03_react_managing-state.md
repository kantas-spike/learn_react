# Reactチュートリアル / LEARN REACT / Stateを管理する

[Managing State – React](https://react.dev/learn/managing-state)に沿って学んでいきます。

## 環境構築

以下のコマンドにより環境を構築します。

~~~shell
npx create-next-app@latest exercises/04-03_react_managing-state --js --eslint --tailwind --app --import-alias "@/*" --use-npm --no-src-dir
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
- `vscode`の`eslint.workingDirectories`に`exercises/04-03_react_managing-state`

以下を実行後に、ブラウザで[http://localhost:3000/](http://localhost:3000/)にアクセスし、**NEXT.JS**の画面が表示されることを確認します。

~~~shell
npm run dev
~~~

## 学んだこと

### async, await, Promise ([17c68d5](https://github.com/kantas-spike/learn_react/commit/17c68d5c5707173d307ea8072d83e319741c4f05))

以下のような、JavaScriptの新しいキーワードが出てきました。

- `async`
- `await`
- `Promise`

~~~js
async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    try {
        await submitForm(answer)
        setStatus('success')
    } catch (err) {
        setStatus('typing')
        setError(err)
    }
}

function submitForm(answer) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let shouldError = answer.toLowerCase() !== 'lima'
            if (shouldError) {
                reject(new Error(`${answer} is good guess but a wrong anser. Try again!`))
            } else {
                resolve()
            }
        }, 1500);
    })
}
~~~

`JavaScript`の関数には2種類あるようです。

- 同期関数

    関数を呼び出したら、その関数が完了するまで待ちます。

    以下のコードは、同期関数の利用例になります。

    ~~~js
    // 例
    function doukiFunc() {
        console.log('同期関数完了')
    }

    console.log('プログラム開始')
    doukiFunc()
    console.log('プログラム終了')
    ~~~

    実行すると、コンソールには以下のようなログが出力されます。

    ~~~text
    プログラム開始
    同期関数完了
    プログラム終了
    ~~~

    処理を呼び出した順にログが出力されます。

    シンプルで理解しやすいですね。しかし、同期関数(`doukiFunc()`)が完了するまでに時間がかかる(例えば30秒)ような場合、同期関数を呼び出してからプログラミング終了するまでの間、30秒のあいだ処理がブロックするため、そのプログラムはユーザー操作できなくなってしまいます。

- 非同期関数

    関数を呼び出したらすぐに値を返すことで、プログラムをブロックせずに制御をプログラムに返します。その一方で関数の処理はプログラムの処理と並行して実行します。

    `JavaScript`の標準APIにはいくつも非同期関数があるようです。
    代表的な非同期関数の例は以下になります。

    - `fetch()`
    - `setTimeout()`

    以下のコードは、非同期関数の利用例になります。

    ~~~js
    // 例
    function hidoukiFunc() {
        fetch('http://example.com/xxx').then(r => console.log('非同期関数完了'))
    }

    console.log('プログラム開始')
    hidoukiFunc()
    console.log('プログラム終了')
    ~~~

    実行すると、コンソールには以下のようなログが出力されます。

    ~~~text
    プログラム開始
    プログラム終了
    非同期関数完了
    ~~~

    `hidoukiFunc()`は、一旦すぐに値を返して制御を戻すため、`プログラム終了`の後に、`fetch()`の実行結果が表示されます。

非同期関数には`コールバック関数`を利用するものや`Promise`を利用するものなどがあるようです。詳細は[非同期処理:Promise/Async Function · JavaScript Primer #jsprimer](https://jsprimer.net/basic/async/#async-processing)や[プロミスの使用 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Using_promises)などにあります。

ここで、非同期関数を複数呼び出すケースを考えます。

~~~js
// 例
function hidoukiFunc() {
    fetch('http://example.com/xxx').then(r => console.log('非同期関数1完了'))
    fetch('http://example.com/yyy').then(r => console.log('非同期関数2完了'))
    fetch('http://example.com/zzz').then(r => console.log('非同期関数3完了'))
}

console.log('プログラム開始')
hidoukiFunc()
console.log('プログラム終了')
~~~

実行すると、コンソールには以下のようなログが出力されます。
ネットワークの状況により、`非同期関数?完了`の順番が変わります。

~~~text
プログラム開始
プログラム終了
同期関数2完了
同期関数1完了
同期関数3完了
~~~

非同期関数の中で、確実に`同期関数1完了`→`同期関数2完了`→`同期関数3完了`の順に処理を行いたい場合、
以下のようになります。

~~~js
// 例
function hidoukiFunc() {
    fetch('http://example.com/xxx').then(r => {
        console.log('非同期関数1完了')
        return fetch('http://example.com/yyy')
    }).then(r => {
        console.log('非同期関数2完了')
        return fetch('http://example.com/zzz')
    }).then(r => {
        console.log('非同期関数3完了')
    })
}

console.log('プログラム開始')
hidoukiFunc()
console.log('プログラム終了')
~~~

少しややこしいですね。
このコードを`async/await`を使って書き換えると以下のようになるようです。[^1]

~~~js
// 例
async function hidoukiFunc() {
    const r1 = await fetch('http://example.com/xxx')
    console.log('非同期関数1完了')
    const r2 = await fetch('http://example.com/yyy')
    console.log('非同期関数2完了')
    const r3 = await fetch('http://example.com/zzz')
    console.log('非同期関数3完了')
}

console.log('プログラム開始')
hidoukiFunc()
console.log('プログラム終了')
~~~

`JavaScript`には、昔ながら`setTimeout()`などの非同期関数と、`fetch()`などの`Promise`を利用した非同期関数の2グループがあるようです。

`async/await`は、`Promise`を利用した非同期関数を、すっきりとした方法で書くためのもののようです。

- 参考
  - [非同期 JavaScript 入門 - ウェブ開発を学ぶ | MDN](https://developer.mozilla.org/ja/docs/Learn/JavaScript/Asynchronous/Introducing)
  - [非同期処理:Promise/Async Function · JavaScript Primer #jsprimer](https://jsprimer.net/basic/async/)
  - [プロミスの使用 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Using_promises)
    - [Promise - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise)
  - [async function - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/async_function)

### HTMLエスケープ ([2b41383](https://github.com/kantas-spike/learn_react/commit/2b4138339ee955c05d4a73da25f769f009a8b12c))

以下のように、テキスト部分に、```や`"`があると`eslintのエラー(eslintreact/no-unescaped-entities)`が表示されます。

~~~js
export return Sample() {
    return (
        <div>Kazakhstan's largest city.</div>
    )
}
~~~

その場合は、該当文字をHTMLエスケープすると良いようです。

~~~js
export return Sample() {
    return (
        <div>Kazakhstan&apos;s largest city.</div>
    )
}
~~~

- 参考
  - [eslint-plugin-react/docs/rules/no-unescaped-entities.md at master · jsx-eslint/eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md#rule-details)

### コンポーネントを強制的に再描画 ([746600d](https://github.com/kantas-spike/learn_react/commit/746600dd3be046ff708cbf3dc1010d83113b1598))

あるコンポーネントを強制的にリセットしたい場合、以下のように`key`の値を変更すると良いそうです。

~~~js
<Chat key={to.email}>
~~~

### データの管理にはReducerを使う ([cb17671](https://github.com/kantas-spike/learn_react/commit/cb17671816b4445610a8ae052b49ef6f52914b29))

タスク一覧を管理する場合、以下のような処理が必要になります。

- タスクの追加
- タスクの変更
- タスクの削除

それぞれをイベントハンドラとして定義するのではなく、管理するデータごとに`reducer`を作成し、処理をまとめると良いそうです。

管理するデータは以下になります。

~~~js
const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false }
];
~~~

`reducer`の例は以下になります。

~~~js
function tasksReducer(tasks, action) {
    switch(action.type) {
        case 'added': {
            return [...tasks,
                {
                    id: action.id,
                    text: action.text,
                    done: false
                }
            ]
        }
        case 'changed': {
            return tasks.map(t => {
                if (t.id === action.task.id) {
                    return action.task
                } else {
                    return t
                }
            })
        }
        case 'deleted': {
            return tasks.filter(t => t.id !== action.id)
        }
        default: {
            throw Error(`Unknown action: ${action.type}`)
        }
    }
}

let nextId = 3;
~~~

`reducer`の作成と利用方法は以下になります。

ハンドラはアクションを定義して`dispach()`するだけなので、シンプルになります。

~~~js
// 略
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)

// 略
function handleAddTask(text) {
    dispatch({
        type: 'added',
        id: nextId++,
        text: text
    })
}

function handleChangeTask(task) {
    dispatch({
        type: 'changed',
        task: task
    })
}

function handleDeleteTask(taskId) {
    dispatch({
        type: 'deleted',
        id: taskId
    })
}

// 略 ハンドラは各コンポーネントのpropsに渡す
~~~

### next.jsのフォルダ構成 ([b773657](https://github.com/kantas-spike/learn_react/commit/b77365793dbf15dc75e29d4b5aa983b326f2a406))

`app`配下に`components`フォルダを作成して、コンポーネントを作成してきました。

しかし、ページが増えてくると、`app`配下にフォルダが増えてきますし、`components`内に`page.js`という名前のコンポーネントが作成できないこともわかってきました。

そこで、`components`を`app`の子フォルダではなく、兄弟フォルダとして配置することにしました。

コンポーネントは以下のようにエイリアスで参照しているため、

~~~js
import Accordion from "@/components/accordion";
~~~

`components`フォルダを移動後は、エイリアスの定義を変更するだけでプログラムは問題なく動作します。

~~~js
// jsconfig.jsを修正
{
  "compilerOptions": {
    "paths": {
      "@/components/*": ["./components/*"]
    }
  }
}
~~~

### コンポーネントに横断的に利用されるデータの渡し方 ([9d7d6aa](https://github.com/kantas-spike/learn_react/commit/9d7d6aab8e71a3740ccaf7f2605639c5e4f1a6cd))

Reactでは、コンポーネント間で共有する情報(state、ハンドラ、データ)などは、それらの共通のコンポーネントが保有することになります。

この方針に従う場合、コンポーネントの親子関係が深ければ深いほど、共有情報を`props`経由で渡していく必要があるため、受け渡しが煩雑になります。

この問題を解決するためには、`context`を使用します。

例えば、`level`情報をコンポーネント間で横断的に利用したい場合、

まず、`level`の`context`を作成します。

~~~js
// level_context.js
import { createContext } from "react";

export const LevelContext = createContext(1)
~~~

そして、上位のコンポーネントで、`context`を提供します。

そのためには、子のコンポーネントを`LevelContext.Provider`で囲むだけでいいです。

~~~js
// section.js
import { LevelContext } from "./level_context";

export default function Section({level, children}){
    return (
        <section className="m-2 py-2 px-2 border rounded-md">
            <LevelContext.Provider value={level}>
                {children}
            </LevelContext.Provider>
        </section>
~~~

子のコンポーネントでは、上位コンポーネントで提供されている`context`を利用します。

~~~js
// heading.js
import { useContext } from "react"
import { LevelContext } from "./level_context"

export default function Heading({children}){
    const level = useContext(LevelContext)
    // 略
}
~~~

### Context.Providerは入れ子にできる ([1964abe](https://github.com/kantas-spike/learn_react/commit/1964abe5a1dc9c9586871363265aac50ce2a94d2))

`context`を提供するコンポーネントを入れ子にすることもできます。

そのコンポーネントは、`context`を利用 and 提供することになります。

~~~js
// section.js
import { LevelContext } from "./level_context";

export default function Section({level, children}){
    const level = useContext(LevelContext)
    return (
        <section className="m-2 py-2 px-2 border rounded-md">
            <LevelContext.Provider value={level + 1}>
                {children}
            </LevelContext.Provider>
        </section>
~~~

### reducerは横断的に利用される情報 (1401d1b5c40a71a570ddbda31988b65486620fe3)

`useReducer`により作成した`管理するデータ`と`dispach`の情報は、コンポーネントに横断して利用されることが多そうです。

~~~js
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)
~~~

`管理するデータ`と`dispach`を提供する`context`を作成し提供すれば、`reducer`の利用がシンプルになります。

ただし、`管理するデータ`と`dispach`の2つのコンテキストが必要になるため、以下を用意します。

- `TasksProvider`: それらを1つにまとめたプロバイダー
- それぞれのコンテキストを利用するための関数
  - `useTasks()`
  - `useTasksDispatch()`

~~~js
// task_context.js
import { createContext, useContext, useReducer } from "react";

const TasksContext = createContext(null)
const TasksDispatchContext = createContext(null)

export default function TasksProvider({children}){
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)

    return (
        <TasksContext.Provider value={tasks}>
            <TasksDispatchContext.Provider value={dispatch}>
                {children}
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    )
}

export function useTasks() {
    return useContext(TasksContext)
}

export function useTasksDispatch() {
    return useContext(TasksDispatchContext)
}

function tasksReducer(tasks, action) {
    switch(action.type) {
        case 'added': {
            // 略
        }
        default: {
            throw Error(`Unknown action: ${action.type}`)
        }
    }
}

const initialTasks = [
    { id: 0, text: 'Visit Kafka Museum', done: true },
    { id: 1, text: 'Watch a puppet show', done: false },
    { id: 2, text: 'Lennon Wall pic', done: false }
  ];
~~~

そして、上位のコンポーネントで、`TasksProvider`を使用し、`管理するデータ`と`dispach`の2つのコンテキストを子コンポーネントに提供します。

~~~js
import AddTask from "./add_task";
import TaskList from "./task_list";
import TasksProvider from "./task_context";

export default function TaskApp(){
    return (
        <div className="m-4 p-4 border rounded-md">
            <TasksProvider>
                <h1 className="text-2xl mb-4">Prague itinerary</h1>
                <AddTask></AddTask>
                <TaskList></TaskList>
            </TasksProvider>
        </div>
    )
}
~~~

子コンポーネントでは、`useTasks()`や`useTasksDispatch()`経由で`管理するデータ`と`dispach`を取得し、利用します。

~~~js
// add_task.js
import { useState } from "react"
import { useTasksDispatch } from "./task_context"

export default function AddTask({onAddTask}){
    const [text, setText] = useState('')
    const dispatch = useTasksDispatch()

    return (
        <section>
            <div className="mb-4">
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <button onClick={() => {
                    setText('')
                    dispatch({
                        type: 'added',
                        id: nextId++,
                        text: text
                    })
                }} className="mx-2">Add</button>
            </div>
        </section>
    )
}
let nextId = 3;
~~~

~~~js
// task_list.js
import { useState } from "react"
import { useTasks, useTasksDispatch } from "./task_context"

export default function TaskList(){
    const tasks = useTasks()
    return (
        <section>
            <ul>
                {
                    tasks.map(task => (
                        <li key={task.id}>
                            <Task task={task} />
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}
// 略
~~~

[^1]: 厳密に同じではないですが...
