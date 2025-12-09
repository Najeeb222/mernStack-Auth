import { AuthProvider, ToastProvider } from "context"
import Routes from "core/Routes/Routes"



const App = () => {
  return (

    <AuthProvider>
      <ToastProvider>


        <Routes />
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
