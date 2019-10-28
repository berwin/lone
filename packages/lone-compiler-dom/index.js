import { baseOptions } from './options'
import { createCompiler } from 'lone-compiler-core'

const { compile, compileToFunctions } = createCompiler(baseOptions)

export { compile, compileToFunctions }
