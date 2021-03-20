export default function Button(props) {

    return (
        <button {...{ ...props, className: `text-blue-600 ${props.className ?? ''}` }}>
            {props.children}
        </button>
    )
}