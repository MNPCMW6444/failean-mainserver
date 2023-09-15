const Query = {
    getCritiqValidation: async (
        _,
        {ideaID, critiqAnswers},
        {models}
    ) => {
        const idea = await models.Idea.findById(ideaID);
        const prompts = idea.prompts;

        let results = [];
        for (let prompt of prompts) {
            const response = await runCritiq(prompt, critiqAnswers);
            results.push(response);
        }

        return results;
    },
};

function runCritiq(prompt, critiqAnswers) {
    throw new Error("runCritiq Function not implemented.");
}
