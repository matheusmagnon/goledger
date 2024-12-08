interface ContainerProps {
    children: React.ReactNode;
  }
  
  export default function ListContainer(props: ContainerProps) {
    return (
      <div className="flex flex-wrap gap-4 p-4 justify-center">
        {props.children}
      </div>
    );
  }
  