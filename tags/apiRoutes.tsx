interface Routes {
  SignIn: string;
  SignUp: string;
  Authenticate: string;
  UserInformation: string;
  SubmitPost: string;
}

const BackendRoutes: Routes = {
  SignIn: "http://localhost:8001/v1/login-gl",
  SignUp: "http://localhost:8001/v1/register",
  Authenticate: "http://localhost:8001/v1/auth",
  UserInformation: "http://localhost:8001/v1/user",
  SubmitPost: "http://localhost:8002/v1/submit-post",
};

export const getAPIRoute = () => {
  return BackendRoutes;
};
