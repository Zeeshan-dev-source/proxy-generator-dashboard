export const faqIntro = {
  title: 'FAQ',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa laboriosam  voluptates sed beatae?',
}

const placeholderAnswer = [
  'What is a proxy generator and how do i use it cause this is a longer question to test the boundaries of this FAQ entry and how it should look for dev.',
  'What is a proxy generator and how do i use it cause this is a longer question to test the boundaries of this FAQ entry and how it should look for dev.',
  'What is a proxy generator and how do i use it cause this is a longer question to test the boundaries of this FAQ entry and how it should look for dev.',
]

// `title` is the heading in the answer panel; it falls back to the question
export const faqs = [
  { question: 'What is a proxy generator?', answer: placeholderAnswer },
  {
    question:
      'What is a proxy generator and how do i use it cause this is a longer question to test the boundaries of this FAQ entry and how it should look for dev.',
    title: 'What is a proxy generator and how do i use it?',
    answer: placeholderAnswer,
  },
  { question: 'What is a proxy generator?', answer: placeholderAnswer },
  { question: 'Help me with my password', answer: placeholderAnswer },
  { question: 'How do i use the internet?', title: 'How do I use the internet?', answer: placeholderAnswer },
  { question: 'How do i use the internet?', title: 'How do I use the internet?', answer: placeholderAnswer },
  { question: 'How do i use the internet?', title: 'How do I use the internet?', answer: placeholderAnswer },
  { question: 'How do i use the internet?', title: 'How do I use the internet?', answer: placeholderAnswer },
  { question: 'How do i use the internet?', title: 'How do I use the internet?', answer: placeholderAnswer },
  { question: 'How do i use the internet?', title: 'How do I use the internet?', answer: placeholderAnswer },
  { question: 'How do i use the internet?', title: 'How do I use the internet?', answer: placeholderAnswer },
]

// The design opens on "How do i use the internet?"
export const defaultFaqIndex = 4

export const supportContent = {
  title: 'Still need help?',
  text: 'If you are logged in you can submit a support ticket to our customer service team.',
  cta: 'Go to Support',
}
