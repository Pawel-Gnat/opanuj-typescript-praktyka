type Identity = {
  id: string;
  userName: string;
  provider: 'google' | 'apple' | 'reddit';
};

const users: ReadonlyArray<Identity> = [
  { id: '1', provider: 'google', userName: 'John Doe' },
  { id: '2', provider: 'apple', userName: 'Kate Williams' },
  { id: '3', provider: 'google', userName: 'Jane Doe' },
  { id: '4', provider: 'reddit', userName: 'Alex Smith' },
  { id: '5', provider: 'google', userName: 'Mike Johnson' },
  { id: '6', provider: 'reddit', userName: 'John Doe' },
];

export class IdentityProcessor<T extends Identity> {
  private readonly provider: Identity['provider'];

  constructor(provider: Identity['provider']) {
    this.provider = provider;
  }

  findById(id: string): Identity | undefined {
    return users.find((user) => user.id === id && user.provider === this.provider);
  }

  findByUserName(userName: string): Identity | undefined {
    return users.find((user) => user.userName === userName && user.provider === this.provider);
  }
}
