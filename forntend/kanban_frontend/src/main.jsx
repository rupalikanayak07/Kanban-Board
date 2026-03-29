import { createRoot } from "react-dom/client";
import App from "./App";
import Globalcontext from "./context/Globalcontext";

createRoot(document.getElementById('root')).render(
    <Globalcontext>
        <App />
    </Globalcontext>
)