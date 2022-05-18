interface Routes {
  SignIn: string;
  SignUp: string;
  Authenticate: string;
  UserInformation: string;
  SubmitPost: string;
  GetUserPosts: string;
  GetUserTimeline: string;
  GetPost: string;
  AdminEndPoint: string;
  GetLatestPosts: string;
  UserSocialStatistics: string;
  MuteUser: string;
  BanUser: string;
  Search: string;
  FollowUser: string;
  UnfollowUser: string;
}

const BackendRoutes: Routes = {
  SignIn: "http://localhost:8001/v1/login-gl",
  SignUp: "http://localhost:8001/v1/register",
  Authenticate: "http://localhost:8001/v1/auth",
  UserInformation: "http://localhost:8001/v1/user",
  MuteUser: "http://localhost:8001/v1/user/mute",
  BanUser: "http://localhost:8001/v1/user/ban",
  SubmitPost: "http://localhost:8002/v1/submit-post",
  GetUserPosts: "http://localhost:8002/v1/user/profile",
  GetUserTimeline: "http://localhost:8002/v1/user/timeline",
  GetPost: "http://localhost:8002/v1/post",
  AdminEndPoint: "http://localhost:8005/",
  GetLatestPosts: "http://localhost:8002/v1/post/latest",
  UserSocialStatistics: "http://localhost:8003/v1/stats",
  Search: "http://localhost:8003/v1/search",
  FollowUser: "http://localhost:8003/v1/follow",
  UnfollowUser: "http://localhost:8003/v1/unfollow",
};

export const getAPIRoute = () => {
  return BackendRoutes;
};
