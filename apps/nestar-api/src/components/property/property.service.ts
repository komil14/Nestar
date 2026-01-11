import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Property } from '../../libs/dto/property/property';
import { PropertyInput } from '../../libs/dto/property/property.input';
import { Message } from '../../libs/enums/common.enum';
import { MemberService } from '../member/member.service';

@Injectable()
export class PropertyService {
	constructor(
		@InjectModel('Property') private readonly propertyModel: Model<Property>,
		private readonly memberService: MemberService,
	) {}

	public async createProperty(input: PropertyInput): Promise<Property> {
		try {
			const result = await this.propertyModel.create(input);
			//Increase memberProperties
			const modifyInput = {
				_id: result.memberId,
				targetKey: 'memberProperties',
				modifier: 1,
			};
			await this.memberService.memberStatsEditor(modifyInput);
			return result;
		} catch (err) {
			console.log('Error: Service signup', err.message);
			throw new BadRequestException(Message.CREATE_FAILED);
		}
	}
}
