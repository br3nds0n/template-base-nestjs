import { BaseEntity } from '@/common';

export type UserProps = {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
};

export class UserEntity extends BaseEntity<UserProps> {
  constructor(
    public readonly props: UserProps,
    id?: string,
  ) {
    super(props, id);
  }

  static create(props: UserProps): UserEntity {
    props.createdAt = new Date();
    return new UserEntity(props, null);
  }

  update(name: string): void {
    this.name = name;
  }

  updatePassword(value: string): void {
    this.password = value;
  }

  get name(): string {
    return this.props.name;
  }

  private set name(name: string) {
    this.props.name = name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  private set password(value: string) {
    this.props.password = value;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
