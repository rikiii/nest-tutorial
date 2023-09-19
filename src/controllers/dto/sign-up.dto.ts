export class SignUpRequestBody {
  readonly id: string;
  readonly email_address: string;
  readonly password: string;
  readonly active: boolean;
  readonly activate_token: string;
}

export class SignUpResponseBody {
  readonly ok!: boolean;
}
