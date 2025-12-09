// Routes.tsx
import { ROUTES } from "constant"
import { NormaleRoute, SecureRoute } from "hocs"
import { Route, Routes as ReactRoutes } from "react-router"
import {  DashboardScreen,  Login, SignUp } from "screens"

const Routes = () => {
  return (
    <ReactRoutes>
      <Route element={<SecureRoute />}>
        <Route path={ROUTES.HOME} element={<DashboardScreen />} />
      </Route>

      <Route element={<NormaleRoute />}>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        {/* <Route path={ROUTES.FORGOT_PASSWORDS} element={<ForgotPassword />} /> */}
        <Route path={ROUTES.SIGNUP} element={<SignUp />} />
        {/* <Route path={ROUTES.SET_PASSWORD} element={<ChangePassword />} /> */}
      </Route>
    </ReactRoutes>
  )
}

export default Routes