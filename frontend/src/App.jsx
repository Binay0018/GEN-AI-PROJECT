import { RouterProvider } from "react-router"
import {router} from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { useAuth } from "./features/auth/hooks/useAuth.js"

function App() {
  
  return(

    <AuthProvider >
    <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
