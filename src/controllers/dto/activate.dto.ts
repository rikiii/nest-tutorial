export class ActivateRequestQuery {
  readonly user_id: string;
  readonly activate_token: string;
}

export class ActivateResponseBody {
  readonly ok!: boolean;
}
