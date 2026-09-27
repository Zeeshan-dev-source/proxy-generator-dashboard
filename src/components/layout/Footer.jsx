import { Link } from 'react-router-dom'
import socialCircle from '../../assets/icons/social-circle.svg'
import telegramIcon from '../../assets/icons/telegram.png'
import { footerColumns, socialLinks } from '../../data/siteData.js'

function Footer() {
  return (
    <footer className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 py-10 sm:px-6 md:h-[200px] md:flex-row md:items-center md:justify-between md:py-0 xl:px-[149px]">
      <div className="flex flex-wrap gap-y-6 md:self-start md:pt-[57px]">
        <div className="w-full sm:w-[216px]">
          <p className="text-[24px] font-extrabold">DevCa</p>
          <p className="mt-[8px] text-[12px] font-semibold">All rights reserved.</p>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title} className="w-1/3 sm:w-[128px]">
            <p className="text-[14px] font-bold">{column.title}</p>
            <ul className="mt-[12px] flex flex-col gap-[8px]">
              {column.links.map((link, i) => (
                <li key={i}>
                  <Link to={link.to} className="text-[12px] font-semibold transition hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex gap-[16px]">
        {socialLinks.map((social, i) => (
          <a key={i} href={social.href} aria-label={social.label} className="relative block size-[24px] transition hover:opacity-80">
            <img src={socialCircle} alt="" width="24" height="24" className="absolute inset-0" />
            <img src={telegramIcon} alt="" className="absolute top-[7px] left-[6px] size-[11px] object-cover" />
          </a>
        ))}
      </div>
    </footer>
  )
}

export default Footer
