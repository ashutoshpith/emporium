export interface IModelState {
  _id: string;
  isDeleted?: boolean;
  createdBy: any;
  lastUpdatedBy?: any;
  createdAt: Date;
  updatedAt?: Date;
  deletedBy?: any;
  deletedHistory: any[];
  reCreatedHistory: any[];
  isActive?: boolean;
  isDefault?: boolean;
  isMigrated?: boolean;
  lastCounsellorActivityDate?: Date;
}
