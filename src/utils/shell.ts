

export function shell(cmd: string): string {
  if (cmd.trim() === "") {
    return ""
  }
  switch (cmd.trim()) {
    case "/help":
      return "Available commands: whoami, ls, cat, /files, /blog, /clear"
    case "whoami":
      return "Medlabs, Fullstack Developer, Web Scraper, SysAdmin since 2004"
    case "ls":
      return "projects.md &emsp; passwords.txt &emsp; fsociety.v &emsp; cat.png"
    case "cat":
      return "usage: cat <filename>"
    case "clear":
      return "C"
    case "cat passwords.txt":
      return "facebook: 12345678<br>twitter:wrongpassword<br>reddit: freePal3$Tine<br>paypal: billiondollaraccount6969"
    default:
      return "Command not found."
  }

} 
