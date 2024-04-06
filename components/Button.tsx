import { ComponentChildren } from "preact";

interface ButtonProps {
    children: ComponentChildren;
}

const Button = ({children} : ButtonProps ) => {
    return ( 
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  {children}
</button>
     );
}
 
export default Button;