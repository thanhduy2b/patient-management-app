export interface IPatient {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    mobile: string;
    appointments?: IAppointment[];
}

export interface IAppointment {
  dateTime: Date,
  status: string,
  notes: string
}

export interface IPagedResults<T> {
    totalRecords: number;
    results: T;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IApiResponse {
    status: boolean;
    error?: string;
}
