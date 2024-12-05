interface ContainerProps {
    children: React.ReactNode
}

export default function ListContainer(props: ContainerProps){
    return(
        <div
        className="w-full bg-slate-700 mt-4 overflow-y-auto px-2 pb-2 border-2 rounded-lg drop-shadow-xl"
        style={{ maxHeight: 'calc(95vh - 180px)', boxShadow: '0 4px 6px rgba(255, 255, 255, 0.5)' }}
      >
         {props.children}
      </div>
    )
}