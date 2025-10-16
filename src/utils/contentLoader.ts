// Content loader utility for loading text files
// This will be replaced with actual file imports in the build process

import welcomeContent from '../content/welcome.txt?raw'
import helpContent from '../content/help.txt?raw'
import aboutContent from '../content/about.txt?raw'
import skillsContent from '../content/skills.txt?raw'
import projectsContent from '../content/projects.txt?raw'
import experienceContent from '../content/experience.txt?raw'
import contactContent from '../content/contact.txt?raw'

export const content = {
  welcome: welcomeContent,
  help: helpContent,
  about: aboutContent,
  skills: skillsContent,
  projects: projectsContent,
  experience: experienceContent,
  contact: contactContent
}
