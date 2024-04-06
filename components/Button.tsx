import { ComponentChildren } from "https://esm.sh/v128/preact@10.19.6/src/index.js";

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