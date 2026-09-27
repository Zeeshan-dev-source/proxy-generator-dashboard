import layersIcon from '../assets/icons/layers-fill.svg'
import homeIcon from '../assets/icons/home-fill.svg'
import userBoxIcon from '../assets/icons/user-box-fill.svg'
import datacenterButtonBg from '../assets/icons/btn-bg-datacenter.svg'
import residentialButtonBg from '../assets/icons/btn-bg-residential.svg'
import customButtonBg from '../assets/icons/btn-bg-custom.svg'
import avatar from '../assets/images/avatar-large.png'

export const heroContent = {
  title: 'Start using our proxies today',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa laboriosam  voluptates sed beatae?',
}

export const expertsContent = {
  title: 'Built by real experts',
  intro:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa laboriosam  voluptates sed beatae?',
  points: [
    'Lorem ipsum dolor si',
    'Lorem ipsum dolor si',
    'Lorem ipsum dolor si',
    'Lorem ipsum dolor si',
  ],
  outro:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa laboriosam  voluptates sed beatae?',
}

export const plans = [
  {
    title: 'Datacenter',
    titleClass: 'text-datacenter',
    icon: { src: layersIcon, width: 41.85, height: 40.3 },
    features: ['Super good', 'High monthly volumes', 'Lorem Ipsum', 'Value for money'],
    cta: 'Buy for $10.00/day',
    buttonBg: datacenterButtonBg,
  },
  {
    title: 'Residential',
    titleClass: 'text-residential',
    icon: { src: homeIcon, width: 40.3, height: 40.3 },
    features: ['Super good', 'High monthly volumes', 'Lorem Ipsum', 'Value for money'],
    cta: 'Buy for $5.00/day',
    buttonBg: residentialButtonBg,
  },
  {
    title: 'Your choice',
    titleClass: 'text-primary',
    icon: { src: userBoxIcon, width: 39, height: 39 },
    features: ['Completely customized', 'High monthly volumes', 'Lorem Ipsum', 'Value for money'],
    cta: 'Create Custom Offer',
    buttonBg: customButtonBg,
  },
]

export const testimonials = [
  {
    name: 'Daniel',
    role: 'Growth Marketer',
    rating: 5,
    title: 'Fast proxies, zero hassle',
    text: 'We moved our ad verification to the residential plan and blocked requests dropped almost to zero. The dashboard makes it easy to rotate IPs per campaign, and support answered every question within the hour. For the price, nothing else we tested came close.',
    avatar,
  },
  {
    name: 'Leo',
    role: 'Lead Designer',
    rating: 4,
    title: 'It was a very good experience',
    text: 'I needed a reliable way to test our app from different regions, and ProxySmart just worked. Sign-up was quick, the datacenter proxies are fast, and the one-click setup meant I never had to touch a config file. I only wish there were a few more city-level locations.',
    avatar,
  },
  {
    name: 'Omar',
    role: 'Data Engineer',
    rating: 4,
    title: 'Setup took under 5 minutes',
    text: 'Our scraping pipeline sends thousands of requests a day and the custom offer fit our volume perfectly. Uptime has been solid for three months now. The documentation could be more detailed, but the team helped us tune our rotation settings on a quick call.',
    avatar,
  },
  {
    name: 'Alex',
    role: 'Product Manager',
    rating: 5,
    title: 'Support that actually helps',
    text: 'We had a tricky geo-targeting requirement for a product launch and expected a week of back and forth. Instead, support walked us through the setup the same afternoon. The proxies have been stable ever since, and billing is simple enough that finance stopped asking me questions.',
    avatar,
  },
  {
    name: 'Sam',
    role: 'SEO Specialist',
    rating: 4,
    title: 'Great value for money',
    text: 'I track rankings for a dozen clients across different countries, and the residential proxies give me clean, accurate results every time. It costs less than the tool I used before and is noticeably faster. A mobile app for checking usage on the go would make it perfect.',
    avatar,
  },
  {
    name: 'Jordan',
    role: 'QA Engineer',
    rating: 5,
    title: 'Stable IPs, every single day',
    text: 'Our end-to-end tests run from several regions every night, and flaky network failures used to be our biggest headache. Since switching to ProxySmart those failures have basically disappeared. Setting up a new location takes one click, which our whole team appreciates.',
    avatar,
  },
]
