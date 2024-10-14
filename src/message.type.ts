export type Message = {
  type: string
  data: BotPress
}

export type BotPress = {
  type: string
  data: {
    id: string
    userId: string
    conversationId: string
    isBot: boolean
    createdAt: string
    payload: {
      type: string
      text: string
    }
  }
}
