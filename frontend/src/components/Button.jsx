/* eslint-disable react/prop-types */

function Button({ children, className, ...rest }) {
    return (
        <button
            {...rest}
            className={`disabled:bg-blue-300 disabled:cursor-not-allowed focus:scale-90 transition-all bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-6 border-2 border-blue-500 hover:border-blue-400 rounded-lg shadow-lg hover:shadow-md ${className}`}
        >
            {children}
        </button>
    );
}
function Right({ leftElement, ...rest }) {
    return (
        <div className="w-full flex justify-end">
            {leftElement}
            <Button {...rest}></Button>
        </div>
    );
}
function Outline({ ...rest }) {
    return (
        <Button
            {...rest}
            className="border-blue-500 bg-transparent !text-blue-500 hover:bg-transparent"
        ></Button>
    );
}

Button.Right = Right;
Button.Outline = Outline;

export default Button;
