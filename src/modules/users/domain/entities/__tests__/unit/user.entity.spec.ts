import { faker } from '@faker-js/faker';
import { UserEntity, UserProps } from '../../user.entity';

describe('UserEntity', () => {
  it('Constructor method', () => {
    const props: UserProps = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const user = new UserEntity(props);

    expect(user.props.name).toEqual(props.name);
    expect(user.props.email).toEqual(props.email);
    expect(user.props.password).toEqual(props.password);
  });
});
