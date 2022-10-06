import React, { ComponentProps, ForwardedRef } from "react";

interface Props extends ComponentProps<'svg'> {
    title?: string;
    titleId?: string;
}

function Icon(
    { title, titleId, ...props }: Props,
    svgRef: ForwardedRef<SVGSVGElement>
) {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden={true}
            aria-labelledby={titleId}
            xmlns="http://www.w3.org/2000/svg"
            ref={svgRef}
            {...props}
        >
            {title ? <title id={titleId}>{title}</title> : null}
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
    );
}

const ForwardRef = React.forwardRef(Icon);
export default ForwardRef;
