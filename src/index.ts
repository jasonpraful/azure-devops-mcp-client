#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

import { VERSION } from './version.js'

console.log(`Azure Devops MCP Server v${VERSION}`)
;[
  'AZURE_DEVOPS_ORG_URL',
  'AZURE_DEVOPS_PROJECT_NAME',
  'AZURE_DEVOPS_PERSONAL_ACCESS_TOKEN'
].forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`${envVar} environment variable is not set`)
  }
})

const server = new McpServer(
  {
    name: 'Azure DevOps MCP Server',
    version: VERSION
  },
  {
    capabilities: {
      tools: {}
    }
  }
)

// WIP

async function runServer() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

runServer().catch((error) => {
  console.error('Fatal error in main():', error)
  process.exit(1)
})
