import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { AgentsInquiry, LoginInput, MemberInput, MembersInquiry } from '../../libs/dto/member/member.input';
import { Member, Members } from '../../libs/dto/member/member';
import { InternalServerErrorException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import type { ObjectId } from 'mongoose';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { MemberUpdate, MemberUpdateForAdmin } from '../../libs/dto/member/member.update';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { WithoutGuard } from '../auth/guards/without.guard';

@Resolver()
export class MemberResolver {
	constructor(private readonly memberService: MemberService) {}

	@Mutation(() => Member)
	public async signup(@Args('input') input: MemberInput): Promise<Member> {
		try {
			console.log('Mutation signup');
			console.log('input', input);
			return await this.memberService.signup(input);
		} catch (err) {
			console.log('ERROR: signup', err);
			throw new InternalServerErrorException(err);
		}
	}

	@Mutation(() => Member)
	public async login(@Args('input') input: LoginInput): Promise<Member> {
		try {
			console.log('Mutation login');
			return await this.memberService.login(input);
		} catch (err) {
			console.log('ERROR: login', err);
			throw new InternalServerErrorException(err);
		}
	}

	/*Authenticated*/

	@UseGuards(AuthGuard)
	@Query(() => String)
	public async checkAuth(
		@AuthMember('memberNick') memberNick: string,
		@AuthMember('_id') memberId: ObjectId,
		@AuthMember('memberType') memberType: MemberType,
	): Promise<string> {
		console.log('Query checkAuth');
		console.log('Hello', memberNick);
		return `Wassup ${memberNick}, you are ${memberType} and your id ( ${memberId} ) `;
	}
	@Roles(MemberType.USER)
	@UseGuards(RolesGuard)
	@Query(() => String)
	public async checkAuthRoles(
		@AuthMember('memberType')
		memberType: string,
	): Promise<string> {
		console.log('Mutation: checkAuthRoles');
		console.log(memberType);
		return `Wassup ${memberType}`;
	}

	@UseGuards(AuthGuard)
	@Mutation(() => Member)
	public async updateMember(
		@Args('input') input: MemberUpdate,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Member> {
		console.log('Mutation updateMember');
		delete input._id;
		return await this.memberService.updateMember(memberId, input);
	}

	@UseGuards(WithoutGuard)
	@Query(() => Member)
	public async getMember(@Args('memberId') input: string, @AuthMember('_id') memberId: ObjectId): Promise<Member> {
		console.log('Query getMember');
		console.log('memberID ====>', memberId);
		const targetId = shapeIntoMongoObjectId(input);
		return await this.memberService.getMember(memberId, targetId);
	}

	@UseGuards(WithoutGuard)
	@Query(() => Members)
	public async getAgents(@Args('input') input: AgentsInquiry, @AuthMember('_id') memberId: ObjectId): Promise<Members> {
		console.log('Query getAgents');
		return await this.memberService.getAgents(memberId, input);
	}

	/*ADMIN*/

	/*Authorization*/
	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Query(() => Members)
	public async getAllMembersByAdmin(@Args('input') input: MembersInquiry): Promise<Members> {
		console.log('QUERY: getAllMembersByAdmin');
		return await this.memberService.getAllMembersByAdmin(input);
	}

	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Mutation(() => Member)
	public async updateMemberByAdmin(@Args('input') input: MemberUpdateForAdmin): Promise<Member> {
		console.log('Mutation: updateMemberByAdmin');
		return await this.memberService.updateMemberByAdmin(input);
	}
}
