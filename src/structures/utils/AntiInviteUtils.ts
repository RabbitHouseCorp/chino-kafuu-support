export class AntiInviteUtils {
  public static hasInviteOnStatus(activities: object[]) {
    interface Activity {
      type: number
      state: string
    }

    return activities.some((activity: Activity) => activity.type === 4 && this.isInvite(activity.state))
  }

  public static isInvite(text: string) {
    if ((/((?:discord\.gg|discordapp\.com\/invite|discord\.com\/invite|discord\.me|discord\.io))/g).test(text)) {
      const textReplace_1: string = text
        .replace(/(https:\/\/)?(http:\/\/)/g, '')
        .replace(/(discord\.gg|discordapp\.com\/invite|discord\.com\/invite|discord\.me|discord\.io)/g, '')
        .replace(/(\/)/g, '')

      if (textReplace_1.length < 1) return false
      if ((/(\/+(\s+[a-z0-9-.]+)?.+)/g).test(text)) {
        return true
      } else {
        return false
      }
    }

    return (/((?:discord\.gg|discordapp\.com\/invite|discord\.com\/invite|discord\.me|discord\.io))/g).test(text)
  }
}