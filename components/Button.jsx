export default function Button(props) {

    let className = 'text-blue-600'

    if (props.disabled) {
        className = 'text-blue-400'
    }
    if (props.className) {
        className = className + ' ' + props.className
    }
    props = {
        ...props,
        className,
    }

    return (
        <button {...props}>
            {props.children}
        </button>
    )
}