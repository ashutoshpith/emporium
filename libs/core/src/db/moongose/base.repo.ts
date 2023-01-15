import { BasePaginationInputDtoType } from '@core/core/dto/base-pagination-query.dto';
import { NotFoundException } from '@nestjs/common';
import { Document, FilterQuery, Model, Types, UpdateQuery } from 'mongoose';

export class OrderBy {
  field: string;
  order: string;
}
export class FindProps {
  skip: number;
  orderBy: OrderBy;
  limit: number;
}
export abstract class BaseRepo<TDoc extends Document<any>> {
  constructor(protected model: Model<TDoc>) {}

  newId(): string {
    return new Types.ObjectId().toHexString();
  }

  async find(filterQuery: FilterQuery<BasePaginationInputDtoType>) {
    const { skip, limit, where } = filterQuery;
    const res = await this.model
      .find({
        ...where,
        isDeleted: false,
        isActive: true,
      })
      .limit(limit)
      .skip(skip);

    const count = await this.model.countDocuments({
      isDeleted: false,
      isActive: true,
      ...where,
    });
    const resp = {
      doc: res,
      count,
    };
    return resp;
  }

  async findOne(filter: FilterQuery<TDoc>): Promise<TDoc> {
    return this.model.findOne(filter);
  }

  async findOneAndUpdate(
    filter: FilterQuery<TDoc>,
    updateQuery: UpdateQuery<TDoc>,
  ) {
    return this.model.findOneAndUpdate(filter, updateQuery);
  }

  async findById(_id: string) {
    const res = await this.model.findById(_id);
    if (!res) {
      throw new NotFoundException(['Not Found']);
    }
    return res;
  }

  async create(_id: string, payload: FilterQuery<TDoc>): Promise<string> {
    const res = new this.model(payload);
    res._id = _id;
    await res?.save();
    return res._id;
  }

  async updateOne(
    filter: FilterQuery<TDoc>,
    payload: UpdateQuery<TDoc>,
  ): Promise<string> {
    await this.model.updateOne(filter, payload);
    return filter._id;
  }

  async deleteOne(_id: string): Promise<string> {
    const fields: UpdateQuery<TDoc> = {
      isDeleted: true,
      isActive: false,
    };
    const res = await this.model.findById(_id);
    if (!res) {
      throw new NotFoundException(['Not Found']);
    }
    await res?.updateOne({ fields });
    return res._id;
  }
}
