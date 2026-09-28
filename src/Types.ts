 export interface ILogin{
  email :string,
  password: string,
}



 export enum Roles {
  Admin = "ADMIN",
  Teacher = "TEACHER",
  Student = "STUDENT"
}


export interface ISignUp{
  name:string,
  email:string,
  password:string,
  role:Roles,
}


export interface DeletePopupProps {
  open: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export interface User{
  id:number;
  token:string;
  name:string;
  email:string;
}

export interface IAuthContext{
  user: User | null;
  login : (user:User)=>void;
  logout: ()=>void;
}

