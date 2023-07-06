const Mutation = {
  saveCritiqAnswers: async (
    _: any,
    { ideaID, critiqAnswers }: any,
    { models }: any
  ) => {
    try {
      await models.Critiq.create({
        owner: ideaID,
        steps: critiqAnswers,
      });

      return { success: true };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to save Critiq answers");
    }
  },
};
