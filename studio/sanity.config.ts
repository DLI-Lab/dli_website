import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {codeInput} from '@sanity/code-input'
import {schemaTypes} from './schemaTypes'
import {CustomStudioLayout} from './components/CustomStudioLayout'

export default defineConfig({
  name: 'default',
  title: 'dli_studio',

  projectId: 'l016ip9y',
  dataset: 'production',

  // Comments 기능 비활성화
  document: {
    comments: {
      enabled: false,
    },
  },

  plugins: [
    structureTool(),
    visionTool(),
    codeInput(),
  ],

  studio: {
    components: {
      layout: CustomStudioLayout,
    },
  },

  schema: {
    types: schemaTypes,
  },
})
