import { Server } from "./server"

async function bootstrap() {
  try {
    const server = new Server()
    await server.start()
  } catch (error) {
    console.error("Failed to start server:", error)
    process.exit(1)
  }
}

bootstrap()
