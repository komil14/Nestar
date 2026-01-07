import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';
import { InternalServerErrorException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import type { ObjectId } from 'mongoose';

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
	@Mutation(() => String)
	public async updateMember(@AuthMember('_id') memberId: ObjectId): Promise<string> {
		console.log('Mutation updateMember');
		console.log('authMember in updateMember:', memberId);
		return await this.memberService.updateMember();
	}
	@UseGuards(AuthGuard)
	@Query(() => String)
	public async checkAuth(@AuthMember('memberNick') memberNick: string): Promise<string> {
		console.log('Query checkAuth');
		console.log('Hello', memberNick);
		return 'Hello ' + memberNick;
	}

	@Query(() => String)
	public async getMember(): Promise<string> {
		console.log('Query getMember');
		return await this.memberService.getMember();
	}

	/*ADMIN*/

	/*Authorization*/
	@Mutation(() => String)
	public async getAllMembersByAdmin(): Promise<string> {
		console.log('Mutation getAllMembersByAdmin');
		return await this.memberService.getAllMembersByAdmin();
	}

	@Mutation(() => String)
	public async updateMembersByAdmin(): Promise<string> {
		console.log('Mutation updateMemberByAdmin');
		return await this.memberService.updateMembersByAdmin();
	}
}
