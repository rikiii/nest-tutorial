export class SignInRequestBody {
  readonly id: string;
  readonly password: string;
}

export class SignInResponseBody {
  readonly ok!: boolean;
  readonly token: string;
}
