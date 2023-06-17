const Mutation = {
  createUser: async (
    _: any,
    { username, email, password }: any,
    context: any
  ) => {
    // your logic to create a user goes here
    // for instance, use bcrypt to hash the password and mongoose to save the user to MongoDB
  },
};

export default Mutation;
