import CredentialProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Email',
          type: 'text',
          placeholder: 'jsmith@gmail.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' };

        if (user) {
          return user;
        } else {
          // If youx return null then an error will be displayed advising the user to check their details.
          return null;
        }
      },
    }),
  ],
};
