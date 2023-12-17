import { Injectable } from "@nestjs/common";

@Injectable()
export class RandomPass {
	generate = (): string => {
		let generatePassword = "";
		const characters =
			"abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";

		for (var i = 0; i < 10; i++) {
			generatePassword += characters.charAt(
				Math.floor(Math.random() * characters.length)
			);
		}
		return generatePassword;
	};
}
