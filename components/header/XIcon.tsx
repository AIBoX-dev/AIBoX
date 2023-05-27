export const XIcon = ({
    size = 0,
    fill = "",
    width = 24,
    height = 24,
    ...props
}) => {
    return (
        <svg
            fill="none"
            height={size || height}
            viewBox="0 0 24 24"
            width={size || width}
            {...props}
        >
            <path
                d="M6 18L18 6M6 6l12 12"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
            />
        </svg>
    );
};
