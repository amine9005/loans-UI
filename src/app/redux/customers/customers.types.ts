export interface customer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
}

export interface customersArray extends Array<customer> {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
}

export interface response {
  isLoading: boolean;
  error: boolean;
  data: [];
}
