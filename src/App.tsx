import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const portrait = 'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png'
const decor = {
  moon: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
  object: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
  lego: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
  group: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
}

const marqueeImages = [
  'hero-space-voyage-preview-eECLH3Yc.gif','hero-codenest-preview-Cgppc2qV.gif','hero-vex-ventures-preview-BczMFIiw.gif','hero-stellar-ai-v2-preview-DjvxjG3C.gif','hero-asme-preview-B_nGDnTP.gif','hero-transform-data-preview-Cx5OU29N.gif','hero-vitara-preview-Cjz2QYyU.gif','hero-terra-preview-BFjrCr7T.gif','hero-skyelite-preview-DHaZIgUv.gif','hero-aethera-preview-DknSlcTa.gif','hero-designpro-preview-D8c5_een.gif','hero-stellar-ai-preview-D3HL6bw1.gif','hero-xportfolio-preview-D4A8maiC.gif','hero-orbit-web3-preview-BXt4OttD.gif','hero-nexora-preview-cx5HmUgo.gif','hero-evr-ventures-preview-DZxeVFEX.gif','hero-planet-orbit-preview-DWAP8Z1P.gif','hero-new-era-preview-CocuDUm9.gif','hero-wealth-preview-B70idl_u.gif','hero-luminex-preview-CxOP7ce6.gif','hero-celestia-preview-0yO3jXO8.gif',
].map((n) => `https://motionsites.ai/assets/${n}`)

const projects = [
  {
    number: '01', category: 'Client', name: 'Nextlevel Studio',
    images: ['hf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png','hf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png','hf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png'],
  },
  {
    number: '02', category: 'Personal', name: 'Aura Brand Identity',
    images: ['hf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png','hf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png','hf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png'],
  },
  {
    number: '03', category: 'Client', name: 'Solaris Digital',
    images: ['hf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png','hf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png','hf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png'],
  },
].map((project) => ({
  ...project,
  images: project.images.map((file) => `https://images.higgs.ai/?default=1&output=webp&url=${encodeURIComponent(`https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/${file}`)}&w=1280&q=85`),
}))

function SafeImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false)
  return failed ? <div className={`image-fallback ${className}`} aria-label={alt} /> : <img src={src} alt={alt} className={className} loading="lazy" onError={() => setFailed(true)} />
}

function FadeIn({ children, delay = 0, y = 30, x = 0, duration = 0.7, className = '' }: { children: React.ReactNode; delay?: number; y?: number; x?: number; duration?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, x, y }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, margin: '50px', amount: 0 }} transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}>{children}</motion.div>
}

function ContactButton() { return <a className="contact-button" href="#contact">Contact Me <ArrowUpRight size={17} strokeWidth={2.3} /></a> }
function LiveButton() { return <a className="live-button" href="#contact">Live Project <ArrowUpRight size={16} /></a> }

function Magnet({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('translate3d(0,0,0)')
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const move = (e: MouseEvent) => {
      const r = node.getBoundingClientRect(); const px = e.clientX - (r.left + r.width / 2); const py = e.clientY - (r.top + r.height / 2)
      if (Math.abs(px) < r.width / 2 + 150 && Math.abs(py) < r.height / 2 + 150) setTransform(`translate3d(${px / 3}px,${py / 3}px,0)`)
    }
    const leave = () => setTransform('translate3d(0,0,0)')
    node.addEventListener('mousemove', move); node.addEventListener('mouseleave', leave)
    return () => { node.removeEventListener('mousemove', move); node.removeEventListener('mouseleave', leave) }
  }, [])
  return <div ref={ref} className="magnet" style={{ transform }}>{children}</div>
}

function HeroSection() {
  return <section className="hero-section" id="top">
    <FadeIn className="navbar" y={-20}><nav><a href="#about">About</a><a href="#services">Price</a><a href="#projects">Projects</a><a href="#contact">Contact</a></nav></FadeIn>
    <div className="hero-title-wrap"><FadeIn delay={0.15} y={40}><h1 className="hero-heading hero-title">Hi, i&apos;m Rongkun</h1></FadeIn></div>
    <FadeIn className="hero-copy" delay={0.35} y={20}><p>a 3d creator driven by crafting striking and unforgettable projects</p></FadeIn>
    <FadeIn className="hero-cta" delay={0.5} y={20}><ContactButton /></FadeIn>
    <FadeIn className="hero-portrait" delay={0.6} y={30}><Magnet><SafeImage src={portrait} alt="Jack 3D portrait" /></Magnet></FadeIn>
  </section>
}

function MarqueeSection() {
  const ref = useRef<HTMLElement>(null); const [offset, setOffset] = useState(0)
  useEffect(() => { const onScroll = () => { if (!ref.current) return; const top = ref.current.getBoundingClientRect().top + window.scrollY; setOffset((window.scrollY - top + window.innerHeight) * 0.3) }; window.addEventListener('scroll', onScroll, { passive: true }); onScroll(); return () => window.removeEventListener('scroll', onScroll) }, [])
  const row1 = marqueeImages.slice(0, 11), row2 = marqueeImages.slice(11)
  return <section ref={ref} className="marquee-section"><div className="marquee-row" style={{ transform: `translateX(${offset - 200}px)` }}>{[...row1,...row1,...row1].map((src, i) => <SafeImage key={i} src={src} alt="Project preview" className="marquee-image" />)}</div><div className="marquee-row" style={{ transform: `translateX(-${offset - 200}px)` }}>{[...row2,...row2,...row2].map((src, i) => <SafeImage key={i} src={src} alt="Project preview" className="marquee-image" />)}</div></section>
}

const aboutText = "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!"
function AnimatedText() {
  const ref = useRef<HTMLParagraphElement>(null); const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] })
  return <p ref={ref} className="animated-text">{aboutText.split('').map((char, i) => { const start = i / aboutText.length; const end = Math.min(1, start + 0.08); const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]); return <span className="char" key={i}><span className="char-placeholder">{char}</span><motion.span style={{ opacity }}>{char}</motion.span></span> })}</p>
}

function AboutSection() {
  return <section className="about-section" id="about"><SafeImage src={decor.moon} alt="Moon sculpture" className="decor moon" /><SafeImage src={decor.object} alt="Abstract sculpture" className="decor object" /><SafeImage src={decor.lego} alt="Lego sculpture" className="decor lego" /><SafeImage src={decor.group} alt="3D sculpture group" className="decor group" /><div className="about-content"><FadeIn><h2 className="hero-heading section-title">About me</h2></FadeIn><AnimatedText /><FadeIn delay={0.2} y={20}><ContactButton /></FadeIn></div></section>
}

const services = [['01','3D Modeling','Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.'],['02','Rendering','High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.'],['03','Motion Design','Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.'],['04','Branding','Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.'],['05','Web Design','Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.']]
function ServicesSection() { return <section className="services-section" id="services"><FadeIn><h2 className="section-title dark-title">Services</h2></FadeIn><div className="services-list">{services.map(([num, name, desc], i) => <FadeIn key={num} delay={i * 0.1} y={20}><article className="service-item"><span className="service-number">{num}</span><div><h3>{name}</h3><p>{desc}</p></div></article></FadeIn>)}</div></section> }

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null); const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] }); const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (projects.length - 1 - index) * 0.03])
  return <div className="project-stack-item" style={{ top: `${index * 28}px` }}><motion.article ref={ref} className="project-card" style={{ scale }}><div className="project-top"><span className="project-number">{project.number}</span><div className="project-meta"><span>{project.category}</span><h3>{project.name}</h3></div><LiveButton /></div><div className="project-images"><div className="project-col"><SafeImage src={project.images[0]} alt={`${project.name} detail`} /><SafeImage src={project.images[1]} alt={`${project.name} detail`} /></div><SafeImage src={project.images[2]} alt={`${project.name} overview`} className="project-tall" /></div></motion.article></div>
}
function ProjectsSection() { return <section className="projects-section" id="projects"><FadeIn><h2 className="hero-heading section-title">Project</h2></FadeIn><div className="projects-list">{projects.map((p, i) => <ProjectCard key={p.number} project={p} index={i} />)}</div></section> }

export default function App() { return <main className="app"><HeroSection /><MarqueeSection /><AboutSection /><ServicesSection /><ProjectsSection /><footer id="contact"><span>Jack / 3D Creator</span><a href="#top">Back to top <ArrowUpRight size={15} /></a></footer></main> }
