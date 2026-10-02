import React, { useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ArrowDownCircle, Camera, Clapperboard, Menu, X } from 'lucide-react'
import './styles.css'
import RotatingText from './RotatingText'
import FlipCard from './components/FlipCard'
import RubberSegment from './components/RubberSegment'

const publicPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
const portrait = '/assets/rongkun-1200.jpg'
const decor = {
  moon: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
  object: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
  lego: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
  group: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
}
const projects = [
  { no: '01', category: 'Brand Film', name: '岭南美陶 · 慕课预告', file: '/videos/lingnan-meitao-preview.mp4' },
  { no: '02', category: 'Event Film', name: '广州黄埔马拉松', file: '/videos/huangpu-marathon-2023.mp4' },
  { no: '03', category: 'Public Campaign', name: '反诈宣传', file: '/videos/anti-fraud-campaign.mp4' },
  { no: '04', category: 'Public Campaign', name: '一盔一带', file: '/videos/foshan-traffic-helmet-belt.mp4' },
  { no: '05', category: 'Public Campaign', name: '拒酒驾', file: '/videos/foshan-traffic-no-drunk-driving.mp4' },
  { no: '06', category: 'Public Campaign', name: '开车注意安全', file: '/videos/foshan-traffic-focus-driving.mp4' },
  { no: '07', category: 'Institutional Film', name: '英才小学红色教育实践', file: '/videos/baiyun-yingcai-school-report.mp4' },
  { no: '08', category: 'Institutional Film', name: '华师附中工程项目', file: '/videos/hsc-project-report.mp4' },
  { no: '09', category: 'Music Video', name: '黄埔区网络文明 MV', file: '/videos/huangpu-cyber-civilization-mv.mp4' },
  { no: '10', category: 'Narrative', name: '凯撒', file: '/videos/caesar.mp4' },
  { no: '11', category: 'Brand Film', name: '群体通平台宣传片', file: '/videos/quntitong-platform-film.mp4' },
  { no: '12', category: 'Event Film', name: '市科协科普大会', file: '/videos/science-association-conference.mp4' },
  { no: '13', category: 'Commercial Documentary', name: '天河城30周年宣传片', file: '/videos/commercial-documentary-13.mp4' },
  { no: '14', category: 'Commercial Documentary', name: '凤栖梧桐', file: '/videos/commercial-documentary-14.mp4' },
  { no: '15', category: 'Commercial Documentary', name: '神户工厂宣传片', file: '/videos/commercial-documentary-15.mp4' },
  { no: '16', category: 'Commercial Documentary', name: '心泊阳朔', file: '/videos/commercial-documentary-16.mp4' },
]
const photoProjects = [
  { src: '/assets/photos/portrait-astronaut-night.jpg', title: '宇航员 · 夜行', orientation: 'portrait' },
  { src: '/assets/photos/portrait-astronaut-industrial.jpg', title: '宇航员 · 工业场景', orientation: 'portrait' },
  { src: '/assets/photos/portrait-astronaut-sunset.jpg', title: '宇航员 · 日落', orientation: 'portrait' },
  { src: '/assets/photos/portrait-forest-candle.jpg', title: '烛光与森林', orientation: 'portrait' },
  { src: '/assets/photos/portrait-sunlight.jpg', title: '风中侧影', orientation: 'portrait' },
  { src: '/assets/photos/portrait-hanfu.jpg', title: '鎏金古韵', orientation: 'portrait' },
  { src: '/assets/photos/portrait-fern.jpg', title: '蕨叶之间', orientation: 'portrait' },
  { src: '/assets/photos/portrait-rain-blue-flower.jpg', title: '雨幕与蓝花', orientation: 'portrait' },
  { src: '/assets/photos/portrait-meadow-white-dress.jpg', title: '花野白裙', orientation: 'portrait' },
  { src: '/assets/photos/portrait-interior-smoke.jpg', title: '室内光影', orientation: 'portrait' },
  { src: '/assets/photos/portrait-white-dress.jpg', title: '白裙与花', orientation: 'portrait' },
  { src: '/assets/photos/portrait-stairs-school.jpg', title: '阶梯日光', orientation: 'portrait' },
  { src: '/assets/photos/ocean.jpg', title: '潮汐与海岸', orientation: 'landscape' },
  { src: '/assets/photos/mountain-autumn.jpg', title: '山野之间', orientation: 'landscape' },
  { src: '/assets/photos/snow-mountain.jpg', title: '雪线之上', orientation: 'landscape' },
  { src: '/assets/photos/lake-aerial.jpg', title: '湖岸航迹', orientation: 'landscape' },
  { src: '/assets/photos/deer-portrait.jpg', title: '林间注视', orientation: 'landscape' },
  { src: '/assets/photos/dark-forest.jpg', title: '森林深处', orientation: 'landscape' },
  { src: '/assets/photos/temple-sunset.jpg', title: '暮色建筑', orientation: 'landscape' },
  { src: '/assets/photos/product-earbuds.jpg', title: '无线耳机', orientation: 'product' },
  { src: '/assets/photos/product-cosmetics-display.jpg', title: '美妆陈列', orientation: 'product' },
  { src: '/assets/photos/product-pink-tube.jpg', title: '粉色护肤管', orientation: 'product' },
  { src: '/assets/photos/product-sunscreen-sand-1.jpg', title: '防晒霜 · 沙地', orientation: 'product' },
  { src: '/assets/photos/product-sunscreen-sky.jpg', title: '防晒霜 · 蓝天', orientation: 'product' },
  { src: '/assets/photos/product-blue-perfume.jpg', title: '蓝色香水', orientation: 'product' },
  { src: '/assets/photos/product-red-serum.jpg', title: '红色精华', orientation: 'product' },
  { src: '/assets/photos/product-turquoise-perfume.jpg', title: '青绿色香水', orientation: 'product' },
  { src: '/assets/photos/product-face-cream.jpg', title: '面霜静物', orientation: 'product' },
  { src: '/assets/photos/product-black-bottle.jpg', title: '黑色香水瓶', orientation: 'product' },
  { src: '/assets/photos/product-skincare-box.jpg', title: '护肤礼盒', orientation: 'product' },
  { src: '/assets/photos/product-ceramic-bowls.jpg', title: '青花瓷器', orientation: 'product' },
  { src: '/assets/photos/product-sunscreen-water.jpg', title: '防晒霜 · 水面', orientation: 'product' },
  { src: '/assets/photos/product-orange-jar.jpg', title: '橙色护肤罐', orientation: 'product' },
  { src: '/assets/photos/product-camera-watch.jpg', title: '相机与腕表', orientation: 'product' },
  { src: '/assets/photos/product-sunscreen-sand-2.jpg', title: '防晒霜 · 沙滩', orientation: 'product' },
  { src: '/assets/photos/product-sunscreen-footprint.jpg', title: '防晒霜 · 足迹', orientation: 'product' },
]
function SafeImage({ src, alt, className = '', eager = false, srcSet, sizes }: { src: string; alt: string; className?: string; eager?: boolean; srcSet?: string; sizes?: string }) {
  const [failed, setFailed] = useState(false)
  return failed ? <div className={`image-fallback ${className}`} role="img" aria-label={alt}><span>{alt}</span></div> : <img src={src} srcSet={srcSet} sizes={sizes} alt={alt} className={className} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" onError={() => setFailed(true)} />
}

function FadeIn({ children, delay = 0, y = 30, x = 0, className = '' }: { children: React.ReactNode; delay?: number; y?: number; x?: number; className?: string }) {
  const reduceMotion = useReducedMotion()
  return <motion.div className={className} initial={reduceMotion ? false : { opacity: 0, x, y }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, margin: '-30px', amount: 0 }} transition={{ duration: reduceMotion ? 0 : .45, delay: reduceMotion ? 0 : delay, ease: [0.25, 0.1, 0.25, 1] }}>{children}</motion.div>
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const reduceMotion = useReducedMotion()
  if (reduceMotion) return null
  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
}

function Magnet({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<React.CSSProperties>({})
  return <div ref={ref} className="magnet" onMouseMove={(e) => { const r = ref.current?.getBoundingClientRect(); if (!r) return; const dx = e.clientX - (r.left + r.width / 2); const dy = e.clientY - (r.top + r.height / 2); setStyle({ transform: `translate3d(${dx / 3}px, ${dy / 3}px, 0)`, transition: 'transform .3s ease-out' }) }} onMouseLeave={() => setStyle({ transform: 'translate3d(0,0,0)', transition: 'transform .6s ease-in-out' })} style={style}>{children}</div>
}

function Hero() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  return <section className="hero section-shell" id="top"><div className="css-aurora" aria-hidden="true" />
    <nav className="nav container" aria-label="Main navigation" onKeyDown={(event) => {
      if (event.key === 'Escape' && menuOpen) { setMenuOpen(false); menuButton.current?.focus() }
    }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false) }}>
      <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>RONGKUN<span>/VISUALS</span></a>
      <button ref={menuButton} type="button" className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} title={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="main-links" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div id="main-links" className={`nav-links${menuOpen ? ' is-open' : ''}`} onClick={() => setMenuOpen(false)}>
        <a href="#projects">Work</a><a href="#about">About</a><a href="#services">Services</a><a href="#experience">Experience</a><a href="#contact">Contact</a>
      </div>
    </nav>
    <div className="hero-stage container">
      <div className="hero-heading-wrap"><span className="hero-kicker">COMMERCIAL IMAGE MAKER · DIRECTOR</span><h1 className="hero-heading hero-blur-title hero-title-entrance hero-title-proximity">Hi, i'm Rongkun</h1></div>
      <div className="hero-portrait" id="contact"><FadeIn delay={.15} y={24}>
        <FlipCard className="portrait-flip" ariaLabel="联系我" draggable={false} tiltMax={8} hoverScale={1.01} glare={false} shadow={false} radius={28} background="#16121d"
          front={<div className="portrait-glow"><SafeImage src={publicPath(portrait)} srcSet={`${publicPath('/assets/rongkun-600.jpg')} 600w, ${publicPath('/assets/rongkun-1200.jpg')} 1200w`} sizes="(max-width: 768px) 340px, 420px" alt="Rongkun 的个人照片" eager /><span className="portrait-flip-hint">点击联系我 ↗</span></div>}
          back={<div className="portrait-flip-back"><strong>rongkun</strong><span className="portrait-flip-role">摄影师/编导</span><img className="portrait-contact-qr" src={publicPath('/assets/rongkun-wechat-qr.jpg')} alt="Rongkun 的微信二维码" width={968} height={840} /><span className="portrait-contact-email">906597700@qq.com</span></div>}
        />
      </FadeIn></div>
      <FadeIn className="hero-bio" delay={.2} y={20}><div><span className="hero-bio-label">PHOTOGRAPHY · FILM · SHORT-FORM</span><p>我热爱摄影，也擅长用影像讲述故事。拥有宣传片、TVC、广告片、品牌内容与短视频等多类型项目经验，熟练掌握各类相机、镜头、灯光及现场器材。我能够参与从前期创意、脚本沟通、现场拍摄到后期协作的完整流程，注重画面质感、情绪表达与内容传播，让每一次拍摄都兼具审美与真实的沟通力量。</p><div className="hero-actions"><a className="hero-action hero-action-primary" href="#projects">查看作品 <ArrowUpRight size={17} aria-hidden="true" /></a><a className="hero-action hero-action-secondary" href="#experience">工作经历 <ArrowUpRight size={17} aria-hidden="true" /></a></div></div></FadeIn>
    </div>
    <div className="hero-bottom container"><FadeIn delay={.55} y={14}><p><RotatingText texts={['年龄：23岁', '民族：汉族', '籍贯：广东']} interval={2000} /></p></FadeIn><span className="hero-scroll-label">SCROLL TO EXPLORE</span></div>
    <a className="scroll-cue" href="#about" aria-label="Scroll down"><ArrowDownCircle size={34} strokeWidth={1.4} /></a>
  </section>
}

const aboutText = "我从摄影现场出发，覆盖宣传片、纪录片、TVC、广告片与短视频等项目，既关注画面质感，也重视内容如何被看见、被理解并产生传播。"
function AnimatedText() { const ref = useRef<HTMLParagraphElement>(null); const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] }); return <p className="about-copy" ref={ref}>{aboutText.split('').map((char, i) => <Char key={i} progress={scrollYProgress} index={i} total={aboutText.length} char={char} />)}</p> }
function Char({ progress, index, total, char }: { progress: any; index: number; total: number; char: string }) { const start = index / total; const end = Math.min(1, start + .12); const opacity = useTransform(progress, [start, end], [.2, 1]); return <motion.span style={{ opacity }}>{char}</motion.span> }

function About() { return <section className="about section-shell" id="about"><SafeImage src={decor.moon} alt="" className="decor moon" /><SafeImage src={decor.object} alt="" className="decor object" /><SafeImage src={decor.lego} alt="" className="decor lego" /><SafeImage src={decor.group} alt="" className="decor group" /><div className="about-inner container"><FadeIn y={40}><h2 className="hero-heading section-title">About me</h2></FadeIn><AnimatedText /></div></section> }

const services = [['Brand Films', '宣传片与品牌内容拍摄，从前期沟通到现场执行，建立统一、可信的品牌影像。'], ['TVC & Commercials', '面向广告与商业传播的摄影执行，兼顾画面质感、节奏和多平台交付需求。'], ['Documentary & Interviews', '纪录片、人物采访与纪实内容，稳定控制现场光线、情绪和叙事节奏。'], ['Short-form Content', '短视频选题、脚本、拍摄与后期剪辑，帮助品牌持续产出适合传播的内容。'], ['Lighting & Post', '灯光、场景与现场协作，以及剪辑、调色等后期环节，保证作品完整落地。']]
function Services() { return <section className="services" id="services"><div className="container"><FadeIn y={40}><div className="section-intro"><span className="section-kicker">WHAT I CAN DELIVER</span><h2 className="section-title dark-title">Services</h2><p>从一条片子的前期构思到最终交付，按项目需要提供摄影、编导、灯光和后期支持。</p></div></FadeIn><div className="services-list">{services.map(([name, desc], i) => <FadeIn key={name} delay={i * .1}><article className="service-item"><div className="service-no">{String(i + 1).padStart(2, '0')}</div><div><h3>{name}</h3><p>{desc}</p></div></article></FadeIn>)}</div></div></section> }

const workExperience = [
  {
    period: '2022 — 2023',
    company: '河源东江文化传播',
    role: '摄影师 & 后期',
    summary: '负责宣传片、纪录片的拍摄与后期剪辑调色，同时统筹灯光与场景布置，参与并推进项目从现场执行到成片交付的完整流程。',
    highlights: '《寻味河源》《客家山韵》纪录片主要负责人',
  },
  {
    period: '2023 — 2024',
    company: '佛山金木视觉文化传播',
    role: '摄影师',
    summary: '负责宣传片、纪录片、课程及 TVC 等内容的摄影执行，深度参与不同规模剧组，在多类型项目中持续提升现场判断、画面控制与团队协作能力，担任多个项目的前期摄影负责人。',
    highlights: '《市协科普大会》《佛山交警全国交通安全日系列短片》《岭南美陶》《佛山反诈宣传》',
  },
  {
    period: '2024 — 2026',
    company: '拥奢交易中心',
    role: '编导',
    summary: '负责小红书运营，以及短视频从选题策划、脚本梳理、前期拍摄到后期剪辑的完整流程。逐步从摄影执行成长为公司的主要编导，建立并持续优化账号内容体系。',
    highlights: '账号从零起步增长至 4,000+ 粉丝，打造单条 400 万播放爆款内容',
  },
]

function Experience() {
  return <section className="experience" id="experience"><div className="container"><FadeIn y={40}><div className="experience-heading"><span className="experience-kicker">CAREER PATH</span><h2 className="section-title experience-title">Experience</h2><p>从摄影现场到内容策划，我持续把每一次拍摄经验转化为更稳定、更有传播力的作品。</p></div></FadeIn><div className="experience-list">{workExperience.map((item, i) => <FadeIn key={item.company} delay={i * .12}><article className="experience-item"><div className="experience-period">{item.period}</div><div className="experience-company"><h3>{item.company}</h3><span>{item.role}</span></div><div className="experience-content"><p>{item.summary}</p><strong>{item.highlights}</strong></div></article></FadeIn>)}</div></div></section>
}

function VideoCard({ project, index }: { project: typeof projects[number]; index: number }) {
  const reduceMotion = useReducedMotion()
  return <motion.article
    className="video-card"
    initial={reduceMotion ? false : { opacity: 0, y: 24, scale: .985 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: .08 }}
    transition={{ duration: reduceMotion ? 0 : .42, delay: reduceMotion ? 0 : (index % 2) * .07, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className="video-card-top"><span className="project-no">{project.no}</span><div><span className="eyebrow">{project.category}</span><h3>{project.name}</h3></div></div>
    <video className="portfolio-video" controls preload="metadata" playsInline src={publicPath(project.file)} aria-label={`${project.name} 视频作品`} />
  </motion.article>
}
type PortfolioCategory = 'commercial' | 'photo'

const portfolioCategories = [
  { value: 'commercial', label: '广告宣传纪录片', icon: <Clapperboard size={16} aria-hidden="true" /> },
  { value: 'photo', label: '照片', icon: <Camera size={16} aria-hidden="true" /> },
]

function PhotoGallery() {
  const [filter, setFilter] = useState<'landscape' | 'portrait' | 'product'>('landscape')
  const visiblePhotos = photoProjects.filter((photo) => photo.orientation === filter)
  const reduceMotion = useReducedMotion()

  return <div className="photo-portfolio">
    <div className="photo-gallery-heading">
      <div className="portfolio-category-meta"><span>02 / PHOTO STUDIES</span><strong>{visiblePhotos.length} 张照片</strong></div>
      <div className="photo-filter" role="group" aria-label="照片类型">
        <button type="button" className={filter === 'portrait' ? 'is-active' : ''} aria-pressed={filter === 'portrait'} onClick={() => setFilter('portrait')}>人像照片</button>
        <button type="button" className={filter === 'landscape' ? 'is-active' : ''} aria-pressed={filter === 'landscape'} onClick={() => setFilter('landscape')}>风景照片</button>
        <button type="button" className={filter === 'product' ? 'is-active' : ''} aria-pressed={filter === 'product'} onClick={() => setFilter('product')}>产品照片</button>
      </div>
    </div>
    {visiblePhotos.length > 0
      ? <motion.div className="photo-gallery" key={filter} initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : .3 }}>
        {visiblePhotos.map((photo, index) => <motion.figure className={`photo-tile photo-tile-${photo.orientation}`} key={photo.src} initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : .36, delay: reduceMotion ? 0 : Math.min(index * .035, .28), ease: [0.22, 1, 0.36, 1] }}>
          <SafeImage src={publicPath(photo.src)} alt={photo.title} eager={index === 0} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
          <figcaption><span>{String(index + 1).padStart(2, '0')}</span><strong>{photo.title}</strong></figcaption>
        </motion.figure>)}
      </motion.div>
      : <div className="photo-filter-empty"><span>PORTRAIT ARCHIVE</span><p>人像照片素材待添加</p></div>}
  </div>
}

function Projects() {
  const [category, setCategory] = useState<PortfolioCategory>('commercial')
  const reduceMotion = useReducedMotion()
  return <section className="projects" id="projects"><div className="container">
    <div className="projects-heading-row">
      <FadeIn y={40}><div className="section-intro projects-intro"><span className="section-kicker">SELECTED PORTFOLIO</span><h2 className="hero-heading section-title">Selected Work</h2><p>按作品类型浏览摄影、影像和内容创作项目。</p></div></FadeIn>
      <FadeIn className="portfolio-segment-wrap" delay={.12} y={20}>
        <RubberSegment
          items={portfolioCategories}
          value={category}
          defaultValue="commercial"
          onChange={(value: PortfolioCategory) => setCategory(value)}
          aria-label="作品分类"
          size="lg"
          radius={14}
          inset={4}
          stretch={92}
          squash={4}
          speed={1.15}
          trackColor="#201b29"
          thumbColor="#f1edf6"
          textColor="#f1f5f9"
          activeTextColor="#17131d"
        />
      </FadeIn>
    </div>
    <div className="portfolio-category-content" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={category}
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: reduceMotion ? 0 : .32, ease: [0.22, 1, 0.36, 1] }}
        >
          {category === 'commercial'
            ? <><div className="portfolio-category-meta"><span>01 / COMMERCIAL & DOCUMENTARY</span><strong>{projects.length} 部作品</strong></div><div className="video-grid">{projects.map((project, index) => <VideoCard key={project.file} project={project} index={index} />)}</div></>
            : <PhotoGallery />}
        </motion.div>
      </AnimatePresence>
    </div>
  </div></section>
}
function App() { return <main><ScrollProgress /><Hero /><About /><Services /><Experience /><Projects /></main> }

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>)




