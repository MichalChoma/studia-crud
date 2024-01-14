export interface INotification {
  status: EStatus;
  message: string;
}

export enum EStatus {
  SUCCESS = "success",
  ERROR = "error",
}
