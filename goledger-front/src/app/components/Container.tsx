interface ContainerProps {
    children: React.ReactNode
}
export function Container(props: ContainerProps) {
    return (
        <div className=" bg-customBg p-3 px-8  min-h-screen flex flex-col font-dmSans text-customBg ">
            {props.children}
        </div>
    )
}