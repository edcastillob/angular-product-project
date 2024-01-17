 export interface IUserLogin {
    id: number;
    username: string;
    email: string;
    image: string[]; 
    fullname: string;
  }  

  
  export interface IResponseLogin {
    user: IUserLogin;
    token: string;
  }
  