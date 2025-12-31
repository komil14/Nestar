import { Injectable } from '@nestjs/common';

@Injectable()
export class MemberService {
	public async signUp(): Promise<string> {
		return 'User signed up';
	}
	public async login(): Promise<string> {
		return 'User logged in';
	}

	public async updateMember(): Promise<string> {
		return 'User updated';
	}

	public async getMember(): Promise<string> {
		return 'User data';
	}
}
