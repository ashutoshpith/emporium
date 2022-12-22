export interface IBaseModel {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  isDeleted?: boolean;
  isActive?: boolean;
}
