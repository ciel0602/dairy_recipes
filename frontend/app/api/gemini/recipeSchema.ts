export const recipeSchema = {
  type: "object",

  properties: {
    title: {
      type: "string",
      description: "レシピのタイトル",
    },

    description: {
      type: ["string", "null"],
      description: "レシピの説明",
    },

    currentIngredients: {
      type: ["array", "null"],
      items: {
        type: "object",

        properties: {
          name: {
            type: "string",
            description: "材料名",
          },

          amount: {
            type: ["number", "null"],
            description: "材料の量。不明な場合はnull",
          },

          unit: {
            type: "string",
            description: "単位。例：g、ml、大さじ、個など",
          },
        },

        required: ["name", "amount", "unit"],
      },
    },

    currentSteps: {
      type: ["array", "null"],
      items: {
        type: "object",

        properties: {
          title: {
            type: "string",
            description: "手順グループのタイトル。例：下ごしらえ、調理など",
          },

          steps: {
            type: "array",

            items: {
              type: "object",

              properties: {
                step: {
                  type: "integer",
                  description: "手順番号",
                },

                description: {
                  type: ["string", "null"],
                  description: "調理手順",
                },
              },

              required: ["step", "description"],
            },
          },
        },

        required: ["title", "steps"],
      },
    },
  },

  required: [
    "title",
    "description",
    "currentIngredients",
    "currentSteps",
  ],
};