interface Routes {
  SignIn: string;
}

const BackendRoutes: Routes = {
  SignIn: "http://localhost:8001/v1/login-gl",
};

export const getAPIRoute = () => {
  return BackendRoutes;
};
