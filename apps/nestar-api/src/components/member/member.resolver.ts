import { Mutation, Resolver, Query } from '@nestjs/graphql';
import { MemberService } from './member.service';

@Resolver()
export class MemberResolver {
	constructor(private readonly memberService: MemberService) {}

	@Mutation(() => String)
	public async signUp(): Promise<string> {
		console.log('Mutation: Sign Up');
		return this.memberService.signUp();
	}
	@Mutation(() => String)
	public async login(): Promise<string> {
		console.log('Mutation: Login');
		return this.memberService.login();
	}

	@Mutation(() => String)
	public async updateMember(): Promise<string> {
		console.log('Mutation: Update Member');
		return this.memberService.updateMember();
	}

	@Query(() => String)
	public async getMember(): Promise<string> {
		console.log('Query: Get Member');
		return this.memberService.getMember();
	}
}
