import {
  defineConfig,
  defineToolFunction,
  resolveFirstTextContentFromChatCmpl,
  system,
  toolFunction,
  user,
} from '@herta-ai/provider-xsai/openai'
import * as z from 'zod'

async function main() {
  const { call } = defineConfig({
    provider: {
      baseURL: 'http://localhost:11434/v1',
      apiKey: 'unuse',
    },
    tools: [
      defineToolFunction(
        await toolFunction('getCity', 'Get the user\'s city', z.object({})),
        async () => {
          return 'New York City'
        },
        {
          hooks: {
            preInvoke: async () => {
              // eslint-disable-next-line no-console
              console.log('getCity called')
            },
          },
        },
      ),
      defineToolFunction(
        await toolFunction(
          'getCityCode',
          'Get the user\'s city code with search',
          z.object({
            location: z
              .string()
              .min(1)
              .describe('Get the user\'s city code with search'),
          }),
        ),
        async () => {
          return 'NYC'
        },
        {
          hooks: {
            preInvoke: async () => {
              // eslint-disable-next-line no-console
              console.log('getCityCode called')
            },
          },
        },
      ),
      defineToolFunction(
        await toolFunction(
          'getWeather',
          'Get the current weather',
          z.object({
            cityCode: z
              .string()
              .min(1)
              .describe('Get the user\'s city code with search'),
          }),
        ),
        async ({ parameters: { cityCode } }) => {
          return {
            city: `New York city`,
            cityCode,
            weather: 'sunny',
            degreesCelsius: 26,
          }
        },
        {
          hooks: {
            preInvoke: async () => {
              // eslint-disable-next-line no-console
              console.log('getWeather called')
            },
          },
        },
      ),
    ],
  })

  const res = await call(
    [
      system(
        'I am a helpful assistant here to provide information of user, user may ask you anything. Please identify the user\'s need, and pick up the right tool to obtain the necessary information.',
      ),
      user('What is the weather like today?'),
    ],
    {
      model: 'qwen3:8b',
    },
  )

  return resolveFirstTextContentFromChatCmpl(res)
}

// eslint-disable-next-line no-console
main().then(console.log).catch(console.error)
