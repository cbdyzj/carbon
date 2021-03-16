import Head from 'next/head'
import Markdown from '../../components/Markdown'
import LocaleSelect from '../../components/LocaleSelect'
import CarbonHead from '../../components/CarbonHead'
import { useState } from 'react'
import { assert } from '../../utils/assert'

export default function Key(props) {

    const [editable, setEditable] = useState(false)

    function handleOperate(ev) {
        ev.preventDefault()
        setEditable(!editable)
    }

    const { carbonKey } = props
    assert(carbonKey, 'carbonKey must be not null')

    return (
        <div>
            <Head>
                <title>{carbonKey.key} - Keys - carbon</title>
            </Head>
            <Markdown page>
                <CarbonHead />

                <h2 id="key">{carbonKey.key}</h2>
                <ul>
                    <li>类型：文本</li>
                </ul>
                <h3 id="原文">原文</h3>

                <div className="mb-0.5">
                    <select defaultValue="ja-JP">
                        <option value="zh-CN">zh-CN</option>
                        <option value="zh-HK">zh-HK</option>
                        <option value="ja-JP">ja-JP</option>
                    </select>
                </div>

                <table>
                    <thead>
                    <tr>
                        <th>原文</th>
                        <th>说明</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className={editable ? 'bg-blue-50' : ''} contentEditable={editable}>こんにちは</td>
                        <td className={editable ? 'bg-blue-50' : ''} contentEditable={editable}>こんにちは</td>
                        <td><a href="#" onClick={handleOperate}>{editable ? '确认' : '编辑'}</a></td>
                    </tr>
                    </tbody>
                </table>

                <h3 id="译文">译文</h3>

                <div className="mb-0.5">
                    <select defaultValue="ja-JP">
                        <option value="zh-CN">zh-CN</option>
                        <option value="zh-HK">zh-HK</option>
                        <option value="ja-JP">ja-JP</option>
                    </select>
                </div>

                <table>
                    <thead>
                    <tr>
                        <th>译文</th>
                        <th>说明</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className={editable ? 'bg-blue-50' : ''} contentEditable={editable}>こんにちは</td>
                        <td className={editable ? 'bg-blue-50' : ''} contentEditable={editable}>こんにちは</td>
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
            carbonKey: {
                key: ctx.params?.key
            }
        }
    }
}
