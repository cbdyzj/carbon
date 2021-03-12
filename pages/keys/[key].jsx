import Head from 'next/head'
import Markdown from '../../components/Markdown'
import LocaleSelect from '../../components/LocaleSelect'
import CarbonHead from '../../components/CarbonHead'
import { useState } from 'react'

export default function Key(props) {

    const [editable, setEditable] = useState(false)

    function handleOperate(ev) {
        ev.preventDefault()
        setEditable(!editable)
    }

    return (
        <div>
            <Head>
                <title>{props.theKey} - Keys - carbon</title>
            </Head>
            <Markdown page>
                <CarbonHead />

                <h2 id="key">{props.theKey}</h2>
                <ul>
                    <li>Key类型：文本</li>
                </ul>
                <h3 id="原文">原文</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Locale</th>
                        <th>原文</th>
                        <th>说明</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>zh-CN</td>
                        <td>你好</td>
                        <td>普通语气</td>
                        <td><a href="#">编辑</a></td>
                    </tr>
                    </tbody>
                </table>
                <h3 id="译文">译文</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Locale</th>
                        <th>译文</th>
                        <th>说明</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>zh-CN</td>
                        <td>你好</td>
                        <td>你好</td>
                        <td><a href="#">编辑</a></td>
                    </tr>
                    <tr>
                        <td>en-US</td>
                        <td>Hello</td>
                        <td>Hello</td>
                        <td><a href="#">编辑</a></td>
                    </tr>
                    <tr>
                        <td>ja-JP</td>
                        <td contentEditable={editable}>こんにちは</td>
                        <td contentEditable={editable}>こんにちは</td>
                        <td><a href="#" onClick={handleOperate}>{editable ? '确认' : '编辑'}</a></td>
                    </tr>
                    </tbody>
                </table>

                {/* locale */}
                <hr />
                <LocaleSelect />
            </Markdown>

        </div>
    )
}

export async function getServerSideProps(ctx) {
    return {
        props: {
            theKey: ctx.params?.key,
        }
    }
}
