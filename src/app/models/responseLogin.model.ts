// user.model.ts

 export interface IUserLogin {
    id: number;
    username: string;
    email: string;
    image: string[]; // En el ejemplo solo hay un elemento en el array, pero puede haber más
    fullname: string;
  }
  
  // user-login.model.ts
  
  export interface IResponseLogin {
    user: IUserLogin;
    token: string;
  }
  