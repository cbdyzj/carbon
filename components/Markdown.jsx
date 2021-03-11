import marked from 'marked'

export default function Markdown(props) {
    const markdownProps = { className: 'markdown-body' }

    if (typeof props.children === 'string') {
        markdownProps.dangerouslySetInnerHTML = {
            __html: marked(props.children || '')
        }
    } else {
        markdownProps.children = props.children
    }

    if (!props.page) {
        return <div {...markdownProps} />
    }

    return (
        <div className="flex justify-center">
            <div style={{
                margin: '10px 0 30px 0',
                width: '85%',
                maxWidth: '800px',
                fontSize: '18px'
            }} {...markdownProps} />
        </div>
    )
}