import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
// import { PagingInputDto, SortingInputDto } from '../dtos';
import { ES, ESDocument } from './es.schema';

@Injectable()
export class ESRepo {
  constructor(@InjectModel(ES.name) private model: Model<ESDocument>) {}
  // async findMany(
  //   filter: FilterQuery<ESDocument>,
  //   pagingInput: PagingInputDto = { limit: 100, offset: 0 },
  //   sortingInput: SortingInputDto[] = [{ field: 'commitStamp', order: -1 }],
  // ) {
  //   if (pagingInput.limit > 100) {
  //     pagingInput.limit = 100;
  //   }
  //   filter = { ...filter };
  //   const { limit, offset } = pagingInput;
  //   const skip = offset * limit;
  //   const sortFields = {};
  //   sortingInput.forEach(item => {
  //     Object.assign(sortFields, { [item.field]: item.order });
  //   });
  //   return {
  //     count: await this.model.count(filter),
  //     items: (await this.model.find(filter).sort(sortFields).limit(limit).skip(skip)).map(e => e?.payload),
  //   };
  // }
}
