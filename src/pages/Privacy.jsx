import LegalPage from '../components/legal/LegalPage.jsx'
import PillButton from '../components/ui/PillButton.jsx'
import { privacyPage } from '../data/legalData.js'

function Privacy() {
  return <LegalPage page={privacyPage} action={<PillButton variant="pink">My Cookie Preferences</PillButton>} />
}

export default Privacy
