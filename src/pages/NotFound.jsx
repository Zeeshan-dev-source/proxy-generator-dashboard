import { Link } from 'react-router-dom'
import Container from '../components/ui/Container.jsx'

function NotFound() {
  return (
    <Container className="pt-16 pb-24 lg:pt-[143px] lg:pb-[144px]">
      <h1 className="text-[36px] font-bold md:text-[48px]">Page not found</h1>
      <p className="mt-6 max-w-[550px] text-[18px] md:text-[20px]">This page doesn’t exist yet.</p>
      <Link
        to="/"
        className="mt-8 inline-flex h-[44px] w-[200px] items-center justify-center rounded-[10px] bg-primary text-[20px] font-bold text-surface transition hover:brightness-110"
      >
        Back to Home
      </Link>
    </Container>
  )
}

export default NotFound
