import Head from 'next/head'
import Cookies from 'js-cookie'
import Markdown from '../components/Markdown'
import CarbonHead from '../components/CarbonHead'
import LocaleSelect from '../components/LocaleSelect'
import Button from '../components/Button'
import { useState } from 'react'

const TICKET = 'ticket'

export default function Apps(props) {

    const [ticket, setTicket] = useState(() => Cookies.get(TICKET) || '')

    function handleUpdateTicket() {
        Cookies.set(TICKET, ticket)
    }

    function handleInputValueChange(ev) {
        setTicket(ev.target.value)
    }

    return (
        <div>
            <Head>
                <title>Apps - carbon</title>
            </Head>
            <Markdown page>
                <CarbonHead />
                <h2 id="Ticket">Ticket</h2>

                <input className="border-b outline-none" type="text" value={ticket} onChange={handleInputValueChange} />
                <br />
                <Button onClick={handleUpdateTicket}>更新Ticket</Button>

                {/* locale */}
                <hr />
                <LocaleSelect />
            </Markdown>
        </div>
    )
}