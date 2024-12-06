interface ContainerProps {
    children: React.ReactNode
}
export function Container(props: ContainerProps) {
    return (
        <div className=" bg-customBg p-3 px-20 md:px-32 lg:px-44 xl:px-60 2xl:px-[30rem] h-screen flex flex-col  font-dmSans text-customBg ">
            {props.children}
        </div>
    )
}